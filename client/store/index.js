import Vue from 'vue';
import Vuex from 'vuex';
import Cookie from 'js-cookie';

Vue.use(Vuex);

// 定义存储空间
const state = {
  user: {
    token: Cookie.get('Token'),
    corpId: Cookie.get('CorpId'),
    corpName: Cookie.get('CorpName'),
    userRoleId: Cookie.get('userRoleId') || '',
    roleId: Cookie.get('RoleId') || '',
    userId: Cookie.get('UserId'),
    avatar: '',
    roleType: Cookie.get('roleType') || '',
    loginUser: Cookie.get('loginUser') || {},
    suppInfo: Cookie.get('suppInfo') || {},
    loginConfig: Cookie.get('loginConfig') || {},
    name: Cookie.get('CPYY-INFO-NAME')
  },
  registryStatus: false,
  menu: [],
  msg: {}
};

// 定义状态提交
const mutations = {
  saveToken: (state, userInfo) => {
    state.user.token = userInfo.token;
  },
  saveInfo: (state, userInfo) => {
    state.user.userRoleId = userInfo.userRoleId;
    state.user.roleId = userInfo.roleId;
    state.user.avatar = userInfo.avatar;
    state.user.name = userInfo.name;
    state.user.corpId = userInfo.corpId;
    state.user.corpName = userInfo.corpName;
    state.user.userId = userInfo.userId;
    state.user.roleType = userInfo.roleType;
    state.user.loginUser = userInfo.loginUser;
    state.user.suppInfo = userInfo.suppInfo;
    state.user.loginConfig = userInfo.loginConfig;
  },
  saveMenu: (state, menu) => {
    state.menu = menu;
  },
  clearUserInfo: (state) => {
    state.user.token = '';
    state.user.userRoleId = '';
    state.user.roleId = '';
    state.user.avatar = '';
    state.user.name = '';
    state.user.corpId = '';
    state.user.corpName = '';
    state.user.userId = '';
    state.user.roleType = '';
    state.user.loginUser = {};
    state.user.suppInfo = {};
    state.user.loginConfig = {};
  },
  setRegistry: (boolean) => {
    state.registryStatus = boolean;
  },
  updateMsg: (state, msg) => {
    state.msg = JSON.parse(msg);
  }
};

const store = new Vuex.Store({
  state,
  mutations
});

export default store;
