let dateformat = function (value) {
  return value < 10 ? '0' + value : value;
};
let filters = {
  date: function (value, format) {
    if (!value) { return value; }
    let d = new Date(value);
    let year = d.getFullYear();
    let month = dateformat(d.getMonth() + 1);
    let day = dateformat(d.getDate());
    let hour = dateformat(d.getHours());
    let minutes = dateformat(d.getMinutes());
    let seconds = dateformat(d.getSeconds());
    format = format || 'yyyy-MM-dd hh:mm:ss';
    let ary = [{'yyyy': year}, {'MM': month}, {'dd': day}, {'hh': hour}, {'mm': minutes}, {'ss': seconds}];
    ary.forEach(function (item) {
      let key = Object.keys(item)[0];
      let reg = new RegExp(key);
      format = format.replace(reg, item[key]);
    });
    return format;
  },
  digitUppercase: function (n) {
    let fraction = ['角', '分'];
    let digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ];
    let unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ];
    let head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
      let p = '';
      for (let j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
  },
  toThousands: function (num) {
    var flag = true;
    var aaa = num.toString();
    var _num;
    var ccc;
    if (aaa.indexOf('-') === -1) {
      ccc = '';
    } else {
      ccc = '-';
    }
    if (aaa.indexOf('.') === -1) {
      _num = (Number(aaa) || 0).toString();
    } else {
      _num = (Number(aaa.split('.')[0]) || 0).toString();
      var bbb = aaa.split('.')[1];
      if (bbb.length === 0) {
        bbb = '00';
      }
      if (bbb.length === 1) {
        bbb = bbb + '0';
      }
      flag = false;
    }
    var  temp = _num.length % 3;
    switch (temp) {
      case 1:
        _num = '00' + _num;
        break;
      case 2:
        _num = '0' + _num;
        break;
    }
    if (flag) {
      if ((_num.match(/\d{3}/g).join(',').replace(/^0+/, '') + '.00').length === 3) {
        return ccc +  '0' + _num.match(/\d{3}/g).join(',').replace(/^0+/, '') + '.00';
      } else {
        return ccc + _num.match(/\d{3}/g).join(',').replace(/^0+/, '') + '.00';
      }
    } else {
      if ((_num.match(/\d{3}/g).join(',').replace(/^0+/, '') + '.' + bbb).length === 3) {
        return ccc +  '0' + _num.match(/\d{3}/g).join(',').replace(/^0+/, '') + '.' + bbb;
      } else {
        return ccc + _num.match(/\d{3}/g).join(',').replace(/^0+/, '') + '.' + bbb;
      }
    }
  },
  // 金额过滤器
  moneyFormat (number, decimals, decPoint, thousandsSep) {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * decPoint：小数点符号
    * thousandsSep：千分位符号
    * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number;
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
    let s = '';
    let toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    let re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }
};
export default filters;
