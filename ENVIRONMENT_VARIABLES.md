# Environment Variables Guide

This document lists all environment variables needed for deploying the Stock Media Platform to **Vercel** (frontend) and **Render** (backend).

---

## 🎨 Vercel (Frontend) Environment Variables

Add these in your Vercel project settings: **Settings → Environment Variables**

### Required Variables

```bash
# API Base URL (Your Render backend URL)
VITE_API_BASE_URL=https://your-app-name.onrender.com

# Admin Email (for admin access)
VITE_ADMIN_EMAIL=your-admin@email.com
```

### Optional Variables (Firebase - if using Firebase Auth)

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### How to Add in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Select the environments (Production, Preview, Development)
5. Click **Save**

**Note:** Vercel uses `VITE_` prefix for environment variables that should be exposed to the client-side code.

---

## 🖥️ Render (Backend) Environment Variables

Add these in your Render service settings: **Environment** tab

### Required Variables

```bash
# Server Port (Render automatically sets this, but you can override)
PORT=10000

# Allowed Origins (comma-separated list of frontend URLs)
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,https://www.yourdomain.com

# Admin Credentials (for admin login)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here
```

### Optional Variables

```bash
# Ping Message (for health check endpoint)
PING_MESSAGE=pong

# Node Environment
NODE_ENV=production
```

### Cloudinary Configuration (if using Cloudinary)

The Cloudinary credentials are currently hardcoded in `server/config/cloudinary.ts`. For better security, you can move them to environment variables:

```bash
# Cloudinary Account 1
CLOUDINARY_CLOUD_NAME_1=dk81tgmae
CLOUDINARY_API_KEY_1=255731855284435
CLOUDINARY_API_SECRET_1=your_secret_key

# Cloudinary Account 2
CLOUDINARY_CLOUD_NAME_2=dxijk3ivo
CLOUDINARY_API_KEY_2=155419187991824
CLOUDINARY_API_SECRET_2=your_secret_key

# Cloudinary Account 3
CLOUDINARY_CLOUD_NAME_3=dvdtbffva
CLOUDINARY_API_KEY_3=767879943653787
CLOUDINARY_API_SECRET_3=your_secret_key
```

### How to Add in Render:

1. Go to your Render dashboard
2. Select your service (backend API)
3. Navigate to **Environment** tab
4. Click **Add Environment Variable**
5. Add each variable with its value
6. Click **Save Changes**

**Note:** After adding environment variables, Render will automatically redeploy your service.

---

## 📋 Quick Setup Checklist

### Vercel Setup:
- [ ] Add `VITE_API_BASE_URL` pointing to your Render backend
- [ ] Add `VITE_ADMIN_EMAIL` for admin access
- [ ] (Optional) Add Firebase variables if using Firebase auth

### Render Setup:
- [ ] Add `ALLOWED_ORIGINS` with your Vercel frontend URL
- [ ] Add `ADMIN_EMAIL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`
- [ ] (Optional) Add Cloudinary variables if you want to use env vars instead of hardcoded values
- [ ] (Optional) Add `PING_MESSAGE` for custom health check response

---

## 🔒 Security Best Practices

1. **Never commit sensitive values** to Git
2. **Use strong passwords** for admin credentials
3. **Rotate credentials** periodically
4. **Limit ALLOWED_ORIGINS** to only your production domains
5. **Use different credentials** for development and production
6. **Enable 2FA** on your Vercel and Render accounts

---

## 🧪 Testing Environment Variables

### Test Vercel Variables:
After deployment, check the browser console for:
- API calls should go to your Render backend
- Admin login should work with your admin email

### Test Render Variables:
1. Check the `/api/ping` endpoint returns your `PING_MESSAGE`
2. Try admin login with your `ADMIN_EMAIL` and `ADMIN_PASSWORD`
3. Verify CORS is working by checking browser network requests

---

## 📝 Example Configuration

### Vercel (Production):
```bash
VITE_API_BASE_URL=https://stock-media-api.onrender.com
VITE_ADMIN_EMAIL=admin@stockmedia.com
```

### Render (Production):
```bash
PORT=10000
ALLOWED_ORIGINS=https://stock-media.vercel.app,https://www.stockmedia.com
ADMIN_EMAIL=admin@stockmedia.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=SecureP@ssw0rd123!
PING_MESSAGE=Stock Media API is running
NODE_ENV=production
```

---

## 🆘 Troubleshooting

### Issue: CORS errors in browser
**Solution:** Make sure your Vercel URL is included in Render's `ALLOWED_ORIGINS`

### Issue: API calls failing
**Solution:** Verify `VITE_API_BASE_URL` in Vercel matches your Render service URL

### Issue: Admin login not working
**Solution:** Check that `ADMIN_EMAIL` and `ADMIN_PASSWORD` in Render match what you're using to login

### Issue: Environment variables not updating
**Solution:** 
- Vercel: Redeploy after adding variables
- Render: Service auto-redeploys when you save environment variables

---

## 📚 Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [Render Environment Variables Documentation](https://render.com/docs/environment-variables)

---

**Last Updated:** 2025-01-XX

