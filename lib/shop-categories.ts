export const SHOP_CATEGORIES = [
  {
    value: "ARTWORKS",
    slug: "artworks",
    name: "Artworks",
    description:
      "Original paintings, prints and limited works created through The Creative Explorer.",
    accent: "#EAC435",
  },
  {
    value: "ART_SUPPLIES",
    slug: "art-supplies",
    name: "Art Supplies",
    description:
      "Painting, drawing and creative materials for artists and explorers.",
    accent: "#03CEA4",
  },
  {
    value: "CUSTOM_PIECES",
    slug: "custom-pieces",
    name: "Custom Pieces",
    description:
      "Commissioned artwork, customized fashion and one-of-one creative pieces.",
    accent: "#FB4D3D",
  },
  {
    value: "MERCHANDISE",
    slug: "merchandise",
    name: "Merchandise",
    description:
      "TCE apparel, accessories and creative lifestyle pieces.",
    accent: "#EAC435",
  },
  {
    value: "CREATIVE_PLAY",
    slug: "creative-play",
    name: "Creative Play",
    description:
      "Card games, prompts and creative products designed to inspire exploration.",
    accent: "#03CEA4",
  },
  {
    value: "SIP_AND_PAINT",
    slug: "sip-and-paint",
    name: "Sip & Paint",
    description:
      "Tickets, kits and creative essentials from the TCE Sip & Paint experience.",
    accent: "#FB4D3D",
  },
] as const;

export function getCategoryBySlug(slug: string) {
  return SHOP_CATEGORIES.find(
    (category) => category.slug === slug,
  );
}

export function getCategoryByValue(value: string) {
  return SHOP_CATEGORIES.find(
    (category) => category.value === value,
  );
}