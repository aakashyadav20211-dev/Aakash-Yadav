export type PropertyCategory = "buy" | "rent" | "commercial";
export type PropertyType = "villa" | "penthouse" | "mansion" | "estate" | "apartment";

export interface NearbyAmenity {
  name: string;
  distance: string;
  type: "school" | "hospital" | "metro" | "dining" | "shopping";
}

export interface Property {
  id: string;
  title: string;
  price: number; // in USD
  formattedPrice: string;
  address: string;
  city: string;
  category: PropertyCategory;
  type: PropertyType;
  beds: number;
  baths: number;
  area: number; // in sq ft
  parking: number; // parking spaces
  image: string;
  gallery: string[];
  featured: boolean;
  description: string;
  yearBuilt: number;
  amenities: string[];
  virtualTourUrl?: string;
  videoTourUrl?: string;
  coordinates: { lat: number; lng: number };
  nearby: NearbyAmenity[];
  agentId: string;
  floorPlanUrl: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  photo: string;
  phone: string;
  email: string;
  rating: number;
  listingsCount: number;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  excerpt: string;
  content: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Lead {
  id: string;
  propertyId?: string;
  propertyName?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientMessage: string;
  date: string;
  status: "new" | "contacted" | "scheduled" | "archived";
  agentId?: string;
}

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  date: string;
  time: string;
  agentName: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}
