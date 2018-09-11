<template>
  <!--批量维护-->
  <div>
    <div class="usermanage batch-empass" v-if="!routerView">
      <div class="prod-tab sino-tabs sino-tabs-card tab-group">
        <div class="sino-tabs-header">
          <div class="sino-tabs-nav">
            <div class="sino-tabs-item" @click="prodScheFun">单个维护</div>
            <div class="sino-tabs-item is-active">批量维护</div>
          </div>
        </div>
      </div>
      <sino-con class="empass-sino-icon">
        <sino-title type="levelTwo" title="导入信息" class="overFl"></sino-title>
        <div class="sino-table-icon-left empass-sino-icon">
          <sino-button type="icon-text" @click="downloadFun"><i class="iconfont sino-download-copy"></i>下载模板</sino-button>
          <sino-button type="icon-text" @click="importFun"><i class="iconfont sino-import"></i>导入</sino-button>
          <!--<sino-button type="icon-text" @click="orderhisFun" class="fr orderhistory"><i class="iconfont sino-zhihangjilu"></i>订单明细查询</sino-button>-->
          <sino-button type="icon-text" @click="hisFun" class="fr"><i class="iconfont sino-shijian4"></i>历史导入查询</sino-button>
        </div>
        <div class="empass-middle-box clear">
          <div class="empass-middle-left fl">
            <div class="left-top">
              <p>
                <span class="import-title">导入文件名称：</span><span v-text="empassform.fileName"></span>
                <input type="hidden" v-model="empassform.orgFileName">
              </p>
              <p class="import">
                <span class="spanSp">
                  <span class="import-title">导入操作人：</span>
                  <span style="width: initial;" class="import-person" v-text="empassform.importManName"></span>
                </span>
                <span class="spanSp">
                  <span class="import-title">导入时间：</span>
                  <span style="width: initial;" v-text="empassform.importDate"></span>
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
                  <p><span class="tip_num" v-text="empassform.sumCount || 0"></span><span></span></p>
                </div>
              </li>
              <li>
                <div>
                  <i class="success-img"></i>
                </div>
                <div>
                  <p>成功数据</p>
                  <p><span class="tip_num" v-text="empassform.succCount || 0"></span><span></span></p>
                </div>
              </li>
              <li>
                <div>
                  <i class="error-img"></i>
                </div>
                <div>
                  <p>失败数据</p>
                  <p><span class="tip_num" v-text="empassform.failedCount || 0"></span><span style="cursor: pointer" @click="batchFailDownload(empassform.failedFilePath)" v-if="empassform.failedCount > 0">下载</span></p>
                </div>
              </li>
            </ul>
          </div>
          <div class="empass-middle-right fl" id="empass-chart" style="height:209px;width:30%"></div>
        </div>
        <sino-tabs v-model="activeName" type="card" @tab-click="handleClick" class="sino-tab-decl sino-tab-decl-empass">
          <sino-tab-pane label="成功数据" name="success" class="mt15">
            <sino-table :data="successTableData" max-height="416" stripe border v-on:viewAll="viewAll()">
              <sino-table-column type="index" label="序号" width="60" align="center" fixed></sino-table-column>
              <sino-table-column prop="c2" label="雇员名称" min-width="120" fixed></sino-table-column>
              <sino-table-column prop="c3" label="证件号码" min-width="180" fixed></sino-table-column>
              <sino-table-column prop="c4" label="工资年月" min-width="120" fixed></sino-table-column>
              <sino-table-column label-class-name="labelStyle" :prop="item.c1" :label="item.c2" v-for="(item, index) in tableTitle" :key="index" :type="item.c3?'money': ''" :width="item.c3?'120': '150'"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
          </sino-tab-pane>
          <sino-tab-pane label="失败数据" name="error" class="mt15">
            <sino-table :data="errorTableData"  max-height="416" stripe border v-on:viewAll="viewAll()">
              <sino-table-column type="index" label="序号" width="60" align="center" fixed></sino-table-column>
              <sino-table-column prop="c1" label="失败原因" min-width="120" fixed></sino-table-column>
              <sino-table-column prop="c2" label="雇员名称" min-width="120" fixed></sino-table-column>
              <sino-table-column prop="c3" label="证件号码" min-width="180" fixed></sino-table-column>
              <sino-table-column prop="c4" label="工资年月" min-width="120" fixed></sino-table-column>
              <sino-table-column label-class-name="labelStyle" :prop="item.c1" :label="item.c2" v-for="(item, index) in tableTitle" :key="index" :type="item.c3?'money': ''" :width="item.c3?'120': '150'"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
            <!--<sino-page v-bind:page="losePage.pageNum" v-bind:page-size="losePage.pageSize" v-on:pagehandler="pageHandlerLose" :pageArray="losePage.pageArray" v-on:choosePageFun="choooseNumLose" v-bind:object="object" :total="losePage.total"></sino-page>-->
          </sino-tab-pane>
        </sino-tabs>
      </sino-con>
      <!--下载模板-->
      <sino-dialog :visible.sync="downloadFlag" size="small" class="leads-follow dialog-item" v-on:close="resetFun('downloadForm')">
        <sino-title slot="title" type="levelOne" title="下载模板" class="sino-dialog-title"></sino-title>
        <sino-form :model="downloadForm" ref="downloadForm" :rules="downloadRules" class="follow-select">
          <div class="follow-content">
            <sino-form-item label="客户/供应商名称：" prop="custName">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="custInfoSelectBox"
                           :token="selectToken"
                           :chooseName.sync="downloadForm.custName"
                           :chooseId.sync="downloadForm.custId"
                           :clear="true" @contentChange="custChange"
              >
              </sino-select>
            </sino-form-item>
          </div>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="downSubmitFun">下 载</sino-button>
      </span>
      </sino-dialog>
      <!--批量导入-->
      <sino-dialog :visible.sync="batchLeadFlag" :top="'30%'" class="batch-error" v-on:close="resetFun('batchLeadForm')">
        <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
        <sino-form :model="batchLeadForm" :rules="batchLeadRules" ref="batchLeadForm">
          <sino-form-item label="客户/供应商名称：" prop="custName" class="sino-form-item-width is-required">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="custInfoSelectBox"
                         :token="selectToken"
                         :chooseName.sync="batchLeadForm.custName"
                         :chooseId.sync="batchLeadForm.custId"
                         :clear="true" @contentChange="custImportChange"
            >
            </sino-select>
          </sino-form-item>
          <sino-form-item prop="fileName" label="数据文件：" class="sino-form-item-width is-required">
            <sino-upload
              class="upload-demo"
              ref="batchUpload"
              :multiple="false"
              :action="uploadUrl"
              :show-file-list="true"
              :auto-upload="false"
              :on-change="getFileName"
              :on-success="fileSuccess"
              :on-remove="fileRemove"
              :headers="headerToken"
              :on-error="fileError"
            >
              <div slot="trigger">
                <input class="uploadFileBox" v-model="batchLeadForm.fileName" readonly="true"/>
                <span class="chooseFileButton">上传</span>
              </div>
            </sino-upload>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitUpload">确 定</sino-button>
      </span>
      </sino-dialog>
      <sino-dialog :visible.sync="batchLeadSeeFlag" size="small" class="remi-dialog" v-on:close="echartDraw">
        <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li>
              <input type="hidden" v-model="batchLeadSeeList.batchNo"/>
              <h6>文件名称</h6><span v-text="batchLeadSeeList.fileName"></span>
            </li>
            <li>
              <h6>总数量</h6><span>{{batchLeadSeeList.sumCount}}</span>
              <!--<a v-if="false" href="javascript:void(0)" @click="batchAllDownload(batchLeadSeeList.batchNo)">下载</a>-->
            </li>
            <li>
              <h6>成功数量</h6><span>{{batchLeadSeeList.succCount}}</span>
              <!--<a v-if="false" href="javascript:void(0)" @click="batchSuccDownload(batchLeadSeeList.SuccedFilePath)">下载</a>-->
            </li>
            <li>
              <h6>失败数量</h6><span>{{batchLeadSeeList.failedCount}}<a v-if="batchLeadSeeList.failedCount !== 0" href="javascript:void(0)" @click="batchFailDownload(batchLeadSeeList.failedFilePath)">下载</a></span>
            </li>
            <li>
              <h6>导入操作人</h6><span v-text="batchLeadSeeList.importManName"></span>
            </li>
            <li>
              <h6>导入时间</h6><span v-text="batchLeadSeeList.importDate"></span>
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
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  import echarts from 'echarts';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        custInfoSelectBox: this.apiPath.hrsc.findCustAndSuppByConinfo,
        serviceUrl: this.apiPath.hrsc.findServeTempSelectBox,
        uploadUrl: this.apiPath.hrsc.uploadFilePublic,
        headerToken: {"Token": Cookies.get('Token')},
        selectToken: Cookies.get('Token'),
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
//        losePage: {
//          total: null,
//          pageNum: 1,
//          pageSize: 10,
//          pageArray: [10, 20, 30, 50]
//        },
        batchForm: {
          custId: '',
          custName: '',
          begDate: '',
          endDate: ''
        },
        empassform: {},
        batchRules: {},
        batchLeadFlag: false,
        batchLeadSeeFlag: false,
        batchLeadForm: {
          custName: '',
          custId: '',
          fileName: '',
          custOrSuppType: ''
        },
        batchLeadRules: {
          custName: [
            {required: true, message: '客户名称为必填项', trigger: 'change'}
          ],
          fileName: [
            {required: true, message: '请选择数据文件', trigger: 'change'}
          ]
        },
        downloadRules: {
          custName: [
            {required: true, message: '客户名称为必填项', trigger: 'change'}
          ]
        },
        batchLeadSeeList: {
          fileName: '',
          sumCount: '',
          succCount: '',
          failedCount: '',
          importManName: '',
          importDate: ''
        },
        downloadFlag: false,
        downloadForm: {
          custId: '',
          custName: '',
          custOrSuppType: ''
        },
        conData: {
          id: ''
        },
        serveTempData: {
          custId: ''
        },
        successTableData: [],
        errorTableData: [],
        activeName: 'success',
        activeTotalPath: '',
        tableTitle: [],
        tableName: '',
        currentBatchNo: ''
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/salaryBatchMainten") {
            this.routerView = false;
            let that = this;
            setTimeout(function () {
              that.drawPie();
            });
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    mounted () {
      this.drawPie();
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/salaryBatchMainten") {
          this.routerView = true;
          this.drawPie();
        }
      },
      handleClick (tab, event) {
        this.activeName = tab.name;
        this.pageNum = 1;
        if (this.tableName) {
          this.viewAll(this.pageNum, this.pageSize);
        }
      },
      drawPie (total, suc, fail) {
        if (suc == null && fail == null) {
          this.chart = echarts.init(document.getElementById('empass-chart'));
          this.chart.setOption({
            title: {
              text: '导入总数',
              subtext: 0,
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
            legend: {/* 描述的title */
              orient: 'vertical',
              x: 'right',
              y: 'bottom',
              data: ['成功数据', '失败数据']
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
                  emphasis: {/* 鼠标悬浮的样式 */
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
              subtext: total || 0,
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
            color: ['#15d6ba', '#138cdd'],
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
            legend: {/* 描述的title */
              orient: 'vertical',
              x: 'right',
              y: 'bottom',
              data: ['成功数据', '失败数据']
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
                  emphasis: {/* 鼠标悬浮的样式 */
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
      custChange (list) {
        this.downloadForm.custOrSuppType = list.flag;
      },
      custImportChange (list) {
        this.batchLeadForm.custOrSuppType = list.flag;
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        this.$router.push({path: '/salaryBatchMainten/salarySingleMainten'});
        this.routerView = true;
      },
      viewAll (pageNum, pageSize) {
        if (!this.tableName) {
          this.$alert('请先上传文件', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              return;
            }
          });
          return;
        }
        let _data = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: {
            fileName: this.tableName,
            succOrFailed: this.activeName === 'success' ? 0 : 1
          }
        };
        api.post(this.apiPath.hrsc.pageSuccOrderWageDetExcel, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            let arr = [];
            JSON.parse(JSON.stringify(res.data.list)).forEach(function (items) {
              let obj = {};
              items.forEach(function (item) {
                obj[item.c1] = item.c2;
              });
              arr.push(JSON.parse(JSON.stringify(obj)));
            });
            this[this.activeName === 'success' ? 'successTableData' : 'errorTableData'] = arr;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      importFun () {
        this.batchLeadFlag = true;
      },
      getFileName (file, filelist) {
        if (filelist.length > 1) {
          filelist = filelist.splice(0, 1);
        }
        this.batchLeadForm.fileName = file.name;
      },
      fileRemove () {
        this.batchLeadForm.fileName = '';
        this.$refs.batchUpload.clearFiles();
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.currentBatchNo = res.data;
          let _data = this.batchLeadForm;
          _data.fileNo = res.data;
          _data.token = this.selectToken;
          api.post(this.apiPath.hrsc.saveOrderDetWageExcel, _data).then(res => {
            if (res.code === 'CPYY-00001') {
              this.batchLeadSeeList = res.data;
              this.empassform = res.data;
              this.batchLeadSeeList.fileName = this.batchLeadForm.fileName;
              this.batchLeadFlag = false;
              this.batchLeadSeeFlag = true;
              this.tableTitle = res.data.testVOS;
              this.tableName = res.data.tableName;
              this.tableTitle.forEach(function (item) {
                if (item.c3) {
                  item.widthVal = '150px';
                }
                if (item.c2.length > 4 || item.c2 === '银行卡号' || item.c2 === '证件号码' || item.c2 === '银行类型') {
                  item.widthVal = '200px';
                }
              });
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
      fileError (res) {
        this.$alert(res.data, '温馨提示', {
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
//      batchAllDownload (batchNo) {
//        api.postsign(this.apiPath.hrsc.getOrgData, this.currentBatchNo).then(res => {
//          if (res.code === 'CPYY-00001') {
//            api.download(res.data);
//          }
//        }).catch(err => {
//          console.log(err);
//        });
//      },
//      batchSuccDownload (path) {
//        api.download(path);
//      },
      batchFailDownload (path) {
        api.download(path);
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
      },
      echartDraw () {
        this.drawPie(this.empassform.sumCount, this.empassform.succCount, this.empassform.failedCount);
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 模板下载
      downloadFun () {
        this.downloadFlag = true;
      },
      downSubmitFun () {
        this.$refs.downloadForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.downloadWageTemplate, this.downloadForm).then(res => {
              if (res.code === 'CPYY-00001') {
                api.download(res.data);
                this.downloadFlag = false;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
        this.downloadForm.impFileId = '2017-12-26@6d374c20402b43288f4613b735e9c1fa';
      },
      // 查询历史导入数据
      hisFun () {
        this.routerView = true;
        this.$router.push({path: '/salaryBatchMainten/hisImportSearch'});
      },
      orderhisFun () {
        this.routerView = true;
        this.$router.push({path: '/salaryBatchMainten/orderDetSearch'});
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
        if (formName !== 'downloadForm') {
          this.$refs.batchUpload.uploadFiles = [];
          this.batchLeadForm.fileName = '';
          this.batchLeadForm.uploadList = [];
        }
      }
    }
  };
</script>
