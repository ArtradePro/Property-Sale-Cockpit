
import propertyData from '../../data/property.json';
import legalData from '../../data/legal.json';
import marketingData from '../../data/marketing.json';
import financialsData from '../../data/financials.json';
import { Property, LegalItem, MarketingChannel, Financials, DashboardStats } from '@/types';
import { z } from 'zod';

// Zod schemas for runtime validation
export const PropertySchema = z.object({
  id: z.string(),
  status: z.enum(['active', 'under-offer', 'sold']),
  address: z.object({
    street: z.string(),
    estate: z.string(),
    suburb: z.string(),
    town: z.string(),
    province: z.string(),
    region: z.string(),
    country: z.string(),
  }),
  houseSize: z.number(),
  erfSize: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  garages: z.number(),
  parkingBays: z.number(),
  rates: z.number(),
  levies: z.number(),
  askingPrice: z.number(),
  features: z.array(z.object({ category: z.string(), items: z.array(z.string()) })),
  headline: z.string(),
  tagline: z.string(),
  description: z.string(),
  lifestyleBlurb: z.string(),
  investorBlurb: z.string(),
  images: z.array(z.string()),
  virtualTourUrl: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const LegalItemSchema = z.object({
  id: z.string(),
  category: z.string(),
  item: z.string(),
  status: z.enum(['pending', 'in-progress', 'complete', 'not-required']),
  notes: z.string().optional(),
  dueDate: z.string().optional(),
  documentUrl: z.string().optional(),
});

export const MarketingChannelSchema = z.object({
  id: z.string(),
  category: z.enum(['portal', 'social', 'direct', 'other']),
  name: z.string(),
  url: z.string().optional(),
  status: z.enum(['not-started', 'draft', 'published', 'paused']),
  targetMarket: z.array(z.string()),
  notes: z.string().optional(),
  publishedDate: z.string().optional(),
});

export const FinancialsSchema = z.object({
  askingPrice: z.number(),
  currency: z.string(),
  costs: z.array(z.object({
    id: z.string(),
    item: z.string(),
    amount: z.number(),
    status: z.enum(['estimated', 'quoted', 'paid']),
    notes: z.string().optional(),
  })),
  exchangeRates: z.array(z.object({
    currency: z.string(),
    rate: z.number(),
    updatedAt: z.string(),
  })),
});

export function getProperty(): Property {
  return PropertySchema.parse(propertyData);
}

export function getLegalItems(): LegalItem[] {
  return z.array(LegalItemSchema).parse(legalData.items);
}

export function getMarketingChannels(): MarketingChannel[] {
  return z.array(MarketingChannelSchema).parse(marketingData.channels);
}

export function getTargetMarkets() {
  return marketingData.targetMarkets;
}

export function getFinancials(): Financials {
  return FinancialsSchema.parse(financialsData);
}

export function calculateLegalProgress(items: LegalItem[]): number {
  const applicableItems = items.filter(i => i.status !== 'not-required');
  if (applicableItems.length === 0) return 100;
  const complete = applicableItems.filter(i => i.status === 'complete').length;
  return Math.round((complete / applicableItems.length) * 100);
}

export function calculateMarketingProgress(channels: MarketingChannel[]): number {
  if (channels.length === 0) return 0;
  const published = channels.filter(c => c.status === 'published').length;
  return Math.round((published / channels.length) * 100);
}

export function getDashboardStats(): DashboardStats {
  const legal = getLegalItems();
  const marketing = getMarketingChannels();
  
  return {
    legalProgress: calculateLegalProgress(legal),
    marketingProgress: calculateMarketingProgress(marketing),
    activeBuyers: 0,
    viewingsScheduled: 0,
    offersReceived: 0
  };
}
