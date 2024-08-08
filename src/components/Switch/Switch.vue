<template>
  <div
    class="v-switch"
    :class="{
      [`v-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      class="v-switch__input"
      type="checkbox"
      role="switch"
      ref="input"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="v-switch__core">
      <div class="v-switch__core-inner">
        <span
          v-if="activeText || inacitveText"
          class="v-switch__core-inner-text"
        >
          {{ checked ? activeText : inacitveText }}
        </span>
      </div>
      <div class="v-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import type { SwitchEmits, SwitchProps } from "./types"

defineOptions({
  name: "VSwitch",
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
})

const emits = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)
const input = ref<HTMLInputElement>()

const checked = computed(() => innerValue.value === props.activeValue)

const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits("update:modelValue", newValue)
  emits("change", newValue)
}

onMounted(() => {
  input.value!.checked = checked.value
})

watch(checked, (newVal) => {
  input.value!.checked = newVal
})

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal
  }
)
</script>

<style scoped></style>
