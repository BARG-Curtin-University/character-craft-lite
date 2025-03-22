// generation.js - ES6+ version
console.log("✅ generatePersonality loaded");

import { collectFormData } from './data/rag.js';

/**
 * Creates a single summary item for the personality profile
 */
function createSummaryItem(label, value) {
  return `<div class="summary-item"><span class="label">${label}:</span> <span class="value">${value}</span></div>`;
}

// Make the helper function globally available for standalone version
if (typeof window !== 'undefined') {
  window.createSummaryItem = createSummaryItem;
}

/**
 * Generates a personality profile based on form inputs or random values
 */
export function generatePersonality() {
  try {
    console.log("🧠 Generating personality profile");
    const profileData = collectFormData();
    console.log("📊 Collected form data:", profileData);
    generateSummary(profileData);
    generateDescription(profileData);
    
    // Show the output card
    const formCard = document.querySelector('.form-card');
    const outputCard = document.querySelector('.output-card');
    
    if (formCard) formCard.style.display = 'none';
    if (outputCard) outputCard.classList.add('visible');
    
    console.log("✅ Personality profile generated successfully");
  } catch (error) {
    console.error("❌ Error generating personality profile:", error);
  }
}

// Make the function globally available for standalone version
if (typeof window !== 'undefined') {
  window.generatePersonality = generatePersonality;
}

/**
 * Generates the summary HTML and updates the DOM
 */
export function generateSummary(data) {
  const items = [
    ['Character Name', data.characterName],
    ['Gender', data.characterGender],
    ['Age Range', data.characterAge],
    ['Organisational Role', data.characterRole],
    ['Organisation Type', data.orgType],
    ['Organisation Name', data.orgName],
    ['Primary Audience', data.audience],
    ['OB Theories', data.obTheories],
    ['Communication Style', data.communicationStyle],
    ['Conflict Resolution', data.conflictResolution],
    ['Negotiation Method', data.negotiationMethod],
    ['Decision-Making', data.decisionMaking],
    ['Emotional Intelligence', data.emotionalIntelligence],
    ['Feedback Mechanism', data.feedbackMechanism],
    ['Core Values', data.coreValues]
  ];

  const summaryHTML = items
    .filter(([, value]) => value)
    .map(([label, value]) => createSummaryItem(label, value))
    .join('');

  document.getElementById('personalitySummary').innerHTML = summaryHTML;
}

/**
 * Generates a detailed personality description
 */
export function generateDescription(data) {
  let description = `<p><strong>${data.characterName || 'The chatbot character'}</strong> is a ${data.characterAge || 'mature'} ${data.characterGender || 'professional'} working as a ${data.characterRole || 'team member'} at <strong>${data.orgName || 'the organisation'}</strong>.`;

  description += ` As a ${data.communicationStyle?.toLowerCase() || 'professional'} communicator`;

  if (data.orgType) description += ` within a ${data.orgType.toLowerCase()} context,`;
  if (data.audience) description += ` primarily serving ${data.audience.toLowerCase()},`;
  description += ` ${data.characterName || 'this character'} brings a unique perspective to workplace interactions.</p>`;

  if (data.obTheories) {
    description += `<p>Drawing from ${data.obTheories}, this character approaches interactions with a strong theoretical foundation. `;
  }

  if (data.conflictResolution) {
    description += `When conflicts arise, they employ ${data.conflictResolution.toLowerCase()} techniques. `;
  }

  if (data.negotiationMethod) {
    description += `Their negotiation style is ${data.negotiationMethod.toLowerCase()}, `;
  }

  if (data.decisionMaking) {
    description += `and decisions are made in a ${data.decisionMaking.toLowerCase()} manner.`;
  }

  description += `</p><p>`;

  if (data.emotionalIntelligence) {
    description += `They demonstrate ${data.emotionalIntelligence.toLowerCase()}, `;
  }

  if (data.feedbackMechanism) {
    description += `and provide feedback using ${data.feedbackMechanism.toLowerCase()}. `;
  }

  if (data.coreValues) {
    description += `Their core values include ${data.coreValues.toLowerCase()}, which guide their actions.`;
  }

  description += `</p>`;

  document.getElementById('personalityDescription').innerHTML = description;
}
