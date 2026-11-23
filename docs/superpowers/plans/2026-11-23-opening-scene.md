# Opening Scene (Milestone 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home page hero with the living 3D model: a detailed miniature of the visitor's business that tears into particles and re-forms when he picks another business.

**Architecture:** The home page stays a server component and renders one client component, `Opening`, which owns the chosen business, the copy and the picker, and lazy-loads a WebGL canvas with `next/dynamic` and `ssr: false`. Each business is a React Three Fiber group built from a shared kit of parts; a single particle system samples the surface of whichever model is shown and morphs between samples in a shader. All maths that can be tested without a GPU lives in `lib/morph.ts`.

**Tech Stack:** Next.js 16.4.6 (App Router, `cacheComponents`), React 19.3, TypeScript, `three` 0.187, `@react-three/fiber` 9.8, `@react-three/drei` 10.7, `@react-three/postprocessing` 3.2 with `postprocessing` 6, Vitest 5.

**Spec:** `docs/superpowers/specs/2026-11-23-brand-website-design.md` (sections "1. Opening: the living model", "Look", "Milestones" item 1).

**Scope:** Milestone 1 only. The dive, the live AI plan, the typed-business text box, the work gallery and scenes 5 to 8 get their own plans after Pini approves the look.

## Global Constraints

- Read `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md` before touching `next/dynamic`: `ssr: false` is only allowed inside a Client Component.
- Base colours: night `#0B0920`, ivory `#F4EFFF`. Accents: ember `#FF7A45` (restaurant), mint `#3DD6C4` (clinic), pink `#FF4F9A` (shop), violet `#8C7BFF` (studio), gold `#FFC14D` (default).
- Type: Syne for headlines, Instrument Sans for reading (already loaded in `app/layout.tsx`).
- Model style: stylised, glowing architectural miniatures with real detail. Not low-poly toys, not photo-real, not an abstract blob with cards around it.
- No mention of Pini's employer anywhere. No invented numbers, testimonials or logos.
- All copy lives in `lib/businesses.ts` so Hebrew can be added later.
- Layout and text stay quiet and left-aligned; boldness is spent on the 3D.
- The visitor can always scroll on and reach the "Talk to me" button. No loading screen with nothing to look at.
- `public/googleb929b81e251b9750.html`, `/privacy`, `/contact` and `/delete-account` must keep working unchanged.
- Work happens on the branch `opening-scene`. `main` is the live Google Play site and is not touched until Pini approves the look.
- Tests: one to three meaningful tests per unit. Comments: at most one short line, only where the why is not obvious.
- Run raw npm commands as `rtk proxy npm …`.

## Deviation from the spec (Claude's call, for Pini to check)

The spec says to start from free-licence model kits. This plan builds the first model from a kit of parts written in code instead, because it gives full control of the glowing style, makes the particle sampling exact, and needs no licence tracking. Task 4 is the gate: if Pini finds the restaurant not detailed enough, models from a CC0 kit replace the code-built ones behind the same `BusinessModel` component and nothing else in the plan changes.

## Review Focus

1. **No WebGL, or the canvas fails to start:** the visitor sees the current static hero with the skyline, full copy and working buttons, never a black box.
2. **A second business picked while the morph is running:** the particles head for the newest choice from where they are now, with no jump and no stuck state.
3. **`prefers-reduced-motion`:** the model swaps with a short fade; no swirl, no camera drift.
4. **Phone width (under 760px):** copy and picker are readable and usable above the model; nothing overlaps.
5. **Returning to a hidden tab:** the animation continues smoothly, with the frame delta capped so nothing explodes.

## File Structure

