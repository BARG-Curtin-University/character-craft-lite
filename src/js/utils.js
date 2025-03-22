// utils.js - ES6 module version

// Set this to true to enable debug logging, false to disable all console.log outputs
export const DEBUG = false;

/**
 * Logger utility that only outputs when DEBUG is true
 * Use this instead of console.log throughout the application
 */
export function log(...args) {
  if (DEBUG) {
    console.log(...args);
  }
}

/**
 * Error logger - always log errors regardless of DEBUG setting
 */
export function logError(...args) {
  console.error(...args);
}

/**
 * Creates a summary item HTML for display
 */
export function createSummaryItem(label, value) {
  return `
    <div class="summary-item">
      <div class="summary-label">${label}:</div>
      <div class="summary-value">${value}</div>
    </div>
  `;
}

/**
 * Gets a random item from an array
 */
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Safely gets an element by ID and handles the case where it might not exist
 */
export function getElementValueById(id, defaultValue = '') {
  const element = document.getElementById(id);
  return element ? element.value || defaultValue : defaultValue;
}

/**
 * Check if a string is empty or only contains whitespace
 */
export function isEmptyString(str) {
  return !str || str.trim() === '';
}

/**
 * Sanitizes a string for use in HTML
 */
export function sanitizeHTML(str) {
  const element = document.createElement('div');
  element.textContent = str;
  return element.innerHTML;
}

/**
 * Debounces a function to limit how often it can run
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

