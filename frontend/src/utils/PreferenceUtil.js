/**
 * Created by HOZ on 13/12/2017.
 */
function _PreferenceUtil () {
}
_PreferenceUtil.prototype.prefs = undefined

_PreferenceUtil.prototype.onSaveSucceed = function (value) {
}
_PreferenceUtil.prototype.onGetSucceed = function (value) {
}
_PreferenceUtil.prototype.onRemoveSucceed = function (value) {
}
_PreferenceUtil.prototype.onSaveFail = function (error) {
}
_PreferenceUtil.prototype.onGetFail = function (error) {
}
_PreferenceUtil.prototype.onRemoveFail = function (error) {
}
_PreferenceUtil.prototype.save = function (key, value) {
  this.prefs.store(this.onSaveSucceed, this.onSaveFail, key, value)
}
_PreferenceUtil.prototype.get = function (key) {
  this.prefs.fetch(this.onGetSucceed, this.onGetFail, key)
}
_PreferenceUtil.prototype.remove = function (key) {
  this.prefs.remove(this.onRemoveSucceed, this.onRemoveFail, key)
}

var preferenceUtil = new _PreferenceUtil()
export default preferenceUtil
