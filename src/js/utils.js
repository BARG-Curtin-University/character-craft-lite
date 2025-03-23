// utils.js - ES6 module version

// Set this to true to enable debug logging, false to disable all console.log outputs
export const DEBUG = false;

/**
 * Logger utility that only outputs when DEBUG is true.
 * Use this instead of console.log throughout the application.
 * 
 * @param {...*} args - The arguments to log to the console
 */
export function log(...args) {
  if (DEBUG) {
    console.log(...args);
  }
}

/**
 * Error logger - always log errors regardless of DEBUG setting.
 * 
 * @param {...*} args - The error arguments to log to the console
 */
export function logError(...args) {
  console.error(...args);
}

/**
 * Creates a summary item HTML for display.
 * 
 * @param {string} label - The label for the summary item
 * @param {string} value - The value to display
 * @returns {string} HTML string for the summary item
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
 * Gets a random item from an array.
 * 
 * @param {Array<*>} array - The array to select from
 * @returns {*} A randomly selected item from the array
 */
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Safely gets an element by ID and handles the case where it might not exist.
 * 
 * @param {string} id - The ID of the element to find
 * @param {string} defaultValue - The default value to return if element not found
 * @returns {string} The value of the element or the default value
 */
export function getElementValueById(id, defaultValue = '') {
  const element = document.getElementById(id);
  return element ? element.value || defaultValue : defaultValue;
}

/**
 * Check if a string is empty or only contains whitespace.
 * 
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is empty or contains only whitespace
 */
export function isEmptyString(str) {
  return !str || str.trim() === '';
}

/**
 * Sanitizes a string for use in HTML.
 * 
 * @param {string} str - The string to sanitize
 * @returns {string} The sanitized HTML string
 */
export function sanitizeHTML(str) {
  const element = document.createElement('div');
  element.textContent = str;
  return element.innerHTML;
}

/**
 * Debounces a function to limit how often it can run.
 * 
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time in milliseconds to wait between executions
 * @returns {Function} The debounced function
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