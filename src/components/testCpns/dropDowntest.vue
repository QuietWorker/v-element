<template>
  <div>
    <Dropdown
      :menu-options="menuOptions"
      :trigger="trigger"
      placement="bottom"
      @visible-change="(e) => inlineConsole('visible-change:', e)"
      @select="(e) => inlineConsole('selectt:', e)"
    >
      <img
        src="../../assets/logo.svg"
        alt="Vue logo"
        class="logo"
        width="125"
        height="125"
      />
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Dropdown from "../Dropdown/Dropdown"
import type { MenuOption } from "../Dropdown/types"
import { h } from "vue"
const trigger = ref<any>("click")
const menuOptions: MenuOption[] = [
  { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", divided: true },
  { key: 3, label: "item3", disabled: true },
  { key: 4, label: "item4" },
]

const inlineConsole = (...args: any) => {
  console.log(...args)
}
</script>

<style scoped></style>
