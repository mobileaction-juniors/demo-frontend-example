import VueRouter from 'vue-router';
import Vue from 'vue';
import KeywordGenerator from './pages/keyword-generator/KeywordGenerator.vue';
import HomePage from './pages/index.vue';
import KeywordDensity from "@/pages/keyword-density/KeywordDensity.vue";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: HomePage },
        { path: '/keyword-generator', component: KeywordGenerator },
        { path: '/keyword-density', component: KeywordDensity },
    ],
});

export default router;
