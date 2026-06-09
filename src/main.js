import { createApp } from 'vue'
import '@mobileaction/action-kit/dist/style.css'
import './assets/main.css'
import App from './App.vue'
import { ActionKit } from '@mobileaction/action-kit'
import router from './router'

const app = createApp(App)

app.use(ActionKit)
app.use(router)

app.mount('#app')
