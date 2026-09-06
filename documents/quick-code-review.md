# Quick Code Review

Reviewed on 2026-09-06.

## Findings

1. High: `getJokes` returns too few jokes whenever the requested count is a multiple of 10.
   - Location: `joke-getter.js:27-40`, especially `joke-getter.js:30`.
   - The loop starts at `count = 1` and stops at `count * 10 < number`, so `getJokes(10)` performs zero `amount=10` requests and `getJokes(100)` performs only nine of them.
   - I validated the current logic in Node: `10 -> 0`, `20 -> 10`, `99 -> 99`, `100 -> 90`.
   - Recommendation: compute the number of full batches directly with `Math.floor(number / 10)` and iterate from `0` to `< fullBatches`.

2. High: Joke text from the external API is inserted into the page as raw HTML.
   - Location: `joke-getter.js:20-21` and `joke-getter.js:74`.
   - `joke.setup`, `joke.delivery`, and `joke.joke` are interpolated into an HTML string and then appended to the DOM. If the upstream API or any intermediary ever returns markup instead of plain text, the browser will parse it.
   - Recommendation: build DOM nodes and assign text with `textContent` or jQuery `.text()` instead of concatenating HTML strings.

3. Medium: Root-relative asset paths make the site fragile outside domain-root hosting.
   - Location: `index.html:21`, `index.html:30`, and `index.html:108`.
   - `/styles.css`, `/banner.png`, and `/joke-getter.js` will break when the site is opened locally from disk or hosted from a subdirectory such as a GitHub Pages project site.
   - Recommendation: use relative paths like `./styles.css`, `./banner.png`, and `./joke-getter.js` for a static site unless you intentionally require root deployment.

4. Medium: One third-party script is loaded over plain HTTP.
   - Location: `index.html:74`.
   - On an HTTPS deployment, browsers can block this as mixed content. Even when it loads, HTTP weakens the trust boundary for code executed in the page.
   - Recommendation: switch to an HTTPS endpoint if the vendor supports it, or remove the dependency.

5. Low: There is dead UI logic left over from a checkbox-based implementation.
   - Location: `joke-getter.js:43-58`, `styles.css:30-36`, and `index.html:35-59`.
   - `#show-nsfw` does not exist in the HTML, `.category` elements are `div`s so their `.change()` handlers and `this.checked` checks never do anything, and related CSS selectors are unused.
   - Recommendation: remove the dead code or restore the missing form controls so the behavior and markup stay aligned.

## Testing Gap

- There is no small smoke test around `getJokes`, which is why the off-by-one batch bug can survive unnoticed.
- Even a tiny assertion around counts for `10`, `11`, and `100` would catch the main correctness issue quickly.

## Scope

This review covered `index.html`, `joke-getter.js`, and `styles.css`. I did not change the site code.