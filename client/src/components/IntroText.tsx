import "../styles/intro.css";

interface IntroTextProps {
  onStart: () => void;
}

export function IntroText({ onStart }: IntroTextProps) {
  return (
    <div className="intro">
      <div className="intro-content">
        <h1>Méditation 60 secondes</h1>
        <h2>
          Une meditation pour permettre de relativiser avec une symbolique
          bouddhiste.
        </h2>
        <button className="intro-button" onClick={onStart}>
          Commencer
        </button>
      </div>
    </div>
  );
}
