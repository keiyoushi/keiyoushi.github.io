---
# SPDX-License-Identifier: Apache-2.0
title: Runtime
description: Shared code that some extensions need, installed as its own app.
---

<script setup lang="ts">
    import AddRepoButton from "./.vitepress/theme/components/AddRepoButton.vue";
    import { GITHUB_RUNTIME_APK, GITHUB_RUNTIME_PB, GITHUB_RUNTIME_RELEASES_LATEST } from "./.vitepress/config/constants";
</script>

# Runtime
Some extensions need the Keiyoushi Runtime, a separate app that holds code they share.
For example, it lets sites that block the app's WebView load in it.

You only need it if an extension asks for it. It installs as an extension with no sources.

## Installing
### 1. Download the app
Download the `.apk` and install it.

<div class="action-buttons">
    <a class="action-button primary" :href="GITHUB_RUNTIME_APK">
        <span class="text">Download</span>
    </a>
</div>
<span class="version-disclaimer">
    <a :href="GITHUB_RUNTIME_RELEASES_LATEST">All releases</a>
</span>

### 2. Add its update store
Open Keiyoushi Runtime and tap **Add to your app**, or add the store here:

<AddRepoButton
    :url="GITHUB_RUNTIME_PB"
    analytics-path="/#add-runtime-store"
    analytics-title="Add runtime store"
/>

::: details Adding the store manually
- Go to <nav to="extension-repos">
- Select "Add" at the bottom of your screen.
- Enter <a :href="GITHUB_RUNTIME_PB">{{ GITHUB_RUNTIME_PB }}</a>
:::

Your app then updates it like any other extension.

### 3. Check that it's installed
Go to <nav to="extensions">. Keiyoushi Runtime is listed under **Installed**.

It adds no sources, so nothing new shows up in <nav to="sources">.
