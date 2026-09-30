// Client behaviour for every page: theme toggle, Developers dropdown, mobile
// drawer, copy buttons and scroll reveal.

const root = document.documentElement;
const THEME_KEY = 'k-theme';

// ---------- Theme ----------
// Light is the default. The toggle stores an explicit choice; nothing reads the OS setting.

function syncThemeButtons() {
  const dark = root.dataset.theme === 'dark';
  const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((b) => {
    b.setAttribute('aria-label', label);
    b.title = label;
  });
}

document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((b) => {
  b.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    if (dark) root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    try {
      if (dark) localStorage.setItem(THEME_KEY, 'dark');
      else localStorage.removeItem(THEME_KEY);
    } catch {
      /* storage blocked: the choice lasts for this page only */
    }
    syncThemeButtons();
  });
});
syncThemeButtons();

// ---------- Developers dropdown (desktop) ----------
// Opens on hover or click; Enter/Space toggle (native button); Escape closes.

const dd = document.querySelector<HTMLElement>('[data-dropdown]');
const ddTrigger = document.getElementById('dev-trigger');
const ddPanel = document.getElementById('dev-menu');

function setDropdown(open: boolean) {
  if (!ddTrigger || !ddPanel) return;
  ddTrigger.setAttribute('aria-expanded', String(open));
  ddPanel.hidden = !open;
}

if (dd && ddTrigger && ddPanel) {
  ddTrigger.addEventListener('click', () => setDropdown(ddPanel.hidden));
  dd.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') setDropdown(true); });
  dd.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') setDropdown(false); });
  dd.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !ddPanel.hidden) {
      setDropdown(false);
      ddTrigger.focus();
    }
  });
  dd.addEventListener('focusout', (e) => {
    if (!dd.contains(e.relatedTarget as Node | null)) setDropdown(false);
  });
  document.addEventListener('click', (e) => {
    if (!dd.contains(e.target as Node)) setDropdown(false);
  });
}

// ---------- Mobile drawer ----------

const mTrigger = document.getElementById('m-trigger');
const drawer = document.getElementById('m-menu');
const mDevTrigger = document.querySelector<HTMLButtonElement>('.m-dev-trigger');
const mDev = document.getElementById('m-dev');

function setDrawer(open: boolean) {
  if (!mTrigger || !drawer) return;
  mTrigger.setAttribute('aria-expanded', String(open));
  mTrigger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  drawer.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  if (!open && mDevTrigger && mDev) {
    mDevTrigger.setAttribute('aria-expanded', 'false');
    mDev.hidden = true;
  }
}

if (mTrigger && drawer) {
  mTrigger.addEventListener('click', () => setDrawer(drawer.hidden));
  drawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setDrawer(false);
      mTrigger.focus();
    }
  });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', (e) => {
    if (e.matches) setDrawer(false);
  });
}

if (mDevTrigger && mDev) {
  mDevTrigger.addEventListener('click', () => {
    const open = mDev.hidden;
    mDev.hidden = !open;
    mDevTrigger.setAttribute('aria-expanded', String(open));
  });
}

// ---------- Copy buttons ----------
// data-copy="<element id>" copies that element's text; data-copy-text="…" copies the literal.

document.querySelectorAll<HTMLButtonElement>('[data-copy], [data-copy-text]').forEach((btn) => {
  const label = btn.querySelector<HTMLElement>('[data-copy-label]');
  let timer: number | undefined;
  btn.addEventListener('click', async () => {
    const target = btn.dataset.copy ? document.getElementById(btn.dataset.copy) : null;
    const text = btn.dataset.copyText ?? target?.innerText.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    if (label) label.textContent = 'Copied';
    window.clearTimeout(timer);
    timer = window.setTimeout(() => { if (label) label.textContent = 'Copy'; }, 1600);
  });
});

// ---------- Add to wallet ----------
// <button data-add-chain='{…EIP-3085 params…}'>; messages go to the nearest
// [data-wallet-msg] in the same section, if there is one.

type Eth = { request: (a: { method: string; params: unknown[] }) => Promise<unknown> };
document.querySelectorAll<HTMLButtonElement>('[data-add-chain]').forEach((btn) => {
  const msg = btn.closest('section')?.querySelector<HTMLElement>('[data-wallet-msg]');
  const say = (text: string) => { if (msg) msg.textContent = text; };
  btn.addEventListener('click', async () => {
    const params = btn.dataset.addChain;
    if (!params) return;
    const eth = (window as unknown as { ethereum?: Eth }).ethereum;
    if (!eth) {
      say('No browser wallet found. Add the network manually with the settings above.');
      return;
    }
    try {
      await eth.request({ method: 'wallet_addEthereumChain', params: [JSON.parse(params)] });
      say('Network added to your wallet.');
    } catch {
      say('The wallet did not add the network. You can add it manually with the settings above.');
    }
  });
});

// ---------- Tabs ----------
// <div data-tabs> with [role=tab] buttons (aria-controls → [role=tabpanel]).
// Click or arrow keys select; panels are toggled with `hidden`.

document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((group) => {
  const tabs = Array.from(group.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const select = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      let next = -1;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next >= 0) {
        e.preventDefault();
        select(tabs[next], true);
      }
    });
  });
});

// ---------- Scroll reveal ----------

const reveal = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  reveal.forEach((el) => io.observe(el));
} else {
  reveal.forEach((el) => el.classList.add('is-in'));
}
