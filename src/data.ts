import { Property, Agent, Testimonial, Blog, FAQItem } from "./types";

export const AGENTS: Agent[] = [
  {
    id: "agent-1",
    name: "Aakash Yadav",
    role: "Creative Director & Senior Partner",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
    phone: "+91 8340650759",
    email: "aakashyadav2024@gmail.com",
    rating: 4.98,
    listingsCount: 14,
    bio: "With over a decade of experience curating ultra-high-net-worth portfolios across Malibu, Dubai, and Mumbai, Aakash specializes in architecturally significant estates and raw modern minimalist pavilions."
  },
  {
    id: "agent-2",
    name: "Elena Rostova",
    role: "Elite Acquisition Specialist",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    phone: "+1 (310) 555-0199",
    email: "elena@auraestates.com",
    rating: 4.95,
    listingsCount: 9,
    bio: "Elena is renowned for her laser focus on European cliffside villas and off-market penthouses, ensuring absolute confidentiality and unparalleled structural verification."
  },
  {
    id: "agent-3",
    name: "Marcus Thorne",
    role: "Senior Commercial Partner",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
    phone: "+44 20 7946 0192",
    email: "marcus@auraestates.com",
    rating: 4.92,
    listingsCount: 11,
    bio: "Marcus consults on institutional luxury properties, corporate retreats, and bespoke architectural headquarters in global capitals like London, Singapore, and New York."
  }
];

