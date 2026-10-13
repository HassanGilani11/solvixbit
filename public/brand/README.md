# SOLVIXBIT Brand Assets Directory

Place your official logo and branding files in this folder. The website is configured to look for these files:

## Recommended File Names

| File Name | Description | Recommended Format |
|---|---|---|
| `logo.svg` or `logo.png` | Primary Logo (Horizontal with Mark + Text) | SVG / Transparent PNG (800x200px) |
| `logo-dark.svg` or `logo-dark.png` | White/Light logo for dark backgrounds | SVG / Transparent PNG |
| `logo-light.svg` or `logo-light.png` | Dark logo for light backgrounds | SVG / Transparent PNG |
| `logo-icon.svg` or `logo-icon.png` | Square icon / Mark only (no text) | SVG / Transparent PNG (512x512px) |
| `favicon.ico` / `favicon.svg` | Browser tab icon | 32x32 / 64x64 / SVG |
| `og-image.jpg` | Social share preview banner | JPG / PNG (1200x630px) |

---

## What Happens When You Add Your Logo
1. Simply copy or save your logo files into this `public/brand/` folder (or `public/`).
2. The `<Logo />` component in the website will automatically load and display your logo across the Navbar, Footer, and OpenGraph metadata.
3. If your logo uses a specific custom hex color palette, we will inspect the image/SVG and automatically adjust all design tokens in `tokens.css`, `tokens.json`, and Tailwind accordingly.
