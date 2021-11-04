import { createApp } from 'vue-demi'
import router from './router/vue-router'
import App from './index.vue'
import mitt from 'mitt'

//install()

import 'uno.css'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.prod.css'
import { Quasar } from 'quasar'

//import 'vuetify/styles'
//import { createVuetify } from 'vuetify'

const app = createApp(App)
.use(router)
.use(ElementPlus)
.use(Antd)
.use(Quasar, {
  plugins: {},
})
//.use(createVuetify())

app.config.globalProperties.$eventBus = mitt()
app.mount('#app')
