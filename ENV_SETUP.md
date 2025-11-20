# Environment Variables - Copy & Paste

## 🎨 VERCEL (Frontend)

Add these in **Vercel Dashboard → Settings → Environment Variables**

```
VITE_API_BASE_URL=https://your-app-name.onrender.com
VITE_ADMIN_EMAIL=admin@yourdomain.com
```

---

## 🖥️ RENDER (Backend)

Add these in **Render Dashboard → Your Service → Environment**

```
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here
PING_MESSAGE=pong
NODE_ENV=production
```

---

## 📝 Quick Setup Steps

### Vercel:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Add each variable (name + value)
6. Select environment: **Production, Preview, Development**
7. Click **Save**

### Render:
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Select your backend service
3. Click **Environment** tab
4. Click **"Add Environment Variable"**
5. Add each variable (name + value)
6. Click **"Save Changes"**
7. Service will auto-redeploy

---

## ⚠️ Replace These Values:

- `your-app-name.onrender.com` → Your actual Render backend URL
- `your-vercel-app.vercel.app` → Your actual Vercel frontend URL  
- `admin@yourdomain.com` → Your admin email
- `your-secure-password-here` → Strong password for admin

---

## ✅ After Setup:

- Vercel will redeploy automatically
- Render will redeploy automatically
- Test admin login with your credentials
- Verify API calls work from frontend to backend

