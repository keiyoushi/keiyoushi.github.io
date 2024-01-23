// SPDX-License-Identifier: Apache-2.0

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import { VueQueryPlugin } from '@tanstack/vue-query';
import goatcounter from './plugin/goatcounter';

import './styles/base.styl';
import 'element-plus/theme-chalk/dark/css-vars.css';
import Layout from './Layout.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueQueryPlugin);
    enhanceAppWithTabs(app);
    goatcounter({ id: "keiyoushi" });
  },
  Layout,
} satisfies Theme
