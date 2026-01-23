# 🚀 Deployment Instructions - Swad Slice

## ✅ Step 1: Deploy Backend on Render

1. Go to https://render.com → Login with GitHub
2. Click **New** → **Web Service**
3. Connect repo: `priyanshu-345/swad-`
4. Settings:
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
5. **Environment Variables** (optional but recommended):
   - `FRONTEND_ORIGIN` = `https://swad-slice.netlify.app` (your Netlify URL)
6. Click **Create Web Service**
7. **Note the Render URL** (e.g., `https://swad-backend.onrender.com`)

---

## ✅ Step 2: Deploy Frontend on Netlify

1. Go to https://app.netlify.com → Login with GitHub
2. Click **Add new site** → **Import an existing project**
3. Select repo: `priyanshu-345/swad-`
4. Build settings:
   - **Base directory**: *(leave empty)*
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Publish directory**: `frontend/dist`
5. **Environment Variables** (IMPORTANT):
   - Click **Environment variables** → **Add variable**
   - Key: `VITE_API_BASE_URL`
   - Value: Your Render backend URL (e.g., `https://swad-backend.onrender.com`)
6. Click **Deploy site**
7. Wait for build to complete ✅

---

## ✅ Step 3: Update Backend CORS (if needed)

If login/register still doesn't work:

1. Go to Render dashboard → Your backend service
2. **Environment** tab → Add/Edit:
   - `FRONTEND_ORIGIN` = `https://swad-slice.netlify.app` (your actual Netlify URL)
3. **Manual Deploy** → **Deploy latest commit**

---

## 🧪 Testing

1. Open your Netlify URL: `https://swad-slice.netlify.app`
2. Try **Login** / **Register**
3. Check browser console (F12) for any errors
4. If CORS error: Update `FRONTEND_ORIGIN` in Render backend

---

## 📝 Quick Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Netlify
- [ ] `VITE_API_BASE_URL` set in Netlify (backend URL)
- [ ] `FRONTEND_ORIGIN` set in Render (Netlify URL)
- [ ] Test login/register functionality

---

## 🔧 Troubleshooting

### Login/Register not working?
1. Check browser console (F12) for errors
2. Verify `VITE_API_BASE_URL` in Netlify matches Render backend URL
3. Verify `FRONTEND_ORIGIN` in Render matches Netlify URL
4. Check Render backend logs for errors

### 404 errors on routes?
- Netlify `_redirects` file should handle this automatically
- If not, check `netlify.toml` is in root directory

---

**🎉 Done! Your site should be live and working!**

