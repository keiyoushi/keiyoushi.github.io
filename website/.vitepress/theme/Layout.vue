<script setup lang="ts">
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { watch } from 'vue';

const route = useRoute();

watch(() => route.path, (path, _) => {
  window.goatcounter?.count?.({ path });
})
</script>

<template>
  <DefaultTheme.Layout />
</template>
