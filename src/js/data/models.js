/**
 * models.js - Data models for random generation
 * Contains data structures for generating random personas
 */

// ------------------------------------------------
// DATA MODELS
// ------------------------------------------------

// Arrays for demographic and role generation
export const firstNames = {
  masculine: ['James', 'David', 'Michael', 'Robert', 'John', 'William', 'Richard', 'Thomas', 'Daniel', 'Carlos', 'Wei', 'Jamal', 'Sanjay', 'Ahmed', 'Alejandro'],
  feminine: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Fatima', 'Priya', 'Aisha', 'Sofia', 'Mei', 'Zara']
};

export const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Patel', 'Kim', 'Lee', 'Wong', 'Nguyen', 'Ali', 'Singh', 'Gupta', 'Chen', 'Lopez'];

export const genders = ['masculine', 'feminine', 'neutral'];

export const ageRanges = ['25-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56-60'];

export const organisationalRoles = [
  {
    title: 'Senior Manager',
    description: 'An experienced leader focused on strategic decisions and team development.',
    traits: 'Assertive, strategic, decisive, and empathetic',
    specialties: 'Leadership challenges, decision-making under pressure, and effective delegation'
  },
  {
    title: 'HR Specialist',
    description: 'A people-focused professional skilled in workplace policies and employee relations.',
    traits: 'Empathetic, diplomatic, detail-oriented, and fair',
    specialties: 'Conflict resolution, policy guidance, and workplace ethics'
  },
  {
    title: 'Team Lead',
    description: 'A hands-on leader balancing technical expertise with people management.',
    traits: 'Collaborative, tactical, supportive, and pragmatic',
    specialties: 'Project management, team motivation, and operational excellence'
  },
  {
    title: 'New Employee',
    description: 'A recent addition to the organisation navigating the culture and expectations.',
    traits: 'Curious, adaptable, eager to learn, and occasionally uncertain',
    specialties: 'Fresh perspectives, learning experiences, and integration challenges'
  },
  {
    title: 'Mentor',
    description: 'An experienced guide focused on developing others through wisdom and support.',
    traits: 'Insightful, patient, encouraging, and experienced',
    specialties: 'Professional development, constructive feedback, and career guidance'
  },
  {
    title: 'Subject Matter Expert',
    description: 'A domain specialist with deep knowledge in their field.',
    traits: 'Analytical, precise, thorough, and knowledge-driven',
    specialties: 'Technical guidance, quality standards, and specialised problem-solving'
  },
  {
    title: 'Cross-Functional Coordinator',
    description: 'A connector who works across different teams and departments.',
    traits: 'Versatile, diplomatic, communicative, and solution-oriented',
    specialties: 'Interdepartmental collaboration, diverse perspectives, and organisational alignment'
  }
];

/**
 * Gets a random item from an array
 * @param {Array} array - The array to select from
 * @returns {*} A random item from the array
 */
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generates a random person with demographic information
 * @returns {Object} A random person object with name, gender, age, and role
 */
export function generateRandomPerson() {
  const gender = getRandomItem(genders);
  const firstName = gender === 'neutral'
    ? getRandomItem([...firstNames.masculine, ...firstNames.feminine])
    : getRandomItem(firstNames[gender]);
  const lastName = getRandomItem(lastNames);
  const ageRange = getRandomItem(ageRanges);
  const role = getRandomItem(organisationalRoles);

  return {
    name: `${firstName} ${lastName}`,
    gender: gender,
    ageRange: ageRange,
    role: role
  };
}

/**
 * Generates a random organization name based on org type
 * @param {string} orgType - The type of organization
 * @returns {string} A random organization name
 */
export function generateRandomOrgName(orgType) {
  const prefixes = ['Global', 'Next', 'Future', 'Alpha', 'Omega', 'Nova', 'Quantum', 'Apex', 'Pioneer', 'Elite', 'Prime', 'Vision', 'Horizon', 'Zenith', 'Vertex'];
  const suffixes = ['Solutions', 'Innovations', 'Systems', 'Dynamics', 'Technologies', 'Enterprises', 'Group', 'Partners', 'Network', 'International', 'Labs', 'Collective', 'Alliance', 'Ventures'];
  const orgNames = {
    'Tech Startup': ['ByteForge', 'CodeNova', 'PixelPulse', 'DataSpark', 'CloudShift', 'TechNexus', 'InnovateByte'],
    'Multinational Corporation': ['GlobalTech', 'MegaCorp', 'WorldWide Industries', 'OmniCorp', 'Universal Enterprises'],
    'Nonprofit Organisation': ['Community Bridge', 'Global Impact', 'Helping Hands', 'Care Collective', 'Hope Foundation'],
    'Educational Institution': ['Knowledge Academy', 'Learning Horizons', 'Wisdom Institute', 'Scholars University', 'Education Nexus'],
    'Healthcare Provider': ['WellCare', 'Healing Horizons', 'MediLife', 'Health Partners', 'CarePrime'],
    'Government Agency': ['Public Services Division', 'Civic Development Authority', 'Municipal Operations', 'Regulatory Commission'],
    'Small Business': ['Local Crafts', 'Family Traditions', 'Community Shop', 'Main Street Services', 'Neighborhood Goods'],
    'E-commerce Platform': ['ShopStream', 'MarketPulse', 'ClickCart', 'BuyBox', 'TradeHub'],
    'Customer Service': ['Support Solutions', 'ClientCare', 'Service Excellence', 'CustomerFirst', 'ResponseTeam']
  };

  if (orgType && orgNames[orgType]) {
    return orgNames[orgType][Math.floor(Math.random() * orgNames[orgType].length)];
  } else {
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${randomPrefix} ${randomSuffix}`;
  }
}