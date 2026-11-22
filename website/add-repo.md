---
# SPDX-License-Identifier: Apache-2.0
title: "Add store"
description: "Add this store to the app"
lastUpdated: false
editLink: false
prev: false
next: false
---

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import {
        GITHUB_EXTENSION_PB,
        JSDELIVR_EXTENSION_PB,
        GITHUB_RUNTIME_PB,
        JSDELIVR_RUNTIME_PB,
    } from "./.vitepress/config/constants";

    const isAndroid = ref(true);
    const url = ref(GITHUB_EXTENSION_PB);
    const officialRepos = [GITHUB_EXTENSION_PB, JSDELIVR_EXTENSION_PB, GITHUB_RUNTIME_PB, JSDELIVR_RUNTIME_PB]

    onMounted(() => {
        isAndroid.value = !!navigator.userAgent.match(/android/i);
        const urlParm = new URLSearchParams(window.location.search).get("url") || GITHUB_EXTENSION_PB;
        const encodedUrl = encodeURIComponent(urlParm);

        if (!officialRepos.includes(urlParm)) {
            window.location.replace("/");
            return;
        }

        url.value = urlParm


        if (isAndroid.value) {
            window.goatcounter?.count?.({
                path: "/#add-to-tachiyomi",
                title: "Add extension store",
            });

            window.location.replace(`mihon://extension-store?url=${encodedUrl}`);
        }
    });
</script>

<div v-if="isAndroid">
    You should be redirected to Mihon in a moment. Refresh the page if it doesn't work,
    or add the store manually using this link:
</div>
<div v-else>
    Unsupported operating system. Mihon is an <strong>Android</strong> app only. Please add
    the store manually using this link:
</div>

<a :href="url">{{ url }}</a>
