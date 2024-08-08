import { mount } from "@vue/test-utils"
import { beforeEach, describe, expect, test, vi } from "vitest"
import Tooltip from "./Tooltip.vue"
vi.mock("@popperjs/core")

const onVisibleChange = vi.fn()
describe("Tooltip.vue", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test("basic tooltip", async () => {
    const wrapper = mount(
      () => (
        <div>
          {/* 模拟点击外部 */}
          <div id="outside"></div>
          <Tooltip
            content="hello tooltip"
            trigger="click"
            onVisible-change={onVisibleChange}
          >
            <button id="trigger">Trigger</button>
          </Tooltip>
        </div>
      ),
      {
        attachTo: document.body,
      }
    )

    //静态测试

    const triggerArea = wrapper.find("#trigger")
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find(".v-tooltip__content").exists()).toBeFalsy()
    console.log("before", wrapper.html())
    // 测试点击行为
    triggerArea.trigger("click")
    await vi.runAllTimers()
    expect(wrapper.find(".v-tooltip__content").exists()).toBeTruthy()
    expect(wrapper.get(".v-tooltip__content").text()).toBe("hello tooltip")
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    console.log("after", wrapper.html())
    wrapper.get("#outside").trigger("click")
    await vi.runAllTimers()
    expect(wrapper.find(".v-tooltip__content").exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
