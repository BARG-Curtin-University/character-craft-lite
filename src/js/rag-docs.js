// rag-docs.js
// Logic-only: generates RAG knowledge base documents from personality data

import { generateCorePersonalityDoc } from './documents/personality.js';
import { generateCommunicationDoc } from './documents/communication.js';
import { generateConflictResolutionDoc } from './documents/conflict.js';
import { generateDecisionMakingDoc } from './documents/decision.js';
import { generateTheoreticalFoundationsDoc } from './documents/theory.js';
import { generateScenariosDoc } from './documents/scenarios.js';
import { generateAudienceInteractionsDoc } from './documents/audience.js';
import { collectFormData } from './rag-ui.js';
import { showRAGModal } from './rag-ui.js';

/**
 * Generates a collection of RAG (Retrieval-Augmented Generation) documents based on personality data.
 * Creates a comprehensive knowledge base with different aspects of the personality profile.
 * 
 * @param {Object} data - The personality data used to generate the documents.
 * @returns {Array<{title: string, content: string}>} An array of document objects, each with a title and content.
 */
export function generateRAGDocuments(data) {
  return [
    { title: "Core Personality Profile", content: generateCorePersonalityDoc(data) },
    { title: "Communication Guidelines", content: generateCommunicationDoc(data) },
    { title: "Conflict Resolution Approaches", content: generateConflictResolutionDoc(data) },
    { title: "Decision Making Framework", content: generateDecisionMakingDoc(data) },
    { title: "Theoretical Foundations", content: generateTheoreticalFoundationsDoc(data) },
    { title: "Common Scenarios & Responses", content: generateScenariosDoc(data) },
    { title: "Audience-Specific Interactions", content: generateAudienceInteractionsDoc(data) }
  ];
}

/**
 * Collects form data and generates RAG documents, then displays them in a modal
 * This function is called directly from the button click handler
 */
export function generateRAGDocument() {
  try {
    console.log("🔍 Generating RAG documents");
    const formData = collectFormData();
    console.log("📝 Form data collected for RAG:", formData);
    
    if (!formData || !formData.orgName) {
      console.warn("⚠️ Missing organization data for RAG generation");
      // Add default org name if missing
      formData.orgName = formData.orgName || "the organization";
    }
    
    const documents = generateRAGDocuments(formData);
    showRAGModal(formData);
    console.log("✅ RAG documents generated successfully");
  } catch (err) {
    console.error("❌ Error generating RAG documents:", err);
  }
}

// Make the function available globally for standalone version
if (typeof window !== 'undefined') {
  window.generateRAGDocument = generateRAGDocument;
}