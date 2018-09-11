<template>
  <!--到款率统计-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="2018年到款率月度统计表"></sino-title>
      <!--折线图-->
      <div class="pr">
        <div class="diagr_title pa" style="top:3px;right: 0;z-index: 100;">
          <sino-button class="fl moneyStatis" @click="downloadFun" type="icon-text"><i class="iconfont sino-huizhi"></i>生成到款率</sino-button>
          <sino-button class="fl moneyStatis" @click="exportExc" type="icon-text"><i class="iconfont sino-export"></i>导出报表</sino-button>
        </div>
        <div id="myChartline" :style="{width: '100%', height: '400px'}"></div>
      </div>
      <div class="moneyStatisDet">
        <span>总数：<b>{{moneyStatisData.sumCount}}</b></span>
        <span>未到数：<b>{{moneyStatisData.laterCount}}</b></span>
        <span>约定次月付费数：<b>{{moneyStatisData.assertCount}}</b></span>
        <span>计算到款率家属：<b>{{moneyStatisData.paymentRateCount}}</b></span>
        <span>已到款：<b>{{moneyStatisData.alreadyCount}}</b></span>
        <span>总到款率：<b>{{moneyStatisData.paymentRate}}%</b></span>
      </div>
      <div class="mt15 sino-tabs-nav tabs-this-month">
        <sino-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <sino-tab-pane label="按销售线索提供人" name="first" v-if="show">
            <div class=" sino-table-total sino-table-total-noborder">
              <sino-table :data="tableDataA" stripe border
                          class="toll-bill-table invoice-table-nomargin">
                <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
                <sino-table-column prop="manName" label="销售线索提供人"></sino-table-column>
                <sino-table-column prop="sumCount" label="总数"></sino-table-column>
                <sino-table-column prop="laterCount" label="未到数" ></sino-table-column>
                <sino-table-column prop="assertCount" label="约定次月付款" width="120" align="center"></sino-table-column>
                <sino-table-column prop="paymentRateCount" label="计算到款率家数"></sino-table-column>
                <sino-table-column prop="alreadyCount" label="已到款"></sino-table-column>
                <sino-table-column prop="paymentRate" label="到款率"></sino-table-column>
              </sino-table>
              <sino-page v-bind:page="pageA.pageNum" v-bind:page-size="pageA.pageSize" v-on:pagehandler="pageHandler($event,1)"
                         :pageArray="pageA.pageArray" v-on:choosePageFun="choooseNum($event,1)" v-bind:object="object"
                         :total="pageA.total"></sino-page>
            </div>
          </sino-tab-pane>
          <sino-tab-pane label="按商务合同负责人" name="second" v-if="show" >
            <div class=" sino-table-total sino-table-total-noborder">
              <sino-table :data="tableDataB" stripe max-height="416" border
                          class="toll-bill-table invoice-table-nomargin">
                <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
                <sino-table-column prop="manName" label="商务合同负责人"></sino-table-column>
                <sino-table-column prop="sumCount" label="总数"></sino-table-column>
                <sino-table-column prop="laterCount" label="未到数"></sino-table-column>
                <sino-table-column prop="assertCount" label="约定次月付款"></sino-table-column>
                <sino-table-column prop="paymentRateCount" label="计算到款率家数" width="120" align="center"></sino-table-column>
                <sino-table-column prop="alreadyCount" label="已到款"></sino-table-column>
                <sino-table-column prop="paymentRate" label="到款率"></sino-table-column>
              </sino-table>
              <sino-page v-bind:page="pageB.pageNum" v-bind:page-size="pageB.pageSize" v-on:pagehandler="pageHandler($event,2)"
                         :pageArray="pageB.pageArray" v-on:choosePageFun="choooseNum($event,2)" v-bind:object="object"
                         :total="pageB.total"></sino-page>
            </div>
          </sino-tab-pane>
          <sino-tab-pane label="按负责业务员" name="three" v-if="show" >
            <div class=" sino-table-total sino-table-total-noborder">
              <sino-table :data="tableDataC" stripe max-height="416" border
                          class="toll-bill-table invoice-table-nomargin">
                <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
                <sino-table-column prop="manName" label="负责业务员"></sino-table-column>
                <sino-table-column prop="sumCount" label="总数"></sino-table-column>
                <sino-table-column prop="laterCount" label="未到数"></sino-table-column>
                <sino-table-column prop="assertCount" label="约定次月付款"></sino-table-column>
                <sino-table-column prop="paymentRateCount" label="计算到款率家数"  width="120" align="center"></sino-table-column>
                <sino-table-column prop="alreadyCount" label="已到款"></sino-table-column>
                <sino-table-column prop="paymentRate" label="到款率"></sino-table-column>
              </sino-table>
              <sino-page v-bind:page="pageC.pageNum" v-bind:page-size="pageC.pageSize" v-on:pagehandler="pageHandler($event,3)"
                         :pageArray="pageC.pageArray" v-on:choosePageFun="choooseNum($event,3)" v-bind:object="object"
                         :total="pageC.total"></sino-page>
            </div>
          </sino-tab-pane>
        </sino-tabs>
      </div>
    </sino-con>
    <!--导出报表 --- 弹层-->
    <sino-dialog :visible.sync="expRepFlag" :top="'30%'" class="remilead-wid exp-rep" @close ="resetForm('expRepForm')">
      <sino-title slot="title" type="levelOne" title="导出报表" class="sino-dialog-title"></sino-title>
      <sino-form :model="expRepForm" :rules="expRepRules" ref="expRepForm">
        <sino-form-item prop="addr" label="统计方式：" class="sino-form-item-width">
          <sino-select :filterable="false"
                       :multiselect="true"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="getDictSelectBox"
                       :data="{code:'PAYMENT_STAT_GRUOP'}"
                       :chooseName.sync="expRepForm.dimenMethodsName"
                       :chooseId.sync="expRepForm.dimenMethods" :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item prop="statisticYm" label="统计月份：" class="sino-form-item-width">
          <sino-date-picker
            v-model="expRepForm.statisticYm"
            type="month"
            :editable="false"
            :readonly="false"
            :picker-options="pickerOptions"
            :clearable="false">
          </sino-date-picker>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitExcel">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';
  import echarts from 'echarts';
  import Vue from 'vue';

  export default {
    data () {
      return {
        pickerOptions: {
          disabledDate: (time) => {
            let querymonth = time.getMonth()  + 1;
            let queryYear = time.getFullYear();
            if (querymonth < 10) { querymonth = '0' + querymonth; };
            let yearMoth = queryYear + querymonth;
            return  this.disaDateArr.indexOf(Number(yearMoth)) == -1;
          }
        },
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        // c初始化echarts表
        moneyStatisData: {
          "sumCount": '', // 全年总数
          "laterCount": '', // 全年未到款数
          "assertCount": '', // 全年次月到款数
          "alreadyCount": '', // 全年已到款数
          "paymentRateCount": '', // 全年到款家数
          "paymentRate": "", // 全年到款率
          "paymentRateShowVOList": []
        },
        // stashData: [],
        stashEchartsData: [],
        statisticYm: '',
        // 导出报表
        expRepFlag: false,
        expRepForm: {
          dimenMethods: [],
          dimenMethodsName: [],
          statisticYm: ''
        },
        disaDateArr: [],
        expRepRules: {},
        activeName2: 'first',
        show: true,
        tableDataA: [],
        tableDataB: [],
        tableDataC: [],
        pageA: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        pageB: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        pageC: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        }
      };
    },
    mounted () {
      // this.echartsline();
      this.initEchatrs();
    },
    methods: {
      initEchatrs () {
        api.post(this.apiPath.hrsc.getAllPaymentRate, {}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.moneyStatisData = res.data;
            // let data = [];
            if (res.data.paymentRateShowVOList) {
              this.stashEchartsData = res.data.paymentRateShowVOList.map(item => {
                // data.push(item.paymentRate);
                // this.stashData.push(item.statisticYm);
                // this.stashEchartsData.push(item.paymentRate);
                return {
                  value: item.paymentRate,
                  date: item.statisticYm
                };
              });
            };
            this.stashEchartsData.forEach(item => this.disaDateArr.push(item.date));
            this.echartsline(this.stashEchartsData);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /**
       * 生成到款率
       */
      downloadFun () {
        api.post(this.apiPath.hrsc.savePaymentRate, {}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.initEchatrs();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 导出报表
      exportExc () {
        this.expRepFlag = true;
      },
      // 提交Excel
      submitExcel () {
        let param = JSON.parse(JSON.stringify(this.expRepForm));
        param.statisticYm = Vue.filter('date')(param.statisticYm, 'yyyyMM');
        api.post(this.apiPath.hrsc.downloadPaymentRate, param).then(res => {
          if (res.code === 'CPYY-00001') {
            this.expRepFlag = false;
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 折线图
      echartsline (arr) { // 折线图
        // arr.forEach(item => {
        //   item.value = item.value.replace('%', '');
        // });
        let _this = this;
        let myChartline = echarts.init(document.getElementById('myChartline'));
        // console.log(echarts, 'echarts');
        myChartline.setOption({
          title: {
            left: 'center',
            top: 10,
            text: '公司总到款率'
          },
          legend: {
            itemGap: [50]
          },
          grid: { // 定位图表
            left: 60,
            bottom: 40,
            right: 70,
            top: 50
          },
          xAxis: { // X轴
            type: 'category',
            boundaryGap: true,
            // data: years,
            data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
            // axisLine: {show: false}, // x轴的标尺
            axisTick: {show: false}, // x轴的刻度
            max: 'dataMax',
            name: '统计月份',
            // boundaryGap: false,
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [7, 15],
              symbolOffset: [0, 0]
            } // y轴的标尺
          },
          tooltip: {
            trigger: 'item',
            point: [-20, -20],
            formatter: function (params) {
              // return '付费金额 ' + params.data + '<br>付费人数: ' + dataSumPreSum[params.dataIndex];
              return '到款率 :' + params.value + '%';
            }
          },
          yAxis: {
            type: 'value',
            name: '到款率(%)',
            data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            // boundaryGap: false,
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              symbolSize: [7, 15],
              symbolOffset: [0, 0]
            }, // y轴的标尺
            axisTick: {show: false} // y轴的刻度
          },
          series: [
            {
              // [1212, 1223, 134, 234, 453, 6456, 6756, 868, 345, 56735, 2322, 2345, 324234]
              // data: arr,
              data: arr,
              type: 'line',
              smooth: true, // 折线的样式
              itemStyle: {normal: { // 折线颜色
                color: '#6096d3',
                lineStyle: {
                  color: '#6096d3'
                }}
              },
              areaStyle: {normal: { // 背景色
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: 'rgba(96,149,211,0.6)'},
                    {offset: 0.5, color: 'rgba(96,149,211,0.5)'},
                    {offset: 1, color: 'rgba(96,149,211,0)'}
                  ]
                )}}
            }
          ]
        });
        myChartline.on('click', function (param) {
          _this.statisticYm = param.data.date;
          _this.viewmodel(1, 10, 1);
          _this.viewmodel(1, 10, 2);
          _this.viewmodel(1, 10, 3);
        });
      },
      viewmodel (pageNum, pageSize, type) {
        // this.dispQueryEchatrs.dimenMethod = type;
        let data = {
          data: {
            dimenMethod: type,
            statisticYm: this.statisticYm
          },
          pageNum: pageNum || 1,
          pageSize: pageSize || 10
        };
        api.post(this.apiPath.hrsc.getPaymentRate, data).then(res => {
          res.data.list.forEach(item => {
            item.paymentRate = item.paymentRate + '%';
          });
          if (type == 1) {
            this.tableDataA = res.data.list;
            this.pageA.total = res.data.total;
          } else if (type == 2) {
            this.tableDataB = res.data.list;
            this.pageB.total = res.data.total;
          } else if (type == 3) {
            this.tableDataC = res.data.list;
            this.pageC.total = res.data.total;
          };
          // this.dispTableData = res.data.list;
          // this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // tabs选项卡点击
      handleClick (tab, event) {
        this.activeName2 = tab.name;
      },
      pageHandler: function (pageNum, type) {
        // this.pageNum = pageNum;
        // this.viewAll(this.pageNum, this.pageSize);
        let pageSize;
        if (type == 1) {
          this.pageA.pageNum = pageNum;
          pageSize = this.pageA.pageSize;
        } else if (type == 2) {
          this.pageB.pageNum = pageNum;
          pageSize = this.pageB.pageSize;
        } else if (type == 3) {
          this.pageC.pageNum = pageNum;
          pageSize = this.pageC.pageSize;
        };
        this.viewmodel(pageNum, pageSize, type);
      },
      choooseNum (pageSize, type) {
        console.log(pageSize, type);
        if (type == 1) {
          this.pageA.pageNum = 1;
          this.pageA.pageSize = pageSize;
        } else if (type == 2) {
          this.pageB.pageNum = 1;
          this.pageB.pageSize = pageSize;
        } else if (type == 3) {
          this.pageC.pageNum = 1;
          this.pageC.pageSize = pageSize;
        };
        this.viewmodel(1, pageSize, type);
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
