"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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

  const [selectedImage, setSelectedImage] = useState(
    galleryImages[0] ?? imageUrl,
  );

  useEffect(() => {
    if (!galleryImages.includes(selectedImage)) {
      setSelectedImage(galleryImages[0] ?? imageUrl);
    }
  }, [galleryImages, imageUrl, selectedImage]);

  return (
    <div className="space-y-4">
      <div
        data-product-main-image
        className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/5"
      >
        <Image
          key={selectedImage}
          src={selectedImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/[0.03]" />
      </div>

      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {galleryImages.map((image, index) => {
            const isSelected = image === selectedImage;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                aria-label={`View image ${index + 1} of ${name}`}
                aria-pressed={isSelected}
                className={`group relative aspect-square overflow-hidden rounded-xl border transition duration-300 ${
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
                  className={`object-cover transition duration-500 group-hover:scale-105 ${
                    isSelected
                      ? "opacity-100"
                      : "opacity-70 group-hover:opacity-100"
                  }`}
                />

                {isSelected && (
                  <span className="pointer-events-none absolute inset-0 rounded-xl bg-[#03CEA4]/5" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}