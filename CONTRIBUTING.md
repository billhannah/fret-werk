# Contributing to Fret Werk

Thank you for your interest in contributing to Fret Werk. Contributions of all kinds are welcome, including bug fixes, tests, and feature suggestions.

## Before You Start

- Search [GitHub Issues](https://github.com/billhannah/fret-werk/issues) before opening a new issue or pull request.
- Use a descriptive issue title and include steps to reproduce bugs.
- For substantial changes or new features, open an issue first to discuss the proposed approach.

## Development Setup

Fret Werk uses Vue 3, TypeScript, Vite, pnpm, Vitest, and Prettier.

1. Fork the repository and clone your fork:

   ```bash
   git clone https://github.com/YOUR-USERNAME/fret-werk.git
   cd fret-werk
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm run dev
   ```

   Open `http://localhost:5173` in your browser.

## Making Changes

1. Create a branch for your work:

   ```bash
   git switch -c my-change
   ```

2. Make focused changes and follow the existing Vue, TypeScript, and formatting conventions.
3. Use kebab-case for file names.
4. Prefer Vue components over manually building UI with DOM APIs.
5. Store lengths in millimeters and use the shared distance helpers for unit conversion.
6. Add or update tests for behavior changes.

## Validation

Before submitting a pull request, run:

```bash
pnpm run format:check
pnpm exec vitest run
pnpm run build
```

Use Prettier to format files when needed:

```bash
pnpm run format
```

## Submitting a Pull Request

1. Push your branch to your fork.
2. Open a pull request against the `main` branch.
3. Clearly describe the problem and your solution.
4. Link any related issue using its GitHub number.
5. Include screenshots or a short recording for visual changes.
6. Confirm which validation commands you ran.

Keep pull requests focused and reasonably small. Review and feedback are part of the process; contributors may be asked to revise changes before merge.
