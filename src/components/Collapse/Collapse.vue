<template>
  <div class="v-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue"
import CollapseItem from "./CollapseItem.vue"
import type { NameType, CollapseProps, CollapseEmits } from "./types"
import { collapseContextKey } from "./types"
defineOptions({
  name: "VCollapse",
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
if (props.accordion && activeNames.value.length > 1) {
  console.warn("accordion mode should only have one active item")
}
const handleItemClick = (item: NameType) => {
  let realActiveNames = [...activeNames.value]

  if (props.accordion) {
    realActiveNames = [activeNames.value[0] === item ? "" : item]
    activeNames.value = realActiveNames
  } else {
    const index = realActiveNames.indexOf(item)

    if (index > -1) {
      //activeName 存在 删除对应的一项
      realActiveNames.splice(index, 1)
    } else {
      //不存在 插入对应的item
      realActiveNames.push(item)
    }

    activeNames.value = realActiveNames
  }

  emits("update:modelValue", realActiveNames)
  emits("change", realActiveNames)
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>

<style scoped></style>
