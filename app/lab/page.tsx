import type { Metadata } from "next";
import { Blueprint } from "@/components/lab/Blueprint";

export const metadata: Metadata = { title: "Lab", robots: { index: false } };

export default function Lab() {
  return <Blueprint />;
}
