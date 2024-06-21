<template>
  <DarkModeToggle />
  <FullScreen />
  <div class="w-25 h-25 bg-red dark:bg-sky">块元素</div>
</template>

<script setup lang="ts">
import { registerSW } from 'virtual:pwa-register'

// const isDark = useDark()
// const toggle = useToggle(isDark)

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
