// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Volunteer Nexus — dokumentacja',
  favicon: 'img/favicon.ico',
  future: {v4: true},
  url: 'http://localhost',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  i18n: {defaultLocale: 'pl', locales: ['pl']},
  // format 'detect': pliki .md to zwykły Markdown (działają <https://…> i znaki < >), JSX tylko w .mdx
  markdown: {format: 'detect', mermaid: true, hooks: {onBrokenMarkdownLinks: 'throw'}},
  clientModules: ["./src/mermaid-fix.js"],
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      // shortcut: brak polskiego stemmera (szuka po całych słowach i prefiksach), wymienić gdy wyniki przestaną wystarczać
      {hashed: true, language: ['en'], docsRouteBasePath: '/', indexBlog: false},
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {routeBasePath: '/', sidebarPath: './sidebars.js'},
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {respectPrefersColorScheme: true},
      navbar: {title: 'Volunteer Nexus — dokumentacja'},
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'python', 'json', 'docker'],
      },
    }),
};

export default config;
