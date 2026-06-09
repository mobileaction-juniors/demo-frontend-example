import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ActionKit } from '@mobileaction/action-kit'

const app = createApp(App)

app.use(router)
app.use(ActionKit)

app.mount('#app')
