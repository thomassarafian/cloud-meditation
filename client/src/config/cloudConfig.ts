export const CLOUD_CONFIGS = [
  {
    class: "cloud-xs",
    duration: { min: 150, max: 200 },
    yRange: { min: 10, max: 200 },
    delayMultiplier: 5,
  },
  {
    class: "cloud-s",
    duration: { min: 100, max: 150 },
    yRange: { min: 15, max: 200 },
    delayMultiplier: 3,
  },
  {
    class: "cloud-m",
    duration: { min: 70, max: 100 },
    yRange: { min: 20, max: 200 },
    delayMultiplier: 2,
  },
  {
    class: "cloud-l",
    duration: { min: 50, max: 70 },
    yRange: { min: 25, max: 200 },
    delayMultiplier: 1.5,
  },
];

export const CLOUDS = [
  { size: "xs", count: 2, images: ["/C1.webp", "/C2.webp"] },
  { size: "s", count: 2, images: ["/C2.webp", "/C1.webp"] },
  { size: "m", count: 2, images: ["/C1.webp", "/C1.webp"] },
  { size: "l", count: 2, images: ["/C1.webp", "/C1.webp"] },
];
