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

      {/* Meditation phrases will appear here */}
      <div className="meditation-text">
        <p className="meditation-phrase"></p>
      </div>

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
          <input
            className="input-thought"
            name="thought"
            id="thought"
            placeholder="Qu'est-ce qui vous pese ?"
            required
            autoComplete="off"
          />
          <button type="submit" className="button-thought">
            Lacher prise
          </button>
          <p className="form-hint">
            Laissez votre pensee s'envoler avec les nuages
          </p>
        </div>
      </form>
    </div>
  );
}
