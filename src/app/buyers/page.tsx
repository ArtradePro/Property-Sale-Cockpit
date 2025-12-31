'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shell } from '@/components/layout/Shell';
import { Card, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { getBuyers, addBuyer, updateBuyer, deleteBuyer } from '@/lib/storage';
import toast from 'react-hot-toast';
import { Buyer } from '@/types';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';


const stages = ['new', 'qualified', 'viewed', 'offer', 'accepted', 'in-transfer', 'completed', 'lost'] as const;
const sources = ['Property24', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'Referral', 'Direct', 'Other'];
const countries = ['South Africa', 'United Kingdom', 'Germany', 'Netherlands', 'United States', 'Switzerland', 'UAE', 'Other'];

const BuyerFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  source: z.string().min(1, 'Source is required'),
  notes: z.string().optional(),
});
type BuyerFormValues = z.infer<typeof BuyerFormSchema>;

export default function BuyersPage() {
  const [buyers, setBuyers] = useState<Buyer[]>(() => getBuyers());
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BuyerFormValues>({
    resolver: zodResolver(BuyerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: countries[0],
      source: sources[0],
      notes: '',
    },
  });

  const onAddBuyer = (data: BuyerFormValues) => {
    const newBuyer = addBuyer({
      ...data,
      notes: data.notes ?? '',
      stage: 'new',
      documentsShared: [],
    });
    setBuyers([...buyers, newBuyer]);
    setShowForm(false);
    reset();
    toast.success('Buyer added');
  };
  
  const handleUpdateStage = (id: string, stage: Buyer['stage']) => {
    const updated = updateBuyer(id, { stage });
    if (updated) {
      setBuyers(buyers.map(b => b.id === id ? updated : b));
      toast.success(`Buyer moved to ${stage.replace('-', ' ')}`);
    }
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Delete this buyer?')) {
      deleteBuyer(id);
      setBuyers(buyers.filter(b => b.id !== id));
      toast.success('Buyer deleted');
    }
  };
  
  const activeBuyers = buyers.filter(b => !['completed', 'lost'].includes(b.stage));
  const closedBuyers = buyers.filter(b => ['completed', 'lost'].includes(b.stage));
  
  return (
    <Shell
      title="Buyer Pipeline"
      description="Track interested parties through the sale process"
      actions={
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Buyer
        </Button>
      }
    >
      {/* Add Buyer Form */}
      {showForm && (
        <Card className="mb-8">
          <CardTitle>New Buyer</CardTitle>
          <form onSubmit={handleSubmit(onAddBuyer)} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Add Buyer Form">
            <div>
              <label htmlFor="buyer-name" className="block text-sm font-medium text-gray-700 mb-1">Name </label>
              <input
                {...register('name')}
                id="buyer-name"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="buyer-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                {...register('email')}
                id="buyer-email"
                type="email"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="buyer-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                {...register('phone')}
                id="buyer-phone"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="buyer-country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                {...register('country')}
                id="buyer-country"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.country ? 'border-red-500' : ''}`}
              >
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.country && <p className="text-xs text-red-600 mt-1">{errors.country.message}</p>}
            </div>
            <div>
              <label htmlFor="buyer-source" className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select
                {...register('source')}
                id="buyer-source"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.source ? 'border-red-500' : ''}`}
              >
                {sources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.source && <p className="text-xs text-red-600 mt-1">{errors.source.message}</p>}
            </div>
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="buyer-notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                {...register('notes')}
                id="buyer-notes"
                rows={2}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex gap-2 flex-wrap">
              <Button type="submit" disabled={isSubmitting}>Save Buyer</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}
      
      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mb-8">
        {stages.map(stage => (
          <Card key={stage} padding="sm" className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {buyers.filter(b => b.stage === stage).length}
            </div>
            <div className="text-xs text-gray-500 capitalize">{stage.replace('-', ' ')}</div>
          </Card>
        ))}
      </div>
      
      {/* Active Buyers */}
      <Card className="mb-8 overflow-x-auto">
        <CardTitle>Active Pipeline ({activeBuyers.length})</CardTitle>
        
        {activeBuyers.length === 0 ? (
          <p className="text-gray-500 mt-4">No active buyers yet. Add your first lead above.</p>
        ) : (
          <div className="mt-4 divide-y">
            {activeBuyers.map(buyer => (
              <div key={buyer.id} className="py-4">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedId(expandedId === buyer.id ? null : buyer.id)}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-medium text-gray-900">{buyer.name}</div>
                      <div className="text-sm text-gray-500">{buyer.country} · via {buyer.source}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={buyer.stage} />
                    {expandedId === buyer.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
                
                {expandedId === buyer.id && (
                  <div className="mt-4 pt-4 border-t bg-gray-50 -mx-6 px-6 pb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {buyer.email && <div><span className="text-gray-500">Email:</span> {buyer.email}</div>}
                      {buyer.phone && <div><span className="text-gray-500">Phone:</span> {buyer.phone}</div>}
                      <div className="col-span-2"><span className="text-gray-500">Notes:</span> {buyer.notes || 'None'}</div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500 mr-2">Move to:</span>
                        {stages.filter(s => s !== buyer.stage).map(stage => (
                          <button
                            key={stage}
                            onClick={() => handleUpdateStage(buyer.id, stage)}
                            className="text-xs px-2 py-1 bg-white border rounded hover:bg-gray-50 capitalize"
                            aria-label={`Move buyer to ${stage.replace('-', ' ')}`}
                          >
                            {stage.replace('-', ' ')}
                          </button>
                        ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <button
                        onClick={() => handleDelete(buyer.id)}
                        className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                                            <button
                                              onClick={() => handleDelete(buyer.id)}
                                              className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                                              aria-label="Delete buyer"
                                            >
                                              <Trash2 className="w-4 h-4" aria-hidden="true" /> Delete
                                            </button>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
      
      {/* Closed */}
      {closedBuyers.length > 0 && (
        <Card>
          <CardTitle>Closed ({closedBuyers.length})</CardTitle>
          <div className="mt-4 divide-y">
            {closedBuyers.map(buyer => (
              <div key={buyer.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-700">{buyer.name}</span>
                  <span className="text-gray-500 ml-2">· {buyer.country}</span>
                </div>
                <StatusBadge status={buyer.stage} />
              </div>
            ))}
          </div>
        </Card>
      )}
    </Shell>
  );
}
