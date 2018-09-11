import Vue from 'vue';
// import axios from 'axios';
import NProgress from 'vue-nprogress';
// import { sync } from 'vuex-router-sync';

// UI组件
import sinoUI  from 'sinoUI';
import sinoPdf from 'sinoUI/packages/sinopdf/index';
import 'sinoUI/packages/theme-style/theme-deafult/index.css';
import apiPath from './api/path';
// 虚拟Dom域
import App from './App.vue';
// 导入路由
import router from './router/router.js';
// 常量数据交互等
import store from './store';
// 自定义过滤器
import filters from './filters';
// 自定义校验器
import validator from './validator';
// 消息组件全局实例
import SinoMsgGlobalFunction from './msgexchange/sinoMsgGlobalFunction';
Vue.use(SinoMsgGlobalFunction);
Vue.use(NProgress);
Vue.use(sinoUI);
Vue.use(sinoPdf);

Vue.prototype.apiPath = apiPath;
Vue.prototype.validator = validator;
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
Vue.use(VueQuillEditor);

// 全局加载进度条
const nprogress = new NProgress({
  parent: '.nprogress-container',
  template: "<div class='bar' role='bar'>" +
  "<div class='peg'></div></div>" +
  "<div class='spinner' role='spinner'>" +
  "<div class='spinner-icon'></div>" +
  "<span class='spinner-span'>拼命加载中...</span>" +
  "</div>"});

// 开启开发者相关工具检测等
Vue.config.devtools = true;
// sync(store, router)

// 定义路由全局过滤器（Token认证）
router.beforeEach((route, redirect, next) => {
  // 若果为空
  if (route.path !== '/login' && route.path !== '/') {
    if (store.state.user.token === '' || store.state.user.token === undefined) {
      if (route.path === '/forgetPwd') {
        next();
        return;
      }
      next({path: '/login'});
      return;
    }
  }
  if (route.path === '/') {
    if (store.state.user.token !== '' || store.state.user.token !== undefined) {
      if (store.state.user.roleType && store.state.user.roleType == 100) {
        next({path: '/admin'});
      } else {
        next({path: '/main'});
      }
      return;
    }
  }
  next();
});
// 加载自定义过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
// Vue实例化（虚拟Dom）全局变量
const vm = new Vue({
  router,
  store,
  nprogress,
  ...App
});

export { vm, router, store };
