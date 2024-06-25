<template>
  <el-badge :value="value" :max="99">
    <slot>
      <Icon
        icon="ep:bell"
        :style="{ color: iconColor ?? '#333', fontSize: iconSize ? `${iconSize}px` : '18px' }"
        >首页</Icon
      >
    </slot>
  </el-badge>
</template>

<script setup lang="ts">
import Icon from '../icon/Iconify.vue'
import type { NotificationProps } from './types'

const props = withDefaults(defineProps<NotificationProps>(), {
  icon: 'ep:bell',
  size: 10,
  color: '',
  scale: 1
})

//teanslateX -> scale 之间的对应关系
function calclateTransform(scale: number) {
  //定义scale和translateX的范围
  const minScale = 0.4
  const maxScale = 1
  const minTranslateX = 75 //单位：%
  const maxTranslateX = 100 //单位：%
  //translateX的值
  const translateX =
    minTranslateX + (maxTranslateX - minTranslateX) * ((scale - minScale) / (maxScale - minScale))

  //返回完整的transform属性值
  return { translateX, scale }
}
const tranformData = computed(() => calclateTransform(props.scale))
const colorBg = computed(() => props.color || 'var(--el-color-danger)')
const ContentFontSize = computed(() => props.size + 'px' || 'va(--el-badge-size)')
const translateX = computed(() => (tranformData.value?.translateX || 100) + '%')
const ContentScale = computed(() => tranformData.value?.scale || 100)
</script>

<style lang="scss" scoped>
// $color: var(--clj-notice-bg-color);
// $size: var(--clj-notice-font-size);
// $translate-x: var(--clj-notice-translate-x);
// $scale: var(--clj-notice-scale);
:deep(.el-badge__content) {
  background-color: v-bind(colorBg);
  font-size: v-bind(ContentFontSize);
  transform: translateY(-50%) translateX(v-bind(translateX)) scale(v-bind(ContentScale));
}
</style>
