import { createApp } from 'vue';
import App from './App.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import TheNav from './components/TheNav.vue';
import router from './router';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import './styles.css';

const app = createApp(App);

app.use(router);

// Register font-awesome-icon component globally
library.add(faCheck);
app.component('font-awesome-icon', FontAwesomeIcon);

// Register custom components globally
app.component('the-nav', TheNav);

app.use(Antd).mount('#app');