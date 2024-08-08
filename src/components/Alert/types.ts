export interface AlertProps {
  type?: "success" | "info" | "danger" | "warning"
  title?: string
  description?: string
  closable?: boolean
  center?: boolean
  closeText?: string
  showIcon?: boolean
  effect?: "light" | "dark"
}
export interface AlertEmit {
  (e: "close"): void
}
