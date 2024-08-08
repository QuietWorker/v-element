import { h, reactive, render, shallowReactive } from "vue"
import type { CreateMessageProps, MessageContext, MessageProps } from "./types"
import MessageConstructor from "./Message.vue"
import usezIndex from "@/hooks/usezIndex"

let seed = 1

const instances: MessageContext[] = shallowReactive([])

export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = usezIndex()
  const id = `message_${seed++}`
  const container = document.createElement("div")

  //手动删除: 其实是手动调整组件中visible的值
  //visible是通过expose传出来的
  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vcomponent.exposed!.visible.value = false
    }
  }

  //将组件从整个dom 中卸载
  const destroy = () => {
    //同时删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id)
    //当idx为-1时表示没有找到
    if (idx === -1) return
    instances.splice(idx, 1)

    render(null, container)
  }
  const newProps = {
    ...props,
    onDestroy: destroy,
    id,
    zIndex: nextZIndex(),
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  //添加节点 因为直接添加container会有一个多余的div元素  所以要传第一个子节点
  //使用!非空断言解决类型判断可能为空的问题
  document.body.appendChild(container.firstElementChild!)

  const vcomponent = vnode.component!
  //每次创建实例存储信息
  const instance = {
    id,
    vnode,
    props: newProps,
    vcomponent,
    manualDestroy,
  }
  //把信息存储到数组中
  instances.push(instance)
  return instance
}

//暴露出最后一个实例
export const getLastInstance = () => {
  return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)

  if (idx <= 0) {
    //代表查找的组件是第一个组件 bottomoffset的距离为0
    return 0
  } else {
    //上一个组件也就是这个组件的索引-1
    const prev = instances[idx - 1]
    return prev.vcomponent.exposed!.bottomOffset.value
  }
}

export const closeAll = () => {
  instances.forEach((instance) => {
    instance.manualDestroy()
  })
}
