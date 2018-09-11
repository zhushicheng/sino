import service from './axiosconfig.js';

export default {
  get: function (url, data) {
    return service({
      url: url, // 假地址 自行替换
      method: 'get',
      params: data
    });
  },
  post: function (url, data) {
    return service({
      url: url, // 假地址 自行替换
      method: 'post',
      data: data
    });
  },
  postsign: function (url, data) {
    return service({
      url: url, // 假地址 自行替换
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  },
  postVedio: function (url, data) {
    return service({
      url: url, // 假地址 自行替换
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  download: function (src) {
    // let $a = document.createElement('a');
    // $a.setAttribute("href", src);
    // $a.setAttribute("target", '_self');
    // $a.setAttribute("download", "");
    // let evObj = document.createEvent('MouseEvents');
    // evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
    // $a.dispatchEvent(evObj);
    var aDom = document.createElement('a');
    var evt = document.createEvent('HTMLEvents');
    // evt.initEvent('click', false, false);
    evt.initEvent('click', false, false);
    aDom.download = '';
    aDom.href = src;
    aDom.target = '_blank';
    aDom.dispatchEvent(evt);
    aDom.click();
  },
  downloadImg: function (src) {
    var $a = document.createElement('a');
    $a.setAttribute("href", src);
    $a.setAttribute("download", "");
    var evObj = document.createEvent('MouseEvents');
    evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 1, null);
    $a.dispatchEvent(evObj);
  },
  // token
  getToken: function () {
    return service({
      url: '/token', // 假地址 自行替换
      method: 'get'
    });
  },
  //  login
  LoginByEmail: function (userName, password) {
    return service({
      url: '/user.json',
      method: 'get'
    });
  },
  // 注销token请求
  loginOut: function () {
    return service({
      url: '/loginout.json',
      method: 'get'
    });
  },
  getMenuIcon: function () {
    return service({
      url: '/menuIcon.json',
      method: 'get'
    });
  },
  // 获取左侧菜单信息
  getLeftMenuInfo: function () {
    return service({
      url: '/sinomenu.json',
      method: 'get'
    });
  },
  getMenuInfo: function () {
    return service({
      url: '/menu.json',
      method: 'get'
    });
  },
  // 下拉框数据获取
  getSelectList: function () {
    return service({
      url: '/selectArray.json',
      method: 'get'
    });
  },
  // table
  getTable: function () {
    return service({
      url: '/table.json',
      method: 'get'
    });
  },
  // 分组数据请求
  getGroupSelectList: function () {
    return service({
      url: '/itemGroup.json',
      method: 'get'
    });
  },
  // 分页数据请求
  getSelectList1: function () {
    return service({
      url: '/selectArray1.json',
      method: 'get'
    });
  },
  getEditTable: function () {
    return service({
      url: '/editTable.json',
      method: 'get'
    });
  },
  getTransfer: function () {
    return service({
      // url: '/textTransfer.json',
      url: '/transfer.json',
      method: 'get'
    });
  },
  //  角色管理获取树数据
  getRoleTable: function () {
    return service({
      url: '/getRoleTable.json',
      method: 'get'
    });
  },
  //  角色管理--获取表格数据
  getTables: function (data) {
    return service({
      url: '/usertable.json',
      method: 'post',
      data: data
    });
  },
  // 角色管理--查看角色信息
  getRoleSeeList: function () {
    return service({
      url: '/roleSeeList.json',
      method: 'get'
    });
  },
  // 角色管理 公司下拉框
  getCorpSelectList: function () {
    return service({
      url: '/selectCorp.json',
      method: 'get'
    });
  },
  // 用户管理查看表格
  getUserSeeList: function () {
    return service({
      url: '/userseeList.json',
      method: 'get'
    });
  },
  // 角色管理 --角色类型下拉框
  getRoleSelectList: function () {
    return service({
      url: '/selectRole.json',
      method: 'get'
    });
  },
  // 机构管理=》获取顶部弹出=》公司树
  getComTreeLayerList: function () {
    return service({
      url: '/componylevel.json',
      method: 'get'
    });
  },
  // 机构管理=》获取顶部弹出=>机构树
  getOrgTreeLayerList: function () {
    return service({
      url: '/orglevel.json',
      method: 'get'
    });
  },
// //  获取词根管理表格字段
//   findEtymaListByName: function (data) {
//     return service({
//       url: hrsc + '/etymaManager/findEtymaListByName',
//       method: 'post',
//       data: data
//     });
//   },
// 获取词根管理检索结果
//   findColumnList: function (data) {
//     return service({
//       url: hrsc + '/etymaManager/findColumnList',
//       method: 'post',
//       data: data
//     });
//   },
  // 新增词根
  // saveEtyma: function (data) {
  //   return service({
  //     url: hrsc + '/etymaManager/saveEtyma',
  //     method: 'post',
  //     data: data
  //   });
  // },
  // 获取词根管理表格字段
  // updateEtyma: function (data) {
  //   return service({
  //     url: hrsc + '/etymaManager/updateEtyma',
  //     method: 'post',
  //     data: data
  //   });
  // },
  //  获取字典管理左侧表格数据
  getDicTable: function () {
    return service({
      url: '/dictionary-table-data.json',
      method: 'get'
    });
  },
  //  获取字典详情表格数据
  getDicDirTable: function () {
    return service({
      url: '/dictionary-table-data-dir.json',
      method: 'get'
    });
  },
  //  获取字典数据
  getDictionaryList: function () {
    return service({
      url: '/dictionary-check.json',
      method: 'get'
    });
  },
  //  获取字典详情数据
  getDictionaryDirList: function () {
    return service({
      url: '/dictionary-check-dir.json',
      method: 'get'
    });
  },
  // 用户管理 --民族下拉框
  getnationList: function () {
    return service({
      url: '/selectNation.json',
      method: 'get'
    });
  },
  // 用户类型下拉框
  getregionList: function () {
    return service({
      url: '/selectregion.json',
      method: 'get'
    });
  },
  // 用户管理 公司下拉框
  getcorpList: function () {
    return service({
      url: '/userCorp.json',
      method: 'get'
    });
  },
  // 获取地区管理树列表
  getRoleTree: function () {
    return service({
      url: '/areaTree.json',
      method: 'get'
    });
  },
  // 用户类型下拉框
  getnRegioList () {
    return service({
      url: '/selectregion.json',
      method: 'get'
    });
  },
  // 用户管理 --民族下拉框
  getNationsList () {
    return service({
      url: '/selectNation.json',
      method: 'get'
    });
  },
  // 用户管理 --民族下拉框
  getAreaLookList () {
    return service({
      url: '/area-look-list.json',
      method: 'get'
    });
  },
  // 数据结构管理 ---表格数据
  getstrucList () {
    return service({
      url: '/structuretable.json',
      method: 'get'
    });
  },
  // 获取数据结构管理树列表
  getStrucTree () {
    return service({
      url: '/structureTree.json',
      method: 'get'
    });
  }
};
