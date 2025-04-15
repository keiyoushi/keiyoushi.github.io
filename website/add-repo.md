---
# SPDX-License-Identifier: Apache-2.0
title: "Add repository"
description: "Add this repository to the app"
lastUpdated: false
editLink: false
prev: false
next: false
---

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { GITHUB_EXTENSION_MIN_JSON, JSDELIVR_EXTENSION_MIN_JSON } from "./.vitepress/config/constants";

    const isAndroid = ref(true);
    const url = ref(GITHUB_EXTENSION_MIN_JSON);
    const officialRepos = [GITHUB_EXTENSION_MIN_JSON, JSDELIVR_EXTENSION_MIN_JSON]

    onMounted(() => {
        isAndroid.value = !!navigator.userAgent.match(/android/i);
        const urlParm = new URLSearchParams(window.location.search).get("url") || GITHUB_EXTENSION_MIN_JSON;
        const encodedUrl = encodeURIComponent(urlParm);

        if (!officialRepos.includes(urlParm)) {
            window.location.replace("/");
            return;
        }

        url.value = urlParm


        if (isAndroid.value) {
            window.goatcounter?.count?.({
                path: "/#add-to-tachiyomi",
                title: "Add extension repository",
            });

            window.location.replace(`tachiyomi://add-repo?url=${encodedUrl}`);
        }
    });
</script>

<div v-if="isAndroid">
    You should be redirected to Mihon in a moment. Refresh the page if it doesn't work,
    or add the repo manually using this link:
</div>
<div v-else>
    Unsupported operating system. Mihon is an <strong>Android</strong> app only. Please add
    the repo manually using this link:
</div>

<a :href="url">{{ url }}</a>
