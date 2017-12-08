/**
 * Created by HOZ on 29/09/2017.
 */

(function () { // 闭包
  function loadScript (xyUrl, callback) {
    var head = document.getElementsByTagName('head')[0]
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = xyUrl
    script.onload = script.onreadystatechange = function () {
      if ((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
        callback && callback()
        // Handle memory leak in IE
        script.onload = script.onreadystatechange = null
        if (head && script.parentNode) {
          head.removeChild(script)
        }
      }
    }
    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    head.insertBefore(script, head.firstChild)
  }
  function translate (point, type, callback) {
    var callbackName = 'cbk_' + Math.round(Math.random() * 10000)
    var xyUrl = 'https://api.map.baidu.com/ag/coord/convert?from=' + type + '&to=4&x=' + point.lng + '&y=' + point.lat + '&callback=BMap.Convertor.' + callbackName
    loadScript(xyUrl)
    BMap.Convertor[callbackName] = function (xyResult) {
      delete BMap.Convertor[callbackName]
      var point = new BMap.Point(xyResult.x, xyResult.y)
      callback && callback(point)
    }
  }

  window.BMap = window.BMap || {}
  BMap.Convertor = {}
  BMap.Convertor.translate = translate
})();
