// AXIOS请求组件
import axios from 'axios';
import Vue from 'vue';
const $vue = new Vue();
// 弹窗提醒组件
import { MessageBox, Loading }  from 'sinoUI';
import store from '../store';
// 创建axios实例
const service = axios.create({
  baseURL: '/',
  timeout: 120000
});

let loading;
// request拦截器(请求之前拦截，主要为请求之前加入TOKEN)
service.interceptors.request.use(config => {
  // loading = Loading.service({fullscreen: true, text: '拼命加载中....'});
  if (store.state.user.token !== '') {
    config.headers['Token'] = store.state.user.token;
    config.headers['CorpId'] = store.state.user.corpId;
  }
  return config;
}, error => {
  console.log(error);
  // loading.close();
  return Promise.reject(error);
});

let resStatusFlag = true;
let arrFlag = true;
let _arr = ['CPYY-00001', 'CPYY-00108', 'CPYY-00107', 'CPYY-04451', 'CPYY-00130', 'CPYY-00129', 'CPYY-10042', 'CPYY-10043'];
function isInArray (arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      arrFlag = true;
    }
  }
  arrFlag = false;
}
// respone拦截器（响应拦截器，主要为后端常见错误码进行统一处理）
service.interceptors.response.use(
  response => {
    const res = response.data;
    isInArray(_arr, res.code);
    if (res.code && res.code !== 'CPYY-00001' && res.code !== 'CPYY-00130' && res.code !== 'CPYY-00108' && res.code !== 'CPYY-00107' && res.code !== 'CPYY-00129' && res.code !== 'CPYY-10043' && res.code !== 'CPYY-10042' && res.code !== 'CPYY-04451') {
      if (res.code !== 'CPYY-00123' && res.code !== 'CPYY-00124') {
        MessageBox.alert(res.message, '提示消息', {type: 'warning'});
      } else {
        if (window.location.href !== window.location.href.split("#")[0] + '#/login') {
          if (resStatusFlag) {
            resStatusFlag = false;
            MessageBox.confirm(res.message, '提示信息', {
              confirmButtonText: '确 定',
              cancelButtonText: ' ',
              type: 'warning'
            }).then(() => {
              window.location.href = window.location.href.split("#")[0] + '#/login';
              resStatusFlag = true;
            }).catch(() => {
              window.location.href = window.location.href.split("#")[0] + '#/login';
              resStatusFlag = true;
            });
          }
        }
      }
    }
    // loading.close();
    // 统一处理常见状态码
    // const res = response.data
    // 处理非后台响应
    // if (res.code !== 200) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         // 为了重新实例化vue-router对象 避免bug
    //         // location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(response)
    // } else {
    return response.data;
  },
  error => {
    if (error.response.status === 429) {
      const h = $vue.$createElement;
      MessageBox({
        title: ' ',
        message: h('div', null, [
          h('img', {attrs: {src: require('../assets/img/wait.png')}}),
          h('span', { 'class': {countdown: true} }, 60)
        ]),
        showConfirmButton: false,
        customClass: 'err429',
        callback: action => {
          clearInterval(timer);
        }
      });
      var timer = null;
      new Promise(function (resolve) {
        resolve();
      }).then(function () {
        var a = document.getElementsByClassName('countdown')[0];
        var num = 60;
        a.innerHTML = num;
        timer = setInterval(function () {
          --num;
          if (num < 10) {
            a.innerHTML = '0' + num;
          } else {
            a.innerHTML = num;
          }
          if (num <= 0) {
            num = 60;
            MessageBox.close();
            clearInterval(timer);
          }
        }, 1000);
      });
      return;
    }
    // Notification.notify.error({
    //   title: '系统消息',
    //   message: error.data.message,
    //   duration: 3000
    // });
    // MessageBox.alert(error.message, '提示消息', {type: 'warning'});
    // loading.close();
    MessageBox.alert("服务不可用，请稍后再试。", '提示消息', {type: 'info'});
    return Promise.reject(error);
  }
);

export default service;
