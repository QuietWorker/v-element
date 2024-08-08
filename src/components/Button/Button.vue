<template>
  <button
    ref="_ref"
    class="v-button"
    :class="{
      [`v-button--${type}`]: type,
      [`v-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :size="size"
  >
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { ButtonProps } from "./types"
import Icon from "../Icon/Icon.vue"
defineOptions({
  name: "VButton",
})

withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button",
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref,
})
</script>

<style scoped></style>
