// index.js - Clean ES6+ Module Entrypoint

// 📦 Core logic (utility-first)
import './utils.js';
import './data/models.js';

// 🖼️ DOM setup (must happen early if others rely on it)
import './dom.js';

// 🧩 UI components
import './inputs.js';
import './navigation.js';
import './modals.js';

// 📤 Actions
import './export.js';
import './data/prompts.js';
import './data/rag.js';
import './generation.js';
import './random-personality.js';
import '../update-check.js';
import './register-sw.js';

import { generatePersonality } from './generation.js';
import { generateRandomPersonality } from './random-personality.js';
import { copyToClipboard, downloadProfile, resetForm } from './export.js';
import { generateLLMPrompt } from './data/prompts.js';
import { generateRAGDocument } from './data/rag.js';
import { checkForUpdates } from '../update-check.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ PersonaMate ready");

  fetch('./version.json')
    .then(res => res.json())
    .then(data => checkForUpdates(data.version))
    .catch(() => checkForUpdates("1.0.0"));  // fallback to 1.0.0 if version.json not found

  // Bind buttons to imported functions
  const generateBtn = document.getElementById("generateBtn");
  const randomBtn = document.getElementById("generateRandomBtn");
  const resetBtn = document.getElementById("resetBtn");



  document.querySelector('.btn-copy')?.addEventListener('click', copyToClipboard);
  document.querySelector('.btn-download')?.addEventListener('click', downloadProfile);
  document.querySelector('.btn-generate-prompt')?.addEventListener('click', generateLLMPrompt);
  document.querySelector('.btn-generate-rag')?.addEventListener('click', generateRAGDocument);
  document.querySelectorAll('.btn-reset').forEach(btn =>
    btn.addEventListener('click', () => resetForm(true))
  );

  if (generateBtn) {
    generateBtn.addEventListener("click", generatePersonality);
  }

  if (randomBtn) {
    randomBtn.addEventListener("click", generateRandomPersonality);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => resetForm(true));
  }

  // Optional: preload other resources or setup listeners
});
