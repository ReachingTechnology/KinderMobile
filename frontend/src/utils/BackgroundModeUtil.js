/**
 * Created by HOZ on 15/12/2017.
 */
function _BackgroundModeUtil () {
}
_BackgroundModeUtil.prototype.plugin = undefined

_BackgroundModeUtil.prototype.initialize = function () {
  // var silentBtn = document.getElementById('silent'),
  // var modeBtn = document.getElementById('mode')
  this.plugin.setDefaults({ color: 'F14F4D' })
  // this.plugin.overrideBackButton()

  this.plugin.on('activate', this.onModeActivated)
  this.plugin.on('deactivate', this.onModeDeactivated)
  this.plugin.on('enable', this.onModeEnabled)
  this.plugin.on('disable', this.onModeDisabled)
  console.log('******************************** background mode set enable')
  this.plugin.enable()
}
  // Update badge once mode gets activated
_BackgroundModeUtil.prototype.onModeActivated = function () {
  console.log('background mode activated !!!!!')
  backgroundModeUtil.plugin.disableWebViewOptimizations()
}

// Reset badge once deactivated
_BackgroundModeUtil.prototype.onModeDeactivated = function () {
  console.log('background mode de-activated !!!!!')
}

// Update CSS classes
_BackgroundModeUtil.prototype.onModeEnabled = function() {
  console.log('******************************** background mode enabled')
}

// Update CSS classes
_BackgroundModeUtil.prototype.onModeDisabled = function() {
}

var backgroundModeUtil = new _BackgroundModeUtil()
export default backgroundModeUtil
