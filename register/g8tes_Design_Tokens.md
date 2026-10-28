# g8tes Design Tokens v8

Version 8.2 | 25 October 2026 | Thread removed with copper (ruling 25 Oct). Caution is a Denim icon on light and a Wash icon on dark; an edge may go with it. Light screens: Mist page, Cotton panels (ruling 25 Oct). Seven base colours.

**The only place a colour, type size, space or radius is defined.** Every surface — website, Dash, flow, promo, launch, studio, studioCRM — resolves to these. Zero raw values anywhere else.

Source of truth: Figma *NEW g8tes SaaS Denim Website*. Where a build and this file disagree, this file wins and the build is corrected.

---

## 1. The palette

| Token | Name | Hex | Role |
|---|---|---|---|
| `--g8-raw` | Raw | `#18324E` | Primary denim surface |
| `--g8-denim` | Denim | `#315C80` | Secondary denim surface |
| `--g8-wash` | Wash | `#8AAABD` | Muted text on dark, light strokes, stitch detail, caution icon on dark |
| `--g8-tag` | Tag | `#B52A36` | The signature red. Tag, one action per view, exceptions |
| `--g8-cotton` | Cotton | `#F5F1E8` | Light page, text on dark |
| `--g8-ink` | Ink | `#14202B` | Text on light, deepest dark surface |
| `--g8-mist` | Mist | `#DFE8EE` | Light page, raised light surfaces, dividers, banding |

**Thread `#C89A62` and thread-dark `#A5763F` are removed with copper** (ruling 2026-10-25). Stitch detail uses Wash. Caution uses Denim on light and Wash on dark, always as an icon (an edge may go with it), with the message in `--text`.

Derived, for surfaces the seven base colours do not cover:

| Token | Hex | Derived from |
|---|---|---|
| `--g8-raised-dark` | `#1E3A58` | Raw, lightened |
| `--g8-side-dark` | `#101A24` | Ink, deepened |
| `--g8-line-dark` | `#2A4A6B` | Raw, lightened for strokes |

**No other colour exists.** No per-product hue. Products are told apart by name.

---

## 2. CSS custom properties — drop in

```css
:root {
  /* Base palette — never referenced directly by a component */
  --g8-raw:    #18324E;
  --g8-denim:  #315C80;
  --g8-wash:   #8AAABD;
  --g8-tag:    #B52A36;
  --g8-cotton: #F5F1E8;
  --g8-ink:    #14202B;
  --g8-mist:   #DFE8EE;

  --g8-raised-dark: #1E3A58;
  --g8-side-dark:   #101A24;
  --g8-line-dark:   #2A4A6B;

  /* Semantic — components reference only these */
  --page:      var(--g8-mist);   /* Mist page, Cotton panels, never white on white (ruling 25 Oct); as built in the Dash */
  --panel:     var(--g8-cotton);
  --raised:    var(--g8-mist);
  --side:      var(--g8-raw);
  --side-text: var(--g8-cotton);
  --text:      var(--g8-ink);
  --muted:     var(--g8-denim);
  --line:      var(--g8-mist);
  --action:    var(--g8-tag);
  --action-text: var(--g8-cotton);
  --info:      var(--g8-denim);
  --caution:   var(--g8-denim); /* icon, an edge may go with it; the caution message is in --text */
  --exception: var(--g8-tag);
  --focus:     var(--g8-denim);

  /* Shape */
  --radius-none: 0px;
  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   16px;

  /* Space — 8 scale, nothing between */
  --s1: 8px;  --s2: 16px; --s3: 24px; --s4: 32px;
  --s5: 48px; --s6: 64px; --s7: 96px;

  /* Type */
  --font: "Manrope", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-ar: "Tajawal", "Graphik Arabic", sans-serif;

  --t-display: 700 clamp(44px, 7vw, 96px)/0.98 var(--font);
  --t-h1:      700 clamp(32px, 4vw, 52px)/1.1  var(--font);
  --t-h2:      600 clamp(24px, 2.6vw, 34px)/1.2 var(--font);
  --t-h3:      600 20px/1.3 var(--font);
  --t-body:    400 16px/1.6 var(--font);
  --t-small:   400 14px/1.5 var(--font);
  --t-label:   600 11px/1.4 var(--font);

  --track-label: 0.14em;

  /* Elevation — three steps only */
  --e-flat:    none;
  --e-raised:  0 1px 2px rgb(20 32 43 / 0.06);
  --e-overlay: 0 12px 32px rgb(20 32 43 / 0.18);
}

:root[data-theme="dark"] {
  --page:      var(--g8-ink);
  --panel:     var(--g8-raw);
  --raised:    var(--g8-raised-dark);
  --side:      var(--g8-side-dark);
  --side-text: var(--g8-cotton);
  --text:      var(--g8-cotton);
  --muted:     var(--g8-wash);
  --line:      var(--g8-line-dark);
  --action:    var(--g8-tag);
  --action-text: var(--g8-cotton);
  --info:      var(--g8-wash);
  --caution:   var(--g8-wash);
  --exception: var(--g8-tag);
  --focus:     var(--g8-wash);

  --e-raised:  0 1px 2px rgb(0 0 0 / 0.4);
  --e-overlay: 0 12px 32px rgb(0 0 0 / 0.55);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --page: var(--g8-ink);    --panel: var(--g8-raw);
    --raised: var(--g8-raised-dark); --side: var(--g8-side-dark);
    --text: var(--g8-cotton); --muted: var(--g8-wash);
    --line: var(--g8-line-dark); --info: var(--g8-wash);
    --caution: var(--g8-wash); --focus: var(--g8-wash);
  }
}

html { font-family: var(--font); }
body { background: var(--page); color: var(--text); font: var(--t-body); }
[dir="rtl"] { font-family: var(--font-ar); }
:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
```

