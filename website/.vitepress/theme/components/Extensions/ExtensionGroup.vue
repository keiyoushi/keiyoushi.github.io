<!--
  Copyright (c) The Tachiyomi Open Source Project
  SPDX-License-Identifier: MPL-2.0
-->

<script setup lang="ts">
import { computed } from 'vue';
import type { SourceRow } from './ExtensionsWrapper.vue';
import ExtensionItem from './ExtensionItem.vue';
import { simpleLangName, langName } from '../../utils/languages';

const props = defineProps<{ list: SourceRow[], lang: string, totalCount: number, extensionCount: number }>()

const groupName = computed(() => {
  return props.lang === 'en'
    ? simpleLangName(props.lang)
    : langName(props.lang)
})
</script>

<template>
  <div class="extension-group">
    <h2>
      <span>{{ groupName }}</span>

      <span class="extensions-total">
        <span class="extensions-total-line">
          <span class="extensions-total-sum">
            {{ totalCount }}
          </span>
          sources
        </span>
        <span class="extensions-total-ext">
          {{ extensionCount }} extensions
        </span>
      </span>
    </h2>

    <ExtensionItem
      v-for="source in list"
      :key="source.id"
      :item="source"
    />
  </div>
</template>

<style lang="stylus">
.extension-group h2 {
  display: flex
  align-items: center
  justify-content: space-between

  .extensions-total {
    display: flex
    flex-direction: column
    align-items: flex-end
    line-height: 1.3
  }

  .extensions-total-sum {
    color: var(--vp-c-brand)
  }

  .extensions-total-ext {
    color: var(--vp-c-text-2)
    font-size: 0.7em
    font-weight: 400
  }
}
</style>
