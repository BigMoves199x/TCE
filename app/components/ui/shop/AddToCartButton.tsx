"use client";

import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useRef, useState } from "react";

import { useCartDrawerStore } from "@/app/store/useCartDrawerStore";
import { useCartStore } from "@/app/store/useCartStore";

type ProductForCart = {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  stock: number;
};

type AddToCartButtonProps = {
  product: ProductForCart;
};

const FLYING_ANIMATION_DURATION = 650;

function flyProductToCart(
  imageUrl: string,
  sourceElement: HTMLElement,
): Promise<void> {
  return new Promise((resolve) => {
    const cartButton = document.querySelector<HTMLElement>(
      "[data-cart-button]",
    );

    if (!cartButton) {
      resolve();
      return;
    }

    const sourceRect = sourceElement.getBoundingClientRect();
    const cartRect = cartButton.getBoundingClientRect();

    const flyingImage = document.createElement("img");

    flyingImage.src = imageUrl;
    flyingImage.alt = "";
    flyingImage.setAttribute("aria-hidden", "true");

    Object.assign(flyingImage.style, {
      position: "fixed",
      left: `${sourceRect.left + sourceRect.width / 2 - 38}px`,
      top: `${sourceRect.top + sourceRect.height / 2 - 38}px`,
      width: "76px",
      height: "76px",
      objectFit: "cover",
      borderRadius: "18px",
      pointerEvents: "none",
      zIndex: "9999",
      opacity: "1",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      transform: "translate3d(0, 0, 0) scale(1) rotate(0deg)",
      transformOrigin: "center",
      willChange: "transform, opacity",
    });

    document.body.appendChild(flyingImage);

    const destinationX =
      cartRect.left +
      cartRect.width / 2 -
      (sourceRect.left + sourceRect.width / 2);

    const destinationY =
      cartRect.top +
      cartRect.height / 2 -
      (sourceRect.top + sourceRect.height / 2);

    const animation = flyingImage.animate(
      [
        {
          transform:
            "translate3d(0, 0, 0) scale(1) rotate(0deg)",
          opacity: 1,
          offset: 0,
        },
        {
          transform: `translate3d(${destinationX * 0.45}px, ${
            destinationY * 0.25 - 100
          }px, 0) scale(0.82) rotate(5deg)`,
          opacity: 0.95,
          offset: 0.45,
        },
        {
          transform: `translate3d(${destinationX}px, ${destinationY}px, 0) scale(0.18) rotate(12deg)`,
          opacity: 0.15,
          offset: 1,
        },
      ],
      {
        duration: FLYING_ANIMATION_DURATION,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      },
    );

    animation.onfinish = () => {
      flyingImage.remove();

      window.dispatchEvent(
        new CustomEvent("tce:cart-item-added"),
      );

      resolve();
    };

    animation.oncancel = () => {
      flyingImage.remove();
      resolve();
    };
  });
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartDrawerStore(
    (state) => state.openCart,
  );

  const soldOut = product.stock <= 0;
  const maximumSelected = quantity >= product.stock;

  function decreaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1),
    );
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.min(product.stock, currentQuantity + 1),
    );
  }

  async function handleAddToCart() {
    if (
      soldOut ||
      isAnimating ||
      !buttonRef.current
    ) {
      return;
    }

    setIsAnimating(true);

    /*
     * Add the item immediately so the badge updates while
     * the image is travelling toward the cart.
     */
    addItem(product, quantity);

    /*
     * Prefer the main product image when one is marked with
     * data-product-main-image. Otherwise, animate from the button.
     */
    const productImage =
      document.querySelector<HTMLElement>(
        "[data-product-main-image]",
      );

    const sourceElement =
      productImage ?? buttonRef.current;

    await flyProductToCart(
      product.imageUrl,
      sourceElement,
    );

    setAdded(true);
    setIsAnimating(false);
    openCart();

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  return (
    <div className="space-y-4">
      {!soldOut && (
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2">
          <span className="pl-3 text-sm font-medium text-white/55">
            Quantity
          </span>

          <div className="flex items-center rounded-full border border-white/[0.08] bg-black/20 p-1">
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="grid size-9 place-items-center rounded-full text-white/60 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Minus className="size-4" />
            </button>

            <span className="min-w-10 text-center text-sm font-semibold text-white">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={maximumSelected}
              aria-label="Increase quantity"
              className="grid size-9 place-items-center rounded-full text-white/60 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        disabled={soldOut || isAnimating}
        onClick={handleAddToCart}
        className={`relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-4 text-sm font-semibold transition duration-300 ${
          soldOut
            ? "cursor-not-allowed bg-white/[0.06] text-white/30"
            : added
              ? "bg-[#EAC435] text-[#07111f]"
              : "bg-[#03CEA4] text-[#07111f] hover:scale-[1.01] hover:brightness-110 active:scale-[0.99]"
        }`}
      >
        <span
          className={`absolute inset-0 bg-white/25 transition-transform duration-500 ${
            isAnimating
              ? "translate-x-full"
              : "-translate-x-full"
          }`}
        />

        <span className="relative flex items-center gap-2">
          {soldOut ? (
            "Sold out"
          ) : added ? (
            <>
              <Check className="size-5" />
              Added to cart
            </>
          ) : (
            <>
              <ShoppingBag
                className={`size-5 ${
                  isAnimating
                    ? "animate-[cartButtonPulse_500ms_ease-in-out]"
                    : ""
                }`}
              />

              {isAnimating
                ? "Adding..."
                : "Add to cart"}
            </>
          )}
        </span>
      </button>

      {!soldOut && maximumSelected && (
        <p className="text-center text-xs text-[#EAC435]">
          Maximum available quantity selected
        </p>
      )}

      {soldOut && (
        <p className="text-center text-xs text-white/40">
          This item is currently unavailable.
        </p>
      )}
    </div>
  );
}