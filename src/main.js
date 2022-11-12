import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import Maska from 'maska'
import store from '@/store'
import App from './App.vue'
import { i18n } from './i18n.js'
import router from './router'
import filters from '@/utils/filters'

const app = createApp(App)

app.config.productionTip = false

app.use(router)
app.use(store)
app.use(Antd)
app.use(Maska)
app.use(i18n)
app.mount('#app')

app.config.globalProperties.$filters = filters
