import ShopProducts from "@/app/components/shop/ShopProducts";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop | The Creative Explorer",
  description:
    "Shop original artwork, creative supplies, customized merchandise and limited collections from The Creative Explorer.",
};

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
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-4 pb-16 pt-28 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute left-1/2 top-0 size-[600px] -translate-x-1/2 rounded-full bg-[#03CEA4]/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#03CEA4]">
            TCE Shop
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Creativity you can
            <span className="text-[#EAC435]"> own.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            Discover original artwork, creative tools, customized fashion,
            collectible cards and limited-edition pieces created to inspire.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <ShopProducts products={products} />
        </div>
      </section>
    </main>
  );
}