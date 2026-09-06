# Retro-Modern Refresh Recommendations

Prepared on 2026-09-06.

## Direction

Keep the site's late-90s internet personality, but shift it from a mostly unstyled black page with bright text into something that feels intentionally designed. The target should be a cyber-arcade zine look: neon accents, dark surfaces, playful attitude, and much cleaner spacing and structure.

## Keep These Anchors

- Black or near-black page background.
- Saturated accent colors, especially cyan, green, and red.
- Simple click-to-toggle category controls.
- The centered banner and one-page layout.
- A little bit of old-web weirdness, but edited down so it feels deliberate instead of accidental.

## Recommendations

### 1. Upgrade the typography stack

- Use one display font for the banner and section labels, and one readable sans-serif for body copy.
- Good pairings:
  - Display: VT323, Orbitron, or Micro 5
  - Body: Space Grotesk, IBM Plex Sans, or Archivo
- Keep retro fonts out of the joke text itself. Use them for headings, filter labels, and footer modules.
- Increase the joke text size and line-height so the list feels less cramped.

### 2. Replace flat black with a layered background

- Keep the page dark, but use a subtle gradient from charcoal to black instead of a single flat color.
- Add one very low-opacity texture layer, such as scanlines, a fine grid, or faint VHS-style noise.
- Keep the effect barely visible. The page should read as polished, not gimmicky.

### 3. Put the layout inside framed panels

- Right now the page reads as separate items floating on a black field.
- Wrap the banner, filter controls, joke list, and external links in distinct panels.
- Use a hybrid of retro bevels and modern depth:
  - 1px bright border
  - inset highlight on controls
  - soft outer shadow or glow on major panels
- Think old software window, but with modern spacing and restraint.

### 4. Turn the joke list into readable cards

- Each joke should sit in a card with real padding, a darker inner surface, and clear separation from the next joke.
- Add a max-width so the text does not stretch too wide on desktop.
- Consider subtle border or accent variations by category for faster scanning.
- For two-part jokes, give the setup and punchline slightly different treatment so the rhythm lands better.

### 5. Make the category filters feel tactile

- The current filter chips are the right idea, but they need more intentional states.
- Keep the selected and unselected logic, but make them feel like physical buttons:
  - selected: filled accent, inner shadow, slight glow
  - unselected: dark surface, muted label, crisp outline
  - pressed: tiny downward movement
- Arrange them in a responsive flex row with consistent gaps.
- Give the NSFW toggle a distinct warning color so it reads as a special mode.

### 6. Improve spacing and hierarchy

- Use larger vertical spacing between the banner, filters, spinner, and joke list.
- Constrain the main content width so the page has a clear reading column.
- Make section labels intentional. "More jokes" should feel like a footer module, not loose text on the page.
- Remove the global margin and padding styling from every element. That blanket rule is working against layout clarity.

### 7. Modernize the banner treatment

- Keep the existing banner art if it still matches the brand, but frame it better.
- Place it inside a header panel with padding and optional glow.
- On larger screens, give it more breathing room above and below.
- If the image is low resolution, lean into crisp pixel edges instead of stretching it.

### 8. Add restrained motion

- Use short, purposeful animations:
  - filter hover and press feedback
  - spinner fade-in and fade-out
  - joke cards revealing with a quick stagger
- Keep durations short, around 120ms to 220ms.
- Avoid constant looping effects outside the loading state.

### 9. Rework the footer links into a web-ring style module

- The external links already fit the retro theme; the presentation just needs more structure.
- Put them inside a dedicated footer panel with a small heading and a simple grid or stacked list layout.
- Use underlines, visited-link styling, and hover color shifts to preserve the old-web feel in a cleaner package.

### 10. Design for mobile on purpose

- On phones, the page should feel like a stacked handheld interface, not a squeezed desktop layout.
- Category buttons should stay large enough to tap comfortably.
- Joke cards should keep generous side padding and readable line height.
- The banner and spinner should not dominate small screens.

## Suggested Visual System

### Palette

- Background: #050505
- Surface: #111111
- Surface alt: #1a1a1a
- Text: #f2f2f2
- Muted text: #9aa0a6
- Cyan accent: #2fd6ff
- Green accent: #7dff5a
- Warning red: #ff5a5a
- Footer panel: #2b2b2b

### CSS token direction

```css
:root {
  --bg: #050505;
  --surface: #111111;
  --surface-alt: #1a1a1a;
  --text: #f2f2f2;
  --muted: #9aa0a6;
  --accent-cyan: #2fd6ff;
  --accent-green: #7dff5a;
  --accent-red: #ff5a5a;
  --panel-border: rgba(255, 255, 255, 0.18);
  --glow-cyan: 0 0 18px rgba(47, 214, 255, 0.24);
}
```

## Concrete Targets In The Current Code

- `#main`: add max-width, larger vertical rhythm, and a panel wrapper.
- `.joke-box` and `.joke`: move from plain stacked text to card-based presentation.
- `.category-selected` and `.category-unselected`: make the active and inactive states feel more tactile.
- `#top-banner`: turn it into a framed header module instead of a loose image block.
- `#external-links`: restyle it as a proper footer panel with clearer hierarchy.

## Recommended Implementation Order

1. CSS-only pass:
   - Add variables, better spacing, centered content width, panel styling, card styling, and improved filter states.
2. Small HTML cleanup:
   - Add semantic wrappers for header, main content, and footer modules.
3. Optional atmosphere pass:
   - Add subtle background texture, short reveal animations, and a refined loading state.

## What To Avoid

- Do not use a retro display font for full joke paragraphs.
- Do not add too many neon colors at once.
- Do not rely on strong glow effects everywhere.
- Do not plaster the page with obvious scanlines or extra GIF clutter.
- Do not make the site look ironic. It should feel affectionate and intentional.

## Short Version

If only five things change, make them these:

1. Add a centered max-width container and panel wrappers.
2. Turn jokes into readable cards with better spacing.
3. Upgrade typography with a display font plus a clean body font.
4. Make the category chips tactile and responsive.
5. Replace flat black with a subtle layered dark background.