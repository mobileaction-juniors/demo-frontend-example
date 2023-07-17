import { createApp } from 'vue';

import KeywordGenerator from './pages/keyword-generator/KeywordGenerator.vue';
import HomePage from './pages/index.vue';

const app = createApp();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/keyword-generator', component: KeywordGenerator },
    ],
});

app.use(router);

app.mount('#app');