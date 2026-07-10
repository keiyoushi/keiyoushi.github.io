<!--
  Copyright (c) The Tachiyomi Open Source Project
  SPDX-License-Identifier: MPL-2.0
-->

<script setup lang="ts">
import { ElLoading } from "element-plus";

import { nextTick, onMounted, reactive, ref, watch, computed } from "vue";
import { simpleLangName } from "../../utils/languages";
import useExtensionsRepositoryQuery from "../../queries/useExtensionsRepositoryQuery";
import { ContentWarning } from "../../queries/useExtensionsRepositoryQuery";
import ExtensionFilters from "./ExtensionFilters.vue";
import ExtensionList from "./ExtensionList.vue";
import type { Warning, Sort } from "./ExtensionFilters.vue";

// A single source flattened together with the metadata of the extension that
// provides it. The list is presented Mihon-style: one row per source.
export interface SourceRow {
	id: string
	name: string
	language: string
	homeUrl: string
	mirrorUrls: string[]
	extName: string
	packageName: string
	iconUrl: string
	apkUrl: string
	versionName: string
	contentWarning: ContentWarning
}

export interface SourceGroupData {
	lang: string
	items: SourceRow[]
}

const { data: groups, isLoading } = useExtensionsRepositoryQuery({
	select: (response) => {
		const groupsMap = new Map<string, SourceRow[]>()

		for (const ext of response) {
			for (const source of ext.sources) {
				const lang = source.language || "all"

				const row: SourceRow = {
					id: source.id,
					name: source.name,
					language: lang,
					homeUrl: source.homeUrl,
					mirrorUrls: source.mirrorUrls ?? [],
					extName: ext.name,
					packageName: ext.packageName,
					iconUrl: ext.resources.iconUrl,
					apkUrl: ext.resources.apkUrl,
					versionName: ext.versionName,
					contentWarning: ext.contentWarning,
				}

				if (!groupsMap.has(lang)) {
					groupsMap.set(lang, [])
				}
				groupsMap.get(lang)!.push(row)
			}
		}

		const result: SourceGroupData[] = Array.from(groupsMap, ([lang, items]) => {
			items.sort((a, b) => a.name.localeCompare(b.name))
			return { lang, items }
		})

		result.sort((a, b) => languageComparator(a.lang, b.lang))

		return result
	},
})

const filters = reactive({
	search: "",
	lang: [] as string[],
	warning: "All" as Warning,
	sort: "Ascending" as Sort,
})

function languageComparator(langA: string, langB: string) {
	if (langA === langB) return 0
	if (langA === "all") return -1
	if (langB === "all") return 1
	if (langA === "en") return -1
	if (langB === "en") return 1

	return simpleLangName(langA).localeCompare(simpleLangName(langB))
}

function matchesWarning(warning: ContentWarning) {
	switch (filters.warning) {
		case "Safe":
			return warning === ContentWarning.SAFE
		case "Mixed":
			return warning === ContentWarning.MIXED
		case "NSFW":
			return warning === ContentWarning.NSFW
		default:
			return true
	}
}

const filteredGroups = computed(() => {
	const filtered: SourceGroupData[] = []
	const lower = filters.search.toLowerCase()

	for (const group of (groups.value ?? [])) {
		if (filters.lang.length && !filters.lang.includes(group.lang)) {
			continue
		}

		let items = group.items.filter((source) => matchesWarning(source.contentWarning))

		if (filters.search) {
			items = items.filter(
				(source) =>
					source.name.toLowerCase().includes(lower)
					|| source.extName.toLowerCase().includes(lower)
					|| source.id.includes(filters.search)
					|| source.homeUrl.toLowerCase().includes(lower)
					|| source.mirrorUrls.some((url) => url.toLowerCase().includes(lower)),
			)
		}

		if (filters.sort === "Descending") {
			items = [...items].reverse()
		}

		if (items.length) {
			filtered.push({ lang: group.lang, items })
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

watch(groups, async () => {
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
		v-model:warning="filters.warning"
		v-model:sort="filters.sort"
		:groups="groups ?? []"
	/>
	<div class="extensions">
		<ExtensionList v-if="!isLoading" :groups="filteredGroups" />
	</div>
</template>

<style lang="stylus" scoped>
.extensions {
	min-height: 200px
}
</style>
