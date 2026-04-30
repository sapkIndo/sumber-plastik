## 2024-04-30 - [Missing Feedback on Product WhatsApp CTA]
**Learning:** `ProductCard.tsx` has a link to ask for price via WhatsApp. Users might click it and feel a disconnect before the WhatsApp app opens. Adding a toast notification provides immediate feedback.
**Action:** Since we shouldn't change `"use client"` unless necessary and it might impact how ProductCard is rendered from ProductGrid, maybe there's another UX improvement. Let's look for focus-visible styles missing on interactive elements.

## 2024-04-30 - [Focus Visible Styles]
**Learning:** I'll check all `<button>` and `<a` tags for `focus-visible:` classes to ensure keyboard navigation is clear and consistent.
**Action:** Checking `src/components/layout/Footer.tsx`, `Navbar.tsx`, `ProductGrid.tsx`, `ContactPage.tsx`.

## 2024-04-30 - [Missing Focus Styles on Interactive Elements]
**Learning:** `ProductCard.tsx` has a link "Tanya Harga" without focus visible styles. Keyboard users tab onto the product card but may not see clearly which button is focused. Other components like `ThemeToggle.tsx`, `CategoryCard.tsx`, `ProductGrid.tsx` pagination buttons, and buttons in `contact/page.tsx` are missing `focus-visible:` classes too.
**Action:** Adding `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900` to the "Tanya Harga" CTA inside `ProductCard.tsx` will add a delightful and accessible focus state for keyboard users, making the app more robust while adhering to the dark premium design system.
