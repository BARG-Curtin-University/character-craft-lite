const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Path to the built files
const distDir = path.join(__dirname, '..', 'dist');

// Read the HTML file
const htmlPath = path.join(distDir, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Parse the HTML
const $ = cheerio.load(html);

// Function to convert external resources to inline
function inlineResources() {
  // Process CSS files
  $('link[rel="stylesheet"]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('http')) {
      const cssPath = path.join(distDir, href);
      if (fs.existsSync(cssPath)) {
        const css = fs.readFileSync(cssPath, 'utf8');
        $(el).replaceWith(`<style>${css}</style>`);
      }
    }
  });

  // Process JavaScript files
  $('script[src]').each((i, el) => {
    const src = $(el).attr('src');
    if (src && !src.startsWith('http')) {
      const jsPath = path.join(distDir, src);
      if (fs.existsSync(jsPath)) {
        const js = fs.readFileSync(jsPath, 'utf8');
        // First, replace direct references to import.meta.url
        let fixedJs = js.replace(/import\.meta\.url/g, 
          "window.location.href /* STANDALONE: replaced import.meta.url */");
        
        // Then, look for code that checks if import.meta exists and replace the entire block
        fixedJs = fixedJs.replace(/typeof\s+import\s*!==\s*['"]undefined['"]\s*&&\s*import\.meta/g,
          "false /* STANDALONE: disabled import.meta check */");
        
        // Also handle any other potential import.meta references
        fixedJs = fixedJs.replace(/import\.meta/g,
          "/* STANDALONE: import.meta not available */ ({})");
        // Keep the script as a module if it was a module
        const scriptType = $(el).attr('type') || '';
        if (scriptType === 'module') {
          $(el).replaceWith(`<script type="module">${fixedJs}</script>`);
        } else {
          $(el).replaceWith(`<script>${fixedJs}</script>`);
        }
      }
    }
  });

  // Process icons (convert to data URLs)
  $('link[rel="icon"]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('http')) {
      const iconPath = path.join(distDir, href);
      if (fs.existsSync(iconPath)) {
        const iconData = fs.readFileSync(iconPath);
        const base64 = iconData.toString('base64');
        const mimeType = 'image/png'; // Assuming PNG, adjust as needed
        $(el).attr('href', `data:${mimeType};base64,${base64}`);
      }
    }
  });

  // Inline manifest data with path fixes for deployed context
  $('link[rel="manifest"]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('http')) {
      const manifestPath = path.join(distDir, href);
      if (fs.existsSync(manifestPath)) {
        // Read the manifest and parse it
        const manifestText = fs.readFileSync(manifestPath, 'utf8');
        let manifestData;
        try {
          manifestData = JSON.parse(manifestText);
          
          // Fix paths for standalone context
          manifestData.start_url = './'
          manifestData.scope = './';
          
          // Fix icon paths for standalone context
          if (manifestData.icons && Array.isArray(manifestData.icons)) {
            manifestData.icons = manifestData.icons.map(icon => {
              // Find the actual file in the dist directory that matches the pattern
              const iconName = icon.src.split('/').pop();
              const iconFiles = fs.readdirSync(distDir).filter(file => 
                file.startsWith(iconName.split('.')[0]) && 
                file.endsWith('.png')
              );
              
              if (iconFiles.length > 0) {
                icon.src = './' + iconFiles[0]; // Use the first matching file
              } else {
                icon.src = './' + iconName; // Fallback to the original name
              }
              
              return icon;
            });
          }
          
          // Create a script that will inject the fixed manifest data
          $('head').append(`
            <script>
              const manifestData = ${JSON.stringify(manifestData)};
              const blob = new Blob([JSON.stringify(manifestData)], {type: 'application/json'});
              const manifestURL = URL.createObjectURL(blob);
              const manifestLink = document.querySelector('link[rel="manifest"]');
              if (manifestLink) manifestLink.href = manifestURL;
            </script>
          `);
        } catch (err) {
          console.error('Error parsing manifest:', err);
        }
      }
    }
  });
}

// Inline all resources
inlineResources();

// Add embedded version.json data directly in the HTML
$('head').append(`
  <script type="application/json" id="embedded-version-data">
    {
      "version": "1.0.0",
      "releaseDate": "2024-03-22",
      "updateUrl": "https://barg-curtin-university.github.io/charactercraft-lite/",
      "notes": "Initial release of CharacterCraft Lite"
    }
  </script>
`);

