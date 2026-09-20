# Top bar redesign — proposals

Brainstorm only. Nothing here is locked. The product source of truth remains `DESIGN_DOCUMENT.md` until a direction is chosen and that document is updated.

## 1. Problem

The top bar is sticky on every page. Once the reader has already chosen Recipes, a meal idea, a restaurant, or a recipe to cook from, that chrome is mostly idle — and it still sits above the fold.

It is worst on a phone. The bar is not one row there. Below 800px it becomes a three-row grid:

1. **Brand** (“Family Recipes”) + **theme** (Light / Dark)
2. **Seven nav pills** (Recipes, Meal Ideas, Eat Out, Restaurants, Ingredients, Guide, Random), wrapping
3. **Font size** (Small / Medium / Large)

Every control is a 44px touch target, which is correct for fingers and expensive for height. On a typical phone the nav pills wrap to two rows, so the sticky chrome is often **three to four rows** before the page’s own heading and the already-collapsed filter bar. A recipe’s title, times, and first ingredients get pushed down. A Meal Ideas pictures board and the Ingredients / Restaurants card grids lose a large slice of the first screen.

Desktop is finer (one row, nowrap) but still dense: brand + seven links + three font chips + two theme chips. Recipe reading and the Meal Ideas photo board would still gain from a way to get the bar out of the way.

The landing page already links to the same destinations, so the full nav is most useful **while hopping between sections**, not **while staying on one**.

Cooking has a second problem the bar redesign does not solve by itself. A home recipe page currently shows, above the ingredients: special-occasion copy, HA chips, the HA tag explanation, meal / cuisine / health, prep / cook / total / servings, and later related recipes. That catalog metadata is useful when picking a recipe. It is noise when the phone is on the counter and someone is following steps. The screen also going to sleep mid-recipe is a third, practical annoyance.

## 2. What the bar is for

Keep these jobs. The redesign is about _when_ they take space, not dropping them.

| Job             | Today                       | Notes                                                                 |
| --------------- | --------------------------- | --------------------------------------------------------------------- |
| Home / identity | Brand link, left            | Goes to the landing page                                              |
| Switch section  | Seven always-visible pills  | Recipes, Meal Ideas, Eat Out, Restaurants, Ingredients, Guide, Random |
| Type size       | Three chips, always visible | Small / Medium / Large; persists on the device                        |
| Theme           | Two chips, top right        | Light / Dark; persists on the device                                  |

Constraints that still apply:

- Readable over clever. A household cookbook, not a dashboard.
- Touch targets stay easy on a phone (~44px).
- App chrome state belongs in xState (app machine and/or prefs machine), not React `useState`.
- Theme and font size already persist locally; any new “chrome mode” should say whether it persists.
- `[data-app-bar]` height is used to scroll a Meal Ideas card out from under the sticky bar. Any hide/collapse has to keep that offset honest (a CSS variable for bar height is the simple fix).
- The filter bar is already collapsible. Two independent collapse stories can stack; they should not fight.

## 3. Ideas to evaluate

The four starting ideas are complementary more than exclusive. Hamburger is the _closed_ affordance; a side panel is a strong _open_ menu; collapse is useful when the nav is already visible (desktop); zen is for cooking/reading, not for browsing. **View Recipe Mode** (section 4) is the recipe-page version of zen: it hides chrome _and_ strips catalog metadata, with an optional keep-screen-on toggle.

### A. Small screens: hamburger (one icon)

**What.** Below a breakpoint (today’s 800px is a reasonable start), replace the wrapping pills with a single menu button. One sticky row: brand (or current page name) + menu icon, maybe one extra action. Opening the menu shows destinations and prefs.

**Why it helps.** This is the largest height win on a phone. It turns three-to-four sticky rows into one ~52px row. The reader already chose a page; they do not need every destination in view.

**Open-menu shape.** The menu itself should not be another wrapping pill row. Use one destination per row, with font size and theme as exclusive toggle groups (see B). That is the side-panel idea, used as the hamburger’s panel.

**Where the button sits.** Top-left is familiar but competes with iOS edge-swipe back. Top-right is a bit less standard and keeps the brand on the left. Either is fine; pick one and keep it.

**What stays visible when closed.**

- Minimum: menu button + brand.
- Better: menu button + **current section name** (so “Meal Ideas” is still obvious without opening the menu). Brand can shrink to a short mark, or the section name _is_ the home-adjacent title and “Family Recipes” lives in the menu as Home.
- Optional extra: Random as a dice control on the row. It is the one destination people hit repeatedly without “going somewhere to stay.” Only worth it if the row stays a single line.

