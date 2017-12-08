/**
 * Created by HOZ on 18/09/2017.
 */

import Vue from 'vue'
import MuseUI from 'muse-ui'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import store from './store/store'
import Moment from 'vue-moment'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'

Vue.use(Element)
// Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(MuseUI)
Vue.use(Moment)

Vue.config.productionTip = false

function getUserInform0 () {
  console.log('going to get user inform....')
  setTimeout(function () {
    if (store.state.user._id !== '') {
      store.dispatch('GET_INFORM_BY_USER')
    }
    getUserInform0()
  }, 120000)
}

function getLocation () {
  console.log('$$$$$$$$$ try to get location $$$$$$$$$$$$$')
  setTimeout(function () {
    if (store.state.user._id !== '') {
      navigator.geolocation.getCurrentPosition(translateLoc, onGetLocationError, {timeout: 3000, enableHighAccuracy: true})
    }
    getLocation()
  }, 30000)
}
function translateLoc (position) {
  var currentLat = position.coords.latitude
  var currentLon = position.coords.longitude
  var gpsPoint = new BMap.Point(currentLon, currentLat)
  BMap.Convertor.translate(gpsPoint, 0, setBaiduPoint)
}
function setBaiduPoint (point) {
  console.log('$$$$$$$$$ this is baidu point $$$$$$$$$$$$')
  console.log(point)
  if (store.state.user._id !== '') {
    var param = {}
    param.user_id = store.state.user._id
    param.locationLat = point.lat
    param.locationLng = point.lng
    store.dispatch('UPSERT_USER_LOCATION', param)
  }
}
function onGetLocationError (error) {
  console.log('get location error:')
  console.log(error)
}

var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    console.log('******************************** device is ready')
    // app.receivedEvent('deviceready')
    app.pluginInitialize()
    // window.navigator.splashscreen.hide()
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id)
    var listeningElement = parentElement.querySelector('.listening')
    var receivedElement = parentElement.querySelector('.received')

    listeningElement.setAttribute('style', 'display:none;')
    receivedElement.setAttribute('style', 'display:block;')

    console.log('Received Event: ' + id)
  },

  pluginInitialize: function () {
    // var silentBtn = document.getElementById('silent'),
    // var modeBtn = document.getElementById('mode')
    var plugin = cordova.plugins.backgroundMode
    plugin.setDefaults({ color: 'F14F4D' })
    plugin.overrideBackButton()

    plugin.on('activate', app.onModeActivated)
    plugin.on('deactivate', app.onModeDeactivated)
    plugin.on('enable', app.onModeEnabled)
    plugin.on('disable', app.onModeDisabled)
    console.log('******************************** background mode set enable')
    plugin.enable()
    // modeBtn.onclick = app.onModeButtonClicked

    // if (device.platform === 'Android') {
    //   silentBtn.onclick = app.onSilentButtonClicked
    // } else {
    //   app.onSilentButtonClicked()
    // }
  },
  // To update the badge in intervals
  timer: null,
  // Update badge once mode gets activated
  onModeActivated: function () {
    console.log('background mode activated !!!!!')
    var counter = 0

    plugin.disableWebViewOptimizations()

    app.timer = setInterval(function () {
      console.log('background timer is running !!!!!')
      console.log(counter)
      counter++

      console.log('Running since ' + counter + ' sec')
      // socket.doSend('Running since ' + counter + ' sec')

      cordova.plugins.notification.badge.set(counter)

      if (counter % 15 === 0) {
        cordova.plugins.backgroundMode.configure({
          text: 'Running since ' + counter + ' sec'
        })

        if (navigator.vibrate) {
          navigator.vibrate(1000)
        }
      }
    }, 1000)
  },
  // Reset badge once deactivated
  onModeDeactivated: function () {
    console.log('background mode de-activated !!!!!')
    cordova.plugins.notification.badge.clear()
    clearInterval(app.timer)
  },
  // Update CSS classes
  onModeEnabled: function() {
    console.log('******************************** background mode enabled')
    getUserInform0()
    getLocation()
    // cordova.plugins.notification.badge.registerPermission();
  },
  // Update CSS classes
  onModeDisabled: function() {
  },
}

app.initialize()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
