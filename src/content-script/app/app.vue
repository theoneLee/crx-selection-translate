<template>
  <div id="__st-container__">
    <div class="__translate-btn__" :style="btnStyle">译</div>
    <div class="__win__" :style="winStyle" v-el:win>
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

    .__translate-btn__ {
      position: absolute;
    }
  }
</style>
