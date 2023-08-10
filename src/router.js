import { createRouter, createWebHistory} from "vue-router";
import MaKeywordGenerator from "@/pages/keyword-generator/KeywordGenerator.vue";
import HomePage from './pages/index.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/keyword-generator', component: MaKeywordGenerator },
    ],
});