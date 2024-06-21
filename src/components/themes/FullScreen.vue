import component from '../../shims';
<template>
  <!-- <span @click="toggle"> -->
  <!-- <i class="i-ep:full-screen" v-if="!isFullscreen"></i> -->
  <!-- <i class="i-ri:fullscreen-exit-fill" v-else></i> -->
  <!-- </span> -->
  <component
    :is="tag"
    @click="toggle"
    :class="[!isFullscreen ? 'i-ep:full-screen' : 'i-ri:fullscreen-exit-fill', 'cursor-pointer']"
  ></component>
</template>

<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()

defineProps({
  tag: {
    type: String,
    default: 'i'
  }
})
</script>

<style scoped></style>
