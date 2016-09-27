import Vue from 'vue'
import appConfig from './app.vue'
import _noop from 'lodash/noop'
import Event from '../../utils/Event'

class App extends Event {
  constructor () {
    super()
    this.vueApp = null
  }

  _init () {
    this._init = _noop
    const vueApp = new (Vue.extend(appConfig))({
      el: document.createElement('div')
    })
    vueApp.$after('head')
    this.vueApp = vueApp
    this.emit('initialized')
  }

  /**
   * 显示翻译按钮
   * @param {ClientRect} pos
   */
  showBtn (pos) {
    this._init()
    const { vueApp } = this
    if (pos) {
      vueApp.btn = {
        show: true,
        left: pos.left + (pos.width / 2),
        top: pos.top + pos.height
      }
      return
    }
    vueApp.btn.show = true
  }

  /**
   * 隐藏翻译按钮
   */
  hideBtn () {
    const { vueApp } = this
    if (!vueApp) return
    vueApp.btn.show = false
  }

  /**
   * 显示翻译结果
   * @param {ClientRect} pos
   */
  showWin (pos) {
    this._init()
    const { vueApp } = this
    if (pos) {
      vueApp.win = {
        show: true,
        left: pos.left,
        top: pos.top
      }
      return
    }
    vueApp.win.show = true
  }

  /**
   * 隐藏翻译结果
   */
  hideWin () {
    const { vueApp } = this
    if (!vueApp) return
    vueApp.hideWin()
  }

  /**
   * 隐藏翻译按钮和翻译结构
   */
  hide () {
    this.hideBtn()
    this.hideWin()
  }

  /**
   * 销毁实例
   */
  destroy () {
    this.destroy = _noop
    const { vueApp } = this
    if (!vueApp) return
    vueApp.$destroy(true)
  }
}

export default new App()
