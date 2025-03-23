// export.js - ES6+ module version for exporting personality profiles

import { elements } from './dom.js';
import { goToSection } from './navigation.js';

/**
 * Copies the generated personality profile to clipboard
 * @returns {void}
 */
export function copyToClipboard() {
  const content = getProfileContent();
  navigator.clipboard.writeText(content)
    .then(() => alert('Personality profile copied to clipboard!'))
    .catch(err => {
      console.error('Failed to copy: ', err);
      alert('Could not copy to clipboard. Please try again.');
    });
}

/**
 * Downloads the generated personality profile as a text file
 * @returns {void}
 */
export function downloadProfile() {
  const content = getProfileContent();
  const orgName = document.getElementById('orgName')?.value || 'chatbot';
  const fileName = `${orgName.replace(/\s+/g, '-').toLowerCase()}-personality-profile.txt`;
  downloadTextFile(content, fileName);
}

/**
 * Gets the complete profile content as text
 * @returns {string} The formatted personality profile text
 */
export function getProfileContent() {
  const summary = document.getElementById('personalitySummary')?.innerText || '';
  const description = document.getElementById('personalityDescription')?.innerText || '';
  return `CHATBOT PERSONALITY PROFILE\n\n${summary}\n\n${description}`;
}

/**
 * Downloads a text file with the given content and filename
 * @param {string} content - The text content to be downloaded
 * @param {string} fileName - The name of the file to be created
 * @returns {void}
 */
export function downloadTextFile(content, fileName) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = fileName;
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Resets the form to its initial state
 * @param {boolean} updateUI - Whether to update the UI after resetting the form
 * @returns {void}
 */
export function resetForm(updateUI = true) {
  document.getElementById('personalityForm')?.reset();

  document.querySelectorAll('.chip').forEach(chip => chip.classList.remove('selected'));
  document.querySelectorAll('input[type="hidden"]').forEach(input => input.value = '');
  document.querySelectorAll('.custom-input').forEach(input => input.classList.remove('visible'));

  if (updateUI) {
    if (elements.formCard) elements.formCard.style.display = 'block';
    if (elements.outputCard) elements.outputCard.classList.remove('visible');
    goToSection(1);
  }
}