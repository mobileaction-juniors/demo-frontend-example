import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ActionKit } from '@mobileaction/action-kit'
import { ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community'
import "@mobileaction/action-kit/dist/style.css"
import "./main.css"

ModuleRegistry.registerModules([ClientSideRowModelModule])

const app = createApp(App)

app.use(router)
app.use(ActionKit)

app.mount('#app')
