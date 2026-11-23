"use client";

import type { Ref } from "react";
import type { Group } from "three";
import { BUSINESSES, type BusinessId } from "@/lib/businesses";
import { FLOOR } from "./parts";
import { Restaurant } from "./models/Restaurant";

const MODELS: Partial<Record<BusinessId, typeof Restaurant>> = { restaurant: Restaurant };

export function BusinessModel({ business, visible, ref }: { business: BusinessId; visible: number; ref?: Ref<Group> }) {
  const Model = MODELS[business] ?? Restaurant;
  return (
    <group scale={Math.max(visible, 0.001)} visible={visible > 0.01}>
      <group ref={ref} position={[0, FLOOR, 0]} rotation={[0, -0.55, 0]} scale={0.8}>
        <Model accent={BUSINESSES[business].accent} />
      </group>
    </group>
  );
}
