import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@mobileaction/action-kit/dist/style.css"
import TheHeader from './components/TheHeader.vue'

const app = createApp(App)

app.component('the-header', TheHeader)

app.use(router)

app.mount('#app')
