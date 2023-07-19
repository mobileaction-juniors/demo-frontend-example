import { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import router from './router';

import 'ant-design-vue/dist/antd.css';

import './styles.css';
library.add(faCheck);


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');