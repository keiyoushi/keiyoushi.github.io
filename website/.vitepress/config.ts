import { defineConfig, loadEnv } from 'vitepress'
import { attrs } from '@mdit/plugin-attrs';
import { figure } from '@mdit/plugin-figure';
import { imgLazyload } from '@mdit/plugin-img-lazyload';
import { imgMark } from '@mdit/plugin-img-mark';
import { imgSize } from '@mdit/plugin-img-size';
import { include } from '@mdit/plugin-include';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import shortcodePlugin from 'markdown-it-shortcode-tag';
import shortcodes from './config/shortcodes';
import ElementPlus from 'unplugin-element-plus/vite';

import generateMeta from './config/hooks/generateMeta';
import nav from './config/navigation/nav';
import sidebar from './config/navigation/sidebar';

const env = loadEnv('', process.cwd());
const hostname: string = env.VITE_HOSTNAME || 'http://localhost:4173';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Keiyoushi",
  description: "An unofficial repository of extensions for Tachiyomi and variants.",
  cleanUrls: true,
  transformHead: (context) => {
    context.head.push(['meta', { name: 'robots', content: 'noindex, nofollow' }]);
    context.head.push(...generateMeta(context, hostname));
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    search: {
      provider: 'local'
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/keiyoushi/extensions',
        ariaLabel: 'Project GitHub',
      },
      {
        icon: 'discord',
        link: 'https://discord.gg/keiyoushi',
        ariaLabel: 'Discord server',
      },
    ],
    
    editLink: {
      pattern: 'https://github.com/keiyoushi/keiyoushi.github.io/edit/main/website/:path',
      text: 'Help us improve this page',
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        forceLocale: true,
        dateStyle: 'long',
        timeStyle: 'short',
      },
    },
  },
  markdown: {
    config: (md) => {
      md
        .use(attrs)
        .use(figure)
        .use(imgLazyload)
        .use(imgMark)
        .use(imgSize)
        .use(include, {
          currentPath: env => env.filePath,
        })
        .use(tabsMarkdownPlugin)
        .use(shortcodePlugin, shortcodes);
    }
  },
  vite: {
    plugins: [ElementPlus({})],
    ssr: {
      noExternal: ['element-plus'],
    }
  }
})
