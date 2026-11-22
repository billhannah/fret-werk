# Project instructions

- This project recreates fretfind2d, a tool for calculating and diagramming fret positions on stringed instruments.
- Use kebab-case for file names.
- Use SVG rather than canvas for drawing, so diagrams can be exported to vector-based file formats.
- The UI uses Vue 3 with TypeScript and Vite. Prefer Vue components over manually building UI with DOM APIs.
- Organize components in named kebab-case folders with an `index.vue` entry point when following the component-folder pattern.
- Use Prettier for formatting. Keep semicolons enabled and follow the repository's `.prettierrc.json`.
- Use `export const name = (...) => {}` for functions rather than function declarations.
- Keep expected input validation errors in typed result values instead of throwing exceptions.
- Store lengths canonically in millimeters; convert to and from the selected display unit with the shared distance helpers.
- Keep app-wide settings reactive in the app root and provide them through the typed Vue `settingsKey` context. Use the context's update method for child edits rather than prop-drilling or letting fields independently own app state.
- `vue-tsc` does not work with the stock TypeScript 7 package in this setup. pnpm overrides TypeScript with `typescript-native-bridge`; retain the override unless deliberately changing the type-checking toolchain. TypeScript 5 is a fallback if the bridge causes problems.

## Validation

- Run `pnpm run build` for Vue type-checking and the production build.
- Run `pnpm exec vitest run` for tests.
- Run `pnpm run format:check` to verify formatting.
