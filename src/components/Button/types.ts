export type ButtonType = "primary" | "success" | "info" | "danger" | "warning"

export type ButtonSize = "small" | "normal" | "large"

export type NativeType = "button" | "submit" | "reset"
export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  nativeType?: NativeType
  autofocus?: boolean
  loading?: boolean
  icon?: string
}

export interface ButtonInstance {
  ref: HTMLButtonElement
}
