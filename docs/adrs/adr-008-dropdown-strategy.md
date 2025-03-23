# ADR-008: Dropdown Data Strategy

## Status
Accepted

## Context
CharacterCraft Lite includes several dropdowns and multi-select fields (e.g. communication style, core values, audience types). Initially, these options were hard-coded in HTML or scattered across different scripts.

As the application matured, we needed a centralized, maintainable, and reusable approach to managing option data:
- Dropdowns should be easy to populate dynamically
- Random generators should reuse the same options
- Updating labels or adding/removing values should require editing in one place only

## Decision
We consolidated dropdown and chip-select options into a single JavaScript file: `models.js`, placed under `js/data/`.

### Characteristics of This Approach
- Each field (e.g. `coreValues`, `communicationStyle`) exports an array of string values
- The values are used both to populate UI elements *and* by functions like `getRandomOption()`
- Data is imported where needed (e.g. `inputs.js`, `random-personality.js`)

### Example
```js
export const coreValues = [
  "Integrity",
  "Innovation",
  "Collaboration",
  "Empathy",
  ...
];
```

## Consequences
✅ Central source of truth for dropdown data
✅ Makes random generation, population, and validation easier
✅ Scales well as more structured personality fields are added
⚠️ Values must match UI labels unless mapping logic is introduced

## Alternatives Considered
- Inline HTML `<option>`s (not reusable)
- Static JSON files (harder to import/export as ES6 modules)
- External CMS or spreadsheet (overkill for current project scope)

## Future Considerations
- Add support for internationalization (i18n) if needed
- Use value–label pairs for cleaner UI while retaining programmatic identifiers
- Group related values (e.g. by persona type) if complexity increases

---

*This strategy prioritizes maintainability, reusability, and coherence across the UI and data generation logic.*

