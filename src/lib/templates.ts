import { Property } from '@/types';
import { convertPrice } from './currency';

export function generateLongListing(property: Property): string {
  const prices = convertPrice(property.askingPrice);
  const gbp = prices.find(p => p.currency === 'GBP');
  const eur = prices.find(p => p.currency === 'EUR');
  
  return ` ${property.headline}

${property.address.estate}, ${property.address.town} | ${property.address.region}, ${property.address.country}

${property.description}

-

 Property Overview

| | |
|-|-|
| House Size | ${property.houseSize} sqm |
| Erf Size | ${property.erfSize} sqm |
| Bedrooms | ${property.bedrooms} |
| Bathrooms | ${property.bathrooms} (all en-suite) |
| Garages | ${property.garages} |
| Parking | ${property.parkingBays} additional bays |
| Monthly Rates | R${property.rates.toLocaleString()} |

-

 Features

${property.features.map(cat => `
 ${cat.category}
${cat.items.map(item => `- ${item}`).join('\n')}
`).join('\n')}

-

 Lifestyle

${property.lifestyleBlurb}

-

 Investment Perspective

${property.investorBlurb}

-

 Price

R ${property.askingPrice.toLocaleString()} (approx. ${gbp?.formatted} | ${eur?.formatted})

Private sale — no agent commission

-

 Location

${property.address.estate}, ${property.address.town}, ${property.address.province}
${property.address.region}, ${property.address.country}

- 15 minutes to pristine beaches
- Close to game lodges and nature reserves
- Easy access to N2 highway
- 4 hours from Cape Town

-

 Contact

For more information, virtual tour, or to arrange a viewing, please contact:

[Your contact details]
`;
}

export function generateShortSocial(property: Property): string {
  const prices = convertPrice(property.askingPrice);
  const gbp = prices.find(p => p.currency === 'GBP');
  
  return `🏡 ${property.headline}

📍 ${property.address.region}, South Africa
🛏 ${property.bedrooms} Beds | 🚿 ${property.bathrooms} Baths | 🚗 ${property.garages} Garages
📐 ${property.houseSize} sqm home on ${property.erfSize} sqm

✨ Premium finishes throughout
✨ Secure gated estate
✨ Fibre internet
✨ Near beaches & game lodges

💰 R${(property.askingPrice/1000000).toFixed(1)}M (≈${gbp?.formatted})
🔑 Private sale — no agent fees

DM for info pack & virtual tour 📩

GardenRoute SouthAfricaProperty Albertinia PropertyForSale ExpatsInSA RelocationSA`;
}

export function generateEmailTemplate(property: Property): string {
  const prices = convertPrice(property.askingPrice);
  const gbp = prices.find(p => p.currency === 'GBP');
  const eur = prices.find(p => p.currency === 'EUR');
  
  return `Subject: ${property.headline} — Information Pack

Dear [Name],

Thank you for your interest in our property in ${property.address.town}, ${property.address.region}.

I've attached the full information pack, which includes:
- Detailed property description
- Floor plan
- Photo gallery
- Video tour link
- Area information

Quick Overview:
- ${property.houseSize} sqm home in secure estate
- ${property.bedrooms} bedrooms, ${property.bathrooms} en-suite bathrooms
- Premium finishes throughout
- R${property.askingPrice.toLocaleString()} (approximately ${gbp?.formatted} / ${eur?.formatted})

Why this location?
${property.lifestyleBlurb}

I'd be happy to arrange a video call to walk you through the property virtually, or answer any questions you might have.

Best regards,
[Your name]

P.S. As this is a private sale, there are no agent commissions — the price you see is negotiated directly.`;
}

export function generateVideoScript(property: Property): string {
  return ` Video Tour Script: ${property.headline}

 INTRO (Outside gate)
"Welcome to Aloe Park Estate in Albertinia, on South Africa's beautiful Garden Route. Today I'm showing you this modern ${property.bedrooms}-bedroom, ${property.bathrooms}-bathroom home that offers premium living in a secure, peaceful setting."

 EXTERIOR APPROACH
"The estate is fully gated with controlled access. This property has a double garage with electric door and keypad entry, plus two additional parking bays for guests."

 ENTRANCE
"As we step inside, you'll immediately notice the SPC Rigid Core luxury vinyl flooring that runs throughout the home. This is a premium, waterproof, and low-maintenance choice."

 OPEN PLAN LIVING
"The heart of the home is this open-plan living and kitchen area. Notice the inside fireplace—this heats approximately 80 square meters of the home. Combined with the double roof insulation—270 millimeters with an R-value of 6.28—this home stays comfortable year-round."

 KITCHEN
"The kitchen features two-tone shaker-style doors with this functional island. [Show storage, countertops, appliance spaces]"

 BEDROOMS
"There are three bedrooms, all capable of fitting king-size beds. Each has its own en-suite bathroom. One is currently configured as a home office—perfect for remote work with the fibre internet available here."

 BATHROOMS
"All bathrooms feature Geberit toilets—a premium German brand—along with high-end finishes and the same SPC flooring for consistency and water resistance."

 WET ROOM
"This is a standout feature—a full wet room with built-in closets and seating. [Show the space]"

 LAUNDRY & UTILITY
"A large separate laundry room here, and there's a dedicated gas and braai room."

 OUTDOOR LIVING
"Outside, you have four pergolas creating distinct outdoor living areas. This covered patio is 35 square meters with a built-in braai and prep bowl."

 GARDEN & WATER
"The garden is fully landscaped with irrigation, and there are four 1000-liter water tanks for backup or garden use."

 WORKSHOP
"For those who need it, there's a workshop and storage shed."

 LIFESTYLE CLOSE
"You're 15 minutes from pristine beaches, close to world-class game lodges, and the N2 highway makes Cape Town about 4 hours away. Fibre internet means you can work from anywhere."

 PRICE & CTA
"This property is offered at R${(property.askingPrice/1000000).toFixed(1)} million—that's approximately [GBP/EUR amount] at current rates. As a private sale, there are no agent commissions."

"Get in touch for the full information pack or to arrange a virtual walkthrough. Links are in the description."

-
RUNTIME TARGET: 4-6 minutes
`;
}
