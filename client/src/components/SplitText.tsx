type LetterRefs = {
  current: (HTMLSpanElement | null)[];
};

interface SplitTextProps {
  text: string;
  letterRefs: LetterRefs;
  startIndex?: number;
}

export function SplitText({
  text,
  letterRefs,
  startIndex = 0,
}: SplitTextProps) {
  return (
    <span className="split-text">
      {text.split("").map((char, i) => {
        const index = startIndex + i;
        return (
          <span
            key={`${startIndex}-${i}`}
            className="letter"
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}