| File | Responsibility |
|---|---|
| `lib/businesses.ts` | The five businesses: id, label, accent, opening copy |
| `lib/morph.ts` | GPU-free maths: resampling a point cloud, blending, easing |
| `lib/morph.test.ts`, `lib/businesses.test.ts` | Tests |
| `components/opening/Opening.tsx` | Client. Chosen business, copy, picker, accent variable, fallback choice |
| `components/opening/Scene.tsx` | Client. Canvas, camera, lights, bloom, mouse orbit |
| `components/opening/parts.tsx` | Shared kit: walls, glowing windows, awning, sign, door, furniture, plants |
| `components/opening/models/{Restaurant,Clinic,Shop,Studio,Other}.tsx` | One miniature each, built from the kit |
| `components/opening/BusinessModel.tsx` | Picks the model for an id; fades the solid meshes in and out |
| `components/opening/Particles.tsx` | The particle system and its shader |
| `components/opening/opening.css` | Layout of copy and canvas |
| `app/page.tsx` | Uses `Opening` in place of the current hero section |
| `vitest.config.ts`, `package.json` | Test runner and scripts |

---

### Task 1: Business data and test setup

**Files:**
- Create: `lib/businesses.ts`, `lib/businesses.test.ts`, `vitest.config.ts`
- Modify: `package.json`

**Interfaces:**
- Produces:
  - `type BusinessId = "restaurant" | "clinic" | "shop" | "studio" | "other"`
  - `type Business = { id: BusinessId; label: string; accent: string; lead: string }`
  - `const BUSINESSES: Record<BusinessId, Business>`
  - `const BUSINESS_ORDER: BusinessId[]` (restaurant, clinic, shop, studio, other)
  - `const DEFAULT_BUSINESS: BusinessId = "other"`
  - `const OPENING = { headline: "Your business, rebuilt for the AI era.", headlineAccent: "A new face and a new brain.", ask: "Show me yours. I run a…" }`

- [ ] **Step 1: Create the branch and install**

```bash
git checkout -b opening-scene
rtk proxy npm install three@^0.187 @react-three/fiber@^9.8 @react-three/drei@^10.7 @react-three/postprocessing@^3.2 postprocessing@^6.36
rtk proxy npm install -D vitest@^5 @types/three
```

Add to `package.json` scripts: `"test": "vitest run"`. `vitest.config.ts` sets the `@` alias to the repo root and `environment: "node"`.

- [ ] **Step 2: Write the failing test** in `lib/businesses.test.ts`

```ts
import { BUSINESSES, BUSINESS_ORDER, DEFAULT_BUSINESS } from "./businesses";

test("every business in the picker has its accent and copy", () => {
  expect(BUSINESS_ORDER).toEqual(["restaurant", "clinic", "shop", "studio", "other"]);
  expect(BUSINESS_ORDER.map((id) => BUSINESSES[id].accent)).toEqual(["#FF7A45", "#3DD6C4", "#FF4F9A", "#8C7BFF", "#FFC14D"]);
  for (const id of BUSINESS_ORDER) expect(BUSINESSES[id].lead.length).toBeGreaterThan(20);
  expect(DEFAULT_BUSINESS).toBe("other");
});
```

- [ ] **Step 3: Run it** with `rtk proxy npm test`. Expected: FAIL, module not found.

- [ ] **Step 4: Write `lib/businesses.ts`** with the exports above and this copy:

| id | label | lead |
|---|---|---|
| restaurant | Restaurant | A site that makes people hungry, and an AI host that answers and books day and night. |
| clinic | Clinic | A site patients trust in five seconds, and an AI receptionist that never puts anyone on hold. |
| shop | Shop | A store people enjoy browsing, and an AI seller that knows every product. |
| studio | Studio or agency | A portfolio that wins the pitch for you, and an AI teammate trained on how you work. |
| other | Something else | What your customers see, and the AI that runs behind it, designed and built by one person. |

- [ ] **Step 5: Run the test.** Expected: PASS.

- [ ] **Step 6: Commit** `lib/businesses.ts lib/businesses.test.ts vitest.config.ts package.json package-lock.json` as "Opening: business data and test setup".

---

### Task 2: Morph maths

**Files:**
- Create: `lib/morph.ts`, `lib/morph.test.ts`

