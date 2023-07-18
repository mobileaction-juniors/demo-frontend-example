import { createApp } from 'vue';
import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import router from './router';

import 'ant-design-vue/dist/antd.css';

import './styles.css';

const app = createApp(App);

app.use(router);


library.add(faCheck);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');