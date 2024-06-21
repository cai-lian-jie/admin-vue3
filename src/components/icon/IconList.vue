<template>
  <ul class="grid grid-cols-[repeat(auto-fill,minmax(1.825rem,1fr))] border-l border-t rounded">
    <li
      :class="[
        'border-r border-b flex flex-col justify-center items-center cursor-pointer',
        itemClass
      ]"
      v-for="(icon, index) in iconData"
      :key="index"
      @click="handleClick(`${collection}:${icon}`, index)"
    >
      <component
        :class="[
          iconClass,
          { [activeClass]: modelValue ? modelValue === `${collection}:${icon}` : choose === index }
        ]"
        :is="Icon"
        :icon="`${collection}:${icon}`"
      />
      <div class="text-sm mt-3" v-if="showText">{{ convertStringToPascalCase(icon) }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
//iconify element-plus
import { loadIcons, Icon } from '@iconify/vue'
import data from './icon-ep.json'
import type { IconListType } from './types'
const choose = ref(-1)
const modelValue = defineModel()
const props = withDefaults(defineProps<IconListType>(), {
  iconData: () => data,
  collection: 'ep',
  iconClass: 'text-3xl',
  itemClass: 'w-1/8 hover:bg-sky-100 py-4',
  activeClass: ''
})
const emits = defineEmits(['click'])

onBeforeMount(async () => {
  props.iconData &&
    props.iconData.length &&
    (await loadIcons(props.iconData.map((o) => `${props.collection}:${o}`)))
})

function convertStringToPascalCase(input: string): string {
  // 去除连字符，并将字符串分割成单词数组
  const words = input.split('-')

  // 转换每个单词的首字母为大写，并拼接成新的字符串
  const pascalCaseString = words.reduce((result, word) => {
    return result + word.charAt(0).toUpperCase() + word.slice(1)
  }, '')

  return pascalCaseString
}

async function handleClick(icon: string, index: number) {
  choose.value = index
  modelValue.value = icon
  emits('click', icon)
}
</script>

<style scoped lang="scss"></style>
