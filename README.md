# Custom CSS

A CSS project providing a clean and modern design for web pages. This project is intended to provide a basic default
look that can be used alongside other user specific CSS files.

## Project structure

- `src/00-layers.css`: Cascade layer order.
- `src/05-palette.css`: Generated OKLCH palettes.
- `src/10-theme.css`: Theme tokens and default values.
- `src/20-tones.css`: Semantic tones.
- `src/25-reset.css`: Browser normalization and resilient defaults.
- `src/30-globals.css`: Global HTML and document styles.
- `src/40-components.css`: Components.
- `src/50-variants.css`: Text emphasis and component variants.
- `src/60-utilities.css`: Generic utility classes.

The source files are concatenated and minified by GitHub Actions. The generated distribution files are published on the
`dist` branch.

## Cascade layers

The stylesheet uses ordered cascade layers:

```css
@layer reset, theme, base, components, variants, utilities;
```

Unlayered site styles take precedence over normal declarations in the theme, making local overrides possible without
increasing selector specificity. The layers themselves progress from foundational rules to explicit utilities.

## Color tokens

The color system uses:

- default active values in `:root` for the unthemed baseline
- tone overrides in `src/20-tones.css` for `.note`, `.info`, `.warning`, `.danger`, `.success`
- semantic component tokens: `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-accent-contrast`

In practice, default components use the `:root` values directly through the semantic `--color-*` tokens, and semantic
tone classes override only the active tone inputs when needed.
Form controls also use quieter field tokens for their surface, border, text, placeholder and focus colors.

Each tone has twelve levels, in light and dark modes. Levels 1–5 are surfaces with shared OKLCH lightness and chroma.
Levels 6–12 target absolute APCA contrasts of 25, 40, 60, 80, 86, 92 and 100 Lc in light mode,
and 20, 35, 50, 65, 72, 85 and 95 Lc in dark mode, against that tone's level 1.
Semantic hues share the same chroma at each level within a mode, reduced together to remain in sRGB.
Neutral tones stay desaturated. Equal model values do not guarantee identical perceived vibrancy.
The neutral scale uses a restrained blue undertone instead of a perfectly achromatic grey.
Light mode uses quieter chroma for surfaces, borders and control states than for primary accents.
These constraints harmonize the scales; they do not guarantee identical perception or contrast between arbitrary pairs.

Components use level 9 for accents, 10 for accent hover and 12 for primary text.
Muted text mixes 12% of level 11 with neutral level 9. Disabled roles keep 20% of their semantic tint.
These component mixtures are distinct from the palette's measured contrast targets.
Filled buttons use light palette levels 9 and 10 in both modes, with white text and a subtle top highlight.

## Form labels

Put a tone on a wrapping label to style the whole field, or directly on its child input, select or textarea:

```html
<label><input type="checkbox" class="danger"> Delete permanently</label>
<label class="info">Project name<input name="project"></label>
<label><input type="checkbox" disabled> Unavailable</label>
```

Use native `disabled` on the control or its enclosing `fieldset`, not on a label.
CSS cannot disable a control or generically follow an arbitrary `for`/`id` association.
For separate labels, put the tone on a shared container or on both elements.
Wrapping labels also follow tones applied directly to progress and meter elements.
Fonts use `system-ui` and `ui-monospace`, without named fonts or downloads.

### Regenerating the palette

```sh
npm ci
npm run palette
npm run palette:check
```

Edit the hue, chroma and contrast targets in `scripts/palette.mjs`, not the generated CSS.
`palette.json` records signed APCA values and WCAG 2 contrast ratios against each tone's base surface.
The generator checks sRGB gamut, contrast targets and reproducibility. No color calculation runs in the browser.

