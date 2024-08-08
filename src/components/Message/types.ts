import type { ComponentInternalInstance, VNode } from "vue"

export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: "success" | "info" | "warning" | "danger"
  onDestroy: () => void
  zIndex: number
  offset?: number
  id: string
  transitionName?: string
}

export interface MessageContext {
  id: string
  vnode: VNode
  vcomponent: ComponentInternalInstance
  props: MessageProps
  manualDestroy: () => void
}

export type CreateMessageProps = Omit<
  MessageProps,
  "onDestroy" | "id" | "zIndex"
>
