import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Package,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ProductCard, {
  formatPrice,
} from "@/app/components/shop/ProductCard";
import ProductGallery from "@/app/components/shop/ProductGallery";
import { prisma } from "@/lib/prisma";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    select: {
      name: true,
      description: true,
    },
  });

  if (!product) {
    return {
      title: "Product not found | TCE",
    };
  }

  return {
    title: `${product.name} | TCE Shop`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
      category: product.category,
      id: {
        not: product.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      category: true,
      imageUrl: true,
      images: true,
      stock: true,
      featured: true,
    },
  });

  return (
    <main className="min-h-screen bg-[#07111f] px-4 pb-20 pt-28 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-[#03CEA4]"
        >
          <ArrowLeft className="size-4" />
          Back to shop
        </Link>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] lg:gap-14">
          <ProductGallery
            name={product.name}
            imageUrl={product.imageUrl}
            images={product.images}
          />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/65">
                {product.category}
              </span>

              {product.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAC435]/15 px-3 py-1.5 text-xs font-semibold text-[#EAC435]">
                  <Sparkles className="size-3.5" />
                  Featured
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-3xl font-semibold text-[#03CEA4]">
              {formatPrice(product.price)}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm">
              <Package className="size-4 text-white/45" />

              {product.stock === 0 ? (
                <span className="font-medium text-red-300">
                  Currently sold out
                </span>
              ) : product.stock <= 5 ? (
                <span className="font-medium text-[#EAC435]">
                  Only {product.stock} remaining
                </span>
              ) : (
                <span className="font-medium text-[#77f5dc]">
                  In stock
                </span>
              )}
            </div>

            <div className="my-8 h-px bg-white/10" />

            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40">
              Product details
            </h2>

            <p className="mt-4 whitespace-pre-line text-base leading-8 text-white/60">
              {product.description}
            </p>

            <button
              type="button"
              disabled
              className="mt-8 inline-flex min-h-14 w-full cursor-not-allowed items-center justify-center rounded-xl bg-[#03CEA4] px-6 py-4 text-base font-semibold text-[#07111f] opacity-60"
            >
              {product.stock === 0
                ? "Sold out"
                : "Cart integration coming next"}
            </button>

            <div className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Feature
                icon={<ShieldCheck className="size-4" />}
                title="Secure checkout"
              />

              <Feature
                icon={<Check className="size-4" />}
                title="Quality inspected"
              />
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-white/10 pt-14">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#03CEA4]">
                More to explore
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Related products
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
};

function Feature({ icon, title }: FeatureProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-white/60">
      <span className="flex size-8 items-center justify-center rounded-lg bg-[#03CEA4]/10 text-[#03CEA4]">
        {icon}
      </span>

      {title}
    </div>
  );
}