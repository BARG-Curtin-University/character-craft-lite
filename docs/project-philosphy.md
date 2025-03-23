# 📘 Project Philosophy: CharacterCraft Lite

Welcome to **CharacterCraft Lite** — a lightweight, modern, offline-friendly tool designed to help you design structured chatbot personalities. This document outlines our **project philosophy**, guiding principles, and pragmatic approach to modern JavaScript development.

---

## 💡 Guiding Principles

### 1. **Simplicity First, Complexity Later**
> Build the simplest version that works, and only introduce complexity when the need arises.
- No premature optimization.
- No framework unless it's justified.
- Flat file structure > deeply nested folders (until we outgrow it).

### 2. **Modern, Not Maximalist**
> Embrace modern JavaScript (ES6+), but don’t overdo it.
- Modules and `import/export`? ✅ Yes.
- Arrow functions, `const`/`let`, template strings? ✅ Absolutely.
- Advanced meta-frameworks and bundler gymnastics? ❌ Only if needed.

### 3. **Offline-First, Email-Friendly**
> The standalone version must work without internet or setup.
- We use a build pipeline (Parcel) to package it into a single HTML file.
- Users should be able to download and run locally with no config.

### 4. **Structure for Humans, Not Robots**
> Folder structure is organized for clarity and future maintainability.
- One file = one purpose.
- Only make folders when 2+ files belong together.
- Use descriptive names, not abbreviations.

---

## 📁 Recommended Project Structure

```
src/
├── index.html                  ← Main PWA HTML entry point
├── style.css                   ← Global styles
├── manifest.json               ← PWA metadata
├── service-worker.js           ← Offline support
├── version.json                ← Version check metadata
├── update-check.js             ← Update notification logic

├── js/
│   ├── index.js                ← Top-level import and controller
│   ├── utils.js                ← Reusable helper functions
│   ├── dom.js                  ← DOM selectors, lookups, and tweaks
│   ├── inputs.js               ← Form setup (e.g. chip selectors)
│   ├── export.js               ← Download, copy, export buttons
│   ├── modals.js               ← Reusable modal UI logic
│   ├── navigation.js           ← Wizard navigation logic
│   ├── random-personality.js   ← Surprise Me! persona generator
│   ├── generation.js           ← Personality summary + description
│   ├── data/                   ← Dropdown values and enums
│   │   └── models.js
│   ├── prompts/                ← LLM zero-shot prompt generator
│   │   └── prompts.js
│   └── documents/              ← RAG markdown document creators
│       ├── communicationDoc.js
│       ├── conflictDoc.js
│       └── ...
```

---

## 🛠️ Refactoring Rules of Thumb

- When in doubt, don’t move it yet — wait until you have at least 2–3 similar things.
- Avoid single-use folders unless growth is expected.
- Prefer splitting by **feature or document**, not by type (`helpers/`, `services/`, etc.)
- Use `index.js` to centralize logic and avoid 12 `<script>` tags in HTML.

---

## 🔁 Build Process Philosophy

- We use **Parcel** for bundling — zero-config, sensible defaults, perfect for PWA.
- We build **two versions**:
  - `dist/index.html`: Offline-ready, email-safe, single file version
  - `gh-pages`: Hosted live PWA via GitHub Pages

No need for Webpack, React, or heavy-handed frameworks unless the tool outgrows its current size.

---

## 🧭 Final Thoughts

This project exists to help users create something meaningful quickly — chatbot personalities with depth and structure. It’s also a teaching tool: clean code, modern structure, and best practices.

Keep it human. Keep it helpful. Keep it maintainable.

---

*Design the soul behind the chatbot.*

— The CharacterCraft Lite Team

