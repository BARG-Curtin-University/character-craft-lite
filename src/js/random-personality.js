import { getRandomOptionExcluding, generateRandomMultiSelect } from './inputs.js';
import { generateRandomOrgName } from './data/models.js';
import { generatePersonality } from './generation.js';
import { collectFormData } from './data/rag.js';
import { resetForm } from './export.js';

export function generateRandomPersonality() {
  console.log("✅ generateRandomPersonality called");

  try {
    // Reset form
    resetForm(false);

    // Generate random base data
    const randomPerson = {
      name: "Alex Johnson",
      gender: "neutral",
      ageRange: "31-35",
      role: { title: "Team Lead" }
    };

    const person = {
      ...randomPerson,
      name: randomPerson.name,
      gender: randomPerson.gender,
      ageRange: randomPerson.ageRange,
      role: randomPerson.role.title
    };

    document.getElementById('characterName').value = person.name;
    document.getElementById('characterGender').value = person.gender;
    document.getElementById('characterAge').value = person.ageRange;
    document.getElementById('characterRole').value = person.role;

    // Organization fields
    const orgType = generateRandomOptionExcluding('orgType', ['', 'custom']);
    const orgName = generateRandomOrgName(orgType);
    const audience = generateRandomOptionExcluding('primaryAudience', ['', 'custom']);

    document.getElementById('orgType').value = orgType;
    document.getElementById('orgName').value = orgName;
    document.getElementById('primaryAudience').value = audience;

    // Multi-select fields
    generateRandomMultiSelect('obTheoriesSelect', 'obTheories', 2, 4);
    generateRandomMultiSelect('decisionMakingSelect', 'decisionMaking', 1, 3);
    generateRandomMultiSelect('valuesSelect', 'coreValues', 2, 4);

    // Dropdowns
    document.getElementById('communicationStyle').value = generateRandomOptionExcluding('communicationStyle', ['']);
    document.getElementById('conflictResolution').value = generateRandomOptionExcluding('conflictResolution', ['']);
    document.getElementById('negotiationMethod').value = generateRandomOptionExcluding('negotiationMethod', ['']);
    document.getElementById('emotionalIntelligence').value = generateRandomOptionExcluding('emotionalIntelligence', ['']);
    document.getElementById('feedbackMechanism').value = generateRandomOptionExcluding('feedbackMechanism', ['']);

    // Trigger persona generation
    generatePersonality();

    // Toggle visibility
    document.querySelector('.form-card')?.classList.remove('visible');
    document.querySelector('.output-card')?.classList.add('visible');

    console.log("🎉 Random personality generated successfully");

  } catch (error) {
    console.error("❌ Error in generateRandomPersonality:", error);
  }
}