export const PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "The Elysian Sanctuary",
    price: 320000000,
    formattedPrice: "₹32.00 Cr",
    address: "884 Belvedere Lane, Bel Air",
    city: "Los Angeles",
    category: "buy",
    type: "mansion",
    beds: 7,
    baths: 9,
    area: 16400,
    parking: 6,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    description: "Suspended dramatically above the Bel Air skyline, The Elysian Sanctuary is an architectural triumph of raw steel, heated travertine monoliths, and seamless structural glass. Curated over four years by award-winning biophilic designer Kengo Kuma, the property blends pure indoor serenity with a 150-foot cantilevered infinity pool that mirrors the Pacific Ocean. Key appointments include a private rooftop helipad, a subterranean wellness grotto with cold-plunge pools, a professional-grade 14-seat custom acoustic cinema, and a climate-controlled 100-bottle vintage wine vault.",
    yearBuilt: 2025,
    amenities: [
      "Cantilevered Infinity Pool",
      "Private Helipad",
      "Travertine Wellness Spa",
      "Climate Controlled Wine Vault",
      "14-Seat Custom Cinema",
      "Tesla Powerwall Backup",
      "Commercial Catering Kitchen",
      "Biophilic Landscaping",
      "Smart-Home Automation",
      "Subterranean Guard Suite"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=luxurymock",
    videoTourUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coordinates: { lat: 34.0837, lng: -118.4467 },
    nearby: [
      { name: "Harvard-Westlake Elite Academy", distance: "1.8 miles", type: "school" },
      { name: "Ronald Reagan UCLA Medical Center", distance: "3.2 miles", type: "hospital" },
      { name: "Beverly Hills Transit Center", distance: "4.5 miles", type: "metro" }
    ],
    agentId: "agent-1",
    floorPlanUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prop-2",
    title: "The Obsidian Pavilion",
    price: 184000000,
    formattedPrice: "₹18.40 Cr",
    address: "2441 Pacific Coast Highway, Malibu",
    city: "Malibu",
    category: "buy",
    type: "villa",
    beds: 5,
    baths: 6,
    area: 9800,
    parking: 4,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    description: "An absolute masterclass in architectural brutalism, The Obsidian Pavilion uses high-performance carbonaceous concrete and dark volcanic glass facades to command respect over Malibu's crashing waves. Designed for complete sensory isolation, every room features motorized floor-to-ceiling doors that vanish into the wall panels, offering an unbroken breeze from the ocean. Features include private private-cove access, an outdoor fire pit suspended over the water, a high-fidelity spatial audio garden, and deep geothermal cooling systems.",
    yearBuilt: 2024,
    amenities: [
      "Direct Beach Cove Access",
      "Dark Volcanic Glass Panels",
      "Geothermal Cooling & Heating",
      "Spatial Audio Garden",
      "Cantilevered Suspended Fire Pit",
      "Professional Chef's Galley",
      "Detached Oceanfront Guest Pavilion",
      "Japanese Zen Courtyard",
      "High-Security Vault Room"
    ],
    virtualTourUrl: "https://my.matterport.com/show/?m=obsidianmock",
    videoTourUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coordinates: { lat: 34.0259, lng: -118.7798 },
    nearby: [
      { name: "Malibu High School (Top Rated)", distance: "2.5 miles", type: "school" },
      { name: "Malibu Urgent Care Center", distance: "1.1 miles", type: "hospital" },
      { name: "Santa Monica Metro Terminal", distance: "12.0 miles", type: "metro" }
    ],
    agentId: "agent-1",
    floorPlanUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prop-3",
    title: "The Lumina Sky Duplex",
    price: 98000000,
    formattedPrice: "₹9.80 Cr",
    address: "730 Fifth Avenue, Upper East Side",
    city: "New York",
    category: "buy",
    type: "penthouse",
    beds: 3,
    baths: 4,
    area: 5200,
    parking: 2,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    description: "Hovering majestically above Central Park within one of New York's historic limestone towers, the Lumina Sky Duplex marries classical pre-war scale with structural modern minimalism. Featuring dynamic soaring 20-foot ceilings and triple-pane thermal glass framing a perfect view of the reservoir, the duplex is lined with hand-polished Calcutta Gold marble slabs. Includes private elevator vestibule entrance, smart home climate-zone tuning, and a private 1,200 sq.ft. sky terrace with heated stone flooring for year-round comfort.",
    yearBuilt: 2023,
    amenities: [
      "Central Park Views",
      "Limestone Duplex Construction",
      "Calcutta Gold Marble Slab Siding",
      "Heated Stone Sky Terrace",
      "Private High-Speed Elevator Access",
      "Bespoke Italian Kitchen Cabinetry",
      "24/7 Elite White-Glove Concierge",
      "Automated Mechanical Parking System"
    ],
    videoTourUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coordinates: { lat: 40.7614, lng: -73.9741 },
    nearby: [
      { name: "The Dalton Private Prep School", distance: "0.8 miles", type: "school" },
      { name: "Mount Sinai Premium Hospital", distance: "1.4 miles", type: "hospital" },
      { name: "5th Ave - 53rd St Subway Station", distance: "0.1 miles", type: "metro" }
    ],
    agentId: "agent-2",
    floorPlanUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prop-4",
    title: "The Azure Cliff Oasis",
    price: 450000000,
    formattedPrice: "₹45.00 Cr",
    address: "7 Avenue Princesse Grace, Larvotto",
    city: "Monaco",
    category: "buy",
    type: "estate",
    beds: 6,
    baths: 8,
    area: 14200,
    parking: 5,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    description: "Carved deep into the Monaco granite cliffs, the Azure Cliff Oasis offers absolute privacy combined with premium superyacht-harbor views. Lined in bespoke Venetian plaster and accented with hand-forged bronze fixtures, this estate represents the peak of Mediterranean prestige. A high-speed glass elevator descends directly to a private rocky shore, while the infinity-edge pool blends seamlessly with the azure ocean currents.",
    yearBuilt: 2026,
    amenities: [
      "Superyacht Harbor Panorama",
      "Private Cliffside Elevator",
      "Direct Rock-Beach Ingress",
      "Venetian Plaster Walls",
      "Infinity-Edge Saltwater Pool",
      "Subterranean Auto-Gallery for 5 cars",
      "Elite Armored Panic Sanctuary"
    ],
    coordinates: { lat: 43.7431, lng: 7.4305 },
    nearby: [
      { name: "International School of Monaco", distance: "1.2 miles", type: "school" },
      { name: "Princess Grace Hospital Complex", distance: "2.1 miles", type: "hospital" },
      { name: "Monaco Monte-Carlo Train Station", distance: "0.9 miles", type: "metro" }
    ],
    agentId: "agent-2",
    floorPlanUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prop-5",
    title: "The Solis Biophilic Mansion",
    price: 245000000,
    formattedPrice: "₹24.50 Cr",
    address: "Frond G-12, Palm Jumeirah",
    city: "Dubai",
    category: "buy",
    type: "mansion",
    beds: 6,
    baths: 7,
    area: 11500,
    parking: 4,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    description: "Designed for seamless indoor-outdoor fluid living, The Solis Biophilic Mansion integrates natural indoor flora and flowing water canals directly into the structural frame. Situated on the exclusive, guard-gated Frond G of Palm Jumeirah, this estate offers panoramic skyline and Arabian Gulf vistas, complete with private white-sand beachfront, customized temperature-controlled pool, and premium marble styling.",
    yearBuilt: 2025,
    amenities: [
      "Bespoke Biophilic Water Canals",
      "Private Sandy Beach Frontage",
      "Arabian Gulf Skyline Views",
      "Bespoke Limestone Terraces",
      "Outdoor Culinary Kitchen",
      "Dual Gym & Yoga Studio Setup",
      "24/7 Guard-Gated Security Control"
    ],
    coordinates: { lat: 25.1124, lng: 55.1326 },
    nearby: [
      { name: "The Palm International Academy", distance: "3.4 miles", type: "school" },
      { name: "Saudi German Hospital Dubai", distance: "5.8 miles", type: "hospital" },
      { name: "Palm Jumeirah Monorail Station", distance: "0.5 miles", type: "metro" }
    ],
    agentId: "agent-1",
    floorPlanUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prop-6",
    title: "The Malabar Sea Sanctuary",
    price: 150000000,
    formattedPrice: "₹15.00 Cr",
    address: "22 Malabar Ridge Road",
    city: "Mumbai",
    category: "buy",
    type: "penthouse",
    beds: 4,
    baths: 5,
    area: 7200,
    parking: 3,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    description: "Floating high above South Mumbai with an absolute 270-degree vista of the Arabian Sea, this penthouse is a pristine, modern architectural haven. Featuring custom French white-oak flooring, imported Portuguese limestone cladding, an automated triple-tier security vault, and premium custom brass work throughout. Residents enjoy five-star private concierge management, personal butler suites, and private elevator vestibules.",
    yearBuilt: 2026,
    amenities: [
      "270-degree Arabian Sea Vista",
      "Portuguese Limestone Cladding",
      "Private Elevator Vestibule",
      "Dual Commercial and Wet Kitchens",
      "Butler Suites & Staff Quarters",
      "Ultra-Secure Vault Complex",
      "Dedicated Residential Health Spa"
    ],
    coordinates: { lat: 18.9548, lng: 72.7985 },
    nearby: [
      { name: "Cathedral & John Connon Prep School", distance: "2.1 miles", type: "school" },
      { name: "Sir H.N. Reliance Foundation Hospital", distance: "1.6 miles", type: "hospital" },
      { name: "Grant Road Railway Terminus", distance: "1.2 miles", type: "metro" }
    ],
    agentId: "agent-1",
    floorPlanUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prop-7",
    title: "Monaco Larvotto Beach Villa",
    price: 950000,
    formattedPrice: "₹9.50 L / mo",
    address: "12 Larvotto Beach Promenade",
    city: "Monaco",
    category: "rent",
    type: "villa",
    beds: 4,
    baths: 5,
    area: 5800,
    parking: 2,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    description: "An elegant, highly private rental villa on the exclusive Larvotto Beach stretch. Offering direct beach access, curated minimalist furniture, a private glass pool, and a rooftop cocktail deck with unparalleled ocean views. Ideal for high-profile tenants seeking temporary sanctuary.",
    yearBuilt: 2024,
    amenities: [
      "Direct Beachfront Access",
      "Rooftop Sunset Cocktail Deck",
      "Private Glass-Wall Heated Pool",
      "Premium Subterranean Parking",
      "Smart Air Purification",
      "Bespoke Italian Custom Furniture"
    ],
    coordinates: { lat: 43.7468, lng: 7.4344 },
    nearby: [
      { name: "Larvotto International Preschool", distance: "0.4 miles", type: "school" },
      { name: "Princess Grace Hospital Complex", distance: "1.8 miles", type: "hospital" },
      { name: "Monaco Heliport Access", distance: "2.3 miles", type: "metro" }
    ],
    agentId: "agent-2",
    floorPlanUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prop-8",
    title: "The Carbon Commercial Pavilion",
    price: 1250000,
    formattedPrice: "₹12.50 L / mo",
    address: "One Central Park Plaza, Midtown",
    city: "New York",
    category: "commercial",
    type: "estate",
    beds: 0,
    baths: 6,
    area: 12400,
    parking: 10,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    description: "An ultra-luxury executive suite and commercial showroom overlooking Central Park. Engineered with heavy acoustics, matte-carbon metal columns, architectural lighting, and integrated premium boardrooms with live global stream setups. Perfect for luxury headquarters.",
    yearBuilt: 2025,
    amenities: [
      "Heavy Acoustic Shelling",
      "Executive Boardrooms & Lounge",
      "Central Park Double-Height Overlook",
      "Dynamic Architectural Lighting",
      "Integrated Global Media Center",
      "Private VIP Secure Ingress Elevators"
    ],
    coordinates: { lat: 40.7644, lng: -73.973 },
    nearby: [
      { name: "Columbia Executive School", distance: "2.5 miles", type: "school" },
      { name: "Weill Cornell Medical Center", distance: "1.9 miles", type: "hospital" },
      { name: "59th St - Columbus Circle Station", distance: "0.1 miles", type: "metro" }
    ],
    agentId: "agent-3",
    floorPlanUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Alastair Sterling",
    role: "CEO",
    company: "Sterling Hedge Capital",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    comment: "Aura Estates redefining real estate isn't an understatement. Aakash Yadav curated three private off-market estates for us in Bel Air, keeping negotiations entirely seamless and utterly secure. Phenomenal discretion."
  },
  {
    id: "test-2",
    name: "Genevieve Durand",
    role: "Aesthetic Director",
    company: "Maison de L'art",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    comment: "The structural integrity, biophilic detailing, and aesthetic pairing on the Obsidian Pavilion are breathtaking. Elena secured the deed in under 48 hours. Absolute luxury at its finest."
  },
  {
    id: "test-3",
    name: "Sir Rajesh Khanna",
    role: "Chairman",
    company: "Khanna Global Industries",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    comment: "The sea views on the Malabar Sea Sanctuary are spectacular. Aakash Yadav was exemplary in managing local clearances, custom structural verification, and butler staffing setups. Highly recommended."
  }
];

