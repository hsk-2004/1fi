"use client";

import { useState } from "react";
import { Store } from "lucide-react";

export function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#f5f0ff] text-[#712CDC]">
        <Store className="h-6 w-6" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      onError={() => setErrored(true)}
    />
  );
}