// Add helper functions directly to standalone HTML
$('head').append(`
  <script>
    // These global helper functions ensure core functionality works 
    // even if module bundling fails
    
    // Global helper functions for the standalone version
    window.CharacterCraftHelpers = {
      // Random option selection
      getRandomOptionExcluding: function(selectId, excludeValues) {
        console.log("Using global helper: getRandomOptionExcluding");
        const select = document.getElementById(selectId);
        if (!select) return '';
        
        const options = Array.from(select.options);
        const validOptions = options.filter(option => !excludeValues.includes(option.value));
        
        if (validOptions.length === 0) return '';
        
        const randomIndex = Math.floor(Math.random() * validOptions.length);
        return validOptions[randomIndex].value;
      },
      
      // Random chip selection 
      getRandomChips: function(chipSelectId, count) {
        console.log("Using global helper: getRandomChips");
        const chipSelect = document.getElementById(chipSelectId);
        if (!chipSelect) return '';
        
        const chips = Array.from(chipSelect.querySelectorAll('.chip'));
        
        // Shuffle
        for (let i = chips.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [chips[i], chips[j]] = [chips[j], chips[i]];
        }
        
        const selectedChips = chips.slice(0, Math.min(count, chips.length));
        return selectedChips.map(chip => chip.dataset.value).join(', ');
      },
      
      // Update UI for chips
      updateChipSelectionUI: function(selectId, selectedValues) {
        console.log("Using global helper: updateChipSelectionUI");
        const chipSelect = document.getElementById(selectId);
        if (!chipSelect) return;
        
        const values = selectedValues.split(',').map(v => v.trim());
        const chips = chipSelect.querySelectorAll('.chip');
        
        chips.forEach(chip => chip.classList.remove('selected'));
        chips.forEach(chip => {
          if (values.includes(chip.dataset.value)) {
            chip.classList.add('selected');
          }
        });
      },
      
      // Random multiselect generation
      generateRandomMultiSelect: function(selectId, hiddenInputId, minItems, maxItems) {
        console.log("Using global helper: generateRandomMultiSelect");
        const count = minItems + Math.floor(Math.random() * (maxItems - minItems + 1));
        const selectedItems = this.getRandomChips(selectId, count);
        
        const hiddenInput = document.getElementById(hiddenInputId);
        if (hiddenInput) hiddenInput.value = selectedItems;
        
        this.updateChipSelectionUI(selectId, selectedItems);
      }
    };
  </script>
`);

// Add a special standalone initialization script
$('body').append(`
  <script>
    // Special initialization for standalone version
    document.addEventListener('DOMContentLoaded', function() {
      console.log("Standalone initialization starting");
      
      // Override the fetch function for version.json to use embedded data
      const originalFetch = window.fetch;
      window.fetch = function(url, options) {
        if (typeof url === 'string' && url.includes('version.json')) {
          console.log("Using embedded version data instead of fetch for: " + url);
          const versionData = document.getElementById('embedded-version-data').textContent;
          return Promise.resolve(new Response(versionData, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        }
        return originalFetch(url, options);
      };
      
      // Ensure core functions are available globally
      if (typeof window.generateRandomOptionExcluding !== 'function') {
        window.generateRandomOptionExcluding = window.CharacterCraftHelpers.getRandomOptionExcluding;
      }
      
      if (typeof window.generateRandomMultiSelect !== 'function') {
        window.generateRandomMultiSelect = window.CharacterCraftHelpers.generateRandomMultiSelect;
      }
      
      if (typeof window.updateChipSelectionUI !== 'function') {
        window.updateChipSelectionUI = window.CharacterCraftHelpers.updateChipSelectionUI;
      }
      
      // Make sure initialization happens even if module loading fails
      setTimeout(function() {
        if (window.initializeCharacterCraft && !window.isCharacterCraftInitialized) {
          console.log("Running initialization from standalone script");
          window.initializeCharacterCraft();
        } else if (window.isCharacterCraftInitialized) {
          console.log("Already initialized, skipping standalone initialization");
        } else {
          console.warn("Standalone fallback: creating basic button handlers");
          
          // Basic button handlers if the module system fails
          document.querySelectorAll('.btn-random, #generateRandomBtn').forEach(btn => {
            btn.addEventListener('click', function() {
              console.log("Random button clicked");
              if (typeof window.generateRandomPersonality === 'function') {
                window.generateRandomPersonality();
              } else {
                alert("Button clicked! If you're seeing this, there might be an issue with the JavaScript modules.");
              }
            });
          });
          
          document.querySelectorAll('.btn-generate, #generateBtn').forEach(btn => {
            btn.addEventListener('click', function() {
              console.log("Generate button clicked");
              if (typeof window.generatePersonality === 'function') {
                window.generatePersonality();
              } else {
                alert("Button clicked! If you're seeing this, there might be an issue with the JavaScript modules.");
              }
            });
          });
        }
      }, 1000);
    });
  </script>
`);

// Create a standalone HTML file
const standaloneHtml = $.html();
fs.writeFileSync(path.join(distDir, 'charactercraft-standalone.html'), standaloneHtml);

console.log('Created standalone HTML file: dist/charactercraft-standalone.html');