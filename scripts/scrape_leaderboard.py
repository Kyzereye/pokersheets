#!/usr/bin/env python3
"""
Scrape player names from the Poker Leaderboard on rockymountainpokervenues.com.
Finds the table under "Poker Leaderboard" (tbody tr.lbMainRow app-player-profile-link),
extracts the link text (name) from each row, and paginates through all pages.
Outputs a TypeScript array to src/app/shared/updated names.ts
"""
from pathlib import Path

from playwright.sync_api import sync_playwright

URL = "https://rockymountainpokervenues.com/"
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "src" / "app" / "shared" / "updated names.ts"

# Leaderboard is in iframe; selectors for the table and pagination
ROW_LINKS = "tr.lbMainRow app-player-profile-link a"
NEXT_BUTTON = "button.mat-paginator-navigation-next"
# Filter dropdowns: set to "All Seasons" and "All Venues" to get full 9967 names
SEASON_SELECT = "tr:has(th:has-text('SEASON')) select"
VENUE_SELECT = "tr:has(th:has-text('VENUE')) select"


def capitalize_name(name: str) -> str:
    """Capitalize first letter of each word (first and last names)."""
    return name.strip().title()


def main() -> None:
    all_names: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(URL, wait_until="networkidle", timeout=60000)
        page.get_by_text("Poker Leaderboard", exact=False).first.wait_for(state="attached", timeout=15000)
        page.get_by_text("Poker Leaderboard", exact=False).first.scroll_into_view_if_needed()
        page.wait_for_timeout(3000)

        # Leaderboard is in an iframe from pokerleaderboards.com
        frame = page.frame_locator('iframe[src*="LeaderBoard.aspx"]')
        # Set filters to "All Seasons" and "All Venues" so we get the full list (9967)
        frame.locator(SEASON_SELECT).select_option(label="All Seasons")
        page.wait_for_timeout(1500)
        # Venue dropdown: try label first, then value="" (common for "All" options)
        try:
            frame.locator(VENUE_SELECT).select_option(label="All Venues")
        except Exception:
            frame.locator(VENUE_SELECT).select_option(value="")
        page.wait_for_timeout(3000)
        # Set "Items per page" to 250 so we have ~40 pages instead of ~500
        try:
            frame.locator("mat-paginator mat-select").click()
            page.wait_for_timeout(500)
            frame.locator("mat-option").filter(has_text="250").click()
            page.wait_for_timeout(2000)
        except Exception:
            pass

        def collect_names(container):
            return [t.strip() for t in container.locator(ROW_LINKS).all_text_contents() if t and t.strip()]

        # Collect from the iframe (use frame for locators)
        first_page_names = collect_names(frame)
        if not first_page_names:
            browser.close()
            raise SystemExit("No leaderboard table found. Page structure may have changed.")

        all_names.extend(first_page_names)
        print(f"Page 1: {len(first_page_names)} names (total so far: {len(all_names)})")

        next_btn = frame.locator(NEXT_BUTTON)
        page_num = 2
        while True:
            try:
                disabled = next_btn.get_attribute("disabled") is not None
                if disabled:
                    break
                next_btn.click()
                page.wait_for_timeout(1500)
                names_on_page = collect_names(frame)
                if not names_on_page:
                    break
                all_names.extend(names_on_page)
                print(f"Page {page_num}: {len(names_on_page)} names (total so far: {len(all_names)})")
                page_num += 1
            except Exception as e:
                print(f"Pagination stopped: {e}")
                break

        browser.close()

    # Deduplicate while preserving order (in case of overlap)
    seen = set()
    unique_names = []
    for n in all_names:
        key = n.strip()
        if key and key not in seen:
            seen.add(key)
            unique_names.append(key)

    if not unique_names:
        raise SystemExit("No names extracted.")

    # Capitalize first/last names and sort alphabetically (case-insensitive)
    unique_names = [capitalize_name(n) for n in unique_names]
    unique_names.sort(key=str.lower)

    body = ",\n".join(f'  "{n}"' for n in unique_names)
    content = f"export const NAMES = [\n{body}\n]\n"
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(content, encoding="utf-8")
    print(f"Wrote {len(unique_names)} names to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
