<!--
  Copyright (c) The Tachiyomi Open Source Project
  SPDX-License-Identifier: MPL-2.0
-->

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import type { Extension } from '../../queries/useExtensionsRepositoryQuery';
import ExtensionItem from './ExtensionItem.vue';
import { simpleLangName, langName } from '../../utils/languages';

const props = defineProps<{ list: Extension[], lang: string, totalCount: number }>()
const { list } = toRefs(props)

const groupName = computed(() => {
  const lang = props.lang

  return lang === 'en'
    ? simpleLangName(lang)
    : langName(lang)
})
</script>

<template>
  <div class="extension-group">
    <h2>
      <span>{{ groupName }}</span>

      <span class="extensions-total">
        Total:
        <span class="extensions-total-sum">
          {{ totalCount }}
        </span>
      </span>
    </h2>

    <ExtensionItem
      v-for="extension in list"
      :key="`${extension.packageName}-${props.lang}`"
      :item="extension"
    />
  </div>
</template>

<style lang="stylus">
.extension-group h2 {
  display: flex
  align-items: center
  justify-content: space-between

  .extensions-total-sum {
    color: var(--vp-c-brand)
  }
}
</style>
