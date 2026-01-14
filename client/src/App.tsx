import { IntroText } from "./components/IntroText";
import { Sky } from "./components/Sky";
import { ThoughtForm } from "./components/ThoughtForm";
import { usePhaseTransition } from "./hooks/usePhaseTransition";
import { useThoughtForm } from "./hooks/useThoughtForm";
import "./styles/variables.css";

function App() {
  const { phase, goToForm } = usePhaseTransition();
  const { thought, isSubmitted, onSubmit } = useThoughtForm();

  return (
    <>
      {phase === "text" && <IntroText onStart={goToForm} />}

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

      <Sky />
    </>
  );
}

export default App;
