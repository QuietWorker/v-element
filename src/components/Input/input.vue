<template>
  <div
    class="v-input"
    :class="{
      [`v-input--${type}`]: type,
      [`v-input--${size}`]: size,
      'is-disabled': disabled,
      'is-clearable': clearable,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus,
    }"
  >
    <!-- text/password -->
    <template v-if="props.type !== 'textarea'">
      <!-- prepend 插槽 -->
      <div v-if="$slots.prepend" class="v-input__prepend">
        <slot name="prepend" />
      </div>

      <div class="v-input__wrapper">
        <!-- prefix插槽 -->
        <span v-if="$slots.prefix" class="v-input__prefix">
          <slot name="prefix" />
        </span>
        <!-- 真正的input内部 -->
        <input
          class="v-input__inner"
          ref="inputRef"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          v-model="innerValue"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-bind="attrs"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        />

        <!-- suffix插槽 -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="v-input__suffix"
        >
          <slot name="suffix" />
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="v-input__clear"
            @click="clear"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="v-input__password"
            @click="togglePasswordVisible"
          ></Icon>
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="v-input__password"
            @click="togglePasswordVisible"
          ></Icon>
        </span>
      </div>

      <!-- append插槽 -->
      <div v-if="$slots.append" class="v-input-append">
        <slot name="append" />
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        class="v-input-textarea"
        v-bind="attrs"
        ref="inputRef"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch, type Ref } from "vue"
import type { InputEmits, InputProps } from "./types"
import Icon from "../Icon/Icon.vue"

defineOptions({
  name: "v-input",
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), { type: "text" })
const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)
/* useAttrs 是一个组合式 API 函数，用于访问组件的非 prop 属性（即传递给组件但未在 props 中定义的属性）。这些属性通常包括 class、style 和其他 HTML 属性。 */
const attrs = useAttrs()

const inputRef = ref() as Ref<HTMLInputElement>

const showClear = computed(
  () =>
    props.clearable && !props.disabled && !!innerValue.value && isFocus.value
)

const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
)

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

const handleInput = () => {
  emits("update:modelValue", innerValue.value)
  emits("input", innerValue.value)
}
const handleChange = () => {
  emits("change", innerValue.value)
}
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits("focus", event)
}

const handleBlur = (event: FocusEvent) => {
  isFocus.value = false
  emits("blur", event)
}

const clear = () => {
  innerValue.value = ""
  emits("update:modelValue", "")
  emits("clear")
  emits("input", "")
  emits("change", "")
}

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal
  }
)
</script>

<style scoped></style>
