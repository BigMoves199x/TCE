import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";

export type ShopProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  images: string[];
  stock: number;
  featured: boolean;
};

type ProductCardProps = {
  product: ShopProduct;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <Link
        href={`/shop/${product.slug}`}
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <span className="rounded-full border border-white/10 bg-[#07111f]/80 px-3 py-1.5 text-xs font-medium text-white/75 backdrop-blur-md">
              {product.category}
            </span>

            {product.featured && (
              <span className="rounded-full bg-[#EAC435] px-3 py-1.5 text-xs font-semibold text-[#07111f]">
                Featured
              </span>
            )}
          </div>

          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#07111f]/60 backdrop-blur-[2px]">
              <span className="rounded-full border border-white/15 bg-[#07111f]/90 px-4 py-2 text-sm font-semibold">
                Sold out
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-white">
                {product.name}
              </h2>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">
                {product.description}
              </p>
            </div>

            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/55 transition group-hover:border-[#03CEA4]/40 group-hover:bg-[#03CEA4] group-hover:text-[#07111f]">
              <ArrowUpRight className="size-4" />
            </span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/35">
                Price
              </p>

              <p className="mt-1 text-xl font-semibold text-[#03CEA4]">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-white/45">
              <Package className="size-3.5" />

              {product.stock === 0
                ? "Unavailable"
                : product.stock <= 5
                  ? `${product.stock} remaining`
                  : "In stock"}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function formatPrice(priceInKobo: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(priceInKobo / 100);
}