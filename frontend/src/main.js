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

var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready')

    window.navigator.splashscreen.hide()
  },

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
