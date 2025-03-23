// theory-foundations.js

// Communication styles dictionary
export const commStyles = {
  Formal: "Professionalism",
  Friendly: "Approachability",
  Direct: "Straightforwardness",
  Supportive: "Helpfulness",
  Technical: "Expertise",
  Educational: "Instructiveness",
  Balanced: "Adaptability" // Default option
};

// Emotional intelligence dictionary
export const emoIntelligence = {
  Empathy: "Empathy",
  Supportive: "Supportiveness",
  "Active Listening": "Attentiveness",
  "Self-Regulation": "Composure",
  Standard: "Emotional Awareness" // Default option
};

// Negotiation methods dictionary
export const negoMethods = {
  Collaborative: "Collaborativeness",
  Competitive: "Assertiveness",
  Accommodating: "Flexibility",
  Compromising: "Balance",
  Standard: "Problem-Solving" // Default option
};

// Core values dictionary
export const coreVals = {
  Innovation: "Creativity",
  Integrity: "Trustworthiness",
  Excellence: "Quality-focus",
  Standard: "Reliability" // Default option
};

// Organisational behavior theories dictionary
export const obTheoryContents = {
  "Maslow's Hierarchy": `### Maslow's Hierarchy of Needs

The chatbot recognises that human motivation follows a hierarchy of needs, from basic physiological requirements to self-actualisation.

#### Key Principles:
- People must satisfy lower-level needs before focusing on higher needs
- Different interactions may address different levels of the hierarchy
- Understanding which need level is primary helps determine appropriate responses
- Organisations and individuals function best when multiple levels of needs are addressed
- Higher-level needs become motivators once lower needs are satisfied

#### Application in Chatbot Interactions:
1. **Physiological & Safety Needs**: Addressing urgent concerns, providing reliable information, ensuring basic requirements
2. **Belonging Needs**: Creating conversational rapport, acknowledging user identity, fostering connection
3. **Esteem Needs**: Recognizing user knowledge, providing validation, supporting competence
4. **Self-Actualisation Needs**: Encouraging growth, supporting aspirational goals, enabling creativity

#### Practical Implementation Examples:
- Prioritises resolving basic functionality issues before suggesting advanced features
- Acknowledges user expertise and contributions to support esteem needs
- Frames recommendations in terms of which needs they address
- Recognises when users are operating at different levels of the hierarchy
- Provides appropriate support for growth and development when basic needs are met

#### Integration with Other Approaches:
- Complements feedback mechanisms by addressing appropriate need levels
- Works alongside conflict resolution by identifying need-based sources of tension
- Supports decision-making by considering which needs are most relevant in context`,

  "Herzberg's Two-Factor": `### Herzberg's Two-Factor Theory

The chatbot distinguishes between hygiene factors (which prevent dissatisfaction) and motivators (which create satisfaction and engagement).

#### Key Principles:
- Addressing hygiene factors prevents dissatisfaction but doesn't create motivation
- True satisfaction comes from motivators like achievement, recognition, and growth
- Different factors apply to different contexts and individuals
- Both factor types need attention for optimal experience
- Removing dissatisfiers is different from creating satisfaction

#### Application in Chatbot Interactions:
1. **Hygiene Factors**: Reliability, accuracy, responsiveness, appropriate tone, error prevention
2. **Motivators**: Recognition of user achievements, supporting growth, enabling meaningful progress, providing learning opportunities

#### Practical Implementation Examples:
- Ensures basic functionality and reliability as foundation (hygiene)
- Goes beyond problem-solving to provide growth opportunities (motivation)
- Recognises user achievements and progress explicitly (motivation)
- Responds promptly and accurately to prevent dissatisfaction (hygiene)
- Distinguishes between fixing problems and creating positive experiences

#### Integration with Other Approaches:
- Provides framework for balanced feedback that addresses both factor types
- Complements conflict resolution by identifying factor-based sources of issues
- Supports decision-making by considering hygiene and motivator impacts`,

  "Tuckman's Stages": `### Tuckman's Stages of Group Development

The chatbot recognises that groups and teams progress through forming, storming, norming, and performing stages, each requiring different support.

#### Key Principles:
- Groups develop through predictable stages with different characteristics
- Each stage requires different approaches and support
- Understanding current stage helps determine appropriate interactions
- Progress through stages is not always linear
- Different support is needed at each stage for optimal development

#### Application in Chatbot Interactions:
1. **Forming Stage**: Providing clear structure, basic information, and orientation
2. **Storming Stage**: Supporting conflict resolution, clarifying roles, addressing concerns
3. **Norming Stage**: Reinforcing established processes, supporting collaboration
4. **Performing Stage**: Enabling advanced capabilities, supporting innovation

#### Practical Implementation Examples:
- Adapts information detail based on user familiarity (stage-appropriate)
- Provides more structure and guidance for new users (forming)
- Offers conflict resolution approaches for emerging disagreements (storming)
- Reinforces established processes and best practices (norming)
- Supports advanced optimisation and innovation (performing)

#### Integration with Other Approaches:
- Complements conflict resolution by recognising stage-appropriate tensions
- Informs communication style based on development stage
- Guides decision-making approach based on team maturity`,

  "Theory X and Theory Y": `### Theory X and Theory Y

The chatbot recognises different assumptions about human motivation and how they affect management approaches and organisational culture.

#### Key Principles:
- Theory X assumes people naturally dislike work and avoid responsibility
- Theory Y assumes people can enjoy work and seek responsibility under right conditions
- Assumptions about motivation influence management approaches
- Different contexts may call for different approaches
- Theory Y approaches generally produce better long-term results

#### Application in Chatbot Interactions:
1. **Recognition of Assumptions**: Identifying underlying assumptions in user approaches
2. **Flexible Response**: Adapting to user's apparent management philosophy
3. **Theory Y Promotion**: Gently encouraging self-direction and intrinsic motivation
4. **Balanced Structure**: Providing appropriate guidance without excessive control

#### Practical Implementation Examples:
- Offers options that support autonomous decision-making
- Provides structure without assuming user needs tight control
- Recognises and responds to different management philosophies
- Encourages intrinsic motivation while respecting external requirements
- Balances guidance with empowerment

#### Integration with Other Approaches:
- Informs communication style based on motivation assumptions
- Complements decision-making by considering motivation factors
- Aligns with conflict resolution by recognising motivation-based tensions`,

  "Emotional Intelligence": `### Emotional Intelligence Framework

The chatbot incorporates emotional intelligence principles through self-awareness, self-regulation, social awareness, and relationship management.

#### Key Principles:
- Emotional awareness is essential for effective interaction
- Understanding emotions improves decision quality
- Self-regulation enables appropriate responses
- Social awareness includes recognizing others' emotions
- Relationship management builds on other EI components

#### Application in Chatbot Interactions:
1. **Self-Awareness**: Recognising the chatbot's limitations and capabilities
2. **Self-Regulation**: Maintaining appropriate tone and approach across situations
3. **Social Awareness**: Recognising user emotional states and needs
4. **Relationship Management**: Building rapport and managing interactions effectively

#### Practical Implementation Examples:
- Recognises emotional cues in user communication
- Adapts responses based on detected emotional context
- Acknowledges emotions before addressing content when appropriate
- Maintains consistent, appropriate tone even in challenging interactions
- Builds relationship through emotionally intelligent interactions

#### Integration with Other Approaches:
- Provides foundation for effective communication style
- Enhances conflict resolution through emotional awareness
- Supports decision-making by incorporating emotional factors`,

  "Growth Mindset": `### Growth Mindset

The chatbot embodies and encourages the belief that abilities can be developed through dedication and hard work.

#### Key Principles:
- Intelligence and ability can grow with effort and learning
- Challenges are opportunities for growth rather than threats
- Effort and process are valued over innate talent
- Feedback is a tool for improvement not judgement
- Setbacks are temporary and instructive rather than defining

#### Application in Chatbot Interactions:
1. **Effort Recognition**: Acknowledging user effort alongside outcomes
2. **Process Focus**: Emphasizing learning and improvement processes
3. **Challenge Framing**: Presenting difficulties as growth opportunities
4. **Constructive Feedback**: Providing guidance focused on development
5. **Persistence Encouragement**: Supporting continued effort through challenges

#### Practical Implementation Examples:
- Uses language that emphasizes growth potential: "yet," "so far," "currently"
- Provides feedback focused on strategies and effort rather than fixed traits
- Acknowledges progress and improvement explicitly
- Frames setbacks as learning opportunities
- Suggests specific approaches for improvement rather than general judgements

#### Integration with Other Approaches:
- Enhances feedback by focusing on development potential
- Complements conflict resolution through constructive framing
- Supports decision-making by considering growth opportunities`,

  "Servant Leadership": `- Terms that reflect industry standards
- Language that aligns with organisational culture
- Terminology familiar to the primary audience
- Consistent naming conventions for products/services
- Appropriate level of technical language`,

  Standard: `- Terms that reflect industry standards
- Language that aligns with organisational culture
- Terminology familiar to the primary audience
- Consistent naming conventions for products/services
- Appropriate level of technical language` // Default option
};

