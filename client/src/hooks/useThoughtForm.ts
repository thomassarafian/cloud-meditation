import { useState } from "react";
import { gsap } from "gsap";

// Meditation phrases - appear in sequence
const MEDITATION_PHRASES = [
  "Observe cette pensée...",
  "Elle n'est qu'un nuage dans le ciel de ton esprit.",
  "Comme tous les nuages, elle est passagère.",
  "Tu n'es pas cette pensée.",
  "Laisse-la s'éloigner doucement...",
  "Elle rejoint les autres nuages.",
  "Toi, tu restes. Paisible. Present.",
];

export function useThoughtForm() {
  const [thought, setThought] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const thoughtValue = formData.get("thought") as string;

    if (!thoughtValue.trim()) return;

    setThought(thoughtValue);
    setIsSubmitted(true);

    const thoughtDisplay = document.querySelector(
      ".thought-display"
    ) as HTMLElement;
    const fadeOverlay = document.querySelector(".fade-overlay");
    const formContent = document.querySelector(".form-content");
    const meditationPhrase = document.querySelector(".meditation-phrase");

    if (!thoughtDisplay) return;

    // Remove CSS animation and reset transform so GSAP can control it
    thoughtDisplay.style.animation = "none";
    gsap.set(thoughtDisplay, {
      clearProps: "transform",
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    });

    // Fade out the form content
    if (formContent) {
      gsap.to(formContent, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    // Main cloud animation timeline
    const cloudTl = gsap.timeline({ delay: 0.5 });

    // Step 1: Gently descend to make room for meditation phrases (3s)
    cloudTl.to(thoughtDisplay, {
      y: 80,
      duration: 5,
      ease: "sine.inOut",
    });

    // Step 2: Shrink smoothly to blend with other clouds (10s)
    cloudTl.to(thoughtDisplay, {
      scale: 0.2,
      y: 50,
      duration: 20,
      ease: "sine.inOut",
    });

    // Step 3: Drift right until off-screen (40s)
    cloudTl.to(thoughtDisplay, {
      x: window.innerWidth + 400,
      opacity: 0.6,
      duration: 50,
      ease: "sine.inOut",
    });

    // Fade out the dark overlay during step 2
    if (fadeOverlay) {
      gsap.to(fadeOverlay, {
        opacity: 0,
        duration: 6,
        delay: 4,
        ease: "sine.out",
      });
    }

    // Meditation phrases animation
    if (meditationPhrase) {
      const phraseTl = gsap.timeline({ delay: 1 });
      const phraseDuration = 3; // Each phrase visible for 3s
      const fadeTime = 0.8;

      MEDITATION_PHRASES.forEach((phrase, index) => {
        // Set the text
        phraseTl.call(() => {
          meditationPhrase.textContent = phrase;
        });

        // Fade in
        phraseTl.to(meditationPhrase, {
          opacity: 1,
          duration: fadeTime,
          ease: "sine.out",
        });

        // Hold
        phraseTl.to(meditationPhrase, {
          duration: phraseDuration,
        });

        // Fade out (except for last phrase which stays)
        if (index < MEDITATION_PHRASES.length - 1) {
          phraseTl.to(meditationPhrase, {
            opacity: 0,
            duration: fadeTime,
            ease: "sine.in",
          });
        }
      });
    }
  };

  return {
    thought,
    isSubmitted,
    onSubmit,
  };
}