**Theme default:** the **website** opens light (Cotton). The **Dash and products** open dark (Ink/Raw). Both carry the toggle on every screen.

---

## 3. Tailwind config — replaces the showcase config

The existing showcase uses `hsl(217 82% 48%)` and Aptos. Both are wrong against the Figma ruling. Replace `tailwind.config.js` theme colours with:

```js
theme: {
  extend: {
    colors: {
      raw:    "#18324E",
      denim:  "#315C80",
      wash:   "#8AAABD",
      tag:    "#B52A36",
      cotton: "#F5F1E8",
      ink:    "#14202B",
      mist:   "#DFE8EE",

      page:      "var(--page)",
      panel:     "var(--panel)",
      raised:    "var(--raised)",
      side:      "var(--side)",
      line:      "var(--line)",
      action:    "var(--action)",
      info:      "var(--info)",
      caution:   "var(--caution)",
      exception: "var(--exception)",
    },
    fontFamily: {
      sans: ['Manrope', 'system-ui', 'sans-serif'],
      ar:   ['Tajawal', 'Graphik Arabic', 'sans-serif'],
    },
    borderRadius: { none: '0', sm: '6px', md: '10px', lg: '16px' },
    spacing: { s1:'8px', s2:'16px', s3:'24px', s4:'32px', s5:'48px', s6:'64px', s7:'96px' },
  },
}
```

And in `index.css`, replace the entire `:root` block with section 2 above. **Delete** the shadcn HSL triplet set — it is a different system and keeping both guarantees drift.

Font load:

```html
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap">
```

Add Tajawal only on Arabic builds.

---

## 4. Dash token swap — the migration map

One commit. Find and replace, then review the visual diff before anything else is touched.

| Old (charcoal) | New (denim) | Role |
|---|---|---|
| `#141618` | `#14202B` | Page, dark |
| `#1F2224` | `#18324E` | Panel, dark |
| `#26292B` | `#1E3A58` | Raised, dark |
| `#0F1112` | `#101A24` | Side, dark |
| `#ECE6DB` | `#F5F1E8` | Text on dark |
| `#C2C4C6` | `#8AAABD` | Muted, dark |
| `#F2EDE3` | `#F5F1E8` | Page, light |
| `#FFFDF8` | `#FFFFFF` | Panel, light |
| `#FBF8F2` | `#DFE8EE` | Raised, light |
| `#2A2D2F` | `#14202B` | Text, light |
| `#4E5153` | `#315C80` | Muted, light |
| `#8A5537` / `#E8BE97` | `#B52A36` | Copper → Tag. **Review each:** copper was a text colour, tag is an action colour. Where copper was body text, use `--muted`. Where it was a call to action, use `--action` |
| `#9B2C2C` / `#F2958B` | `#B52A36` | Overdue → Exception |
| `#B33A32` System strip | *(delete)* | Class shown by label |
| `#2E7D32` / `#2A6F2E` Product strip | *(delete)* | Class shown by label |
| Tenor Sans / Montserrat / Source Serif 4 | Manrope | Weight replaces family for hierarchy |

