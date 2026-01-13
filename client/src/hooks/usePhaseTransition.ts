import { useState, useEffect } from "react";

type Phase = "text" | "fadeout" | "form";

export function usePhaseTransition() {
  const [phase, _setPhase] = useState<Phase>("text");

  useEffect(() => {
    // After 10 seconds, transition to fadeout
    // const fadeoutTimer = setTimeout(() => {
    //   setPhase("fadeout");
    // }, 10000);
    // // After fadeout animation (2s), transition to form
    // const formTimer = setTimeout(() => {
    //   setPhase("form");
    // }, 12000);
    // return () => {
    //   clearTimeout(fadeoutTimer);
    //   clearTimeout(formTimer);
    // };
  }, []);

  return phase;
}
