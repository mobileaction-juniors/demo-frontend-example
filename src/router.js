import { createRouter, createWebHistory} from "vue-router";
import MaKeywordGenerator from "@/pages/keyword-generator/KeywordGenerator.vue";
import HomePage from './pages/index.vue';
import KeywordDensity from "@/pages/keyword-density/KeywordDensity.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/keyword-generator', component: MaKeywordGenerator },
        { path: '/keyword-density', component: KeywordDensity },
    ],
});