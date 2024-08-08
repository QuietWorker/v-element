export type SwitchValueType = boolean | string | number

export interface SwitchProps {
  modelValue: SwitchValueType
  disabled?: boolean
  activeText?: string
  inacitveText?: string
  activeValue?: SwitchValueType
  inactiveValue?: SwitchValueType
  name?: string
  id?: string
  size?: "small" | "large"
}

export interface SwitchEmits {
  (e: "update:modelValue", value: SwitchValueType): void
  (e: "change", value: SwitchValueType): void
}
