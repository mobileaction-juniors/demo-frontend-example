import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';


import KeywordDensity from './pages/keyword-density/KeywordDensity.vue';
import KeywordGenerator from './pages/keyword-generator/KeywordGenerator.vue';
import HomePage from './pages/index.vue';

const app = createApp();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/keyword-generator', component: KeywordGenerator },
        { path: '/keyword-density', component: KeywordDensity },
    ],
});