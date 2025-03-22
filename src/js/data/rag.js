// rag.js - ES6+ version for collecting form data and initiating RAG document generation

import { getRandomOption, getRandomOptionExcluding, getRandomChips } from '../inputs.js';
import { generateRandomPerson, generateRandomOrgName, genders, ageRanges, organisationalRoles } from './models.js';

/**
 * Collects all form data, filling in random values for missing fields
 * @returns {Object} The collected form data
 */
export function collectFormData() {
  const characterName = document.getElementById('characterName')?.value || generateRandomPerson().name;
  const characterGender = document.getElementById('characterGender')?.value || getRandomItem(genders);
  const characterAge = document.getElementById('characterAge')?.value || getRandomItem(ageRanges);
  const characterRole = document.getElementById('characterRole')?.value || getRandomItem(organisationalRoles).title;

  const orgType = document.getElementById('orgType')?.value || getRandomOption('orgType');
  const orgName = document.getElementById('orgName')?.value || generateRandomOrgName(orgType);
  const audience = document.getElementById('primaryAudience')?.value || getRandomOption('primaryAudience');

  let obTheories = document.getElementById('obTheories')?.value;
  if (!obTheories) {
    obTheories = getRandomChips('obTheoriesSelect', 1 + Math.floor(Math.random() * 3));
    document.getElementById('obTheories').value = obTheories;
  }

  const communicationStyle = document.getElementById('communicationStyle')?.value || getRandomOption('communicationStyle');
  const conflictResolution = document.getElementById('conflictResolution')?.value || getRandomOption('conflictResolution');
  const negotiationMethod = document.getElementById('negotiationMethod')?.value || getRandomOption('negotiationMethod');

  let decisionMaking = document.getElementById('decisionMaking')?.value;
  if (!decisionMaking) {
    decisionMaking = getRandomChips('decisionMakingSelect', 1 + Math.floor(Math.random() * 2));
    document.getElementById('decisionMaking').value = decisionMaking;
  }

  const emotionalIntelligence = document.getElementById('emotionalIntelligence')?.value || getRandomOption('emotionalIntelligence');
  const feedbackMechanism = document.getElementById('feedbackMechanism')?.value || getRandomOption('feedbackMechanism');

  let coreValues = document.getElementById('coreValues')?.value;
  if (!coreValues) {
    coreValues = getRandomChips('valuesSelect', 2 + Math.floor(Math.random() * 3));
    document.getElementById('coreValues').value = coreValues;
  }

  return {
    characterName,
    characterGender,
    characterAge,
    characterRole,
    orgType,
    orgName,
    audience,
    obTheories,
    communicationStyle,
    conflictResolution,
    negotiationMethod,
    decisionMaking,
    emotionalIntelligence,
    feedbackMechanism,
    coreValues
  };
}

/**
 * Generates and displays a modal with RAG documents based on the current personality
 * @param {Object} data - The form data
 */
export function generateRAGDocs(data) {
  console.log("RAG document generation requested");
  alert("RAG document generation functionality is coming soon!");
}

/**
 * Generates RAG document based on the current personality
 */
export function generateRAGDocument() {
  const formData = collectFormData();
  generateRAGDocs(formData);
}
