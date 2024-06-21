<template>
  <div><IconPicker @submit="handleSubmit" /></div>
</template>

<script setup lang="ts">
import type { IconPickerSubmitType } from '@/components/icon/types'
const handleSubmit = (data: IconPickerSubmitType) => {
  console.log('选中的图标', data)
}
</script>

<style scoped></style>
