import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VideoPlayer from 'vue-video-player'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import 'lib-flexible'

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VideoPlayer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
