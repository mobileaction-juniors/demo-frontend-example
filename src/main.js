import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {ActionKit} from '@mobileaction/action-kit'
import "@mobileaction/action-kit/dist/style.css"
import './main.css'
import {createPinia} from "pinia";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(ActionKit)
app.use(router)
app.mount('#app')
