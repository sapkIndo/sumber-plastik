## 2024-05-02 - Added `title` and `focus-visible` to `ThemeToggle`

**Learning:** Sighted mouse users can miss what an icon-only button does if there is only an `aria-label`. Added a native `title` attribute so they get a tooltip. We also ensured the button has strong `focus-visible` styling (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ...`) so keyboard users can navigate to it effectively. Note: The design system accent color is orange-500.

**Action:** Added `title` attribute corresponding to `aria-label` and enhanced keyboard navigability using `focus-visible` tailwind utility classes for the `ThemeToggle` button, using the correct orange-500 accent color.
