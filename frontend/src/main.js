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
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// import 'element-ui/lib/theme-default/index.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import preferenceUtil from './utils/PreferenceUtil'
import locationUtil from './utils/LocationUtil'
import notificationUtil from './utils/NotificationUtil'
import backgroundModeUtil from './utils/BackgroundModeUtil'
import VueCordova from 'vue-cordova'

Vue.use(Element)
// Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(MuseUI)
Vue.use(Moment)
Vue.use(VueCordova)
// Vue.use(Vuetify)

Vue.config.productionTip = false

function getUserNotificationPeriodically () {
  console.log('going to get user inform....')
  setTimeout(function () {
    if (store.state.user._id !== '') {
      store.dispatch('GET_NEW_INFORM_COUNT')
      store.dispatch('GET_NEW_DUTY_NOTIFICATION_COUNT')
    }
    getUserNotificationPeriodically()
  }, 60000)
}

function onBackKeyDown (e) {
  console.log('back button fired!!!!!')
  // e.preventDefault()
  if (store.state.isRootView) {
    backgroundModeUtil.plugin.moveToBackground()
  } else {
    router.go(-1)
  }
  // return false
}

var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false)
    // document.addEventListener("backbutton", this.onBackKeyDown, false);
  },
  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    console.log('******************************** device is ready')
    // app.receivedEvent('deviceready')
    backgroundModeUtil.plugin = cordova.plugins.backgroundMode
    backgroundModeUtil.initialize()
    preferenceUtil.prefs = plugins.appPreferences
    store.dispatch('GET_CURRENT_USER')
    notificationUtil.notification = cordova.plugins.notification.local
    getUserNotificationPeriodically()
    locationUtil.getLocationPeriodically(300000)
    document.addEventListener("backbutton", onBackKeyDown, false);
  },

  // onBackKeyDown: function () {
  //   router.go(-1)
  // },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id)
    var listeningElement = parentElement.querySelector('.listening')
    var receivedElement = parentElement.querySelector('.received')

    listeningElement.setAttribute('style', 'display:none;')
    receivedElement.setAttribute('style', 'display:block;')

    console.log('Received Event: ' + id)
  }
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
