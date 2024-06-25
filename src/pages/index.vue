<template>
  <DarkModeToggle />
  <FullScreen />
  <div class="w-25 h-25 bg-red dark:bg-sky">块元素</div>
  <div>{{ $t('hello') }}</div>
  <!-- <div>{{ $t('el.colorpicker.confirm') }}</div> -->
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh-CN">中文</option>
  </select>
  <div>{{ $t('any.thing') }}</div>
</template>

<script setup lang="ts">
import { loadLocaleMessages } from '@/modules/i18n'
import { registerSW } from 'virtual:pwa-register'
// const isDark = useDark()
// const toggle = useToggle(isDark)
const locale = ref('zh-CN')
watch(locale, () => {
  console.log('locale:', locale.value)
  loadLocaleMessages(locale.value)
})
onMounted(() => {
  registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      console.log('🚀 ~ onRegisteredSW ~ registration:', registration)
      console.log('🚀 ~ onRegisteredSW ~ _url:', _url)
      setInterval(() => {
        registration && registration.update()
      }, 3600000)
    }
  })
})
const handleClick = () => {
  // toggle()
}
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: default
</route>