export const BLOGS: Blog[] = [
  {
    id: "blog-1",
    title: "The Rise of Architectural Brutalism in Modern Luxury Estates",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    date: "June 18, 2026",
    readTime: "6 min read",
    author: {
      name: "Aakash Yadav",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
    },
    excerpt: "Discover why ultra-high-net-worth buyers are turning away from cookie-cutter designs in favor of carbonaceous raw concrete, thermal glass, and structural travertine.",
    content: "Architectural brutalism is experiencing a powerful luxury revival. Once associated with cold institutional complexes, modern designers are combining volcanic obsidian glass, raw travertine stone, and exposed aggregate concrete with lush biophilic plantings and heated flowing waterways to form tranquil sanctuaries. The appeal lies in raw architectural honesty—no paint, no faux paneling, just structural strength paired with ultimate thermal efficiency."
  },
  {
    id: "blog-2",
    title: "Biophilic Design: Integrating Living Waterways and Indoor Flora",
    category: "Design Trends",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    date: "May 29, 2026",
    readTime: "5 min read",
    author: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80"
    },
    excerpt: "How integration of active water canals and indoor microclimates is shifting wellness paradigms in high-end global properties.",
    content: "Biophilic luxury properties are no longer just adding houseplants; they are engineering fully integrated indoor ecosystems. From temperature-controlled water canals that flow through living spaces to double-height vertical gardens with automated nutrient misting, modern estates are designed around wellness. We take a look inside Palm Jumeirah's newest biophilic mansion to see how active air filtration is combined with architectural beauty."
  },
  {
    id: "blog-3",
    title: "Off-Market Luxury: Navigating the Secret World of Elite Real Estate",
    category: "Investment",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    date: "April 12, 2026",
    readTime: "8 min read",
    author: {
      name: "Marcus Thorne",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
    },
    excerpt: "Over 60% of properties valued above ₹30 Crore never touch public databases. Learn the mechanics of off-market acquisitions.",
    content: "The world's most elite mansions and villas are bought and sold behind closed doors. Public portals like Zillow and Airbnb represent only a fraction of premium real estate. Wealthy buyers prioritize confidentiality, avoiding paparazzi and maintaining high asset privacy. Learn how trust-based legal structures, private bank vetting, and exclusive agent brokerages facilitate multi-crore asset transfers globally without leaving a public trace."
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What defines an 'ultra-premium' property acquisition on Aura?",
    answer: "Our listings go through a rigorous three-tiered architectural, structural, and history verification. We exclusively feature properties with unique architectural merit, custom material profiles (e.g., travertine, volcanic glass, pure limestone), high privacy security, and prime locations (Malibu, Bel Air, Larvotto Monaco, Palm Jumeirah, and Malabar Hill)."
  },
  {
    id: "faq-2",
    question: "Can I coordinate private viewings virtually?",
    answer: "Absolutely. We offer high-fidelity 4K interactive Matterport virtual walkthroughs, custom drone-guided video tours, and scheduled private live-stream walkthroughs hosted by our senior partners (Aakash, Elena, or Marcus) with full digital documentation."
  },
  {
    id: "faq-3",
    question: "Are off-market listings available?",
    answer: "Yes, our off-market division represents over 40 properties valued between ₹20 Cr and ₹150 Cr. Access requires private VIP verification of credit worthiness and signature of a strict NDA. Please connect with Aakash Yadav at +91 8340650759 to initiate a private onboarding."
  },
  {
    id: "faq-4",
    question: "How does the AI Property Advisor assist my search?",
    answer: "Our advanced server-side Gemini AI Property Advisor acts as a highly specialized concierge. By analyzing your lifestyle requirements, architectural preferences, desired location, and budget, it instantly parses available inventory and offers personalized, context-aware estate recommendations."
  },
  {
    id: "faq-5",
    question: "What is the typical EMI structure on a luxury home?",
    answer: "Luxury home loans typically benefit from customized portfolio-lending terms. Our interactive mortgage calculator assumes a premium interest rate and allows customizable down-payment ratios. Aakash Yadav can coordinate bespoke private-wealth banking introductions for preferred financing rates."
  }
];
