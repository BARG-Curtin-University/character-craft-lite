import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder and output
const adrFolder = path.resolve(__dirname, '../docs/adrs');
const indexFile = path.resolve(adrFolder, 'README.md');

async function generateADRIndex() {
  const files = await fs.readdir(adrFolder);
  const adrFiles = files
    .filter(f => /^adr-\d{3}.*\.md$/i.test(f))
    .sort();

  const entries = [];

  for (const file of adrFiles) {
    const content = await fs.readFile(path.join(adrFolder, file), 'utf-8');

    const titleMatch = content.match(/^#\s*ADR-\d{3}:\s*(.+)$/m);
    const statusMatch = content.match(/^##\s*Status\s*\n([^\n]+)/m);

    const title = titleMatch ? titleMatch[1].trim() : '(No Title Found)';
    const status = statusMatch ? statusMatch[1].trim() : 'Unknown';

    entries.push({
      file,
      number: file.match(/adr-(\d{3})/i)[1],
      title,
      status
    });
  }

  const tableRows = entries.map(entry =>
    `| [ADR-${entry.number}](./${entry.file}) | ${entry.title} | ${entry.status} |`
  );

  const output = `# Architecture Decision Records (ADR) Index

This file is auto-generated. Do not edit by hand.

| ADR | Title | Status |
|-----|-------|--------|
${tableRows.join('\n')}
`;

  await fs.writeFile(indexFile, output);
  console.log(`✅ ADR index generated with ${entries.length} entries → docs/adr/index.md`);
}

generateADRIndex().catch(err => {
  console.error('❌ Error generating ADR index:', err);
});