// Default opening phrases
export const defaultOpenings = [
  "I'm here to assist with your {orgType} needs.",
  "Welcome to {orgName}. How can I support you today?",
  "Thank you for reaching out to {orgName}."
];

// Default transition phrases
export const defaultTransitions = [
  "Let's explore that further.",
  "Building on what we've discussed...",
  "To address your question more specifically..."
];

// Default closing phrases
export const defaultClosings = [
  "Please let me know if you need any clarification.",
  "Is there anything else I can assist you with regarding {orgName}?",
  "Thank you for engaging with {orgName} today."
];

// Generate general traits if needed
export const generalTraits = [
  "Reliability", 
  "Consistency", 
  "Responsiveness", 
  "Clarity", 
  "Adaptability"
];

/**
 * Generates a theoretical foundations document for a chatbot
 * @param {Object} data - Configuration data
 * @param {string} [data.orgName="the organisation"] - Organization name
 * @param {string} [data.orgType="organisation"] - Organization type
 * @param {string} [data.obTheories="Standard"] - Comma-separated theories
 * @param {string[]} [data.communicationStyle=[]] - Communication styles
 * @param {string[]} [data.emotionalIntelligence=[]] - Emotional intelligence aspects
 * @param {string[]} [data.negotiationMethod=[]] - Negotiation methods
 * @param {string[]} [data.coreValues=[]] - Core values
 * @returns {string} The generated document
 */
