# 🤝 Contributing to CharacterCraft Lite

Thank you for your interest in contributing! CharacterCraft Lite is a lightweight, modern, offline-friendly tool for designing structured chatbot personalities. Whether you're fixing a bug, improving UX, or cleaning up code, your help is appreciated.

---

## 📜 Philosophy

CharacterCraft Lite follows a few simple principles:

- 🧩 **Modular and minimal** — only add complexity when necessary
- 🔍 **Readable and maintainable** — future-you should understand it
- 🚫 **No frameworks unless required** — vanilla JS, HTML, and CSS where possible
- 💡 **Modern JS only where it helps** — ES6+ features welcome, but not overused
- 🛠️ **Everything must work offline** — the standalone file is our benchmark

For more, see our [Project Philosophy](./project-philosophy.md)

---

## 📁 File Structure

Follow this basic layout:

```
src/
├── index.html               ← Main app shell (PWA entry point)
├── style.css                ← Global styles
├── js/                      ← JS source files
│   ├── index.js             ← Entry point / event orchestrator
│   ├── utils.js             ← General helpers
│   ├── dom.js               ← DOM references / lookups
│   ├── modals.js            ← Modal UI logic
│   ├── inputs.js            ← Form, chips, selectors
│   ├── export.js            ← Copy, download helpers
│   ├── generation.js        ← Summary/description generator
│   ├── random-personality.js
│   ├── data/                ← Static config (e.g. genderOptions)
│   ├── prompts/             ← LLM zero-shot prompt builders
│   └── documents/           ← RAG-compatible markdown docs
```

See `docs/structure-guide.md` for a full breakdown.

---

## ✅ How to Contribute

1. **Fork the repo** and create a feature branch
2. Make atomic commits with clear messages
3. Use **ES6 modules** and export only what’s needed
4. Run the app locally with:
   ```bash
   npm install
   npm run dev
   ```
5. Test both the **PWA version** and **bundled single-file** version
6. Submit a pull request with a brief description

---

## 💅 Code Style

- Use `const` and `let` (never `var`)
- Prefer arrow functions unless clarity suffers
- Use template strings for string interpolation
- Avoid long, deeply nested functions — split when in doubt
- Use semantic HTML and accessible labels
- Keep styles in `style.css` unless component-specific

---

## 🧪 Testing

We're aiming for behavior-based testing:

- Check functionality in modern browsers
- Verify the "Surprise Me" feature generates usable profiles
- Confirm all download/copy buttons work
- Ensure everything still works offline (`npm run build`, open in browser)

---

## 🙌 Thanks!

Your contributions make this tool better, more usable, and more maintainable. Whether it's code, feedback, docs, or ideas — you're helping design the soul behind the chatbot.

Let's keep it simple, modern, and human-centered.

— The CharacterCraft Lite Team

