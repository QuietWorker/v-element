<template>
  <div
    class="v-select"
    :class="{
      'is-disabled': disabled,
    }"
    @click="toggleDropdown"
  >
    <Tooltip placement="bottom-start" manual ref="tooltipRef">
      <Input
        v-model="innerValue"
        :disabled="disabled"
        :placeholder="placeholder"
      ></Input>

      <template #content>
        <ul class="v-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="v-select__menu-item"
              :class="{ 'is-disabled': item.disabled }"
              :id="`select-item-${item.value}`"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type { SelectEmits, SelectProps } from "./types"
import Tooltip from "../Tooltip/Tooltip.vue"
import Input from "../Input/input.vue"
import { ref, type Ref } from "vue"
import type { TooltipInstance } from "../Tooltip/types"

const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value)
  return option ? option : null
}

defineOptions({
  name: "VSelect",
})

const props = defineProps<SelectProps>()
const emits = defineEmits<SelectEmits>()

const tooltipRef = ref() as Ref<TooltipInstance>
const innerValue = ref("")
const isDropdownShow = ref(false)

const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
  }

  isDropdownShow.value = show
  emits("visible-change", show)
}

const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
</script>

<style scoped></style>
