import { isRef, onBeforeUnmount, onMounted, unref, watch, type Ref } from "vue"

export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any
) {
  //先使用isRef判断是否是响应式对象
  if (isRef(target)) {
    //如果是响应式对象 就先解绑原来的事件 再传入新的事件
    watch(target, (newVal, oldVal) => {
      oldVal?.removeEventListener(event, handler)
      newVal?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}
