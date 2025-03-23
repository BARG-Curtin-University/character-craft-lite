// rag-ui.js
// UI-only: responsible for modal construction, tab display, and interactions

import { generateRAGDocuments } from './rag-docs.js';
import { getRandomItem, generateRandomOrgName } from './models.js';
  
/**
 * Displays a modal dialog containing RAG (Retrieval-Augmented Generation) documents
 * generated from the provided data.
 * 
 * @param {Object} data - The data used to generate RAG documents
 * @returns {void}
 */
export function showRAGModal(data) {
  const ragDocs = generateRAGDocuments(data);

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  Object.assign(modalOverlay.style, {
    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: '1000'
  });

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  Object.assign(modalContent.style, {
    backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--border-radius)',
    width: '90%', maxWidth: '900px', maxHeight: '85vh', overflowY: 'auto', position: 'relative'
  });

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&times;';
  Object.assign(closeButton.style, {
    position: 'absolute', top: '1rem', right: '1rem', background: 'none',
    border: 'none', fontSize: '1.5rem', cursor: 'pointer'
  });
  closeButton.onclick = () => document.body.removeChild(modalOverlay);

  const header = document.createElement('h2');
  header.textContent = 'RAG Knowledge Base Documents';
  header.style.color = 'var(--primary-color)';
  header.style.marginBottom = '1rem';

  const instructions = document.createElement('div');
  instructions.innerHTML = `
    <p>The following documents are designed to be used as a knowledge base for a RAG (Retrieval-Augmented Generation) implementation of your chatbot.</p>
    <p>For implementation:</p>
    <ol>
      <li>Save each document as a separate text or markdown file</li>
      <li>Process these documents with your chosen vector database or RAG framework</li>
      <li>Configure your chatbot to query this knowledge base when responding to users</li>
      <li>Set a high relevance threshold to ensure responses align with the defined personality</li>
    </ol>
  `;
  instructions.style.marginBottom = '1.5rem';

  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs-container';
  Object.assign(tabsContainer.style, {
    display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '1rem'
  });

  const tabContent = document.createElement('div');
  tabContent.className = 'tab-content';

  ragDocs.forEach((doc, index) => {
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.dataset.tab = `tab-${index}`;
    tab.textContent = doc.title;
    Object.assign(tab.style, {
      padding: '0.75rem 1.5rem', cursor: 'pointer', transition: 'var(--transition)',
      borderBottom: index === 0 ? '3px solid var(--accent-color)' : 'none',
      color: index === 0 ? 'var(--accent-color)' : 'var(--dark-text)',
      fontWeight: index === 0 ? '600' : '400'
    });
    tab.onclick = () => {
      document.querySelectorAll('.tab').forEach(t => {
        t.style.borderBottom = 'none';
        t.style.color = 'var(--dark-text)';
        t.style.fontWeight = '400';
      });
      document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
      tab.style.borderBottom = '3px solid var(--accent-color)';
      tab.style.color = 'var(--accent-color)';
      tab.style.fontWeight = '600';
      document.getElementById(`tab-${index}`).style.display = 'block';
    };
    tabsContainer.appendChild(tab);

    const tabPane = document.createElement('div');
    tabPane.className = 'tab-pane';
    tabPane.id = `tab-${index}`;
    tabPane.style.display = index === 0 ? 'block' : 'none';

    const docContent = document.createElement('div');
    docContent.className = 'doc-content';
    Object.assign(docContent.style, {
      whiteSpace: 'pre-wrap', backgroundColor: 'var(--light-bg)', padding: '1.5rem',
      borderRadius: 'var(--border-radius)', fontFamily: 'monospace',
      fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1rem'
    });
    docContent.textContent = doc.content;

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Document';
    copyButton.className = 'btn-copy';
    copyButton.onclick = () => {
      navigator.clipboard.writeText(doc.content)
        .then(() => {
          copyButton.textContent = 'Copied!';
          setTimeout(() => copyButton.textContent = 'Copy Document', 2000);
        });
    };

    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Document';
    downloadButton.className = 'btn-download';
    downloadButton.onclick = () => {
      const blob = new Blob([doc.content], { type: 'text/plain' });
      const a = document.createElement('a');
      a.download = `${doc.title.toLowerCase().replace(/\s+/g, '-')}.md`;
      a.href = URL.createObjectURL(blob);
      a.click();
      URL.revokeObjectURL(a.href);
    };

    const buttonGroup = document.createElement('div');
    buttonGroup.style.display = 'flex';
    buttonGroup.style.gap = '0.5rem';
    buttonGroup.appendChild(copyButton);
    buttonGroup.appendChild(downloadButton);

    tabPane.appendChild(docContent);
    tabPane.appendChild(buttonGroup);
    tabContent.appendChild(tabPane);
  });

  const downloadAll = document.createElement('button');
  downloadAll.textContent = 'Download All Documents';
  downloadAll.className = 'btn-download-all';
  Object.assign(downloadAll.style, {
    padding: '0.75rem 1.5rem', backgroundColor: 'var(--primary-color)',
    color: 'white', border: 'none', borderRadius: 'var(--border-radius)',
    cursor: 'pointer', marginTop: '1rem'
  });
  downloadAll.onclick = () => {
    ragDocs.forEach((doc, index) => {
      setTimeout(() => {
        const blob = new Blob([doc.content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.download = `${doc.title.toLowerCase().replace(/\s+/g, '-')}.md`;
        a.href = URL.createObjectURL(blob);
        a.click();
        URL.revokeObjectURL(a.href);
      }, index * 100);
    });
  };

  modalContent.append(closeButton, header, instructions, tabsContainer, tabContent, downloadAll);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
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