APCA is an experimental design aid, not a claim of WCAG 3 conformance. WCAG 3 remains a draft.
Text size, weight, polarity and the actual background must be checked together; palette levels alone are not accessibility ratings.
WCAG 2 contrast requirements remain a separate check. See the [WCAG 3 draft](https://www.w3.org/TR/wcag-3.0/)
and [APCA guidance](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html).
The development-only `apca-w3` dependency retains its own Limited W3 License; it is not covered by this project's MIT license.

## Button variants

Buttons use a solid appearance by default and expose two visual variants:

- `soft`
- `ghost`

Disabled controls use the native `disabled` attribute.

```html
<button class="info">Save</button>
<button class="soft info">Preview</button>
<button class="ghost info">Cancel</button>
<button class="soft info" disabled>Unavailable</button>
```

## Floating navigation

Use `<footer>` for a distinct surface, quiet separator, supporting text and wrapping horizontal content.
Its width and page alignment remain controlled by the site layout. Use `<strong>` for the primary footer label.

Use `class="floating"` on a header or navigation container for a sticky, raised surface.
Its surface appears on scroll through CSS scroll-driven animations where supported.
Otherwise, or with reduced motion, the raised surface remains visible.
An opaque background remains available without blur support or when reduced transparency is requested.
Reserve sufficient scroll padding or anchor margins for the navigation height in your site layout.
Set `--scroll-offset` to the navigation height, optionally adding the space wanted above anchored content.
The theme applies it through `scroll-padding-block-start`, so native anchor navigation and smooth scrolling share the same offset.
Links inside `.floating nav` receive a subtle active indicator when marked with `aria-current="location"`.
The catalogue uses a small scroll observer to mark the visible section with `aria-current="location"`.
The floating surface animation itself remains CSS-only.

Textareas resize vertically. Checkboxes and radios share the theme's colors and focus treatment,
with native controls restored in forced-colors mode.
Textarea resize grips use the field's muted color where `::-webkit-resizer` is supported; other browsers keep their native grip.
Single-value selects use a theme-aware CSS chevron. Multiple and explicitly sized lists keep their native appearance.
Use the native `<hr>` element for a full-width separator. It has no margin or block height,
so surrounding layout spacing remains entirely under the site's control.

## Native elements

Native HTML elements need no extra classes. They follow the theme in light and dark modes.

- `details` / `summary`: a quiet surface with an aligned, rounded chevron and native keyboard behavior.
- `dialog`: a constrained, scrollable surface with a modal backdrop.
- `[popover]`: the same surface, opened with `popovertarget`; positioning remains a site-level choice.
- `progress`: a themed bar; omit `value` for indeterminate progress. Reduced motion keeps the indicator still.
- `meter`: a measurement whose success, warning and danger colors follow `min`, `max`, `low`, `high` and `optimum`.
- `input[type="file"]`: a compact native drop area with a Heroicons upload icon. File selection and its filename remain browser-managed.
- `abbr[title]`: a dotted underline. Explain important abbreviations in the text too; native title tooltips are not universally accessible.

Use `required`, input types and other HTML constraints for validation. Errors appear through `:user-invalid` after interaction
or a submission attempt, never simply because a required field starts empty. Valid fields stay neutral.
`aria-invalid="true"` also receives error styling; it does not enforce a constraint or supply an error message.
Keep instructions and error messages in HTML, associated with `aria-describedby`. Server-side validation is still required.

Open a modal with `dialog.showModal()`, not just an `open` attribute. Give overlays an accessible name and an explicit close control:

```html
<button onclick="document.getElementById('confirm').showModal()">Review</button>
<dialog id="confirm" aria-labelledby="confirm-title">
    <h3 id="confirm-title">Review your changes</h3>
    <p>Check the details before continuing.</p>
    <form method="dialog"><button autofocus>Close</button></form>
</dialog>

<button popovertarget="help">Help</button>
<div id="help" popover aria-labelledby="help-title">
    <h3 id="help-title">Sharing a project</h3>
    <p>Only your team can see a private project.</p>
    <button popovertarget="help" popovertargetaction="hide">Close</button>
</div>
```

Place overlays inside a toned container to inherit its palette. Meter status and validation
keep their semantic meaning independently of the surrounding tone. Customize `--color-positive`, `--color-caution`
and `--color-error` to change status colors.
Progress and meter use browser-specific bar selectors because there is no shared standard for their internal tracks.
Their tracks use system colors in forced-colors mode. File pickers support the existing tone, size and shape classes.
Dropping files uses the browser's native file-input behavior; the keyboard-accessible picker remains available.
Unsupported styling falls back to the native control. Dialogs and popovers retain native focus, dismissal and hidden states.
The library contains no JavaScript. The catalogue's theme controls, dialog examples and external Microtip tooltips are demonstration tools, not CSS features.

Disclosures expand smoothly where `::details-content` and `interpolate-size` are supported, with native immediate toggling elsewhere.
Reduced motion disables the transition. Modal dialogs lock page scrolling and use a light, tone-colored backdrop.
Overlays use the default control radius. With `rounded`, their corner radii include their padding.
Headings use the overlay's accent. File dropping stays native, without a scripted drag highlight.

## Utilities

- `small` or `sm`
- `large` or `lg`
- `rounded`
- `rounded-full`
- `muted`
- `hidden`

Sizes apply to controls, disclosures, fieldsets and overlays. Checkboxes, radios and bars scale without added padding.
Use `rounded` or `rounded-full` explicitly for shapes other than the default; radios and thin measurement bars retain their native shape conventions.
Use the HTML `disabled` attribute only where supported, including on `fieldset` to disable its controls.
There is no `disabled` class: CSS cannot disable a disclosure, link or dialog.

## Setup

To use this custom CSS in your project, you can either:
1. Import the CSS file in your HTML file head using a CDN link.
   ```html
   <meta name="color-scheme" content="light dark">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tanguylegazon/custom-css@dist/custom.min.css">
   ```
2. Download `custom.min.css` from the `dist` branch and include it in your project.
   ```html
   <link rel="stylesheet" href="relative/path/to/custom.min.css">
   ```

For stable production styling, replace `dist` with a specific tag or commit.

## License

This project is licensed under the terms of the MIT License. See the [LICENSE](LICENSE) file for details.
