'use client';

'use client';
import { useState } from 'react';
import { Shell } from '@/components/layout/Shell';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { CopyButton } from '@/components/ui/CopyButton';
import { getProperty } from '@/lib/data';
import { 
  generateLongListing, 
  generateShortSocial, 
  generateEmailTemplate, 
  generateVideoScript 
} from '@/lib/templates';
import { FileText, MessageSquare, Mail, Video } from 'lucide-react';

type ContentType = 'listing' | 'social' | 'email' | 'video';

const contentTypes = [
  { id: 'listing' as ContentType, name: 'Full Listing', icon: FileText, description: 'Detailed property description for portals' },
  { id: 'social' as ContentType, name: 'Social Post', icon: MessageSquare, description: 'Short copy for Facebook/Instagram' },
  { id: 'email' as ContentType, name: 'Email Template', icon: Mail, description: 'Info pack email for buyers' },
  { id: 'video' as ContentType, name: 'Video Script', icon: Video, description: 'Walkthrough tour script' },
];

export default function ContentPage() {
  const [selected, setSelected] = useState<ContentType>('listing');
  const property = getProperty();
  
  const generateContent = (): string => {
    switch (selected) {
      case 'listing': return generateLongListing(property);
      case 'social': return generateShortSocial(property);
      case 'email': return generateEmailTemplate(property);
      case 'video': return generateVideoScript(property);
      default: return '';
    }
  };
  
  const content = generateContent();
  
  return (
    <Shell
      title="Content Generator"
      description="Generate marketing copy from your property data"
    >
      {/* Content Type Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {contentTypes.map(type => (
          <button
            key={type.id}
            onClick={() => setSelected(type.id)}
            className={`p-4 rounded-lg border text-left transition-all ${
              selected === type.id 
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <type.icon className={`w-6 h-6 mb-2 ${selected === type.id ? 'text-blue-600' : 'text-gray-400'}`} />
            <div className="font-medium text-gray-900">{type.name}</div>
            <div className="text-sm text-gray-500 mt-1">{type.description}</div>
          </button>
        ))}
      </div>
      
      {/* Generated Content */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>{contentTypes.find(t => t.id === selected)?.name}</CardTitle>
            <CardDescription>Generated from property data</CardDescription>
          </div>
          <CopyButton text={content} label="Copy All" />
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap overflow-x-auto max-h-150 overflow-y-auto">
          {content}
        </div>
      </Card>
      
      {/* Tips */}
      <Card className="mt-8 bg-yellow-50 border-yellow-200">
        <CardTitle>Tips</CardTitle>
        <ul className="mt-2 text-sm text-gray-700 space-y-1">
          <li>• Content is generated from <code className="bg-white px-1 py-0.5 rounded">data/property.json</code></li>
          <li>• Update the property file to change all generated content</li>
          <li>• Copy and customize as needed for each platform</li>
          <li>• Templates can be edited in <code className="bg-white px-1 py-0.5 rounded">src/lib/templates.ts</code></li>
        </ul>
      </Card>
    </Shell>
  );
}
