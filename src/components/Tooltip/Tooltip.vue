<template>
  <div class="v-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="v-tooltip__trigger" v-on="events" ref="triggerNode">
      <slot />
    </div>

    <Transition :name="transition">
      <div class="v-tooltip__content" v-if="isShow" ref="popperNode">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { createPopper } from "@popperjs/core"
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types"
import type { Instance } from "@popperjs/core"
import { computed, onUnmounted, reactive, ref, watch } from "vue"
import useClickOutside from "@/hooks/useClickOutside"
import { debounce } from "lodash-es"

defineOptions({
  name: "VTooltip",
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "top",
  manual: false,
  transition: "fade",
  openDelay: 0,
  closeDelay: 0,
})

const emits = defineEmits<TooltipEmits>()
const isShow = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()

// 添加一个默认时间，添加一个 50 毫秒的关闭 delay，解决当 下拉菜单和 触发直接有间距的时候引出的问题
const closeDelay = computed(() =>
  props.trigger === "hover" && props.closeDelay === 0 ? 50 : props.closeDelay
)
console.log(closeDelay.value)

//Record用于定义一个对象类型 键是某个类型的值 值是另一个类型的值
// Record<keys,Type>

let events: Record<string, any> = reactive({})
let openTimes = 0
let closeTimes = 0

//定义实例类型
let popperInstance: null | Instance = null
//传入poppers参数
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOptions,
  }
})

const togglePopper = () => {
  if (isShow.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

//显示隐藏切换的同时 使用watch来获取popper的组件实例
watch(
  isShow,
  (newVal) => {
    if (newVal) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(
          triggerNode.value,
          popperNode.value,
          popperOptions.value
        )
      }
    } else {
      //隐藏的时候销毁实例
      popperInstance?.destroy()
    }
  },
  { flush: "post" }
)

//因为要在组件生成后才能调用createPopper方法传入组件实例 所以watch要加入参数flush:post 在组件更新之后才调用watch的回调函数

//动态事件 hover/click 的解决  ---- v-on

const open = debounce(() => {
  openTimes++
  isShow.value = true
  emits("visible-change", true)
}, props.openDelay)

const openFinal = () => {
  close.cancel()
  open()
}

const close = debounce(() => {
  closeTimes++
  isShow.value = false
  emits("visible-change", false)
}, closeDelay.value)

const closeFinal = () => {
  open.cancel()
  close()
}

useClickOutside(popperContainerNode, () => {
  //当trigger为click且tooltip打开的时候才触发回调
  if (props.trigger === "click" && isShow.value && !props.manual) {
    //处理的逻辑就是关闭打开的tooltip
    closeFinal()
  }
  if (isShow.value) {
    emits("click-outside", true)
  }
})
//因为鼠标离开触发区的时候如果是移动到tooltip上是不应该消失的 所以要把事件放在整个组件的最外层

let outerEvents: Record<string, any> = reactive({})
const attachEvents = () => {
  if (props.trigger === "hover") {
    events["mouseenter"] = openFinal
    outerEvents["mouseleave"] = closeFinal
  } else if (props.trigger === "click") {
    events["click"] = togglePopper
  }
}

if (!props.manual) {
  attachEvents()
}
//实现手动触发
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = {}
      outerEvents = {}
    } else {
      attachEvents()
    }
  }
)

//切换触发方式时清空events
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      //clear events
      events = {}
      outerEvents = {}
      attachEvents()
    }
  }
)

//优化: 在组件卸载的时候也把实例销毁
onUnmounted(() => {
  popperInstance?.destroy()
})

//把方法暴露给父组件 这样父组件就可以通过模板引用 来访问 Tooltip 组件的 show 和 hide 方法
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
})
</script>

<style scoped></style>
