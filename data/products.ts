export interface Product {
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
  }
]
