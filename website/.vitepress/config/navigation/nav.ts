// SPDX-License-Identifier: Apache-2.0

import type { DefaultTheme } from "vitepress";
import { GITHUB_EXTENSION_MIN_JSON } from "../constants";

const nav: DefaultTheme.NavItem[] = [
  { text: 'Add repo', link: `/add-repo?url=${encodeURIComponent(GITHUB_EXTENSION_MIN_JSON)}` },
  { text: 'Guide', link: '/docs/guides/getting-started' },
  { text: 'Extensions', link: '/extensions/' },
  { text: 'News', link: '/news' },
]

export default nav;
