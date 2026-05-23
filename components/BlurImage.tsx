"use client";

import React, { useState, useRef, useEffect } from "react";

export const BlurImage = ({ src, alt, className, style }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onLoad={() => setIsLoaded(true)}
      style={style}
      className={`${className} transition-[filter] duration-700 ease-in-out ${isLoaded ? "blur-0" : "blur-xl"}`}
    />
  );
};
