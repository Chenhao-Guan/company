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
      id: 1, // Since this is the only news item, its ID is set to 1.
      title: "Union Spares Achieves Milestone in EMD645 Cylinder Head Manufacturing",
      excerpt: "Leveraging advanced manufacturing techniques, Xiamen Union Spares Ltd. has successfully developed and launched mass production of the high-alloy cast iron cylinder head for the EMD645 diesel engine.",
      date: "2020-05-18",
      category: "products",
      categoryName: "Product Updates",
      image: "/image/news/news-2020-05-18-01.jpg",
      gradient: "from-transparent to-transparent",
      readTime: "4 min read",
      author: "Engineering Team",
      featured: true, // As the only item, it should be featured.
      tags: ["EMD645", "Cylinder Head", "Diesel Engine", "Precision Manufacturing"],
      gallery: [
        "/image/news/news-2020-05-18-04.jpg",
        "/image/news/news-2020-05-18-05.jpg",
      ],
      contentImages: [
        {
          url: "/image/news/news-2020-05-18-02.jpg",
          caption: "All critical dimensions are processed by CNC machine tools for consistency.",
          position: "right",
        },
        {
          url: "/image/news/news-2020-05-18-03.jpgg",
          caption: "Pressure testing is conducted under simulated operating conditions.",
          position: "left",
        },
      ],
      content: `
        <div class="prose max-w-none">
          <p>The EMD645 series diesel engine, a turbocharged two-stroke engine developed by EMD under General Motors, is a cornerstone in ship propulsion, power generation, and railway traction. It stands as one of the most inventoried diesel engines in the world today.</p>
          
          <p>A critical component of this engine is the cylinder head, which is manufactured from high-alloy cast iron and features a compact and complex internal structure. Xiamen Union Spares Ltd. is proud to announce the successful development and mass production of this component, meticulously engineered from original drawings to meet all specifications.</p>
          
          <h3>Technical Highlights & Production Process</h3>
          <p>Our commitment to quality is reflected in our advanced production process, which incorporates several key technologies:</p>

          <ol>
            <li><strong>3D Modeling Technique:</strong> During the development phase, we utilized 3D modeling to significantly improve the precision of casting blanks. This results in a wall thickness deviation of less than 1mm on all fine-machined parts.</li>
            <li><strong>Advanced Casting Process:</strong> We use a coated-sand process for the sand cores. This ensures the cylinder head's internal water chamber and airways are exceptionally clean and smooth, with no slag deposits.</li>
            <li><strong>CNC Machining:</strong> To guarantee consistency and precision, all critical dimensions of the cylinder head are processed using state-of-the-art CNC machine tools.</li>
            <li><strong>Rigorous Hydraulic Testing:</strong> Each cylinder head undergoes a stringent hydraulic pressure test under simulated operating conditions: <strong>1.2MPa of pressure in 80°C water</strong>. This ensures maximum reliability and durability in the field.</li>
          </ol>

          <p>With mass production already underway, Xiamen Union Spares Ltd. is positioned to supply global markets with a high-quality, reliable EMD645 cylinder head that meets the exacting standards of the original equipment manufacturer.</p>
        </div>
      `,
  },
  {
      id: 2,
      title: "Successful Production Development of New Camshaft Models",
      excerpt: "Based on client drawings and samples, we have successfully developed and completed the first production batch of several new camshaft models under the guidance of our engineering team.",
      date: "2020-03-23",
      category: "products",
      categoryName: "Product Updates",
      image: "/image/news/2020-03-23-01.jpg",
      gradient: "from-transparent to-transparent",
      readTime: "2 min read",
      author: "Production Department",
      featured: false,
      tags: ["Camshaft", "Custom Manufacturing", "Product Development"],
      gallery: [
        "/image/news/2020-03-23-02.jpg",
        "/image/news/2020-03-23-03.jpg",
        "/image/news/2020-03-23-04.jpg",
      ],
      contentImages: [],
      content: `
        <div class="prose max-w-none">
          <p>We are pleased to announce the successful production development for several new types of camshafts. This achievement highlights our capability in custom manufacturing based on specific client requirements.</p>
          <p>The entire development and production process was based on detailed drawings and physical samples provided by our client, with every stage closely guided by our experienced engineering team to ensure precision and quality.</p>
          <p>The first production batch has now been completed, passed all quality assurance checks, and is being prepared for shipment to our client. We look forward to continuing to support our partners with high-quality, custom-engineered components.</p>
        </div>
      `,
  },
]
