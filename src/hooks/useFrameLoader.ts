"use client";

import { useState, useEffect } from "react";

export function useFrameLoader(frameCount: number) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/hero-frames/ezgif-frame-${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadCount++;
        if (loadCount === frameCount) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
      
      loadedImages.push(img);
    }
  }, [frameCount]);

  return { images, loaded };
}
