import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { ActionKit } from '@mobileaction/action-kit'
import '@mobileaction/action-kit/dist/style.css'
import './style.css'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(ActionKit)
app.use(pinia)

app.mount('#app')
