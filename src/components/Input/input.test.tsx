import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Input from "./input.vue"

describe("Input", () => {
  it("基本展示", () => {
    //针对动态class 查看classes是否正确
    //针对v-if是否渲染正确的标签以及内容
    //针对slots 是否渲染正确的slots内容
    const wrapper1 = mount(Input, {
      props: {
        size: "small",
        type: "text",
        modelValue: "",
      },
      slots: {
        prepend: "prepend",
        prefix: "prefix",
      },
    })
    console.log(wrapper1.html())
    //classes
    expect(wrapper1.classes()).toContain("v-input--small")
    expect(wrapper1.classes()).toContain("is-prepend")

    //should render input
    expect(wrapper1.find("input").exists()).toBeTruthy()
    expect(wrapper1.get("input").attributes("type")).toBe("text")
    //slots
    expect(wrapper1.find(".v-input__prepend")).toBeTruthy()
    expect(wrapper1.get(".v-input__prepend").text()).toBe("prepend")

    const wrapper2 = mount(Input, {
      props: {
        type: "textarea",
        modelValue: "",
      },
    })
  })

  it("v-model功能测试", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "test",
        "onUpdate:modelValue": (e: any) => wrapper.setProps({ modelValue: e }),
        type: "text",
      },
    })
    console.log(wrapper.html())
    //初始值
    const input = wrapper.get("input")
    expect(input.element.value).toBe("test")
    //更新值
    await input.setValue("update")
    //使用setValue方法设置input元素的值为'update'，并触发input和change事件。
    expect(wrapper.props("modelValue")).toBe("update")

    console.log("the events", wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty("input")
    expect(wrapper.emitted()).toHaveProperty("change")
    //[['update'],...更多事件]
    const inputEvent = wrapper.emitted("input")
    const changeEvent = wrapper.emitted("change")
    expect(inputEvent![0]).toEqual(["update"])
    expect(changeEvent![0]).toEqual(["update"])

    //异步更新后的结果
    await wrapper.setProps({ modelValue: "prop update" })
    expect(input.element.value).toBe("prop update")
  })

  it("支持点击清空", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "clear",
        clearable: true,
        type: "text",
      },
      global: {
        stubs: ["Icon"],
      },
    })
    //不出现对应的Icon区域
    expect(wrapper.find(".v-input__clear").exists()).toBeFalsy()
    const input = wrapper.get("input")
    await input.trigger("focus")
    expect(wrapper.emitted()).toHaveProperty("focus")

    //出现icon区域
    expect(wrapper.find(".v-input__clear").exists()).toBeTruthy()

    //点击值为空并且消失
    await wrapper.get(".v-input__clear").trigger("click")
    expect(input.element.value).toBe("")

    // 点击值变为空并且消失，特别注意这里不仅仅会触发 clear 事件，对应的 input 以及 change 应该都会被触发，因为对应的值发生了变化
    expect(wrapper.emitted()).toHaveProperty("clear")
    expect(wrapper.emitted()).toHaveProperty("input")
    expect(wrapper.emitted()).toHaveProperty("change")
    const inputEvent = wrapper.emitted("input")
    const changeEvent = wrapper.emitted("change")
    expect(inputEvent![0]).toEqual([""])
    expect(changeEvent![0]).toEqual([""])

    await input.trigger("blur")
    expect(wrapper.emitted()).toHaveProperty("blur")
  })

  it("支持切换密码显示", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "",
        showPassword: true,
        type: "text",
      },
      global: {
        stubs: ["Icon"],
      },
    })
    //不出现对应的Icon区域, 因为当前值为空
    expect(wrapper.find(".v-input__password").exists()).toBeFalsy()
    const input = wrapper.get("input")
    expect(input.element.type).toBe("password")

    //当input的有值的时候 对应的Icon出现
    await input.setValue("password")
    const eyeIcon = wrapper.find(".v-input__password")
    expect(eyeIcon.exists()).toBeTruthy
    expect(eyeIcon.attributes("icon")).toBe("eye-slash")

    // 点击图标切换input类型 并且Icon 类型会切换

    await eyeIcon.trigger("click")
    expect(wrapper.find(".v-input__password").attributes("icon")).toBe("eye")
  })
})
