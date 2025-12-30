# Property Sale Cockpit

All-in-one, production-ready Next.js app for managing, marketing, and selling properties privately.

## Features

- **Property Data Module**: Structured property files (JSON), images/media, lifestyle/location highlights, pricing, and live currency conversions.
- **Legal & Compliance Checklist**: Track title deed, plans, certificates, HOA docs, conveyancer, and progress.
- **Marketing Module**: Generate long-form listings, social ads, email info-packs, video scripts, and manage channel status.
- **Buyer Funnel / Mini-CRM**: Capture leads, track status, notes, follow-ups, and document sharing.
- **Financials Module**: Asking price, auto currency conversions, estimated costs, and net proceeds calculator.
- **Document Manager**: Upload/attach property documents, track completion, and backup/version history.
- **Export / Copy Tools**: One-click copy/export for listings, ads, emails, responses (PDF/HTML export included).
- **System Settings**: Multi-property selection, branding, and backup/restore of data files.
- **Admin Dashboard**: Manage properties, users, analytics, and system settings (admin-only access).
- **User Messaging**: Secure buyer-seller messaging with inquiry forms and message storage.
- **Performance & SEO**: Optimized images, code splitting, meta tags, Open Graph, and structured data.
- **Accessibility & Mobile**: WCAG-compliant, responsive, and touch-friendly UI.
- **Security**: Input validation, secure endpoints, authentication, and HTTPS-ready.
- **Scalability**: Ready for Vercel (serverless) or Docker (containerized) deployment.

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation
1. Clone the repo:
	```
	git clone https://github.com/ArtradePro/Property-Sale-Cockpit.git
	cd Property-Sale-Cockpit/albertinia-sale-cockpit
	```
2. Install dependencies:
	```
	npm install
	```
3. Configure environment variables:
	- Copy `.env.local.example` to `.env.local` and fill in your secrets (Cloudinary, NextAuth, etc).

### Running Locally
```
npm run dev
```
App runs at http://localhost:3000

### Testing
```
npm test
```

### Backup Data
```
npm run backup
```
Backups are stored in `/backups`.

## Deployment

### Vercel (Serverless)
- Use `vercel.json` for configuration.
- Connect your repo to Vercel and deploy.

### Docker (Containerized)
```
docker build -t property-sale-cockpit .
docker run -p 3000:3000 property-sale-cockpit
```

## Project Structure

- `/src/app` – Next.js app directory (pages, components, styles)
- `/src/lib` – Utilities (data, export, multi-property, etc)
- `/data` – Property, legal, marketing, user, and buyer data (JSON)
- `/scripts` – Backup and utility scripts
- `/backups` – Data backups

## Customization

- Add/edit properties in `data/properties.json`
- Update legal, marketing, and buyer data in `/data`
- Branding and settings in admin dashboard

## License

MIT
