import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { ActionKit } from '@mobileaction/action-kit'
import '@mobileaction/action-kit/dist/style.css'
import { ModuleRegistry, ClientSideRowModelModule, CellStyleModule } from 'ag-grid-community'

ModuleRegistry.registerModules([ClientSideRowModelModule, CellStyleModule])

const app = createApp(App)

app.use(router)
app.use(ActionKit)

app.mount('#app')
