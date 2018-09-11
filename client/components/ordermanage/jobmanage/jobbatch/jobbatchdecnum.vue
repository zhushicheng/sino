<template>
  <!--在职管理批量维护-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <div class="prod-tab sino-tabs sino-tabs-card tab-group">
        <div class="sino-tabs-header">
          <div class="sino-tabs-nav">
            <div class="sino-tabs-item" @click="prodScheFun">单个维护</div>
            <div class="sino-tabs-item is-active">批量维护-申报基数</div>
          </div>
        </div>
      </div>
      <sino-con class="empass-sino-icon">
        <sino-title type="levelTwo" title="导入信息" class="overFl"></sino-title>
        <div class="sino-table-icon-left empass-sino-icon">
          <sino-button type="icon-text" @click="downloadFun"><i class="iconfont sino-download-copy"></i>下载模板</sino-button>
          <sino-button type="icon-text" @click="importFun"><i class="iconfont sino-import"></i>导入</sino-button>
          <sino-button type="icon-text" @click="hisFun" class="fr"><i class="iconfont sino-shijian4"></i>历史导入查询</sino-button>
        </div>
        <div class="empass-middle-box clear">
          <div class="empass-middle-left fl">
            <div class="left-top">
              <p>
                <span class="import-title">导入文件名称：</span><span v-text="empassform.fileName"></span>
                <input type="hidden" v-model="empassform.batchNo">
              </p>
              <p class="import">
                <span class="spanSp">
                  <span class="import-title">导入操作人：</span>
                  <span class="import-person" v-text="empassform.creName"></span>
                </span>
                <span class="spanSp">
                  <span class="import-title">导入时间：</span>
                  <span v-text="empassform.creTime"></span>
                </span>

              </p>
            </div>
            <ul class="left-bottom">
              <li>
                <div>
                  <i class="total-img"></i>
                </div>
                <div>
                  <p>导入总数</p>
                  <p><span class="tip_num" v-text="empassform.totalNum || 0"></span><span></span></p>
                </div>
              </li>
              <li>
                <div>
                  <i class="success-img"></i>
                </div>
                <div>
                  <p>成功数据</p>
                  <p><span class="tip_num" v-text="empassform.succNum || 0"></span><span></span></p>
                </div>
              </li>
              <li>
                <div>
                  <i class="error-img"></i>
                </div>
                <div>
                  <p>失败数据</p>
                  <p><span class="tip_num" v-text="empassform.failNum || 0"></span><span style="cursor: pointer" @click="batchFailDownload(empassform.batchNo)" v-if="empassform.failNum > 0">下载</span></p>
                </div>
              </li>
            </ul>
          </div>
          <div class="empass-middle-right fl" id="empass-chart" style="height:209px;width:30%"></div>
        </div>
        <sino-tabs v-model="activeName" type="card" @tab-click="handleClick" class="sino-tab-decl sino-tab-decl-empass">
          <sino-tab-pane label="成功数据" name="success" class="mt15">
            <sino-table :data="tableData" max-height="416" stripe border>
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
              <sino-table-column prop="certNo" label="身份证号" min-width="180"></sino-table-column>
              <sino-table-column prop="uniqNo" label="雇员唯一号" min-width="120"></sino-table-column>
              <sino-table-column prop="sinsDeclWage" label="新社保申报基数" type="money" width="150"></sino-table-column>
              <sino-table-column prop="sinsBegDate" label="社保生效日期" min-width="170"></sino-table-column>
              <sino-table-column prop="accuDeclWage" label="新公积金申报基数" type="money" width="150"></sino-table-column>
              <sino-table-column prop="accuBegDate" label="公积金生效日期" min-width="200"></sino-table-column>
              <sino-table-column prop="areaName" label="修改说明"></sino-table-column>
              <sino-table-column prop="custName" label="客户名称" min-width="120"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
          </sino-tab-pane>
          <sino-tab-pane label="失败数据" name="error" class="mt15">
            <sino-table :data="tableData"  max-height="416" stripe border>
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="failReason" label="失败原因" min-width="120"></sino-table-column>
              <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
              <sino-table-column prop="certNo" label="身份证号" min-width="180"></sino-table-column>
              <sino-table-column prop="uniqNo" label="雇员唯一号" min-width="150"></sino-table-column>
              <sino-table-column prop="sinsDeclWage" label="新社保申报基数" type="money" width="150"></sino-table-column>
              <sino-table-column prop="sinsBegDate" label="社保生效日期" min-width="170"></sino-table-column>
              <sino-table-column prop="accuDeclWage" label="新公积金申报基数" type="money" width="150"></sino-table-column>
              <sino-table-column prop="accuBegDate" label="公积金生效日期" min-width="200"></sino-table-column>
              <sino-table-column prop="areaName" label="修改说明"></sino-table-column>
              <sino-table-column prop="custName" label="客户名称" min-width="120"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
          </sino-tab-pane>
        </sino-tabs>
      </sino-con>
      <!--下载模板-->
      <sino-dialog :visible.sync="downloadFlag" size="small" class="leads-follow dialog-item" v-on:close="resetFun('downloadForm')">
        <sino-title slot="title" type="levelOne" title="下载模板" class="sino-dialog-title"></sino-title>
        <sino-form :model="downloadForm" ref="downloadForm" :rules="downloadRules" class="follow-select">
          <div class="follow-content">
            <sino-form-item label="签约供应商：" prop="signSuppName">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :token="selectToken"
                           :url="apiPath.hrsc.findByOrderSignSupp"
                           :chooseName.sync="downloadForm.signSuppName"
                           :chooseId.sync="downloadForm.signSuppId"
                           :clear="true"
                           @change="applyChange"
              ></sino-select>
            </sino-form-item>
            <sino-form-item label="客户名称：" prop="custNames">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="true"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="custUrl"
                           :linkage="true"
                           :data="custData"
                           :token="selectToken"
                           :chooseName.sync="downloadForm.custNames"
                           :chooseId.sync="downloadForm.custIds"
                           :clear="true"
                           @change="custChange"
              >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="产品服务模板：" prop="tempNames">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="true"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :linkage="true"
                           :token="selectToken"
                           :url="serviceUrl"
                           :data="serveTempData"
                           :chooseName.sync="downloadForm.tempNames"
                           :chooseId.sync="downloadForm.tempIds"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
          </div>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="downSubmitFun">确 定</sino-button>
      </span>
      </sino-dialog>
      <!--批量导入-->
      <sino-dialog :visible.sync="batchLeadFlag" :top="'30%'" class="batch-error decnum-download-dialog" v-on:close="resetFun('batchLeadForm')">
        <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
        <sino-form :model="batchLeadForm" :rules="batchLeadRules" ref="batchLeadForm">
          <sino-form-item prop="fileName" label="导入文件：" class="sino-form-item-width is-required">
            <sino-upload
              class="upload-demo"
              ref="batchUpload"
              :action="uploadUrl"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="getFileName"
              :on-success="fileSuccess"
              :headers="headerToken"
              :on-error="fileError"
            >
              <div slot="trigger">
                <input class="uploadFileBox" type="text" v-model="batchLeadForm.fileName" readonly="true"/>
                <span class="chooseFileButton">上传</span>
              </div>
            </sino-upload>
          </sino-form-item>
          <sino-form-item label="参保险种：" prop="sinsProPayList" class="sino-form-item-width">
            <sino-checkbox-group v-model="batchLeadForm.sinsProPayList" class="mt5">
              <sino-checkbox class="mr10" :label="list.proPayId" v-for="(list, index) in proPayTypeArr" :key="index">{{list.proPayName}}</sino-checkbox>
            </sino-checkbox-group>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitUpload">确 定</sino-button>
      </span>
      </sino-dialog>
      <!--批量导入查询-->
      <sino-dialog :visible.sync="batchLeadSeeFlag" size="small" class="remi-dialog" v-on:close="resetFun('batchLeadSeeClose')">
        <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li>
              <input type="hidden" v-model="batchLeadSeeList.batchNo"/>
              <h6>文件名称</h6><span v-text="batchLeadSeeList.fileName"></span>
            </li>
            <li>
              <h6>总数量</h6><span>{{batchLeadSeeList.totalNum}}<a v-if="false" href="javascript:void(0)" @click="batchAllDownload(batchLeadSeeList.batchNo)">下载</a></span>
            </li>
            <li>
              <h6>成功数量</h6><span>{{batchLeadSeeList.succNum}}<a v-if="false" href="javascript:void(0)" @click="batchSuccDownload(batchLeadSeeList.batchNo)">下载</a></span>
            </li>
            <li>
              <h6>失败数量</h6><span>{{batchLeadSeeList.failNum}}<a v-if="batchLeadSeeList.failNum !== 0" href="javascript:void(0)" @click="batchFailDownload(batchLeadSeeList.batchNo)">下载</a></span>
            </li>
            <li>
              <h6>导入操作人</h6><span v-text="batchLeadSeeList.creName"></span>
            </li>
            <li>
              <h6>导入时间</h6><span v-text="batchLeadSeeList.creTime"></span>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="batchInport">确 定</sino-button>
      </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  import echarts from 'echarts';

  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxBySuppId,
        coninfoSelectBox: this.apiPath.hrsc.findByCustIdSelectBox,
        serviceUrl: this.apiPath.hrsc.findServeTempSelectBoxbyCustId,
        uploadUrl: this.apiPath.hrsc.uploadFilePublic,
        headerToken: {"Token": Cookies.get('Token')},
        selectToken: Cookies.get('Token'),
        custData: {creSuppId: ''},
        proPayTypeArr: [],
        sinsProPayList: [],
        routerView: false,
        batchEmpassData: null,
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        losePage: {
          total: null,
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        batchForm: {
          custId: '',
          custName: '',
          begDate: '',
          endDate: ''
        },
        empassform: {
          fileName: '',
          creName: '',
          creTime: '',
          totalNum: '',
          succNum: '',
          failNum: '',
          batchNo: ''
        },
        batchRules: {},
        batchLeadFlag: false,
        batchLeadSeeFlag: false,
        batchLeadForm: {
          uploadListFlag: false,
          sinsProPayList: [],
          fileName: '',
          fileUniqueNo: ''
        },
        batchLeadRules: {
          fileName: [
            {required: true, message: '请选择数据文件', trigger: 'change'}
          ]
        },
        batchLeadSeeList: {
          fileName: '',
          batchNo: '',
          totalNum: '',
          succNum: '',
          failNum: '',
          creName: '',
          creTime: ''
        },
        downloadFlag: false,
        downloadForm: {
          signSuppName: '',
          signSuppId: '',
          custNames: [],
          custIds: [],
          tempNames: [],
          tempIds: []
        },
        conData: {
          id: ''
        },
        serveTempData: {
          list: []
        },
        downloadRules: {
        },
        tableData: null,
        activeName: 'success'
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/jobBatchDecNum") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
      api.post(this.apiPath.hrsc.findProPaySins, {}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.proPayTypeArr = res.data;
          this.batchLeadForm.sinsProPayList = this.proPayTypeArr.map(function (item) {
            return item.proPayId;
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      this.drawPie();
    },
    methods: {
      applyChange () {
        this.custData.creSuppId = this.downloadForm.signSuppId;
      },
      ruoteJudge () {
        if (this.$route.path !== "/jobBatchDecNum") {
          this.routerView = true;
        }
      },
      handleClick (tab) {
        this.activeName = tab.name;
        this.pageNum = 1;
        this.pageSize = 10;
        this.seeViewDataFun(this.pageNum, this.pageSize);
      },
      drawPie (total, suc, fail) {
        if (suc == null && fail == null) {
          this.chart = echarts.init(document.getElementById('empass-chart'));
          this.chart.setOption({
            title: {
              text: '导入总数',
              subtext: '0',
              x: 'center',
              y: 'center',
              itemGap: 14,
              textStyle: {
                color: 'rgba(0,0,0,0.6)',
                fontFamily: '微软雅黑',
                fontSize: 14
              },
              subtextStyle: {
                color: '#f7b828',
                fontSize: 14,
                fontWeight: 'bolder'

              }
            },
            color: ['#E4e4e4'],
            legend: { /* 描述的title */
              orient: 'vertical',
              x: 'right',
              y: 'bottom',
              data: ['失败数据', '成功数据']
            },
            calculable: false,
            series: [
              {
                name: '导入数据',
                type: 'pie',
                radius: ['50%', '65%'],
                avoidLabelOverlap: true,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: { /* 鼠标悬浮的样式 */
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                data: [{ value: 400 }]
              }
            ]
          });
        } else {
          this.chart = echarts.init(document.getElementById('empass-chart'));
          let radius1 = ['50%', '80%'];
          // let radius2 = ['50%','90%'];
          this.chart.setOption({
            title: {
              text: '导入总数',
              subtext: total || '0',
              x: 'center',
              y: 'center',
              itemGap: 14,
              textStyle: {
                color: 'rgba(0,0,0,0.6)',
                fontFamily: '微软雅黑',
                fontSize: 14
              },
              subtextStyle: {
                color: '#f7b828',
                fontSize: 14,
                fontWeight: 'bolder'

              }
            },
            color: ['#138cdd', '#15d6ba'],
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
            legend: { /* 描述的title */
              orient: 'vertical',
              x: 'right',
              y: 'bottom',
              data: ['失败数据', '成功数据']
            },
            calculable: false,
            series: [
              {
                name: '导入数据',
                type: 'pie',
                radius: radius1,
                selectedOffset: 3,
                avoidLabelOverlap: true,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: { /* 鼠标悬浮的样式 */
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                data: [
                  {value: fail || 0, name: '失败数据'},
                  {value: suc || 0, name: '成功数据', selected: true}
                ]
              }
            ]
          });
        }
      },
      custChange () {
        this.conData.id = this.downloadForm.custId;
        this.serveTempData.list = this.downloadForm.custIds;
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        this.$router.push({path: '/jobSingle'});
      },
      importFun () {
        this.batchLeadFlag = true;
      },
      seeViewDataFun (pageNum, pageSize) {
        if (this.empassform.totalNum === '' || this.empassform.totalNum === 0) {
          this.successTableData = null;
          return;
        }
        let _data = {
          data: {
            batchNo: this.empassform.batchNo,
            impResult: this.activeName === 'success' ? 1 : 2
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findOrderUpDeclWageImpDelInfo, _data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getFileName (file) {
        this.batchLeadForm.fileName = file.name;
      },
      fileSuccess (res) {
        api.post(this.apiPath.hrsc.impOrderUpDeclWageExcel, {sinsProPayList: this.batchLeadForm.sinsProPayList, fileUniqueNo: res.data}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.batchLeadSeeFlag = true;
            this.batchLeadFlag = false;
            this.batchLeadSeeList = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      fileError () {
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            return;
          }
        });
      },
      delConFile () {
        this.$refs.batchUpload.clearFiles();
        this.batchLeadForm.fileName = '';
        this.batchLeadForm.uploadListFlag = false;
        this.batchLeadForm.uploadList = [];
      },
      // 导入确认
      submitUpload () {
        this.$refs.batchLeadForm.validate((valid) => {
          if (valid) {
            this.$refs.batchUpload.submit();
          }
        });
      },
      batchAllDownload (batchNo) {
        api.post(this.apiPath.hrsc.orderExportExcelAll, {batchNo: batchNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      batchSuccDownload (batchNo) {
        api.post(this.apiPath.hrsc.orderExportExcelSucc, {batchNo: batchNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      batchFailDownload (batchNo) {
        api.post(this.apiPath.hrsc.downloadFailOrderUpDeclWageData, {batchNo: batchNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 确认派出
      sendFun (_data) {
        api.post(this.apiPath.hrsc.addBatchOrder, {batchNo: _data.batchNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '确认派出成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      batchInport () {
        this.batchLeadSeeFlag = false;
      },
      // 模板下载
      downloadFun () {
        this.downloadFlag = true;
      },
      downSubmitFun () {
        api.post(this.apiPath.hrsc.downloadOrderUpDeclWageExcel, this.downloadForm).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
            this.downloadFlag = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询历史导入数据
      hisFun () {
        this.routerView = true;
        this.$router.push({path: '/jobBatchDecNum/decNumHisSearch'});
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.seeViewDataFun(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.seeViewDataFun(this.pageNum, this.pageSize);
      },
      resetFun (formName) {
        if (formName === 'batchLeadSeeClose') {
          this.empassform = this.batchLeadSeeList;
          this.drawPie(this.empassform.totalNum, this.empassform.succNum, this.empassform.failNum);
          this.seeViewDataFun(this.pageNum, this.pageSize);
        } else {
          this.$refs[formName].resetFields();
          this.$refs.batchUpload.uploadFiles = [];
          this.batchLeadForm.fileName = '';
          this.batchLeadForm.uploadList = [];
        }
      }
    }
  };
</script>
