export interface Product {
  id: number
  title: string
  category: string
  description: string
  icon: string
  image: string
  gradient: string
  price?: string
  specifications: string[]
  applications: string[]
  brands: string[]
  detailedDescription?: string
  technicalSpecs?: {
    [key: string]: string
  }
  gallery?: string[]
}

export const productCategories = [
  { id: "all", name: "All Products", icon: "fas fa-th-large" },
  { id: "cylinder-cover", name: "Cylinder Cover", icon: "fas fa-clone" },
  { id: "piston", name: "Piston", icon: "fas fa-compact-disc" },
  { id: "cylinder-liner", name: "Cylinder Liner", icon: "fas fa-life-ring" },
  { id: "bearing", name: "Bearing & Bearing Bush", icon: "fas fa-ring" },
  { id: "crankshaft", name: "Crankshaft", icon: "fas fa-cogs" },
  { id: "connecting-rod", name: "Connecting Rod", icon: "fas fa-link" },
]

export const products: Product[] = [
  {
    id: 1,
    title: "EMD 645 Cylinder Head",
    category: "cylinder-cover", // <-- MATCHES THE NEW CATEGORY
    description: "New and repaired cylinder heads for EMD diesel engines.",
    icon: "", // <-- MATCHES THE NEW CATEGORY ICON
    image: "/image/products/cylindercover/Emd 645 Cylinder Head.jpg",
    gradient: "from-transparent to-transparent",
    specifications: [
      "Compatible with EMD 645 series",
      "Material: Cast Iron or Aluminum",
      "Repair services for cracked heads available",
    ],
    applications: ["EMD brand train diesel engines", "Diesel engine maintenance"],
    brands: ["Spares Union (compatible with EMD)"],
    detailedDescription:
      "Repairing a cracked cylinder head always involves a certain amount of risk, but when done properly is usually much less expensive than replacing a cracked head with a new or used casting. Most small cracks in cast iron as well as aluminum heads can be repaired by pinning. When a vehicle overheats, it puts stress on all of its metal components, including the cylinder head, which is often at the center of the heat. This can cause the head gasket to fail, which may lead to cylinder head cracking as the components warp and pressure begins to leak. As a factory with many years of casting diesel engine parts, our factory supplies a large amount of Emd 645 Cylinder Head for EMD brand train diesel engines for diesel engine maintenance needs.",
    technicalSpecs: {
      "Model Compatibility": "EMD 645",
      "Casting Material": "High-grade Cast Iron / Aluminum",
      "Primary Application": "Train Diesel Engines",
      "Key Feature": "Available as new casting or repaired unit",
    },
  },
  {
    id: 2,
    title: "Sulzer Atl25-30H Piston",
    category: "piston",
    description: "High-quality cast pistons for Sulzer brand marine diesel engines.",
    icon: "",
    image: "/image/products/piston/sulzer-atl25-30h-piston.jpg",
    gradient: "from-transparent to-transparent",
    specifications: ["Model: Atl25-30H", "Application: Marine diesel engines", "High-efficiency design"],
    applications: ["Marine propulsion", "Power plants", "Railway engines"],
    brands: ["Spares Union (compatible with Sulzer)"],
    detailedDescription:
      "Sulzer is a world-renowned name for diesel engines used in ships, power plants, and railways. Our factory produces high-quality cast pistons for the Sulzer Atl25-30H model, specifically designed for marine diesel engine maintenance needs. These components are engineered for efficiency and reduced maintenance.",
    technicalSpecs: {
      "Engine Brand": "Sulzer",
      "Engine Model": "Atl25-30H",
      "Application Type": "Marine",
      "Component": "Piston",
    },
  },
  {
    id: 3,
    title: "Emd 8472778 Piston",
    category: "piston",
    description: "Durable cast pistons designed for EMD brand locomotive diesel engines.",
    icon: "",
    image: "/image/products/piston/img-emd-8472778-piston-0.jpg",
    gradient: "from-transparent to-transparent",
    specifications: ["Part Number: 8472778", "Application: Locomotive engines", "Heavy-duty construction"],
    applications: ["Locomotive diesel engines", "Engine maintenance"],
    brands: ["Spares Union (compatible with EMD)"],
    detailedDescription:
      "We supply a large volume of Emd 8472778 Pistons for EMD brand locomotive diesel engines. As a factory with years of experience in casting diesel engine parts, we provide these components and other accessories for essential engine maintenance and repair.",
    technicalSpecs: {
      "Engine Brand": "EMD",
      "Part Number": "8472778",
      "Application Type": "Locomotive",
      "Component": "Piston",
    },
  },
  {
    id: 4,
    title: "DM21 Cylinder Liner",
    category: "cylinder-liner",
    description: "Precision cylinder liners with proven durability for long service life.",
    icon: "",
    image: "/image/products/cylinderliner/img-dm21-cylinder-liner-0.jpg",
    gradient: "from-transparent to-transparent",
    specifications: ["Model: DM21", "High-endurance material", "Proven performance in marine engines"],
    applications: ["Marine diesel engines", "Heavy-duty industrial engines"],
    brands: ["Spares Union"],
    detailedDescription:
      "Based on the successful long-term performance observed in engines like the S.E.M.T.-Pielstick, our DM21 cylinder liners are built for endurance. In service tests, these components demonstrated excellent working order after thousands of operational hours, ensuring reliability for marine and other heavy-duty diesel engines.",
    technicalSpecs: {
      "Product Model": "DM21",
      "Component": "Cylinder Liner",
      "Performance": "Proven excellent condition after 8,000+ hours of operation",
    },
  },
  {
    id: 5,
    title: "PC2-5 Bearings",
    category: "bearing",
    description: "Main bearings and crankpin metals for Pielstick PC2-5 series engines.",
    icon: "",
    image: "/image/products/bearings/img-PC2-5-bearings-1.jpg",
    gradient: "from-transparent to-transparent",
    specifications: ["Engine: Pielstick PC2-5 / PC 2.5", "Type: Main bearings, Crankpin metals", "For high-output engines"],
    applications: ["Marine propulsion engines", "Two-stage supercharged engines"],
    brands: ["Spares Union (compatible with Pielstick)"],
    detailedDescription:
      "These bearings are designed for high-output diesel engines like the Pielstick 12PC2-5V. Service history shows these components, including crankpin metals and main bearings, remain in excellent condition after extensive use. They are reliable replacements for demanding applications, such as those in naval vessels.",
    technicalSpecs: {
      "Engine Series": "PC2-5",
      "Component": "Main Bearing / Crankpin Metal",
      "Application": "Marine Vessels",
    },
  },
  {
    "id": 6,
    "title": "D49 Cylinder Head",
    "category": "cylinder-cover",
    "description": "Durable cylinder heads designed for D49 brand locomotive diesel engines.",
    "icon": "",
    "image": "/image/products/cylindercover/img-d49-cylinder-cover-4.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: D49", "Application: Locomotive engines", "Designed to resist cracking from overheating"],
    "applications": ["D49 brand locomotive diesel engines", "Engine maintenance and repair"],
    "brands": ["Spares Union (compatible with D49)"],
    "detailedDescription": "The D49 Cylinder Head provides space for air and fuel passages and allows exhaust to escape. Cracking is often caused by engine overheating, which puts significant stress on the head. As an experienced factory, we supply high-quality D49 Cylinder Heads specifically for locomotive diesel engine maintenance.",
    "technicalSpecs": {
      "Engine Brand": "D49",
      "Application Type": "Locomotive",
      "Component": "Cylinder Head"
    },
    "gallery": [
      "/image/products/cylindercover/img-d49-cylinder-cover-0.jpg",
      "/image/products/cylindercover/img-d49-cylinder-cover-1.jpg",
      "/image/products/cylindercover/img-d49-cylinder-cover-2.jpg",
      "/image/products/cylindercover/img-d49-cylinder-cover-3.jpg",
    ]
  },
  {
    "id": 7,
    "title": "Mak 453 Cylinder Head",
    "category": "cylinder-cover",
    "description": "High-quality cylinder heads for MaK 453 marine diesel engines.",
    "icon": "",
    "image": "/image/products/cylindercover/img-mak-453-cylinder-cover-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: 453", "Application: Marine diesel engines", "Compatible with heavy fuel oil (HFO)"],
    "applications": ["Marine propulsion", "Ship diesel engines"],
    "brands": ["Spares Union (compatible with MaK)"],
    "detailedDescription": "We are a professional manufacturer specializing in MaK 453 Cylinder Heads for marine applications. MaK is a top brand in medium-speed propulsion, known for fuel efficiency on heavy fuel oil. Our experienced engineers ensure our cast parts meet the highest quality standards.",
    "technicalSpecs": {
      "Engine Brand": "MaK",
      "Engine Model": "453",
      "Application Type": "Marine",
      "Component": "Cylinder Head"
    }
  },
  {
    "id": 8,
    "title": "DL-26 Cylinder Cover",
    "category": "cylinder-cover",
    "description": "Mass-produced DL-26 cylinder covers for Daihatsu marine engines.",
    "icon": "",
    "image": "/image/products/cylindercover/img-dl-26-cylinder-cover-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: DL-26", "Engine Brand: Daihatsu", "Application: Marine engines"],
    "applications": ["Daihatsu marine diesel engines"],
    "brands": ["Spares Union (compatible with Daihatsu)"],
    "detailedDescription": "As a source manufacturer, we mass-produce and sell DL-26 cylinder cover accessories for Daihatsu marine engines. The cylinder head is critical for forming the combustion chamber, and our products meet the quality requirements to ensure a long life for the diesel engine. We are known for excellent quality and competitive pricing.",
    "technicalSpecs": {
      "Engine Brand": "Daihatsu",
      "Engine Model": "DL-26",
      "Application Type": "Marine",
      "Component": "Cylinder Cover"
    }
  },
  {
    "id": 9,
    "title": "DK-28 Cylinder Cover",
    "category": "cylinder-cover",
    "description": "DK-28 cylinder covers for large Daihatsu marine diesel engines.",
    "icon": "",
    "image": "/image/products/cylindercover/img-dk-28-cylinder-cover-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: DK-28", "Engine Brand: Daihatsu", "Application: Large marine engines"],
    "applications": ["Large marine diesel engines", "Daihatsu brand engines"],
    "brands": ["Spares Union (compatible with Daihatsu)"],
    "detailedDescription": "The DK-28 cylinder cover is suitable for large marine diesel engines of the DAIHATSU brand. This component sits above the cylinders on the cylinder block, closing the top to form the combustion chamber. We have mass-produced this high-quality product for many years.",
    "technicalSpecs": {
      "Engine Brand": "Daihatsu",
      "Engine Model": "DK-28",
      "Application Type": "Large Marine",
      "Component": "Cylinder Cover"
    }
  },
  {
    "id": 10,
    "title": "PA4 Connecting Rod",
    "category": "connecting-rod",
    "description": "High-strength connecting rods for PA4 series diesel engines.",
    "icon": "",
    "image": "/image/products/connectingrod/img-pa4-connecting-rod-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: PA4", "Material: Forged Steel", "Application: Piston Engines"],
    "applications": ["PA4 series diesel engines", "Engine rebuilding"],
    "brands": ["Spares Union"],
    "detailedDescription": "The connecting rod is a critical engine part that connects the piston to the crankshaft, converting reciprocating motion into rotation. Our PA4 connecting rods are manufactured to high standards for reliability and performance in demanding engine environments.",
    "technicalSpecs": {
      "Engine Series": "PA4",
      "Component": "Connecting Rod"
    }
  },
  {
    "id": 11,
    "title": "S165 Connecting Rod",
    "category": "connecting-rod",
    "description": "Durable connecting rods for Yanmar S165 marine diesel engines.",
    "icon": "",
    "image": "/image/products/connectingrod/img-s165-connecting-rod-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: S165", "Engine Brand: Yanmar", "Application: Marine engines"],
    "applications": ["Yanmar marine diesel engines", "Ship engine maintenance"],
    "brands": ["Spares Union (compatible with Yanmar)"],
    "detailedDescription": "As China's leading diesel engine parts manufacturer, we provide S165 Connecting Rods for Yanmar marine engines. The connecting rod is a vital component that converts the piston's motion into the crankshaft's rotation. Our parts ensure reliable performance for essential engine maintenance.",
    "technicalSpecs": {
      "Engine Brand": "Yanmar",
      "Engine Model": "S165",
      "Application Type": "Marine",
      "Component": "Connecting Rod"
    }
  },
  {
    "id": 12,
    "title": "EMD Crankshaft",
    "category": "crankshaft",
    "description": "High-quality crankshafts for EMD locomotive diesel engines.",
    "icon": "",
    "image": "/image/products/crankshaft/img-emd-crankshaft-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Engine Brand: EMD", "Application: Locomotive engines", "Material: Forged Steel"],
    "applications": ["EMD locomotive diesel engines", "Engine manufacturing and repair"],
    "brands": ["Spares Union (compatible with EMD)"],
    "detailedDescription": "Our factory manufactures and provides EMD crankshafts, which are the backbone of locomotive diesel engines. This component is responsible for converting the linear motion of the pistons into rotational motion. As a professional supplier, we provide EMD crankshafts with excellent quality assurance.",
    "technicalSpecs": {
      "Engine Brand": "EMD",
      "Application Type": "Locomotive",
      "Component": "Crankshaft"
    }
  },
  {
    "id": 13,
    "title": "D49 Crankshaft",
    "category": "crankshaft",
    "description": "Steel or ductile iron crankshafts for D49 series turbocharged diesel engines.",
    "icon": "",
    "image": "/image/products/crankshaft/img-d49-crankshaft-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Engine Model: D49", "Material: Steel or Ductile Iron", "Design: Includes attached counterweights"],
    "applications": ["D49 locomotive diesel engines", "Turbocharged direct-injection engines"],
    "brands": ["Spares Union (compatible with D49)"],
    "detailedDescription": "This crankshaft is designed for the D49 diesel engine, a turbocharged, charge air-cooled unit with direct fuel injection. Made from steel or ductile iron, these articulated shafts are provided with bolted counterweights and are a crucial component for the D49 locomotive engine's cast-steel, welded-design block.",
    "technicalSpecs": {
      "Engine Brand": "D49",
      "Engine Type": "Turbocharged Direct Injection",
      "Material": "Steel / Ductile Iron",
      "Component": "Crankshaft"
    }
  },
  {
    "id": 14,
    "title": "Sulzer S20 Cylinder Cover",
    "category": "cylinder-cover",
    "description": "Replacement cylinder heads for Sulzer S20 marine diesel engines.",
    "icon": "",
    "image": "/image/products/cylindercover/img-sulzer-s20-cylinder-cover-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: S20", "Application: Marine diesel engines", "Brand Compatibility: Sulzer"],
    "applications": ["Marine engine maintenance", "Ship engine repair"],
    "brands": ["Spares Union (compatible with Sulzer)"],
    "detailedDescription": "The Sulzer S20 Cylinder Head is used for the replacement and maintenance of Sulzer brand marine diesel engines. As a direct manufacturer, we offer these high-value components at a competitive price advantage, ensuring quality and reliability for your engine.",
    "technicalSpecs": {
      "Engine Brand": "Sulzer",
      "Engine Model": "S20",
      "Component": "Cylinder Cover"
    }
  },
  {
    "id": 15,
    "title": "Sulzer AL25-30 Cylinder Cover",
    "category": "cylinder-cover",
    "description": "Quality cylinder heads for Sulzer AL25-30 series diesel engines.",
    "icon": "",
    "image": "/image/products/cylindercover/img-sulzer-al25-30-cylinder-cover-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: AL25-30", "Application: Diesel engines", "Brand Compatibility: Sulzer"],
    "applications": ["Industrial diesel engines", "Engine maintenance"],
    "brands": ["Spares Union (compatible with Sulzer)"],
    "detailedDescription": "We provide accessories for major diesel engine brands like Sulzer, including the Sulzer AL25-30 Cylinder Head. The head provides space for fuel and air passages and is critical for engine performance. Our products come with a first-hand price and quality assurance, allowing you to maintain your engine with confidence.",
    "technicalSpecs": {
      "Engine Brand": "Sulzer",
      "Engine Model": "AL25-30",
      "Component": "Cylinder Cover"
    }
  },
  {
    "id": 16,
    "title": "Sulzer 40-48 Cylinder Head",
    "category": "cylinder-cover",
    "description": "Cylinder heads/covers for Sulzer 40-48 series marine and train engines.",
    "icon": "",
    "image": "/image/products/cylindercover/img-sulzer-40-48-cylinder-cover-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: 40-48", "Application: Marine & train engines", "Engine Type: Sulzer LDA series"],
    "applications": ["British Rail locomotives", "Romanian Railways locomotives", "Marine engines"],
    "brands": ["Spares Union (compatible with Sulzer)"],
    "detailedDescription": "As a long-established manufacturer of marine and train engine parts, we provide components for major brands like Sulzer, including the Sulzer 40-48 Cylinder Head (or Cylinder Cover). This component was used in the double-bank Sulzer LDA engines. We offer our products with a significant price advantage to help you maintain your engine affordably.",
    "technicalSpecs": {
      "Engine Brand": "Sulzer",
      "Engine Model": "40-48",
      "Component": "Cylinder Head"
    }
  },
  {
    "id": 17,
    "title": "Sulzer 20-24 Cylinder Cover",
    "category": "cylinder-cover",
    "description": "Cylinder covers for Sulzer 20-24 series rail traction engines.",
    "icon": "",
    "image": "/image/products/cylindercover/img-sulzer-20-24-cylinder-cover-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: 20-24", "Application: Rail traction engines", "Resistant to overheating cracks"],
    "applications": ["Diesel locomotives", "Rail engine maintenance"],
    "brands": ["Spares Union (compatible with Sulzer)"],
    "detailedDescription": "Sulzer's 20-24 series engines were used extensively in diesel locomotives across the UK, Europe, and South America. As an established manufacturer, we provide replacement cylinder covers for these engines. Repairing a cracked head is often much less expensive than replacement, and we offer quality parts with a price advantage to facilitate your maintenance needs.",
    "technicalSpecs": {
      "Engine Brand": "Sulzer",
      "Engine Model": "20-24",
      "Component": "Cylinder Cover"
    }
  },
  {
    "id": 18,
    "title": "Wärtsilä W22 Cylinder Cover",
    "category": "cylinder-cover",
    "description": "Cylinder covers for Wärtsilä W22 marine diesel engines.",
    "icon": "",
    "image": "/image/products/cylindercover/img-w22-cylinder-cover-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: W22", "Application: Marine diesel engines", "Brand Compatibility: Wärtsilä"],
    "applications": ["Wärtsilä marine engines", "Energy and marine markets"],
    "brands": ["Spares Union (compatible with Wärtsilä)"],
    "detailedDescription": "Our factory provides various parts for Wärtsilä engines, including the W22 cylinder cover. These covers are essential for sealing the cylinder head space from the outside, containing blow-by gases and lubricant oil droplets. We offer these and other components like piston rings and cylinder liners for your maintenance needs.",
    "technicalSpecs": {
      "Engine Brand": "Wärtsilä",
      "Engine Model": "W22",
      "Component": "Cylinder Cover"
    }
  },
  {
  "id": 19,
  "title": "SKL NVD48 Piston Pin",
  "category": "piston",
  "description": "Piston pins for SKL NVD48 diesel engines.",
  "icon": "",
  "image": "/image/products/piston/img-nvd48-pinston-pin-0.jpg",
  "gradient": "from-transparent to-transparent",
  "specifications": ["Model: NVD48", "Application: Diesel engines", "Brand Compatibility: SKL"],
  "applications": ["SKL diesel engines", "Marine and industrial applications"],
  "brands": ["Spares Union (compatible with SKL)"],
  "detailedDescription": "The cylinder walls and piston-pin bearings are lubricated by oil fling dispersed by the rotating crankshaft, with excess oil scraped off by the lower piston ring. Our factory is a large-scale diesel engine parts R&D and manufacturer in China. We provide NVD48 Piston Pins to ensure your maintenance needs for SKL brand diesel engines. Welcome to contact us.",
  "technicalSpecs": {
    "Engine Brand": "SKL",
    "Engine Model": "NVD48",
    "Component": "Piston"
    }
  },
  {
  "id": 20,
  "title": "EMD 40078951 Piston Pin",
  "category": "piston",
  "description": "High-quality piston pin with part number 40078951 for EMD diesel engines.",
  "icon": "",
  "image": "/image/products/piston/img-emd-40078951-piston-0.jpg",
  "gradient": "from-transparent to-transparent",
  "specifications": ["Part Number: 40078951", "Application: Diesel engines", "Brand Compatibility: EMD"],
  "applications": ["EMD diesel engines", "Locomotives and industrial applications"],
  "brands": ["Spares Union (compatible with EMD)"],
  "detailedDescription": "The piston pin serves as the crucial connecting link between the piston and the connecting rod. It is designed as a simple, strong cylindrical shaft, which can be solid or hollow. We are a professional manufacturer in China providing affordable, first-hand diesel engine parts like the EMD 40078951 Piston Pin for your maintenance needs. Welcome to contact us.",
  "technicalSpecs": {
    "Engine Brand": "EMD",
    "Component": "Piston",
    "Part Number": "40078951"
    }
  },
  {
    "id": 21,
    "title": "EMD 8269842 Piston Pin",
    "category": "piston",
    "description": "Durable piston pin with part number 8269842 for EMD diesel engines.",
    "icon": "",
    "image": "/image/products/piston/img-emd-8269842-piston-pin-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Part Number: 8269842", "Application: Diesel engines", "Brand Compatibility: EMD"],
    "applications": ["EMD diesel engines", "Marine and railway applications"],
    "brands": ["Spares Union (compatible with EMD)"],
    "detailedDescription": "The cylinder walls and piston-pin bearings are lubricated by oil dispersed by the rotating crankshaft, with excess oil scraped off by the piston's lower ring. We are a professional manufacturer of diesel engine parts in China, providing first-hand affordable products like the EMD 8269842 Piston Pin. We also offer pistons, cylinder heads, and other parts. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "EMD",
      "Component": "Piston",
      "Part Number": "8269842"
    }
  },
  {
    "id": 22,
    "title": "MAN T23 Piston",
    "category": "piston",
    "description": "Replacement pistons for MAN T23 model diesel engines.",
    "icon": "",
    "image": "/image/products/piston/img-t23-piston-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: T23", "Application: Diesel engines", "Brand Compatibility: MAN"],
    "applications": ["MAN diesel engines", "Power generation and marine propulsion"],
    "brands": ["Spares Union (compatible with MAN)"],
    "detailedDescription": "Pistons are commonly made of cast aluminum alloy for its excellent lightweight thermal conductivity. Proper clearance must be provided to maintain free piston movement in the cylinder bore as it expands with heat. As a production factory, we provide T23 pistons for routine maintenance of MAN brand diesel engines and parts for other brands. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "MAN",
      "Engine Model": "T23",
      "Component": "Piston"
    }
  },
  {
    "id": 23,
    "title": "Pielstick PC2-6H Piston",
    "category": "piston",
    "description": "Durable pistons for Pielstick PC2-6H model diesel engines.",
    "icon": "",
    "image": "/image/products/piston/img-ps2-6h-piston-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: PC2-6H", "Application: Diesel engines", "Brand Compatibility: S.E.M.T. Pielstick"],
    "applications": ["Pielstick diesel engines", "Submarines and naval vessels", "Marine propulsion"],
    "brands": ["Spares Union (compatible with Pielstick)"],
    "detailedDescription": "The piston's reciprocating motion is converted into the circular motion of the crankshaft, which ultimately propels the vessel or does other useful work. We provide PC2-6H piston maintenance for Pielstick brand engines and also offer various accessories like cylinder heads and liners for Man, EMD, Wartsila, and other brands. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "Pielstick",
      "Engine Model": "PC2-6H",
      "Component": "Piston"
    }
  },
  {
    "id": 24,
    "title": "Pielstick PC2-6D Piston",
    "category": "piston",
    "description": "High-performance pistons for Pielstick PC2-6D model diesel engines.",
    "icon": "",
    "image": "/image/products/piston/img-ps2-6d-piston-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: PC2-6D", "Application: Diesel engines", "Brand Compatibility: S.E.M.T. Pielstick"],
    "applications": ["Pielstick diesel engines", "Naval frigates (e.g., Sawari II, Sigma class)", "US Navy vessels"],
    "brands": ["Spares Union (compatible with Pielstick)"],
    "detailedDescription": "Diesel engines are a highly efficient type of piston engine, available in two-stroke and four-stroke cycles. We are a professional manufacturer providing PC2-6D Pistons for Pielstick engine maintenance. We also supply various accessories for Man, EMD, Sulzer, Daihatsu, and other brands. Please contact us.",
    "technicalSpecs": {
      "Engine Brand": "Pielstick",
      "Engine Model": "PC2-6D",
      "Component": "Piston"
    }
  },
  {
    "id": 25,
    "title": "Pielstick PC2-5 Piston",
    "category": "piston",
    "description": "Reliable pistons for Pielstick PC2-5 model diesel engines.",
    "icon": "",
    "image": "/image/products/piston/img-pc2-5-piston-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: PC2-5", "Application: Diesel engines", "Brand Compatibility: S.E.M.T. Pielstick"],
    "applications": ["Pielstick diesel engines", "Naval vessels (frigates, patrol boats, landing docks)"],
    "brands": ["Spares Union (compatible with Pielstick)"],
    "detailedDescription": "In an engine, the piston's purpose is to transfer force from expanding gas in the cylinder to the crankshaft via a connecting rod. We are a professional diesel engine parts manufacturer providing the PC2-5 piston to ensure the normal maintenance of Pielstick engines. We also provide cylinders, cylinder heads, and other accessories. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "Pielstick",
      "Engine Model": "PC2-5",
      "Component": "Piston"
    }
  },
  {
    "id": 26,
    "title": "MAN 35MC Piston Head",
    "category": "piston",
    "description": "Piston heads for MAN 35MC marine diesel engines.",
    "icon": "",
    "image": "/image/products/piston/img-man-35mc-piston-crown-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: 35MC", "Component: Piston Head", "Brand Compatibility: MAN"],
    "applications": ["MAN marine diesel engines", "Marine propulsion systems", "Power plant applications"],
    "brands": ["Spares Union (compatible with MAN)"],
    "detailedDescription": "The piston head is the top surface of the piston, subjected to tremendous forces and heat during engine operation. With the widespread use of MAN marine diesel engines, we have provided a large number of accessories for ship maintenance, including the MAN 35MC Piston Head. We also supply parts for other brands like EMD, Sulzer, and Wartsila. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "MAN",
      "Engine Model": "35MC",
      "Component": "Piston"
    }
  },
  {
    "id": 27,
    "title": "MAN S50MC Piston Crown",
    "category": "piston",
    "description": "High-durability piston crowns for MAN S50MC two-stroke marine engines.",
    "icon": "",
    "image": "/image/products/piston/img-man-s50mc-piston-crown-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: S50MC", "Component: Piston Crown", "Brand Compatibility: MAN"],
    "applications": ["MAN two-stroke marine engines", "Large container vessels", "Bulk carriers"],
    "brands": ["Spares Union (compatible with MAN)"],
    "detailedDescription": "The piston crown is the uppermost part of the piston that endures the highest thermal and mechanical loads in the combustion chamber. Our MAN S50MC compatible piston crowns are manufactured to withstand extreme conditions, ensuring engine reliability and efficiency. We supply a wide range of MAN engine components for the global after-sales market. Contact us for your engine maintenance needs.",
    "technicalSpecs": {
      "Engine Brand": "MAN",
      "Engine Model": "S50MC",
      "Component": "Piston"
    }
  },
  {
    "id": 28,
    "title": "Pielstick PC2-2 Piston",
    "category": "piston",
    "description": "Replacement pistons for Pielstick PC2-2 diesel engines.",
    "icon": "",
    "image": "/image/products/piston/img-pc2-2-piston-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: PC2-2", "Application: Marine and locomotive diesel engines", "Brand Compatibility: S.E.M.T. Pielstick"],
    "applications": ["Pielstick diesel engines", "Marine propulsion", "Locomotive engines"],
    "brands": ["Spares Union (compatible with Pielstick)"],
    "detailedDescription": "Pistons work by transferring the force from expanding gas in the cylinder to a crankshaft, creating rotational momentum in a reciprocating engine. As a long-established marine and locomotive diesel engine parts manufacturer, we provide various parts for Pielstick and other brands, such as the PC2-2 piston. We offer large-scale parts R&D and production services. Please contact us.",
    "technicalSpecs": {
      "Engine Brand": "Pielstick",
      "Engine Model": "PC2-2",
      "Component": "Piston"
    }
  },
  {
    "id": 29,
    "title": "EMD Cylinder Liner",
    "category": "cylinder-liner",
    "description": "Cylinder liners for EMD diesel engines used in rail and marine applications.",
    "icon": "",
    "image": "/image/products/cylinderliner/img-emd-cylinder-liner-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Application: Diesel engines", "Brand Compatibility: EMD", "Component: Cylinder Liner"],
    "applications": ["EMD diesel engines", "Diesel-electric locomotives", "Marine energy supply"],
    "brands": ["Spares Union (compatible with EMD)"],
    "detailedDescription": "The cylinder liner serves as the inner wall of a cylinder, forming an excellent sliding surface for the piston rings while retaining lubricant. Our factory provides various accessories for EMD diesel engines, including pistons, cylinder liners, and rings. We have mass-produced EMD-related accessories for many years, which play a huge role in the energy supply of ships and trains. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "EMD",
      "Component": "Cylinder Liner"
    }
  },
  {
    "id": 30,
    "title": "MaK M453AK Cylinder Liner",
    "category": "cylinder-liner",
    "description": "Cylinder liners for MaK M453AK marine diesel engines.",
    "icon": "",
    "image": "/image/products/cylinderliner/img-mak453ak-cylinder-liner-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: M453AK", "Brand Compatibility: MaK", "Material: Cast iron alloy"],
    "applications": ["MaK marine diesel engines", "Ships and locomotives"],
    "brands": ["Spares Union (compatible with MaK)"],
    "detailedDescription": "The cylinder liner forms the cylindrical space in which the piston reciprocates. While the cylinder block is often made from grey cast iron, our liners are manufactured from a superior cast iron alloyed with chromium, vanadium, and molybdenum for enhanced durability. As a professional manufacturer, we provide various parts for MaK diesel engines, such as this M453AK cylinder liner. Contact us for more information.",
    "technicalSpecs": {
      "Engine Brand": "MaK",
      "Engine Model": "M453AK",
      "Component": "Cylinder Liner"
    }
  },
  {
    "id": 31,
    "title": "Daihatsu DL-26 Cylinder Liner",
    "category": "cylinder-liner",
    "description": "High-quality cylinder liners for Daihatsu DL-26 marine diesel engines.",
    "icon": "",
    "image": "/image/products/cylinderliner/img-dl-26-cylinder-liner-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: DL-26", "Brand Compatibility: Daihatsu", "Material: High-grade metal alloy"],
    "applications": ["Daihatsu marine engines", "Ship maintenance"],
    "brands": ["Spares Union (compatible with Daihatsu)"],
    "detailedDescription": "We provide the DL-26 cylinder liner and other Daihatsu marine parts. The liner, made from a good quality metal with excellent heat transfer properties, forms the cylindrical space for the piston. Our DL-26 cylinder liners meet the rigorous requirements of diesel engines, and the superior materials ensure a long service life. We look forward to hearing from you.",
    "technicalSpecs": {
      "Engine Brand": "Daihatsu",
      "Engine Model": "DL-26",
      "Component": "Cylinder Liner"
    }
  },
  {
    "id": 32,
    "title": "Pielstick PC2-5 Cylinder Liner",
    "category": "cylinder-liner",
    "description": "Cylinder liners for Pielstick PC2-5 multi-fuel diesel engines.",
    "icon": "",
    "image": "/image/products/cylinderliner/img-pc2-5-cylinder-liner-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: PC2-5", "Brand Compatibility: Pielstick", "Material: Cast iron alloy with chromium, vanadium, molybdenum"],
    "applications": ["Pielstick diesel engines", "Marine power plants", "Multi-fuel applications (HFO, bio-fuel)"],
    "brands": ["Spares Union (compatible with Pielstick)"],
    "detailedDescription": "The PC2-5 cylinder liner we provide is a main accessory for maintaining Pielstick marine diesel engines. These liners are manufactured from a cast iron alloyed with chromium, vanadium, and molybdenum, creating the durable cylindrical space in which the piston reciprocates. We also provide diesel engine accessories for other brands. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "Pielstick",
      "Engine Model": "PC2-5",
      "Component": "Cylinder Liner"
    }
  },
  {
    "id": 33,
    "title": "Daihatsu 6PS-26H Cylinder Liner",
    "category": "cylinder-liner",
    "description": "Cylinder liners (sleeves) for Daihatsu 6PS-26H series engines.",
    "icon": "",
    "image": "/image/products/cylinderliner/img-6ps-26h-cylinder-liner-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: 6PS-26H", "Brand Compatibility: Daihatsu", "Function: Forms cylinder for piston travel"],
    "applications": ["Marine engines", "Locomotive engines", "Power generation"],
    "brands": ["Spares Union (compatible with Daihatsu)"],
    "detailedDescription": "A cylinder liner is a crucial cylindrical part fitted into an engine block to form a cylinder. In a reciprocating engine, it provides the space where the piston travels, riding on a thin layer of lubricating oil. As professional manufacturers for marine and locomotive power, we produce and export a series of cylinder liners, including the 6PS-26H model. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "Daihatsu",
      "Engine Model": "6PS-26H",
      "Component": "Cylinder Liner"
    }
  },
  {
    "id": 34,
    "title": "6MA1200 Cylinder Liner",
    "category": "cylinder-liner",
    "description": "Heavy-duty cylinder liners for 6MA1200 series diesel engines.",
    "icon": "",
    "image": "/image/products/cylinderliner/img-6ma1200-cylinder-liner-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: 6MA1200", "Application: Train and ship diesel engines", "Feature: High-quality, long service life"],
    "applications": ["Heavy-duty diesel engines", "Marine propulsion", "Railway locomotives"],
    "brands": ["Spares Union (compatible with 6MA1200 engines)"],
    "detailedDescription": "Cylinder liners are vital components that protect the piston from wear and tear. As a professional diesel engine parts factory with years of experience, we ensure the quality of our cylinders meets international advanced levels. The 6MA1200 cylinder liner is one of our many products, mass-produced and delivered with a guarantee for a long service life. We look forward to your contact.",
    "technicalSpecs": {
      "Engine Brand": "Generic",
      "Engine Model": "6MA1200",
      "Component": "Cylinder Liner"
    }
  },
  {
    "id": 35,
    "title": "Daihatsu 6DS-32 Cylinder Liner",
    "category": "cylinder-liner",
    "description": "Cost-effective cylinder liners for Daihatsu 6DS-32 diesel engines.",
    "icon": "",
    "image": "/image/products/cylinderliner/img-6ds-32-cylinder-linder-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: 6DS-32", "Brand Compatibility: Daihatsu", "Manufacturing: Centrifugal casting"],
    "applications": ["Daihatsu diesel engines", "Fuel-efficient engines", "Aluminum engine blocks"],
    "brands": ["Spares Union (compatible with Daihatsu)"],
    "detailedDescription": "The 6DS-32 Cylinder Liner is used in Daihatsu Diesel Engines. As a source manufacturer, we utilize centrifugal casting to make liners thinner, improving cooling performance and adherence to aluminum blocks to meet modern demands for fuel efficiency and lighter engines. Our cost-effective diesel engine parts are ready for order. Welcome to inquire.",
    "technicalSpecs": {
      "Engine Brand": "Daihatsu",
      "Engine Model": "6DS-32",
      "Component": "Cylinder Liner"
    }
  },
  {
    "id": 36,
    "title": "Sulzer LDA28 Cylinder Liner",
    "category": "cylinder-liner",
    "description": "Cylinder liners for Sulzer LDA28 series stationary, rail, and marine engines.",
    "icon": "",
    "image": "/image/products/cylinderliner/img-sulzer-lda28-cylinder-liner-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: LDA28", "Bore Size: 28cm", "Brand Compatibility: Sulzer"],
    "applications": ["Sulzer diesel engines", "Stationary power", "Rail traction", "Marine propulsion"],
    "brands": ["Spares Union (compatible with Sulzer)"],
    "detailedDescription": "The Sulzer 6LDA28 engine indicates a six-cylinder engine in the 'LDA' series with a 28cm cylinder bore. As a manufacturer with nearly 20 years of experience casting large diesel engine parts, we provide high-quality Sulzer LDA28 cylinder liners and components for other brands. We are glad you can contact us.",
    "technicalSpecs": {
      "Engine Brand": "Sulzer",
      "Engine Model": "LDA28",
      "Component": "Cylinder Liner"
    },
    "gallery": [
      "/image/products/cylinderliner/img-sulzer-lda28-cylinder-liner-1.jpg",
      "/image/products/cylinderliner/img-sulzer-lda28-cylinder-liner-2.jpg",
      "/image/products/cylinderliner/img-sulzer-lda28-cylinder-liner-3.jpg"
    ]
  },
  {
    "id": 37,
    "title": "SKL D49 Cylinder Liner",
    "category": "cylinder-liner",
    "description": "High-quality dry-type cylinder liners for SKL D49 diesel engines.",
    "icon": "",
    "image": "/image/products/cylinderliner/img-d49-cylinder-liner-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: D49", "Brand Compatibility: SKL", "Type: Dry liner"],
    "applications": ["SKL diesel engines", "Marine engines", "Train engines"],
    "brands": ["Spares Union (compatible with SKL)"],
    "detailedDescription": "We provide high-quality D49 cylinder liners, a main component of the diesel engine. These dry-type liners are made from close-grained cast iron and provide a very close fit with the jacket in the cylinder block to protect the piston. Our factory has strong R&D and manufacturing capabilities for marine and train engine parts. Welcome to contact us for more cooperation.",
    "technicalSpecs": {
      "Engine Brand": "SKL",
      "Engine Model": "D49",
      "Component": "Cylinder Liner"
    },
    "gallery": [
      "/image/products/cylinderliner/img-d49-cylinder-liner-1.jpg"
    ]
  },
  {
    "id": 38,
    "title": "EMD Connecting Rod",
    "category": "connecting-rod",
    "description": "General purpose connecting rods for EMD diesel engines.",
    "icon": "",
    "image": "/image/products/connectingrod/img-emd-connecting-rod-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Brand Compatibility: EMD", "Application: Diesel Engines", "Type: Master-and-slave (for radial engines)"],
    "applications": ["EMD diesel engines", "Radial engines", "Locomotives"],
    "brands": ["Spares Union (compatible with EMD)"],
    "detailedDescription": "Radial engines often use master-and-slave connecting rods, where a master rod attaches directly to the crankshaft and other rods pin to it. As China's leading diesel engine parts manufacturer, we provide a range of EMD Connecting Rods to meet your engine maintenance needs. We also supply cylinders, liners, and cylinder heads. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "EMD",
      "Component": "Connecting Rod"
    }
  },
  {
    "id": 39,
    "title": "EMD 8159354 Connecting Rod",
    "category": "connecting-rod",
    "description": "High-strength connecting rod, part number 8159354, for EMD engines.",
    "icon": "",
    "image": "/image/products/connectingrod/img-emd-8159354-connecting-rod-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Part Number: 8159354", "Brand Compatibility: EMD", "Application: Heavy-duty diesel engines"],
    "applications": ["EMD diesel engines", "Locomotives", "Industrial power systems"],
    "brands": ["Spares Union (compatible with EMD)"],
    "detailedDescription": "During each rotation, a connecting rod is subjected to large repetitive shear, compression, and tensile forces. As a professional diesel engine parts factory, we mass-produce the EMD 8159354 Connecting Rod for engine maintenance. We also produce parts for MAN, SKL, Sulzer, and other brands. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "EMD",
      "Part Number": "8159354",
      "Component": "Connecting Rod"
    }
  },
  {
    "id": 40,
    "title": "Daihatsu DS-22 Connecting Rod",
    "category": "connecting-rod",
    "description": "Connecting rods for Daihatsu DS-22 marine diesel engines.",
    "icon": "",
    "image": "/image/products/connectingrod/img-ds-22-connecting-rod-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: DS-22", "Brand Compatibility: Daihatsu", "Application: Marine diesel engines"],
    "applications": ["Daihatsu marine engines", "Ship propulsion systems"],
    "brands": ["Spares Union (compatible with Daihatsu)"],
    "detailedDescription": "A connecting rod for an internal combustion engine consists of the 'big end', 'rod', and 'small end'. The small end attaches to the gudgeon pin, while the big end connects to the crankpin. We provide the DS-22 Connecting Rod for DAIHATSU marine diesel engines to meet your parts requirements. We also supply accessories for other brands like MAN, EMD, and SKL. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "Daihatsu",
      "Engine Model": "DS-22",
      "Component": "Connecting Rod"
    }
  },
  {
    "id": 41,
    "title": "Daihatsu DL-20 Connecting Rod",
    "category": "connecting-rod",
    "description": "Connecting rods (con rods) for Daihatsu DL-20 marine diesel engines.",
    "icon": "",
    "image": "/image/products/connectingrod/img-dl-20-connecting-rod-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: DL-20", "Brand Compatibility: Daihatsu", "Application: Marine diesel engines"],
    "applications": ["Daihatsu marine engines", "Ship maintenance"],
    "brands": ["Spares Union (compatible with Daihatsu)"],
    "detailedDescription": "A connecting rod, or con rod, is the part of a piston engine which connects the piston to the crankshaft. Together with the crank, the connecting rod converts the reciprocating motion of the piston into the rotation of the crankshaft. We provide the DL-20 Connecting Rod for DAIHATSU marine diesel engine maintenance, along with other accessories like cylinder heads and pistons. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "Daihatsu",
      "Engine Model": "DL-20",
      "Component": "Connecting Rod"
    }
  },
  {
    "id": 44,
    "title": "SKL NVD 48 Copper Bushing",
    "category": "bearing",
    "description": "High-quality copper bushings for SKL NVD 48 marine diesel engines.",
    "icon": "",
    "image": "/image/products/bearings/img-NVD-48-main-bearings-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: NVD 48", "Brand Compatibility: SKL", "Material: Copper Alloy"],
    "applications": ["SKL NVD 48 marine diesel engines", "Connecting rods", "Ship parts"],
    "brands": ["Spares Union (compatible with SKL)"],
    "detailedDescription": "We supply a wide range of spares for SKL engines, including NVD 36 copper bushings. These bushings are essential components for connecting rods in marine diesel engines, ensuring smooth operation and durability. All our parts undergo rigorous inspection to guarantee quality and reliability for your maintenance needs.",
    "technicalSpecs": {
      "Engine Brand": "SKL",
      "Engine Model": "NVD 48",
      "Component": "Copper Bushing"
    },
    "gallery": [
      "/image/products/bearings/img-NVD-48-main-bearings-1.jpg"
    ]
  },
  {
    "id": 45,
    "title": "SKL NVD 36 Bimetal Bushing",
    "category": "bearing",
    "description": "Standardized, ready-to-fit NVD 36 duplex metal bushings.",
    "icon": "",
    "image": "/image/products/bearings/img-NVD-36-bimetal-bushing-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: NVD 36", "Brand Compatibility: SKL", "Standard: DIN ISO 43791", "Type: Bimetal"],
    "applications": ["Pivoting movements", "High-load applications", "Axial guide bearings"],
    "brands": ["Spares Union (compatible with SKL)"],
    "detailedDescription": "We are a leading company in manufacturing and exporting NVD 36 Duplex Metal Bushings. These standardized sliding bushings can absorb higher forces than conventional bearings and are ideal for high, unidirectional loads. The use of bimetal linings provides good mechanical strength, making them suitable for high-speed, high-load applications with proper lubrication.",
    "technicalSpecs": {
      "Engine Brand": "SKL",
      "Engine Model": "NVD 36",
      "Component": "Bimetal Bushing"
    },
    "gallery": [
      "/image/products/bearings/img-NVD-36-bimetal-bushing-1.jpg",
      "/image/products/bearings/img-NVD-36-bimetal-bushing-2.jpg"
    ]
  },
  {
    "id": 46,
    "title": "SKL NVD26 Connecting Rod Bushing",
    "category": "bearing",
    "description": "Connecting rod bushings for SKL NVD26 heavy-duty diesel engines.",
    "icon": "",
    "image": "/image/products/bearings/img-NVD26-Connecting-rod-bushing-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: NVD26", "Brand Compatibility: SKL", "Application: Connecting Rod Small End"],
    "applications": ["SKL diesel engines", "Heavy-duty engine applications"],
    "brands": ["Spares Union (compatible with SKL)"],
    "detailedDescription": "This bushing is part of a piston assembly for heavy-duty diesel engines. In lieu of a conventional Cu-Pb-Sn bushing, a coating of manganese phosphate is often applied to the pin or bore to provide necessary tribological properties. This porous coating absorbs and traps lubricating oil, creating a durable squeeze film between steel running surfaces under heavy loads.",
    "technicalSpecs": {
      "Engine Brand": "SKL",
      "Engine Model": "NVD26",
      "Component": "Connecting Rod Bushing"
    },
    "gallery": [
      "/image/products/bearings/img-NVD26-Connecting-rod-bushing-1.jpg"
    ]
  },
  {
    "id": 47,
    "title": "G72 Series Marine Bearings",
    "category": "bearing",
    "description": "G72 series standard and non-standard size bearings for marine engines.",
    "icon": "",
    "image": "/image/products/bearings/img-G72-1304-1CBG72-1303-1CB-bearings-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Series: G72", "Size: Metric and Imperial", "Application: Marine Engines"],
    "applications": ["Leisure boats", "Marine propulsion systems", "Ship repair yards"],
    "brands": ["Spares Union"],
    "detailedDescription": "We supply G72 series bearings for marine engines. Manufactured on-site, we stock standard sizes in both metric and imperial for immediate delivery, which is essential when a boat is waiting in dry dock. We also specialize in manufacturing non-standard sizes and work with businesses of all sizes, from major international chandleries to small marina shops.",
    "technicalSpecs": {
      "Engine Brand": "Generic Marine",
      "Series": "G72",
      "Component": "Bearing"
    },
    "gallery": [
      "/image/products/bearings/img-G72-1304-1CBG72-1303-1CB-bearings-1.jpg",
      "/image/products/bearings/img-G72-1304-1CBG72-1303-1CB-bearings-2.jpg"
    ]
  },
  {
    "id": 48,
    "title": "G60 Series Marine Bearings",
    "category": "bearing",
    "description": "G60 series connecting rod and main bearings for various diesel engines.",
    "icon": "",
    "image": "/image/products/bearings/img-G60-1307-CBG60-1306-CB-bearings-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Series: G60", "Application: Marine Diesel Engines", "Compatibility: SKL, Wartsila, MAN, MAK, Sulzer"],
    "applications": ["SKL NVD26/36/48", "Wartsila L20/Vasa 22/32", "MAN, MAK, Sulzer engines"],
    "brands": ["Spares Union (compatible with various brands)"],
    "detailedDescription": "The bearing is an essential part of your marine engine, responsible for power distribution. We are manufacturers and exporters of G60 series marine diesel engine parts. We have developed equipment and technology for various diesel engine bearings, including connecting rod and main shells for engines from Russian Diesel, SKL, Wartsila, MAN, MAK, and Sulzer. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Brand": "Multi-Brand Compatible",
      "Series": "G60",
      "Component": "Bearing"
    },
    "gallery": [
      "/image/products/bearings/img-G60-1307-CBG60-1306-CB-bearings-1.jpg",
      "/image/products/bearings/img-G60-1307-CBG60-1306-CB-bearings-2.jpg"
    ]
  },
  {
    "id": 49,
    "title": "6L27.5A2L Main Bearing STD",
    "category": "bearing",
    "description": "Standard main bearings for 6L27.5A2L marine and rail diesel engines.",
    "icon": "",
    "image": "/image/products/bearings/img-6L275A2L-main-bearing-STD-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: 6L27.5A2L", "Type: Main Bearing", "Size: Standard (STD)"],
    "applications": ["Marine diesel engines", "Rail diesel engines", "Piston engines"],
    "brands": ["Spares Union"],
    "detailedDescription": "In a piston engine, main bearings hold the crankshaft in place and allow it to rotate within the engine block. The number of bearings can affect engine balance and reduce bending stress. As a Chinese marine and rail engine parts manufacturer, we provide many kinds of engine parts, such as this 6L main bearing STD. Welcome to contact us.",
    "technicalSpecs": {
      "Engine Model": "6L27.5A2L",
      "Component": "Main Bearing"
    },
    "gallery": [
      "/image/products/bearings/img-6L275A2L-main-bearing-STD-1.jpg",
      "/image/products/bearings/img-6L275A2L-main-bearing-STD-2.jpg"
    ]
  },
  {
    "id": 50,
    "title": "Akasaka AH30 & ALH28 Bearings",
    "category": "bearing",
    "description": "Main and crankpin bearings for Akasaka AH30 and ALH28 series engines.",
    "icon": "",
    "image": "/image/products/bearings/img-marine-bearing-catalog-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Brand: Akasaka", "Models: AH30, ALH28", "Types: Main Bearing, Crankpin Bearing"],
    "applications": ["Akasaka marine engines", "Ship propulsion"],
    "brands": ["Spares Union (compatible with Akasaka)"],
    "detailedDescription": "We provide a range of bearings for Akasaka engines. This includes main bearings for the AH30 and ALH28 models, as well as crankpin bearings for the ALH28. These components are critical for holding the crankshaft in place and ensuring smooth rotational motion. Contact us for specific dimensions and availability.",
    "technicalSpecs": {
      "Engine Brand": "Akasaka",
      "Component": "Main & Crankpin Bearing"
    }
  },
  {
    "id": 51,
    "title": "EMD 8136114 Bearings",
    "category": "bearing",
    "description": "Main bearings with part number 8136114 for EMD 710-powered locomotives.",
    "icon": "",
    "image": "/image/products/bearings/img-emd-bearing-shell-8136114-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Part Number: 8136114", "Brand Compatibility: EMD", "Application: Locomotive diesel engines"],
    "applications": ["EMD 710 series engines", "Locomotive modernization (ECO upgrades)"],
    "brands": ["Spares Union (compatible with EMD)"],
    "detailedDescription": "In a piston engine, main bearings hold the crankshaft and allow it to rotate. As a factory with many years of casting experience, we supply a large amount of EMD 8136114 Bearings for EMD brand locomotive diesel engines for maintenance needs. We also provide other accessories like pistons and cylinder heads. Welcome to call for advisory.",
    "technicalSpecs": {
      "Engine Brand": "EMD",
      "Part Number": "8136114",
      "Component": "Main Bearing"
    }
  },
  {
    "id": 52,
    "title": "SKL D49 Main Bearings",
    "category": "bearing",
    "description": "Bi-metal main bearings for SKL D49 locomotive diesel engines.",
    "icon": "",
    "image": "/image/products/bearings/img-d49-main-bearing-shell-0.jpg",
    "gradient": "from-transparent to-transparent",
    "specifications": ["Model: D49", "Brand Compatibility: SKL", "Type: Bi-Metal Main Bearing"],
    "applications": ["SKL D49 locomotive engines", "Diesel engine maintenance"],
    "brands": ["Spares Union (compatible with SKL)"],
    "detailedDescription": "Bearings are constructed from a steel backing and internal layers of metal. Bi-Metal bearings generally have an aluminum alloy bonded to the steel backing. As a factory with years of experience, we supply a large amount of D49 Main Bearings for D49 brand locomotive diesel engines for maintenance needs. We also provide other accessories like pistons and piston rings. Welcome to call for advisory.",
    "technicalSpecs": {
      "Engine Brand": "SKL",
      "Engine Model": "D49",
      "Component": "Main Bearing"
    }
  }
]
