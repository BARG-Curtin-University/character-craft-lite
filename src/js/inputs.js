/**
 * inputs.js - DOM and form input helpers
 * Handles chips, custom inputs, and random selection from form components.
 */

/**
 * Sets up chip selectors to behave like toggleable buttons
 * Finds all chip-select containers and adds click event listeners to chips
 * that toggle selection and update the associated hidden input value.
 */
export function setupChipSelectors() {
  const chipContainers = document.querySelectorAll('.chip-select');

  chipContainers.forEach(container => {
    const input = container.querySelector('input[type="hidden"]');
    const chips = container.querySelectorAll('.chip');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        // Toggle the 'selected' class instead of removing from all
        chip.classList.toggle('selected');
        
        // Update the hidden input with all selected values
        const selectedChips = container.querySelectorAll('.chip.selected');
        const selectedValues = Array.from(selectedChips).map(c => c.dataset.value);
        input.value = selectedValues.join(', ');
      });
    });
  });
}

/**
 * Displays custom input fields based on "custom" selection in dropdowns
 * Adds change event listeners to all select elements that show/hide
 * custom input fields when "custom" is selected.
 */
export function setupCustomInputToggles() {
  const selects = document.querySelectorAll('select');

  selects.forEach(select => {
    select.addEventListener('change', () => {
      const selectedValue = select.value;
      const customInput = document.getElementById(select.dataset.customInput);
      if (customInput) {
        if (selectedValue === 'custom') {
          customInput.classList.add('visible');
        } else {
          customInput.classList.remove('visible');
        }
      }
    });
  });
}

/**
 * Gets random selections from a chip select element
 * @param {string} chipSelectId - The ID of the chip select container
 * @param {number} count - The number of chips to select
 * @returns {string} Comma-separated string of selected values
 */
export function getRandomChips(chipSelectId, count) {
  const chipSelect = document.getElementById(chipSelectId);
  if (!chipSelect) return '';

  const chips = Array.from(chipSelect.querySelectorAll('.chip'));

  // Shuffle using Fisher-Yates
  for (let i = chips.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chips[i], chips[j]] = [chips[j], chips[i]];
  }

  const selectedChips = chips.slice(0, Math.min(count, chips.length));
  return selectedChips.map(chip => chip.dataset.value).join(', ');
}


/**
 * Selects a random valid option from a dropdown, excluding empty and "custom"
 * @param {string} selectId - ID of the <select> element
 * @returns {string} Random option value
 */
export function getRandomOption(selectId) {
  const select = document.getElementById(selectId);
  const options = Array.from(select.options);
  const validOptions = options.filter(option => option.value !== '' && option.value !== 'custom');

  if (validOptions.length === 0) return '';

  const randomIndex = Math.floor(Math.random() * validOptions.length);
  return validOptions[randomIndex].value;
}

/**
 * Gets a random option from a select element, excluding specific values
 * @param {string} selectId - The ID of the select element
 * @param {Array<string>} excludeValues - Values to exclude from selection
 * @returns {string} The value of the randomly selected option
 */
export function getRandomOptionExcluding(selectId, excludeValues) {
  const select = document.getElementById(selectId);
  if (!select) return '';

  const options = Array.from(select.options);
  const validOptions = options.filter(option => !excludeValues.includes(option.value));

  if (validOptions.length === 0) return '';

  const randomIndex = Math.floor(Math.random() * validOptions.length);
  return validOptions[randomIndex].value;
}



/**
 * Updates the UI to show selected chips
 * @param {string} selectId - The ID of the chip container
 * @param {string} selectedValues - Comma-separated string of selected values
 */
export function updateChipSelectionUI(selectId, selectedValues) {
  const chipSelect = document.getElementById(selectId);
  if (!chipSelect) return;

  const values = selectedValues.split(',').map(v => v.trim());
  const chips = chipSelect.querySelectorAll('.chip');
  
  // First, clear all selected chips
  chips.forEach(chip => chip.classList.remove('selected'));
  
  // Then, select the chips that match the values
  chips.forEach(chip => {
    if (values.includes(chip.dataset.value)) {
      chip.classList.add('selected');
    }
  });
}

/**
 * Generates random selection for a multi-select (chip) field
 * @param {string} selectId - The ID of the chip container
 * @param {string} hiddenInputId - The ID of the hidden input to update
 * @param {number} minItems - Minimum number of items to select
 * @param {number} maxItems - Maximum number of items to select
 */
export function generateRandomMultiSelect(selectId, hiddenInputId, minItems, maxItems) {
  // Calculate random number of items to select
  const count = minItems + Math.floor(Math.random() * (maxItems - minItems + 1));

  // Get random selections
  const selectedItems = getRandomChips(selectId, count);

  // Update hidden input value
  document.getElementById(hiddenInputId).value = selectedItems;

  // Update UI to show selected chips
  updateChipSelectionUI(selectId, selectedItems);
}