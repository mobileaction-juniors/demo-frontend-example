import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "@mobileaction/action-kit/dist/style.css"
import TheHeader from './components/TheHeader.vue'

const app = createApp(App)
const pinia = createPinia()

app.component('the-header', TheHeader)

app.use(pinia)
app.use(router)

app.mount('#app')
