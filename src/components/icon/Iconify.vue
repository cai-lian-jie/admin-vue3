<template>
  <component :is="Icon" v-bind="props" />
</template>

<script setup lang="ts">
import { Icon, type IconProps } from '@iconify/vue'
const props = defineProps<IconProps>()
</script>

<style lang="scss" scoped></style>
