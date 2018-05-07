/**
 * Created by HOZ on 13/12/2017.
 */
import store from '../store/store'
var locationUtil = {
  getLocationPeriodically: function (timeInterval) {
    setTimeout(function () {
      console.log('get location periodically!')
      if (store.state.user._id !== '') {
        navigator.geolocation.getCurrentPosition(locationUtil.translateLoc, locationUtil.onGetLocationError, {
          timeout: 10000
          // enableHighAccuracy: true
        })
      }
      locationUtil.getLocationPeriodically(timeInterval)
    }, timeInterval)
  },
  getLocationImmediately: function () {
    console.log('get location immediately!')
    if (store.state.user._id !== '') {
      navigator.geolocation.getCurrentPosition(locationUtil.translateLoc, locationUtil.onGetLocationError, {
        timeout: 10000
        // enableHighAccuracy: true
      })
    }
  },
  translateLoc: function (position) {
    var currentLat = position.coords.latitude
    var currentLon = position.coords.longitude
    var gpsPoint = new BMap.Point(currentLon, currentLat)
    BMap.Convertor.translate(gpsPoint, 0, locationUtil.setBaiduPoint)
  },
  setBaiduPoint: function (point) {
    console.log('$$$$$$$$$ this is baidu point $$$$$$$$$$$$')
    console.log(point)
    if (store.state.user._id !== '') {
      var param = {}
      param.user_id = store.state.user._id
      param.locationLat = point.lat
      param.locationLng = point.lng
      store.dispatch('UPSERT_USER_LOCATION', param)
    }
  },
  onGetLocationError: function (error) {
    console.log('get location error:')
    console.log(error)
  }
}

export default locationUtil

