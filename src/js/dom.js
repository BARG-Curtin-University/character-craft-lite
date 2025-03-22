// dom.js - ES6+ module version for DOM setup and references

/**
 * Global DOM element references used throughout the application
 */
export const elements = {
  // Form navigation elements
  sections: document.querySelectorAll('.form-section'),
  dots: document.querySelectorAll('.progress-dot'),
  nextButtons: document.querySelectorAll('.btn-next'),
  prevButtons: document.querySelectorAll('.btn-prev'),
  generateButton: document.querySelector('.btn-generate'),
  formCard: document.querySelector('.form-card'),
  outputCard: document.querySelector('.output-card'),

  // Custom inputs
  customInputs: {
    orgType: document.getElementById('customOrgType'),
    audience: document.getElementById('customAudience'),
    role: document.getElementById('customRole')
  }
};

// Track form section state
export let currentSection = 1;

/**
 * Sets up the DOM elements and initial state when the page loads
 */
export function initializeDom() {
  console.log('DOM initialized');
}

/**
 * Initializes all event listeners for the application
 */
export function initializeEventListeners() {
  console.log('Event listeners initialized');

  // Interactive chip selection
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const select = chip.closest('.chip-select');
      const hiddenInput = document.getElementById(select.id.replace('Select', ''));

      const selectedChips = select.querySelectorAll('.chip.selected');
      const values = Array.from(selectedChips).map(c => c.getAttribute('data-value'));
      hiddenInput.value = values.join(', ');
    });
  });

  // Show/hide custom inputs for dropdowns
  const dropdowns = ['orgType', 'primaryAudience', 'characterRole'];
  dropdowns.forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.addEventListener('change', () => {
        const customId = id === 'primaryAudience' ? 'customAudience' :
                         id === 'characterRole' ? 'customRole' : 'customOrgType';
        const customDiv = document.getElementById(customId);

        if (select.value === 'custom' && customDiv) {
          customDiv.classList.add('visible');
        } else if (customDiv) {
          customDiv.classList.remove('visible');
        }
      });
    }
  });
}
