<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <Notification v-bind="filterdProps"></Notification>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <Iists
          :lists="lists"
          :actions="actions"
          :wrap-class="wrapClass"
          :wrap-style="wrapStyle"
          v-bind="$attrs"
        ></Iists>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import type { NoticeProps } from './types'
import Iists from './NoticeMessageList.vue'
import Notification from './Notification.vue'

const props = defineProps<NoticeProps>()

const filterdProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { lists, actions, ...restProps } = props
  return restProps
})
</script>

<style scoped></style>
