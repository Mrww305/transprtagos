# PakTransit OS Deployment Guide

This document outlines the step-by-step process to deploy PakTransit OS to Vercel, from local development to production.

## Prerequisites

- Node.js v20+ installed
- pnpm installed (`npm i -g pnpm`)
- Vercel CLI installed (`npm i -g vercel`)
- GitHub account with repo access
- Vercel account linked to GitHub

## 1. One-Time Setup

### Install Dependencies
```bash
pnpm install
```

### Link to Vercel
```bash
vercel login
vercel link
```
*Select your organization and project when prompted.*

### Environment Variables Setup

Run the following commands to set up secrets in Vercel. **Do not skip any.**

#### Database (Vercel Postgres / Neon)
```bash
vercel env add DATABASE_URL production
vercel env add DATABASE_URL preview
vercel env add DATABASE_URL_UNPOOLED production
vercel env add DATABASE_URL_UNPOOLED preview
```
*Paste your full connection string (e.g., `postgres://user:pass@host/db`).*

#### Auth (NextAuth)
```bash
vercel env add NEXTAUTH_URL production
# Enter: https://paktransit-os.vercel.app

vercel env add NEXTAUTH_URL preview
# Enter: https://paktransit-os-git-main-vercel-org.vercel.app (or leave blank for auto-detection)

vercel env add NEXTAUTH_SECRET production
# Generate one: openssl rand -base64 32

vercel env add NEXTAUTH_SECRET preview
# Same secret or different, must be 32+ chars

vercel env add AUTH_GOOGLE_ID production
vercel env add AUTH_GOOGLE_SECRET production
```

#### AI & Redis (Optional but Recommended)
```bash
vercel env add OPENAI_API_KEY production
vercel env add ANTHROPIC_API_KEY production
vercel env add KV_URL production
vercel env add KV_REST_API_URL production
vercel env add KV_REST_API_TOKEN production
```

#### Monitoring
```bash
vercel env add SENTRY_DSN production
vercel env add VERCEL_ANALYTICS_ID production
```

#### App Config
```bash
vercel env add NEXT_PUBLIC_APP_URL production
# Enter: https://paktransit-os.vercel.app

vercel env add NEXT_PUBLIC_GA_ID production
```

## 2. GitHub Repository Setup

### Initialize Git
```bash
git init
git add .
git commit -m "feat: initial paktransit-os monorepo"
gh repo create paktransit-os --public --source=. --push
```

### Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Import **paktransit-os** from GitHub
4. Configure Project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `pnpm turbo build --filter=web`
   - **Output Directory**: `.next`
5. Click **Deploy**

## 3. Branch Protection Rules

Enforce these rules in GitHub Settings → Branches → Add branch protection rule:

### `main` branch
- [x] Require a pull request before merging
- [x] Require approvals (Count: 1)
- [x] Require status checks to pass before merging
  - [x] CI (Lint, Typecheck, Test, Build)
- [x] Do not allow bypassing the above settings
- [x] Do not allow force pushes
- [x] Require signed commits (Recommended)

### `develop` branch
- [x] Require status checks to pass before merging
  - [x] CI

## 4. Ongoing Deployment Workflow

### Development Flow
```bash
git checkout -b feature/my-feature
# ... make changes ...
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature
```

### Preview Deployment
1. Create a Pull Request on GitHub targeting `main`.
2. Vercel Bot automatically comments with a **Preview URL**.
3. Reviewers can test the live preview.

### Production Deployment
1. Approve and Merge the PR into `main`.
2. GitHub Action `production.yml` triggers.
3. Vercel automatically deploys the latest `main` to production.

## 5. Troubleshooting

### Build Failures
- Check `.github/workflows/ci.yml` logs for specific errors.
- Run `pnpm turbo build --filter=web` locally to reproduce.

### Environment Variable Issues
- Ensure variables are set for both **Production** and **Preview** environments in Vercel Dashboard → Settings → Environment Variables.
- Redeploy after adding new variables.

### Database Connection Errors
- Verify `DATABASE_URL` allows connections from Vercel IPs (0.0.0.0/0).
- Use `DATABASE_URL_UNPOOLED` for serverless functions if pooling limits are hit.

## 6. Post-Deployment Verification

1. **Security Headers**: Visit [securityheaders.com](https://securityheaders.com) and scan your production URL. Target: Grade A.
2. **Core Web Vitals**: Check Vercel Analytics dashboard for LCP < 2.5s, CLS < 0.1.
3. **Functionality**: Test Driver Mobile View, Agent Dashboard, and Urdu Voice toggle.
