import Vue from 'vue'
import App from './App'

wx.cloud.init({
    traceUser: true
})

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
