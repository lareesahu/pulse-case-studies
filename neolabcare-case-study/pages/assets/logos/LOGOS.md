# NeolabCare Logo Assets — Single Source of Truth

> **This directory is the canonical, authoritative source for all NeolabCare logo assets.**
> Do not use logos from any other location, CDN, or external source. All brand implementations must reference files from this directory.

---

## Logo Variants

All logos are available in four formats: `.svg` (preferred for web/print), `.png` (raster fallback), `.webp` (`@4x` high-res for retina screens), and `.pdf` (print/vector).

### Large Logos
Full wordmark — **"neolab.care"** — with the `.care` suffix clearly legible. Use these wherever there is sufficient space to render the full brand name at a readable size (minimum ~120px wide on screen).

| Variant | Use Case |
|---|---|
| `NeolabCare_Logo_large gold` | Primary brand mark. Dark backgrounds (Void theme). Nav, hero, email headers. |
| `NeolabCare_Logo_large dark` | Dark wordmark on light/white backgrounds. Print collateral, light-mode pages. |
| `NeolabCare_Logo_large grey` | Subdued/muted contexts. Footer, watermarks, secondary placements. |
| `NeolabCare_Logo_large black` | Pure black. High-contrast print, embossing, packaging. |

### Small Logos
Condensed wordmark — **"neolab"** only, without the `.care` suffix. Use these in **reduced-size contexts** where the small `.care` letterforms would become illegible (e.g., favicons, app icons, social profile images, tight nav bars, embroidery, small print).

| Variant | Use Case |
|---|---|
| `NeolabCare_Logo_small gold` | Primary small mark. Dark backgrounds. |
| `NeolabCare_Logo_small white` | Small mark on dark/coloured backgrounds. |
| `NeolabCare_Logo_small grey` | Subdued/muted small contexts. |
| `NeolabCare_Logo_small dark` | Small mark on light backgrounds. |

### Icon
The standalone mark (symbol only, no wordmark). Use for favicons, app icons, and contexts where the wordmark is already established nearby.

| Variant | Use Case |
|---|---|
| `NeolabCare_Logo_icon` | Favicon, app icon, social avatar, embossed stamp. |

### Color Swatch
Reference file showing the official brand color palette alongside the logo. **Do not use as a logo.** For brand guidelines and design handover only.

| Variant | Use Case |
|---|---|
| `NeolabCare_Logo_color swatch` | Brand guidelines reference only. |

---

## Usage Rules

1. **Never modify** the logo files. Do not recolor, stretch, rotate, add effects, or recreate them.
2. **Always use SVG** for web and digital implementations where possible. Fall back to `.webp @4x` for email clients that don't support SVG.
3. **Large vs Small:** Use the large wordmark at ≥120px width. Use the small wordmark at <120px width to ensure `.care` legibility.
4. **Minimum clear space:** Maintain a clear space equal to the height of the "n" glyph on all sides of the logo.
5. **Approved backgrounds:** Gold logo on dark (`#0A0A0A`–`#1A1A1A`). Dark logo on white/light. Grey logo on mid-tone surfaces.
6. **Do not place** the gold logo on white or the dark logo on black — insufficient contrast.

---

## File Naming Convention

```
NeolabCare_Logo_{size}_{variant}.{format}
```

- `{size}`: `large` | `small` | `icon` | `color swatch`
- `{variant}`: `gold` | `dark` | `grey` | `black` | `white`
- `{format}`: `.svg` | `.png` | `.webp` | `.pdf`

---

*Last updated: May 2026. Maintained by the NeolabCare brand team.*
