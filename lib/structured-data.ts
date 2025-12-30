import { Product } from '@/data/products'

// Organization structured data for the company - Enhanced
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Xiamen Union Spares Ltd.',
    alternateName: 'Xiamen Union Spares',
    url: 'https://xiamenunion.com',
    logo: 'https://xiamenunion.com/logo.png',
    description:
      'Professional industrial equipment spare parts supplier providing cylinder covers, pistons, cylinder liners, bearings, crankshafts, and connecting rods for marine and locomotive diesel engines.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Xiamen',
      addressRegion: 'Fujian',
      addressCountry: 'CN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'info@xiamenunion.com',
        availableLanguage: 'English',
        areaServed: 'Worldwide',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@xiamenunion.com',
        availableLanguage: ['English', 'Chinese'],
      },
    ],
    sameAs: [] as string[],
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    foundingDate: '2010',
    knowsAbout: [
      'Diesel Engine Parts',
      'Marine Equipment',
      'Locomotive Parts',
      'Cylinder Covers',
      'Pistons',
      'Cylinder Liners',
      'Bearings',
      'Crankshafts',
      'Connecting Rods',
    ],
  }
}

// LocalBusiness structured data
export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Xiamen Union Spares Ltd.',
    image: 'https://xiamenunion.com/logo.png',
    url: 'https://xiamenunion.com',
    telephone: '+86-592-1234567',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Xiamen',
      addressRegion: 'Fujian',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.4798,
      longitude: 118.0894,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
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

// Product structured data - Enhanced with complete schema
export function generateProductJsonLd(product: Product) {
  const images = [
    `https://xiamenunion.com${product.image}`,
    ...(product.gallery || []).map(img => `https://xiamenunion.com${img}`)
  ]

  const categoryName = productCategories[productCategories.findIndex(c => c.id === product.category)]?.name || product.category

  // Extract engine brand from technical specs if available
  const engineBrand = product.technicalSpecs?.['Engine Brand'] || product.brands[0] || 'Various'

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.detailedDescription || product.description,
    image: images,
    category: categoryName,
    brand: {
      '@type': 'Brand',
      name: product.brands[0] || 'Spares Union',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Xiamen Union Spares Ltd.',
      url: 'https://xiamenunion.com',
      logo: 'https://xiamenunion.com/logo.png',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: {
        '@type': 'Organization',
        name: 'Xiamen Union Spares Ltd.',
        url: 'https://xiamenunion.com',
      },
      url: `https://xiamenunion.com/products`,
      itemCondition: 'https://schema.org/NewCondition',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 7,
            maxValue: 21,
            unitCode: 'DAY',
          },
        },
      },
    },
    additionalProperty: [
      ...product.specifications.map((spec, index) => ({
        '@type': 'PropertyValue',
        name: `Specification ${index + 1}`,
        value: spec,
      })),
      // Add technical specs as properties
      ...(product.technicalSpecs ? Object.entries(product.technicalSpecs).map(([key, value]) => ({
        '@type': 'PropertyValue',
        name: key,
        value: value,
      })) : []),
    ],
    // Add application areas
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    // Add audience
    audience: {
      '@type': 'Audience',
      audienceType: 'B2B',
    },
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

// FAQ structured data for the website
export function generateFAQJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What types of diesel engine parts do you supply?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We supply a comprehensive range of diesel engine parts including cylinder covers, pistons, cylinder liners, bearings, crankshafts, and connecting rods for marine and locomotive diesel engines.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which engine brands are compatible with your parts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our parts are compatible with major diesel engine brands including EMD, Sulzer, MAN, Wärtsilä, MaK, Daihatsu, Pielstick, SKL, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer international shipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we ship worldwide. Our marine and locomotive diesel engine parts are exported to customers across the globe with reliable shipping options.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I request a quote for parts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can request a quote by filling out our contact form on the website, or by emailing us directly at info@xiamenunion.com. Please include the part name, quantity, and your shipping address.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is your quality assurance process?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All our parts undergo rigorous quality control inspections. As a manufacturer with years of experience in casting diesel engine parts, we ensure each component meets international quality standards before delivery.',
        },
      },
    ],
  }
}

// Article structured data for news/blog posts
export function generateArticleJsonLd(
  title: string,
  description: string,
  publishDate: string,
  url: string,
  author: string = 'Xiamen Union Spares Ltd.'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: 'https://xiamenunion.com/og-image.jpg',
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://xiamenunion.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xiamen Union Spares Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://xiamenunion.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

// WebSite structured data with search action
export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://xiamenunion.com/',
    name: 'Xiamen Union Spares Ltd.',
    description: 'Professional industrial equipment spare parts supplier',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://xiamenunion.com/products?search={search_term_string}',
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: true,
        valueName: 'search_term_string',
      },
    },
  }
}
