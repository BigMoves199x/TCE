"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ProductGalleryProps = {
  name: string;
  imageUrl: string;
  images: string[];
};

export default function ProductGallery({
  name,
  imageUrl,
  images,
}: ProductGalleryProps) {
  const galleryImages = useMemo(
    () =>
      Array.from(
        new Set([imageUrl, ...images].filter(Boolean)),
      ),
    [imageUrl, images],
  );

  const [selectedImage, setSelectedImage] =
    useState(galleryImages[0]);

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <Image
          src={selectedImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </div>

      {galleryImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {galleryImages.map((image, index) => {
            const isSelected = image === selectedImage;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                aria-label={`View image ${index + 1} of ${name}`}
                className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                  isSelected
                    ? "border-[#03CEA4] ring-2 ring-[#03CEA4]/20"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <Image
                  src={image}
                  alt={`${name} preview ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}