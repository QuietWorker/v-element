<template>
  <Transition name="v-alert-fade">
    <div
      class="v-alert"
      :class="{
        [`v-alert__${type}`]: type,
        [`v-alert__${effect}`]: effect,
      }"
      v-if="visible"
    >
      <div
        class="v-alert__content"
        :class="{
          [`v-alert__withDescription`]: description,
        }"
      >
        <span :class="{ ['v-alert__title']: title }">{{ title }}</span>
        <p :class="{ ['v-alert__description']: description }"><slot></slot></p>
      </div>
      <div v-if="closable" class="v-alert__close">
        <Icon @click.stop="visible = false" icon="xmark"></Icon>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { AlertEmit, AlertProps } from "./types"
import Icon from "../Icon/Icon.vue"
import { ref } from "vue"

defineOptions({
  name: "VAlert",
})

const props = withDefaults(defineProps<AlertProps>(), {
  closable: true,
  effect: "light",
})
const visible = ref(true)
const emits = defineEmits<AlertEmit>()

const hideAlert = () => {
  visible.value = false
  emits("close")
}

defineExpose({
  hide: () => hideAlert(),
})
</script>

<style scoped></style>
