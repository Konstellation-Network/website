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

// Public endpoints. `null` = not published yet; pages show [TBD].
type Endpoints = {
  jsonRpc: string | null;
  ws: string | null;
  rest: string | null;
  grpc: string | null;
  comet: string | null;
  explorer: string | null;
};
const unpublished: Endpoints = { jsonRpc: null, ws: null, rest: null, grpc: null, comet: null, explorer: null };

export type Network = {
  id: 'devnet' | 'testnet' | 'mainnet';
  label: string;
  name: string; // Cosmos chain-id / network id
  displayName: string; // name shown in wallets
  chainId: number; // EIP-155 (ENGINEERING §1)
  blurb: string;
  opens?: string; // shown as "Launching …" while endpoints are unpublished
  endpoints: Endpoints;
};

export const networks: Network[] = [
  {
    id: 'devnet',
    label: 'Devnet',
    name: 'devnet-1',
    displayName: 'Konstellation devnet-1',
    chainId: 56672,
    blurb: 'Application development. Same release as mainnet; free test KASH.',
    endpoints: unpublished,
  },
  {
    id: 'testnet',
    label: 'Testnet',
    name: 'testnet-1',
    displayName: 'Konstellation testnet-1',
    chainId: 56671,
    blurb: 'Operator rehearsal and upgrade drills.',
    endpoints: unpublished,
  },
  {
    id: 'mainnet',
    label: 'Mainnet',
    name: 'konstellation-1',
    displayName: 'Konstellation',
    chainId: 5667,
    blurb: 'Launching',
    opens: '[TBD]',
    endpoints: unpublished,
  },
];

// Default ports for a node on your own machine (konstellationd defaults).
export const localEndpoints = {
  jsonRpc: 'http://127.0.0.1:8545',
  ws: 'ws://127.0.0.1:8546',
  rest: 'http://127.0.0.1:1317',
  grpc: '127.0.0.1:9090',
  comet: 'http://127.0.0.1:26657',
};

const devnetNet = networks[0];
export const devnet = {
  name: devnetNet.name,
  displayName: devnetNet.displayName,
  chainId: devnetNet.chainId,
  symbol: 'KASH',
  rpc: devnetNet.endpoints.jsonRpc,
  explorer: devnetNet.endpoints.explorer,
};

// EIP-3085 wallet_addEthereumChain params for devnet-1, as a JSON string for
// data-add-chain. null until the RPC URL is published (a wallet needs one).
export const devnetAddChain: string | null = devnet.rpc
  ? JSON.stringify({
      chainId: '0x' + devnet.chainId.toString(16),
      chainName: devnet.displayName,
      nativeCurrency: { name: devnet.symbol, symbol: devnet.symbol, decimals: 18 },
      rpcUrls: [devnet.rpc],
      ...(devnet.explorer ? { blockExplorerUrls: [devnet.explorer] } : {}),
    })
  : null;

// Canonical addresses, the same on every network. Mirrors
// chain-config/src/contracts.ts (tested against contracts/preinstalls).
export const canonicalContracts: { name: string; desc: string; descCode?: string[]; address: string }[] = [
  { name: 'Multicall3', desc: 'Batch read calls', address: '0xcA11bde05977b3631167028862bE2a173976CA11' },
  { name: 'Permit2', desc: 'Signature-based token approvals', address: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  { name: 'EntryPoint v0.7', desc: 'ERC-4337 entry point', address: '0x0000000071727De22E5E9d8BAf0edAc6f37da032' },
  { name: 'EntryPoint v0.8', desc: 'ERC-4337 entry point', address: '0x4337084D9E255Ff0702461CF8895CE9E3b5Ff108' },
  { name: 'Safe Singleton Factory', desc: 'Deterministic deployment for Safe', address: '0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7' },
  { name: 'Create2Deployer', desc: 'CREATE2 deployments', address: '0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2' },
  { name: 'WKASH', desc: 'Wrapped KASH (ERC-20)', address: '0x34Ab8285C63b876717C2c56151700D02623559bE' },
  { name: 'Compliance precompile', desc: '', descCode: ['isVerified', 'isFrozen'], address: '0x0000000000000000000000000000000000000900' },
];

// The `faucet` repo's service. Set at build time; unset = the form explains
// that the faucet is not open yet. The faucet must list this site's origin in
// its ALLOWED_ORIGINS for the cross-origin POST to be accepted.
export const faucet = {
  apiUrl: (import.meta.env.PUBLIC_FAUCET_URL as string | undefined) || null,
  // e.g. https://explorer…/tx/{hash}; same format as the faucet's EXPLORER_TX_URL
  explorerTxUrl: (import.meta.env.PUBLIC_EXPLORER_TX_URL as string | undefined) || null,
  amountKash: null as number | null, // payout policy undecided (STATUS P7)
  cooldownHours: null as number | null,
};

export const developerSideNav: { label: string; href: string | null; external?: boolean }[] = [
  { label: 'Overview', href: routes.developers },
  { label: 'Quickstart', href: routes.quickstart },
  { label: 'Scriipture', href: routes.scriipture },
  { label: 'Networks & RPC', href: routes.networks },
  { label: 'Faucet', href: routes.faucet },
  { label: 'Contracts', href: routes.contracts },
  { label: 'Account abstraction', href: '#' },
  { label: 'Explorer', href: external.explorer, external: true },
  { label: 'Docs', href: external.docs, external: true },
  { label: 'GitHub', href: external.github, external: true },
];

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
