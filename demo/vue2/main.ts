import { install, Vue2 } from 'vue-demi'
import router from './router'
import App from './index.vue'

install()

import 'uno.css'

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue2.use(ElementUI)

import 'ant-design-vue2/dist/antd.css'
import Antd from 'ant-design-vue2'
Vue2.use(Antd)

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify2/dist/vuetify.min.css'
import Vuetify from 'vuetify2'
Vue2.use(Vuetify)

new Vue2({
  render: h => h(App),
  router,
  vuetify: new Vuetify({}),
}).$mount('#app')
