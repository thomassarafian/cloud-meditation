import { useRef, useState } from "react";
import { IntroText } from "./components/IntroText";
import { Sky } from "./components/Sky";
import { ThoughtForm } from "./components/ThoughtForm";
import { useCloudAnimations } from "./hooks/useCloudAnimations";
import { useCollisionDetection } from "./hooks/useCollisionDetection";
import { usePhaseTransition } from "./hooks/usePhaseTransition";
import { useThoughtForm } from "./hooks/useThoughtForm";
import "./styles/variables.css";

function App() {
  const phase = usePhaseTransition();
  const { thought, isSubmitted, onSubmit } = useThoughtForm();
  const cloudRefs = useRef<(HTMLImageElement | null)[]>([]);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isCloudBehind] = useState(false);

  // Initialize cloud animations
  useCloudAnimations();

  // Initialize collision detection for letter glow effect (only active in "text" phase)
  useCollisionDetection(letterRefs, phase);

  return (
    <>
      {phase === "text" && (
        <IntroText isCloudBehind={isCloudBehind} letterRefs={letterRefs} />
      )}

      {phase === "fadeout" && (
        <div className="fadeout intro">
          <h1>Méditation 60 secondes</h1>
          <h2>
            Une meditation pour permettre de relativiser avec une symbolique
            bouddhiste.
          </h2>
        </div>
      )}

      {phase === "form" && (
        <ThoughtForm
          thought={thought}
          isSubmitted={isSubmitted}
          onSubmit={onSubmit}
        />
      )}

      <Sky cloudRefs={cloudRefs} />
    </>
  );
}

export default App;
