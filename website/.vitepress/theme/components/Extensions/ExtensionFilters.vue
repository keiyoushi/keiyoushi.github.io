<!--
  Copyright (c) The Tachiyomi Open Source Project
  SPDX-License-Identifier: MPL-2.0
-->

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
} from 'element-plus'

import { langName, simpleLangName } from '../../utils/languages'
import type { SourceGroupData } from './ExtensionsWrapper.vue'

export type Warning = 'All' | 'Safe' | 'Mixed' | 'NSFW'
export type Sort = 'Ascending' | 'Descending'

const props = defineProps<{
  groups: SourceGroupData[]
  search: string
  lang: string[]
  warning: Warning
  sort: Sort
}>()

defineEmits<{
  (e: 'update:search', search: string): void
  (e: 'update:lang', lang: string[]): void
  (e: 'update:warning', warning: Warning): void
  (e: 'update:sort', sort: Sort): void
}>()

const { groups } = toRefs(props)

const isSmallScreen = useMediaQuery('(max-width: 767px)')
const labelPosition = computed(() => isSmallScreen.value ? 'top' : 'right')
</script>

<template>
  <ClientOnly>
    <div class="filters-list">
      <ElForm label-width="120px" :label-position="labelPosition">
        <ElFormItem label="Search:">
          <ElInput
            :model-value="search"
            placeholder="Search sources by name, ID or URL..."
            clearable
            @update:model-value="$emit('update:search', $event)"
          />
        </ElFormItem>
        <ElFormItem label="Languages:">
          <ElSelect
            :model-value="lang"
            placeholder="Show specific languages..."
            multiple
            clearable
            @update:model-value="$emit('update:lang', $event)"
          >
            <ElOption
              v-for="group in groups"
              :key="group.lang"
              :label="group.lang === 'en' ? simpleLangName(group.lang) : langName(group.lang)"
              :value="group.lang"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Sort by:">
          <ElRadioGroup
            :model-value="sort"
            @update:model-value="$emit('update:sort', $event)"
          >
            <ElRadio label="Ascending" />
            <ElRadio label="Descending" />
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="Content:">
          <ElRadioGroup
            :model-value="warning"
            @update:model-value="$emit('update:warning', $event)"
          >
            <ElRadio label="All" />
            <ElRadio label="Safe" />
            <ElRadio label="Mixed" />
            <ElRadio label="NSFW" />
          </ElRadioGroup>
        </ElFormItem>
      </ElForm>
    </div>
  </ClientOnly>
</template>

<style lang="stylus">
.filters-list {
  display: flex
  flex-direction: column
  row-gap: 1rem
}

.el-select {
  width: 100%
}
</style>
