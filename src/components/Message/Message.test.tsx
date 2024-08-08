import { describe, expect, test } from "vitest"
import { closeAll, createMessage } from "./method"
import { nextTick } from "vue"

//等待Transition执行完毕
//Transition内部有两次requestAnimationFrame
export const rAf = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}

//因为是在jsDom环境下测试 没有办法直接获取各种offset的距离
//这里封装一个方法获取元素的top
function getTopValue(element: Element) {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue("top")
  return Number.parseFloat(topValue)
}

describe("createMessage", () => {
  test("调用方法应该创建对应的Message组件", async () => {
    const instance = createMessage({ message: "hello Message", duration: 0 })
    await rAf()
    console.log("html", document.body.innerHTML)
    //测试v-message是否存在
    expect(document.querySelector(".v-message")).toBeTruthy()
    instance.manualDestroy()
    await rAf()
    console.log("html2", document.body.innerHTML)
    expect(document.querySelector(".v-message")).toBeFalsy()
  })

  test("多次调用方法应该创建多个实例", async () => {
    createMessage({ message: "hello Message", duration: 0 })
    createMessage({ message: "hello Message 2", duration: 0 })

    await rAf()
    const elements = document.querySelectorAll(".v-message")

    expect(elements.length).toBe(2)

    //新建一个关闭所有Message的方法CloseAll 并测试
    closeAll()
    await rAf()
    expect(document.querySelector(".v-message")).toBeFalsy()
  })

  test("创建多个实例应该设置正确 offset", async () => {
    createMessage({ message: "hello Message", duration: 0, offset: 200 })
    createMessage({ message: "hello Message 2", duration: 0, offset: 100 })

    await rAf()
    const elements = document.querySelectorAll(".v-message")
    expect(elements.length).toBe(2)

    const firstElementTop = getTopValue(elements[0])
    const secondELementTop = getTopValue(elements[1])
    // https://github.com/jsdom/jsdom/issues/1590

    expect(firstElementTop).toBe(200)
    expect(secondELementTop).toBe(300)
  })
})
