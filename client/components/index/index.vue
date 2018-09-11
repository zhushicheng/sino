<template>
  <div class="index">
    <div class="index-remind">
      <sino-title type="levelOne" title="提醒及快捷入口"></sino-title>
      <ul class="index-remind-ul">
        <li class="fl">
          <img src="../../assets/img/index-one.png" alt="" class="index-app-img">
          <div class="index-app">
            <div class="index-app-left">
              <i></i>
              <span>待办审批</span>
            </div>
            <div class="index-app-right">
              <h3>全部待办审批：<span>163</span>件</h3>
              <ul>
                <li>今日新增待办：<span>23</span>件</li>
                <li>本周新增待办：<span>145</span>件</li>
              </ul>
            </div>
          </div>
        </li>
        <li class="fr">
          <img src="../../assets/img/index-two.png" alt="" class="index-app-img">
          <div class="index-app">
            <div class="index-app-left">
              <i class="i-r"></i>
              <span>消息提醒</span>
            </div>
            <div class="index-app-right">
              <h3>全部新消息：<span>268</span>条</h3>
              <ul>
                <li>通知类提醒：<span>123</span>条</li>
                <li>消息类提醒：<span>145</span>条</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <ul class="index-quick-ul">
        <li>
          <i class="index-quick-icon"></i>
          <span>派撤</span>
          <i class="iconfont sino-right-arrow"></i>
        </li>
        <li>
          <i class="index-quick-icon i-1"></i>
          <span>申报</span>
          <i class="iconfont sino-right-arrow"></i>
        </li>
        <li>
          <i class="index-quick-icon i-2"></i>
          <span>报销</span>
          <i class="iconfont sino-right-arrow"></i>
        </li>
        <li class="fr">
          <i class="index-quick-icon i-3"></i>
          <span>收付费</span>
          <i class="iconfont sino-right-arrow"></i>
        </li>
      </ul>
    </div>
    <div class="index-remind">
      <sino-title type="levelOne" title="业务情况总览">
        <sino-tabs class="fr" v-model="activeTab" type="card" @tab-click="handleClick">
          <sino-tab-pane label="接单业务数据" name="first" class="index-tab">
            <div class="main" id="myChart"></div>
          </sino-tab-pane>
          <sino-tab-pane label="签约业务数据" name="second">
            <div class="main index-tab" id="otherChart"></div>
          </sino-tab-pane>
        </sino-tabs>
      </sino-title>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/map/js/china');

  // 地图位置
  var geoCoordMap = {
    '上海': [121.4648, 31.2891],
    '东莞': [113.8953, 22.901],
    '东营': [118.7073, 37.5513],
    '中山': [113.4229, 22.478],
    '临汾': [111.4783, 36.1615],
    '临沂': [118.3118, 35.2936],
    '丹东': [124.541, 40.4242],
    '丽水': [119.5642, 28.1854],
    '乌鲁木齐': [87.9236, 43.5883],
    '佛山': [112.8955, 23.1097],
    '保定': [115.0488, 39.0948],
    '兰州': [103.5901, 36.3043],
    '包头': [110.3467, 41.4899],
    '北京': [116.4551, 40.2539],
    '北海': [109.314, 21.6211],
    '南京': [118.8062, 31.9208],
    '南宁': [108.479, 23.1152],
    '南昌': [116.0046, 28.6633],
    '南通': [121.1023, 32.1625],
    '厦门': [118.1689, 24.6478],
    '台州': [121.1353, 28.6688],
    '合肥': [117.29, 32.0581],
    '呼和浩特': [111.4124, 40.4901],
    '咸阳': [108.4131, 34.8706],
    '哈尔滨': [127.9688, 45.368],
    '唐山': [118.4766, 39.6826],
    '嘉兴': [120.9155, 30.6354],
    '大同': [113.7854, 39.8035],
    '大连': [122.2229, 39.4409],
    '天津': [117.4219, 39.4189],
    '太原': [112.3352, 37.9413],
    '威海': [121.9482, 37.1393],
    '宁波': [121.5967, 29.6466],
    '宝鸡': [107.1826, 34.3433],
    '宿迁': [118.5535, 33.7775],
    '常州': [119.4543, 31.5582],
    '广州': [113.5107, 23.2196],
    '廊坊': [116.521, 39.0509],
    '延安': [109.1052, 36.4252],
    '张家口': [115.1477, 40.8527],
    '徐州': [117.5208, 34.3268],
    '德州': [116.6858, 37.2107],
    '惠州': [114.6204, 23.1647],
    '成都': [103.9526, 30.7617],
    '扬州': [119.4653, 32.8162],
    '承德': [117.5757, 41.4075],
    '拉萨': [91.1865, 30.1465],
    '无锡': [120.3442, 31.5527],
    '日照': [119.2786, 35.5023],
    '昆明': [102.9199, 25.4663],
    '杭州': [119.5313, 29.8773],
    '枣庄': [117.323, 34.8926],
    '柳州': [109.3799, 24.9774],
    '株洲': [113.5327, 27.0319],
    '武汉': [114.3896, 30.6628],
    '汕头': [117.1692, 23.3405],
    '江门': [112.6318, 22.1484],
    '沈阳': [123.1238, 42.1216],
    '沧州': [116.8286, 38.2104],
    '河源': [114.917, 23.9722],
    '泉州': [118.3228, 25.1147],
    '泰安': [117.0264, 36.0516],
    '泰州': [120.0586, 32.5525],
    '济南': [117.1582, 36.8701],
    '济宁': [116.8286, 35.3375],
    '海口': [110.3893, 19.8516],
    '淄博': [118.0371, 36.6064],
    '淮安': [118.927, 33.4039],
    '深圳': [114.5435, 22.5439],
    '清远': [112.9175, 24.3292],
    '温州': [120.498, 27.8119],
    '渭南': [109.7864, 35.0299],
    '湖州': [119.8608, 30.7782],
    '湘潭': [112.5439, 27.7075],
    '滨州': [117.8174, 37.4963],
    '潍坊': [119.0918, 36.524],
    '烟台': [120.7397, 37.5128],
    '玉溪': [101.9312, 23.8898],
    '珠海': [113.7305, 22.1155],
    '盐城': [120.2234, 33.5577],
    '盘锦': [121.9482, 41.0449],
    '石家庄': [114.4995, 38.1006],
    '福州': [119.4543, 25.9222],
    '秦皇岛': [119.2126, 40.0232],
    '绍兴': [120.564, 29.7565],
    '聊城': [115.9167, 36.4032],
    '肇庆': [112.1265, 23.5822],
    '舟山': [122.2559, 30.2234],
    '苏州': [120.6519, 31.3989],
    '莱芜': [117.6526, 36.2714],
    '菏泽': [115.6201, 35.2057],
    '营口': [122.4316, 40.4297],
    '葫芦岛': [120.1575, 40.578],
    '衡水': [115.8838, 37.7161],
    '衢州': [118.6853, 28.8666],
    '西宁': [101.4038, 36.8207],
    '西安': [109.1162, 34.2004],
    '贵阳': [106.6992, 26.7682],
    '连云港': [119.1248, 34.552],
    '邢台': [114.8071, 37.2821],
    '邯郸': [114.4775, 36.535],
    '郑州': [113.4668, 34.6234],
    '鄂尔多斯': [108.9734, 39.2487],
    '重庆': [107.7539, 30.1904],
    '金华': [120.0037, 29.1028],
    '铜川': [109.0393, 35.1947],
    '银川': [106.3586, 38.1775],
    '镇江': [119.4763, 31.9702],
    '长春': [125.8154, 44.2584],
    '长沙': [113.0823, 28.2568],
    '长治': [112.8625, 36.4746],
    '阳泉': [113.4778, 38.0951],
    '青岛': [120.4651, 36.3373],
    '韶关': [113.7964, 24.7028]
  };

  var BJData = [
    [{name: '贵阳'}, {name: '上海', value: 95}],
    [{name: '贵阳'}, {name: '广州', value: 90}],
    [{name: '贵阳'}, {name: '大连', value: 80}],
    [{name: '贵阳'}, {name: '南宁', value: 70}],
    [{name: '贵阳'}, {name: '南昌', value: 60}],
    [{name: '贵阳'}, {name: '拉萨', value: 50}],
    [{name: '贵阳'}, {name: '长春', value: 40}],
    [{name: '贵阳'}, {name: '包头', value: 30}],
    [{name: '贵阳'}, {name: '重庆', value: 20}],
    [{name: '贵阳'}, {name: '常州', value: 10}]
  ];

  var BJTopData = [
    [{name: '贵阳'}, {name: '上海', value: 95}],
    [{name: '贵阳'}, {name: '广州', value: 90}],
    [{name: '贵阳'}, {name: '大连', value: 80}]
  ];

  var SHData = [
    [{name: '上海'}, {name: '贵阳', value: 95}],
    [{name: '北京'}, {name: '贵阳', value: 90}],
    [{name: '大连'}, {name: '贵阳', value: 80}],
    [{name: '重庆'}, {name: '贵阳', value: 70}],
    [{name: '南昌'}, {name: '贵阳', value: 60}],
    [{name: '包头'}, {name: '贵阳', value: 50}],
    [{name: '拉萨'}, {name: '贵阳', value: 40}],
    [{name: '南宁'}, {name: '贵阳', value: 30}],
    [{name: '广州'}, {name: '贵阳', value: 20}],
    [{name: '常州'}, {name: '贵阳', value: 10}]
  ];

  var SHTopData = [
    [{name: '上海'}, {name: '贵阳', value: 95}],
    [{name: '北京'}, {name: '贵阳', value: 90}],
    [{name: '大连'}, {name: '贵阳', value: 80}]
  ];

  var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var fromCoord = geoCoordMap[dataItem[0].name];
      var toCoord = geoCoordMap[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord]
        });
      }
    }
    return res;
  };

  var color = ['#399ff2', '#ffc333'];
  var series = [];
  [['业务', SHData], ['前三名', SHTopData]].forEach(function (item, i) {
    series.push(
      {
        name: item[0] + '地区',
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: '#fff',
          symbolSize: 5
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 0,
            curveness: 0.2
          }
        },
        data: convertData(item[1])
      },
      {
        name: item[0] + '地区',
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
//          symbol: planePath,
          symbolSize: 5,
          shadowColor: '#fff',
          color: '#fff'
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 3,
            opacity: 1,
            curveness: 0.2
          }
        },
        data: convertData(item[1])
      },
      {
        name: item[0] + '地区',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            // position: 'interval',
            formatter: '20'
          }
        },
        symbolSize: function (val) {
          return val[2] / 4;
        },
        itemStyle: {
          normal: {
            color: color[i]
          }
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
          };
        })
      });
  });
  var signSeries = [];
  [['业务', BJData], ['前三名', BJTopData]].forEach(function (item, i) {
    signSeries.push(
      {
        name: item[0] + '地区',
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: '#fff',
          symbolSize: 5
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 0,
            curveness: 0.2
          }
        },
        data: convertData(item[1])
      },
      {
        name: item[0] + '地区',
        type: 'lines',
        zlevel: 2,
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
//          symbol: planePath,
          symbolSize: 5,
          shadowColor: '#fff',
          color: '#fff'
        },
        lineStyle: {
          normal: {
            color: color[i],
            width: 3,
            opacity: 1,
            curveness: 0.2
          }
        },
        data: convertData(item[1])
      },
      {
        name: item[0] + '地区',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            // position: 'interval',
            formatter: '30'
          }
        },
        symbolSize: function (val) {
          return val[2] / 4;
        },
        itemStyle: {
          normal: {
            color: color[i]
          }
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[1].name,
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
          };
        })
      });
  });

  export default {
    data () {
      return {
        activeTab: 'first',
        chart: null,
        otherChart: null
      };
    },
    mounted () {
      // 默认显示地图
      this.drawPie('myChart');
      this.drawPieOther('otherChart');
    },
    methods: {
      handleClick (tab, event) {},
      // 接单业务数据-地图显示
      drawPie (id) {
        this.chart = echarts.init(document.getElementById(id));
        this.chart.setOption(
          {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              top: 'bottom',
              left: 'left',
              data: ['业务地区', '前三名地区'],
              textStyle: {
                color: '#333',
                fontSize: '14px'
              },
              selectedMode: 'multiple'
            },
            geo: {
              map: 'china',
              label: {
                emphasis: {
                  show: false
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#b9def8',
                  borderColor: 'rgba(30,144,255,0.5)'
                },
                emphasis: {
                  areaColor: '#b9def8',
                  borderColor: 'rgba(30,144,255,0.5)',
                  borderWidth: 2
                }
              }
            },
            series: series
          }
        );
      },
      // 签约业务数据-地图显示
      drawPieOther (id) {
        this.otherChart = echarts.init(document.getElementById(id));
        this.otherChart.setOption(
          {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              top: 'bottom',
              left: 'left',
              data: ['业务地区', '前三名地区'],
              textStyle: {
                color: '#333',
                fontSize: '14px'
              },
              selectedMode: 'multiple'
            },
            geo: {
              map: 'china',
              label: {
                emphasis: {
                  show: false
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#b9def8',
                  borderColor: '#89bde0'
                },
                emphasis: {
                  areaColor: '#b9def8',
                  borderWidth: 2
                }
              }
            },
            series: signSeries
          }
        );
      }
    }
  };
</script>

<style lang="scss" scoped>
  .is-title {
    text-transform: capitalize;
  }
  .index-tab{width: 740px !important;margin: 0 auto !important;}
</style>
