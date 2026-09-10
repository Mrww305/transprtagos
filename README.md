# PakTransit OS

**Autonomous Transport Agent Operating System for Pakistan's Logistics Industry**

[![CI](https://github.com/paktransit-os/paktransit-os/actions/workflows/ci.yml/badge.svg)](https://github.com/paktransit-os/paktransit-os/actions/workflows/ci.yml)
[![Deployed with Vercel](https://img.shields.io/badge/deployed%20with-vercel-000000.svg)](https://vercel.com/)

## 🚀 Overview

PakTransit OS is a production-grade, autonomous agent-based fleet management system designed for Pakistan's transport industry. It features:

- **6 Autonomous AI Agents**: Dispatcher, Fleet, Maintenance, CRM, Finance, Sales/GTM
- **Real-time Pakistan Map**: 10 cities, 12 animated vehicles with live tracking
- **Driver-Friendly Mobile UI**: Urdu voice support for illiterate drivers
- **Live Route Navigation**: Lahore → Multan → Sukkur → Hyderabad → Karachi
- **GTM/Lead Pipeline**: Kanban-style lead generation and management
- **Inter-Agent Communication**: Real-time pub/sub system via Vercel KV

## 🏗️ Architecture

```
paktransit-os/
├── apps/
│   ├── web/          # Next.js 14+ App Router (main UI)
│   └── edge/         # Edge Runtime functions
├── packages/
│   ├── shared/       # Shared types & utilities
│   └── agents-core/  # Agent AI logic (portable)
├── .github/          # CI/CD workflows
├── infra/            # Vercel & infrastructure config
└── docs/             # Documentation
```

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm workspaces
- **Monorepo**: Turborepo
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand (client) + React Query (server)
- **Database**: Vercel Postgres with Drizzle ORM
- **Auth**: NextAuth.js v5
- **Real-time**: Vercel KV (Redis)
- **Validation**: Zod
- **Testing**: Vitest + Playwright

## 📦 Quick Start

### Prerequisites

- Node.js >= 18.17.0
- pnpm >= 8.12.0
- Vercel CLI (optional for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/paktransit-os/paktransit-os.git
cd paktransit-os

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🗺️ Routes

| Route | Description |
|-------|-------------|
| `/` | Dashboard / Home |
| `/fleet` | Fleet management & vehicle tracking |
| `/ops` | Operations center |
| `/maintenance` | Vehicle maintenance tracking |
| `/crm` | Customer relationship management |
| `/team` | Team management |
| `/pipeline` | GTM / Lead pipeline (Kanban) |
| `/driver` | Driver mobile interface (Urdu support) |

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link
vercel login
vercel link

# Deploy to production
vercel --prod
```

### Environment Variables

See `.env.example` for all required environment variables. Set them in Vercel:

```bash
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
# ... repeat for all secrets
```

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md) - System design and agent architecture
- [Deployment](docs/DEPLOYMENT.md) - Production deployment guide
- [Agents](docs/AGENTS.md) - Agent system documentation
- [API](docs/API.md) - API endpoint documentation

## 🎯 Performance Targets

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- 90+ on all Core Web Vitals categories

## 🌍 Localization

- **Languages**: English, Urdu (Noto Nastaliq Urdu font)
- **Currency**: Pakistani Rupee (₨/PKR)
- **RTL Support**: Full Urdu RTL layout support

## 📱 Mobile Support

The driver interface is optimized for mobile devices with:
- Touch-friendly controls
- Voice commands in Urdu
- Offline mode for spotty networks
- Reduced motion support

## 🔒 Security

- Security headers configured in `vercel.json`
- CSP, HSTS, X-Frame-Options enabled
- Secrets managed via Vercel environment variables
- Auth via NextAuth.js with Google OAuth

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Run unit tests
pnpm test:unit
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

Built for Pakistan's transport industry with ❤️
