import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const MEDITATION_PHRASES = [
  "Observe cette pensée... comme on regarde un petit nuage dans le ciel.",
  "Elle est là pour un moment. Puis elle change doucement.",
  "Les nuages passent. Le ciel reste.",
  "Tu peux laisser la pensée flotter,  sans la toucher, sans la pousser.",
  "Elle s'éloigne toute seule. Tranquillement.",
  "Toi, tu es là. Calme. Présent.",
  "Comme le ciel qui accueille tout. Grand. Ouvert.",
  "Respire doucement... Sens que tu es vivant. Ici. Maintenant.",
];

export function useThoughtForm() {
  const [thought, setThought] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const bellRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    musicRef.current = new Audio("/bg-music.mp3");
    musicRef.current.preload = "auto";
    musicRef.current.volume = 0;

    bellRef.current = new Audio("/bell sound.mov");
    bellRef.current.preload = "auto";
    bellRef.current.volume = 0;
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const thoughtValue = formData.get("thought") as string;

    if (!thoughtValue.trim()) return;

    setThought(thoughtValue);
    setIsSubmitted(true);

    if (bellRef.current) {
      bellRef.current.play();
      gsap.to(bellRef.current, {
        volume: 0.1,
        duration: 0.5,
        ease: "sine.in",
        onComplete: () => {
          gsap.to(bellRef.current, {
            volume: 0,
            duration: 4,
            delay: 4,
            ease: "sine.out",
          });
        },
      });
    }

    if (musicRef.current) {
      musicRef.current.play();
      gsap.to(musicRef.current, {
        volume: 0.3,
        duration: 10,
        ease: "sine.in",
      });
    }

    gsap.delayedCall(60, () => {
      const meditationPhrase = document.querySelector(".meditation-phrase");
      const finalMessage = document.querySelector(".final-message");

      if (meditationPhrase) {
        gsap.to(meditationPhrase, {
          opacity: 0,
          duration: 1.5,
          ease: "sine.out",
        });
      }

      if (finalMessage) {
        gsap.to(finalMessage, {
          opacity: 1,
          duration: 2,
          delay: 1,
          ease: "sine.out",
        });
      }
    });

    const thoughtDisplay = document.querySelector(
      ".thought-display"
    ) as HTMLElement;
    const cloudImage = document.querySelector(
      ".cloud-thought-display"
    ) as HTMLElement;
    const fadeOverlay = document.querySelector(".fade-overlay");
    const formContent = document.querySelector(".form-content");
    const meditationPhrase = document.querySelector(".meditation-phrase");

    if (!thoughtDisplay) return;

    let currentScale = 1;
    if (cloudImage) {
      const computedStyle = window.getComputedStyle(cloudImage);
      const matrix = new DOMMatrix(computedStyle.transform);
      currentScale = matrix.a;
    }

    thoughtDisplay.style.animation = "none";
    if (cloudImage) {
      cloudImage.style.animation = "none";
      gsap.set(cloudImage, { scale: currentScale });
      gsap.to(cloudImage, {
        scale: 1,
        duration: 5,
        ease: "sine.inOut",
      });
    }
    gsap.set(thoughtDisplay, {
      clearProps: "transform",
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    });

    if (formContent) {
      gsap.to(formContent, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    const cloudTl = gsap.timeline({ delay: 0.5 });

    cloudTl.to(thoughtDisplay, {
      y: 80,
      duration: 5,
      ease: "sine.inOut",
    });

    cloudTl.to(thoughtDisplay, {
      scale: 0.2,
      y: 50,
      duration: 30,
      opacity: 0.8,
      ease: "sine.inOut",
    });

    cloudTl.to(thoughtDisplay, {
      x: window.innerWidth + 400,
      duration: 50,
      ease: "sine.inOut",
    });

    if (fadeOverlay) {
      gsap.to(fadeOverlay, {
        opacity: 0,
        duration: 6,
        delay: 4,
        ease: "sine.out",
      });
    }

    if (meditationPhrase) {
      const phraseTl = gsap.timeline({ delay: 1 });
      const phraseDuration = 5;
      const fadeTime = 0.8;

      MEDITATION_PHRASES.forEach((phrase, index) => {
        phraseTl.call(() => {
          meditationPhrase.textContent = phrase;
        });

        phraseTl.to(meditationPhrase, {
          opacity: 1,
          duration: fadeTime,
          ease: "sine.out",
        });

        phraseTl.to(meditationPhrase, {
          duration: phraseDuration,
        });

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
