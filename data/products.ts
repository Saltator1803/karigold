export interface Product {
   id: string;
   name: string;
   subName: string;
   price: string;
   description: string;
   folderPath: string;
   themeColor: string;
   stats: { label: string; val: string }[];
   section1: { title: string; subtitle: string };
   section2: { title: string; subtitle: string };
   section3: { title: string; subtitle: string };
   section4: { title: string; subtitle: string };
   detailsSection: { title: string; description: string; imageAlt: string };
   craftsmanship: { title: string; description: string };
   buyNowSection: {
       price: string;
       purity: string;
       shipping: string;
       certification: string;
   };
}

export const products: Product[] = [
   {
       id: "heritage-necklace",
       name: "The Royal Arched",
       subName: "22K Solid Gold.",
       price: "₹85,000",
       description: "Hand-forged - Pure 22K Gold - Karigar Signature Series",
       folderPath: "/images/necklace",
       themeColor: "#0F0F0F",
       stats: [{ label: "Purity", val: "22K" }, { label: "Weight", val: "14.5g" }, { label: "Artisans", val: "4" }],
       section1: { title: "Karigold.", subtitle: "The weight of heritage." },
       section2: { title: "Forged in Fire.", subtitle: "Each piece is hand-beaten by master karigars in our family workshop." },
       section3: { title: "Antigravity Detail.", subtitle: "Micro-etched patterns that catch light from every dimension." },
       section4: { title: "Direct from the Forge.", subtitle: "No middlemen. Just pure gold from us to you." },
       detailsSection: {
           title: "The Goldsmith's Legacy",
           description: "Crafted in our heritage workshop, this piece represents three generations of goldsmithing excellence. By removing traditional retail markups, we deliver 100% value in weight and artistry.",
           imageAlt: "Macro Gold Texture"
       },
       craftsmanship: {
           title: "The Karigar Touch",
           description: "Every link is individually polished. We use a proprietary cold-buffing technique to ensure a mirror finish that lasts decades, not months."
       },
       buyNowSection: {
           price: "₹85,000",
           purity: "Hallmarked 22K (916) Gold",
           shipping: "Insured Express Delivery (2-3 Days)",
           certification: "BIS Hallmarked & Lifetime Buyback Guarantee"
       }
   }
];
