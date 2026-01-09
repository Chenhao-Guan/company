import {
  Layers,
  Copy,
  Disc,
  Circle,
  CircleDot,
  Settings,
  Link2,
  Newspaper,
  type LucideIcon,
} from "lucide-react"

// ============================================
// CATEGORY ICON MAPPINGS
// ============================================

export const PRODUCT_CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  all: Layers,
  "cylinder-cover": Copy,
  piston: Disc,
  "cylinder-liner": Circle,
  bearing: CircleDot,
  crankshaft: Settings,
  "connecting-rod": Link2,
}

export const NEWS_CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  all: Newspaper,
  company: Newspaper,
  products: Newspaper,
  technology: Newspaper,
  industry: Newspaper,
  announcements: Newspaper,
}

// ============================================
// PAGINATION CONSTANTS
// ============================================

export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  SCROLL_OFFSET: 400,
} as const

// ============================================
// ANIMATION CONSTANTS
// ============================================

export const ANIMATION = {
  STAGGER_DELAY: 0.05,
  STAGGER_DELAY_FOOTER: 0.1,
  MODAL_DAMPING: 20,
  MODAL_STIFFNESS: 300,
  FADE_DURATION: 0.3,
  HERO_DURATION: 0.6,
  FOOTER_DURATION: 0.8,
} as const

// ============================================
// MODAL CONSTANTS
// ============================================

export const MODAL = {
  Z_INDEX: 50,
  MAX_WIDTH: {
    PRODUCT: "6xl",
    NEWS: "5xl",
  },
  BACKDROP_BLUR: "sm",
} as const

// ============================================
// EMAIL DEFAULTS
// ============================================

export const EMAIL_DEFAULTS = {
  TO: "info@xiamenunion.com",
  FROM: process.env.CONTACT_EMAIL || "info@xiamenunion.com",
} as const