**Risks.**

- An extra tap to switch Recipes → Meal Ideas. Acceptable if hopping is less common than reading.
- Current page is hidden unless the closed row shows the section name.
- Prefs (theme, font) get buried. That is mostly good — they are set-and-forget — but first-run discovery is weaker. A short “Aa” or palette control on the closed row is optional; putting them only in the menu is cleaner.

**Verdict.** Strong default for small screens. Do this even if nothing else ships.

### B. Side panel menu (one control per row)

**What.** Nav opens as a left panel. Each destination is a full-width row. Font size and theme are each one row of exclusive toggles (the same chip language as today, just stacked).

**Why it helps.** Seven wrapping pills are hard to scan. A vertical list matches how people read a menu, hits the 44px target without wrapping, and has room for a Home row plus prefs without a second toolbar.

**Phone vs desktop.**

- **Phone:** overlay drawer (slides over content, dimmed scrim, tap-outside or Escape closes). Do not push the page aside — there is no width to spare.
- **Tablet / desktop:** same overlay is enough. A persistent left rail is optional and usually worse here: recipe detail wants a wide ingredients + steps layout, and the photo boards want width. A rail that is always open trades the top-bar problem for a side-bar problem.

**Panel contents, top to bottom (proposal).**

1. Home (landing)
2. Recipes
3. Meal Ideas
4. Eat Out
5. Restaurants
6. Ingredients
7. Guide
8. Random
9. Font size — Small | Medium | Large
10. Theme — Light | Dark

Mark the current destination with `aria-current="page"` the same way the pills do now. Close the panel on navigate.

**Bottom sheet variant.** On a phone, a sheet that rises from the bottom is easier for thumbs than a top-left drawer. Same rows, different edge. Worth a sketch if the left drawer feels like a stretch. Either overlay is fine; do not ship both.

**Verdict.** Use as the _open state_ of A (and of a desktop overflow/collapse control). Do not use as a permanently visible phone layout.

### C. Collapsible chrome (explicit collapse / expand)

**What.** A control collapses the full bar to a thin strip. The strip has an expand button (and, ideally, the current section name). Collapse is available at every width, not only on phones.

**Collapsed strip.** One row, ~44–52px:

- Expand (chevron / “Show menu”)
- Current section (text, not seven pills)
- Optional: the same compact prefs or zen control if those exist

**Why it helps.** Desktop already fits the nav in one row, but a recipe or a pictures board still loses a strip of height. Collapse is user-controlled and obvious. It also covers tablets in landscape, where a hamburger breakpoint might still show a crowded row.

**When it is redundant.** On small screens, a hamburger _is_ a collapsed bar. Shipping both a hamburger and a separate collapse button on the phone row is two affordances for one job. Prefer:

- Phone: always “collapsed” (hamburger). No extra collapse button.
- Desktop / wide tablet: full nav by default, collapse optional.

**Persistence.** Three options:

1. **Session only.** Refresh and it is open again. Safest.
2. **Device preference.** Like List | Pics. Nice if someone always wants a slim desktop bar.
3. **Do not persist.** Collapse is a momentary “give me the list.”

Recommendation: persist on the device if collapse is a first-class desktop mode; do not persist if it is only a shortcut next to zen.

**Risks.**

- A second collapse next to Filter is easy to mix up. Label the chrome control “Menu” / “Hide menu”, not “Filter.”
- An expand-only strip still takes some above-the-fold space. That is the point versus zen: collapse keeps orientation (where am I, how do I get the menu back).

**Verdict.** Useful on wide screens. Skip as a separate control on the phone if A is in place.

### D. Zen / reading mode (hide the bar; optional fullscreen)

Split this into two layers. They are easy to conflate and should not be.

**D1. Hide chrome (the useful part).** A “Zen” or “Reading” control hides the app bar — and, while cooking, probably the filter bar too. Content uses the full viewport. A small, low-contrast restore control stays on an edge (or appears on tap / swipe down) so the reader is not trapped. Escape restores. Navigating to another section should restore as well: zen is for _this page_, not a site-wide hide.

This does not require the browser Fullscreen API. It is just CSS plus machine state (`readingMode: true`). That works on iPhone, which is the main cooking surface.

