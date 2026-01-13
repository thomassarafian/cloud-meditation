import { SplitText } from "./SplitText";
import "../styles/intro.css";

type LetterRefs = {
  current: (HTMLSpanElement | null)[];
};

interface IntroTextProps {
  isCloudBehind: boolean;
  letterRefs: LetterRefs;
}

export function IntroText({ isCloudBehind, letterRefs }: IntroTextProps) {
  const title = "Méditation 60 secondes";
  const subtitle =
    "Une meditation pour permettre de relativiser avec une symbolique bouddhiste.";

  const titleStartIndex = 0;
  const subtitleStartIndex = title.length;

  return (
    <div className={`intro ${isCloudBehind ? "cloud-light" : ""}`}>
      <h1>
        <SplitText
          text={title}
          letterRefs={letterRefs}
          startIndex={titleStartIndex}
        />
      </h1>
      <h2>
        <SplitText
          text={subtitle}
          letterRefs={letterRefs}
          startIndex={subtitleStartIndex}
        />
      </h2>
    </div>
  );
}
