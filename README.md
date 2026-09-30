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

## Build-time settings

| Variable | |
|---|---|
| `PUBLIC_FAUCET_URL` | origin of the `faucet` service, e.g. `https://faucet.devnet-1.…`. Unset: the Faucet form says the faucet is not open yet. The faucet must list this site's origin in its `ALLOWED_ORIGINS`, or it refuses the POST (403 `forbidden_origin`). |
| `PUBLIC_CONTACT_URL` | endpoint the Contact form POSTs JSON to (`name, email, organisation, role, useCase, message`). Unset: the form says enquiries are not open yet. |
| `PUBLIC_GRANTS_URL` | where the Ecosystem page's Apply buttons go. Unset: Apply is disabled. |
| `PUBLIC_EXPLORER_TX_URL` | explorer transaction link, `{hash}` replaced, e.g. `https://explorer…/tx/{hash}`. |

Endpoints, chain IDs and faucet amount/limit live in `src/data/site.ts`;
anything `null` renders as `[TBD]`.
