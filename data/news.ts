export interface NewsItem {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  categoryName: string
  image: string
  gradient: string
  readTime: string
  author: string
  content: string
  tags?: string[]
  featured?: boolean
  gallery?: string[]
  contentImages?: {
    url: string
    caption: string
    position: "left" | "right" | "center" | "full"
  }[]
}

export const newsCategories = [
  { id: "all", name: "All News", icon: "fas fa-newspaper" },
  { id: "company", name: "Company News", icon: "fas fa-building" },
  { id: "products", name: "Product Updates", icon: "fas fa-box" },
  { id: "technology", name: "Technology", icon: "fas fa-microchip" },
  { id: "industry", name: "Industry News", icon: "fas fa-industry" },
  { id: "announcements", name: "Announcements", icon: "fas fa-bullhorn" },
]

export const news: NewsItem[] = [
  {
    id: 1,
    title: 'Company Awarded "Excellent Supplier" Title',
    excerpt:
      "In the 2024 annual industry selection, our company won unanimous recognition from customers with high-quality products and services...",
    date: "2024-01-15",
    category: "company",
    categoryName: "Company News",
    image: "/placeholder.svg?height=400&width=600&text=Award+Ceremony",
    gradient: "from-blue-500 to-blue-600",
    readTime: "3 min read",
    author: "Marketing Team",
    featured: true,
    tags: ["Award", "Recognition", "Excellence"],
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Award+Ceremony+1",
      "/placeholder.svg?height=300&width=400&text=Award+Ceremony+2",
      "/placeholder.svg?height=300&width=400&text=Team+Photo",
    ],
    contentImages: [
      {
        url: "/placeholder.svg?height=250&width=400&text=Award+Certificate",
        caption: "The prestigious 'Excellent Supplier' award certificate",
        position: "right",
      },
      {
        url: "/placeholder.svg?height=200&width=600&text=Conference+Hall",
        caption: "Industrial Equipment Suppliers Conference in Shanghai",
        position: "full",
      },
    ],
    content: `
      <div class="prose max-w-none">
        <p>We are proud to announce that Xiamen Union Spares Ltd. has been awarded the prestigious "Excellent Supplier" title in the 2024 annual industry evaluation.</p>
        
        <p>This recognition comes as a result of our unwavering commitment to providing high-quality industrial spare parts and exceptional customer service to our global clientele.</p>
        
        <h3>Award Ceremony Highlights</h3>
        <p>The award was presented at the Industrial Equipment Suppliers Conference held in Shanghai, where industry leaders gathered to recognize outstanding contributions to the sector.</p>
        
        <p>Our CEO expressed gratitude to all team members and customers who have supported our journey towards excellence:</p>
        
        <blockquote>
          <p>"This award is a testament to our team's dedication and our customers' trust. We will continue to strive for excellence in everything we do."</p>
        </blockquote>
        
        <h3>What This Means for Our Customers</h3>
        <p>This achievement reinforces our position as a leading supplier in the industrial spare parts market and motivates us to continue delivering exceptional value to our customers.</p>
        
        <ul>
          <li>Enhanced quality assurance processes</li>
          <li>Expanded product portfolio</li>
          <li>Improved customer service standards</li>
          <li>Faster delivery times</li>
        </ul>
        
        <h3>Looking Forward</h3>
        <p>As we celebrate this achievement, we remain focused on our mission to provide the highest quality industrial spare parts and services to our customers worldwide. This award motivates us to continue innovating and improving our offerings.</p>
      </div>
    `,
  },
  {
    id: 2,
    title: "New German Imported Hydraulic Parts Product Line",
    excerpt:
      "To meet customer demand for high-end hydraulic equipment spare parts, the company has introduced new products from well-known German brands...",
    date: "2024-01-10",
    category: "products",
    categoryName: "Product Updates",
    image: "/placeholder.svg?height=400&width=600&text=German+Hydraulic+Parts",
    gradient: "from-green-500 to-green-600",
    readTime: "4 min read",
    author: "Product Team",
    featured: true,
    tags: ["Products", "German Engineering", "Hydraulics"],
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Hydraulic+Pump",
      "/placeholder.svg?height=300&width=400&text=Hydraulic+Valve",
      "/placeholder.svg?height=300&width=400&text=Control+System",
    ],
    contentImages: [
      {
        url: "/placeholder.svg?height=250&width=400&text=Bosch+Rexroth+Products",
        caption: "Premium Bosch Rexroth hydraulic components",
        position: "left",
      },
      {
        url: "/placeholder.svg?height=200&width=600&text=German+Manufacturing",
        caption: "German precision manufacturing facility",
        position: "full",
      },
      {
        url: "/placeholder.svg?height=250&width=400&text=Quality+Testing",
        caption: "Rigorous quality testing procedures",
        position: "right",
      },
    ],
    content: `
      <div class="prose max-w-none">
        <p>We are excited to announce the expansion of our product portfolio with the addition of premium German hydraulic components.</p>
        
        <h3>New Product Range</h3>
        <p>This new product line includes high-precision hydraulic pumps, valves, and control systems from leading German manufacturers such as Bosch Rexroth and Hydac.</p>
        
        <h3>Technical Excellence</h3>
        <p>The new products meet the highest European standards and are designed for demanding industrial applications including:</p>
        <ul>
          <li>Construction machinery</li>
          <li>Marine systems</li>
          <li>Industrial automation</li>
          <li>Mobile hydraulics</li>
        </ul>
        
        <h3>Quality Assurance</h3>
        <p>Every component undergoes rigorous testing to ensure it meets our strict quality standards. Our German partners have decades of experience in precision engineering and manufacturing.</p>
        
        <h3>Expert Support</h3>
        <p>Our technical team has undergone specialized training to provide expert support for these advanced hydraulic systems, ensuring our customers receive the best possible service.</p>
        
        <p>These additions strengthen our position as a comprehensive supplier of industrial hydraulic solutions and demonstrate our commitment to offering only the highest quality products to our customers.</p>
      </div>
    `,
  },
  {
    id: 3,
    title: "Smart Warehouse System Officially Online",
    excerpt:
      "The company's investment in building an intelligent warehouse management system has been officially put into use, greatly improving inventory management efficiency...",
    date: "2024-01-05",
    category: "technology",
    categoryName: "Technology Innovation",
    image: "/placeholder.svg?height=400&width=600&text=Smart+Warehouse",
    gradient: "from-purple-500 to-purple-600",
    readTime: "5 min read",
    author: "IT Department",
    tags: ["Technology", "Automation", "Efficiency"],
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Automated+Storage",
      "/placeholder.svg?height=300&width=400&text=RFID+System",
      "/placeholder.svg?height=300&width=400&text=Control+Center",
    ],
    contentImages: [
      {
        url: "/placeholder.svg?height=250&width=400&text=RFID+Tracking",
        caption: "RFID-based inventory tracking system",
        position: "right",
      },
      {
        url: "/placeholder.svg?height=200&width=600&text=Warehouse+Overview",
        caption: "Overview of our new smart warehouse facility",
        position: "full",
      },
      {
        url: "/placeholder.svg?height=250&width=400&text=Automated+Picking",
        caption: "Automated picking and packing systems",
        position: "left",
      },
    ],
    content: `
      <div class="prose max-w-none">
        <p>Our state-of-the-art smart warehouse management system has gone live, revolutionizing our inventory management capabilities.</p>
        
        <h3>System Features</h3>
        <p>The system features automated sorting, real-time inventory tracking, and predictive analytics for optimal stock management.</p>
        
        <h3>Key Technologies</h3>
        <ul>
          <li><strong>RFID-based inventory tracking</strong> - Real-time location and status monitoring</li>
          <li><strong>Automated picking and packing systems</strong> - Reduced human error and increased speed</li>
          <li><strong>Real-time stock level monitoring</strong> - Prevent stockouts and overstock situations</li>
          <li><strong>Predictive maintenance scheduling</strong> - Minimize equipment downtime</li>
        </ul>
        
        <h3>Performance Improvements</h3>
        <p>This investment demonstrates our commitment to leveraging technology to improve customer service and operational efficiency:</p>
        
        <div class="bg-gray-100 p-4 rounded-lg">
          <ul>
            <li>Order processing time reduced by <strong>60%</strong></li>
            <li>Inventory accuracy improved to <strong>99.8%</strong></li>
            <li>Picking errors reduced by <strong>85%</strong></li>
            <li>Customer satisfaction increased by <strong>25%</strong></li>
          </ul>
        </div>
        
        <h3>Future Expansion</h3>
        <p>We plan to implement similar systems in our regional distribution centers, further improving our global service capabilities.</p>
      </div>
    `,
  },
  {
    id: 4,
    title: "Partnership with Leading European Manufacturers",
    excerpt:
      "We have established strategic partnerships with several leading European manufacturers to expand our product offerings...",
    date: "2024-01-01",
    category: "company",
    categoryName: "Company News",
    image: "/placeholder.svg?height=400&width=600&text=European+Partnership",
    gradient: "from-red-500 to-red-600",
    readTime: "3 min read",
    author: "Business Development",
    tags: ["Partnership", "Europe", "Expansion"],
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Partnership+Signing",
      "/placeholder.svg?height=300&width=400&text=European+Factory",
      "/placeholder.svg?height=300&width=400&text=Product+Showcase",
    ],
    contentImages: [
      {
        url: "/placeholder.svg?height=250&width=400&text=Partnership+Agreement",
        caption: "Strategic partnership agreement signing ceremony",
        position: "left",
      },
      {
        url: "/placeholder.svg?height=200&width=600&text=European+Map",
        caption: "Our new European partner network",
        position: "full",
      },
    ],
    content: `
      <div class="prose max-w-none">
        <p>We are pleased to announce new strategic partnerships with leading European manufacturers in the industrial automation sector.</p>
        
        <h3>Partnership Benefits</h3>
        <p>These partnerships will enable us to offer an even broader range of high-quality products to our customers, including:</p>
        <ul>
          <li>Advanced servo systems</li>
          <li>Precision sensors</li>
          <li>Industrial communication equipment</li>
          <li>Safety and control systems</li>
        </ul>
        
        <h3>Our New Partners</h3>
        <p>Our new partners include renowned companies from Germany, Italy, and Switzerland, each bringing decades of expertise in their respective fields:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-800">German Partners</h4>
            <p class="text-sm">Precision engineering and automation solutions</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold text-green-800">Italian Partners</h4>
            <p class="text-sm">Innovative design and manufacturing excellence</p>
          </div>
          <div class="bg-red-50 p-4 rounded-lg">
            <h4 class="font-semibold text-red-800">Swiss Partners</h4>
            <p class="text-sm">High-precision instruments and quality systems</p>
          </div>
        </div>
        
        <p>These collaborations will enhance our ability to provide comprehensive solutions for complex industrial applications and further strengthen our position in the global market.</p>
      </div>
    `,
  },
  {
    id: 5,
    title: "Industry 4.0 Solutions Now Available",
    excerpt: "Introducing our new range of Industry 4.0 compatible products and solutions for smart manufacturing...",
    date: "2023-12-28",
    category: "technology",
    categoryName: "Technology Innovation",
    image: "/placeholder.svg?height=400&width=600&text=Industry+4.0",
    gradient: "from-cyan-500 to-cyan-600",
    readTime: "6 min read",
    author: "Technical Team",
    tags: ["Industry 4.0", "IoT", "Smart Manufacturing"],
    gallery: [
      "/placeholder.svg?height=300&width=400&text=IoT+Sensors",
      "/placeholder.svg?height=300&width=400&text=Smart+Factory",
      "/placeholder.svg?height=300&width=400&text=Data+Analytics",
    ],
    contentImages: [
      {
        url: "/placeholder.svg?height=250&width=400&text=IoT+Dashboard",
        caption: "Real-time IoT monitoring dashboard",
        position: "right",
      },
      {
        url: "/placeholder.svg?height=200&width=600&text=Smart+Manufacturing",
        caption: "Industry 4.0 smart manufacturing environment",
        position: "full",
      },
      {
        url: "/placeholder.svg?height=250&width=400&text=Predictive+Analytics",
        caption: "AI-powered predictive analytics system",
        position: "left",
      },
    ],
    content: `
      <div class="prose max-w-none">
        <p>We are excited to introduce our comprehensive range of Industry 4.0 compatible products and solutions designed for smart manufacturing environments.</p>
        
        <h3>Industry 4.0 Portfolio</h3>
        <p>Our Industry 4.0 portfolio includes cutting-edge technologies that enable manufacturers to achieve digital transformation:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div class="border border-gray-200 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-600 mb-2">IoT-enabled sensors and monitoring devices</h4>
            <p class="text-sm">Real-time data collection and analysis for predictive maintenance and optimization</p>
          </div>
          <div class="border border-gray-200 p-4 rounded-lg">
            <h4 class="font-semibold text-green-600 mb-2">Smart actuators with built-in diagnostics</h4>
            <p class="text-sm">Self-monitoring systems that provide health status and performance metrics</p>
          </div>
          <div class="border border-gray-200 p-4 rounded-lg">
            <h4 class="font-semibold text-purple-600 mb-2">Cloud-connected control systems</h4>
            <p class="text-sm">Remote monitoring and control capabilities with secure cloud connectivity</p>
          </div>
          <div class="border border-gray-200 p-4 rounded-lg">
            <h4 class="font-semibold text-orange-600 mb-2">Predictive maintenance solutions</h4>
            <p class="text-sm">AI-powered analytics to predict equipment failures before they occur</p>
          </div>
        </div>
        
        <h3>Benefits for Manufacturers</h3>
        <p>These solutions enable manufacturers to achieve:</p>
        <ul>
          <li><strong>Higher efficiency</strong> through optimized processes</li>
          <li><strong>Reduced downtime</strong> with predictive maintenance</li>
          <li><strong>Better quality control</strong> through real-time monitoring</li>
          <li><strong>Data-driven insights</strong> for continuous improvement</li>
        </ul>
        
        <h3>Implementation Support</h3>
        <p>Our technical team is available to help customers integrate these advanced technologies into their existing systems, ensuring a smooth transition to Industry 4.0 manufacturing.</p>
      </div>
    `,
  },
  {
    id: 6,
    title: "Global Supply Chain Expansion",
    excerpt:
      "We have expanded our global supply chain network to better serve customers worldwide with faster delivery times...",
    date: "2023-12-20",
    category: "company",
    categoryName: "Company News",
    image: "/placeholder.svg?height=400&width=600&text=Global+Supply+Chain",
    gradient: "from-orange-500 to-orange-600",
    readTime: "4 min read",
    author: "Operations Team",
    tags: ["Global Expansion", "Supply Chain", "Logistics"],
    gallery: [
      "/placeholder.svg?height=300&width=400&text=Singapore+Hub",
      "/placeholder.svg?height=300&width=400&text=Netherlands+Facility",
      "/placeholder.svg?height=300&width=400&text=US+Warehouse",
    ],
    contentImages: [
      {
        url: "/placeholder.svg?height=250&width=400&text=Global+Network",
        caption: "Our expanded global distribution network",
        position: "right",
      },
      {
        url: "/placeholder.svg?height=200&width=600&text=Logistics+Center",
        caption: "Modern logistics and distribution center",
        position: "full",
      },
    ],
    content: `
      <div class="prose max-w-none">
        <p>We have significantly expanded our global supply chain network to provide better service to our international customers.</p>
        
        <h3>New Distribution Centers</h3>
        <p>New distribution centers have been established in key regions including:</p>
        <ul>
          <li><strong>Southeast Asia</strong> - Singapore hub serving ASEAN markets</li>
          <li><strong>Europe</strong> - Netherlands facility for EU distribution</li>
          <li><strong>North America</strong> - US warehouse for Americas coverage</li>
        </ul>
        
        <h3>Enhanced Service Capabilities</h3>
        <p>This expansion enables us to provide:</p>
        
        <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg my-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-semibold text-blue-800 mb-2">🚀 Faster Delivery</h4>
              <p class="text-sm">Delivery times reduced by up to 50% in key markets</p>
            </div>
            <div>
              <h4 class="font-semibold text-green-800 mb-2">🔧 Local Support</h4>
              <p class="text-sm">Technical support teams in each region</p>
            </div>
            <div>
              <h4 class="font-semibold text-purple-800 mb-2">📦 Larger Inventory</h4>
              <p class="text-sm">Increased stock levels in strategic locations</p>
            </div>
            <div>
              <h4 class="font-semibold text-orange-800 mb-2">💰 Better Pricing</h4>
              <p class="text-sm">Competitive pricing through optimized logistics</p>
            </div>
          </div>
        </div>
        
        <h3>Customer Impact</h3>
        <p>Our customers can now expect:</p>
        <ul>
          <li>Faster response times for urgent orders</li>
          <li>Improved service quality regardless of location</li>
          <li>Local language support in key markets</li>
          <li>Reduced shipping costs and customs delays</li>
        </ul>
        
        <p>This investment in our global infrastructure demonstrates our commitment to serving our customers better and supporting their success worldwide.</p>
      </div>
    `,
  },
]
