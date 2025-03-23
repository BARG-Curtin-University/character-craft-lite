// index.js - Clean ES6+ Module Entrypoint

// 📦 Core logic (utility-first)
import './utils.js';
import './data/models.js';
import { log, logError } from './utils.js';

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
import { setupChipSelectors } from './inputs.js';

// Somewhere in your update-check.js or index.js
fetch('version.json')
  .then(res => res.json())
  .then(data => {
    const versionEl = document.getElementById('appVersion');
    if (versionEl) versionEl.textContent = data.version || 'N/A';
  });

document.addEventListener('DOMContentLoaded', () => {
  setupChipSelectors();
});


// Make sure the event listeners work regardless of how the app is loaded
function initializeEventListeners() {
  try {
    log("✅ CharacterCraft initialization starting");
    
    // Debug info
    log("Document readyState:", document.readyState);
    log("Available buttons:", {
      generate: !!document.querySelector(".btn-generate"),
      generateById: !!document.getElementById("generateBtn"),
      random: !!document.querySelector(".btn-random"),
      randomById: !!document.getElementById("generateRandomBtn"),
      reset: document.querySelectorAll(".btn-reset").length,
      resetById: !!document.getElementById("resetBtn"),
      copy: !!document.querySelector(".btn-copy"),
      download: !!document.querySelector(".btn-download"),
      prompt: !!document.querySelector(".btn-generate-prompt"),
      rag: !!document.querySelector(".btn-generate-rag"),
      next: document.querySelectorAll(".btn-next").length,
      prev: document.querySelectorAll(".btn-prev").length
    });
    
    // Check that functions are properly defined
    log("Function availability:", {
      generatePersonality: typeof generatePersonality === 'function',
      generateRandomPersonality: typeof generateRandomPersonality === 'function',
      resetForm: typeof resetForm === 'function',
      copyToClipboard: typeof copyToClipboard === 'function',
      downloadProfile: typeof downloadProfile === 'function',
      generateLLMPrompt: typeof generateLLMPrompt === 'function',
      generateRAGDocument: typeof generateRAGDocument === 'function'
    });

    // Version check
    fetch('./version.json')
      .then(res => res.json())
      .then(data => checkForUpdates(data.version))
      .catch(err => {
        logError("Version check failed:", err);
        checkForUpdates("1.0.0"); // fallback to 1.0.0 if version.json not found
      });

    // Bind buttons to imported functions
    const generateBtn = document.querySelector(".btn-generate");
    const randomBtn = document.querySelector(".btn-random");
    const resetBtns = document.querySelectorAll(".btn-reset");

    try {
      const copyBtn = document.querySelector('.btn-copy');
      if (copyBtn) {
        copyBtn.addEventListener('click', function(e) {
          log("Copy button clicked");
          try {
            copyToClipboard();
          } catch (err) {
            logError("Error in copyToClipboard:", err);
          }
        });
        log("Copy button listener added");
      }
      
      const downloadBtn = document.querySelector('.btn-download');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
          log("Download button clicked");
          try {
            downloadProfile();
          } catch (err) {
            logError("Error in downloadProfile:", err);
          }
        });
        log("Download button listener added");
      }
      
      const promptBtn = document.querySelector('.btn-generate-prompt');
      if (promptBtn) {
        promptBtn.addEventListener('click', function(e) {
          log("Prompt button clicked");
          try {
            generateLLMPrompt();
          } catch (err) {
            logError("Error in generateLLMPrompt:", err);
          }
        });
        log("Prompt button listener added");
      }
      
      const ragBtn = document.querySelector('.btn-generate-rag');
      if (ragBtn) {
        ragBtn.addEventListener('click', function(e) {
          log("RAG button clicked");
          try {
            generateRAGDocument();
          } catch (err) {
            logError("Error in generateRAGDocument:", err);
          }
        });
        log("RAG button listener added");
      }
    
      if (resetBtns.length > 0) {
        resetBtns.forEach(btn => {
          btn.addEventListener('click', function(e) {
            log("Reset button clicked");
            try {
              resetForm(true);
            } catch (err) {
              logError("Error in resetForm:", err);
            }
          });
        });
        log("Reset button listeners added: " + resetBtns.length);
      }

      if (generateBtn) {
        generateBtn.addEventListener("click", function(e) {
          log("Generate button clicked");
          try {
            generatePersonality();
          } catch (err) {
            logError("Error in generatePersonality:", err);
          }
        });
        log("Generate button listener added");
      }

      if (randomBtn) {
        randomBtn.addEventListener("click", function(e) {
          log("Random button clicked");
          try {
            generateRandomPersonality();
          } catch (err) {
            logError("Error in generateRandomPersonality:", err);
          }
        });
        log("Random button listener added");
      }
    } catch (err) {
      logError("Error setting up button listeners:", err);
    }

    // Set up navigation buttons
    try {
      const nextButtons = document.querySelectorAll('.btn-next');
      if (nextButtons.length > 0) {
        nextButtons.forEach(btn => {
          btn.addEventListener('click', (e) => {
            log("Next button clicked");
            try {
              const currentSection = document.querySelector('.form-section.active');
              log("Current section:", currentSection?.dataset?.section);
              
              if (!currentSection) {
                logError("No active section found");
                return;
              }
              
              const nextSection = currentSection.nextElementSibling;
              log("Next section:", nextSection?.dataset?.section);
              
              if (nextSection && nextSection.classList.contains('form-section')) {
                currentSection.classList.remove('active');
                nextSection.classList.add('active');
                
                // Update progress dots
                const currentDot = document.querySelector(`.progress-dot[data-section="${currentSection.dataset.section}"]`);
                const nextDot = document.querySelector(`.progress-dot[data-section="${nextSection.dataset.section}"]`);
                
                log("Current dot:", currentDot);
                log("Next dot:", nextDot);
                
                if (currentDot) currentDot.classList.remove('active');
                if (nextDot) nextDot.classList.add('active');
              } else {
                log("No next section found or it's not a form section");
              }
            } catch (err) {
              logError("Error in next button handler:", err);
            }
          });
        });
        log("Next button listeners added: " + nextButtons.length);
      }

      const prevButtons = document.querySelectorAll('.btn-prev');
      if (prevButtons.length > 0) {
        prevButtons.forEach(btn => {
          btn.addEventListener('click', (e) => {
            log("Prev button clicked");
            try {
              const currentSection = document.querySelector('.form-section.active');
              log("Current section:", currentSection?.dataset?.section);
              
              if (!currentSection) {
                logError("No active section found");
                return;
              }
              
              const prevSection = currentSection.previousElementSibling;
              log("Previous section:", prevSection?.dataset?.section);
              
              if (prevSection && prevSection.classList.contains('form-section')) {
                currentSection.classList.remove('active');
                prevSection.classList.add('active');
                
                // Update progress dots
                const currentDot = document.querySelector(`.progress-dot[data-section="${currentSection.dataset.section}"]`);
                const prevDot = document.querySelector(`.progress-dot[data-section="${prevSection.dataset.section}"]`);
                
                log("Current dot:", currentDot);
                log("Previous dot:", prevDot);
                
                if (currentDot) currentDot.classList.remove('active');
                if (prevDot) prevDot.classList.add('active');
              } else {
                log("No previous section found or it's not a form section");
              }
            } catch (err) {
              logError("Error in prev button handler:", err);
            }
          });
        });
        log("Prev button listeners added: " + prevButtons.length);
      }
    } catch (err) {
      logError("Error setting up navigation buttons:", err);
    }
  } catch (err) {
    logError("General initialization error:", err);
  }
}

// Flag to track if initialization has already happened
window.isCharacterCraftInitialized = false;

// Wrapper function to prevent multiple initializations
function safeInitialize() {
  if (window.isCharacterCraftInitialized) {
    log("CharacterCraft already initialized, skipping");
    return;
  }
  
  window.isCharacterCraftInitialized = true;
  initializeEventListeners();
}

// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', safeInitialize);

// Also provide a way to manually initialize in case the DOMContentLoaded event
// has already fired by the time the script runs (which can happen in some bundling scenarios)
window.initializeCharacterCraft = safeInitialize;

// If the document is already loaded, run initialization immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  log("Document already ready, initializing with delay");
  setTimeout(safeInitialize, 500); // Small delay to ensure DOM is fully processed
}

// Add a global error handler to catch any JS errors
window.addEventListener('error', function(event) {
  logError('Global error caught:', event.error);
  return false;
});

// Add manual initialization via console for debugging
log("Debug tip: You can manually initialize by typing window.initializeCharacterCraft() in the console");

// Debug initialization is disabled in production