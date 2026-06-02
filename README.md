# Lift Log Standalone

This folder is a standalone copy of the Lift app. To split it into a new GitHub Pages repo:

1. Create a new empty repo.
2. Copy everything inside this `lift-standalone/` folder into the new repo root.
3. Commit and push the new repo.
4. Enable GitHub Pages for the repo.

The standalone app includes its own:

- `index.html`
- workout pages
- shared workout CSS and JavaScript
- `manifest.json`
- `icon.svg`
- `sw.js` offline cache

No kitchen app files are required.

## Adding Workouts

Add a new workout page by copying one of the existing workout HTML files and editing the `window.liftWorkoutConfig` object near the bottom. Then add a card for it in `index.html`.

The shared behavior lives in `workout-app.js`, so new workout pages get timers, logging, backup swaps, skips, added sets, and dynamic finishers automatically.
