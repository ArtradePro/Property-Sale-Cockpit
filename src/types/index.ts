export interface Property {
  id: string;
  status: 'active' | 'under-offer' | 'sold';
  
  // Location
  address: {
    street: string;
    estate: string;
    suburb: string;
    town: string;
    province: string;
    region: string;
    country: string;
  };
  
  // Sizes
  houseSize: number;      // sqm
  erfSize: number;        // sqm
  
  // Rooms
  bedrooms: number;
  bathrooms: number;
  garages: number;
  parkingBays: number;
  
  // Costs
  rates: number;          // monthly
  levies: number;         // monthly
  askingPrice: number;
  
  // Features
  features: {
    category: string;
    items: string[];
  }[];
  
  // Marketing copy
  headline: string;
  tagline: string;
  description: string;
  lifestyleBlurb: string;
  investorBlurb: string;
  
  // Media
  images: string[];
  virtualTourUrl?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface LegalItem {
  id: string;
  category: string;
  item: string;
  status: 'pending' | 'in-progress' | 'complete' | 'not-required';
  notes?: string;
  dueDate?: string;
  documentUrl?: string;
}

export interface MarketingChannel {
  id: string;
  category: 'portal' | 'social' | 'direct' | 'other';
  name: string;
  url?: string;
  status: 'not-started' | 'draft' | 'published' | 'paused';
  targetMarket: string[];
  notes?: string;
  publishedDate?: string;
}

export interface Buyer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  country: string;
  source: string;
  stage: 'new' | 'qualified' | 'viewed' | 'offer' | 'accepted' | 'in-transfer' | 'completed' | 'lost';
  budget?: number;
  currency?: string;
  timeline?: string;
  notes: string;
  documentsShared: string[];
  lastContact?: string;
  createdAt: string;
}

export interface Financials {
  askingPrice: number;
  currency: string;
  
  // Expected costs
  costs: {
    id: string;
    item: string;
    amount: number;
    status: 'estimated' | 'quoted' | 'paid';
    notes?: string;
  }[];
  
  // Exchange rates (manual or API)
  exchangeRates: {
    currency: string;
    rate: number;
    updatedAt: string;
  }[];
}

export interface DashboardStats {
  legalProgress: number;
  marketingProgress: number;
  activeBuyers: number;
  viewingsScheduled: number;
  offersReceived: number;
}
