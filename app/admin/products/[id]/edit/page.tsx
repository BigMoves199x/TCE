import { notFound } from "next/navigation";
import ProductForm from "@/app/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-[#03CEA4]">
            TCE Administration
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Edit product
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Update the product’s information,
            inventory, images and publishing status.
          </p>
        </div>

        <ProductForm
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            images: product.images,
            stock: product.stock,
            featured: product.featured,
            status: product.status,
          }}
        />
      </div>
    </main>
  );
}