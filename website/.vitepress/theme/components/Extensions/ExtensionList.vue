<!--
  Copyright (c) The Tachiyomi Open Source Project
  SPDX-License-Identifier: MPL-2.0
-->

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { ExtensionGroupData } from './ExtensionsWrapper.vue'
import ExtensionGroup from './ExtensionGroup.vue'

const props = defineProps<{ extensions: ExtensionGroupData[] }>()
const { extensions } = toRefs(props)

const totalCount = computed(() => {
  return extensions.value.reduce((sum, item) => sum + item.items.length, 0)
})
</script>

<template>
  <div class="extension-list">
    <ExtensionGroup
      v-for="group in extensions"
      :key="group.lang"
      :lang="group.lang"
      :list="group.items"
      :total-count="totalCount"
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
