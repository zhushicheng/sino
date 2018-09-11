import PATH from '../api/path';
import store from '../store';
import Cookies from 'js-cookie';

export default {
  install (Vue, options) {
    // 全局消息实例
    Vue.prototype.msg = {};

    // 注册方法
    Vue.prototype.registry = function () {
      let token = Cookies.get("Token");
      if (typeof (token) === "undefined" || token === '') {
        console.log("不存在Token无需注册");
        return;
      }
      let message = JSON.stringify({
        msgType: 'REGISTRY_REQUEST',
        msgBody: {
          token: Cookies.get('Token'),
          userId: Cookies.get('UserId')
        }
      });
      if (this.msg.readyState === 1) {
        console.log('用户状态注册', message);
        this.sendmsg(message);
      }
    };

    // 初始化方法
    Vue.prototype.init = function () {
      this.msg = new WebSocket(PATH.push.connect); // eslint-disable-line
      this.msg.onmessage = this.onmessage;
      this.msg.onclose = this.close;
    };

    // 监听关闭事件
    Vue.prototype.close = function (e) {
      // 如果readyState为undefined则说明未建立，则不需要设置链接转换为未注册
      if (typeof (this.msg) !== 'undefined') {
        store.commit('setRegistry', false);
        console.log('服务器链接断开');
        return;
      }
      console.log('未建立服务器链接');
    };

    // 发送消息
    Vue.prototype.sendmsg = function (msg) {
      this.msg.send(msg);
    };

    // 接收消息
    Vue.prototype.onmessage = function (e) {
      // 根据消息类型进行消息处理
      store.commit('updateMsg', e.data);
    };
  }
};
