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
        $(el).replaceWith(`<script>${js}</script>`);
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

// Create a standalone HTML file
const standaloneHtml = $.html();
fs.writeFileSync(path.join(distDir, 'personamate-standalone.html'), standaloneHtml);

console.log('Created standalone HTML file: dist/personamate-standalone.html');