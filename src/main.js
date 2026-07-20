import { createApp } from 'vue'
import { ActionKit } from '@mobileaction/action-kit'
import '@mobileaction/action-kit/dist/style.css'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ActionKit)

app.mount('#app')
