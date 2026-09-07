# Follow-Up Code Review

Reviewed on 2026-09-07.

## Findings

1. High: The AvantLink "script" URL is returning HTML, so Chromium-based browsers block it and the integration never executes.
   - Location: `index.html:168`.
   - The page includes `https://classic.avantlink.com/affiliate_app_confirm.php?...` as a normal `<script src>`, but a direct fetch now returns `200 OK` with `Content-Type: text/html; charset=UTF-8` and a `<!DOCTYPE html ...>` payload instead of JavaScript.
   - That matches the browser behavior seen during preview, where the request is rejected with `net::ERR_BLOCKED_BY_ORB`.
   - Recommendation: replace this with the vendor's current JavaScript embed URL, or remove it until a script endpoint that actually serves JavaScript is available.

2. Medium: Mobile "load more" can exhaust the 100-joke budget while showing far fewer visible jokes than the user asked for.
   - Location: `joke-getter.js:91-97`, `joke-getter.js:113-148`, and `joke-getter.js:182-189`.
   - Every fetch still targets `joke/Any`, while the category and NSFW controls only hide cards after they have already been fetched and counted toward `loadedCount`.
   - In the mobile preview, the first batch loaded 15 cards but only 8 were visible with the default safety filter. After one scroll, the DOM held 25 loaded cards but only 17 were visible.
   - That means a narrowed feed such as Programming-only can hit the `NUMBER_OF_JOKES` cap after surfacing much less than 100 visible jokes.
   - Recommendation: either request categories from the API that match the current filter state, or treat the 100-joke limit as a visible-card target instead of a fetched-card target.

3. Medium: Joke API failures still have no user-visible fallback, which can leave the page blank on first load or silently stop pagination later.
   - Location: `joke-getter.js:85-102`, `joke-getter.js:129-152`, and `joke-getter.js:207-220`.
   - `getJokes` only guarantees that the spinner is hidden. It does not convert request failures into a recoverable UI state.
   - `setup()` awaits the initial batch without a `catch`, so an initial network error leaves `#jokes-mount` empty and the page offers no explanation. Later batch failures also surface no inline error or retry message.
   - Recommendation: catch fetch errors around the initial load and incremental loads, render a small status message, and keep a visible retry path.

## Testing Gap

- There is still no automated smoke test around the recent pagination changes.
- The highest-value cases now are:
  - desktop initial load returns 100 cards and hides the load-more control
  - mobile initial load returns the smaller first batch
  - mobile scroll or button loading appends another batch
  - category or NSFW filtering does not re-show excluded categories
  - an API failure produces a visible error state instead of a blank page

## Scope

This follow-up review covered `index.html`, `joke-getter.js`, `styles.css`, `robots.txt`, and `sitemap.xml`. I did not change the site code as part of the review.