/**
 * 给一个元素注册事件处理函数
 * @param {EventTarget} target
 * @param {String} eventName
 * @param {Function} handler
 * @param {Boolean} [useCapture]
 * @return {Function} - 调用返回的函数能移除事件处理函数
 */
export default function (target, eventName, handler, useCapture) {
  target.addEventListener(eventName, handler, useCapture)
  return function () {
    target.removeEventListener(eventName, handler, useCapture)
  }
}