**D2. Browser fullscreen (the extra part).** On supporting browsers, the same control can also request `element.requestFullscreen()` so the OS/browser UI goes away. Exit fullscreen (Esc, browser control, or our button) clears reading mode and shows the bar again.

Treat D2 as progressive enhancement, not the mechanism:

- iOS Safari’s Fullscreen API is still a poor fit for a normal document. A cooking site that only “hides the bar” when fullscreen succeeds will fail on the phones that need it most.
- Fullscreen needs a user gesture, can fail, and can be exited by the browser without going through our button. The machine has to listen for `fullscreenchange` and stay in sync.
- Gesture conflict: we already care about scroll and tap on cards. Fullscreen does not remove that, it just adds another mode to unwind.

**Where the control lives (non-recipe pages).**

- On the full bar: a “Zen” text button or an expand-corners icon, far right.
- On the collapsed strip: same icon, so desktop users can collapse _or_ go zen.
- On small screens: inside the hamburger panel, and/or a compact icon on the single sticky row.
- Guide is the clearest non-recipe case. On catalog indexes it is still valid (more cards) but less urgent.

**On a recipe page, do not ship a separate Zen button.** View Recipe Mode (section 4) already hides the bar _and_ strips the page. Two entry points that almost do the same thing would be confusing. Generic zen stays for Guide / catalogs; the recipe page uses View Recipe Mode.

**What generic zen hides.**

- App bar: yes.
- Filter bar: **yes while reading a Guide**; **probably yes** on Meal Ideas / Ingredients / Restaurants if the point is pictures. For a catalog you are still filtering, hiding filters is more aggressive — maybe only hide the app bar there, or only enter zen from Guide.
- Page heading: no.

**Restore without a visible button?** Tap the top edge, swipe down, or a first tap anywhere that only reveals chrome (second tap follows the link). Invisible restore is clever and easy to miss. Prefer a small persistent “Show menu” chip or a floating button with an accessible name.

**Persistence.** Do not persist zen across visits or even across routes. It is a reading mode. Landing with a hidden bar on the next open would look like a broken app.

**Verdict.** Ship D1 (hide chrome) for Guide at least. Offer D2 fullscreen only where the API works, as an add-on to the same button, not as the definition of zen. Recipe cooking uses View Recipe Mode instead.

## 4. View Recipe Mode

A first-class mode on **recipe detail** (`#/recipes/:id`), entered from a button on that page. It is zen for cooking: hide site chrome, hide catalog metadata, keep the cookable text, and optionally keep the phone screen awake.

This is not the same as collapsing the top bar. Compact chrome still shows where you are. View Recipe Mode is “I am cooking from this recipe now.”

### 4.1 What stays, what goes

**Keep**

- Recipe name (`h1`)
- **Ingredients** (amounts, prep, optional marks) — home recipes
- **Steps** — home recipes
- **Notes**, when the recipe has them
- Section headings (Ingredients / Steps / Notes) so the page still scans
- Existing type scale (Small / Medium / Large already chosen)
- Wide-layout ingredients beside steps, when the viewport already does that

**Hide**

- App top bar (full, compact, or hamburger) — same as zen
- “Random again” (when the recipe was opened from Random)
- Special-occasion sentence (“Special occasion”). The `*` on the title may stay; it is part of the name, not a tag description
- HA chips and the health thermometer
- HA tag explanation (“HA means House Approved…”)
- Meal type · cuisine · health rating line
- Prep / cook / total / servings
- Related recipes
- Any leftover page padding that exists only to clear the sticky bar

**Eat-out entries.** They have no ingredients or steps. The cookable body is **The order** plus **Notes**. Proposal: the same button still works; the mode keeps title, order, and notes, and hides the same tags / related list. Alternative: hide the button on eat-out, since you are at a counter reading a short order, not a multi-step cook. Prefer keeping the mode — a long order plus notes still benefits from a quiet screen.

**Not-found recipe.** No button. There is nothing to cook.

### 4.2 Entry and exit

**Enter** from a control **on the recipe page**, in the header near the title — that is where you are when you decide to cook. Short label: **View recipe**. Accessible name: “Enter view recipe mode.”

Do not make the top-bar zen control the only way in. People looking at a recipe should not have to hunt in the site menu. A second, quieter entry in the hamburger when the route is a recipe is optional, not required.

**Exit** with a control that stays available the whole time the mode is on. Short label: **Exit** or **Show details**. Accessible name: “Exit view recipe mode.” Escape exits too.

Also exit when:

