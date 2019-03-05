// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import 'font-awesome/css/font-awesome.css';
import vSelect from 'vue-select';
import VueScroller from 'vue-scroller';
import VueHtml5Editor from 'vue-html5-editor'
import App from './App';
import { httpConnect } from './utils/Http';
import { inputOption } from './utils/InputConfig';

import VueCookies from 'vue-cookies'
import clampy from '@clampy-js/vue-clampy'; /**内容省略组件 */
Vue.use(VueScroller)
Vue.use(MintUI)
Vue.component('v-select', vSelect)
    //使用cookie获取后台res.cookie设置的cookie值
Vue.use(VueCookies);
Vue.use(clampy);
Vue.use(VueHtml5Editor, inputOption);


Vue.prototype.Indicator = Indicator;
Vue.prototype.Toast = Toast;
Vue.prototype.http = httpConnect;
Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})