// Client-side storage for buyers (persisted to localStorage)


import { Buyer } from '@/types';
import { z } from 'zod';

export const BuyerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  country: z.string(),
  source: z.string(),
  stage: z.enum(['new', 'qualified', 'viewed', 'offer', 'accepted', 'in-transfer', 'completed', 'lost']),
  budget: z.number().optional(),
  currency: z.string().optional(),
  timeline: z.string().optional(),
  notes: z.string(),
  documentsShared: z.array(z.string()),
  lastContact: z.string().optional(),
  createdAt: z.string(),
});

const BUYERS_KEY = 'cockpit-buyers';

export function getBuyers(): Buyer[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(BUYERS_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return z.array(BuyerSchema).parse(parsed);
  } catch {
    // If invalid, clear corrupted data
    localStorage.removeItem(BUYERS_KEY);
    return [];
  }
}

export function saveBuyers(buyers: Buyer[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BUYERS_KEY, JSON.stringify(buyers));
}

export function addBuyer(buyer: Omit<Buyer, 'id' | 'createdAt'>): Buyer {
  const buyers = getBuyers();
  const newBuyer: Buyer = {
    ...buyer,
    id: `buyer-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  buyers.push(newBuyer);
  saveBuyers(buyers);
  return newBuyer;
}

export function updateBuyer(id: string, updates: Partial<Buyer>): Buyer | null {
  const buyers = getBuyers();
  const index = buyers.findIndex(b => b.id === id);
  if (index === -1) return null;
  
  buyers[index] = { ...buyers[index], ...updates };
  saveBuyers(buyers);
  return buyers[index];
}

export function deleteBuyer(id: string): boolean {
  const buyers = getBuyers();
  const filtered = buyers.filter(b => b.id !== id);
  if (filtered.length === buyers.length) return false;
  
  saveBuyers(filtered);
  return true;
}