- The route changes (home, another recipe, Random, …)
- The browser leaves fullscreen, if fullscreen was requested as an add-on
- The recipe is missing after a catalog change (unlikely in v1)

Do not persist “I am in View Recipe Mode” across visits. Opening the same recipe tomorrow should show the full detail page, with the button to enter again.

### 4.3 Chrome while the mode is on

Almost nothing. A small, low-contrast cluster (corner or top edge), with safe-area insets:

1. **Exit** — always
2. **Keep screen on** — toggle, see 4.4
3. Optional: the same Display (font / theme) control, if changing type size mid-cook is common. Default to **no**; the reader can exit, change size, re-enter. Keeps greasy-finger targets few.

Do not show nav destinations, related recipes, or tags in this cluster. If they need those, they exit.

Browser fullscreen (section 3.D2) can be an enhancement on the same Enter action, or a third tiny control. It is not required for the mode to work on a phone.

### 4.4 Keep the screen awake

A phone that sleeps on the counter is the practical failure of a cooking view. Use the **Screen Wake Lock API** (`navigator.wakeLock.request("screen")`) when it exists. Do not fake it with a hidden video.

**Toggle, not a silent side effect.** Put **Keep screen on** in the in-mode cluster. The click that enters the mode is a user gesture, so the first request can succeed. Reasons not to force it with no control: battery, Low Power Mode, someone who only wanted a quieter page, and APIs that fail without explanation.

**Default.** On when entering the mode. Cooking is the intent. One tap turns it off without leaving the mode. Persist that default on the device (like font size) so a household that always wants it off is not fighting it every recipe. The _mode itself_ still does not persist.

**Lifecycle.**

- Request wake lock when the mode is on and the toggle is on.
- Re-request on `visibilitychange` when the tab becomes visible again (browsers drop the lock in the background).
- Release on exit, route change, toggle off, or unmount.
- If `request` fails (unsupported, denied, Low Power Mode), leave the toggle off or show it as unavailable. Do not pretend the screen will stay awake.
- If the API is missing (older iOS, some desktop browsers), hide the toggle or show it disabled with an accessible name that says the device cannot keep the screen awake. The rest of View Recipe Mode still works.

Secure context is required; GitHub Pages HTTPS is fine. This also helps a kitchen tablet, not only a phone.

### 4.5 Relation to zen, collapse, and hamburger

| Mode                 | App bar  | Recipe metadata | Screen wake | Where                 |
| -------------------- | -------- | --------------- | ----------- | --------------------- |
| Compact / hamburger  | Thin row | Visible         | Off         | Every page            |
| Zen                  | Hidden   | Visible         | Off         | Guide, maybe catalogs |
| **View Recipe Mode** | Hidden   | Hidden          | Optional on | Recipe detail only    |

View Recipe Mode **includes** hiding the bar. It is not a fourth unrelated feature. It **replaces** zen on the recipe page so there is one cooking button, not Zen and View recipe side by side.

### 4.6 Risks

- Discoverability: a header button is clearer than an icon in the site bar.
- Trapped: exit must stay visible and named; Escape must work.
- Eat-out vs home: one mode, two bodies (ingredients/steps vs order).
- Wake lock silently failing: the toggle’s pressed state must match a _held_ lock, not a hoped-for one.
- Greasy fingers + tiny restore cluster: keep 44px targets even in the quiet chrome.

## 5. Other ideas worth mixing in

These are not in the original list. Several are cheaper than new modes.

### E. Move prefs out of the primary bar (do this regardless)

Theme and font are not navigation. They are the whole third row on a phone and a large chunk of the desktop row. Put them in the menu / side panel. First paint of the catalog gets taller immediately, even before a hamburger exists.

If prefs need a closed-row home, one combined “Display” control (opens font + theme) is enough. Three font chips plus two theme chips do not need to be always on.

### F. Auto-hide on scroll

Chrome slides off when scrolling down, returns on scroll up (mobile-Safari style). No extra button.

**Against, for this app:** the filter bar is also sticky-ish in the page flow; Meal Ideas already compensates for bar height when opening a card; scroll-linked hide tends to jitter on photo boards. Easy to get wrong. If zen, View Recipe Mode, and hamburger exist, this is optional polish, not the core fix.

### G. Bottom nav on the phone

A tab bar does not steal the top of a recipe. Thumb reach is better.

