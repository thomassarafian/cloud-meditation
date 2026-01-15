import { useMemo } from "react";
import { CLOUDS, CLOUD_CONFIGS } from "../config/cloudConfig";
import "../styles/sky.css";

function getCloudAnimationStyle(
  sizeClass: string,
  index: number
): React.CSSProperties {
  const config = CLOUD_CONFIGS.find((c) => c.class === `cloud-${sizeClass}`);
  if (!config) return {};

  const duration =
    config.duration.min +
    Math.random() * (config.duration.max - config.duration.min);
  const startY =
    config.yRange.min + Math.random() * (config.yRange.max - config.yRange.min);
  const drift = (config.yRange.max - config.yRange.min) * 0.5;
  const endY = startY + (Math.random() * drift - drift / 2);
  const delay = index * config.delayMultiplier;

  return {
    "--duration": `${duration}s`,
    "--delay": `${delay}s`,
    "--start-y": `${startY}%`,
    "--end-y": `${endY}%`,
  } as React.CSSProperties;
}

export function Sky() {
  const cloudStyles = useMemo(() => {
    return CLOUDS.flatMap((cloudGroup) =>
      Array.from({ length: cloudGroup.count }).map((_, index) =>
        getCloudAnimationStyle(cloudGroup.size, index)
      )
    );
  }, []);

  let cloudIndex = 0;

  return (
    <div className="sky">
      <img className="stars-bg" src="/stars-bg-blue.svg" alt="Stars" />
      <img className="moon" src="/moon.svg" alt="Moon" />
      <div className="clouds">
        {CLOUDS.map((cloudGroup) =>
          Array.from({ length: cloudGroup.count }).map((_, index) => {
            const currentIndex = cloudIndex++;
            return (
              <img
                key={`${cloudGroup.size}-${index}`}
                className={`cloud-${cloudGroup.size} cloud-floating`}
                src={cloudGroup.images[index % cloudGroup.images.length]}
                alt={`Cloud ${cloudGroup.size}-${index}`}
                style={cloudStyles[currentIndex]}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
