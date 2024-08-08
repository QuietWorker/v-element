import type { InjectionKey, Ref } from "vue"

export type NameType = string | number

// 手风琴
export interface CollapseProps {
  accordion?: boolean
  modelValue: NameType[]
}

export interface CollapseEmits {
  (e: "update:modelValue", values: NameType[]): void
  (e: "change", values: NameType[]): void
}
export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol("collapseContext")
