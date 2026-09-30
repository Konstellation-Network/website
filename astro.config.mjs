import { defineConfig } from 'astro/config';

export default defineConfig({
  // Static output: the site is plain HTML/CSS plus one small script.
  output: 'static',
  trailingSlash: 'never',
});
