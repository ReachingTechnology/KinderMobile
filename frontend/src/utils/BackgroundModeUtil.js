/**
 * Created by HOZ on 15/12/2017.
 */
import LocationUtil from './LocationUtil'

function _BackgroundModeUtil () {
}
_BackgroundModeUtil.prototype.plugin = undefined

_BackgroundModeUtil.prototype.initialize = function () {
  // var silentBtn = document.getElementById('silent'),
  // var modeBtn = document.getElementById('mode')
  this.plugin.setDefaults({ title: '岗位职责安全管理平台', text: '应用正在后台运行', icon: 'icon', color: 'F14F4D' })
  // this.plugin.overrideBackButton()

  this.plugin.on('activate', this.onModeActivated)
  this.plugin.on('deactivate', this.onModeDeactivated)
  this.plugin.on('enable', this.onModeEnabled)
  this.plugin.on('disable', this.onModeDisabled)
  this.plugin.enable()
}
  // Update badge once mode gets activated
_BackgroundModeUtil.prototype.onModeActivated = function () {
  backgroundModeUtil.plugin.disableWebViewOptimizations()
  LocationUtil.getLocationImmediately()
}

// Reset badge once deactivated
_BackgroundModeUtil.prototype.onModeDeactivated = function () {
  LocationUtil.getLocationImmediately()
}

// Update CSS classes
_BackgroundModeUtil.prototype.onModeEnabled = function() {
}

// Update CSS classes
_BackgroundModeUtil.prototype.onModeDisabled = function() {
}

var backgroundModeUtil = new _BackgroundModeUtil()
export default backgroundModeUtil
