"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";

type ProductImageUploadProps = {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
};

type CloudinaryUploadInfo = {
  secure_url?: string;
  public_id?: string;
  width?: number;
  height?: number;
  format?: string;
};

export default function ProductImageUpload({
  images,
  onChange,
  maxImages = 5,
}: ProductImageUploadProps) {
  const imagesRef = useRef(images);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  function addImage(imageUrl: string) {
    const updatedImages = Array.from(
      new Set([...imagesRef.current, imageUrl]),
    ).slice(0, maxImages);

    imagesRef.current = updatedImages;
    onChange(updatedImages);
  }

  function removeImage(imageUrl: string) {
    const updatedImages = imagesRef.current.filter(
      (image) => image !== imageUrl,
    );

    imagesRef.current = updatedImages;
    onChange(updatedImages);
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">
          Product images
        </label>

        <p className="mt-1 text-sm text-white/50">
          Upload up to {maxImages} images. The first image will be used as the
          main product image.
        </p>
      </div>

      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/sign"
        options={{
          multiple: true,
          maxFiles: maxImages,
          resourceType: "image",
          folder: "tce/products",
          sources: ["local", "url", "camera"],
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
          maxFileSize: 10_000_000,
          showAdvancedOptions: false,
          cropping: false,
        }}
        onSuccess={(result) => {
          if (!result?.info || typeof result.info === "string") {
            return;
          }

          const uploadInfo = result.info as CloudinaryUploadInfo;

          if (!uploadInfo.secure_url) {
            return;
          }

          addImage(uploadInfo.secure_url);
        }}
        onQueuesEnd={(_, { widget }) => {
          widget.close();
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            disabled={images.length >= maxImages}
            className="flex min-h-44 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.03] px-6 py-8 text-center transition hover:border-[#03CEA4] hover:bg-[#03CEA4]/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ImagePlus className="mb-4 text-[#03CEA4]" size={38} />

            <span className="font-bold">
              {images.length >= maxImages
                ? "Maximum images uploaded"
                : "Upload product images"}
            </span>

            <span className="mt-2 text-sm text-white/50">
              JPG, PNG or WebP. Maximum 10 MB per image.
            </span>

            <span className="mt-2 text-xs text-white/40">
              {images.length} of {maxImages} uploaded
            </span>
          </button>
        )}
      </CldUploadWidget>

      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <Image
                src={imageUrl}
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 250px"
                className="object-cover"
              />

              {index === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-[#EAC435] px-3 py-1 text-xs font-bold text-[#07111f]">
                  Main image
                </span>
              )}

              <button
                type="button"
                onClick={() => removeImage(imageUrl)}
                aria-label={`Remove product image ${index + 1}`}
                className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-black/75 text-white transition hover:bg-[#FB4D3D]"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}