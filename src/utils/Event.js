const { slice } = Array.prototype

class MyEvent {
  constructor () {
    this._callbacks = {}
  }

  /**
   * 注册事件监听函数
   * @param {string} eventName
   * @param {function()} handlerFunc
   * @return {function()} - 调用此函数可以取消掉监听
   */
  on (eventName, handlerFunc) {
    const callbacks = this._callbacks
    const eventArr = (callbacks[eventName] || (callbacks[eventName] = []))
    eventArr.push(handlerFunc)
    return function () {
      const i = eventArr.indexOf(handlerFunc)
      if (i >= 0) eventArr.splice(i, 1)
    }
  }

  /**
   * 发布事件
   * @param {string} eventName
   */
  emit (eventName/* , ...args  */) {
    const eventArr = this._callbacks[eventName]
    if (!eventArr || !eventArr.length) return
    const args = slice.call(arguments, 1)
    eventArr.forEach(function (func) {
      func.apply(null, args)
    })
  }

  /**
   * 注册事件监听函数, 但只监听一次
   * @param {string} eventName
   * @param {function()} handlerFunc
   * @return {function()}
   */
  once (eventName, handlerFunc) {
    const unwatch = this.on(eventName, function () {
      handlerFunc.apply(null, arguments)
      // 等 emit 中的 forEach 执行完后再改变数组
      window.setTimeout(unwatch, 0)
    })
    return unwatch
  }
}

export default MyEvent
