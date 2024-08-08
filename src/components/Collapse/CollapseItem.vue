<template>
  <div
    class="v-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="v-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle"></Icon>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="v-collapse-item__wrapper" v-show="isActive">
        <div class="v-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue"
import { collapseContextKey, type CollapseItemProps } from "./types"
import Icon from "../Icon/Icon.vue"
defineOptions({
  name: "VCollapseItem",
})
const props = defineProps<CollapseItemProps>()

const collapseContext = inject(collapseContextKey)

const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})

const handleClick = () => {
  if (props.disabled) {
    return
  }

  collapseContext?.handleItemClick(props.name)
}

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = "0px"
    el.style.overflow = "hidden"
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = "auto"
    el.style.overflow = ""
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = "hidden"
  },
  leave(el) {
    el.style.height = "0px"
  },
  afterLeave(el) {
    el.style.height = "auto"
    el.style.overflow = ""
  },
}
</script>

<style scoped>
.v-collapse-item_header {
  font-size: 30px;
}
</style>
