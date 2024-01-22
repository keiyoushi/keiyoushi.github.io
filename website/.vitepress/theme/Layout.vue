<script setup lang="ts">
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { watch } from 'vue';

const route = useRoute();

watch(() => route.path, (_, path) => {
  console.log(path);

  window.goatcounter?.count?.({ path });
})
</script>

<template>
  <DefaultTheme.Layout />
</template>
