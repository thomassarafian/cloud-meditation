import "../styles/thoughtForm.css";

interface ThoughtFormProps {
  thought: string;
  isSubmitted: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ThoughtForm({
  thought,
  isSubmitted,
  onSubmit,
}: ThoughtFormProps) {
  return (
    <div className="fade">
      <div className="fade-overlay"></div>

      <div className="meditation-text">
        <p className="meditation-phrase"></p>
      </div>

      <div className="final-message">
        <h2>Merci d'avoir pris ce temps pour toi.</h2>
        <p>J'espère que tu te sens un peu plus léger, un peu plus paisible.</p>
        <br></br>
        <p>❤️</p>
        <p>Thomas Sarafian</p>
        <p>
          <em>thomassarafian@gmail.com</em>
        </p>
      </div>

      {isSubmitted && <div className="meditation-progress" />}

      <form onSubmit={onSubmit} className="thought-form" id="thought-form">
        <div className="thought-display">
          <img
            className="cloud-thought-display"
            src="/cloud-thought.svg"
            alt="Cloud"
          />
          {thought && <p className="thought-text">{thought}</p>}
        </div>

        <div
          className={`form-content ${
            thought || isSubmitted ? "disappear" : "appear"
          }`}
        >
          <label htmlFor="thought" className="visually-hidden">
            Qu'est-ce qui vous pèse ?
          </label>
          <input
            className="input-thought"
            name="thought"
            id="thought"
            placeholder="Qu'est-ce qui vous pèse ?"
            required
            autoComplete="off"
            aria-describedby="form-hint"
          />
          <button
            type="submit"
            className={`button-thought ${isSubmitted ? "loading" : ""}`}
            disabled={isSubmitted}
          >
            {isSubmitted ? "..." : "Lâcher-prise"}
          </button>
          <p className="form-hint" id="form-hint">
            Laissez votre pensée s'envoler
          </p>
        </div>
      </form>
    </div>
  );
}