**Interfaces:**
- Produces:
  - `const PARTICLE_COUNT = 60000`
  - `ease(t: number): number`: smoothstep, clamped to 0..1
  - `resample(points: Float32Array, count: number): Float32Array`: returns exactly `count * 3` floats; every output point is one of the input points; deterministic for the same input (index `i` takes input point `(i * 2654435761) % n`)
  - `blend(from: Float32Array, to: Float32Array, t: number): Float32Array`: per-point linear mix at `ease(t)`; this is where a morph is "now", used to retarget mid-morph
  - `capDelta(seconds: number): number`: `Math.min(seconds, 0.05)`

- [ ] **Step 1: Write the failing tests** in `lib/morph.test.ts`

```ts
import { blend, capDelta, ease, resample } from "./morph";

test("resample returns the asked count using only source points", () => {
  const src = new Float32Array([0, 0, 0, 1, 1, 1, 2, 2, 2]);
  const out = resample(src, 10);
  expect(out.length).toBe(30);
  for (let i = 0; i < 10; i++) expect([0, 1, 2]).toContain(out[i * 3]);
  expect(resample(src, 10)).toEqual(out);
});

test("blend starts at from, ends at to, and is halfway in the middle", () => {
  const a = new Float32Array([0, 0, 0]);
  const b = new Float32Array([2, 4, 6]);
  expect(Array.from(blend(a, b, 0))).toEqual([0, 0, 0]);
  expect(Array.from(blend(a, b, 1))).toEqual([2, 4, 6]);
  expect(Array.from(blend(a, b, 0.5))).toEqual([1, 2, 3]);
});

test("easing and frame delta stay in range", () => {
  expect(ease(-1)).toBe(0);
  expect(ease(2)).toBe(1);
  expect(capDelta(3)).toBe(0.05);
});
```

- [ ] **Step 2: Run** `rtk proxy npm test`. Expected: FAIL, module not found.
- [ ] **Step 3: Implement the five exports** in `lib/morph.ts`.
- [ ] **Step 4: Run the tests.** Expected: PASS.
- [ ] **Step 5: Commit** as "Opening: morph maths".

---

### Task 3: The opening shell, the canvas and the fallback

**Files:**
- Create: `components/opening/Opening.tsx`, `components/opening/Scene.tsx`, `components/opening/opening.css`
- Modify: `app/page.tsx` (the `<section className="hero">` block becomes `<Opening fallback={<Skyline />} />`; the two sections below stay)

**Interfaces:**
- Consumes: everything from `lib/businesses.ts`.
- Produces:
  - `Opening({ fallback }: { fallback: React.ReactNode })`: client component. Holds `business: BusinessId` (starts at `DEFAULT_BUSINESS`), sets the CSS variable `--acc` on its root to the accent, renders the headline, the lead for the chosen business, the ask and five picker buttons (`aria-pressed` on the chosen one), and the "Talk about my business" link to `/contact`.
  - `Scene({ business, reducedMotion }: { business: BusinessId; reducedMotion: boolean })`: default export, loaded with `dynamic(() => import("./Scene"), { ssr: false })` from inside `Opening`.

- [ ] **Step 1: Build `Opening`** with the copy on the left and the canvas filling the section behind it (canvas `position: absolute; inset: 0`, copy `z-index: 1`, max width 560px). Under 760px the copy sits above and the canvas takes the lower 55% of the section.
- [ ] **Step 2: Fallback rule.** `Opening` shows `fallback` instead of `Scene` when a WebGL2 context cannot be created (checked once in an effect) or when `Scene` throws (wrap it in an error boundary). Until `Scene` has mounted, the section shows the existing radial background, so there is never an empty screen.
- [ ] **Step 3: Build `Scene`** with a placeholder subject (one rounded box in the accent colour): `Canvas` with `dpr={[1, 2]}`, perspective camera at `[0, 1.6, 8]` with fov 38, the model group offset to the right on wide screens (`x = 1.9`) and centred on narrow ones, a key light in the accent colour, a cool rim light, soft ambient, and `EffectComposer` with `Bloom` (intensity 0.9, luminanceThreshold 0.6). The pointer orbits the group by up to ±0.45 rad horizontally and ±0.2 rad vertically, eased; with `reducedMotion` the group stays still.
- [ ] **Step 4: Verify in the browser.** Run `rtk proxy npm run dev`, open `http://localhost:3000`:
  - the box appears on the right, changes colour with each picker button, and the lead text changes
  - at 390px width the copy is readable and the five buttons are all tappable
  - with WebGL disabled (Chrome flag `--disable-gpu --disable-webgl` or a temporary `throw` in `Scene`), the skyline hero appears
  - `/privacy`, `/contact`, `/delete-account` and `/googleb929b81e251b9750.html` still load
