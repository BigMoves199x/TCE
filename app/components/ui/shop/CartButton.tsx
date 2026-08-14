"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useCartDrawerStore } from "@/app/store/useCartDrawerStore";
import { useCartStore } from "@/app/store/useCartStore";

export default function CartButton() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isBadgePulsing, setIsBadgePulsing] =
    useState(false);

  const items = useCartStore((state) => state.items);
  const openCart = useCartDrawerStore(
    (state) => state.openCart,
  );

  const totalItems = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }, [items]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    function handleCartItemAdded() {
      setIsBouncing(false);
      setIsBadgePulsing(false);

      requestAnimationFrame(() => {
        setIsBouncing(true);
        setIsBadgePulsing(true);
      });

      window.setTimeout(() => {
        setIsBouncing(false);
      }, 600);

      window.setTimeout(() => {
        setIsBadgePulsing(false);
      }, 750);
    }

    window.addEventListener(
      "tce:cart-item-added",
      handleCartItemAdded,
    );

    return () => {
      window.removeEventListener(
        "tce:cart-item-added",
        handleCartItemAdded,
      );
    };
  }, []);

  return (
    <button
      type="button"
      data-cart-button
      onClick={openCart}
      aria-label={
        totalItems > 0
          ? `Open cart with ${totalItems} items`
          : "Open shopping cart"
      }
      className={`relative grid size-11 shrink-0 place-items-center rounded-full border border-white/[0.09] bg-white/[0.04] text-white/75 transition hover:border-[#03CEA4]/40 hover:bg-[#03CEA4]/10 hover:text-[#03CEA4] ${
        isBouncing
          ? "animate-[cartIconBounce_600ms_cubic-bezier(0.22,1,0.36,1)]"
          : ""
      }`}
    >
      <ShoppingBag className="size-5" />

      {hasMounted && totalItems > 0 && (
        <span
          className={`absolute -right-1.5 -top-1.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#FB4D3D] px-1 text-[10px] font-bold leading-none text-white shadow-lg ${
            isBadgePulsing
              ? "animate-[cartBadgePulse_700ms_ease-out]"
              : ""
          }`}
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}