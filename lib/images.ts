export type ImageDim = { width: number; height: number };

/**
 * Intrinsic pixel dimensions for the post imagery in /public/images.
 * Used so the MDX <Figure> can render next/image with a correct
 * aspect ratio (string `src` requires explicit width/height).
 */
export const IMAGE_DIMENSIONS: Record<string, ImageDim> = {
  "/images/hero.png": { width: 1672, height: 941 },
  "/images/magenta.png": { width: 941, height: 1672 },
  "/images/blackbags.png": { width: 941, height: 1672 },
  "/images/wardrobe.png": { width: 941, height: 1672 },
  "/images/corner.png": { width: 941, height: 1672 },
  "/images/bathroom2.png": { width: 941, height: 1672 },
};

export function getImageDim(src: string): ImageDim {
  return IMAGE_DIMENSIONS[src] ?? { width: 1600, height: 1200 };
}
