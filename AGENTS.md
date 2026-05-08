# 974 Perfumes Demo — Codex Instructions

## Project goal
This is a React/Vite frontend-only ecommerce demo for 974 Perfumes Qatar. The goal is a polished, professional perfume storefront that can be shown to the client in person.

Do not add backend work unless explicitly requested.

## Use frontend-design skill
When improving UI, layout, styling, product cards, imagery, interactions, or responsive design, read and apply:

`.codex/skills/frontend-design/SKILL.md`

## Brand
- Brand: 974 Perfumes Qatar
- Instagram: https://www.instagram.com/974perfumes/
- WhatsApp: +974 30630135
- Positioning: affordable, long-lasting, oil-based inspired perfume oils in Qatar

## Legal wording
Use:
- “Inspired by”
- “Inspired Perfume Oil”
- “Oil-Based Inspired Perfumes”

Do not:
- claim official designer products
- imply affiliation with designer brands
- say “official LV,” “official Creed,” “official Dior,” etc.
- invent designer affiliations

Footer legal line:
“Inspired perfume oils. Not affiliated with any designer brands.”

## Preserve functionality
Never break:
- product grid
- search
- filters
- add to cart
- toast after add
- cart drawer
- cart counter
- quantity +/-
- remove item
- total update
- WhatsApp checkout message
- Instagram link
- mobile responsiveness

## Design direction
Modern premium perfume ecommerce.

Use:
- near-black / obsidian background
- deep charcoal sections
- warm ivory text
- muted warm gray secondary text
- subtle bronze/gold borders
- orange only as an accent for CTAs, badges, cart count, and hover states
- disciplined image placement
- clean typography
- polished product cards

Avoid:
- huge orange blocks
- ugly gradients
- generic Shopify/SaaS template look
- medieval/distressed fonts
- stretched images
- repeated images without purpose
- heavy animation systems
- custom cursor
- horizontal scroll

## Image rules
Use local assets from `public/assets/`.

Do not hotlink external image URLs.

When using images:
- do not stretch
- use `object-fit: contain` for bottles/logos
- use `object-fit: cover` for lifestyle images
- assign each image deliberately
- avoid blurry screenshots as large hero images

## Build instructions
Before finishing:
- run `npm run build`
- fix build errors
- preserve existing functionality
- commit changes with a clear message
