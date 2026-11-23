"use client";

import type { Ref } from "react";
import type { Group } from "three";
import { BUSINESSES, type BusinessId } from "@/lib/businesses";
import { FLOOR } from "./parts";
import { Other } from "./models/Other";
import { Restaurant } from "./models/Restaurant";

const MODELS: Partial<Record<BusinessId, typeof Restaurant>> = { restaurant: Restaurant, other: Other };

export function BusinessModel({ business, ref }: { business: BusinessId; ref?: Ref<Group> }) {
  const Model = MODELS[business] ?? Other;
  return (
    <group ref={ref} position={[0, FLOOR, 0]} scale={0.001}>
      <group rotation={[0, -0.55, 0]} scale={0.8}>
        <Model accent={BUSINESSES[business].accent} />
      </group>
    </group>
  );
}
