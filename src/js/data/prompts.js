// prompts.js - ES6+ LLM prompt generation utilities

import { collectFormData } from './rag.js';
import { showModal } from '../modals.js';

/**
 * Generates a detailed LLM prompt from a personality profile
 * @param {Object} data - The personality data
 * @returns {string} A formatted LLM prompt
 */
export function generateDetailedPrompt(data) {
  const firstName = data.characterName ? data.characterName.split(' ')[0] : "the representative";

  // ... content omitted for brevity (unchanged content logic) ...

  return prompt;
}

/**
 * Generates and displays a modal with LLM prompt based on the current personality
 */
export function generateLLMPrompt() {
  try {
    console.log("🤖 Generating LLM prompt");
    const formData = collectFormData();
    const prompt = generateDetailedPrompt(formData);
    
    // Check if showModal is available (should be imported)
    if (typeof showModal === 'function') {
      showModal({
        title: 'LLM Prompt for Role-Play Simulation',
        content: prompt,
        instructions: `
          <p>The following prompt is specifically designed for Large Language Models (LLMs) like Claude, GPT, etc.
          It will instruct the LLM to act as a character for educational role-play scenarios based on your selected personality profile.</p>
          <p>You can copy this prompt and paste it at the beginning of your conversation with any capable LLM to create
          a customised educational experience for organisational behavior training.</p>
        `,
        copyButtonText: 'Copy Prompt',
        contentClass: 'prompt-content'
      });
    } else {
      // Fallback if modal system isn't available
      console.warn("Modal system not available, using basic alert");
      alert("LLM Prompt Generated:\n\n" + prompt + "\n\n(Copy this text to use with your preferred LLM)");
    }
    
    console.log("✅ LLM prompt generated successfully");
  } catch (error) {
    console.error("❌ Error generating LLM prompt:", error);
    alert("There was a problem generating the LLM prompt. Please try again.");
  }
}

// Make functions globally available for standalone version
if (typeof window !== 'undefined') {
  window.generateLLMPrompt = generateLLMPrompt;
  window.generateDetailedPrompt = generateDetailedPrompt;
}
