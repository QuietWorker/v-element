<template>
  <i
    class="v-icon"
    :class="{ [`v-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <FontAwesomeIcon v-bind="filteredProps"></FontAwesomeIcon>
  </i>
</template>

<script setup lang="ts">
import type { IconProps } from "./types"
import { omit } from "lodash-es"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { computed } from "vue"

defineOptions({
  name: "VIcon",
  inheritAttrs: false,
})

const props = defineProps<IconProps>()
const filteredProps = computed(() => omit(props, ["type", "color"]))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<style scoped></style>
