# Website: to do

Open work on the site, grouped by what it waits on. Tick items off (or delete
them) in the same commit that does the work. Anything shown as `[TBD]` on the
site is listed here.

## Launch

- [ ] Hosting and domain: choose where the site is deployed; set up the deploy.
- [ ] 404 page.
- [ ] Link previews for sharing (Open Graph / Twitter meta, a share image) and a
      sitemap.
- [ ] Replace the `[TBD]` in the footer © line with the foundation's legal entity
      (`src/components/Footer.astro`).

## Waits on devnet-1 and its services

All in `src/data/site.ts` unless noted. `null` renders as `[TBD]`.

- [ ] Endpoints per network: JSON-RPC, WebSocket, Cosmos REST, gRPC, CometBFT
      RPC, explorer (`networks[].endpoints`). Setting devnet's JSON-RPC also
      enables every "Add to wallet" button.
- [ ] Explorer and Docs URLs (`external.explorer`, `external.docs`).
- [ ] Faucet:
  - [ ] Build with `PUBLIC_FAUCET_URL` and add the site's origin to the faucet's
        `ALLOWED_ORIGINS`.
  - [ ] `PUBLIC_EXPLORER_TX_URL` for the "View in explorer" link.
  - [ ] Amount per request and cooldown (`faucet.amountKash`,
        `faucet.cooldownHours`; payout policy is handbook P7).
  - [ ] Captcha in the form once the provider is chosen (P7). The faucet refuses
        to run publicly without one.
  - [ ] Open the Testnet option in the faucet's network select when testnet-1
        has a faucet (`src/pages/developers/faucet.astro`).
- [ ] Devnet "opens" date in the Home hero eyebrow (`src/pages/index.astro`).

## Content still [TBD]

- [ ] Network dates: devnet, testnet, mainnet, cross-chain (`src/pages/network.astro`
      roadmap; mainnet `opens` in `src/data/site.ts`).
- [ ] Mainnet value ceiling amount (`src/pages/security.astro`). Launch posture
      follows D8 as re-opened on 2026-09-30 (bridge most likely on day one,
      with a value ceiling); update Security and Network if D8 changes.
- [ ] Security: audit report link, bug bounty scope and rewards, release version
      in the verify commands (first signed tag).
- [ ] Compliance: legal review and "Last updated" (required before mainnet,
      handbook D6 / §18).
- [ ] Network: whitepaper link, "Express interest" link for validators.
- [ ] Ecosystem: grants timeline, terms, eligibility, ranges, vesting.
- [ ] Scriipture: "Get started" links (hero and CTA).
- [ ] Quickstart: explorer link in step 4.

## Paused

- [ ] Contact form backend (`PUBLIC_CONTACT_URL`), plus response time and
      privacy notice. Paused by the founder on 2026-09-30.
- [ ] Grants applications (`PUBLIC_GRANTS_URL`). Paused by the founder on
      2026-09-30.

## Pages with no design yet

Their links point to `#` today (`routes` and `developerSideNav` in
`src/data/site.ts`).

- [ ] Account abstraction (Developers)
- [ ] Payments and stablecoins (Solutions)
- [ ] About, Brand kit
- [ ] Terms, Privacy, Disclaimers

## Keep in sync

- `src/data/site.ts` `canonicalContracts` mirrors `chain-config/src/contracts.ts`.
  Change both together.
- Chain IDs and network names follow `ENGINEERING.md §1`.
- Faucet form responses follow the `faucet` repo's README (`POST /request`).