**Against:** seven destinations do not fit a tab bar (five is already crowded). Grouping them (Cook / Out / Book) adds a layer the current IA does not have. iOS home-indicator overlap. The landing page already is the “hub.” A hamburger list is a better match for seven named sections than a compressed tab bar.

### H. Slim always-on row, no new mode

Even without hamburger, collapse, or zen: never wrap the bar. At the current 800px breakpoint, overflow into a menu immediately; keep one sticky row at all widths; move prefs into that menu.

This is the minimum viable fix. A, B, and E are this idea with a clearer open state. It does not replace View Recipe Mode.

### I. Current page as the bar title

Index pages repeat identity: “Family Recipes” in the bar and an `<h1>` of “Recipes” / “Meal Ideas” / etc. A slim bar titled with the current section could let those page headings shrink (the bar title would need to be the accessible heading, or the h1 stays and the bar uses a quieter label). Recipe detail must keep the recipe name as h1 — the bar would say “Recipes” or show a back-to-index control. In View Recipe Mode the bar is gone; the recipe name remains the heading.

Worth it only if the bar becomes a single row. Do not add a third title.

### J. Random as a persistent action

Random is a verb more than a place. A dice icon that survives collapse (and maybe zen restore) is handy. Only if the compact row stays one line. It should still appear in the menu list so it is not icon-only for discovery. Hide it in View Recipe Mode; Random again is already hidden there.

## 6. How they fit together

Think in chrome states, plus one recipe-content state.

| State                | Height                             | What you see                                      | How you enter                                      | Best on                           |
| -------------------- | ---------------------------------- | ------------------------------------------------- | -------------------------------------------------- | --------------------------------- |
| **Full**             | One row (wide) or the menu is open | Destinations + prefs                              | Default on wide screens; opening the menu on small | Hopping between sections          |
| **Compact**          | One thin sticky row                | Menu button, where you are, optional Random / zen | Default on small screens; collapse on wide         | Browsing a list you already chose |
| **Zen**              | ~0, plus a tiny restore            | Page content, including catalog metadata          | Explicit; Guide first                              | Reading the Guide, maybe boards   |
| **View Recipe Mode** | ~0, plus Exit + Keep screen on     | Name, ingredients, steps, notes only              | Button on the recipe page                          | Cooking (and eat-out orders)      |

Mapping from the original ideas:

- **Hamburger** = compact state on small screens.
- **Side panel** = full state’s contents, presented as a drawer instead of wrapping pills.
- **Collapse** = compact state on wide screens.
- **Zen** = hide even the compact row; fullscreen optional; not used on recipe detail.
- **View Recipe Mode** = zen + stripped recipe page + optional wake lock.

## 7. Recommended direction (if we pick one)

Phased, in this order. Stop after any phase if it is enough.

**Phase 1 — compact by default on small screens, prefs in the menu.**

- Below ~800px: sticky row is brand or current section + hamburger.
- Menu is a left overlay (or bottom sheet) with one row per destination and toggle groups for font and theme.
- Wide screens: keep the current one-row nav, but **move font and theme into a Display menu** so the row is only brand + destinations (+ Display).
- No zen yet. No extra collapse button on the phone.

**Phase 2 — collapse on wide screens.**

- A “Hide menu” control collapses the desktop bar to the same compact row the phone already uses (section name + expand).
- Persist that choice on the device if it feels like a preference; otherwise session-only.

**Phase 3 — View Recipe Mode, then generic zen.**

- On recipe detail: **View recipe** in the page header. Hide bar + tags + times + related. Keep name, ingredients (or order), steps, notes.
- In-mode cluster: Exit + Keep screen on (Wake Lock API, default on, persist the toggle preference, not the mode).
- Leave the mode on route change. Escape exits. No second Zen button on this page.
- Then, if still useful: generic zen on Guide (hide bar only, no wake lock unless we decide it is the same reading need).
- Request browser fullscreen only as enhancement on supporting browsers.

This matches the product principles: practical, readable, phone-and-laptop, no clever trap doors. Cooking from the phone is the case that most justifies a mode.

## 8. Machine and persistence sketch

Not implementation; just where state would live so it does not grow a second source of truth.

