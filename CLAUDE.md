# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page Angular 18 + Angular Material app for filling in and printing a poker night sign-in sheet: a venue/date header, a 60-seat sign-in sheet (first game seats 1–40, second game seats 1–20), and a results section (top 10 / top 4 finishers and dealers). The output is printed from the browser (to paper or PDF; the untracked `sheets/` folder holds exported sheets). Nothing is persisted and there is no backend or routing.

## Commands

- `npm start` (`ng serve`): dev server at http://localhost:4200
- `npm run build` (`ng build`): production build to `dist/pokersheets/`. The initial bundle (~609 kB, mostly Material) exceeds the CLI's default 512 kB budget warning.
- `npm test` (`ng test`): Karma/Jasmine. For a single headless run: `npx ng test --watch=false --browsers=ChromeHeadless`
- Run a single spec: `npx ng test --include src/app/shared/filter-options.spec.ts`

## Architecture

- **`AutocompleteFieldComponent`** (`src/app/shared/autocomplete-field/`) is used for every text input: venue, all seats, results and dealers. It takes a `FormControl`, an `options` list, and an optional row `number`. It uses OnPush change detection, and its filter reads `this.options` on each keystroke, so a list that loads later is picked up without rebuilding the observable.
- **`filterOptions`** (`src/app/shared/filter-options.ts`) does the matching: case-insensitive prefix match, empty for blank input, capped at 50 results so the dropdown stays fast with about 9.5k names.
- **Form state lives in `PokerDataService`**, a root-provided service that holds arrays of `FormControl`s (`column1-3`, `gameOne`, `gameTwo`, `dealers`). To change a row count, update the array length there and the matching number array in `poker-sheet.component.ts` or `results.component.ts`. The venue control is local to `HeaderComponent`.
- **The player list is lazy-loaded.** `NamesService.getNames()` dynamically imports `names.data.ts` (about 140 kB), so it builds as a separate chunk outside the initial bundle. `DEALERS` and `VENUES` are small static arrays in `src/app/shared/`.
- **Styles.** The shared column layout (`.column-headers`, `.columns`, `.column`), `.center-header`, and the compact `mat-form-field.small` overrides are global in `src/styles.css`. Each card component keeps its own `mat-card` spacing and `@media print` rules; the sheet and results cards lose their borders and dividers when printed, but the header card keeps its border.

## Regenerating the player name list

`scripts/scrape_leaderboard.py` uses Playwright to scrape every player name from the leaderboard iframe on rockymountainpokervenues.com (All Seasons / All Venues, paginated). It title-cases, dedupes and sorts the names, then overwrites `src/app/shared/names.data.ts`. Review the result with `git diff`.

```
pip install -r scripts/requirements.txt
playwright install chromium
python scripts/scrape_leaderboard.py
```
