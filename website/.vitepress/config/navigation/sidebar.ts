// Copyright (c) The Tachiyomi Open Source Project
// SPDX-License-Identifier: MPL-2.0

import type { DefaultTheme } from 'vitepress';

const sidebar: DefaultTheme.SidebarMulti = {
  '/add-repo': defaultSidebar(),
  '/extensions/': defaultSidebar(),
  '/news': defaultSidebar(),
  '/docs/': defaultSidebar(),
};

function defaultSidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      items: [
        { text: 'Extensions', link: '/extensions/' }
      ],
    },
    {
      text: 'Frequently asked questions',
      items: [
        { text: 'General', link: '/docs/faq/general' },
      ],   
    },
    {
      text: 'Guides',
      items: [
        { text: 'Getting started', link: '/docs/guides/getting-started' },
        {
          text: 'Troubleshooting',
          link: '/docs/guides/troubleshooting',
          items: [
            { text: 'HTTP errors', link: '/docs/guides/troubleshooting/http-errors' },
          ],
        },
      ],
    },
  ]
}

export default sidebar;
