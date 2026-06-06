# Design System & Styling Guidelines (`DESIGN.md`)

This document defines the user interface design system, color palette, responsive design layout, components, and interactive micro-animation guidelines of the **Equits** platform. 

All UI updates and new pages **MUST** comply with these design tokens to preserve a premium, cohesive, and consistent visual experience.

---

## 1. Color Palette (Tailwind CSS v4 Tokens)

We use custom HSL and HEX colors registered in [globals.css](file:///d:/Workspace/equits/equits-front/styles/globals.css). Avoid raw hex/rgb values in your components.

| Token | Class | HEX Code | Visual Purpose / Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `text-primary`, `bg-primary` | `#00529b` | Brand identity, main CTA buttons, links, active states. |
| **Secondary**| `text-secondary`, `bg-secondary` | `#facc15` | Accent highlights, ratings, badges, highlights. |
| **Gray** | `text-gray` | `#736d75` | Muted subtitle texts, tertiary labels. |
| **Gray2** | `text-gray2` | `#5e5e5e` | Body text, description texts, standard secondary info. |
| **Gray3** | `bg-gray3` | `#f4f4f4` | Background of cards, field boundaries, borders. |
| **Gray4** | `text-gray4` | `#b1b1b1` | Disabled states, placeholders. |
| **Dark** | `text-dark`, `bg-dark` | `#1e1e1e` | Main headers in light mode, background in dark mode. |
| **Dark2** | `bg-dark2` | `#252525` | Card backgrounds in dark mode. |

---

## 2. Typography

* **Primary Font:** **Alexandria** (Alexandria is an elegant Arabic and Latin typeface from Google Fonts).
* **Typography Integration:** Configured globally in the body element via `fontAlexandria.className`.
* **Conventions:**
  * **H1 / Page Titles:** `text-3xl lg:text-4xl font-extrabold text-dark tracking-tight`
  * **H2 / Section Titles:** `text-xl lg:text-2xl font-bold text-dark`
  * **Body Text:** `text-base text-gray2 leading-relaxed`
  * **Caption / Small Text:** `text-xs text-gray`

---

## 3. Layout, Grid, & Container

* **Container:** Instead of standard Tailwind container, we use a custom `@utility container` (defined in [globals.css](file:///d:/Workspace/equits/equits-front/styles/globals.css)):
  * `max-width: 90rem` (1440px)
  * `margin-inline: auto`
  * Responsive inline paddings: `1rem` on mobile, `1.5rem` on tablet (`sm`), `2rem` on desktop (`lg`).
* **Grids:** Always design with flexbox or CSS grids:
  * For cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

## 4. Components & Forms

Always use our pre-built wrappers around HeroUI components to ensure validation handling and translation integrations:

1. **Form Wrappers:** Located in `components/ui/form/`.
   * **Text Input:** Use `<FormInput>` (auto-handles password show/hide button and number parsing).
   * **Checkbox:** Use `<FormCheckbox>`.
   * **Select:** Use `<FormSelect>`.
   * **Autocomplete:** Use `<FormAutocomplete>`.
   * **Textarea:** Use `<FormTextarea>`.
2. **Modals:**
   * For generic content, extend `<BaseModal>` (from `components/ui/BaseModal.tsx`).
   * For confirmation actions, use `<ConfirmModal>` (from `components/ui/ConfirmModal.tsx`).
3. **Card Shadows:** Use `shadow-card` (defined globally) for premium flat shadows.

---

## 5. Micro-Animations & Interactivity

To keep the platform feeling "alive" and interactive, use the following standards:

1. **Stagger Entry Animations:**
   All page headings and form inputs should fade and slide in from the bottom progressively:
   ```tsx
   import { StaggerContainer, StaggerItem } from "@/components/ui/animations";

   <StaggerContainer delay={0.2}>
     <StaggerItem>
       <h1>Title</h1>
     </StaggerItem>
     <StaggerItem>
       <p>Content</p>
     </StaggerItem>
   </StaggerContainer>
   ```
2. **Hover States:**
   * Interactive cards should scale slightly on hover: `hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300`
   * Buttons: Always use `transition-colors` or HeroUI built-in animations.
3. **Glassmorphic Panels:**
   For highlights and floating divs, use blur: `bg-white/70 backdrop-blur-md border border-white/20`.

---

## 6. Dark Mode Support

We use `next-themes` and a custom variant `dark` mapped as:
```css
@custom-variant dark (&:is(.dark *));
```

When styling components, prefix with `dark:` to adapt color tokens:
```tsx
<div className="bg-white dark:bg-dark2 text-dark dark:text-white border-default-100 dark:border-default-50">
```
Ensure all custom assets (like illustrations or logos) adapt to dark mode where possible.
