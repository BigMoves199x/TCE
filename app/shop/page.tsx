import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import {
  SHOP_CATEGORIES,
  getCategoryByValue,
} from "@/lib/shop-categories";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
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

  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 4);

  const displayProducts =
    featuredProducts.length > 0
      ? featuredProducts
      : products.slice(0, 4);

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative">
  <div className="pointer-events-none absolute -right-48 top-0 size-[30rem] rounded-full bg-[#03CEA4]/[0.045] blur-[150px]" />

  <div className="relative mx-auto max-w-[1450px] px-6 pb-14 pt-28 sm:px-10 lg:px-14 lg:pb-18 lg:pt-32 xl:px-18">
    <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
      <div className="flex items-center gap-3">
        <span className="size-1.5 rounded-full bg-[#03CEA4]" />

        <p className="text-[8px] uppercase tracking-[0.28em] text-white/40">
          The Creative Explorer
        </p>
      </div>

      <p className="text-[8px] uppercase tracking-[0.22em] text-white/20">
        Shop / Collection
      </p>
    </div>

    <div className="grid gap-8 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
      <div>
        <p className="text-[8px] uppercase tracking-[0.28em] text-[#EAC435]/75">
          The TCE Shop
        </p>

        <h1 className="mt-4 max-w-3xl font-abril text-[clamp(3rem,5.5vw,5.4rem)] font-normal leading-[0.88] tracking-[-0.045em]">
          Made for the
          <span className="block">
            curious.
          </span>
        </h1>
      </div>

      <div className="max-w-sm lg:justify-self-end">
        <p className="text-[13px] leading-6 text-white/40">
          A considered collection of art, objects,
          tools and experiences for people who
          believe creativity belongs in everyday life.
        </p>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-[7px] uppercase tracking-[0.2em] text-white/22">
          <span>Art</span>
          <span className="text-[#EAC435]/55">•</span>
          <span>Objects</span>
          <span className="text-[#03CEA4]/55">•</span>
          <span>Play</span>
          <span className="text-[#FB4D3D]/55">•</span>
          <span>Experiences</span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* =====================================================
          QUICK CATEGORY NAVIGATION
      ====================================================== */}

      <nav className="border-y border-white/[0.07]">
        <div className="mx-auto flex max-w-[1500px] items-center gap-8 overflow-x-auto px-6 py-5 sm:px-10 lg:px-14 xl:px-20">
          <Link
            href="/shop"
            className="shrink-0 text-[9px] uppercase tracking-[0.2em] text-white"
          >
            All
          </Link>

          {SHOP_CATEGORIES.map((category) => (
            <Link
              key={category.value}
              href={`/shop/category/${category.slug}`}
              className="group flex shrink-0 items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/30 transition-colors duration-300 hover:text-white"
            >
              {category.name}

              <span
                className="size-1 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  backgroundColor: category.accent,
                }}
              />
            </Link>
          ))}
        </div>
      </nav>

      {/* =====================================================
          CATEGORY WORLDS
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-14 lg:py-32 xl:px-20">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
              Explore
            </p>

            <h2 className="mt-3 font-abril text-[clamp(2.7rem,4vw,4rem)] font-normal tracking-[-0.04em]">
              Shop by world.
            </h2>
          </div>

          <p className="hidden max-w-xs text-right text-xs leading-6 text-white/28 md:block">
            Different ways to discover,
            collect and create with TCE.
          </p>
        </div>

        {/* EDITORIAL CATEGORY GRID */}

        <div className="grid auto-rows-[230px] gap-4 md:grid-cols-2 md:auto-rows-[260px] lg:grid-cols-12">
          {SHOP_CATEGORIES.map((category, index) => {
            const layouts = [
              "lg:col-span-7 lg:row-span-2",
              "lg:col-span-5",
              "lg:col-span-5",
              "lg:col-span-4",
              "lg:col-span-4",
              "lg:col-span-4",
            ];

            return (
              <CategoryCard
                key={category.value}
                category={category}
                number={index + 1}
                className={layouts[index]}
                large={index === 0}
              />
            );
          })}
        </div>
      </section>

      {/* =====================================================
          FEATURED / NEW
      ====================================================== */}

      <section className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-14 lg:py-32 xl:px-20">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-[#03CEA4]/75">
                Selected by TCE
              </p>

              <h2 className="mt-3 font-abril text-[clamp(2.7rem,4vw,4rem)] font-normal tracking-[-0.04em]">
                New & noteworthy.
              </h2>
            </div>

            <Link
              href="#all-products"
              className="group hidden items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/35 transition hover:text-white sm:flex"
            >
              View everything

              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {displayProducts.length > 0 ? (
            <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <EmptyCollection />
          )}
        </div>
      </section>

      {/* =====================================================
          ALL PRODUCTS
      ====================================================== */}

      {products.length > 0 && (
        <section
          id="all-products"
          className="border-t border-white/[0.07]"
        >
          <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-10 lg:px-14 lg:py-32 xl:px-20">
            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                  The Collection
                </p>

                <h2 className="mt-3 font-abril text-[clamp(2.7rem,4vw,4rem)] font-normal tracking-[-0.04em]">
                  Explore everything.
                </h2>
              </div>

              <p className="text-[9px] uppercase tracking-[0.18em] text-white/20">
                {products.length}{" "}
                {products.length === 1
                  ? "piece"
                  : "pieces"}
              </p>
            </div>

            <div className="mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </section>
      )}

     
    </main>
  );
}

