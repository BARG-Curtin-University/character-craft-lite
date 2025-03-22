// rag.js - ES6+ version for collecting form data and initiating RAG document generation

import { getRandomOption, getRandomOptionExcluding, getRandomChips } from '../inputs.js';
import { generateRandomPerson, generateRandomOrgName, genders, ageRanges, organisationalRoles } from './models.js';

// Helper function for array random selection
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Make helper function globally available
if (typeof window !== 'undefined') {
  window.getRandomItem = getRandomItem;
}

/**
 * Collects all form data, filling in random values for missing fields
 * @returns {Object} The collected form data
 */
export function collectFormData() {
  try {
    console.log("📋 Collecting form data");
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

  const result = {
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
  
  console.log("📝 Form data collected successfully:", result);
  return result;
  } catch (error) {
    console.error("❌ Error collecting form data:", error);
    // Return default object with minimal data to prevent complete failure
    return {
      characterName: "Default Character",
      characterGender: "neutral",
      characterAge: "30-35",
      characterRole: "Team Member",
      orgName: "Organization",
      communicationStyle: "Professional"
    };
  }
}

/**
 * Generates and displays a modal with RAG documents based on the current personality
 * @param {Object} data - The form data
 */
export function generateRAGDocs(data) {
  console.log("RAG document generation requested");
  
  // Generate basic RAG document
  const firstName = data.characterName ? data.characterName.split(' ')[0] : "the representative";
  const fullName = data.characterName || "the organizational representative";
  const orgName = data.orgName || "the organization";
  const role = data.characterRole || "representative";
  const orgType = data.orgType || "organization";
  const theories = data.obTheories ? data.obTheories.split(',').map(t => t.trim()) : ["organizational behavior principles"];
  
  // Create a structured RAG document
  const ragDoc = `# ${fullName} - Personality Profile

## Organizational Context
- **Organization**: ${orgName} (${orgType})
- **Role**: ${role}
- **Primary Audience**: ${data.audience || "Various stakeholders"}

## Demographic Information
- **Name**: ${fullName}
- **Age Range**: ${data.characterAge || "Adult"}
- **Gender**: ${data.characterGender || "Not specified"}

## Theoretical Foundations
${theories.map(theory => `- ${theory}`).join('\n')}

## Communication Approach
- **Style**: ${data.communicationStyle || "Professional"}
- **Conflict Resolution**: ${data.conflictResolution || "Collaborative"}
- **Negotiation Method**: ${data.negotiationMethod || "Win-win approach"}
- **Decision-Making**: ${data.decisionMaking || "Rational process"}

## Emotional Intelligence
- **EI Framework**: ${data.emotionalIntelligence || "Self-awareness and empathy"}
- **Feedback Mechanism**: ${data.feedbackMechanism || "Constructive and balanced"}

## Values
${data.coreValues ? data.coreValues.split(',').map(v => `- ${v.trim()}`).join('\n') : "- Integrity\n- Excellence"}

## Application Contexts
- Training scenarios
- Role-play simulations
- Behavioral modeling
- Communication exercises
`;

  // Display result - first try to use the pre-imported showModal function
  if (typeof window.showModal === 'function') {
    window.showModal({
      title: 'RAG Document for ' + fullName,
      content: ragDoc,
      instructions: `
        <p>This document can be used as a reference knowledge document for Retrieval Augmented Generation (RAG) systems.</p>
        <p>You can copy this document and use it as part of your RAG corpus to improve AI responses when simulating this personality.</p>
      `,
      copyButtonText: 'Copy Document',
      contentClass: 'rag-content'
    });
  } else {
    // Fallback if modal system isn't available
    console.warn("Modal system not available, using basic alert");
    alert("RAG Document Generated:\n\n" + ragDoc + "\n\n(Copy this text to use with your RAG system)");
  }
}

/**
 * Generates RAG document based on the current personality
 */
export function generateRAGDocument() {
  try {
    console.log("📊 Generating RAG document");
    const formData = collectFormData();
    generateRAGDocs(formData);
  } catch (error) {
    console.error("❌ Error generating RAG document:", error);
    alert("There was a problem generating the RAG document. Please try again.");
  }
}

// Make functions globally available for standalone version
if (typeof window !== 'undefined') {
  window.collectFormData = collectFormData;
  window.generateRAGDocument = generateRAGDocument;
}
