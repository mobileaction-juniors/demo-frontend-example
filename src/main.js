import { createApp} from "vue";
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight} from "@fortawesome/free-solid-svg-icons";
import router from './router';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import 'ant-design-vue/dist/antd.css';
//import './index.css';
import { FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const app = createApp(App)
library.add(faAngleRight)
app.component('font-awesome-icon', FontAwesomeIcon);

app.component('the-header', TheHeader);
app.component('the-nav', TheNav);

app.config.productionTip = false;
app.use(router)
app.mount('#app')