# PakTransit OS - Quick Setup Guide

Get from zero to deployed in 10 minutes. Follow these steps exactly.

## Prerequisites

- Node.js v20+ installed
- pnpm installed (`npm i -g pnpm@9`)
- Vercel CLI installed (`npm i -g vercel@latest`)
- GitHub account
- Vercel account (free tier works)

---

## Step 1: Initialize Repository

```bash
cd /workspace
git init
git add .
git commit -m "feat: initial paktransit-os monorepo"
```

---

## Step 2: Create GitHub Repository

```bash
gh repo create paktransit-os --public --source=. --push
```

*If you don't have GitHub CLI, create repo manually on GitHub and run:*
```bash
git remote add origin https://github.com/YOUR_USERNAME/paktransit-os.git
git push -u origin main
```

---

## Step 3: Install Dependencies

```bash
pnpm install
```

---

## Step 4: Login to Vercel

```bash
vercel login
vercel link
```

*Follow prompts to select your organization and project.*

---

## Step 5: Set Environment Variables

Copy and run these commands one by one. **Use production environment** unless noted.

### Database (Vercel Postgres or Neon)

```bash
vercel env add DATABASE_URL production
# Paste: postgresql://user:password@host:5432/paktransit

vercel env add DATABASE_URL preview
# Paste same URL

vercel env add DATABASE_URL_UNPOOLED production
# Paste: postgresql://user:password@host:5432/paktransit?pgbouncer=true

vercel env add DATABASE_URL_UNPOOLED preview
# Paste same URL
```

### Auth (NextAuth)

```bash
vercel env add NEXTAUTH_URL production
# Enter: https://paktransit-os.vercel.app

vercel env add NEXTAUTH_URL preview
# Press enter for auto-detection

vercel env add NEXTAUTH_SECRET production
# Generate one: openssl rand -base64 32
# Paste the output

vercel env add NEXTAUTH_SECRET preview
# Can use same secret or different
```

### Optional: Google OAuth (for login)

```bash
vercel env add AUTH_GOOGLE_ID production
# Paste your Google OAuth Client ID

vercel env add AUTH_GOOGLE_SECRET production
# Paste your Google OAuth Client Secret
```

### Optional: AI Keys (for future agent LLM features)

```bash
vercel env add OPENAI_API_KEY production
# Paste your OpenAI API key

vercel env add ANTHROPIC_API_KEY production
# Paste your Anthropic API key
```

### Optional: Vercel KV (Redis for real-time agent comms)

```bash
vercel env add KV_URL production
# Create KV in Vercel dashboard, paste connection string

vercel env add KV_REST_API_URL production
vercel env add KV_REST_API_TOKEN production
```

### Monitoring

```bash
vercel env add SENTRY_DSN production
# Create Sentry project, paste DSN

vercel env add VERCEL_ANALYTICS_ID production
# Find in Vercel dashboard → Analytics
```

### App Configuration

```bash
vercel env add NEXT_PUBLIC_APP_URL production
# Enter: https://paktransit-os.vercel.app

vercel env add NEXT_PUBLIC_GA_ID production
# Enter your Google Analytics ID (or leave blank)
```

---

## Step 6: Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Import **paktransit-os** from GitHub
4. Configure Project:
   - **Framework Preset**: Next.js ✅
   - **Root Directory**: `apps/web` ✅
   - **Build Command**: `pnpm turbo build --filter=web` ✅
   - **Output Directory**: `.next` ✅
5. Click **Deploy** 🚀

---

## Step 7: Verify Deployment

Your app is now live at:
```
https://paktransit-os.vercel.app
```

Test these routes:
- `/fleet` - Fleet management dashboard
- `/ops` - Operations dashboard
- `/crm` - CRM and leads
- `/pipeline` - Sales Kanban board
- `/maintenance` - Vehicle maintenance tracking
- `/team` - Team management
- `/driver` - Driver mobile UI (test on mobile viewport)

---

## Step 8: Setup Branch Protection (GitHub)

Go to: `https://github.com/YOUR_USERNAME/paktransit-os/settings/branches`

### Add rule for `main`:
- [x] Require a pull request before merging
- [x] Require approvals (Count: 1)
- [x] Require status checks to pass before merging
  - Select: `Lint`, `Type Check`, `Test`, `Build`
- [x] Do not allow bypassing the above settings
- [x] Do not allow force pushes
- [x] Require signed commits (recommended)

### Add rule for `develop`:
- [x] Require status checks to pass before merging

---

## Step 9: Test CI/CD Pipeline

### Create a feature branch:
```bash
git checkout -b feature/test-deploy
echo "# Test" >> README.md
git add .
git commit -m "docs: test deployment pipeline"
git push origin feature/test-deploy
```

### Create Pull Request:
```bash
gh pr create --base main --title "Test CI/CD" --body "Testing deployment pipeline"
```

✅ **Expected Results:**
1. GitHub Actions CI runs (Lint → Typecheck → Test → Build)
2. Vercel Bot comments with Preview URL
3. After merge to `main`, auto-deploy to production

---

## Local Development

```bash
# Start development server
pnpm dev

# Run linting
pnpm lint

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Build for production
pnpm build

# Preview production build locally
pnpm start
```

---

## Troubleshooting

### Build Fails
```bash
# Reproduce locally
pnpm turbo build --filter=web

# Check for TypeScript errors
pnpm typecheck

# Check for ESLint errors
pnpm lint
```

### Environment Variable Issues
```bash
# List all variables
vercel env ls

# Redeploy after adding new variables
vercel --prod
```

### Database Connection Errors
- Ensure database allows connections from `0.0.0.0/0` (Vercel IPs)
- Use `DATABASE_URL_UNPOOLED` for serverless functions if pooling limits hit

### Preview Deployments Not Working
```bash
# Manually trigger preview
vercel deploy --preview
```

---

## Post-Deployment Checklist

- [ ] Security headers verified at [securityheaders.com](https://securityheaders.com) → Target: Grade A
- [ ] Core Web Vitals checked in Vercel Analytics → LCP < 2.5s
- [ ] Driver mobile UI tested on actual mobile device
- [ ] Urdu text rendering verified
- [ ] All 7 route pages accessible
- [ ] API endpoints responding correctly
- [ ] Environment variables set for both Production and Preview

---

## Quick Commands Reference

| Task | Command |
|------|---------|
| Install deps | `pnpm install` |
| Dev server | `pnpm dev` |
| Build | `pnpm turbo build --filter=web` |
| Lint | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| Test | `pnpm test` |
| Deploy preview | `vercel deploy` |
| Deploy prod | `vercel deploy --prod` |
| Add env var | `vercel env add KEY production` |
| List env vars | `vercel env ls` |

---

## Support & Documentation

- **Architecture**: See `docs/ARCHITECTURE.md`
- **Agent System**: See `docs/AGENTS.md`
- **API Reference**: See `docs/API.md`
- **Deployment Guide**: See `docs/DEPLOYMENT.md`

---

**🎉 Congratulations! Your PakTransit OS is now production-ready.**

Next steps:
1. Customize branding in `apps/web/app/layout.tsx`
2. Add your database schema in `apps/web/lib/db/schema.ts`
3. Implement agent logic in `packages/agents-core/src/`
4. Invite team members to Vercel project
5. Setup custom domain in Vercel dashboard
