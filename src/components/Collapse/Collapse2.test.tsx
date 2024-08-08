import { mount } from "@vue/test-utils"
import { describe, expect, test, vi } from "vitest"
import Collapse from "./Collapse.vue"
import CollapseItem from "./CollapseItem.vue"
import { h } from "vue"

describe("Collapse.vue", () => {
  test("basic collapse", async () => {
    //导入事件
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ["a"],
      },
      slots: {
        default: (
          <>
            <CollapseItem name="a" title="Title A">
              content a
            </CollapseItem>
            <CollapseItem name="b" title="Title B">
              content B
            </CollapseItem>
            <CollapseItem name="c" title="Title C" disabled>
              content C
            </CollapseItem>
          </>
        ),
      },

      global: {
        stubs: ["Icon"],
      },
      attachTo: document.body,
    })
    const headers = wrapper.findAll(".v-collapse-item__header")
    const contents = wrapper.findAll(".v-collapse-item__content")

    //长度来判断是否渲染3个
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    //标题
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe("Title A")

    //内容

    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe("content a")
    //行为
    await firstHeader.trigger("click")
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger("click")
    expect(secondContent.isVisible()).toBeTruthy()
    expect(wrapper.emitted()).toHaveProperty("change")
    const changeEvent = wrapper.emitted("change") as any[]
    console.table(changeEvent)
    expect(changeEvent).toHaveLength(2)

    expect(changeEvent[0]).toEqual([[]])
    expect(changeEvent[1]).toEqual([["b"]])
    //disabled
    const disableHeader = headers[2]
    expect(disableHeader.classes()).toContain("is-disabled")
    await disableHeader.trigger("click")
    expect(disabledContent.isVisible()).toBeFalsy()
  })
})
