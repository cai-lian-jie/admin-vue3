<template>
  <el-switch
    style="--el-switch-on-color: #333"
    v-model="isDark"
    :active-action-icon="Moon"
    :inactive-action-icon="Sun"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  dark: Boolean
})
const Moon = () => h('i', { class: 'i-prime:moon' })
const Sun = () => h('i', { class: 'i-octicon:sun-24' })
// const isDark = useDark() useDark失去了动画效果
const isDark = useStorage('dark-mode-flag', props.dark)
const preferredDark = usePreferredDark() //跟随系统变换背景颜色

onMounted(() => {
  //如果用户没有设置过，则根据系统设置来决定是否为暗色模式
  if (typeof isDark.value === 'undefined' && !props.dark) {
    toggleMode(preferredDark.value)
    isDark.value = preferredDark.value
  }
})
function toggleMode(flag: boolean) {
  if (flag) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
watch(
  [isDark],
  () => {
    nextTick(() => {
      toggleMode(isDark.value)
    })
  },
  { immediate: true }
)

//跟随系统变换背景颜色
watch(preferredDark, () => {
  nextTick(() => {
    toggleMode(preferredDark.value)
    isDark.value = preferredDark.value
  })
})
</script>

<style scoped></style>