/* ============================================================
   CATEGORY CARD
============================================================ */

function CategoryCard({
  category,
  number,
  className = "",
  large = false,
}: {
  category: (typeof SHOP_CATEGORIES)[number];
  number: number;
  className?: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/shop/category/${category.slug}`}
      className={`
        group
        relative
        overflow-hidden
        rounded-[1.6rem]
        border
        border-white/[0.08]
        bg-white/[0.025]
        p-7
        transition-all
        duration-500
        hover:border-white/[0.15]
        ${className}
      `}
    >
      {/* very subtle accent */}

      <div
        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full opacity-[0.07] blur-[70px] transition-opacity duration-500 group-hover:opacity-[0.14]"
        style={{
          backgroundColor: category.accent,
        }}
      />

      {/* ghost number */}

      <span className="absolute right-6 top-5 font-abril text-6xl font-normal tracking-[-0.06em] text-white/[0.025]">
        {String(number).padStart(2, "0")}
      </span>

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span
            className="size-1.5 rounded-full"
            style={{
              backgroundColor: category.accent,
            }}
          />

          <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
            0{number}
          </span>
        </div>

        <div>
          <p className="mb-3 max-w-md text-[11px] leading-5 text-white/30">
            {category.description}
          </p>

          <div className="flex items-end justify-between gap-6">
            <h3
              className={`
                font-abril
                font-normal
                leading-none
                tracking-[-0.04em]
                ${
                  large
                    ? "text-4xl sm:text-5xl"
                    : "text-3xl"
                }
              `}
            >
              {category.name}
            </h3>

            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/[0.1] text-white/45 transition-all duration-300 group-hover:border-transparent group-hover:bg-white group-hover:text-[#07111f]">
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({
  product,
}: {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    category: string;
    imageUrl: string;
    featured: boolean;
  };
}) {
  const category =
    getCategoryByValue(product.category);

  return (
    <article className="group">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-white/[0.035]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.025]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/15">
                TCE
              </span>
            </div>
          )}

          {/* image shade */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/30 via-transparent to-transparent opacity-60" />

          {product.featured && (
            <span className="absolute left-4 top-4 rounded-full border border-white/[0.12] bg-[#07111f]/55 px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl">
              TCE Selection
            </span>
          )}

          <span className="absolute bottom-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-white text-[#07111f] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-5">
          <div>
            <p className="text-[8px] uppercase tracking-[0.19em] text-white/25">
              {category?.name ?? formatCategory(product.category)}
            </p>

            <h3 className="mt-2 text-[13px] font-normal tracking-wide text-white/75 transition-colors group-hover:text-white">
              {product.name}
            </h3>
          </div>

          <p className="shrink-0 font-abril text-lg font-normal text-white/65">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyCollection() {
  return (
    <div className="mt-12 flex min-h-[320px] items-center justify-center border-y border-white/[0.06] text-center">
      <div>
        <span className="mx-auto block size-1.5 rounded-full bg-[#03CEA4]" />

        <h3 className="mt-5 font-abril text-3xl font-normal tracking-[-0.03em]">
          Something is taking shape.
        </h3>

        <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-white/30">
          New pieces and creative objects will be
          introduced to the TCE collection soon.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   HELPERS
============================================================ */

function formatPrice(priceInKobo: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(priceInKobo / 100);
}

function formatCategory(category: string) {
  return category
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}