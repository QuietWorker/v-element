import { defineComponent, h } from "vue"

const RenderVNode = defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      required: true,
    },
  },
  setup(props) {
    return () => props.vNode
  },
})

export default RenderVNode
