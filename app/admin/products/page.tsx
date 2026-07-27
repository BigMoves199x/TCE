import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductsTable from "@/app/components/products/ProductTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts = products.map((product) => ({
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));

  const totalProducts = products.length;

  const publishedProducts = products.filter(
    (product) => product.status === "PUBLISHED",
  ).length;

  const draftProducts = products.filter(
    (product) => product.status === "DRAFT",
  ).length;

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= 5,
  ).length;

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-[#03CEA4]">
              TCE Administration
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Products
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
              Create, publish, update and manage products available in your
              store.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#03CEA4] px-5 py-3 text-sm font-semibold text-[#07111f] transition hover:opacity-90"
          >
            Add new product
          </Link>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total products"
            value={totalProducts}
          />

          <SummaryCard
            label="Published"
            value={publishedProducts}
          />

          <SummaryCard
            label="Drafts"
            value={draftProducts}
          />

          <SummaryCard
            label="Low stock"
            value={lowStockProducts}
          />
        </section>

        <ProductsTable initialProducts={formattedProducts} />
      </div>
    </main>
  );
}

type SummaryCardProps = {
  label: string;
  value: number;
};

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm text-white/55">{label}</p>

      <p className="mt-2 text-3xl font-semibold tracking-tight">
        {value}
      </p>
    </div>
  );
}