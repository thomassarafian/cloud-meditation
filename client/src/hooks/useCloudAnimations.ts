import { useEffect } from "react";
import { gsap } from "gsap";
import { CLOUD_CONFIGS } from "../config/cloudConfig";

export function useCloudAnimations() {
  useEffect(() => {
    const animateClouds = () => {
      const viewportWidth = window.innerWidth;
      const animationDistance = viewportWidth + 400;

      CLOUD_CONFIGS.forEach((config) => {
        gsap.utils
          .toArray<HTMLElement>(`.${config.class}`)
          .forEach((cloud, index) => {
            const startY =
              Math.random() * (config.yRange.max - config.yRange.min) +
              config.yRange.min;
            const drift = (config.yRange.max - config.yRange.min) * 0.5;
            const endY = startY + (Math.random() * drift - drift / 2);
            const duration =
              config.duration.min +
              Math.random() * (config.duration.max - config.duration.min);

            gsap.fromTo(
              cloud,
              { x: -400, y: `${startY}%` },
              {
                x: animationDistance,
                y: `${endY}%`,
                duration,
                ease: "none",
                repeat: -1,
                delay: index * config.delayMultiplier,
              }
            );
          });
      });
    };

    animateClouds();

    const handleResize = () => {
      gsap.killTweensOf(
        ".cloud-xs, .cloud-s, .cloud-m, .cloud-l, .cloud-floating"
      );
      animateClouds();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      gsap.killTweensOf(
        ".cloud-xs, .cloud-s, .cloud-m, .cloud-l, .cloud-floating"
      );
    };
  }, []);
}
