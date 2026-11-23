"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Matrix4, Raycaster, ShaderMaterial, Vector2, Vector3, type Group, type Material, type Mesh } from "three";
import { BUSINESSES, type BusinessId } from "@/lib/businesses";
import { PARTICLE_COUNT, approach, capDelta, ease, fadeStep, resample, swirled } from "@/lib/morph";
import { BusinessModel } from "./BusinessModel";

const MORPH = 2.2;
const ARRIVAL = 2.6;
const FADE = 0.3;
const OUT = 0.55;
const IDLE = 0.1;
const SAMPLES = 20000;

const VERT = `attribute vec3 aFrom; attribute vec3 aTo; attribute vec3 aSeed;
uniform float uProgress; uniform float uTime; uniform float uSize; uniform float uAlpha; uniform float uGrow; uniform float uPush; uniform vec3 uRayO; uniform vec3 uRayD;
varying float vA; varying float vSeed;
void main(){
  float p = clamp(uProgress, 0., 1.);
  float burst = sin(3.14159265 * p);
  float a = aSeed.x * 6.2831853 + uTime * .6 + burst * 3.;
  float r = 2.4 * burst * (.25 + .75 * aSeed.y);
  vec3 pos = mix(aFrom, aTo, p * p * (3. - 2. * p)) + vec3(cos(a), (aSeed.z - .5) * 1.2, sin(a)) * r;
  vec3 w = (modelMatrix * vec4(pos, 1.)).xyz;
  vec3 off = w - uRayO;
  off -= uRayD * dot(off, uRayD);
  w += normalize(off + 1e-4) * uPush * exp(-dot(off, off) * 5.);
  vec4 mv = viewMatrix * vec4(w, 1.);
  mv.xyz *= .994;
  gl_Position = projectionMatrix * mv;
  float tw = .65 + .35 * sin(uTime * 2.2 + aSeed.x * 60.);
  gl_PointSize = uSize * (.45 + aSeed.y) * (1. + .35 * uGrow) * tw / -mv.z;
  vA = uAlpha * tw;
  vSeed = aSeed.z;
}`;
const FRAG = `uniform vec3 uAccent; varying float vA; varying float vSeed;
void main(){
  float d = length(gl_PointCoord - .5);
  float s = smoothstep(.5, .08, d);
  gl_FragColor = vec4(mix(uAccent, vec3(1., .92, .8), step(.8, vSeed)) * 1.25, s * vA);
}`;

function sample(root: Group): Float32Array {
  const scale = root.scale.x;
  root.scale.setScalar(1);
  root.updateWorldMatrix(true, true);
  const inv = new Matrix4().copy(root.parent!.matrixWorld).invert();
  const tris: number[] = [];
  const cum: number[] = [];
  const [a, b, c, m] = [new Vector3(), new Vector3(), new Vector3(), new Matrix4()];
  let total = 0;
  root.traverse((o) => {
    const mesh = o as Mesh & { isLineSegments2?: boolean };
    if (!mesh.isMesh || mesh.isLineSegments2 || (mesh.material as Material).transparent) return;
    const pos = mesh.geometry.attributes.position;
    const index = mesh.geometry.index;
    m.multiplyMatrices(inv, mesh.matrixWorld);
    const n = index ? index.count : pos.count;
    for (let i = 0; i < n; i += 3) {
      const at = (k: number) => (index ? index.getX(i + k) : i + k);
      a.fromBufferAttribute(pos, at(0)).applyMatrix4(m);
      b.fromBufferAttribute(pos, at(1)).applyMatrix4(m);
      c.fromBufferAttribute(pos, at(2)).applyMatrix4(m);
      tris.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
      total += b.sub(a).cross(c.sub(a)).length() / 2;
      cum.push(total);
    }
  });
  root.scale.setScalar(scale);
  const out = new Float32Array(SAMPLES * 3);
  for (let i = 0; i < SAMPLES; i++) {
    const want = Math.random() * total;
    let lo = 0;
    let hi = cum.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] < want) lo = mid + 1;
      else hi = mid;
    }
    let u = Math.random();
    let v = Math.random();
    if (u + v > 1) [u, v] = [1 - u, 1 - v];
    const t = lo * 9;
    for (let k = 0; k < 3; k++) out[i * 3 + k] = tris[t + k] + (tris[t + 3 + k] - tris[t + k]) * u + (tris[t + 6 + k] - tris[t + k]) * v;
  }
  return resample(out, PARTICLE_COUNT);
}

type Pointer = { current: { x: number; y: number } };

