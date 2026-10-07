# SaleApp Design System

User-approved baseline: the Products and Services page. Apply these conventions to all future pages, including Customer 360.

## Typography

Self-hosted Roboto with Arial and sans-serif fallbacks. Use the font files imported in `src/main.jsx`, including Vietnamese glyphs.

| Element                       | Class           | Size | Weight |
| ----------------------------- | --------------- | ---- | ------ |
| Body                          | body            | 12px | 400    |
| Page title, when present      | .page-title     | 20px | 700    |
| Navigation and subtabs        | .nav-tab        | 11px | 400    |
| Active navigation and subtabs | .nav-tab.active | 11px | 500    |
| Section title                 | .section-title  | 12px | 600    |
| Table header                  | .table-header   | 11px | 500    |
| Table cell                    | .table-cell     | 11px | 400    |

Do not scale type with viewport width. Match information hierarchy and component density to the reference images while preserving this type scale. Detail dialogs follow the existing compact four-column layout with 11px labels and 12px values.

## Colors And Layout

Shared tokens are defined in `src/index.css`: primary blue `#4878ff`, active inset `#5784ff`, white surfaces, cool gray/lavender page background `#e5e7f3`, pale blue section headers `#edf2ff`, neutral gray table headers `#eff1f5`, borders `#e5e9f2`, body text `#20232a`, headings `#171d40`, navigation `#202746`, table text `#252b49`. This palette reflects the updated Customer 360 reference approved on 2026-10-07 and is shared across pages.

Collapsible block title bars use a subtle 1px border and 4px corner radius. Keep section-header blue distinct from table-header gray. Avoid filter-based darkening of title bars on hover; use an explicit pale blue hover background.

All table column header cells must use the shared neutral gray token `--surface-table-header` (`#eff1f5`), matching Customer 360. This applies to existing tables and every future table, including Risk Management. Do not override table headers with the pale blue section-header token. Pale blue remains reserved for section/block title bars.

Use these tokens instead of creating a page-specific palette. Keep corners between 3px and 7px and avoid decorative shadows. Tables use thin borders, explicit column widths, and horizontal scrolling on narrow screens. Sections are compact, with small gaps. Use Lucide icons for controls, visible focus outlines, and accessible names on icon buttons.

## Behavior And Structure

The shared Customer Information block sits above main navigation on all customer pages. It uses two label/value columns, 12px text, muted lavender labels, and an outlined collapse/expand button. Collapse preserves the title and button; expansion restores all 17 fields. Missing customer information displays `---` until supplied. Field data is separate in `src/features/customer/data/customerInformation.js`.

`CustomerNavigation` is shared between pages. `#overview` opens Customer 360; `#products` opens Products and Services; `#risk` opens Risk Management / Collateral. Browser history and refresh preserve the selected page. Other navigation items remain unavailable until their screens are implemented.

Risk Management uses the same typography, palette, rounded title bars, and tables. The collateral tab has accent-insensitive search, Excel export of all matching rows, and pagination (10 records by default). Additional risk subtabs remain unavailable until supplied. The Excel utility is shared in `src/utils/exportExcel.js`.

Use `DataTable` for shared table typography. Use feature-specific components for distinct layouts. Preserve contract links, double-click detail dialogs, and real Excel exports on product tables. Keep data and column configuration separate from rendering components.

Customer 360 has representative subtabs and collapsible people sections with 10px spacing. The business tab uses a two-column description list, with 12px labels in the shared muted lavender token `--text-label` (`#9290b1`) and 12px body values. Stack the columns on narrow screens. Unavailable values display `---`. Field definitions and user-requested sample values live in `src/features/customer360/data/businessInformation.js`; replace samples with API data when available. Monetary sample values use Vietnamese grouping separators and an explicit currency. Identify sample values when reporting implementation to the user.
