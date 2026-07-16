import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ActionKit } from '@mobileaction/action-kit'
import '@mobileaction/action-kit/dist/style.css'
import './style.css'

const app = createApp(App)

app.use(ActionKit)
app.use(router)

app.mount('#app')
