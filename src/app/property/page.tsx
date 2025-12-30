import Head from 'next/head';
import { Shell } from '@/components/layout/Shell';
import { Card, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { getProperty } from '@/lib/data';
import { formatZAR, convertPrice } from '@/lib/currency';
import { MapPin, Maximize, BedDouble, Bath, Car, Wallet } from 'lucide-react';
import { ImageGallery } from './ImageGallery';
import { MessageForm } from './MessageForm';
import { ImageUpload } from './ImageUpload';

export default function PropertyPage() {
  const property = getProperty();
  const prices = convertPrice(property.askingPrice);
  
  return (
    <>
      <Head>
        <title>{property.headline} | Property Sale Cockpit</title>
        <meta name="description" content={property.description} />
        <meta property="og:title" content={property.headline} />
        <meta property="og:description" content={property.description} />
        <meta property="og:image" content={property.images[0]} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://yourdomain.com/property/${property.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={property.headline} />
        <meta name="twitter:description" content={property.description} />
        <meta name="twitter:image" content={property.images[0]} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Residence',
          'name': property.headline,
          'description': property.description,
          'address': property.address,
          'image': property.images,
          'numberOfRooms': property.bedrooms,
          'numberOfBathroomsTotal': property.bathrooms,
          'price': property.askingPrice,
          'url': `https://yourdomain.com/property/${property.id}`
        })}</script>
      </Head>
      <Shell 
        title="Property Details"
        description={property.headline}
      >
      {/* Image Upload */}
      <ImageUpload onUpload={url => {/* TODO: Add logic to update property images */}} />
      {/* Images */}
      <ImageGallery images={property.images} headline={property.headline} />
      {/* Message Form */}
      <MessageForm sellerEmail="quote2contract@gmail.com" />
      {/* Header Card */}
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <StatusBadge status={property.status} />
            <h2 className="text-2xl font-bold text-gray-900 mt-2">{property.headline}</h2>
            <div className="flex items-center text-gray-500 mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              {property.address.estate}, {property.address.town}, {property.address.province}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {formatZAR(property.askingPrice)}
            </div>
            <div className="text-sm text-gray-500 mt-1 space-y-0.5">
              {prices.filter(p => p.currency !== 'ZAR').map(p => (
                <div key={p.currency}>{p.formatted}</div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Key Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
        {[
          { icon: Maximize, label: 'House', value: `${property.houseSize} sqm` },
          { icon: Maximize, label: 'Erf', value: `${property.erfSize} sqm` },
          { icon: BedDouble, label: 'Bedrooms', value: property.bedrooms },
          { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
          { icon: Car, label: 'Garages', value: property.garages },
          { icon: Wallet, label: 'Rates', value: formatZAR(property.rates) },
        ].map((stat, i) => (
          <Card key={i} padding="sm" className="text-center">
            <stat.icon className="w-5 h-5 mx-auto text-gray-400 mb-2" />
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </Card>
        ))}
      </div>
      
      {/* Description */}
      <Card className="mb-8">
        <CardTitle>Description</CardTitle>
        <p className="text-gray-700 mt-4 leading-relaxed">{property.description}</p>
      </Card>
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        {property.features.map((category, i) => (
          <Card key={i}>
            <CardTitle>{category.category}</CardTitle>
            <ul className="mt-4 space-y-2">
              {category.items.map((item, j) => (
                <li key={j} className="flex items-start text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      
      {/* Marketing Copy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardTitle>Lifestyle Angle</CardTitle>
          <p className="text-gray-700 mt-4 leading-relaxed">{property.lifestyleBlurb}</p>
        </Card>
        
        <Card>
          <CardTitle>Investor Angle</CardTitle>
          <p className="text-gray-700 mt-4 leading-relaxed">{property.investorBlurb}</p>
        </Card>
      </div>
    </Shell>
  );
}
