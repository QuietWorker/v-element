import { computed, ref } from "vue"

const zIndex = ref(0)

const usezIndex = (initialValue = 2000) => {
  //初始值也可以是响应式
  const initialZIndex = ref(initialValue)
  const currentZIndex = computed(() => zIndex.value + initialValue)
  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    currentZIndex,
    nextZIndex,
    initialZIndex,
  }
}

export default usezIndex
