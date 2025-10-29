# 🚀 Deploy to Vercel - Step by Step

## Current Status ✅

Your site is **100% ready** for Vercel deployment!

✅ Build passes: `npm run build`  
✅ No errors or warnings  
✅ All routes configured correctly  
✅ i18n working (en, hi, ta)  
✅ TinaCMS optional (ready when needed)  
✅ Sitemap generation configured  

---

## Quick Deploy (Recommended)

### Method 1: Via GitHub (Best for CI/CD)

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Ready for production - all fixes applied"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "Add New Project"
   - Select your repository
   - Vercel auto-detects Next.js ✅
   - Click "Deploy"

3. **Done!** Your site is live 🎉

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI globally (one time)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## Environment Variables (Optional)

If you want to use TinaCMS later or configure the sitemap:

1. Go to **Project Settings** → **Environment Variables**
2. Add these (if needed):

```bash
# For TinaCMS (optional)
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token

# For custom domain
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## After Deployment

Your site will be available at:
- **Production**: `https://ilh-site.vercel.app` (or your custom domain)
- **Preview**: Automatic preview deployments for every push

### Test These URLs

- `/en` - Homepage (English)
- `/en/guides/headache` - Guide example
- `/en/remedies/arsenicum-album` - Remedy example
- `/admin` - Admin panel (shows instructions)
- `/health` - Health check API

---

## Auto-Deployment

Once connected to GitHub:
- Every push to `main` → production deployment
- Pull requests → preview deployments
- Automatic rollback on failure

---

## Next Steps (Post-Deploy)

1. **Add custom domain** (optional)
   - Settings → Domains
   - Add your domain
   - Update DNS as instructed

2. **Enable TinaCMS** (when ready)
   - Get credentials from tina.io
   - Add env variables
   - Redeploy

3. **Add content**
   - Edit MDX files in `content/en/`
   - Push to git
   - Auto-deploys ✨

4. **Monitor**
   - Analytics: Vercel dashboard
   - Logs: Vercel dashboard → Deployments

---

## Troubleshooting

**Build fails?**
- Check the build logs in Vercel dashboard
- Run `npm run build` locally first

**Routes not working?**
- Verify middleware.ts is included
- Check language prefixes in URLs

**Need help?**
- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs

---

## 🎯 You're Ready!

Everything is configured. Just push to GitHub and deploy! 🚀