**The copper row is the one that needs eyes.** Everything else is mechanical.

---

## 5. Component rules

| Component | Rule |
|---|---|
| **Button, primary** | `--action` fill, `--action-text` label, `--radius-sm`. **One per view.** |
| **Button, secondary** | Transparent, 1px `--line`, `--text` label |
| **Button, ghost** | No border, `--muted` label |
| **The tag** | `--g8-tag` fill, signature reversed in Cotton, `--radius-none`. **Square-cut — it never rounds.** One per view. Never rotated, recoloured or doubled |
| **Card** | `--panel` on `--page`, 1px `--line`, `--radius-md`, `--e-raised` |
| **Product card** | Denim panel, tag top-right, name at `--t-h2`, promise at `--t-h3`, line at `--t-body`, action at `--t-small`. Alternate `--g8-raw` and `--g8-denim` across the row |
| **Field** | `--panel` fill, 1px `--line`, `--radius-sm`. Read-only is visibly distinct. Error shown by an `--exception` edge or icon, with the message in `--text` |
| **Caution** | Shown by a `--caution` icon (an edge may go with it), with the message in `--text`. `--caution` is Denim on light and Wash on dark, and is never the text colour (Management, 24 and 25 Oct 2026). The same rule holds in dark |
| **Status pill** | `--raised` fill, `--muted` text. Exception states only use `--exception` |
| **Illustrative label** | `--t-label`, `--track-label`, `--muted`, directly adjacent to the surface it describes. Never hidden, never behind a hover |

---

## 6. Contrast — checked, not assumed

| Pair | Ratio | Verdict |
|---|---|---|
| Ink `#14202B` on Cotton `#F5F1E8` | 14.65:1 | Pass AAA |
| Cotton `#F5F1E8` on Raw `#18324E` | 11.61:1 | Pass AAA |
| Denim `#315C80` and Cotton (either way round) | 6.27:1 | Pass AA body |
| Tag `#B52A36` and Cotton (either way round) | 5.56:1 | Pass AA |
| Wash `#8AAABD` on Raw | 5.34:1 | Pass AA body |
| **Wash `#8AAABD` on Cotton** | **2.18:1** | **FAIL — never use Wash as text on light. Use Denim** |
| **Tag `#B52A36` on Ink `#14202B`** | **2.63:1** | **FAIL — no text use in dark. Tag is a fill or an edge; text on Ink uses `--text`** |

Contrast is the same whichever colour is the text, so each pair has one ratio. Ratios computed with the WCAG 2.x relative-luminance formula, 24 October 2026.

The failing pairs are listed because they are the ones a designer will reach for by instinct. Use Denim for body text on Cotton.

---

## 7. What this replaces

| Retired | Where it lived |
|---|---|
| Charcoal token set (10 tokens) | UI-STANDARD, Dash, product templates |
| Brand palette (9 colours: Deep ink, Ink, Lighter black, Pearl, Sand, Copper, Copper light, Palm green, Loss red) | R-05, PACK-08 |
| "No blue anywhere" | R-05, UI-STANDARD, PACK-08 — **delete the clause, do not soften it** |
| Thread `#C89A62` and thread-dark `#A5763F` (removed with copper, ruling 25 Oct) | Design Tokens v8.1, R-05, UI-STANDARD, contrast-bar, the briefs |
| System `#B33A32` / Product `#2E7D32` strips | Dash, UI-STANDARD |
| Tenor Sans, Montserrat, Source Serif 4 | S-WEB font stack, R-05, UI-STANDARD |
| shadcn HSL triplets in the showcase | `src/index.css` |

Tajawal is **not** retired. It is the Arabic face, with Graphik where the pair file specifies.

---

g8tes · www.g8tes.ae · © 2026 Gates Retail Solutions FZE LLC
