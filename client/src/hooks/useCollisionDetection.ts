import { useEffect, useRef } from "react";

type LetterRefs = {
  current: (HTMLSpanElement | null)[];
};

type Phase = "text" | "fadeout" | "form";

export function useCollisionDetection(
  letterRefs: LetterRefs,
  phase: Phase = "text"
) {
  const letterRects = useRef<DOMRect[]>([]);
  const cloudRects = useRef<DOMRect[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const isActive = phase === "text";

  useEffect(() => {
    if (!isActive) {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      return;
    }

    // Update letter positions (static, only once)
    const updateLetterRects = () => {
      letterRects.current = letterRefs.current.map((l) =>
        l ? l.getBoundingClientRect() : new DOMRect()
      );
    };

    // Update cloud positions (moving)
    const updateCloudRects = () => {
      const clouds = Array.from(document.querySelectorAll(".cloud-floating"));
      cloudRects.current = clouds.map((cloud) =>
        (cloud as Element).getBoundingClientRect()
      );
    };

    // Build letter refs once
    const buildLetterRefs = () => {
      const nodeList = Array.from(
        document.querySelectorAll<HTMLSpanElement>(".split-text .letter")
      );
      letterRefs.current = nodeList;
      updateLetterRects();
    };

    // Check collisions
    const checkPositions = () => {
      if (!isActive) return;

      updateCloudRects();

      const letters = letterRefs.current;
      const lrects = letterRects.current;
      const crects = cloudRects.current;

      // Check each letter against each cloud
      letters.forEach((letterEl, i) => {
        if (!letterEl) return;

        const letterRect = lrects[i];
        if (!letterRect || letterRect.width === 0 || letterRect.height === 0) {
          return;
        }

        let isColliding = false;

        for (const cloudRect of crects) {
          if (
            cloudRect.width === 0 ||
            cloudRect.height === 0 ||
            cloudRect.left + 4 >= letterRect.right ||
            cloudRect.right - 4 <= letterRect.left ||
            cloudRect.top + 4 >= letterRect.bottom ||
            cloudRect.bottom - 4 <= letterRect.top
          ) {
            continue;
          }

          isColliding = true;
          break;
        }

        letterEl.style.setProperty("--glow", isColliding ? "1" : "0");
      });

      animationFrameId.current = requestAnimationFrame(checkPositions);
    };

    // Initialize
    buildLetterRefs();
    updateCloudRects();
    animationFrameId.current = requestAnimationFrame(checkPositions);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [letterRefs, isActive]);
}
