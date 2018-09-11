/**
 * Created by zhuqianqian on 2017/10/11.
 */
let validator = {
  checkMoney: function (rule, value, callback) { // 校验金额位数不得超过15位
    if (!value) {
      callback();
      return;
    }
    value = Number(value);
    if (isNaN(value)) {
      callback(new Error('请输入数字值'));
    } else {
      var  num = value + '';
      if (num.length > 15) {
        callback(new Error('金额不能超过15位'));
      } else {
        callback();
      }
    }
  },
  checkCode: function (rule, value, callback) { // 校验统一社会信用代码位数校验位数为18位（只能是）
    if (!value) {
      callback();
      return;
    }
    let reg = /^[0-9A-Z]{18}$/;
    value += '';
    if (!reg.test(value)) {
      callback(new Error('必须由18位数字或大写字母组成'));
    } else {
      callback();
    }
   /* if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('必须由18位数字或大写字母组成'));
    } */
  },
  checkNumX: function (rule, value, callback) {
    var reg = /^[0-9]+$/;
    if (!reg.test(value)) {
      callback(new Error('请输入数字值'));
    } else {
      callback();
    }
  },
  checkNum: function (rule, value, callback) { // 校验是否为数字（非必填）
    if (!value) {
      callback();
      return;
    }
    value = Number(value);
    if (isNaN(value)) {
      callback(new Error('请输入数字值'));
    } else {
      callback();
    }
  },
  checkReNum: function (rule, value, callback) { // 校验是否为数字（必填）
    if (!value) {
      callback(new Error('必填'));
      return;
    }
    value = Number(value);
    if (isNaN(value)) {
      callback(new Error('请输入数字值'));
    } else {
      callback();
    }
  },
  // 校验1-31之间的整数
  checkDateNum: function (rule, value, callback) {
    if (!value && value !== 0) {
      callback();
      return;
    }
    value = Number(value);
    var reg = /^([12]{0,1}[1-9]|30|31|20|10)$/;
    if (isNaN(value)) {
      callback(new Error('请输入数字值'));
    } else if (!reg.test(value)) {
      callback(new Error('请输入1-31之间的整数'));
    } else {
      callback();
    }
  },
  checkDateNumZero: function (rule, value, callback) {  // 校验1-31之间的整数
    if (!value && value !== 0) {
      callback();
      return;
    }
    value = Number(value);
    var reg = /^([12]{0,1}[1-9]|30|31|20|10|0)$/;
    if (isNaN(value)) {
      callback(new Error('请输入数字值'));
    } else if (!reg.test(value)) {
      callback(new Error('请输入1-31之间的整数'));
    } else {
      callback();
    }
  },
  checkMouthNumZero: function (rule, value, callback) {  // 校验1-12之间的整数
    if (!value && value !== 0) {
      callback();
      return;
    }
    value = Number(value);
    var reg = /^([1-9]|[1][0-2])$/;
    if (isNaN(value)) {
      callback(new Error('请输入数字值'));
    } else if (!reg.test(value)) {
      callback(new Error('请输入1-12之间的整数'));
    } else {
      callback();
    }
  },
  checkPointNum: function (rule, value, callback) { // 校验数字小数点后两位
    var reg = /^\d+(\.\d{0,2})?$/;
    if (!reg.test(value)) {
      callback(new Error('允许输入两位小数'));
    } else {
      callback();
    }
  },
  checkThanNum: function (rule, value, callback) { // 校验数字大于0(只能是整数)
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'));
      return;
    }
    if (value <= 0) {
      callback(new Error('必须大于0'));
      return;
    } else {
      callback();
    }
  },
  checkFloatIntNum: function (rule, value, callback) { // 校验数字大于0(整数小数均可)
    if (isNaN(value)) {
      callback(new Error('请输入数字值'));
      return;
    }
    if (value <= 0) {
      callback(new Error('必须大于0'));
      return;
    } else {
      callback();
    }
  },
  checkPhone: function (rule, value, callback) { // 校验手机号
    if (!value) {
      callback();
      return;
    }
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    value += '';
    if (!reg.test(value)) {
      callback(new Error('请输入正确的手机号码'));
    } else {
      callback();
    }
  },
  checkPostCode: function (rule, value, callback) { // 校验邮编
    if (!value) {
      callback();
      return;
    }
    var reg = /^\d{6}$/;
    value += '';
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮编号码'));
    } else {
      callback();
    }
  },
  // 固定电话校验
  checkTelphone: function (rule, value, callback) { // 校验邮编
    if (!value) {
      callback();
      return;
    }
    var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确的固定电话'));
    } else {
      callback();
    }
  },
  checkTelAndphone: function (rule, value, callback) {
    if (!value) {
      callback();
      return;
    }
    var reg = /^((1[3|4|5|7|8][0-9]{9})|(0\d{2,3}-\d{7,8}(-\d{1,6})?))$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确的固定电话或手机号'));
    } else {
      callback();
    }
  },
  // 验证身份证
  checkcerNoCode: function (rule, value, callback) {
    if (!value) {
      callback();
      return;
    }
    let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确的身份证件'));
    } else {
      callback();
    }
  },
  // 校验银行卡帐号
  checkBank: function (rule, value, callback) {
    var reg = /\d{15}|\d{19}/;
    if (value) {
      if (!reg.test(value)) {
        callback(new Error('请输入正确的银行账号'));
      } else {
        callback();
      }
    } else {
      callback();
    }
  },
  // 校验网址
  checkWebsite: function (rule, value, callback) { // 校验网址
    if (!value) {
      callback();
      return;
    }
    let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)?(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正确的网址'));
    } else {
      callback();
    }
  },
  // 校验总长度为13校验最多两位小数且非必填
  checkMax15TwoNum: function (rule, value, callback) {
    var reg = /^[0-9]{0,13}(([.]{1}\d{1,2}))?$/;
    if (!reg.test(value)) {
      callback(new Error('请输入数字且最多十三位整数，最多保留两位小数'));
    } else {
      callback();
    }
  },
  // 校验最多两位小数且非必填
  checkMaxTwoNum: function (rule, value, callback) {
    var reg = /^[0-9]*([.]{0,1}\d{1,2})?$/;
    if (!reg.test(value)) {
      callback(new Error('请输入最多两位小数数字'));
    } else {
      callback();
    }
  },
  // 校验最多两位小数且非必填-成本中心
  checkMaxTwoNumCost: function (rule, value, callback) {
    var reg = /^[0-9]*([.]{0,1}\d{1,2})?$/;
    if (value) {
      if (!reg.test(value)) {
        callback(new Error('请输入最多两位小数数字'));
      } else {
        callback();
      }
    } else {
      callback();
    }
  },
  // 校验整数
  checkIntegerNum: function (rule, value, callback) {
    var reg = /^[0-9]*$/;
    if (!reg.test(value)) {
      callback(new Error('请输入正整数'));
    } else {
      callback();
    }
  },
  // 绑定全局回车事件
  addEnterEvent: function (eventName) {
    document.onkeydown = function (e) {
      e = e || window.event;
      let key = e.keyCode || e.which || e.charCode;
      if (key == 13) {
        eventName();
      }
    };
  },
  // 移除全局回车事件
  removeEnterEvent: function () {
    document.onkeydown = null;
  }
  // 校验0-1之间两位小数
  // ^0\.(0[1-9]|[1-9]{1,2})$
// checkWebsite: function (rule, value, callback) { // 校验网址
//   if (!value) {
//     callback();
//     return;
//   }
//   let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)?(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/;
//   if (!reg.test(value)) {
//     callback(new Error('请输入正确的网址'));
//   } else {
//     callback();
//   }
// },
};
export default validator;