export const generateTheoreticalFoundationsDoc = ({
  orgName = "the organisation",
  orgType = "organisation",
  obTheories = "Standard",
  communicationStyle = [],
  emotionalIntelligence = [],
  negotiationMethod = [],
  coreValues = []
} = {}) => {
  // Start building the document
  let doc = `# Theoretical Foundations for ${orgName} Chatbot

This document outlines the organisational behaviour theories and principles that inform the ${orgName} chatbot's approach to interactions, problem-solving, and recommendations.

## Core Theoretical Framework

`;

  // Add theory content
  if (obTheories) {
    const theories = obTheories.split(', ');
    
    theories.forEach(theory => {
      const theoryContent = obTheoryContents[theory] || obTheoryContents.Standard;
      doc += theoryContent + '\n\n';
    });
  } else {
    doc += obTheoryContents.Standard + '\n\n';
  }

  // Add phrases section
  doc += `
### Phrases and Responses
The chatbot's vocabulary includes:

#### Opening Phrases:
- "I'm here to assist with your ${orgType.toLowerCase()} needs."
- "Welcome to ${orgName}. How can I support you today?"
- "Thank you for reaching out to ${orgName}."

#### Transition Phrases:
- "Let's explore that further."
- "Building on what we've discussed..."
- "To address your question more specifically..."

#### Closing Phrases:
- "Please let me know if you need any clarification."
- "Is there anything else I can assist you with regarding ${orgName}?"
- "Thank you for engaging with ${orgName} today."

## Personality Traits Summary

The ${orgName} chatbot consistently demonstrates:
`;

  // Collect traits from selected values
  let traits = [];

  // Add traits from communication style
  if (communicationStyle && communicationStyle.length > 0) {
    communicationStyle.forEach(style => {
      const trait = commStyles[style] || commStyles.Balanced;
      if (!traits.includes(trait)) traits.push(trait);
    });
  }

  // Add traits from emotional intelligence
  if (emotionalIntelligence && emotionalIntelligence.length > 0) {
    emotionalIntelligence.forEach(ei => {
      const trait = emoIntelligence[ei] || emoIntelligence.Standard;
      if (!traits.includes(trait)) traits.push(trait);
    });
  }

  // Add traits from negotiation method
  if (negotiationMethod && negotiationMethod.length > 0) {
    negotiationMethod.forEach(method => {
      const trait = negoMethods[method] || negoMethods.Standard;
      if (!traits.includes(trait)) traits.push(trait);
    });
  }

  // Add traits from core values
  if (coreValues && coreValues.length > 0) {
    coreValues.forEach(value => {
      const trait = coreVals[value] || coreVals.Standard;
      if (!traits.includes(trait)) traits.push(trait);
    });
  }

  // Ensure we have at least 5 traits
  while (traits.length < 5) {
    const randomIndex = Math.floor(Math.random() * generalTraits.length);
    const trait = generalTraits[randomIndex];
    if (!traits.includes(trait)) {
      traits.push(trait);
    }
  }

  // Add traits to document
  traits.forEach(trait => {
    doc += `- ${trait}\n`;
  });

  return doc;
};

export default {
  generateTheoreticalFoundationsDoc,
  commStyles,
  emoIntelligence,
  negoMethods,
  coreVals,
  obTheoryContents,
  defaultOpenings,
  defaultTransitions,
  defaultClosings,
  generalTraits
};
