<!--
  Copyright (c) The Tachiyomi Open Source Project
  SPDX-License-Identifier: MPL-2.0
-->

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { SourceGroupData } from './ExtensionsWrapper.vue'
import ExtensionGroup from './ExtensionGroup.vue'

const props = defineProps<{ groups: SourceGroupData[] }>()
const { groups } = toRefs(props)

const totalCount = computed(() => {
  return groups.value.reduce((sum, group) => sum + group.items.length, 0)
})

const extensionCount = computed(() => {
  const packages = new Set<string>()
  for (const group of groups.value) {
    for (const source of group.items) {
      packages.add(source.packageName)
    }
  }
  return packages.size
})
</script>

<template>
  <div class="extension-list">
    <ExtensionGroup
      v-for="group in groups"
      :key="group.lang"
      :lang="group.lang"
      :list="group.items"
      :total-count="totalCount"
      :extension-count="extensionCount"
    />
  </div>
</template>

<style lang="stylus">
.extension-list {
  > div {
    &:not(:first-of-type) {
      .extensions-total {
        display: none
      }
    }
  }
}
</style>
