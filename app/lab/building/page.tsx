import type { Metadata } from "next";
import { Building } from "@/components/lab/Building";

export const metadata: Metadata = { title: "Lab", robots: { index: false } };

export default function Lab() {
  return <Building />;
}