export function Morph({ business, reducedMotion, pointer }: { business: BusinessId; reducedMotion: boolean; pointer: Pointer }) {
  const [mounted, setMounted] = useState<BusinessId[]>([business]);
  if (!mounted.includes(business)) setMounted([...mounted, business]);

  const groups = useRef(new Map<BusinessId, Group>());
  const cache = useRef(new Map<BusinessId, Float32Array>());
  const run = useRef({ p: 0, dur: ARRIVAL, time: 0 });
  const vis = useRef(new Map<BusinessId, number>());
  const accent = useMemo(() => new Color(BUSINESSES[business].accent), [business]);
  const aim = useMemo(() => new Vector2(), []);
  const arrived = useRef(false);
  const ray = useMemo(() => new Raycaster(), []);

  const { geometry, material } = useMemo(() => {
    const cloud = new Float32Array(PARTICLE_COUNT * 3);
    const seeds = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < cloud.length; i += 3) {
      const a = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * 7;
      cloud.set([Math.cos(a) * r, Math.random() * 7 - 1, Math.sin(a) * r - 2], i);
      seeds.set([Math.random(), Math.random(), Math.random()], i);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3));
    geometry.setAttribute("aFrom", new BufferAttribute(cloud, 3));
    geometry.setAttribute("aTo", new BufferAttribute(cloud.slice(), 3));
    geometry.setAttribute("aSeed", new BufferAttribute(seeds, 3));
    const material = new ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uProgress: { value: 0 }, uTime: { value: 0 }, uSize: { value: 1 }, uAlpha: { value: 0 }, uGrow: { value: 0 }, uPush: { value: 0 }, uAccent: { value: new Color() }, uRayO: { value: new Vector3() }, uRayD: { value: new Vector3(0, 0, -1) } },
    });
    return { geometry, material };
  }, []);
  useEffect(() => () => (geometry.dispose(), material.dispose()), [geometry, material]);

  useLayoutEffect(() => {
    const root = groups.current.get(business);
    if (!root) return;
    if (!cache.current.has(business)) cache.current.set(business, sample(root));
    const from = geometry.attributes.aFrom as BufferAttribute;
    const to = geometry.attributes.aTo as BufferAttribute;
    const r = run.current;
    (from.array as Float32Array).set(swirled(from.array as Float32Array, to.array as Float32Array, geometry.attributes.aSeed.array as Float32Array, r.p, r.time));
    (to.array as Float32Array).set(cache.current.get(business)!);
    from.needsUpdate = to.needsUpdate = true;
    Object.assign(r, { p: 0, dur: arrived.current ? MORPH : ARRIVAL });
    arrived.current = true;
  }, [business, geometry]);

  useFrame(({ camera, size, gl }, delta) => {
    const r = run.current;
    const dt = capDelta(delta);
    r.time += dt;
    r.p = Math.min(1, r.p + dt / (reducedMotion ? FADE : r.dur));
    const p = r.p;
    const shown = reducedMotion ? p : ease((p - 0.7) / 0.3);
    let gone = false;
    for (const [id, g] of groups.current) {
      const v = fadeStep(vis.current.get(id) ?? 0, id === business ? shown : 0, dt, reducedMotion ? FADE : OUT);
      vis.current.set(id, v);
      g.scale.setScalar(Math.max(v, 0.001));
      g.visible = v > 0.01;
      if (v === 0 && id !== business) gone = true;
    }
    const u = material.uniforms;
    u.uProgress.value = p;
    u.uTime.value = r.time;
    const burst = Math.sin(Math.PI * p);
    u.uAlpha.value = reducedMotion ? 0 : approach(u.uAlpha.value, IDLE + (0.42 - IDLE) * Math.sqrt(burst), dt);
    u.uGrow.value = approach(u.uGrow.value, burst, dt);
    u.uPush.value = reducedMotion ? 0 : 0.4;
    u.uSize.value = (0.022 * size.height * gl.getPixelRatio()) / (2 * Math.tan(((camera as { fov?: number }).fov ?? 36) * (Math.PI / 360)));
    u.uAccent.value.lerp(accent, 1 - Math.exp(-3 * dt));
    ray.setFromCamera(aim.set(pointer.current.x, -pointer.current.y), camera);
    u.uRayO.value.copy(ray.ray.origin);
    u.uRayD.value.copy(ray.ray.direction);
    if (gone) setMounted((m) => m.filter((id) => id === business || (vis.current.get(id) ?? 0) > 0));
  });

  return (
    <group>
      {mounted.map((id) => (
        <BusinessModel
          key={id}
          business={id}
          ref={(g: Group | null) => {
            if (g) groups.current.set(id, g);
            else (groups.current.delete(id), vis.current.delete(id));
          }}
        />
      ))}
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}
