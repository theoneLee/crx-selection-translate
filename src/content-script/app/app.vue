<template>
  <div id="__st-container__">
    <div class="__translate-btn__" :style="btnStyle">译</div>
    <div class="__win__" v-el:win>
      <div class="__win-header__"><span>固定</span><span @click="hideWin">关闭</span></div>
      <div>body</div>
    </div>
  </div>
</template>

<script>
  import Draggabilly from 'draggabilly'

  export default {
    data () {
      return {
        loading: false,
        btn: {
          show: false,
          top: 0,
          left: 0
        },
        win: {
          show: false,
          top: 0,
          left: 0
        },
        pinned: false
      }
    },

    computed: {
      btnStyle () {
        const { btn } = this

        return {
          display: btn.show ? 'block' : 'none',
          top: btn.top + 'px',
          left: btn.left + 'px'
        }
      },

      winStyle () {
        const { win } = this
        return {
          display: win.show ? 'block' : 'none',
          top: win.top + 'px',
          left: win.left + 'px'
        }
      }
    },

    watch: {
      // 手动更改 win 的样式，因为遇到相同的样式时 Vue 不会更新 dom，
      // 但 win 的样式可能会因为用户拖动而被 Draggabilly 改变，
      // 所以就会导致下次显示翻译窗口时的位置是上次用户拖动的位置
      winStyle: {
        deep: true,
        handler (style) {
          Object.assign(this.$els.win.style, style)
        }
      }
    },

    methods: {
      hideWin () {
        this.win.show = false
      }
    },

    ready () {
      this._draggie = new Draggabilly(this.$els.win, {
        handle: '.__win-header__'
      })
    },

    beforeDestroy () {
      const { _draggie } = this
      _draggie.destroy()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #__st-container__ {
    height: 0;

    .__win__, .__translate-btn__ {
      z-index: 9999999;
    }

    .__translate-btn__ {
      position: absolute;
    }

    .__win__ {
      display: none;
    }
  }
</style>
