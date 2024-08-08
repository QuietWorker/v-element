<template>
  <Transition :name="transitionName">
    <div
      v-show="visible"
      class="v-message"
      :class="{
        [`v-message--${type}`]: type,
        'is-close': showClose,
      }"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="v-message__content">
        <slot>
          {{ offset }} --{{ topOffset }} --{{ height }} --{{ bottomOffset }}
          <RenderVNode :v-node="message" v-if="message"></RenderVNode>
        </slot>
      </div>

      <div
        class="v-message__close"
        v-if="showClose"
        @click.stop="visible = false"
      >
        <Icon icon="xmark"></Icon>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { CreateMessageProps, MessageProps } from "./types"
import RenderVNode from "../Common/RenderVNode"
import Icon from "../Icon/Icon.vue"
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue"
import { getLastInstance, getLastBottomOffset } from "./method"
import useEventListener from "@/hooks/useEventListener"
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 20,
  transitionName: "fade-up",
})

const visible = ref(false)

//拿到上一个组件实例
const preInstance = getLastInstance()

//拿到本次组件实例
const messageRef = ref<HTMLDivElement>()

const innerComponent = getCurrentInstance()

//计算偏移高度
//这个组件的高度
const height = ref(0)
//拿到上一个组件的BottomOffset
const lastOffset = computed(() => getLastBottomOffset(props.id))
//这个组件应该使用的top
const topOffset = computed(() => props.offset + lastOffset.value)
//这个组件为下一个元素预留的offset 也就是它最低端的bottom 的值
const bottomOffset = computed(() => height.value + topOffset.value)

//最后把偏移量加到样式上
const cssStyle = computed(() => ({
  top: topOffset.value + "px",
  zIndex: props.zIndex,
}))

let timer: any

function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    console.log("timer")
    visible.value = false
  }, props.duration)
}

//hover的时候不要关闭message

function clearTimer() {
  clearTimeout(timer)
}

onMounted(async () => {
  visible.value = true
  startTimer()

  //nextTick 在Dom更新完才执行获取元素高度的操作
  await nextTick()
  height.value = messageRef.value!.offsetHeight
})

//添加键盘事件
function keyDown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === "Escape") {
    visible.value = false
  }
}
useEventListener(document, "keydown", keyDown)

watch(visible, (newVal) => {
  if (!newVal) {
    props.onDestroy()
  }
})

//再把组件的bottomOffset暴露出去
defineExpose({
  bottomOffset,
  visible,
})
</script>

<style scoped></style>
