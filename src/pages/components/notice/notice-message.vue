import TagProps from 'element-plus';
<template>
  <div>通知组件示例</div>
  <Notice
    :actions="actions"
    :lists="lists"
    wrap-class="w-[300px]"
    @click-item="handleClickItem"
  ></Notice>
  <Notification value="33333" color="#bfa" :size="28" :scale="scale" />
  <p></p>
  <p></p>
  <p></p>
  <p></p>
  <button @click="scale = 1">click</button>
</template>

<script setup lang="ts">
import type { NoticeActionsItem, NoticeMessageListOptions } from '@/components/notice/types'
const scale = ref(0.8)
const actions = ref<NoticeActionsItem[]>([
  {
    title: '清空',
    icon: 'ep:delete',
    click: () => {
      console.log('清空')
    }
  },
  {
    title: '更多',
    icon: 'ep:more',
    click: () => {
      console.log('更多')
    }
  }
])
const lists = ref<NoticeMessageListOptions[]>([
  {
    title: '通知',
    contents: [
      {
        title: '消息1',
        avatar: {
          url: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        },
        content: '消息内容1',
        time: '2021-12-14 13:58',
        tagProps: {
          type: 'info'
        },
        tag: '紧急'
      },
      {
        title: '消息2',
        avatar: {
          url: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1'
        },
        content: '消息内容2',
        time: '2021-12-14 13:58',
        tagProps: {
          type: 'success'
        },
        tag: '重要'
      }
    ]
  },
  {
    title: '消息',
    contents: [
      {
        title: '消息2',
        avatar: { url: '' },
        content: '消息内容2',
        time: '2021-12-14 13:58',
        tagProps: {
          type: 'success'
        },
        tag: '重要'
      }
    ]
  }
])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleClickItem = (item: any) => {
  console.log(item)
}
</script>

<style scoped></style>