- [ ] **Step 5: Run** `rtk proxy npm run build`. Expected: build succeeds with no type errors.
- [ ] **Step 6: Commit** as "Opening: shell, canvas and fallback".

---

### Task 4: The kit of parts and the restaurant (look gate)

**Files:**
- Create: `components/opening/parts.tsx`, `components/opening/models/Restaurant.tsx`, `components/opening/BusinessModel.tsx`
- Modify: `components/opening/Scene.tsx` (placeholder box replaced by `BusinessModel`)

**Interfaces:**
- Produces:
  - `parts.tsx`: `Shell` (rounded building body with a base slab), `Windows` (instanced emissive panes on a grid, with a `lit` ratio), `Awning`, `Sign` (glowing bar in the accent), `Door`, `Table`, `Chair`, `Plant`, `Lamp`, `Counter`, `Shelf`. Each takes `position`, `scale` and, where it glows, `accent: string`. Bodies use one shared dark indigo `MeshStandardMaterial`; glowing parts use emissive materials above the bloom threshold.
  - `Restaurant({ accent }: { accent: string })`: a group about 4 units wide and 3.4 tall.
  - `BusinessModel({ business, visible }: { business: BusinessId; visible: number })`: renders the model for the id and scales/fades it by `visible` (0..1). Forwards a ref to its group so `Particles` can sample it.

- [ ] **Step 1: Build the kit** in `parts.tsx`.
- [ ] **Step 2: Build the restaurant** from at least 60 placed parts: a two-storey corner building, a striped awning, a glowing sign, tall lit windows with visible tables and lamps inside, a terrace with four tables and chairs, planters, a chimney, a rooftop herb garden and string lights. It must read as "a restaurant" in a still image without any label.
- [ ] **Step 3: Verify.** Take screenshots at 1440×900 from three pointer positions (left, centre, right). Check: reads as a restaurant, edges glow without washing out, no z-fighting, steady frame rate in the Chrome performance overlay (55 fps or better on this laptop).
- [ ] **Step 4: Commit** as "Opening: kit of parts and restaurant".
- [ ] **Step 5: Look gate.** Show Pini the three screenshots and the running page. If he approves the style, go on. If not, record what is missing; if the answer is "not detailed enough", switch to CC0 kit models behind `BusinessModel` (see "Deviation from the spec") and repeat this task.

---

### Task 5: The other four models

**Files:**
- Create: `components/opening/models/Clinic.tsx`, `Shop.tsx`, `Studio.tsx`, `Other.tsx`
- Modify: `components/opening/BusinessModel.tsx`, `components/opening/parts.tsx` (new parts only where a model needs one)

**Interfaces:**
- Consumes: the kit and `BusinessModel` from Task 4.
- Produces: four components with the same props as `Restaurant`, all within the same 4 × 3.4 bounds so the camera never moves between them.

- [ ] **Step 1: Clinic.** Calm, wide, single-storey with a glass front, a glowing cross-free health mark (a soft ring), a reception counter, a waiting row of chairs, two treatment rooms visible through windows, a roof garden.
- [ ] **Step 2: Shop.** A tall narrow storefront, a large display window with shelves of small glowing products, a hanging sign, an open door, stacked parcels, a striped awning in pink.
- [ ] **Step 3: Studio.** A loft with a sawtooth roof, big desks with glowing screens, a wall of pinned frames, a meeting table, a spiral stair, plants.
- [ ] **Step 4: Other.** An abstract building: stacked offset floors with a rooftop terrace and one bright window pattern, clearly a building and clearly not one specific trade.
- [ ] **Step 5: Verify.** One screenshot per business at 1440×900. Each must be recognisable without its label, and the five must look like one family.
- [ ] **Step 6: Commit** as "Opening: clinic, shop, studio and default models".

