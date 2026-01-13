import { useMemo } from "react";
import { CLOUDS } from "../config/cloudConfig";
import "../styles/sky.css";

type CloudRefs = {
  current: (HTMLImageElement | null)[];
};

interface SkyProps {
  cloudRefs: CloudRefs;
}

export function Sky({ cloudRefs }: SkyProps) {
  // Calculate base indices for each cloud group
  const baseIndices = useMemo(() => {
    const indices = [0];
    for (let i = 1; i < CLOUDS.length; i++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += CLOUDS[j].count;
      }
      indices[i] = sum;
    }
    return indices;
  }, []);

  return (
    <div className="sky">
      <div className="stars"></div>
      <img className="sun" src="/sun.svg" alt="Sun" />
      <div className="clouds">
        {CLOUDS.map((cloudGroup, groupIndex) =>
          Array.from({ length: cloudGroup.count }).map((_, index) => {
            const cloudIndex = baseIndices[groupIndex] + index;
            return (
              <img
                key={`${cloudGroup.size}-${index}`}
                className={`cloud-${cloudGroup.size} cloud-floating`}
                src={cloudGroup.images[index % cloudGroup.images.length]}
                alt={`Cloud ${cloudGroup.size}-${index}`}
                ref={(el) => {
                  cloudRefs.current[cloudIndex] = el;
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
