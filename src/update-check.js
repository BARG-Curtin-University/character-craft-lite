// update-check.js - ES6+ Modular Version (refactored for external version input)

/**
 * Compares two version strings and returns true if the new version is newer.
 */
export function isNewerVersion(current, latest) {
  const cur = current.split('.').map(Number);
  const lat = latest.split('.').map(Number);
  for (let i = 0; i < Math.max(cur.length, lat.length); i++) {
    if ((lat[i] || 0) > (cur[i] || 0)) return true;
    if ((lat[i] || 0) < (cur[i] || 0)) return false;
  }
  return false;
}

/**
 * Injects the update banner into the page and sets up dismiss handler.
 */
export function showUpdateBanner(version) {
  if (document.getElementById('updateBanner')) return;

  const banner = document.createElement('div');
  banner.id = 'updateBanner';
  banner.className = 'update-banner';
  banner.innerHTML = `
    <strong>Update Available:</strong> A new version (\${version}) of PersonaMate is available.
    <button id="dismissUpdate">Dismiss</button>
  `;

  document.body.appendChild(banner);

  document.getElementById('dismissUpdate').addEventListener('click', () => {
    banner.remove();
    localStorage.setItem('updateDismissed', 'true');
  });
}

/**
 * Checks for updates given a current version string.
 */
export function checkForUpdates(currentVersion) {
  if (!navigator.onLine) return;
  if (localStorage.getItem('updateDismissed') === 'true') return;

  // Try multiple paths to find version.json with better fallbacks
  fetch('./version.json')
    .catch(() => {
      console.log('Trying alternate version.json path');
      return fetch('version.json');
    })
    .catch(() => {
      console.log('Trying absolute path to version.json');
      return fetch('/personamate-lite/version.json');
    })
    .catch(() => {
      // Last resort - create a mock response with default version data
      console.log('Creating mock version response');
      return new Response(JSON.stringify({
        version: '1.0.0',
        releaseDate: '2024-03-22',
        updateUrl: 'https://barg-curtin-university.github.io/personamate-lite/',
        notes: 'Initial release of PersonaMate Lite'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    })
    .then(response => {
      if (!response.ok) throw new Error('Version check failed');
      return response.json();
    })
    .then(data => {
      const latestVersion = data.version;
      if (isNewerVersion(currentVersion, latestVersion)) {
        showUpdateBanner(latestVersion);
      }
    })
    .catch(err => {
      console.warn('Update check skipped or failed:', err.message);
    });
}
