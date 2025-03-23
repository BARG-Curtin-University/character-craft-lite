# ADR-009: Event Handling Strategy

## Status
Accepted

## Context
CharacterCraft Lite began with inline event handlers (e.g. `onclick="generateRandomPersonality()"`), which worked well for the original single-file prototype. As the project adopted ES6 modules and modularized JavaScript, this approach became less viable:

- Inline handlers don’t play well with `type="module"`
- They tightly couple HTML with implementation details
- They create issues when trying to dynamically bind or scope events

We needed a consistent, scalable strategy for adding event listeners that would:
- Work across modular files
- Remain maintainable as more UI elements and dynamic states are introduced
- Avoid reliance on global scope

## Decision
We adopted a **programmatic event binding approach**, where all event listeners are registered explicitly in `index.js` or relevant modules using `addEventListener()`.

### Examples
```js
// In index.js
import { generateRandomPersonality } from './random-personality.js';

document.getElementById('generateRandomBtn')?.addEventListener('click', generateRandomPersonality);
```

- No inline JS handlers in HTML
- Bindings are colocated with logic or central `index.js` bootstrapping
- Where appropriate, reusable setup functions are used (e.g. `setupChipSelectors()`)

## Consequences
✅ Works well with modules and bundlers
✅ Keeps HTML clean and separation of concerns strong
✅ Easier to test and debug
⚠️ Requires careful timing — ensure DOM is loaded before attaching handlers (e.g. `DOMContentLoaded`)

## Alternatives Considered
- Inline handlers (`onclick`, `onchange`) — fast, but brittle
- Framework-like delegation (e.g. via `data-action`) — too heavy for current needs
- Global function references — incompatible with modular ES6

## Future Considerations
- Consider a lightweight internal `events.js` module if handlers grow too large
- Introduce DOM-ready utility (`onReady(fn)`) for async-safe binding
- Migrate toward a small reactive pattern or state-driven component system if UI state grows complex

---

*This decision aligns with our philosophy of progressive enhancement and modular maintainability.*

