const selection = window.getSelection()

/**
 * 返回网页上选中的文本内容和这段内容的位置信息。
 * @return {null|{text: String, rect: ClientRect}}
 */
export default function () {
  if (selection.rangeCount > 0) {
    const selectedRange = selection.getRangeAt(0)
    // 划词翻译 v6 中使用 selection.toString() 获取选中的文本，
    // 用 mouseup 事件获取鼠标指针的位置、并依据这个位置计算弹出内容的位置，
    // 这种方式的好处是能获取到 input、textarea 这类元素中选中的文本并提供翻译功能，但同时也带来了不少缺点：
    //  1. mouseup 事件时，指针的位置可能会离选中区域非常远
    //  2. 仅通过一个点无法很友善的计算弹出内容的位置，例如如果我想将弹出内容显示在选中区域上方就做不到
    // 所以在 v7 中，划词翻译使用了新的方式获取文本及选中区域的位置信息。
    // 虽然无法获取到输入框中选中区域的位置信息，但实际上很少有人会在书写内容时需要翻译功能
    if (selectedRange && !selectedRange.collapsed) {
      const text = selectedRange.toString().trim()
      if (text) {
        return {
          text,
          rect: selectedRange.getBoundingClientRect()
        }
      }
    }
  }
  return null
}
