/**
 * Created by HOZ on 15/12/2017.
 */
function _NotificationUtil () {
}
_NotificationUtil.prototype.notification = undefined

_NotificationUtil.prototype.scheduleSingle = function (param) {
  this.notification.schedule({
    id: param.id,
    title: param.title,
    text: param.text,
    icon: param.icon,
    smallIcon: param.smallIcon,
    sound: param.sound,
    badge: 1,
    data: param.data
  });
}
var notificationUtil = new _NotificationUtil()
export default notificationUtil
