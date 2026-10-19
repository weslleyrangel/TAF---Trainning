---
name: Obsidian Clean
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#45464c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#555f6d'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f1'
  on-secondary-container: '#596372'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00201d'
  on-tertiary-container: '#0c9488'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#d9e3f4'
  secondary-fixed-dim: '#bdc7d8'
  on-secondary-fixed: '#121c28'
  on-secondary-fixed-variant: '#3e4755'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  numeric-metric:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system embodies an ultra-modern, institutional-grade financial aesthetic modeled after high-conviction product design standards: Linear, Apple, and modern wealth interfaces. It pairs absolute mechanical clarity with refined, tactile restraint. The experience feels calculated, private, and frictionless.

The visual style is modern minimalist with an emphasis on tonal layering, delicate perimeter definition, and high-legibility typography. Interfaces evoke calm mastery over complex numbers and actions. Structural components prioritize direct manipulation, crisp typographic hierarchy, zero extraneous ornamentation, and precise optical balance.

## Colors

The palette is anchored by deep jet blacks, calibrated grays, and an architectural off-white canvas.

- **Primary (`#111827`):** High-contrast jet black used for dominant calls-to-action, active tokens, leading metrics, and primary headlines.
- **Secondary (`#4B5563`):** Neutral slate for supporting metadata, balance subtotals, labels, and secondary interactive states.
- **Tertiary / Accent (`#0D9488`):** Deep emerald teal reserved strictly for positive delta metrics, validation states, and confirmed yield movements.
- **Neutral Canvas (`#F4F5F7`):** The structural base layer across screens, providing an optical contrast floor that lets elevated `#FFFFFF` surfaces project natural lightness.

Structural stroke borders utilize `#E5E7EB` at 1px constant width. Text layers adopt an unambiguous tier: `#111827` for headings and monetary values, `#4B5563` for secondary explanations, and `#9CA3AF` for tertiary captions or disabled states.

## Typography

Typography relies uniformly on `Inter` with OpenType tabular figures (`tnum`) enabled for all monetary values, percentages, and ledger entries. 

- Large values (`display-lg`, `numeric-metric`) utilize negative tracking to pack numbers tightly without visual collisions.
- Subheaders, balance cards, and list metadata favor medium weights (`500`) over bold styling to maintain an understated, executive atmosphere.
- Micro-labels (`label-sm`) default to uppercase tracking with tight baseline heights for pill badges, security indicators, and network protocols.

## Layout & Spacing

The layout is built upon an 8pt base grid with a 4pt sub-grid for tight alignments such as icon-to-text gaps and input field pads.

- **Mobile Viewports (<640px):** Single-column stack with fixed `16px` (`margin-mobile`) horizontal canvas padding, edge-to-edge container margins, and `12px` item gaps (`gutter-mobile`).
- **Tablet / Large Mobile (640px–1024px):** 6-column fluid structure with `24px` margins and `16px` gutters.
- **Desktop (1024px+):** Centered max-width shell capped at `480px` for mobile web emulators, or expanding to a 12-column modular dashboard layout with persistent sidebar controls.

Stack layouts enforce consistent vertical pacing: `space-xs` (4px) for inline element offsets, `space-sm` (8px) for related text bindings, `space-md` (16px) for interior card grouping, and `space-xl` (32px) separating primary view modules.

## Elevation & Depth

Elevation achieves optical lightness through ambient, low-density diffuse shadows combined with hairline boundaries:

- **Base Layer (Level 0):** Canvas surface `#F4F5F7`, completely flat.
- **Container / Card Layer (Level 1):** Solid `#FFFFFF` fill with a subtle diffuse shadow `0 4px 20px -2px rgba(0, 0, 0, 0.05)` and a crisp `1px solid #E5E7EB` hairline boundary. This combination delivers separation without muddying the off-white ground.
- **Interactive Elevated / Floating (Level 2):** Applied to floating action bars, bottom navigation sheets, and active popovers. Box-shadow transitions to `0 12px 32px -4px rgba(0, 0, 0, 0.08)` with the same `1px solid #E5E7EB` rim.
- **Modal Layer (Level 3):** Centered overlays or full bottom sheets carry `0 24px 48px -12px rgba(0, 0, 0, 0.12)` alongside a dimmed `#111827` backdrop blur (`backdrop-filter: blur(8px); background: rgba(17, 24, 39, 0.2)`).

## Shapes

The interface embraces generous, pill-forward roundness across all modules:

- **Cards & Primary Modules:** Uniform `24px` corner radii (`rounded-3xl` / `rounded-lg` per scale token tier 3) to establish friendly, hyper-smooth physical silhouettes.
- **Pills, Chips, & Buttons:** Full curved terminations (`9999px` / `rounded-full`) that accentuate smooth interaction targets.
- **Nested Inner Containers:** Calculated proportional radius nesting: an interior element embedded within a `24px` card maintains a `16px` or `12px` border radius to ensure concentric curvature.

## Components

### Buttons
- **Primary:** Full jet-black fill (`#111827`), pure white text (`#FFFFFF`), full pill radius (`rounded-full`), `48px` minimum height, padded with `1.5rem` horizontally. Active state features a subtle tactile scale reduction (`transform: scale(0.98)`).
- **Secondary:** Transparent fill with `1px solid #E5E7EB`, text `#111827`, subtle hover background of `#F4F5F7`.
- **Ghost / Tertiary:** Borderless `#111827` text with soft slate hover overlays.

### Cards
Constructed from pure white (`#FFFFFF`) backings, `24px` corner curvature, `1px solid #E5E7EB` borders, and the ambient shadow token. Interior padding defaults to `space-lg` (24px). Segmented cards house soft internal dividers (`#F3F4F6`).

### Chips & Badges
Compact pill capsules (`rounded-full`) measuring `24px` to `28px` in height.
- **Monochrome Status:** `#F4F5F7` background, `#111827` text, `1px solid #E5E7EB`.
- **Positive Delta (Crypto / Yield):** Soft emerald wash (`rgba(13, 148, 136, 0.08)`), emerald text (`#0D9488`), and dot pulse indicator.

### Lists & Activity Feeds
Borderless edge-to-edge modular items inside cards. Each list item features a `40px` circular asset avatar (or token icon), a two-line vertical hierarchy (primary title in `#111827`, subtitle in `#4B5563`), and a right-aligned tabular value with micro status text. Items separate via faint horizontal rules (`#F3F4F6`) inset to align with text margins.

### Input Fields
Clean rounded capsules or `16px` rounded rects. Fill defaults to `#FFFFFF` with `1px solid #E5E7EB`. Focused states drop ambient rings (`0 0 0 2px #111827`) with crisp black active carets and persistent micro-labels positioned above the numerical input.

### Checkboxes & Segmented Controls
- **Segmented Control:** Enclosed pill shell (`#F4F5F7`) with floating white pill indicator cards (`#FFFFFF`, subtle shadow `0 2px 6px rgba(0,0,0,0.06)`).
- **Checkboxes:** Smooth `8px` rounded rectangles with `#111827` fills and white check paths on selection.