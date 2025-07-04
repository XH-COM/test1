// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
//
// createApp(App).mount('#app')

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {router} from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //icon  图标
import {store} from './store/index.js'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {//icon
    app.component(key, component)

}
import 'virtual:windi.css'
import './permission.js'
// import router from "./router/index.js"; //windi
import  "nprogress/nprogress.css"  //显示全屏loading   进度条

app.use(store)
app.use(ElementPlus)
app.use(router)
app.mount('#app')