# 1Fi Marketplace — SDE Intern Assignment

Submitted by **Harman Singh**

## What this is

The Shop page now has three options: **Top Brands**, **Nearby Stores**, and **1Fi Marketplace**.
The Marketplace is the focus of this assignment and is fully implemented; Top Brands and
Nearby Stores are also built out for a complete experience.

## Running it

```bash
npm install
npm run dev
```

Open [http://localhost:3000/shop](http://localhost:3000/shop).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, React Query, lucide-react, vaul — matching
the existing 1Fi app's stack and design language (colors, spacing, tabs, bottom nav).

## 1Fi Marketplace

- Product listing with images, pricing, and variants
- Product detail page with variant selection and EMI plan selection
- Live monthly EMI recalculation based on price + selected plan
- CTA to proceed with the selected plan through to a checkout confirmation
- Loading, empty, and error states throughout

## Data

All product, brand, and store data is served through mock API route handlers
(`app/api/**`) instead of being hardcoded into components, so it can be swapped for a
real backend without touching the UI.
