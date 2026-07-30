import type { Metadata } from "next";
import { PlaygroundShell } from "@/components/playground/playground-shell";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Creative lab — generative fields, algorithm scrubs, code-split experiments.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PlaygroundPage() {
  return <PlaygroundShell />;
}
