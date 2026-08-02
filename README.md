# 💌 Zat Valentine

A cute customizable "Will you be my Valentine?" page built with React + Vite + Tailwind.
Fully static — perfect for GitHub Pages.

## 🚀 Deploy to GitHub Pages (one-time setup)

### Option A — Auto deploy via GitHub Actions (recommended)

1. **Create a new repo on GitHub** (e.g. `zat-valentine`).
2. **Push this project** to it:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. If your repo name is **NOT** `<username>.github.io`, you must set the base path.
   Go to **Settings → Secrets and variables → Actions → Variables** and add:
   - **Name:** `VITE_BASE`
   - **Value:** `/<REPO-NAME>/`  (e.g. `/zat-valentine/` — mind the leading/trailing slash)
5. Push any commit — the `Deploy to GitHub Pages` workflow will build and publish it.
   Your site will be at:
   - `https://<username>.github.io/<repo-name>/`  *(project repo)*
   - `https://<username>.github.io/`  *(if repo is named `<username>.github.io`)*

### Option B — Manual build & deploy branch

```bash
npm install --legacy-peer-deps
VITE_BASE="/<REPO-NAME>/" npm run build
# then push contents of dist/ to a `gh-pages` branch
```

## 🖥️ Run locally

```bash
npm install --legacy-peer-deps
npm run dev
```
Then open http://localhost:5173

## 🛠️ Build

```bash
npm run build
npm run preview
```

## 📁 Structure

```
client/
  index.html       # HTML entry
  public/          # Static files (favicon, 404.html)
  src/
    App.tsx        # Router
    main.tsx       # React entry
    pages/         # Home + NotFound
    components/    # UI components (shadcn/radix)
    contexts/      # Theme
    hooks/         # Custom hooks
    lib/           # Utilities
    index.css      # Tailwind + theme
vite.config.ts     # Vite config (reads VITE_BASE for GH Pages)
.github/workflows/ # Auto deploy workflow
```

## ✏️ Customize

Open `client/src/pages/Home.tsx` — everything (gallery, colors, texts, questions) is defined at the top of the file as arrays. Change the images/messages and push — the workflow will redeploy automatically.

## 📝 License

MIT
