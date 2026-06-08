import { createApp } from 'vue'
import '@mobileaction/action-kit/dist/style.css'
import { ActionKit } from '@mobileaction/action-kit'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(ActionKit)

app.mount('#app')
