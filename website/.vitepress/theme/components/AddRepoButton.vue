<script setup lang="ts">
import { GITHUB_EXTENSION_MIN_JSON } from "../../config/constants";
import { onMounted, ref } from "vue";

const isAndroid = ref(true);

onMounted(() => {
  isAndroid.value = !!navigator.userAgent.match(/android/i);
});

function handleAnalytics() {
  window.goatcounter?.count?.({
    path: "/#add-to-tachiyomi",
    title: "Add extension repository",
  });
}
</script>

<template>
  <div v-if="!isAndroid">
    <div class="custom-block warning">
      <p class="custom-block-title">
        Unsupported operating system
      </p>
      <p>
        <strong>Tachiyomi</strong> is an <strong>Android app</strong> only.
        Use an <strong>Android device with Tachiyomi installed</strong> to
        add this extension repo.
      </p>
    </div>
  </div>
  <div v-else>
    <div class="action-buttons">
      <a
        class="action-button primary"
        :href="`tachiyomi://add-repo?url=${encodeURIComponent(GITHUB_EXTENSION_MIN_JSON)}`"
        @click="handleAnalytics"
      >
        <span class="text">Add repository</span>
      </a>
    </div>
    <span class="version-disclaimer">
      Requires <strong>Tachiyomi 0.15.2</strong> or newer.
    </span>
    <div class="custom-block danger">
      <p class="custom-block-title">
        Caution
      </p>
      <p>
        Exercise caution when using third party extensions.
      </p>
    </div>
  </div>
</template>

<style lang="stylus">
.action-buttons {
  display: flex
  gap: 0.75em
  justify-content: center
  align-items: center
  margin: 0.75em auto
}

.action-button {
  display: inline-block
  border: 1px solid transparent
  text-align: center
  font-weight: 600
  white-space: nowrap
  transition: color 0.25s, border-color 0.25s, background-color 0.25s
  cursor: pointer
  transition: all 0.3s ease
  border-radius: 20px
  padding: 0 20px
  line-height: 38px
  font-size: 14px

  &:hover {
    text-decoration: none !important
  }

  &.primary {
    border-color: var(--vp-button-brand-border)
    color: var(--vp-button-brand-text)
    background-color: var(--vp-button-brand-bg)

    &:hover {
      border-color: var(--vp-button-brand-hover-border)
      color: var(--vp-button-brand-hover-text)
      background-color: var(--vp-button-brand-hover-bg)
    }

    &:active {
      border-color: var(--vp-button-brand-active-border)
      color: var(--vp-button-brand-active-text)
      background-color: var(--vp-button-brand-active-bg)
    }
  }

  &.secondary {
    border-color: var(--vp-button-alt-border)
    color: var(--vp-button-alt-text)
    background-color: var(--vp-button-alt-bg)

    &:hover {
      border-color: var(--vp-button-alt-hover-border)
      color: var(--vp-button-alt-hover-text)
      background-color: var(--vp-button-alt-hover-bg)
    }

    &:active {
      border-color: var(--vp-button-alt-active-border)
      color: var(--vp-button-alt-active-text)
      background-color: var(--vp-button-alt-active-bg)
    }
  }

  svg {
    display: inline-block
    vertical-align: middle
    margin-right: 0.5em
    font-size: 1.25em
  }

  .version {
    font-size: 0.8em
  }
}

.version-disclaimer {
  display: block
  text-align: center
  margin: 0.75em auto
  font-size: 0.75rem
}
</style>
