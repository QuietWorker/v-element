import { onMounted, onUnmounted, type Ref } from "vue"

const useClickOutside = (
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      //点击不是被tooltip容器包含着的元素的时候才执行对应的回调
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener("click", handler)
  })
  onUnmounted(() => {
    document.removeEventListener("click", handler)
  })
}

export default useClickOutside
