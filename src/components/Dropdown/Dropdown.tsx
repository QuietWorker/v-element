import { hide, type Options, type Placement } from "@popperjs/core"
import { Fragment, computed, defineComponent, ref, type PropType } from "vue"
import type { MenuOption } from "./types"
import Tooltip from "../Tooltip/Tooltip.vue"
import type { TooltipInstance } from "../Tooltip/types"
export default defineComponent({
  name: "VDropdown",

  props: {
    placement: {
      type: String as PropType<Placement>,
      default: "bottom",
    },
    trigger: {
      type: String as PropType<"hover" | "click">,
      default: "hover",
    },
    transition: {
      type: String,
      default: "fade",
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true,
    },
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["visible-change", "select"],

  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null)

    const visibleChange = (e: boolean) => {
      emit("visible-change", e)
    }

    const itemClick = (item: MenuOption) => {
      if (item.disabled) {
        return
      }
      emit("select", item)
      if (props.hideAfterClick) {
        tooltipRef.value?.hide()
      }
    }

    const options = computed(() => {
      return props.menuOptions.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.divided ? (
              <li role="separator" class="divided-placeholder" />
            ) : (
              ""
            )}
            <li
              class={{
                "v-dropdown__item": true,
                "is-disabled": item.disabled,
                "is-divided": item.divided,
              }}
              onClick={() => itemClick(item)}
              id={`dropdown-item-${item.key}`}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide(),
    })
    return () => (
      <div class="v-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          ref={tooltipRef}
          onVisible-change={visibleChange}
        >
          {{
            default: () => slots.default && slots.default(),
            content: () => <ul class="v-dropdown__menu">{options.value}</ul>,
          }}
        </Tooltip>
      </div>
    )
  },
})
