import { useState } from "react";

export type Phase = "text" | "fadeout" | "form";

export function usePhaseTransition() {
  const [phase, setPhase] = useState<Phase>("text");

  const goToForm = () => {
    setPhase("form");
  };

  return { phase, goToForm };
}
