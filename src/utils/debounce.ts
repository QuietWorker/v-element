const debounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  const _debounce = function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
  _debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return _debounce
}

export default debounce
