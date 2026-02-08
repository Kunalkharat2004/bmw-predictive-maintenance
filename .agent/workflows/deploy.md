---
description: Step-by-step deployment workflow for frontend (Vercel) and backend (DigitalOcean)
---

# 🚀 Deployment Workflow

## Pre-Deployment Checklist

- [ ] Backend `.env` file is NOT committed to git
- [ ] All code changes are committed to GitHub
- [ ] Large CSV files are excluded from the repo (`.gitignore`)
- [ ] Models folder (`backend/models/`) contains the trained `.h5` files

---

## Phase 1: Push Code to GitHub

### Step 1. Initialize Git Repository (if not done)
```bash
cd "c:\Users\kunal sachin kharat\OneDrive\Desktop\New folder\Predictive Maintenance and Vehicle health monitoring"
git init
git add .
git commit -m "Initial commit for deployment"
```

### Step 2. Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create a new repository (e.g., `vehicle-health-monitoring`)
3. Do NOT initialize with README (we already have code)

### Step 3. Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/vehicle-health-monitoring.git
git branch -M main
git push -u origin main
```

---

## Phase 2: Deploy Backend on DigitalOcean App Platform

### Step 1. Login to DigitalOcean
1. Go to [cloud.digitalocean.com](https://cloud.digitalocean.com/)
2. Navigate to **Apps** → **Create App**

### Step 2. Connect GitHub Repository
1. Choose **GitHub** as source
2. Authorize DigitalOcean to access your GitHub
3. Select your repository: `vehicle-health-monitoring`
4. Branch: `main`

### Step 3. Configure App Settings
| Setting | Value |
|---------|-------|
| **Source Directory** | `/backend` |
| **Type** | Dockerfile |
| **HTTP Port** | `8080` |
| **Instance Size** | Basic ($5/mo) or Basic XS ($10/mo for TensorFlow) |

### Step 4. Add Environment Variables
Click **Edit** next to "Environment Variables" and add:

| Key | Value | Type |
|-----|-------|------|
| `FLASK_ENV` | `production` | General |
| `PORT` | `8080` | General |
| `CORS_ORIGINS` | `https://your-app.vercel.app` (update later) | General |
| `SECRET_KEY` | Generate a random string | **Secret** |
| `TWILIO_ACCOUNT_SID` | Your Twilio SID | **Secret** |
| `TWILIO_AUTH_TOKEN` | Your Twilio token | **Secret** |
| `TWILIO_PHONE_NUMBER` | Your Twilio number | **Secret** |
| `GOOGLE_MAPS_API_KEY` | Your Google API key | **Secret** |

### Step 5. Deploy
1. Click **Review** → **Create Resources**
2. Wait for build to complete (5-10 minutes for TensorFlow)
3. Note your app URL: `https://vehicle-health-api-xxxxx.ondigitalocean.app`

### Step 6. Verify Backend
Test the health endpoint:
```bash
curl https://YOUR-BACKEND-URL.ondigitalocean.app/health
```
Expected response:
```json
{"status": "healthy", "message": "Vehicle Health Monitoring API is running", "version": "1.0.0"}
```

---

## Phase 3: Deploy Frontend on Vercel

### Step 1. Login to Vercel
1. Go to [vercel.com](https://vercel.com/)
2. Click **Add New** → **Project**

### Step 2. Import Repository
1. Connect GitHub and select your repository
2. Select the repository: `vehicle-health-monitoring`

### Step 3. Configure Build Settings
| Setting | Value |
|---------|-------|
| **Root Directory** | `frontend` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Step 4. Add Environment Variables
| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `https://YOUR-BACKEND-URL.ondigitalocean.app/api` |

> ⚠️ **Important**: Replace `YOUR-BACKEND-URL` with your actual DigitalOcean app URL from Phase 2

### Step 5. Deploy
1. Click **Deploy**
2. Wait for build to complete (~2 minutes)
3. Note your frontend URL: `https://your-app.vercel.app`

---

## Phase 4: Connect Frontend & Backend (CORS)

### Step 1. Update DigitalOcean CORS
1. Go to DigitalOcean → Apps → Your App → Settings
2. Find `CORS_ORIGINS` environment variable
3. Update value to: `https://your-app.vercel.app`
4. Click **Save** → App will redeploy automatically

---

## Phase 5: Verification

### Test 1: Frontend Loads
- Visit your Vercel URL
- Page should load without errors

### Test 2: API Connection
- Open browser DevTools (F12) → Network tab
- Perform an action that calls the API
- Verify API calls go to DigitalOcean URL and return 200

### Test 3: Health Check
```bash
curl https://YOUR-BACKEND-URL.ondigitalocean.app/health
```

### Test 4: Prediction Endpoint
```bash
curl -X POST https://YOUR-BACKEND-URL.ondigitalocean.app/api/predict \
  -H "Content-Type: application/json" \
  -d '{"features": [0.8, 0.9, 360, -25, 32, 65, 0.6, 2200, 0.25, 8, 45, 0.85]}'
```

---

## Troubleshooting

### Problem: Build fails on DigitalOcean
**Solution**: Check build logs. Common issues:
- Missing dependencies in `requirements.txt`
- TensorFlow needs more memory → upgrade to Basic XS ($10/mo)

### Problem: CORS errors in browser
**Solution**: Ensure `CORS_ORIGINS` in DigitalOcean includes your exact Vercel URL (with https://)

### Problem: API calls fail with 500
**Solution**: Check DigitalOcean runtime logs for Python errors

### Problem: Models not loading
**Solution**: Ensure `models/` folder with `.h5` files is committed to GitHub

---

## Cost Summary

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Vercel Frontend | Hobby | **Free** |
| DigitalOcean Backend | Basic ($5) or Basic XS ($10) | **$5-10** |
| **Total** | | **$5-10/month** |

With your $100 DigitalOcean credit, you have **10-20 months** of free backend hosting!

---

## Quick Reference URLs

After deployment, update these:

| Service | URL |
|---------|-----|
| **Frontend** | `https://______________.vercel.app` |
| **Backend** | `https://______________.ondigitalocean.app` |
| **Health Check** | `https://______________.ondigitalocean.app/health` |
