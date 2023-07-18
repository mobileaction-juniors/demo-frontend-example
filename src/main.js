import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './pages/index.vue';
import KeywordGenerator from './pages/keyword-generator/KeywordGenerator.vue';
import KeywordDensity from './pages/keyword-density/KeywordDensity.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import TheNav from './components/TheNav.vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import './styles.css';

const app = createApp(App);



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/keyword-generator', component: KeywordGenerator },
        { path: '/keyword-density', component: KeywordDensity },
    ],
});

app.use(router);

// Register font-awesome-icon component globally
library.add(faCheck);
app.component('font-awesome-icon', FontAwesomeIcon);

// Register custom components globally
app.component('the-nav', TheNav);

app.use(Antd).mount('#app');