<template>
  <div class="mb-2 flex justify-end items-center w-full">
    <div class="mr-4">
      <el-checkbox
        v-model="copyIconComponentFlag"
        label="复制Icon组件"
        class="mr-2"
        size="large"
      ></el-checkbox>
    </div>
    <div class="mr-4">
      <el-switch
        v-model="copyTypeFlag"
        class="mb-2"
        active-text="复制Icon名称"
        inactive-text="复制SVG图标"
      ></el-switch>
    </div>
    <div class="mr-4">
      <el-switch v-model="showTextFlag" active-text="显示文字" inactive-text="隐藏文字"></el-switch>
    </div>
  </div>
  <IconList :show-text="showTextFlag" @click="handleClick"></IconList>
</template>

<script setup lang="ts">
//iconify element-plus
import { loadIcon } from '@iconify/vue'

//false - CopyName
//true - CopySvgData
const copyTypeFlag = ref(true)
const showTextFlag = ref(true)
const copyIconComponentFlag = ref(false)
const source = ref('')
const { copy, copied } = useClipboard({ source })

function convertStringToPascalCase(input: string): string {
  // 去除连字符，并将字符串分割成单词数组
  const words = input.split('-')

  // 转换每个单词的首字母为大写，并拼接成新的字符串
  const pascalCaseString = words.reduce((result, word) => {
    return result + word.charAt(0).toUpperCase() + word.slice(1)
  }, '')

  return pascalCaseString
}

function objectToSvg(svgObject: any) {
  const { body, hFlip, height, left, rotate, top, vFlip, width } = svgObject
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" transform="translate(${left}${top}) rotate(${rotate})${hFlip ? ' scale(-1,1)' : ''}${vFlip ? ' scale(-1,1)' : ''}">${body}</svg>`
  return svg
}

async function handleClick(icon: string) {
  if (!copyTypeFlag.value) {
    const res = await loadIcon('ep:' + icon)
    console.log('res->', res)
    source.value = objectToSvg(res)
    copy()
    copied &&
      ElMessage({
        message: '复制成功',
        type: 'success'
      })
  } else {
    source.value = convertStringToPascalCase(icon)
    copy()
    copied &&
      ElMessage({
        message: '复制成功',
        type: 'success'
      })
  }
}
</script>

<style scoped></style>
