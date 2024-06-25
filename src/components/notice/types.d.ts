import type { IconifyIcon } from '@iconify/vue'
import type { BadgeProps } from 'element-plus'
import type { AvatarProps, TagProps } from 'element-plus'
import { IconProps } from '@iconify/vue'
import type { CSSProperties } from 'vue'

export interface NotificationProps extends Partial<BadgeProps> {
  icon: string | IconifyIcon
  size: number
  scale: number
  color: string
  iconSize?: number
  iconColor?: string
}

export interface MessageListItem {
  avatar?: AvatarProps
  title: string
  content?: string
  time?: string
  tagProps?: Partial<TagProps>
  tag: string
}
export interface NoticeActionsItem extends IconProps {
  title: string
  click: () => void
}
export interface NoticeMessageListOptions {
  title: string
  contents?: MessageListItem[]
}
export interface NoticeMessageListProps {
  lists: NoticeMessageListOptions[]
  actions: NoticeActionsItem[]
  wrapClass?: string
  wrapStyle?: CSSProperties
}
export interface NoticeProps extends NoticeMessageListProps, Partial<NotificationProps> {}
