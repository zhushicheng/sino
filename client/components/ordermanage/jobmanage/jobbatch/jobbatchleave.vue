<template>
  <!--在职管理批量维护-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <div class="prod-tab sino-tabs sino-tabs-card tab-group">
        <div class="sino-tabs-header">
          <div class="sino-tabs-nav">
            <div class="sino-tabs-item" @click="prodScheFun">单个维护</div>
            <div class="sino-tabs-item is-active">批量维护-撤离</div>
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
                  <p><span class="tip_num">{{empassform.succNum || 0}}/{{empassform.succWaitNum || 0}}</span></p>
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
          <sino-tab-pane label="成功-正常" name="success" class="mt15">
            <sino-table :data="successTableData" max-height="416" stripe border v-on:viewAll="successViewAll">
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
              <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
              <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="150"></sino-table-column>
              <sino-table-column prop="leaveReasonName" label="离职原因" min-width="120"></sino-table-column>
              <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
              <sino-table-column prop="conName" label="商务合同" min-width="150"></sino-table-column>
              <sino-table-column prop="remark" label="备注"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
          </sino-tab-pane>
          <sino-tab-pane label="成功-延迟停" name="success2" class="mt15">
            <sino-table :data="successTableData2"  max-height="416" stripe border v-on:viewAll="successViewAll2">
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
              <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
              <sino-table-column prop="uniqNo" label="雇员唯一号" min-width="120"></sino-table-column>
              <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="150"></sino-table-column>
              <sino-table-column prop="leaveReasonName" label="离职原因" min-width="120"></sino-table-column>
              <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
              <sino-table-column prop="conName" label="商务合同" min-width="150"></sino-table-column>
              <sino-table-column prop="remark" label="备注"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="succPage.pageNum" v-bind:page-size="succPage.pageSize" v-on:pagehandler="pageHandlerSuc" :pageArray="succPage.pageArray" v-on:choosePageFun="choooseNumSuc" v-bind:object="object" :total="succPage.total"></sino-page>
          </sino-tab-pane>
          <sino-tab-pane label="失败详情" name="error" class="mt15">
            <sino-table :data="errorTableData"  max-height="416" stripe border v-on:viewAll="errorViewAll">
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="failReason" label="失败原因" min-width="180"></sino-table-column>
              <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
              <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
              <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="150"></sino-table-column>
              <sino-table-column prop="leaveReasonName" label="离职原因" min-width="120"></sino-table-column>
              <sino-table-column prop="conName" label="商务合同" min-width="150"></sino-table-column>
              <sino-table-column prop="remark" label="备注" min-width="120"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="losePage.pageNum" v-bind:page-size="losePage.pageSize" v-on:pagehandler="pageHandlerLose" :pageArray="losePage.pageArray" v-on:choosePageFun="choooseNumLose" v-bind:object="object" :total="losePage.total"></sino-page>
          </sino-tab-pane>
        </sino-tabs>
      </sino-con>
      <!--下载模板-->
      <sino-dialog :visible.sync="downloadFlag" size="small" class="leads-follow dialog-item batchempass-download batchempass-download1" v-on:close="resetForm('downloadForm')">
        <sino-title slot="title" type="levelOne" title="下载模板" class="sino-dialog-title"></sino-title>
        <sino-form :model="downloadForm" ref="downloadForm" :rules="downloadRules" class="follow-select">
          <div class="follow-content">
            <sino-form-item label="签约供应商：" prop="signSuppName">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="signUrl"
                           :token="selectToken"
                           :chooseName.sync="downloadForm.signSuppName"
                           :chooseId.sync="downloadForm.signSuppId"
                           :clear="true"
                           @change="signChange"
              >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="客户名称：" prop="custName">
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
                           :chooseName.sync="downloadForm.custName"
                           :chooseId.sync="downloadForm.custIds"
                           :clear="true"
                           @change="custChange"
              >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="产品服务模板：" prop="tempName" v-if="tempFlag">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="true"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :linkage="true"
                           :url="serviceUrl"
                           :data="serveTempData"
                           :chooseName.sync="downloadForm.tempName"
                           :chooseId.sync="downloadForm.tempIds"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
          </div>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="downSubmitFun">下 载</sino-button>
      </span>
      </sino-dialog>
      <!--批量导入-->
      <sino-dialog :visible.sync="batchLeadFlag" :top="'30%'" class="batch-error batch-error1 overflow-y-che" v-on:close="resetFun('batchLeadForm')">
        <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
        <sino-form :model="batchLeadForm" :rules="batchLeadRules" ref="batchLeadForm">
          <sino-form-item prop="fileName" label="导入文件：" class="sino-form-item-width">
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
          <div class="file-upload-div" v-for="(list, index) in batchLeadForm.uploadList" :key="index" v-show="batchLeadForm.uploadListFlag" style="margin-left: 142px;">
            <i class="iconfont sino-qubiezhen fl"></i>
            <span class="fl file-span ml10">{{list.name}}</span>
            <span class="file-del-btn fl ml10" v-on:click="delConFile">删除</span>
          </div>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitUpload">确 定</sino-button>
      </span>
      </sino-dialog>
      <sino-dialog :visible.sync="batchLeadSeeFlag" size="small" class="remi-dialog">
        <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li>
              <input type="hidden" v-model="batchLeadSeeList.batchNo"/>
              <h6>文件名称</h6><span v-text="batchLeadSeeList.fileName"></span>
            </li>
            <li>
              <h6>总数量</h6><span>{{batchLeadSeeList.totalNum}}<!--<a v-if="batchLeadSeeList.totalNum !== 0" href="javascript:void(0)" @click="batchAllDownload(batchLeadSeeList.batchNo)">下载</a>--></span>
            </li>
            <li>
              <h6>成功数量</h6><span>{{batchLeadSeeList.succNum}}<!--<a v-if="batchLeadSeeList.succNum !== 0" href="javascript:void(0)" @click="batchSuccDownload(batchLeadSeeList.batchNo)">下载</a>--></span>
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
        signUrl: this.apiPath.hrsc.findByOrderSignSupp,
        coninfoSelectBox: this.apiPath.hrsc.findByCustIdSelectBox,
        serviceUrl: this.apiPath.hrsc.findServeTempSelectBoxbyCustId,
        uploadUrl: this.apiPath.hrsc.uploadFilePublic,
        headerToken: {"Token": Cookies.get('Token')},
        selectToken: Cookies.get('Token'),
        tempFlag: true,
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
        succPage: {
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
          batchNo: '',
          succWaitNum: ''
        },
        batchRules: {},
        batchLeadFlag: false,
        batchLeadSeeFlag: false,
        batchLeadForm: {
          uploadListFlag: false,
          uploadList: [],
          fileName: ''
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
          custIds: [],
          custName: [],
          signSuppId: '',
          signSuppName: '',
          tempIds: [],
          tempName: []
        },
        custData: {
          creSuppId: ''
        },
        serveTempData: {
          list: []
        },
        downloadRules: {
//          custName: [
//            {required: true, message: '请选择客户名称', trigger: 'change'}
//          ]
        },
        successTableData: null,
        errorTableData: null,
        successTableData2: null,
        activeName: 'success'
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/jobBatchLeave") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
      if (Cookies.get('suppInfo').suppId !== this.downloadForm.signSuppId) {
        this.tempFlag = false;
      } else {
        this.tempFlag = true;
      }
    },
    mounted () {
//      this.drawPie();
      this.drawPie(this.empassform.totalNum, this.empassform.succNum, this.empassform.succWaitNum, this.empassform.failNum);
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/jobBatchLeave") {
          this.routerView = true;
        }
      },
      handleClick (tab, event) {
        this.activeName = tab.name;
      },
      drawPie (total, suc, sucout, fail) {
        if (suc === '' && sucout === '' && fail === '') {
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
            legend: {
              orient: 'vertical',
              x: 'right',
              y: 'bottom',
              data: ['成功-正常', '成功-延迟停', '失败详情']
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
                data: [
                  { value: 400 }
                ]
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
            color: ['#11a6ea', '#45cec4', '#7bc2fb'],
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
            legend: { /* 描述的title */
              orient: 'vertical',
              x: 'right',
              y: 'bottom',
              data: ['成功-正常', '成功-延迟停', '失败详情']
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
                  {value: suc || 0, name: '成功-正常', selected: true},
                  {value: sucout || 0, name: '成功-延迟停', selected: true},
                  {value: fail || 0, name: '失败详情'}
                ]
              }
            ]
          });
        }
      },
      signChange () {
        this.custData.creSuppId = this.downloadForm.signSuppId;
        if (JSON.parse(Cookies.get('suppInfo')).suppId !== this.downloadForm.signSuppId) {
          this.tempFlag = false;
        } else {
          this.tempFlag = true;
        }
      },
      custChange () {
        this.serveTempData.list = this.downloadForm.custIds;
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        this.$router.push({path: '/jobSingle'});
      },
      importFun () {
        this.batchLeadFlag = true;
      },
      successViewAll (pageNum, pageSize) {
        if (this.empassform.totalNum === '' || this.empassform.totalNum === 0) {
          this.successTableData = null;
          return;
        }
        let _data = {
          data: {
            batchNo: this.empassform.batchNo,
            impType: 1
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findAllImpOrderLeaveExcelByBatNo, _data).then(res => {
          this.successTableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      successViewAll2 (pageNum, pageSize) {
        if (this.empassform.totalNum === '' || this.empassform.totalNum === 0) {
          this.successTableData2 = null;
          return;
        }
        let _data = {
          data: {
            batchNo: this.empassform.batchNo,
            impType: 3
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findAllImpOrderLeaveExcelByBatNo, _data).then(res => {
          this.successTableData2 = res.data.list;
          this.succPage.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      errorViewAll (pageNum, pageSize) {
        if (this.empassform.totalNum === '' || this.empassform.totalNum === 0) {
          this.errorTableData = null;
          return;
        }
        let _data = {
          data: {
            batchNo: this.empassform.batchNo,
            impType: 2
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findAllImpOrderLeaveExcelByBatNo, _data).then(res => {
          this.errorTableData = res.data.list;
          this.losePage.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getFileName (file, filelist) {
        if (filelist.length > 1) {
          filelist = filelist.splice(0, 1);
        }
        this.batchLeadForm.fileName = file.name;
        this.batchLeadForm.uploadListFlag = true;
        this.batchLeadForm.uploadList = filelist;
      },
      fileSuccess (res) {
        let _this = this;
        if (res.code === 'CPYY-00001') {
          api.postsign(this.apiPath.hrsc.impOrderLeaveExcel, res.data).then(res => {
            if (res.code === 'CPYY-00001') {
              this.batchLeadFlag = false;
              this.batchLeadSeeFlag = true;
              this.batchLeadSeeList = res.data;
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.$alert(res.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        }
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
        api.post(this.apiPath.hrsc.downloadOrderLeaveDataByBatNo, {batchNo: batchNo, impType: 2}).then(res => {
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
        this.empassform = this.batchLeadSeeList;
        this.drawPie(this.empassform.totalNum, this.empassform.succNum, this.empassform.succWaitNum, this.empassform.failNum);
        this.successViewAll(this.pageNum, this.pageSize);
        this.successViewAll2(this.succPage.pageNum, this.succPage.pageSize);
        this.errorViewAll(this.losePage.pageNum, this.losePage.pageSize);
      },
      // 模板下载弹窗显示
      downloadFun () {
        let _this = this;
        _this.downloadFlag = true;
        api.post(_this.signUrl, {}).then(res => {
          if (res.data.list && res.data.list.length > 0) {
            res.data.list.forEach(function (item) {
              if (item.flag === 1) {
                _this.downloadForm.signSuppId = item.id;
                _this.downloadForm.signSuppName = item.title;
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 模板下载
      downSubmitFun () {
//        this.downloadForm.impFileId = '2017-12-26@6d374c20402b43288f4613b735e9c1fa';
        api.postsign(this.apiPath.hrsc.downloadOrderLeaveExcel, this.downloadForm).then(res => {
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
        this.$router.push({path: '/jobBatchLeave/hisImportSearch'});
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.successViewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.successViewAll(this.pageNum, this.pageSize);
      },
      pageHandlerSuc: function (pageNum) {
        this.succPage.pageNum = pageNum;
        this.errorViewAll(this.succPage.pageNum, this.succPage.pageSize);
      },
      choooseNumSuc: function (pageSize) {
        this.succPage.pageSize = pageSize;
        this.errorViewAll(this.succPage.pageNum, this.succPage.pageSize);
      },
      pageHandlerLose: function (pageNum) {
        this.losePage.pageNum = pageNum;
        this.errorViewAll(this.losePage.pageNum, this.losePage.pageSize);
      },
      choooseNumLose: function (pageSize) {
        this.losePage.pageSize = pageSize;
        this.errorViewAll(this.losePage.pageNum, this.losePage.pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
        this.$refs.batchUpload.uploadFiles = [];
        this.batchLeadForm.fileName = '';
        this.batchLeadForm.uploadList = [];
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
