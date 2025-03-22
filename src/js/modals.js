/**
 * modals.js - Modal dialog functionality
 * Handles creation and management of modal dialogs
 */

// ------------------------------------------------
// MODAL FUNCTIONALITY
// ------------------------------------------------

/**
 * Creates and displays a modal dialog
 * @param {Object} config - Modal configuration object
 * @param {string} config.title - Modal title
 * @param {string} config.content - Main content text
 * @param {string} config.instructions - HTML instructions to display above content
 * @param {string} config.copyButtonText - Text for the copy button
 * @param {string} config.contentClass - CSS class for the content container
 */
export function showModal(config) {
  // Create modal overlay
  const modalOverlay = createModalOverlay();
  
  // Create modal content container
  const modalContent = createModalContent();
  
  // Add close button
  const closeButton = createCloseButton(() => document.body.removeChild(modalOverlay));
  modalContent.appendChild(closeButton);
  
  // Add header
  const modalHeader = document.createElement('h2');
  modalHeader.textContent = config.title;
  modalHeader.style.color = 'var(--primary-color)';
  modalHeader.style.marginBottom = '1rem';
  modalContent.appendChild(modalHeader);
  
  // Add instructions if provided
  if (config.instructions) {
    const usageInstructions = document.createElement('div');
    usageInstructions.innerHTML = config.instructions;
    usageInstructions.style.marginBottom = '1.5rem';
    modalContent.appendChild(usageInstructions);
  }
  
  // Add content
  const contentContainer = document.createElement('div');
  contentContainer.className = config.contentClass || 'modal-content-container';
  contentContainer.style.backgroundColor = 'var(--light-bg)';
  contentContainer.style.padding = '1.5rem';
  contentContainer.style.borderRadius = 'var(--border-radius)';
  contentContainer.style.marginBottom = '1.5rem';
  contentContainer.style.whiteSpace = 'pre-wrap';
  contentContainer.textContent = config.content;
  modalContent.appendChild(contentContainer);
  
  // Add copy button
  if (config.copyButtonText) {
    const copyButton = createCopyButton(config.copyButtonText, config.content);
    modalContent.appendChild(copyButton);
  }
  
  // Show the modal
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}

/**
 * Creates a modal overlay element
 * @returns {HTMLElement} The created overlay element
 */
export function createModalOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '1000';
  return overlay;
}

/**
 * Creates a modal content container
 * @returns {HTMLElement} The created content container
 */
export function createModalContent() {
  const content = document.createElement('div');
  content.className = 'modal-content';
  content.style.backgroundColor = 'white';
  content.style.padding = '2rem';
  content.style.borderRadius = 'var(--border-radius)';
  content.style.width = '80%';
  content.style.maxWidth = '800px';
  content.style.maxHeight = '80vh';
  content.style.overflowY = 'auto';
  content.style.position = 'relative';
  return content;
}

/**
 * Creates a close button for a modal
 * @param {Function} onClickHandler - Function to call when button is clicked
 * @returns {HTMLElement} The created close button
 */
export function createCloseButton(onClickHandler) {
  const button = document.createElement('button');
  button.innerHTML = '&times;';
  button.style.position = 'absolute';
  button.style.top = '1rem';
  button.style.right = '1rem';
  button.style.background = 'none';
  button.style.border = 'none';
  button.style.fontSize = '1.5rem';
  button.style.cursor = 'pointer';
  button.onclick = onClickHandler;
  return button;
}

/**
 * Creates a copy button for copying text to clipboard
 * @param {string} buttonText - The button text
 * @param {string} textToCopy - The text to copy to clipboard
 * @returns {HTMLElement} The created copy button
 */
export function createCopyButton(buttonText, textToCopy) {
  const button = document.createElement('button');
  button.textContent = buttonText;
  button.className = 'btn-copy';
  button.style.padding = '0.75rem 1.5rem';
  button.style.backgroundColor = 'var(--primary-color)';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = 'var(--border-radius)';
  button.style.cursor = 'pointer';
  
  button.onclick = function() {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = buttonText;
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Could not copy to clipboard. Please try again.');
      });
  };
  
  return button;
}