// Import required functions
import { generatePersonality } from './generation.js';
import { collectFormData } from './rag-ui.js';
import { resetForm } from './export.js';

/**
 * Generates a random option from a select element, excluding specified values.
 * 
 * @param {string} selectId - The ID of the select element.
 * @param {string[]} excludeValues - Array of values to exclude from selection.
 * @returns {string} The randomly selected option value.
 */
function generateRandomOptionExcluding(selectId, excludeValues) {
  console.log("Using inline generateRandomOptionExcluding function");
  const select = document.getElementById(selectId);
  if (!select) {
    console.warn(`Select element with id ${selectId} not found`);
    return '';
  }

  const options = Array.from(select.options);
  const validOptions = options.filter(option => !excludeValues.includes(option.value));

  if (validOptions.length === 0) {
    console.warn(`No valid options found for ${selectId} after excluding ${excludeValues}`);
    return '';
  }

  const randomIndex = Math.floor(Math.random() * validOptions.length);
  return validOptions[randomIndex].value;
}

/**
 * Generates random selections for a multi-select chip element.
 * 
 * @param {string} selectId - The ID of the chip select element.
 * @param {string} hiddenInputId - The ID of the hidden input to store selected values.
 * @param {number} minItems - Minimum number of items to select.
 * @param {number} maxItems - Maximum number of items to select.
 */
function generateRandomMultiSelect(selectId, hiddenInputId, minItems, maxItems) {
  console.log("Using inline generateRandomMultiSelect function");
  // Calculate random number of items to select
  const count = minItems + Math.floor(Math.random() * (maxItems - minItems + 1));

  // Get random selections
  const selectedItems = getRandomChips(selectId, count);

  // Update hidden input value
  const hiddenInput = document.getElementById(hiddenInputId);
  if (hiddenInput) {
    hiddenInput.value = selectedItems;
  } else {
    console.warn(`Hidden input with id ${hiddenInputId} not found`);
  }

  // Update UI to show selected chips
  updateChipSelectionUI(selectId, selectedItems);
}

/**
 * Gets a random selection of chips from a chip select element.
 * 
 * @param {string} chipSelectId - The ID of the chip select element.
 * @param {number} count - Number of chips to select.
 * @returns {string} Comma-separated string of selected chip values.
 */
function getRandomChips(chipSelectId, count) {
  console.log("Using inline getRandomChips function");
  const chipSelect = document.getElementById(chipSelectId);
  if (!chipSelect) {
    console.warn(`Chip select with id ${chipSelectId} not found`);
    return '';
  }

  const chips = Array.from(chipSelect.querySelectorAll('.chip'));
  if (chips.length === 0) {
    console.warn(`No chips found in ${chipSelectId}`);
    return '';
  }

  // Shuffle using Fisher-Yates
  for (let i = chips.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chips[i], chips[j]] = [chips[j], chips[i]];
  }

  const selectedChips = chips.slice(0, Math.min(count, chips.length));
  return selectedChips.map(chip => chip.dataset.value).join(', ');
}

/**
 * Updates the UI to reflect selected chips.
 * 
 * @param {string} selectId - The ID of the chip select element.
 * @param {string} selectedValues - Comma-separated string of selected values.
 */
function updateChipSelectionUI(selectId, selectedValues) {
  console.log("Using inline updateChipSelectionUI function");
  const chipSelect = document.getElementById(selectId);
  if (!chipSelect) {
    console.warn(`Chip select with id ${selectId} not found`);
    return;
  }

  if (!selectedValues) {
    console.warn(`No selected values provided for ${selectId}`);
    return;
  }

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

// Import these as needed
import { generateRandomOrgName } from './data/models.js';

/**
 * Generates a random personality by populating the form with random values
 * and triggering the personality generation process.
 * 
 * @export
 * @returns {void}
 */
export function generateRandomPersonality() {
  console.log("✅ generateRandomPersonality called");

  try {
    // Reset form
    resetForm(false);

    // Generate random base data
    const randomPerson = {
      name: "Alex Johnson",
      gender: "neutral",
      ageRange: "31-35",
      role: { title: "Team Lead" }
    };

    const person = {
      ...randomPerson,
      name: randomPerson.name,
      gender: randomPerson.gender,
      ageRange: randomPerson.ageRange,
      role: randomPerson.role.title
    };

    document.getElementById('characterName').value = person.name;
    document.getElementById('characterGender').value = person.gender;
    document.getElementById('characterAge').value = person.ageRange;
    document.getElementById('characterRole').value = person.role;

    // Organisation fields
    const orgType = generateRandomOptionExcluding('orgType', ['', 'custom']);
    const orgName = generateRandomOrgName(orgType);
    const audience = generateRandomOptionExcluding('primaryAudience', ['', 'custom']);

    document.getElementById('orgType').value = orgType;
    document.getElementById('orgName').value = orgName;
    document.getElementById('primaryAudience').value = audience;

    // Multi-select fields
    generateRandomMultiSelect('obTheoriesSelect', 'obTheories', 2, 4);
    generateRandomMultiSelect('decisionMakingSelect', 'decisionMaking', 1, 3);
    generateRandomMultiSelect('valuesSelect', 'coreValues', 2, 4);

    // Dropdowns
    document.getElementById('communicationStyle').value = generateRandomOptionExcluding('communicationStyle', ['']);
    document.getElementById('conflictResolution').value = generateRandomOptionExcluding('conflictResolution', ['']);
    document.getElementById('negotiationMethod').value = generateRandomOptionExcluding('negotiationMethod', ['']);
    document.getElementById('emotionalIntelligence').value = generateRandomOptionExcluding('emotionalIntelligence', ['']);
    document.getElementById('feedbackMechanism').value = generateRandomOptionExcluding('feedbackMechanism', ['']);

    // Trigger persona generation
    generatePersonality();

    // Toggle visibility
    document.querySelector('.form-card')?.classList.remove('visible');
    document.querySelector('.output-card')?.classList.add('visible');

    console.log("🎉 Random personality generated successfully");

  } catch (error) {
    console.error("❌ Error in generateRandomPersonality:", error);
  }
}

// Make function globally available for standalone version
if (typeof window !== 'undefined') {
  window.generateRandomPersonality = generateRandomPersonality;
}