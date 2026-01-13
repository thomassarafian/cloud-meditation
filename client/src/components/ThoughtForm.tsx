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
      <form
        action={"/"}
        onSubmit={onSubmit}
        className="thought-form"
        id="thought-form"
      >
        <div className="thought-display">
          <img
            className="cloud-thought-display"
            src="/cloud-thought.svg"
            alt="Cloud"
          />
          {thought && <p className="thought-text">{thought}</p>}
        </div>
        {!isSubmitted && !thought && (
          <>
            <input
              className="input-thought"
              name="thought"
              id="thought"
              placeholder="What bothering you ?"
              required
            />
            <button type="submit" className="button-thought">
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}