---

### Task 6: The particle morph

**Files:**
- Create: `components/opening/Particles.tsx`
- Modify: `components/opening/Scene.tsx`, `components/opening/BusinessModel.tsx`

**Interfaces:**
- Consumes: `PARTICLE_COUNT`, `resample`, `blend`, `ease`, `capDelta` from `lib/morph.ts`; the group ref from `BusinessModel`.
- Produces: `Particles({ target, accent, reducedMotion, onProgress }: { target: THREE.Group | null; accent: string; reducedMotion: boolean; onProgress: (p: number) => void })`.

- [ ] **Step 1: Sampling.** When `target` changes, sample its meshes with `MeshSurfaceSampler` (`three/addons/math/MeshSurfaceSampler.js`), weighting each mesh by surface area, into about 20,000 points in the group's local space, then `resample` to `PARTICLE_COUNT`. Cache the result per business id.
- [ ] **Step 2: Shader.** One `THREE.Points` with attributes `aFrom`, `aTo`, `aSeed` and uniforms `uProgress`, `uTime`, `uAccent`, `uPointer`. Position is `mix(aFrom, aTo, ease(uProgress))` plus a swirl offset around the vertical axis whose strength is `sin(PI * uProgress)` times a radius of 2.4 and a per-particle seed, plus a small idle shimmer. Particles within 0.9 units of the pointer ray are pushed away by up to 0.35. Point size 2.2px scaled by depth, additive blending, colour mixed from ivory to the accent by seed.
- [ ] **Step 3: Timeline.** A morph lasts 2.2 seconds. On a new target: `aFrom` becomes `blend(oldFrom, oldTo, currentProgress)` (so a second click mid-morph starts from where the particles are), `aTo` becomes the new sample, progress restarts at 0. The frame delta goes through `capDelta`. `onProgress` drives the solid meshes: the old model's `visible` drops to 0 during the first 25% and the new one rises during the last 30%.
- [ ] **Step 4: Reduced motion.** With `reducedMotion`, skip the swirl and the pointer push; cross-fade the solid models over 0.3 seconds and set the particles straight to the new sample.
- [ ] **Step 5: Verify in the browser.**
  - click each business in turn: the model tears apart, swirls, and re-forms as the new one, with the accent and lead text changing at the same moment
  - click two businesses 0.5 seconds apart: no jump, ends on the second
  - switch to another tab for 20 seconds mid-morph and return: no explosion
  - emulate `prefers-reduced-motion: reduce`: a plain fade
  - frame rate stays at 55 fps or better during a morph
- [ ] **Step 6: Run** `rtk proxy npm test` and `rtk proxy npm run build`. Expected: all pass.
- [ ] **Step 7: Commit** as "Opening: particle morph between businesses".

---

### Task 7: Arrival, per-business light, and the approval build

**Files:**
- Modify: `components/opening/Scene.tsx`, `components/opening/Opening.tsx`, `components/opening/opening.css`

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Arrival.** On first load the particles start as a loose drifting cloud and form the default building over 2.6 seconds while the headline, lead and picker rise in one after another (0.12 seconds apart). This is the loading sequence: the page is readable from the first frame.
- [ ] **Step 2: Light per business.** Key light colour and a slow background gradient follow the accent; both ease over the morph's 2.2 seconds.
- [ ] **Step 3: Final checks.** Repeat the Task 3 and Task 6 browser checks, plus a keyboard pass: the picker is reachable with Tab, operable with Enter and Space, and focus is visible.
- [ ] **Step 4: Commit** as "Opening: arrival sequence and per-business light".
- [ ] **Step 5: Approval build.** With Pini's yes for the push (company policy requires asking), push the branch `opening-scene` to `pini236/website` so Vercel makes a preview address, and give Pini that address. `main` is merged only after he approves the look.
