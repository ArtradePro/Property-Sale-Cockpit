import { Shell } from '@/components/layout/Shell';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { StatusBadge } from '@/components/ui/Badge';
import { getMarketingChannels, getTargetMarkets, calculateMarketingProgress } from '@/lib/data';
import { Globe, Share2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function MarketingPage() {
  const channels = getMarketingChannels();
  const markets = getTargetMarkets();
  const progress = calculateMarketingProgress(channels);
  
  const byCategory = channels.reduce((acc, ch) => {
    if (!acc[ch.category]) acc[ch.category] = [];
    acc[ch.category].push(ch);
    return acc;
  }, {} as Record<string, typeof channels>);
  
  const categoryLabels: Record<string, string> = {
    portal: 'Property Portals',
    social: 'Social Media',
    direct: 'Direct Outreach',
    other: 'Other Channels'
  };
  
  return (
    <Shell
      title="Marketing"
      description="Manage your listing across all channels"
      actions={
        <Link href="/content">
          <Button>Generate Content</Button>
        </Link>
      }
    >
      {/* Progress & Markets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardTitle>Publishing Progress</CardTitle>
          <CardDescription>Channels with live listings</CardDescription>
          
          <div className="mt-4">
            <Progress value={progress} />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { status: 'published', label: 'Published' },
              { status: 'draft', label: 'Draft' },
              { status: 'not-started', label: 'Not Started' },
              { status: 'paused', label: 'Paused' },
            ].map(({ status, label }) => (
              <div key={status} className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {channels.filter(c => c.status === status).length}
                </div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card>
          <CardTitle>Target Markets</CardTitle>
          <div className="mt-4 space-y-2">
            {markets.map(market => (
              <div key={market.country} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{market.country}</span>
                <StatusBadge status={market.priority === 'high' ? 'success' : market.priority === 'medium' ? 'warning' : 'default'} />
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Channels by Category */}
      <div className="space-y-6">
        {Object.entries(byCategory).map(([category, categoryChannels]) => (
          <Card key={category}>
            <CardTitle>{categoryLabels[category] || category}</CardTitle>
            
            <div className="mt-4 divide-y">
              {categoryChannels.map(channel => (
                <div key={channel.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{channel.name}</span>
                        {channel.url && (
                          <a href={channel.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {channel.notes && (
                        <p className="text-sm text-gray-500 mt-1">{channel.notes}</p>
                      )}
                      <div className="flex gap-1 mt-2">
                        {channel.targetMarket.map(market => (
                          <span key={market} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {market}
                          </span>
                        ))}
                      </div>
                    </div>
                    <StatusBadge status={channel.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
