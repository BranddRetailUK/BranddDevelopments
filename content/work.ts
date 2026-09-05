export const upForItAssets = {
  logo: "https://res.cloudinary.com/brandduk/image/upload/f_auto,q_auto,c_limit,w_480/NEW_ROUND_LOGO_amtvr0.png",
  background:
    "https://res.cloudinary.com/brandduk/image/upload/f_auto,q_auto,c_limit,w_1200/UPFORIT/summer-roundup-2026-background.jpg",
  presents:
    "https://res.cloudinary.com/brandduk/image/upload/f_auto,q_auto,c_limit,w_500/UPFORIT/summer-roundup-2026-presents.png",
  title:
    "https://res.cloudinary.com/brandduk/image/upload/f_auto,q_auto,c_limit,w_900/UPFORIT/summer-roundup-2026-title.png",
};

export const work = [
  {
    slug: "good-game-apparel",
    name: "Good Game Apparel",
    category: "Brandd-owned product",
    copy: "Creator stores, product design tools and made-to-order fulfilment.",
    role: "Commerce platform and creator tools",
    image: "/images/good-game/good-game-apparel-logo.png",
    imageAlt: "Good Game Apparel",
    href: "/projects/good-game-apparel",
  },
  {
    slug: "upforit",
    name: "UpForIt",
    category: "Events and ticketing",
    copy: "Event discovery, ticket sales and QR check-in in one website.",
    role: "Website design and ticketing development",
    image: upForItAssets.title,
    imageAlt: "The Summer Roundup event artwork",
    href: "/projects/upforit",
  },
  {
    slug: "ace-hits-tcg",
    name: "Ace Hits TCG",
    category: "Online retail",
    copy: "A trading-card storefront organised around the way collectors shop.",
    role: "Shopify storefront design and development",
    image:
      "https://www.acehitstcg.co.uk/cdn/shop/files/Ascended_Heroes_Website_Banner_copy.webp?v=1777114282&width=1600",
    imageAlt: "Ace Hits TCG Pokémon product artwork",
    href: "/projects/ace-hits-tcg",
  },
  {
    slug: "sonacrate",
    name: "SonaCrate",
    category: "Music platform",
    copy: "A place to discover and stream music, buy downloads and manage releases.",
    role: "Product design, creator tools and music commerce",
    image: null,
    imageAlt: "",
    href: "/projects/sonacrate",
  },
  {
    slug: "dtf-designer",
    name: "DTF Designer",
    category: "Print ordering",
    copy: "Artwork uploads, print-sheet layouts and quantity-based order pricing.",
    role: "Customer ordering and production tools",
    image: null,
    imageAlt: "",
    href: "/projects/dtf-designer",
  },
];

export type WorkProject = (typeof work)[number];
