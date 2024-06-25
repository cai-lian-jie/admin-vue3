<template>
  <div><IconPicker @submit="handleSubmit" /></div>
</template>

<script setup lang="ts">
import type { IconPickerSubmitProps } from '@/components/icon/types'
const handleSubmit = (data: IconPickerSubmitProps) => {
  console.log('选中的图标', data)
}
</script>

<style scoped></style>