| Concern                         | Suggested home                                                                                             | Persist on device?                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Menu open / closed              | App machine (`navOpen`)                                                                                    | No (overlay)                          |
| Compact vs full on wide screens | Prefs machine (`chrome: "full" \| "compact"`)                                                              | Yes, if Phase 2 ships as a preference |
| Reading / zen (non-recipe)      | App machine (`readingMode`)                                                                                | No                                    |
| View Recipe Mode                | App machine (`recipeViewMode`)                                                                             | No                                    |
| Keep screen on (preference)     | Prefs machine (`keepScreenAwake`)                                                                          | Yes (default for the toggle)          |
| Wake lock held                  | Side effect of mode + pref + API success; mirror in context if the UI needs `pressed` to match a live lock | No                                    |
| Browser fullscreen              | Mirror of `document.fullscreenElement`; enter/exit events                                                  | No                                    |
| Theme, font size                | Prefs machine, unchanged                                                                                   | Yes                                   |

Opening a route closes the nav overlay and clears View Recipe Mode and zen. Entering View Recipe Mode closes the overlay, hides chrome, and strips recipe metadata. Exiting fullscreen clears zen / View Recipe Mode if that mode requested it. Wake lock is requested only while `recipeViewMode && keepScreenAwake`.

`recipeViewMode` is only meaningful on recipe routes. If a hash change leaves the recipe, force it off in the same transition.

## 9. Accessibility and edge cases

- Menu button: `aria-expanded`, `aria-controls`, accessible name “Menu” (or “Open menu”).
- Focus moves into the panel on open, returns to the button on close. Escape closes.
- Scrim click / swipe to close on the drawer.
- Do not remove destination links from the accessibility tree; they just live in the panel when compact.
- Keep `aria-current="page"` on the active destination.
- Zen restore must be keyboard reachable and named (“Show menu” / “Exit reading mode”).
- View Recipe Mode enter/exit named (“Enter view recipe mode” / “Exit view recipe mode”). Escape exits. Focus after enter goes to the recipe title or the exit control — pick one and keep it.
- Hidden metadata should not remain focusable (`display: none` / not rendered), including related-recipe links and Random again.
- Keep screen on: `aria-pressed` reflects a **held** wake lock, or clearly disabled when the API is missing or the request failed.
- If fullscreen is requested, handle denial and `fullscreenchange` so the bar cannot stay hidden with no way back.
- Meal Ideas scroll-into-view must use the live bar height (zero in zen / View Recipe Mode).
- Safe-area insets: compact row, zen restore, and the View Recipe Mode cluster respect the notch and home indicator.

## 10. What not to do

- A permanently visible left rail on a phone.
- Wrapping pill nav as the hamburger’s open state (that is today’s problem, in a layer).
- Fullscreen API as the only way to hide the bar or enter View Recipe Mode.
- Persisting zen or View Recipe Mode so the next visit has no chrome / no tags.
- Icon-only destinations for all seven sections. Names stay. Icons, if any, are extra (Random, menu, zen).
- A collapse button _and_ a hamburger on the same phone row.
- Relabeling chrome collapse “Filter.”
- A Zen button **and** a View recipe button on the same recipe page.
- Keeping the screen awake with a hidden `<video>` hack.
- Forcing wake lock with no toggle.
- Showing `aria-pressed="true"` on Keep screen on when the lock was not actually acquired.

## 11. Open questions

1. **Closed-row title:** keep “Family Recipes”, switch to the current section name, or show both (mark + section)?
2. **Drawer vs bottom sheet** on the phone?
3. **Random on the compact row**, or menu-only?
4. **Zen on catalog pages**, or only Guide (recipe detail uses View Recipe Mode)?
5. **Phase 2 persistence:** device preference or session?
6. **Breakpoint:** keep 800px, or compact a little earlier so tablets in portrait get the hamburger too?
7. **Index page `<h1>`:** keep as now, or let the compact bar carry the section title?
8. **View Recipe Mode on eat-out:** same mode with The order + Notes, or home recipes only?
9. **Keep screen on default:** on at enter (recommended), or off until the cook opts in?
10. **Special-occasion asterisk** on the title in View Recipe Mode: keep or strip?
11. **Font / theme inside View Recipe Mode**, or exit to change them?

## 12. Success

The redesign works if, on a phone, a recipe’s title and first ingredients are on the first screen without scrolling past a block of idle nav — and the reader can still switch sections, change theme, and change type size in one obvious menu. Desktop should not get worse: hopping stays one-click, with an optional path to a slimmer bar and a reading mode while cooking.

View Recipe Mode works if someone can put the phone on the counter, tap **View recipe**, and see only the name, ingredients, steps, and notes — tags and related recipes gone, site nav gone — and the screen can stay awake while they cook, with a clear way to turn that off and a clear way out.
