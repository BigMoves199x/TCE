import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import {prisma} from "@/lib/prisma";
import {
  getCategoryBySlug,
  SHOP_CATEGORIES,
} from "@/lib/shop-categories";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { category: categorySlug } = await params;

  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
      category: category.value,
    },
    orderBy: [
      {
        featured: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="mx-auto max-w-[1500px] px-6 pb-14 pt-32 sm:px-10 lg:px-14 xl:px-20">
        <Link
          href="/shop"
          className="group inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/30 transition hover:text-white"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />

          Back to shop
        </Link>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p
              className="text-[9px] uppercase tracking-[0.3em]"
              style={{
                color: category.accent,
              }}
            >
              TCE Shop
            </p>

            <h1 className="mt-4 font-abril text-[clamp(4rem,8vw,8rem)] font-normal leading-[0.88] tracking-[-0.055em]">
              {category.name}
            </h1>
          </div>

          <p className="max-w-lg text-sm leading-7 text-white/40 lg:justify-self-end lg:text-base lg:leading-8">
            {category.description}
          </p>
        </div>
      </section>

      <div className="border-y border-white/[0.07]">
        <div className="mx-auto flex max-w-[1500px] gap-8 overflow-x-auto px-6 py-5 sm:px-10 lg:px-14 xl:px-20">
          {SHOP_CATEGORIES.map((item) => {
            const active =
              item.value === category.value;

            return (
              <Link
                key={item.value}
                href={`/shop/category/${item.slug}`}
                className={`shrink-0 text-[9px] uppercase tracking-[0.2em] transition-colors ${
                  active
                    ? "text-white"
                    : "text-white/25 hover:text-white/70"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <section className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 lg:px-14 xl:px-20">
        {products.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Coming soon
            </p>

            <h2 className="mt-4 font-abril text-4xl font-normal tracking-[-0.04em]">
              Something is being created.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/35">
              This collection is still taking shape.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[#03CEA4]"
            >
              Explore the shop

              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-5">
              <p className="text-[9px] uppercase tracking-[0.23em] text-white/25">
                Collection
              </p>

              <p className="text-xs text-white/25">
                {products.length}{" "}
                {products.length === 1
                  ? "product"
                  : "products"}
              </p>
            </div>

            <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-white/[0.04]">
                    {/*
                      Put your existing ProductCard or
                      product Image component here.
                    */}
                  </div>

                  <div className="mt-4 flex justify-between gap-5">
                    <div>
                      <h2 className="text-sm text-white/75 transition-colors group-hover:text-white">
                        {product.name}
                      </h2>

                      {product.featured && (
                        <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[#EAC435]">
                          Featured
                        </p>
                      )}
                    </div>

                    <p className="shrink-0 text-sm text-white/50">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function formatPrice(priceInKobo: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(priceInKobo / 100);
}