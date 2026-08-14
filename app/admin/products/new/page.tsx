import ProductForm from "@/app/components/ui/admin/ProductForm";

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-[#03CEA4]">
            TCE Administration
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Add new product
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Add product information, inventory,
            pricing and images to your store.
          </p>
        </div>

        <ProductForm />
      </div>
    </main>
  );
}