import propertiesData from '../../data/properties.json';
import { Property } from '@/types';

export function getProperties(): Property[] {
  return propertiesData;
}

export function getPropertyById(id: string): Property | undefined {
  return propertiesData.find((p: Property) => p.id === id);
}
