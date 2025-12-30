# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Xiamen Union Spares Ltd. website - A Next.js 14 application for industrial equipment spare parts supplier. The site showcases products, news, certifications, and provides a contact form for inquiries.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Technology Stack

- **Framework**: Next.js 14.2.16 with App Router (React 18)
- **Language**: TypeScript with strict path aliases (`@/*` → root)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion (loaded via CDN in layout.tsx:26)
- **Forms**: React Hook Form + Zod validation
- **Backend**: Next.js Server Actions for form handling
- **Email**: Nodemailer for contact form submissions

## Architecture

### App Router Structure (`app/`)

```
app/
├── actions/          # Server actions (marked with "use server")
│   └── contact.ts    # Contact form submission with Zod validation
├── products/         # Products page with filtering
├── news/             # News/announcements page
├── certificates/     # Certificates page
├── layout.tsx        # Root layout with metadata + CDN scripts
└── page.tsx          # Home page wrapper
```

### Component Architecture (`components/`)

- **UI Components**: `components/ui/` - shadcn/ui primitives (Dialog, Card, Button, etc.)
- **Section Components**: `hero-banner.tsx`, `about-section.tsx`, `contact-section.tsx`, `product-overview.tsx`
- **Layout**: `header.tsx` (fixed with scroll effects), `footer.tsx`
- **Modals**: Product detail modals and news detail modals use shadcn/ui Dialog components

### Data Management (`data/`)

Content is stored as TypeScript files with strong typing:
- `products.ts` - Product catalog with `Product` interface (52 products across 7 categories)
- `news.ts` - News articles with `NewsItem` interface

When adding products/news:
1. Update the respective array in `data/products.ts` or `data/news.ts`
2. Add images to appropriate `public/image/` subdirectory
3. Images are served statically (image optimization disabled in next.config.mjs:9-11)

### Key Interfaces

**Product** (`data/products.ts:1-17`):
```typescript
interface Product {
  id: number
  title: string
  category: string
  description: string
  icon: string
  image: string
  gradient: string
  specifications: string[]
  applications: string[]
  brands: string[]
  detailedDescription?: string
  technicalSpecs?: Record<string, string>
  gallery?: string[]
}
```

**Product Categories** (`data/products.ts:19-27`):
- `all` - All Products
- `cylinder-cover` - Cylinder Cover
- `piston` - Piston
- `cylinder-liner` - Cylinder Liner
- `bearing` - Bearing & Bearing Bush
- `crankshaft` - Crankshaft
- `connecting-rod` - Connecting Rod

### Server Actions Pattern

Contact form uses Next.js Server Actions (`app/actions/contact.ts:15-78`):
1. "use server" directive at top of file
2. Zod schema validation for inputs
3. Email generation via `generateContactEmailHTML()`
4. Nodemailer sending via `sendEmail()` utility
5. Returns `{ success: boolean, message: string }`

Environment variables needed:
- `CONTACT_EMAIL` - Primary recipient (defaults to info@xiamenunion.com)
- `CONTACT_CC_EMAIL` - CC recipient (optional)
- `INTERNAL_NOTIFICATION_EMAIL` - Internal notification (optional)

### Styling System

- Tailwind configured in `tailwind.config.ts` with CSS variables for theming
- `lib/utils.ts` exports `cn()` utility for clsx + tailwind-merge
- shadcn/ui configured in `components.json` with RSC enabled
- Custom animations defined in `tailwind.config.ts`

### Form Handling Pattern

Forms use React Hook Form + Zod:
1. Define Zod schema for validation
2. Use `react-hook-form` with `zodResolver`
3. Server action handles submission
4. Success/error messages returned to client

## Build Configuration

**`next.config.mjs`**:
- ESLint and TypeScript errors ignored during builds (lines 3-8)
- Image optimization disabled (line 10) - images served from `public/`

## Important Notes

- No testing framework is currently configured
- Framer Motion loaded via CDN in `app/layout.tsx:26` (not npm package)
- Font Awesome loaded via CDN in `app/layout.tsx:25`
- All product images stored in `public/image/products/` by category
- Contact form uses Chinese comments in server action
- Home content component uses `export const dynamic = 'off'` for SSR control
