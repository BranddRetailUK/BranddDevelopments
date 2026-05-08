# AGENTS.md

## Startup Context

At the start of every new chat or task in this repo, read `contract.md` before answering questions, proposing changes, or editing files. Use it to understand the current UI, services, routes, shared content, and interaction logic.

`contract.md` is context, not a replacement for source inspection. After reading it, inspect the relevant files before making code changes or giving code-specific answers.

## Contract Maintenance

When a task changes the feature surface of the site, update `contract.md` in the same turn. This includes changes to:

- Routes, page sections, navigation, or CTAs.
- UI components, styling systems, section ordering, or responsive behaviour.
- Services, project/MVP content, flagship projects, or shared content data.
- Form behaviour, animation behaviour, links, assets, or other interaction logic.

Keep `contract.md` as a current-state description of the codebase. Do not use it as a changelog. Do not write entries like "added", "removed", "changed", or dated notes unless that wording describes a current product feature.

## Working Rules

- Preserve unrelated user changes in the working tree.
- Prefer existing components, shared data, and CSS patterns before introducing new abstractions.
- Use `data-nav-tone` on major visible sections so the fixed header stays readable.
- Run the relevant verification command after code changes. For this repo, `npm run lint` is the minimum check; use `npm run build` when changes affect routing, Next.js rendering, image config, or TypeScript boundaries.
