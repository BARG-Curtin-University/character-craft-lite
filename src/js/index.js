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
  try {
    console.log("✅ PersonaMate initialization starting");
    
    // Debug info
    console.log("Document readyState:", document.readyState);
    console.log("Available buttons:", {
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
    console.log("Function availability:", {
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
        console.warn("Version check failed:", err);
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
          console.log("Copy button clicked");
          try {
            copyToClipboard();
          } catch (err) {
            console.error("Error in copyToClipboard:", err);
          }
        });
        console.log("Copy button listener added");
      }
      
      const downloadBtn = document.querySelector('.btn-download');
      if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
          console.log("Download button clicked");
          try {
            downloadProfile();
          } catch (err) {
            console.error("Error in downloadProfile:", err);
          }
        });
        console.log("Download button listener added");
      }
      
      const promptBtn = document.querySelector('.btn-generate-prompt');
      if (promptBtn) {
        promptBtn.addEventListener('click', function(e) {
          console.log("Prompt button clicked");
          try {
            generateLLMPrompt();
          } catch (err) {
            console.error("Error in generateLLMPrompt:", err);
          }
        });
        console.log("Prompt button listener added");
      }
      
      const ragBtn = document.querySelector('.btn-generate-rag');
      if (ragBtn) {
        ragBtn.addEventListener('click', function(e) {
          console.log("RAG button clicked");
          try {
            generateRAGDocument();
          } catch (err) {
            console.error("Error in generateRAGDocument:", err);
          }
        });
        console.log("RAG button listener added");
      }
    
      if (resetBtns.length > 0) {
        resetBtns.forEach(btn => {
          btn.addEventListener('click', function(e) {
            console.log("Reset button clicked");
            try {
              resetForm(true);
            } catch (err) {
              console.error("Error in resetForm:", err);
            }
          });
        });
        console.log("Reset button listeners added: " + resetBtns.length);
      }

      if (generateBtn) {
        generateBtn.addEventListener("click", function(e) {
          console.log("Generate button clicked");
          try {
            generatePersonality();
          } catch (err) {
            console.error("Error in generatePersonality:", err);
          }
        });
        console.log("Generate button listener added");
      }

      if (randomBtn) {
        randomBtn.addEventListener("click", function(e) {
          console.log("Random button clicked");
          try {
            generateRandomPersonality();
          } catch (err) {
            console.error("Error in generateRandomPersonality:", err);
          }
        });
        console.log("Random button listener added");
      }
    } catch (err) {
      console.error("Error setting up button listeners:", err);
    }

    // Set up navigation buttons
    try {
      const nextButtons = document.querySelectorAll('.btn-next');
      if (nextButtons.length > 0) {
        nextButtons.forEach(btn => {
          btn.addEventListener('click', (e) => {
            console.log("Next button clicked");
            try {
              const currentSection = document.querySelector('.form-section.active');
              console.log("Current section:", currentSection?.dataset?.section);
              
              if (!currentSection) {
                console.error("No active section found");
                return;
              }
              
              const nextSection = currentSection.nextElementSibling;
              console.log("Next section:", nextSection?.dataset?.section);
              
              if (nextSection && nextSection.classList.contains('form-section')) {
                currentSection.classList.remove('active');
                nextSection.classList.add('active');
                
                // Update progress dots
                const currentDot = document.querySelector(`.progress-dot[data-section="${currentSection.dataset.section}"]`);
                const nextDot = document.querySelector(`.progress-dot[data-section="${nextSection.dataset.section}"]`);
                
                console.log("Current dot:", currentDot);
                console.log("Next dot:", nextDot);
                
                if (currentDot) currentDot.classList.remove('active');
                if (nextDot) nextDot.classList.add('active');
              } else {
                console.warn("No next section found or it's not a form section");
              }
            } catch (err) {
              console.error("Error in next button handler:", err);
            }
          });
        });
        console.log("Next button listeners added: " + nextButtons.length);
      }

      const prevButtons = document.querySelectorAll('.btn-prev');
      if (prevButtons.length > 0) {
        prevButtons.forEach(btn => {
          btn.addEventListener('click', (e) => {
            console.log("Prev button clicked");
            try {
              const currentSection = document.querySelector('.form-section.active');
              console.log("Current section:", currentSection?.dataset?.section);
              
              if (!currentSection) {
                console.error("No active section found");
                return;
              }
              
              const prevSection = currentSection.previousElementSibling;
              console.log("Previous section:", prevSection?.dataset?.section);
              
              if (prevSection && prevSection.classList.contains('form-section')) {
                currentSection.classList.remove('active');
                prevSection.classList.add('active');
                
                // Update progress dots
                const currentDot = document.querySelector(`.progress-dot[data-section="${currentSection.dataset.section}"]`);
                const prevDot = document.querySelector(`.progress-dot[data-section="${prevSection.dataset.section}"]`);
                
                console.log("Current dot:", currentDot);
                console.log("Previous dot:", prevDot);
                
                if (currentDot) currentDot.classList.remove('active');
                if (prevDot) prevDot.classList.add('active');
              } else {
                console.warn("No previous section found or it's not a form section");
              }
            } catch (err) {
              console.error("Error in prev button handler:", err);
            }
          });
        });
        console.log("Prev button listeners added: " + prevButtons.length);
      }
    } catch (err) {
      console.error("Error setting up navigation buttons:", err);
    }
  } catch (err) {
    console.error("General initialization error:", err);
  }
}

// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeEventListeners);

// Also provide a way to manually initialize in case the DOMContentLoaded event
// has already fired by the time the script runs (which can happen in some bundling scenarios)
window.initializePersonaMate = initializeEventListeners;

// If the document is already loaded, run initialization immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log("Document already ready, initializing with delay");
  setTimeout(initializeEventListeners, 500); // Small delay to ensure DOM is fully processed
}

// Add a global error handler to catch any JS errors
window.addEventListener('error', function(event) {
  console.error('Global error caught:', event.error);
  return false;
});

// Add manual initialization via console for debugging
console.log("Debug tip: You can manually initialize by typing window.initializePersonaMate() in the console");

// Add debug button
document.addEventListener('DOMContentLoaded', function() {
  // Add a debug button to the bottom of the page
  const debugButton = document.createElement('button');
  debugButton.textContent = "Debug: Re-initialize JS";
  debugButton.style.position = 'fixed';
  debugButton.style.bottom = '10px';
  debugButton.style.right = '10px';
  debugButton.style.zIndex = '9999';
  debugButton.style.background = '#ff5722';
  debugButton.style.color = 'white';
  debugButton.style.border = 'none';
  debugButton.style.padding = '8px 16px';
  debugButton.style.borderRadius = '4px';
  debugButton.style.cursor = 'pointer';
  
  debugButton.addEventListener('click', function() {
    console.clear();
    console.log("Manual re-initialization triggered");
    initializeEventListeners();
  });
  
  document.body.appendChild(debugButton);
});