// Dilan Shop — product catalog
// This file now has two jobs:
// 1) Provide a default catalog so the site still looks right the very first
//    time it loads (or if the API is briefly unreachable).
// 2) Fetch the real, live catalog from the backend (/api/products) and swap
//    it in — this is what makes products/photos added in the admin panel
//    show up for every visitor, on every device.
const PRODUCTS = [
  { id: "p01", name: "Huda Beauty Faux Filter Foundation", brand: "Huda Beauty", price: 39000, category: "makeup", icon: "bottle", accent: "#c98a63", bestseller: true },
  { id: "p02", name: "MAC Matte Lipstick — Ruby Woo", brand: "MAC", price: 26000, category: "makeup", icon: "lipstick", accent: "#b1123a", bestseller: true },
  { id: "p03", name: "Dior Backstage Glow Face Palette", brand: "Dior", price: 72000, category: "makeup", icon: "palette", accent: "#d99a6c", bestseller: true },
  { id: "p04", name: "Maybelline Lash Sensational Mascara", brand: "Maybelline", price: 18000, category: "makeup", icon: "mascara", accent: "#1a1a1a", bestseller: true },
  { id: "p05", name: "The Ordinary Niacinamide 10% + Zinc 1%", brand: "The Ordinary", price: 16000, category: "skincare", icon: "dropper", accent: "#e3572a", bestseller: true },
  { id: "p06", name: "Estée Lauder Double Wear Foundation", brand: "Estée Lauder", price: 48000, category: "makeup", icon: "bottle", accent: "#caa15a", bestseller: true },
  { id: "p07", name: "Huda Beauty Liquid Matte — Rouge", brand: "Huda Beauty", price: 28000, category: "makeup", icon: "lipgloss", accent: "#a3123a" },
  { id: "p08", name: "L'Oréal Revitalift Hyaluronic Serum", brand: "L'Oréal Paris", price: 25000, category: "skincare", icon: "dropper", accent: "#3a6bd6" },
  { id: "p09", name: "Huda Beauty Nude Obsessions Palette", brand: "Huda Beauty", price: 55000, category: "makeup", icon: "palette", accent: "#c48a5e" },
  { id: "p10", name: "Maybelline SuperStay Matte Ink — Seductress", brand: "Maybelline", price: 24000, category: "makeup", icon: "lipstick", accent: "#8f1c3a" },
  { id: "p11", name: "Chanel Coco Eau de Parfum", brand: "Chanel", price: 145000, category: "perfume", icon: "perfume", accent: "#1a1a1a" },
  { id: "p12", name: "Dior Sauvage Eau de Toilette", brand: "Dior", price: 132000, category: "perfume", icon: "perfume", accent: "#4a4a4a" },
  { id: "p13", name: "CeraVe Foaming Facial Cleanser", brand: "CeraVe", price: 21000, category: "skincare", icon: "bottle", accent: "#2f6db0" },
  { id: "p14", name: "Neutrogena Hydro Boost Water Gel", brand: "Neutrogena", price: 23000, category: "skincare", icon: "jar", accent: "#3e9b7d" },
  { id: "p15", name: "Olaplex No.3 Hair Perfector", brand: "Olaplex", price: 42000, category: "haircare", icon: "jar", accent: "#7a4fc9" },
  { id: "p16", name: "L'Oréal Elvive Total Repair Shampoo", brand: "L'Oréal Paris", price: 15000, category: "haircare", icon: "bottle", accent: "#c9a15a" },
  { id: "p17", name: "Real Techniques Miracle Complexion Sponge", brand: "Real Techniques", price: 9000, category: "accessories", icon: "brush", accent: "#e08fae" },
  { id: "p18", name: "Professional Makeup Brush Set (12pc)", brand: "Dilan Shop", price: 32000, category: "accessories", icon: "brush", accent: "#c9a15a" }
];

// Fetches the live catalog from the backend and replaces PRODUCTS in place.
// Returns a promise that resolves once PRODUCTS has been updated (or leaves
// the defaults above untouched if the API can't be reached).
function loadProductsFromAPI(){
  return fetch('/api/products')
    .then(res => { if (!res.ok) throw new Error('bad response'); return res.json(); })
    .then(list => {
      if (!Array.isArray(list)) return;
      const normalized = list.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        price: p.price,
        category: p.category,
        icon: p.icon,
        accent: p.accent,
        bestseller: !!p.bestseller,
        photo: p.image || null // backend field is "image"; frontend uses "photo"
      }));
      PRODUCTS.length = 0;
      PRODUCTS.push(...normalized);
    })
    .catch(err => {
      console.warn('Could not load live products, showing defaults instead.', err);
    });
}