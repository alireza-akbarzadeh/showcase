import { AppShell } from "@/components/layout";
import { ScrollRoot } from "@/components/scroll";
import { CanvasRoot, ScrollMesh } from "@/components/canvas";
import { SceneHost } from "@/components/creative";

export default function HomePage() {
  return (
    <ScrollRoot>
      <CanvasRoot>
        <ScrollMesh />
      </CanvasRoot>
      <AppShell>
        <SceneHost />
      </AppShell>
    </ScrollRoot>
  );
}
