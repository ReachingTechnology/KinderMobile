/**
 * Created by HOZ on 30/08/2017.
 */
import Moment from 'moment'
function _DateUtil () {
}

_DateUtil.prototype.getNow = function () {
  let date = new Date()
  let miliseconds = date.getMilliseconds()
  return (date.getTime() - miliseconds) / 1000
}
_DateUtil.prototype.getYesterday = function () {
  let startofTodayMili = this.getStartOfToday() * 1000
  return new Date(startofTodayMili - 3600 * 24 * 1000)
}
_DateUtil.prototype.getToday = function () {
  let startofTodayMili = this.getStartOfToday() * 1000
  return new Date(startofTodayMili)
}
_DateUtil.prototype.getTheDay = function (startOfTheDay) {
  return new Date(startOfTheDay * 1000)
}
_DateUtil.prototype.getStartOfToday = function () {
  let date = new Date()
  let hour = date.getHours()
  let min = date.getMinutes()
  let second = date.getSeconds()
  let miliseconds = date.getMilliseconds()
  return (date.getTime() - hour * 3600 * 1000 - min * 60 * 1000 - second * 1000 - miliseconds) / 1000
}
_DateUtil.prototype.getStartOfTheday = function (dayDate) {
  let hour = dayDate.getHours()
  let min = dayDate.getMinutes()
  let second = dayDate.getSeconds()
  let miliseconds = dayDate.getMilliseconds()
  return (dayDate.getTime() - hour * 3600 * 1000 - min * 60 * 1000 - second * 1000 - miliseconds) / 1000
}
_DateUtil.prototype.getStartofThisWeek = function () {
  let date = new Date()
  let startoftoday = this.getStartOfToday()
  let dayofThisWeek = date.getDay()
  dayofThisWeek = dayofThisWeek === 0 ? 7 : dayofThisWeek
  return startoftoday - (dayofThisWeek - 1) * 3600 * 24
}
_DateUtil.prototype.getStartofLastWeek = function () {
  return this.getStartofThisWeek() - 7 * 3600 * 24
}
_DateUtil.prototype.getStartofThisMonth = function () {
  let date = new Date()
  // let firstDayofMonth = new Date(date.setDate(1))
  // let hour = date.getHours()
  // let min = date.getMinutes()
  // let second = date.getSeconds()
  // return firstDayofMonth.getTime() / 1000 - hour * 3600 - min * 60 - second
  let startOfToday = this.getStartOfToday()
  console.log('start of this month')
  console.log(startOfToday - 3600 * 24 * (date.getDate() - 1))
  return startOfToday - 3600 * 24 * (date.getDate() - 1)
}
_DateUtil.prototype.getStartofMonthofTheDay = function (datetime) {
  let startOfTheday = this.getStartOfTheday(datetime)
  return startOfTheday - 3600 * 24 * (datetime.getDate() - 1)
}
_DateUtil.prototype.getDatetimeSeconds = function (datetime) {
  let date = Moment(datetime).toDate()
  console.log(date)
  let miliseconds = date.getMilliseconds()
  return (date.getTime() - miliseconds) / 1000
}
_DateUtil.prototype.getDayCountOfTheMonth = function (date) {
  return new Date(date.getYear(), date.getMonth() + 1, 0).getDate()
}
_DateUtil.prototype.getDayCountOfLastMonth = function (date) {
  return new Date(date.getYear(), date.getMonth(), 0).getDate()
}

var dateUtil = new _DateUtil()
export default dateUtil
