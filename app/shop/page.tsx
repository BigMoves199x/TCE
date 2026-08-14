import ShopProducts from "@/app/components/ui/shop/ShopProducts";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
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
  });

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute left-[-120px] top-[-100px] size-[350px] rounded-full bg-[#03CEA4]/10 blur-[120px]" />
        <div className="absolute right-[-100px] top-10 size-[320px] rounded-full bg-[#FB4D3D]/10 blur-[120px]" />
        <div className="absolute bottom-[-180px] left-1/2 size-[350px] -translate-x-1/2 rounded-full bg-[#EAC435]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pb-24">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back home
            </Link>

            <Link
              href="/shop/cart"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium transition hover:border-[#03CEA4]/40 hover:bg-[#03CEA4] hover:text-[#07111f]"
            >
              <ShoppingBag className="size-4" />
              Cart
            </Link>
          </div>

          <div className="max-w-4xl pt-20 lg:pt-28">
            <span className="inline-flex rounded-full border border-[#03CEA4]/30 bg-[#03CEA4]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#03CEA4]">
              The Creative Explorer Shop
            </span>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
              Creativity you can
              <span className="block text-[#EAC435]">
                see, feel and own.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              Explore original artwork, premium creative supplies,
              customized jackets, game cards, merchandise and limited
              releases created for people who value imagination.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 text-sm text-white/50">
              {[
                "Original artwork",
                "Creative supplies",
                "Custom merchandise",
                "Limited releases",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03CEA4]">
              Our collection
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Discover something exceptional
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-white/45">
            Every product is thoughtfully selected or created to
            encourage exploration, originality and creative expression.
          </p>
        </div>

        <ShopProducts products={products} />
      </section>
    </main>
  );
}