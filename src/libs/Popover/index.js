// todo 将这个功能抽离出来改造成一个构造函数，方便日后开发 demo 页（给没有安装划词翻译的用户展示一下划词翻译的划词功能）
import app from './app'
import getSelection from '../../utils/selection'
import matchParent from '../../utils/matchParent'

app.once('initialized', function () {
  const { $el: appContainer } = app.vueApp
  // 点击翻译按钮时阻止浏览器清除拖蓝
  appContainer.addEventListener('mousedown', function (e) {
    const translateBtn = matchParent(e.target, '.__translate-btn__', appContainer)
    if (!translateBtn) return
    e.preventDefault()
  }, true)

  // 点击翻译按钮时开始翻译
  appContainer.addEventListener('click', function (e) {
    const translateBtn = matchParent(e.target, '.__translate-btn__', appContainer)
    if (!translateBtn) return
    app.hideBtn()
    const sl = getSelection()
    if (!sl) return
    app.vueApp.loading = true
    app.showWin(sl.rect)
    setTimeout(function () {
      app.vueApp.resultObj = { hello: 'world' }
      app.vueApp.loading = false
    }, 1000)
  })
})

// 按下 ESC 键时隐藏
document.addEventListener('keyup', function (e) {
  if (e.keyCode === 27) { // keyCode 虽然已被弃用，但目前几乎没有浏览器实现了 e.key
    app.hide()
  }
})

// 鼠标 mousedown 时隐藏 app
document.addEventListener('mousedown', function (e) {
  // 不处理 container 内的 mouseup 事件
  // 这里不用 .contains() 方法的原因是此时 app 可能并没有初始化，所以 app.vueApp 可能是 undefined
  // 没有在 appContainer 上阻止 mousedown 和 mouseup 事件传播是因为 Draggabilly 需要在 doucment 上注册事件来判断用户松开了鼠标
  const appContainer = matchParent(e.target, '#__st-container__')
  if (appContainer) return
  app.hide()
})

// 鼠标 mouseup 时显示翻译按钮
document.addEventListener('mouseup', function (e) {
  const appContainer = matchParent(e.target, '#__st-container__')
  if (appContainer) return

  // Chrome 会在 mousedown 事件产生时清除拖蓝，
  // 但如果用户的鼠标正好点击在一个拖蓝上，
  // 那么 Chrome 会在 mouseup 事件之后再清除拖蓝，
  // 所以要在 mouseup 事件之后再读取网页上的拖蓝
  window.setTimeout(function () {
    const sl = getSelection()
    if (!sl) return
    app.showBtn(sl.rect)
  }, 0)
})
