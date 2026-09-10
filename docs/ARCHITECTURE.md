# PakTransit OS Architecture

## Overview

PakTransit OS is an Autonomous Transport Agent Operating System designed for Pakistan's logistics industry. It transforms fleet management through AI-driven agents that communicate and coordinate autonomously.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │   Fleet  │ │    Ops   │ │    CRM   │ │  Driver  │           │
│  │  Dashboard│ │Dashboard │ │ Pipeline │ │   UI     │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js 14 App Router                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   Edge Runtime Routes                     │   │
│  │  /api/nearest-hub  /api/rate-limit-check  /api/ab-test   │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                 Serverless Function Routes                │   │
│  │     /api/agents  /api/leads  /api/vehicles  /api/webhooks │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Agent Core (packages/agents-core)             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                  │
│  │Dispatcher  │ │   Fleet    │ │Maintenance │                  │
│  │   Agent    │ │   Agent    │ │   Agent    │                  │
│  └────────────┘ └────────────┘ └────────────┘                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                  │
│  │    CRM     │ │  Finance   │ │ Sales/GTM  │                  │
│  │   Agent    │ │   Agent    │ │   Agent    │                  │
│  └────────────┘ └────────────┘ └────────────┘                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │Vercel Postgres│  │  Vercel KV   │  │  External    │          │
│  │  (Drizzle ORM)│  │   (Redis)    │  │   APIs       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Monorepo Structure

```
paktransit-os/
├── apps/
│   ├── web/              # Next.js 14 main application
│   │   ├── app/          # App Router pages & API routes
│   │   ├── components/   # React components (shadcn/ui)
│   │   ├── lib/          # Business logic, agents, simulation
│   │   └── public/       # Static assets
│   └── edge/             # Edge Runtime functions
│       └── src/          # Geo-routing, rate limiting, A/B tests
├── packages/
│   ├── shared/           # Shared types, constants, utilities
│   │   └── src/
│   │       ├── types/    # TypeScript interfaces
│   │       ├── constants/# Pakistan cities, routes, PKR formatting
│   │       └── utils/    # Helper functions
│   └── agents-core/      # Autonomous agent state machines
│       └── src/
│           ├── dispatcher.ts
│           ├── fleet.ts
│           ├── maintenance.ts
│           ├── crm.ts
│           ├── finance.ts
│           └── sales.ts
├── .github/              # CI/CD workflows, templates
├── infra/                # Vercel, Turborepo configs
├── docs/                 # Architecture, Deployment, API docs
└── vercel.json           # Vercel deployment configuration
```

## Agent System Design

### Six Autonomous Agents

1. **Dispatcher Agent**
   - Assigns shipments to vehicles
   - Optimizes routes across Pakistan (10 cities)
   - Communicates with Fleet and Maintenance agents

2. **Fleet Agent**
   - Tracks 12 animated vehicles in real-time
   - Monitors driver status and location
   - Reports to Dispatcher and Maintenance

3. **Maintenance Agent**
   - Predicts vehicle maintenance needs
   - Schedules repairs based on mileage/time
   - Alerts Fleet Agent when vehicles are unavailable

4. **CRM Agent**
   - Manages customer relationships
   - Tracks shipment history per customer
   - Integrates with Sales/GTM pipeline

5. **Finance Agent**
   - Calculates fares in Pakistani Rupee (₨/PKR)
   - Tracks revenue, expenses, profitability
   - Generates invoices and reports

6. **Sales/GTM Agent**
   - Manages lead generation pipeline (Kanban)
   - Converts leads to customers
   - Coordinates with CRM Agent

### Inter-Agent Communication

Agents communicate via:
- **Vercel KV (Redis)**: Pub/sub for real-time updates
- **API Routes**: RESTful endpoints for state queries
- **Event Bus**: Internal event emission/listening

Example communication flow:
```
Lead Created → Sales Agent → CRM Agent → Dispatcher Agent → Fleet Agent
                                                      ↓
                                               Assigns Vehicle
                                                      ↓
                                               Driver Notified (Urdu Voice)
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14+ | App Router, SSR, API Routes |
| Language | TypeScript | Type safety across monorepo |
| Package Manager | pnpm | Fast, disk-efficient workspaces |
| Monorepo | Turborepo | Parallel builds, caching |
| Styling | Tailwind CSS + shadcn/ui | Responsive, accessible UI |
| State (Client) | Zustand | Lightweight global state |
| State (Server) | React Query | Server state caching |
| Database | Vercel Postgres + Drizzle ORM | Relational data |
| Auth | NextAuth.js v5 | OAuth, session management |
| Real-time | Vercel KV (Redis) | Agent pub/sub, caching |
| Validation | Zod | Runtime type validation |
| Testing | Vitest + Playwright | Unit + E2E tests |
| Linting | ESLint flat config | Code quality |
| Deployment | Vercel | Edge + Serverless hosting |

## Edge vs Serverless Strategy

### Edge Runtime (Low Latency)
- Geolocation routing (`/api/nearest-hub`)
- Rate limiting middleware
- A/B testing assignment
- Auth token validation
- Request logging/tracing

### Serverless (Node.js Runtime)
- Agent orchestration
- Database writes
- Webhook handlers
- Route optimization algorithms
- Email/SMS dispatch

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | Vercel Speed Insights |
| FID (First Input Delay) | < 100ms | Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Web Vitals |
| TTFB (Time to First Byte) | < 200ms | Edge caching |
| API Response Time | < 500ms | Vercel Analytics |

## Security Measures

- **Headers**: Strict CSP, HSTS, X-Frame-Options, X-XSS-Protection
- **Auth**: JWT with short expiry, refresh tokens
- **Rate Limiting**: Sliding window per IP/user
- **Validation**: Zod schemas on all API inputs
- **Secrets**: Environment variables only, never committed

## Accessibility & Localization

- **WCAG 2.1 AA**: Color contrast, keyboard navigation, screen reader support
- **Urdu Support**: Noto Nastaliq Urdu font, RTL layout where needed
- **Voice Commands**: Web Speech API for illiterate drivers
- **Mobile-First**: Driver UI optimized for low-end Android devices
- **Offline Mode**: Service workers cache critical routes

## Pakistan-Specific Features

- **10 Cities**: Lahore, Multan, Sukkur, Hyderabad, Karachi, Islamabad, Rawalpindi, Peshawar, Quetta, Faisalabad
- **Currency**: Pakistani Rupee (₨/PKR) formatting throughout
- **Timezone**: Pakistan Standard Time (PKT, UTC+5)
- **Routes**: Pre-defined highways (N-5, M-2, M-9, etc.)
- **Language**: Urdu text + voice support for drivers

## Future Enhancements

- [ ] LLM integration for natural language agent queries
- [ ] WhatsApp bot for driver communication
- [ ] SMS fallback for low-connectivity areas
- [ ] Advanced route optimization with traffic prediction
- [ ] Multi-tenant support for multiple transport companies
- [ ] IoT integration for real-time vehicle telemetry
