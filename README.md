# Pokersheets

A printable poker night sign-in sheet for Rocky Mountain Poker Venues. Pick the venue and date, type player names into the seats (names autocomplete from the leaderboard), fill in results and dealers, then print from the browser.

## Run

```
npm install
npm start        # http://localhost:4200
```

`npm run build` writes a static build to `dist/pokersheets/`. `npm test` runs the unit tests.

## Updating the player list

```
pip install -r scripts/requirements.txt
playwright install chromium
python scripts/scrape_leaderboard.py   # overwrites src/app/shared/names.data.ts
```
