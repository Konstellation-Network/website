// Routes and external links used across the site. Pages that are not built yet
// still get their final route here, so links need no change when they land.

export const routes = {
  home: '/',
  tokenization: '/solutions/tokenization',
  payments: '#', // no page in the design yet
  enterprise: '/solutions/enterprise',
  compliance: '/compliance',
  security: '/security',
  developers: '/developers',
  quickstart: '/developers/quickstart',
  networks: '/developers/networks',
  faucet: '/developers/faucet',
  contracts: '/developers/contracts',
  scriipture: '/developers/scriipture',
  network: '/network',
  ecosystem: '/ecosystem',
  contact: '/contact',
  about: '#',
  brandKit: '#',
  terms: '#',
  privacy: '#',
  disclaimers: '#',
} as const;

// External destinations. `null` = not public yet; rendered as a placeholder link.
export const external = {
  explorer: null as string | null,
  docs: null as string | null,
  github: 'https://github.com/Konstellation-Network',
};

export const devnet = {
  name: 'devnet-1',
  chainId: 56672,
  symbol: 'KASH',
  rpc: null as string | null, // [TBD] until the devnet RPC is public
};

export type NavItem = { label: string; desc: string; href: string; external?: boolean; dot?: boolean };

export const developerMenu: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Get started',
    items: [
      { label: 'Quickstart', desc: 'Connect to devnet and deploy in minutes.', href: routes.quickstart },
      { label: 'Networks & RPC', desc: 'Chain IDs and endpoints.', href: routes.networks },
      { label: 'Faucet', desc: 'Free test KASH on devnet.', href: routes.faucet },
      { label: 'Contracts', desc: 'Canonical addresses and precompiles.', href: routes.contracts },
    ],
  },
  {
    heading: 'Tools',
    items: [
      { label: 'Scriipture', desc: 'Write smart contracts in TypeScript.', href: routes.scriipture, dot: true },
      { label: 'Explorer', desc: 'Blocks, transactions and addresses.', href: external.explorer ?? '#', external: true },
      { label: 'Docs', desc: 'Reference documentation.', href: external.docs ?? '#', external: true },
      { label: 'GitHub', desc: 'Source, releases and checksums.', href: external.github, external: true },
    ],
  },
];

export const footerColumns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Tokenization and RWA', href: routes.tokenization },
      { label: 'Payments and stablecoins', href: routes.payments },
      { label: 'Enterprise', href: routes.enterprise },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'Quickstart', href: routes.quickstart },
      { label: 'Scriipture', href: routes.scriipture },
      { label: 'Networks & RPC', href: routes.networks },
      { label: 'Faucet', href: routes.faucet },
      { label: 'Contracts', href: routes.contracts },
      { label: 'Docs', href: external.docs ?? '#' },
      { label: 'GitHub', href: external.github },
    ],
  },
  {
    heading: 'Network',
    links: [
      { label: 'Architecture', href: routes.network },
      { label: 'Validators', href: routes.network },
      { label: 'KASH', href: routes.network },
      { label: 'Roadmap', href: routes.network },
      { label: 'Ecosystem and grants', href: routes.ecosystem },
    ],
  },
  {
    heading: 'Foundation',
    links: [
      { label: 'About', href: routes.about },
      { label: 'Brand kit', href: routes.brandKit },
      { label: 'Security', href: routes.security },
      { label: 'Contact', href: routes.contact },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms', href: routes.terms },
      { label: 'Privacy', href: routes.privacy },
      { label: 'Disclaimers', href: routes.disclaimers },
    ],
  },
];
