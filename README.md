# Custom CSS

A CSS project providing a clean and modern design for web pages. This project is intended to provide a basic default
look that can be used alongside other user specific CSS files.

## Project structure

- `src/10-theme.css`: Theme tokens and default values.
- `src/20-tones.css`: Semantic tones.
- `src/30-globals.css`: Global HTML and document styles.
- `src/40-components.css`: Components.
- `src/50-variants.css`: Text emphasis and component variants.
- `src/60-utilities.css`: Generic utility classes.

The source files are concatenated and minified by GitHub Actions. The generated distribution files are published on the
`dist` branch.

## Color tokens

The color system uses:

- default active values in `:root` for the unthemed baseline
- tone overrides in `src/20-tones.css` for `.note`, `.info`, `.warning`, `.danger`, `.success`
- semantic component tokens: `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-accent-contrast`

In practice, default components use the `:root` values directly through the semantic `--color-*` tokens, and semantic
tone classes override only the active tone inputs when needed.

## Button variants

Buttons expose three visual variants:

- `solid`
- `soft`
- `ghost`
- `disabled` or native `disabled`

```html
<button class="solid info">Save</button>
<button class="soft info">Preview</button>
<button class="ghost info">Cancel</button>
<button class="soft info disabled">Unavailable</button>
<button class="soft info" disabled>Unavailable</button>
```

### Setup

To use this custom CSS in your project, you can either:
1. Import the CSS file in your HTML file head using a CDN link.
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tanguylegazon/custom-css@dist/custom.min.css">
   ```
2. Clone this repository and include `dist:custom.min.css` in your project.
   ```html
   <link rel="stylesheet" href="relative/path/to/custom.min.css">
   ```

## License

This project is licensed under the terms of the MIT License. See the [LICENSE](LICENSE) file for details.
