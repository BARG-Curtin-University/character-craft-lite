// navigation.js - ES6+ version for form navigation and validation

import { elements, currentSection as sectionState } from './dom.js';
import { generatePersonality } from './generation.js';

let currentSection = sectionState; // sync with dom.js

/**
 * Sets up form navigation functionality
 */
export function setupFormNavigation() {
  // Next button navigation
  elements.nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (validateSection(currentSection)) {
        goToSection(currentSection + 1);
      }
    });
  });

  // Previous button navigation
  elements.prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      goToSection(currentSection - 1);
    });
  });

  // Progress dot navigation
  elements.dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const section = parseInt(this.dataset.section);
      if (section < currentSection || validateSection(currentSection)) {
        goToSection(section);
      }
    });
  });

  // Generate button
  if (elements.generateButton) {
    elements.generateButton.addEventListener('click', () => {
      if (validateSection(currentSection) && validateForm()) {
        generatePersonality();
        elements.formCard.style.display = 'none';
        elements.outputCard.classList.add('visible');
      }
    });
  }
}

/**
 * Navigates to the specified form section
 */
export function goToSection(section) {
  if (section < 1 || section > elements.sections.length) return;

  elements.sections.forEach(s => s.classList.remove('active'));
  elements.dots.forEach(d => d.classList.remove('active'));

  elements.sections[section - 1].classList.add('active');
  elements.dots[section - 1].classList.add('active');

  currentSection = section;
}

/**
 * Validates the current section before proceeding
 */
export function validateSection(section) {
  // Placeholder validation logic
  return true;
}

/**
 * Validates the entire form before submission
 */
export function validateForm() {
  // Placeholder form validation
  return true;
}
