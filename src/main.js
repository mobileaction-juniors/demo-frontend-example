import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueClipboard from 'vue-clipboard2';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import 'ant-design-vue/dist/antd.css';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

Vue.component('fa', FontAwesomeIcon);
Vue.component('the-header', TheHeader);
Vue.component('the-nav', TheNav);

Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
