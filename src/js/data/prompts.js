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
  const formData = collectFormData();
  const prompt = generateDetailedPrompt(formData);

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
}
