/**
 * 遍历一个节点的所有父节点，直到找到能匹配 selector 的父节点、或者碰到了 stop 为止
 * @param {Element} root
 * @param {String|Function|Element} selector
 * @param {String|Function|Element} stop
 * @return {Element|null} - 符合条件的父元素。没有找到则返回 null
 */
export default function (root, selector, stop = document.documentElement) {
  const matchFunc = wrapper(selector)
  const stopFunc = wrapper(stop)

  let node = root

  do {
    if (matchFunc(node)) {
      return node
    }
  } while ((node = node.parentElement) && !stopFunc(node))
  return null
}

function wrapper (selector) {
  if (typeof selector === 'string') {
    return function (element) {
      // 从 Chrome 34 开始支持
      // http://caniuse.com/#feat=matchesselector
      return element.matches(selector)
    }
  }

  if (typeof selector === 'function') {
    return selector
  }

  return function (element) {
    return element === selector
  }
}
