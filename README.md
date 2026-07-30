# Dilan Shop — Website

A fully functional, responsive cosmetics e-commerce front-end for Dilan Shop, built with plain HTML/CSS/JavaScript (no build step needed).

## What's included
- **index.html** — homepage (hero, trust badges, categories, best sellers, promo banner, WhatsApp CTA, newsletter, footer)
- **products.html** — product listing page with category filters + price sorting
- **css/style.css** — all styling, fully responsive (mobile → desktop), RTL-aware
- **js/i18n.js** — all text in 4 languages: Turkish, Arabic, Kurdish (Sorani), English
- **js/products.js** — product catalog (edit this to add/remove/change products)
- **js/app.js** — language switching, cart, wishlist, WhatsApp ordering logic

## How to run it
No installation needed — it's a static site.

1. Open the folder in VS Code.
2. Install the **"Live Server"** extension (by Ritwick Dey) from the Extensions panel.
3. Right-click `index.html` → **"Open with Live Server"**.
4. The site opens in your browser at something like `http://127.0.0.1:5500`.

(Alternatively, just double-click `index.html` to open it directly in a browser — most features work, though Live Server gives you auto-reload while editing.)

## How to customize

**Change the WhatsApp number** — open `js/app.js`, edit the top line:
```js
const WHATSAPP_NUMBER = "9647504100202"; // international format, no + or spaces
```

**Add/edit products** — open `js/products.js` and add an object to the `PRODUCTS` array:
```js
{ id: "p19", name: "New Product Name", brand: "Brand", price: 20000, category: "makeup", icon: "bottle", accent: "#c98a63" }
```
`category` must be one of: `makeup`, `skincare`, `haircare`, `perfume`, `accessories`.
`icon` must be one of: `bottle`, `lipstick`, `lipgloss`, `palette`, `mascara`, `dropper`, `perfume`, `jar`, `brush`.
Add `bestseller: true` to feature it on the homepage.

**Edit any text** (in any language) — open `js/i18n.js`, find the language block (`tr`, `ar`, `ku`, `en`) and edit the strings.

**Real product photos** — right now products use clean icon-based placeholders instead of photos (kept it lightweight, no external image dependencies). To use real photos: replace the icon `<span>` inside `.product-thumb` in `js/app.js`'s `productCard()` function with an `<img>` tag pointing to an `images/` folder.

## Notes on current scope
- Ordering is via **WhatsApp only** (no payment gateway) — matches what was requested. The cart "Order via WhatsApp" button builds a pre-filled message with the cart contents and opens WhatsApp.
- Cart and wishlist are saved in the browser's local storage (per device/browser, no backend/database).
- Account login/signup buttons are placeholders (not wired to a backend) — let me know if you want real user accounts, since that requires a backend and database.
