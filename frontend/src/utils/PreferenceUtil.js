/**
 * Created by HOZ on 13/12/2017.
 */
function _PreferenceUtil () {
}
_PreferenceUtil.prefs = undefined

_PreferenceUtil.prototype.onSaveSucceed = function (value) {
  console.log('Preference save succeed:' + value)
}
_PreferenceUtil.prototype.onGetSucceed = function (value) {
  console.log('Preference get succeed:' + value)
}
_PreferenceUtil.prototype.onRemoveSucceed = function (value) {
  console.log('Preference remove succeed:' + value)
}
_PreferenceUtil.prototype.onSaveFail = function (error) {
  console.log('Preference save error: ' +  error)
}
_PreferenceUtil.prototype.onGetFail = function (error) {
  console.log('Preference get error: ' +  error)
}
_PreferenceUtil.prototype.onRemoveFail = function (error) {
  console.log('Preference remove error: ' +  error)
}
_PreferenceUtil.prototype.save = function (key, value) {
  this.prefs.store(this.onSaveSucceed, this.onSaveFail, key, value)
}
_PreferenceUtil.prototype.get = function (key, okFunc, failFunc) {
  this.prefs.fetch(okFunc, failFunc, key)
}
_PreferenceUtil.prototype.remove = function (key) {
  this.prefs.remove(this.onRemoveSucceed, this.onRemoveFail, key)
}

var preferenceUtil = new _PreferenceUtil()
export default preferenceUtil
