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

// Make sure the event listeners work regardless of how the app is loaded
function initializeEventListeners() {
  console.log("✅ PersonaMate ready");

  fetch('./version.json')
    .then(res => res.json())
    .then(data => checkForUpdates(data.version))
    .catch(() => checkForUpdates("1.0.0"));  // fallback to 1.0.0 if version.json not found

  // Bind buttons to imported functions
  const generateBtn = document.querySelector(".btn-generate");
  const randomBtn = document.querySelector(".btn-random");
  const resetBtns = document.querySelectorAll(".btn-reset");

  document.querySelector('.btn-copy')?.addEventListener('click', copyToClipboard);
  document.querySelector('.btn-download')?.addEventListener('click', downloadProfile);
  document.querySelector('.btn-generate-prompt')?.addEventListener('click', generateLLMPrompt);
  document.querySelector('.btn-generate-rag')?.addEventListener('click', generateRAGDocument);
  
  resetBtns.forEach(btn =>
    btn.addEventListener('click', () => resetForm(true))
  );

  if (generateBtn) {
    generateBtn.addEventListener("click", generatePersonality);
    console.log("Generate button listener added");
  }

  if (randomBtn) {
    randomBtn.addEventListener("click", generateRandomPersonality);
    console.log("Random button listener added");
  }

  // Set up navigation buttons
  document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentSection = document.querySelector('.form-section.active');
      const nextSection = currentSection.nextElementSibling;
      
      if (nextSection && nextSection.classList.contains('form-section')) {
        currentSection.classList.remove('active');
        nextSection.classList.add('active');
        
        // Update progress dots
        const currentDot = document.querySelector(`.progress-dot[data-section="${currentSection.dataset.section}"]`);
        const nextDot = document.querySelector(`.progress-dot[data-section="${nextSection.dataset.section}"]`);
        
        if (currentDot) currentDot.classList.remove('active');
        if (nextDot) nextDot.classList.add('active');
      }
    });
  });

  document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const currentSection = document.querySelector('.form-section.active');
      const prevSection = currentSection.previousElementSibling;
      
      if (prevSection && prevSection.classList.contains('form-section')) {
        currentSection.classList.remove('active');
        prevSection.classList.add('active');
        
        // Update progress dots
        const currentDot = document.querySelector(`.progress-dot[data-section="${currentSection.dataset.section}"]`);
        const prevDot = document.querySelector(`.progress-dot[data-section="${prevSection.dataset.section}"]`);
        
        if (currentDot) currentDot.classList.remove('active');
        if (prevDot) prevDot.classList.add('active');
      }
    });
  });
}

// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeEventListeners);

// Also provide a way to manually initialize in case the DOMContentLoaded event
// has already fired by the time the script runs (which can happen in some bundling scenarios)
window.initializePersonaMate = initializeEventListeners;

// If the document is already loaded, run initialization immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initializeEventListeners, 500); // Small delay to ensure DOM is fully processed
}
