<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { createMessage } from "../Message/method"
import type { CreateMessageProps, MessageProps } from "../Message/types"

const props1: CreateMessageProps = {
  message: "Hello CreateMessage",
  duration: 0,
  showClose: true,
}
const props2: CreateMessageProps = {
  type: "success",
  message: "Hello CreateMessage Again",
  duration: 0,
  showClose: true,
}
const props3: CreateMessageProps = {
  type: "danger",
  message: "Hello CreateMessage Again",
  duration: 0,
  showClose: true,
}
onMounted(() => {
  createMessage(props1)
  createMessage(props2)
  createMessage(props3)
})
</script>

<style scoped></style>
