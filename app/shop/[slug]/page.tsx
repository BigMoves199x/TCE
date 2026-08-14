import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import AddToCartButton from "@/app/components/ui/shop/AddToCartButton";
import ProductCard from "@/app/components/ui/shop/ProductCard";
import ProductGallery from "@/app/components/ui/shop/ProductGallery";
import { prisma } from "@/lib/prisma";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
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
      status: true,
      createdAt: true,
    },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: {
        not: product.id,
      },
    },
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
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    take: 3,
  });

  return (
    <main className="min-h-screen bg-[#08111d] text-white">
      <section className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to collection
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <ProductGallery
              name={product.name}
              imageUrl={product.imageUrl}
              images={product.images}
            />
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/55">
                {product.category}
              </span>

              {product.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EAC435]/20 bg-[#EAC435]/10 px-3.5 py-1.5 text-xs font-medium text-[#EAC435]">
                  <Sparkles className="size-3.5" />
                  Featured piece
                </span>
              )}
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#03CEA4]/80">
                The Creative Explorer
              </p>

              <h1 className="mt-3 max-w-xl text-4xl font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
                {product.name}
              </h1>

              <p className="mt-5 text-2xl font-medium tracking-tight text-white/90 sm:text-3xl">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2.5 text-sm">
              <Package className="size-4 text-white/35" />

              {product.stock === 0 ? (
                <span className="text-[#FB4D3D]/90">
                  Currently unavailable
                </span>
              ) : product.stock <= 5 ? (
                <span className="text-[#EAC435]/90">
                  Only {product.stock} remaining
                </span>
              ) : (
                <span className="text-[#03CEA4]/90">
                  Available
                </span>
              )}
            </div>

            <div className="mt-8 border-y border-white/[0.06] py-7">
              <p className="whitespace-pre-line text-[15px] leading-7 text-white/50">
                {product.description}
              </p>
            </div>

            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                imageUrl: product.imageUrl,
                stock: product.stock,
              }}
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <ProductPromise
                icon={<ShieldCheck className="size-4" />}
                title="Secure payment"
                description="Protected checkout"
              />

              <ProductPromise
                icon={<Truck className="size-4" />}
                title="Careful delivery"
                description="Handled with care"
              />

              <ProductPromise
                icon={<CheckCircle2 className="size-4" />}
                title="Authentic piece"
                description="Created by TCE"
              />
            </div>

            <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-5 py-4">
              <p className="text-sm leading-6 text-white/40">
                Your item will be reserved after your payment has been
                successfully confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
            <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#03CEA4]/80">
                  More from the collection
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-[-0.02em] text-white">
                  You may also like
                </h2>
              </div>

              <Link
                href="/shop"
                className="text-sm text-white/40 transition-colors hover:text-white"
              >
                View all pieces
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

type ProductPromiseProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function ProductPromise({
  icon,
  title,
  description,
}: ProductPromiseProps) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
      <div className="flex size-8 items-center justify-center rounded-full bg-white/[0.05] text-[#03CEA4]">
        {icon}
      </div>

      <p className="mt-3 text-xs font-medium text-white/75">
        {title}
      </p>

      <p className="mt-1 text-[11px] leading-5 text-white/35">
        {description}
      </p>
    </div>
  );
}

function formatPrice(priceInKobo: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(priceInKobo / 100);
}