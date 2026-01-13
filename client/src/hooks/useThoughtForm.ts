import { useState } from "react";
import { gsap } from "gsap";

export function useThoughtForm() {
  const [thought, setThought] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const thoughtValue = formData.get("thought") as string;

    if (thoughtValue.trim()) {
      setThought(thoughtValue);
      setIsSubmitted(true);
    }

    // Continuous floating animation
    gsap.to(".thought-display", {
      y: "+=50",
      duration: 10,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Main timeline
    const tl = gsap.timeline();

    // Step 1: Shrink over 20 seconds
    tl.to(".thought-display", {
      duration: 20,
      scale: 0.2,
      ease: "power1.inOut",
    });

    // Step 2: Move to the right until disappearing
    tl.to(".thought-display", {
      duration: 30,
      x: () => window.innerWidth,
      ease: "power2.in",
    });
  };

  return {
    thought,
    isSubmitted,
    onSubmit,
  };
}
