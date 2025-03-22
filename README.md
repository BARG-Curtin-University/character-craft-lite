# PersonaMate - Lite
**Design the soul behind the chatbot.**

PersonaMate is a personality configuration tool for creating structured chatbot personas for use in RAG pipelines, zero-shot prompt templates, and educational or enterprise-grade conversational agents.

### Quick Links
- [Live Web App](https://barg-curtin-university.github.io/personamate-lite/)
- [Standalone Version](https://barg-curtin-university.github.io/personamate-lite/personamate-standalone.html) (single HTML file you can download and use offline)

### 🔧 Features
- 🎭 Define chatbot personality traits including tone, role, communication style, and values
- 📚 Incorporate OB theory (e.g., Maslow, Tuckman, Servant Leadership)
- ⚙️ Export-ready for LLM prompts (supports Claude, GPT, open-source models)
- 🧠 Designed for RAG pipelines, voice interfaces, and immersive training bots
- 📝 Includes structured profile + natural language summary output
- 📲 Installable on desktop and mobile
- 🔌 Works offline after first load
- 🚨 Checks for version updates with visual notification
- ⚡ Fully client-side – no backend required

### 📘 Use Cases
- LLM role-play simulation (e.g., educational scenarios, training interviews)
- AI assistant configuration for apps, bots, or support tools
- Prompt engineering for contextual personality grounding
- Generating character datasets for research

### 🛠 Tech Stack
- HTML/CSS/JS frontend
- No backend dependencies (fully client-side)
- Easily extendable for use in React/Vue or backend LLM platforms

---

## 📦 What's Included

- `index.html` – Your main HTML file (replace the content block with your full app)
- `manifest.json` – Enables PWA install on desktop and mobile
- `service-worker.js` – Caches content for offline use
- `version.json` – Used to check for available updates
- `update-check.js` – Shows a banner if a new version is available
- `icons/` – App icons for installation prompts and favicon use
- `package.json` – Includes scripts for building different versions:
  - `npm run build` – Standard web build
  - `npm run build:pwa` – PWA with enhanced offline capabilities
  - `npm run build:single` – Optimized single-file build
  - `npm run bundle` – Standalone HTML file for sharing

---

## 🚀 Getting Started

1. + Replace the UI section inside `index.html` (`<div id="app">`) with your existing single-file HTML+CSS+JS code
2. Host the folder on **GitHub Pages**, **Netlify**, or any HTTPS host.
3. (Optional) Update the version number in both:
   - `version.json`
   - `update-check.js` or `index.html` where `currentVersion` is defined
4. Add your favicon/icon to `icons/icon-192.png` and `icon-512.png` if you want to customize branding.

---

## 🌐 Hosting on GitHub Pages

If you're using GitHub:

1. Push this folder to your repo
2. Go to **Repo Settings → Pages**
3. Set the source to `main` branch (root or `/docs`)
4. Your site will be live at `https://yourusername.github.io/repo-name`

---

## 🔧 Customizing

- Want API integration? Use `fetch()` from your JS to hit remote endpoints.
- Want more advanced caching? Extend the `service-worker.js`.
- Want full packaging? This project can also be wrapped in [Tauri](https://tauri.app/) or [Electron](https://www.electronjs.org/).

---

Perfect — and great job setting it up yourself! 🎉 Now let’s walk through how this change affects hosting, your README, and where the GitHub Pages link points.

---

## ✅ Hosting with GitHub Pages (after using Parcel)

### 🔧 After `npm run build` (using Parcel):
- The output is placed in your `/dist` folder.
- This folder contains your final optimized `index.html`, bundled CSS/JS, manifest, etc.
- **This is what you'll host on GitHub Pages**.

---

## 🌐 How to Link GitHub Pages to `/dist` Output

1. In your repo, go to **Settings → Pages**  
2. Under **“Source”**, choose:
   - **Branch:** `main`
   - **Folder:** `dist/`  
   (Make sure it's not `root` — you want GitHub to serve from `dist/`)

3. GitHub will deploy the latest contents of `/dist/` as your live site.

📍 Your site will be available at:
```
https://<your-username>.github.io/<repo-name>/
```

---

## 🔧 Build Instructions

This project uses [Parcel](https://parceljs.org) to bundle and optimize assets.

### Install & Build

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build standard web version
npm run build

# Build PWA version with Workbox
npm run build:pwa

# Build single-file version (useful for sharing)
npm run build:single

# Create standalone HTML file (can be emailed or directly shared)
npm run bundle
```

The optimized, production-ready version will be output to the `dist/` folder for regular builds.  
The standalone version will be available in the `standalone/` folder.

Deploy the `dist/` folder to GitHub Pages or any static hosting provider.
```

---

## 🔁 Bonus: If You Want Auto-Deploy (GitHub Actions)

Now that you're using `/dist`, you can automate this with the [GitHub Actions workflow](#previous-message) to:

- Run `npm run build`
- Push `/dist` to the `gh-pages` branch
- Host via GitHub Pages from that branch

This is useful if your main branch gets busy, and you don’t want to commit build artifacts to it.

---

### ✅ Summary

| Task | What to do |
|------|------------|
| **Parcel output** | Use `/dist` folder |
| **GitHub Pages config** | Set source to `dist/` folder |
| **README** | Add build instructions |
| **Automation (optional)** | Use GitHub Actions to build & deploy |
| **Live site** | `https://<username>.github.io/<repo-name>/` |

Let me know if you'd like a live preview banner for your README or want help automating version bumps for `version.json`!

---

## 🧠 About PersonaMate

PersonaMate helps you generate structured chatbot personas grounded in behavioral theory. It's designed for:
- Retrieval-Augmented Generation (RAG) pipelines
- Zero-shot prompt scaffolding
- Education, research, and AI development

More taglines, descriptions, and branding assets can be found in [`docs/blurbs.md`](docs/blurbs.md).

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ for AI developers, educators, and conversation designers.


## Acknowledgements
> Portions of this document and associated project materials were created with the assistance of AI tools, including natural language generation and code scaffolding.
> All final content, structure, and implementation decisions were reviewed and approved by Michael Borck.
