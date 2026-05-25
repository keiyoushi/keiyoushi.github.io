<!--
  Copyright (c) The Tachiyomi Open Source Project
  SPDX-License-Identifier: MPL-2.0
-->

<script setup lang="ts">
import groupBy from "lodash.groupby";
import { ElLoading } from "element-plus";

import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import { simpleLangName } from "../../utils/languages";
import useExtensionsRepositoryQuery from "../../queries/useExtensionsRepositoryQuery";
import type { Extension } from "../../queries/useExtensionsRepositoryQuery";
import ExtensionFilters from "./ExtensionFilters.vue";
import ExtensionList from "./ExtensionList.vue";
import type { Nsfw, Sort } from "./ExtensionFilters.vue";

export interface ExtensionGroupData {
	lang: string
	items: Extension[]
}

const { data: extensions, isLoading } = useExtensionsRepositoryQuery({
	select: (response) => {
		const groupsMap = new Map<string, Extension[]>()

		for (const ext of response) {
			const langs = new Set(ext.sources.map((s) => s.language || 'all'))
			for (const lang of langs) {
				if (!groupsMap.has(lang)) {
					groupsMap.set(lang, [])
				}
				groupsMap.get(lang)!.push(ext)
			}
		}

		const groups: ExtensionGroupData[] = Array.from(groupsMap.entries()).map(([lang, items]) => ({
			lang,
			items,
		}))

		groups.sort((a, b) => languageComparator(a.lang, b.lang))

		return groups
	},
})

const filters = reactive({
	search: "",
	lang: [] as string[],
	nsfw: "Show all" as Nsfw,
	sort: "Ascending" as Sort,
})

function languageComparator(langA: string, langB: string) {
	if (langA === "all") return -1
	if (langB === "all") return 1
	if (langA === "en") return -1
	if (langB === "en") return 1

	const nameA = simpleLangName(langA)
	const nameB = simpleLangName(langB)
	return nameA.localeCompare(nameB)
}

const filteredExtensions = computed(() => {
	const filtered: ExtensionGroupData[] = []

	for (const group of (extensions.value ?? [])) {
		let filteredItems = filters.lang.length
			? (filters.lang.includes(group.lang) ? group.items : [])
			: group.items

		if (filters.search) {
      const lower = filters.search.toLowerCase();

			filteredItems = filteredItems.filter(
				(ext) =>
					ext.name.toLowerCase().includes(lower)
					|| ext.sources.some((source) => source.id.includes(filters.search)),
			)
		}
		filteredItems = filteredItems.filter((ext) => {
			if (filters.nsfw === "Show all") return true
			const isNsfw = ext.sources.some(s => s.contentRating === 'CONTENT_RATING_EROTICA' || s.contentRating === 'CONTENT_RATING_PORNOGRAPHIC')
			return isNsfw === (filters.nsfw === "NSFW")
		})

		if (filters.sort && filters.sort === "Descending") {
			filteredItems = [...filteredItems].reverse()
		}
		if (filteredItems.length) {
			filtered.push({
				lang: group.lang,
				items: filteredItems,
			})
		}
	}

	return filtered
})

const loadingInstance = ref<ReturnType<typeof ElLoading["service"]>>()

onMounted(() => {
	loadingInstance.value = ElLoading.service({
		target: ".extensions",
		fullscreen: false,
		background: "transparent",
	})
})

watch(extensions, async () => {
	if (window.location.hash) {
		await nextTick()
		document.getElementById(window.location.hash.substring(1))
			?.scrollIntoView({ behavior: "smooth" })
	}
})

watch([isLoading, loadingInstance], async ([newIsLoading]) => {
	if (!newIsLoading) {
		loadingInstance.value?.close()
	}
})
</script>

<template>
	<ExtensionFilters
		v-model:search="filters.search"
		v-model:lang="filters.lang"
		v-model:nsfw="filters.nsfw"
		v-model:sort="filters.sort"
		:extensions="extensions ?? []"
	/>
	<div class="extensions">
		<ExtensionList v-if="!isLoading" :extensions="filteredExtensions" />
	</div>
</template>

<style lang="stylus" scoped>
.extensions {
	min-height: 200px
}
</style>