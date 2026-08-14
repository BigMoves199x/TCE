"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { PackageSearch, Search, SlidersHorizontal } from "lucide-react";
import ProductCard, { ShopProduct } from "./ProductCard";

type ShopProductsProps = {
  products: ShopProduct[];
};

export default function ShopProducts({
  products,
}: ShopProductsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("FEATURED");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(products.map((product) => product.category)),
      ).sort((a, b) => a.localeCompare(b)),
    [products],
  );

  const visibleProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        category === "ALL" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "PRICE_LOW":
          return a.price - b.price;

        case "PRICE_HIGH":
          return b.price - a.price;

        case "NAME":
          return a.name.localeCompare(b.name);

        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
  }, [products, searchQuery, category, sort]);

  function handleSearch(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setSearchQuery(event.target.value);
  }

  return (
    <section>
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/35" />

            <input
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search artwork, supplies and merchandise"
              className="min-h-12 w-full rounded-xl border border-white/10 bg-[#07111f] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#03CEA4]"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/35" />

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="min-h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#07111f] py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-[#03CEA4]"
            >
              <option value="ALL">All categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="min-h-12 rounded-xl border border-white/10 bg-[#07111f] px-4 text-sm text-white outline-none focus:border-[#03CEA4]"
          >
            <option value="FEATURED">Featured first</option>
            <option value="PRICE_LOW">Price: low to high</option>
            <option value="PRICE_HIGH">Price: high to low</option>
            <option value="NAME">Name: A–Z</option>
          </select>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-white/50">
          Showing{" "}
          <span className="font-medium text-white">
            {visibleProducts.length}
          </span>{" "}
          {visibleProducts.length === 1
            ? "product"
            : "products"}
        </p>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.025] px-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5">
            <PackageSearch className="size-6 text-white/40" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No products found
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-white/50">
            Try a different product name or category.
          </p>
        </div>
      )}
    </section>
  );
}