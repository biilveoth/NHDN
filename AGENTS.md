# Project Conventions

Read `DESIGN_SYSTEM.md` before adding or changing UI. All customer pages must use the same design as Products and Services. Do not introduce a different font, type scale, or palette for a new page.

All table column headers must use `--surface-table-header` (neutral gray, matching Customer 360). Reserve `--surface-header` (pale blue) for section/block titles. Apply this rule to every new table.

Use React feature folders under `src/features/`, shared components under `src/components/`, and separate mock data from rendering. Customer navigation is shared at the app level. Only implement pages with supplied requirements; preserve existing workflows.

Validate changes with `npm run build`, `npm run lint`, and focused browser checks for affected interactions and desktop/mobile overflow.
