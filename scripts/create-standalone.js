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

  // Inline manifest data
  $('link[rel="manifest"]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('http')) {
      const manifestPath = path.join(distDir, href);
      if (fs.existsSync(manifestPath)) {
        const manifest = fs.readFileSync(manifestPath, 'utf8');
        // Create a script that will inject the manifest data
        $('head').append(`
          <script>
            const manifestData = ${manifest};
            const blob = new Blob([JSON.stringify(manifestData)], {type: 'application/json'});
            const manifestURL = URL.createObjectURL(blob);
            const manifestLink = document.querySelector('link[rel="manifest"]');
            if (manifestLink) manifestLink.href = manifestURL;
          </script>
        `);
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
      "updateUrl": "https://barg-curtin-university.github.io/personamate-lite/",
      "notes": "Initial release of PersonaMate Lite"
    }
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
      
      // Make sure initialization happens even if module loading fails
      setTimeout(function() {
        if (window.initializePersonaMate) {
          console.log("Running initialization from standalone script");
          window.initializePersonaMate();
        } else {
          console.warn("Standalone fallback: creating basic button handlers");
          
          // Basic button handlers if the module system fails
          document.querySelectorAll('.btn-random, #generateRandomBtn').forEach(btn => {
            btn.addEventListener('click', function() {
              console.log("Random button clicked");
              alert("Button clicked! If you're seeing this, there might be an issue with the JavaScript modules. Please check the console for errors.");
            });
          });
          
          document.querySelectorAll('.btn-generate, #generateBtn').forEach(btn => {
            btn.addEventListener('click', function() {
              console.log("Generate button clicked");
              alert("Button clicked! If you're seeing this, there might be an issue with the JavaScript modules. Please check the console for errors.");
            });
          });
        }
      }, 1000);
    });
  </script>
`);

// Create a standalone HTML file
const standaloneHtml = $.html();
fs.writeFileSync(path.join(distDir, 'personamate-standalone.html'), standaloneHtml);

console.log('Created standalone HTML file: dist/personamate-standalone.html');