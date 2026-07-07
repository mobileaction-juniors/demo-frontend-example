import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ActionKit } from '@mobileaction/action-kit'
import '@mobileaction/action-kit/dist/style.css'
import './assets/tailwind.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(ActionKit)
app.use(router)

app.mount('#app')
