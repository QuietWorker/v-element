<template>
  <div class="v-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot />

      <template #content>
        <ul class="v-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            >
              <!-- role="separator"是一个ARIA角色，表示这个元素是一个分隔符。 -->
            </li>
            <li
              class="v-dropdown__item"
              :class="{
                'is-disabled': item.disabled,
                'is-divided': item.divided,
              }"
              @click="itemClick(item)"
            >
              <RenderVNode :v-node="item.label"></RenderVNode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type {
  DropdownEmits,
  DropdownInstance,
  DropdownProps,
  MenuOption,
} from "./types"
import Tooltip from "../Tooltip/Tooltip.vue"
import { ref } from "vue"
import type { TooltipInstance } from "../Tooltip/types"
import RenderVNode from "../Common/RenderVNode"

const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true,
})
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance | null>(null)
const visibleChange = (e: boolean) => {
  emits("visible-change", e)
}

const itemClick = (item: MenuOption) => {
  if (item.disabled) {
    return
  }
  emits("select", item)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide(),
})
</script>

<style scoped></style>
