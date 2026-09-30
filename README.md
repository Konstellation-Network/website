# website

The Konstellation marketing site. Astro, static output, no framework runtime.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
```

Design source: the Claude Design canvas "Konstellation website".

## Theme

Light is the default for every visitor, whatever their OS setting. Dark
applies only when the visitor picks it with the header toggle; the choice is
stored in `localStorage` (`k-theme`) and applied before first paint by the
inline script in `src/layouts/Base.astro`. Do not add a
`prefers-color-scheme` query. Colour tokens live in `src/styles/global.css`
(`:root` = light, `[data-theme='dark']` = dark).

## Layout

- `src/data/site.ts`: routes, external links, devnet facts. Unbuilt pages
  already have their final route here.
- `src/components/`: Header (dropdown and mobile drawer), Footer, CodePanel,
  ComplianceDiagram and the mark.
- `src/scripts/site.ts`: theme toggle, menus, copy buttons, scroll reveal.

Breakpoints: 900px (section layouts), 1200px (desktop header, wide diagram).
