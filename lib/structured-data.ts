import { Product } from '@/data/products'

// Organization structured data for the company
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Xiamen Union Spares Ltd.',
    url: 'https://xiamenunion.com',
    logo: 'https://xiamenunion.com/logo.png',
    description:
      'Professional industrial equipment spare parts supplier providing cylinder covers, pistons, cylinder liners, bearings, crankshafts, and connecting rods for marine and locomotive diesel engines.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Xiamen',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@xiamenunion.com',
    },
    sameAs: [] as string[],
  }
}

// WebPage structured data
export function generateWebPageJsonLd(pathname: string, title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `https://xiamenunion.com${pathname}`,
    name: title,
    description: description,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      url: 'https://xiamenunion.com',
      name: 'Xiamen Union Spares Ltd.',
    },
  }
}

// Product structured data
export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.detailedDescription || product.description,
    image: [`https://xiamenunion.com${product.image}`],
    category: productCategories[productCategories.findIndex(c => c.id === product.category)]?.name || product.category,
    brand: {
      '@type': 'Brand',
      name: product.brands[0] || 'Spares Union',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Xiamen Union Spares Ltd.',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: {
        '@type': 'Organization',
        name: 'Xiamen Union Spares Ltd.',
      },
    },
    additionalProperty: product.specifications.map((spec, index) => ({
      '@type': 'PropertyValue',
      name: `Specification ${index + 1}`,
      value: spec,
    })),
  }
}

// Product collection structured data
export function generateCollectionPageJsonLd(products: Product[], category: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    url: `https://xiamenunion.com/products${category !== 'all' ? `?category=${category}` : ''}`,
    name: category === 'all' ? 'All Products' : `${category} Products`,
    description: `Browse our collection of ${category === 'all' ? 'industrial spare parts' : `${category} products`}`,
    about: products.slice(0, 10).map((product) => ({
      '@type': 'Product',
      name: product.title,
      description: product.description,
    })),
  }
}

// BreadcrumbList structured data
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Helper function for product category names
const productCategories = [
  { id: 'all', name: 'All Products' },
  { id: 'cylinder-cover', name: 'Cylinder Cover' },
  { id: 'piston', name: 'Piston' },
  { id: 'cylinder-liner', name: 'Cylinder Liner' },
  { id: 'bearing', name: 'Bearing & Bearing Bush' },
  { id: 'crankshaft', name: 'Crankshaft' },
  { id: 'connecting-rod', name: 'Connecting Rod' },
]
