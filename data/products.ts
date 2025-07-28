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
  { id: "hydraulic", name: "Hydraulic Systems", icon: "fas fa-tint" },
  { id: "electrical", name: "Electrical Control", icon: "fas fa-bolt" },
  { id: "mechanical", name: "Mechanical Drive", icon: "fas fa-cog" },
  { id: "sealing", name: "Sealing & Lubrication", icon: "fas fa-shield-alt" },
  { id: "instrumentation", name: "Instrumentation", icon: "fas fa-gauge-high" },
  { id: "safety", name: "Safety & Protection", icon: "fas fa-hard-hat" },
]

export const products: Product[] = [
  {
    id: 1,
    title: "Hydraulic Pumps",
    category: "hydraulic",
    description: "High-performance hydraulic pumps for industrial applications",
    icon: "fas fa-tint",
    image: "/placeholder.svg?height=300&width=400&text=Hydraulic+Pumps",
    gradient: "from-blue-500 to-blue-600",
    specifications: ["Pressure: 10-700 bar", "Flow: 5-500 L/min", "Temperature: -40°C to +120°C"],
    applications: ["Construction machinery", "Industrial equipment", "Marine systems"],
    brands: ["Bosch Rexroth", "Parker", "Eaton", "Danfoss"],
    detailedDescription:
      "Our hydraulic pumps are designed for demanding industrial applications, offering exceptional reliability and performance. These pumps feature advanced engineering and are manufactured to the highest quality standards.",
    technicalSpecs: {
      "Operating Pressure": "10-700 bar",
      "Flow Rate": "5-500 L/min",
      "Operating Temperature": "-40°C to +120°C",
      Efficiency: "Up to 95%",
      "Noise Level": "< 65 dB(A)",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Hydraulic+Pump+1",
      "/placeholder.svg?height=300&width=400&text=Hydraulic+Pump+2",
      "/placeholder.svg?height=300&width=400&text=Hydraulic+Pump+3",
    ],
  },
  {
    id: 2,
    title: "Hydraulic Valves",
    category: "hydraulic",
    description: "Precision hydraulic control valves and directional valves",
    icon: "fas fa-tint",
    image: "/placeholder.svg?height=300&width=400&text=Hydraulic+Valves",
    gradient: "from-blue-500 to-blue-600",
    specifications: ["Pressure: 10-350 bar", "Various port sizes", "Manual/Electric operation"],
    applications: ["Mobile hydraulics", "Industrial machinery", "Process control"],
    brands: ["Bosch Rexroth", "Parker", "Hydac", "Sun Hydraulics"],
    detailedDescription:
      "High-precision hydraulic valves designed for accurate flow control and directional control in hydraulic systems. Available in various configurations to meet specific application requirements.",
    technicalSpecs: {
      "Operating Pressure": "10-350 bar",
      "Port Sizes": '1/4" to 2"',
      "Response Time": "< 50ms",
      "Leakage Rate": "< 0.1 ml/min",
      "Cycle Life": "> 10 million cycles",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Hydraulic+Valve+1",
      "/placeholder.svg?height=300&width=400&text=Hydraulic+Valve+2",
      "/placeholder.svg?height=300&width=400&text=Hydraulic+Valve+3",
    ],
  },
  {
    id: 3,
    title: "PLC Modules",
    category: "electrical",
    description: "Programmable Logic Controller modules and I/O systems",
    icon: "fas fa-bolt",
    image: "/placeholder.svg?height=300&width=400&text=PLC+Modules",
    gradient: "from-purple-500 to-purple-600",
    specifications: ["Voltage: 24V DC", "Digital/Analog I/O", "Communication protocols"],
    applications: ["Factory automation", "Process control", "Building management"],
    brands: ["Siemens", "Allen-Bradley", "Schneider", "Omron"],
    detailedDescription:
      "Advanced PLC modules for industrial automation applications. These modules provide reliable control and monitoring capabilities with extensive I/O options and communication protocols.",
    technicalSpecs: {
      "Supply Voltage": "24V DC ±10%",
      "Digital Inputs": "8-32 channels",
      "Analog Inputs": "4-16 channels",
      Communication: "Ethernet, Profibus, Modbus",
      "Processing Speed": "< 1ms per instruction",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=PLC+Module+1",
      "/placeholder.svg?height=300&width=400&text=PLC+Module+2",
      "/placeholder.svg?height=300&width=400&text=PLC+Module+3",
    ],
  },
  {
    id: 4,
    title: "Servo Motors",
    category: "electrical",
    description: "High-precision servo motors and drive systems",
    icon: "fas fa-bolt",
    image: "/placeholder.svg?height=300&width=400&text=Servo+Motors",
    gradient: "from-purple-500 to-purple-600",
    specifications: ["Power: 0.1-50kW", "Speed: up to 6000 RPM", "High accuracy positioning"],
    applications: ["CNC machines", "Robotics", "Packaging equipment"],
    brands: ["Siemens", "Mitsubishi", "Yaskawa", "Delta"],
    detailedDescription:
      "High-performance servo motors with exceptional precision and reliability. Ideal for applications requiring accurate positioning and speed control.",
    technicalSpecs: {
      "Power Range": "0.1-50kW",
      "Speed Range": "0-6000 RPM",
      "Position Accuracy": "±0.01°",
      "Torque Ripple": "< 3%",
      "Encoder Resolution": "Up to 23-bit",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Servo+Motor+1",
      "/placeholder.svg?height=300&width=400&text=Servo+Motor+2",
      "/placeholder.svg?height=300&width=400&text=Servo+Motor+3",
    ],
  },
  {
    id: 5,
    title: "Industrial Bearings",
    category: "mechanical",
    description: "High-quality ball bearings, roller bearings, and specialty bearings",
    icon: "fas fa-cog",
    image: "/placeholder.svg?height=300&width=400&text=Industrial+Bearings",
    gradient: "from-green-500 to-green-600",
    specifications: ["Load capacity: 1kN-500kN", "Speed: up to 50,000 RPM", "Various materials"],
    applications: ["Motors", "Gearboxes", "Conveyor systems"],
    brands: ["SKF", "FAG", "Timken", "NSK"],
    detailedDescription:
      "Premium industrial bearings engineered for long service life and reliable operation in demanding applications. Available in various types and materials.",
    technicalSpecs: {
      "Load Capacity": "1kN-500kN",
      "Speed Rating": "Up to 50,000 RPM",
      "Temperature Range": "-40°C to +200°C",
      "Precision Grade": "P0 to P4",
      "Service Life": "L10 > 20,000 hours",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Industrial+Bearing+1",
      "/placeholder.svg?height=300&width=400&text=Industrial+Bearing+2",
      "/placeholder.svg?height=300&width=400&text=Industrial+Bearing+3",
    ],
  },
  {
    id: 6,
    title: "Gear Reducers",
    category: "mechanical",
    description: "Precision gear reducers and gearboxes for power transmission",
    icon: "fas fa-cog",
    image: "/placeholder.svg?height=300&width=400&text=Gear+Reducers",
    gradient: "from-green-500 to-green-600",
    specifications: ["Ratio: 5:1 to 10000:1", "Torque: 10-50000 Nm", "High efficiency"],
    applications: ["Conveyors", "Mixers", "Cranes"],
    brands: ["SEW", "Nord", "Bonfiglioli", "Flender"],
    detailedDescription:
      "High-efficiency gear reducers designed for reliable power transmission in industrial applications. Available in various configurations and ratios.",
    technicalSpecs: {
      "Gear Ratio": "5:1 to 10000:1",
      "Output Torque": "10-50000 Nm",
      Efficiency: "Up to 98%",
      Backlash: "< 3 arcmin",
      "Service Factor": "1.5-2.0",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Gear+Reducer+1",
      "/placeholder.svg?height=300&width=400&text=Gear+Reducer+2",
      "/placeholder.svg?height=300&width=400&text=Gear+Reducer+3",
    ],
  },
  {
    id: 7,
    title: "O-Ring Seals",
    category: "sealing",
    description: "High-quality O-rings and sealing solutions",
    icon: "fas fa-shield-alt",
    image: "/placeholder.svg?height=300&width=400&text=O-Ring+Seals",
    gradient: "from-orange-500 to-orange-600",
    specifications: ["Temperature: -60°C to +200°C", "Various elastomer materials", "Custom sizes"],
    applications: ["Hydraulic systems", "Pneumatic systems", "Rotating equipment"],
    brands: ["Trelleborg", "Parker", "NOK", "Freudenberg"],
    detailedDescription:
      "Premium O-ring seals manufactured from high-quality elastomer materials. Designed to provide reliable sealing in various industrial applications.",
    technicalSpecs: {
      "Temperature Range": "-60°C to +200°C",
      "Pressure Rating": "Up to 400 bar",
      Materials: "NBR, FKM, EPDM, Silicone",
      "Shore Hardness": "70-90 Shore A",
      "Compression Set": "< 25%",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=O-Ring+Seal+1",
      "/placeholder.svg?height=300&width=400&text=O-Ring+Seal+2",
      "/placeholder.svg?height=300&width=400&text=O-Ring+Seal+3",
    ],
  },
  {
    id: 8,
    title: "Industrial Lubricants",
    category: "sealing",
    description: "Premium industrial lubricants and greases",
    icon: "fas fa-shield-alt",
    image: "/placeholder.svg?height=300&width=400&text=Industrial+Lubricants",
    gradient: "from-orange-500 to-orange-600",
    specifications: ["Various viscosity grades", "High temperature resistance", "Long service life"],
    applications: ["Bearings", "Gears", "Hydraulic systems"],
    brands: ["Shell", "Mobil", "Castrol", "Total"],
    detailedDescription:
      "High-performance industrial lubricants formulated for demanding applications. Provide excellent protection and extended equipment life.",
    technicalSpecs: {
      "Viscosity Index": "> 100",
      "Operating Temperature": "-40°C to +200°C",
      "Pour Point": "< -30°C",
      "Flash Point": "> 200°C",
      "Service Life": "Up to 8000 hours",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Industrial+Lubricant+1",
      "/placeholder.svg?height=300&width=400&text=Industrial+Lubricant+2",
      "/placeholder.svg?height=300&width=400&text=Industrial+Lubricant+3",
    ],
  },
  {
    id: 9,
    title: "Pressure Transmitters",
    category: "instrumentation",
    description: "High-accuracy pressure measurement instruments",
    icon: "fas fa-gauge-high",
    image: "/placeholder.svg?height=300&width=400&text=Pressure+Transmitters",
    gradient: "from-red-500 to-red-600",
    specifications: ["Accuracy: ±0.1%", "Range: 0-1000 bar", "4-20mA output"],
    applications: ["Process monitoring", "Quality control", "Safety systems"],
    brands: ["Endress+Hauser", "Rosemount", "WIKA", "Yokogawa"],
    detailedDescription:
      "Precision pressure transmitters for accurate measurement and monitoring in industrial processes. Features advanced sensor technology and robust construction.",
    technicalSpecs: {
      Accuracy: "±0.1% of span",
      "Pressure Range": "0-1000 bar",
      "Output Signal": "4-20mA, HART",
      "Response Time": "< 100ms",
      "Long-term Stability": "±0.1% per year",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Pressure+Transmitter+1",
      "/placeholder.svg?height=300&width=400&text=Pressure+Transmitter+2",
      "/placeholder.svg?height=300&width=400&text=Pressure+Transmitter+3",
    ],
  },
  {
    id: 10,
    title: "Flow Meters",
    category: "instrumentation",
    description: "Precision flow measurement devices for various media",
    icon: "fas fa-gauge-high",
    image: "/placeholder.svg?height=300&width=400&text=Flow+Meters",
    gradient: "from-red-500 to-red-600",
    specifications: ["Various technologies", "High accuracy", "Digital communication"],
    applications: ["Process control", "Custody transfer", "Environmental monitoring"],
    brands: ["Endress+Hauser", "Krohne", "ABB", "Siemens"],
    detailedDescription:
      "Advanced flow measurement instruments utilizing various technologies for accurate flow measurement in diverse applications and media types.",
    technicalSpecs: {
      Accuracy: "±0.2% of reading",
      "Flow Range": "0.1-10000 m³/h",
      "Process Temperature": "-200°C to +400°C",
      "Process Pressure": "Up to 400 bar",
      Communication: "HART, Profibus, Foundation Fieldbus",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Flow+Meter+1",
      "/placeholder.svg?height=300&width=400&text=Flow+Meter+2",
      "/placeholder.svg?height=300&width=400&text=Flow+Meter+3",
    ],
  },
  {
    id: 11,
    title: "Safety Valves",
    category: "safety",
    description: "Pressure relief and safety valve systems",
    icon: "fas fa-hard-hat",
    image: "/placeholder.svg?height=300&width=400&text=Safety+Valves",
    gradient: "from-cyan-500 to-cyan-600",
    specifications: ["ASME/API certified", "Various materials", "Custom settings"],
    applications: ["Pressure vessels", "Steam systems", "Chemical processes"],
    brands: ["Emerson", "Leser", "Crosby", "Spirax Sarco"],
    detailedDescription:
      "Certified safety and pressure relief valves designed to protect equipment and personnel from overpressure conditions. Manufactured to international standards.",
    technicalSpecs: {
      "Set Pressure": "0.5-400 bar",
      Capacity: "Up to 500 t/h steam",
      Materials: "Carbon steel, Stainless steel, Inconel",
      Certification: "ASME, API, CE, PED",
      "Seat Tightness": "API 527 Class IV-VI",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Safety+Valve+1",
      "/placeholder.svg?height=300&width=400&text=Safety+Valve+2",
      "/placeholder.svg?height=300&width=400&text=Safety+Valve+3",
    ],
  },
  {
    id: 12,
    title: "Explosion-Proof Equipment",
    category: "safety",
    description: "ATEX certified explosion-proof electrical equipment",
    icon: "fas fa-hard-hat",
    image: "/placeholder.svg?height=300&width=400&text=Explosion-Proof+Equipment",
    gradient: "from-cyan-500 to-cyan-600",
    specifications: ["ATEX certified", "Various protection methods", "Zone 1 & 2 applications"],
    applications: ["Hazardous areas", "Chemical plants", "Oil & gas"],
    brands: ["R.Stahl", "Pepperl+Fuchs", "Eaton", "ABB"],
    detailedDescription:
      "ATEX certified explosion-proof electrical equipment for use in hazardous areas. Designed to prevent ignition of explosive atmospheres.",
    technicalSpecs: {
      "Protection Type": "Ex d, Ex e, Ex i, Ex n",
      "Temperature Class": "T1-T6",
      "Zone Classification": "Zone 1, Zone 2",
      "Ingress Protection": "IP65-IP68",
      "Ambient Temperature": "-60°C to +60°C",
    },
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Explosion-Proof+1",
      "/placeholder.svg?height=300&width=400&text=Explosion-Proof+2",
      "/placeholder.svg?height=300&width=400&text=Explosion-Proof+3",
    ],
  },
]
