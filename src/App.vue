<script setup lang="ts">
import { onMounted, ref } from "vue"
import Button from "./components/Button/Button.vue"
import Collapse from "./components/Collapse/Collapse.vue"
import Item from "./components/Collapse/CollapseItem.vue"
import type { ButtonInstance } from "./components/Button/types"
import Icon from "./components/Icon/Icon.vue"
import Alert from "./components/Alert/Alert.vue"
import Tooltip from "./components/Tooltip/Tooltip.vue"
import type { TooltipInstance } from "./components/Tooltip/types"

import dropDownTest from "./components/testCpns/dropDowntest.vue"
import messageTest from "./components/testCpns/messageTest.vue"

const buttonRef = ref<ButtonInstance | null>(null)
const openedValue = ref(["a"])
const size = ref<any>("3x")
const trigger = ref<any>("hover")

//测试tooltip手动触发功能
const tooltipRef = ref<TooltipInstance | null>(null)
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}

onMounted(() => {
  setTimeout(() => {
    openedValue.value = ["a", "b"]
    size.value = "2xl"
    // trigger.value = "hover"
  }, 2000)
})
</script>

<template>
  <div class="App">
    <messageTest></messageTest>
    <dropDownTest></dropDownTest>
    <Tooltip content="Hello World" placement="right" :trigger="trigger">
      <img
        src="./assets/logo.svg"
        alt="Vue logo"
        class="logo"
        width="125"
        height="125"
      />
    </Tooltip>
    <Icon icon="house" color="#da70cc"></Icon>
    <Icon icon="pen" spin :size="size" type="danger"></Icon>
    <Button ref="buttonRef">Test Button</Button>
    <Button plain>Test Button</Button>
    <Button round>Round Button</Button>
    <Button circle>ci</Button>
    <Button disabled>disabled button</Button> <br />
  </div>
  <main>
    <Button type="primary">Primary</Button>
    <Button type="primary" plain>Primary</Button>
    <Button type="success">Success</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info">Info</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger">Danger</Button>
    <Button type="danger" plain>Danger</Button>
  </main>
  <Button size="large" loading>Loading</Button>
  <Button size="large" icon="arrow-up">icon</Button>

  <Collapse v-model="openedValue" accordion>
    <Item name="a" title="Title A">
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </Item>
    <Item name="b" title="Title B">
      <div>this is bbbbb test</div>
    </Item>
    <Item name="c" title="Disabled Title" disabled>
      <div>this is cccc test</div>
    </Item>
  </Collapse>
  <Alert title="success alert" type="success" effect="dark"
    >success description</Alert
  >
</template>

<style scoped></style>
