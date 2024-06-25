<template>
  <div class="icon-picker">
    <!-- button & icon -->
    <el-button type="primary" @click="() => toggle(true)">
      <slot>选择图标</slot>
    </el-button>
    <!-- dialog -->
    <el-dialog :title="title" :width="width" v-model="show">
      <!-- icon-list -->
      <IconList
        item-class="hover:bg-sky-100"
        icon-class="text-2xl"
        :show-text="false"
        activeClass="text-rose"
        @click="handleClick"
      ></IconList>
      <!-- settings -->
      <div class="py-2 flex">
        <div class="mr-4">
          <span class="pr-2">color:</span>
          <el-color-picker class="mr-2" v-model="color"></el-color-picker>
        </div>
        <div class="flex items-center flex-1">
          <span class="pr-2">fontSize:</span>
          <el-slider v-model="num" :step="1" show-input></el-slider>
        </div>
      </div>
      <div>
        选中的图标:<Icon :icon="iconRef" :style="{ color: color, fontSize: `${num}px` }"></Icon>
      </div>
      <template #footer>
        <el-button @click="() => toggle(false)">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { IconPickerSubmitProps } from './types'

defineProps({
  width: {
    type: String,
    default: '50%'
  },
  title: {
    type: String,
    default: '选择图标'
  }
})
const color = ref('#409eff')
const num = ref(16)
const iconRef = ref('')
const [show, toggle] = useToggle(false)
const emits = defineEmits<{
  submit: [IconPickerSubmitProps]
  cancel: []
}>()
const handleClick = (i: string) => {
  iconRef.value = i
}
// 确认并关闭dialog
const handleConfirm = () => {
  toggle(false)
  emits('submit', { icon: iconRef.value, color: color.value, fontSize: num.value })
}
</script>

<style lang="scss" scoped>
.icon-picker {
  :deep(.el-dialog__body) {
    height: auto;
    padding-top: 0;
    padding-bottom: 0;
    max-height: 65vh;
    overflow-y: auto;
  }
}
</style>
