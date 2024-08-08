import { mount, type DOMWrapper, type VueWrapper } from "@vue/test-utils"
import { beforeAll, describe, expect, test, vi } from "vitest"
import Collapse from "./Collapse.vue"
import CollapseItem from "./CollapseItem.vue"
const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  disabledContent: DOMWrapper<Element>,
  firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>,
  disabledHeader: DOMWrapper<Element>

describe("Collapse.vue", () => {
  //beforeAll : 在所有测试用例开始之前先运行的钩子函数
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={["a"]} onChange={onChange}>
          <CollapseItem name="a" title="Title A">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="Title B">
            content B
          </CollapseItem>
          <CollapseItem name="c" title="Title C" disabled>
            content C
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["Icon"],
        },
        attachTo: document.body,
      }
    )
    headers = wrapper.findAll(".v-collapse-item__header")
    contents = wrapper.findAll(".v-collapse-item__wrapper")
    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })

  test("测试组件基础结构以及对应文本", () => {
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
  })

  test("点击标题展开/关闭内容", async () => {
    await firstHeader.trigger("click")
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger("click")
    expect(secondContent.isVisible()).toBeTruthy()
  })

  test("发送正确的事件", () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(["b"])
  })

  test("disabled的内容有无反应", async () => {
    //清除调用次数
    onChange.mockClear()
    const disableHeader = headers[2]
    expect(disableHeader.classes()).toContain("is-disabled")
    await disableHeader.trigger("click")
    expect(disabledContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })
})
