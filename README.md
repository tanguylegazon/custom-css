# Custom CSS

A CSS project providing a clean and modern design for web pages. This project is intended to provide a basic default
look that can be used alongside other user specific CSS files.

## Project structure

- `src/tokens.css`: Theme tokens, color palettes, and semantic tones.
- `src/base.css`: Global HTML and document styles.
- `src/components.css`: Components and utility classes.

The source files are concatenated and minified by GitHub Actions. The generated distribution files are published on the
`dist` branch.

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
