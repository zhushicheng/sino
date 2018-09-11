<template>
  <!--批量新增-->
  <div class="usermanage batch-empass">
    <sino-con class="empass-sino-icon">
      <sino-title style="margin-bottom: 15px" type="levelOne" title="修改成本中心"></sino-title>
      <sino-title type="levelTwo" title="导入信息" class="overFl"></sino-title>
      <div class="sino-table-icon-left empass-sino-icon">
        <sino-button type="icon-text" @click="downloadFun"><i class="iconfont sino-download-copy"></i>下载模板</sino-button>
        <sino-button type="icon-text" @click="importFun"><i class="iconfont sino-import"></i>导入</sino-button>
        <!--<sino-button type="icon-text" class="fr"><i class="iconfont sino-shijian4"></i>历史导入查询</sino-button>-->
      </div>
      <div class="empass-middle-box clear">
        <div class="empass-middle-left fl">
          <div class="left-top">
            <p>
              <span class="import-title">导入文件名称：</span><span v-text="batchAddform.fileName"></span>
              <input type="hidden" v-model="batchAddform.fileId">
            </p>
            <p class="import">
                <span class="spanSp">
                  <span class="import-title">导入操作人：</span>
                  <span class="import-person" v-text="batchAddform.creName"></span>
                </span>
              <span class="spanSp">
                  <span class="import-title">导入时间：</span>
                  <span v-text="batchAddform.creTime"></span>
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
                <p><span class="tip_num" v-text="batchAddform.totalNum || 0"></span><span></span></p>
              </div>
            </li>
            <li>
              <div>
                <i class="success-img"></i>
              </div>
              <div>
                <p>成功数据</p>
                <p><span class="tip_num" v-text="batchAddform.succNum || 0"></span><span></span></p>
              </div>
            </li>
            <li>
              <div>
                <i class="error-img"></i>
              </div>
              <div>
                <p>失败数据</p>
                <p><span class="tip_num" v-text="batchAddform.failNum || 0"></span><span v-if="batchAddform.failNum" style="cursor: pointer" @click="batchFailDownload(batchAddform.batchNo)">下载</span></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="empass-middle-right fl" id="empass-chart" style="height:209px;width:30%"></div>
      </div>
      <sino-tabs v-model="activeName" type="card" @tab-click="handleClick" class="sino-tab-decl sino-tab-decl-empass">
        <sino-tab-pane label="成功数据" name="success" class="mt15">
          <sino-table :data="successTableData" max-height="416" stripe border v-on:viewAll="successViewAll">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="costCentName" label="成本中心"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称"></sino-table-column>
            <sino-table-column prop="orderBegDate" label="订单开始日期" min-width="100"></sino-table-column>
            <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="100"></sino-table-column>
            <sino-table-column prop="accrAreaName" label="派出地区" min-width="100"></sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
        </sino-tab-pane>
        <sino-tab-pane label="失败数据" name="error" class="mt15">
          <sino-table :data="errorTableData"  max-height="416" stripe border v-on:viewAll="errorViewAll">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="failReason" label="失败原因" min-width="150"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="costCentName" label="成本中心"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称"></sino-table-column>
            <sino-table-column prop="orderBegDate" label="订单开始日期" min-width="100"></sino-table-column>
            <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="100"></sino-table-column>
            <sino-table-column prop="accrAreaName" label="派出地区" min-width="100"></sino-table-column>
          </sino-table>
          <sino-page v-bind:page="losePage.pageNum" v-bind:page-size="losePage.pageSize" v-on:pagehandler="pageHandlerLose" :pageArray="losePage.pageArray" v-on:choosePageFun="choooseNumLose" v-bind:object="object" :total="losePage.total"></sino-page>
        </sino-tab-pane>
      </sino-tabs>
    </sino-con>
    <!--批量导入-->
    <sino-dialog :visible.sync="batchLeadFlag" top="20%" size="small" class="orderbeginForm" v-on:close="resetFun('batchLeadForm')">
      <sino-title slot="title" type="levelOne" title="导入文件" class="sino-dialog-title"></sino-title>
      <sino-form :model="batchLeadForm" :rules="batchLeadRules" ref="batchLeadForm">
        <sino-form-item prop="fileUniqueNo" label="上传文件：" class="uploadFile sino-form-item-width">
          <sino-upload
            class="upload-demo"
            ref="batchUpload"
            :action="uploadUrl"
            :show-file-list="false"
            :auto-upload="true"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :headers="headerToken"
            :on-error="fileError"
          >
            <div slot="trigger">
              <input type="hidden" v-model="batchLeadForm.fileUniqueNo">
              <input class="uploadFileBox" type="text" v-model="batchLeadForm.fileUniqueName" readonly="true"/>
              <span class="chooseFileButton">上传</span>
            </div>
          </sino-upload>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="batchInport">确 定</sino-button>
        </span>
    </sino-dialog>
    <!--批量导入查询-->
    <sino-dialog :visible.sync="batchLeadSeeFlag" size="small" class="remi-dialog" v-on:close="resetFun('batchAddform')">
      <sino-title slot="title" type="levelOne" title="导入结果" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>导入文件名称</h6><span v-text="batchAddform.fileName"></span>
          </li>
          <li>
            <h6>导入总数</h6><span>{{batchAddform.totalNum}}</span>
          </li>
          <li>
            <h6>成功数据</h6><span>{{batchAddform.succNum}}</span>
          </li>
          <li>
            <h6>失败数据</h6><span>{{batchAddform.failNum}}<a v-if="batchAddform.failNum" href="javascript:void(0)" @click="batchFailDownload(batchAddform.batchNo)">下载</a></span>
          </li>
          <li>
            <h6>导入人</h6><span v-text="batchAddform.creName"></span>
          </li>
          <li>
            <h6>导入时间</h6><span v-text="batchAddform.creTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="batchLeadSeeFlag = false;">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  import echarts from 'echarts';

  export default {
    data () {
      return {
        addAreaUrl: this.apiPath.hrsc.findSuppBusiAreaBySuppId,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        custUrl: this.apiPath.hrsc.custInfoSelectBoxSource,
        coninfoSelectBox: this.apiPath.hrsc.findByCustIdSelectBox,
        serviceUrl: this.apiPath.hrsc.findPriceSelectBoxByPayFre,
        uploadUrl: this.apiPath.hrsc.uploadFilePublic,
        suppUrl: this.apiPath.hrsc.selectBox,  // g
        headerToken: {"Token": Cookies.get('Token')},
        selectToken: Cookies.get('Token'),
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
        batchAddform: {
          fileUniqueNo: '',
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
          // uploadListFlag: false,
          // uploadList: [],
          fileUniqueNo: '',
          fileUniqueName: ''
        },
        batchLeadRules: {
          fileUniqueNo: [
            {required: true, message: '请选择导入文件', trigger: 'change'}
          ]
        },
        batchLeadSeeList: {
          fileUniqueNo: '',
          batchNo: '',
          totalNum: '',
          succNum: '',
          failNum: '',
          creName: '',
          creTime: ''
        },
        downloadFlag: false,
        downloadForm: {
          custId: '',
          custName: '',
          conId: '',
          conName: '',
          serveTempId: '',
          serveTempName: ''
        },
        conData: {
          id: ''
        },
        serveTempData: {
          custId: ''
        },
        downloadRules: {
//          custName: [
//            {required: true, message: '请选择客户名称', trigger: 'change'}
//          ]
        },
        successTableData: [],
        errorTableData: [],
        activeName: 'success',
        compId: Cookies.get("CorpId"), // 公司id
        isPayMoney: true // 是否经办员
      };
    },
    mounted () {
//      this.pageNum = 1;
//      this.viewAll(this.pageNum, this.pageSize);
//      this.drawPie();
      this.drawPie(this.batchAddform.totalNum, this.batchAddform.succNum, this.batchAddform.failNum);
    },
    methods: {
      changeSup (item) {
        if (item.id == this.compId) {
          this.isPayMoney = false;
        } else {
          this.isPayMoney = true;
        }
      },
      handleClick (tab, event) {
        this.activeName = tab.name;
      },
      drawPie (total, suc, fail) {
        if (!suc && !fail) {
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
                  emphasis: {
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
            color: ['#138cdd', '#15d6ba'],
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
            legend: {
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
                  emphasis: {
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
                  { value: suc || 0, name: '成功数据', selected: true }
                ]
              }
            ]
          });
        }
      },
      custChange () {
        this.conData.id = this.downloadForm.custId;
        this.serveTempData.custId = this.downloadForm.custId;
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        this.$router.push({path: '/empAss/singleEmpAss'});
      },
      importFun () {
        this.batchLeadFlag = true;
      },
      successViewAll (pageNum, pageSize) {
        if (this.batchAddform.succNum === '' || this.batchAddform.succNum === 0) {
          this.successTableData = [];
          return;
        }
        let _data = {
          data: {
            batchNo: this.batchAddform.batchNo,
            impResult: 1
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findImpDate, _data).then(res => {
          this.successTableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      errorViewAll (pageNum, pageSize) {
        if (this.batchAddform.failNum === '' || this.batchAddform.failNum === 0) {
          this.errorTableData = [];
          return;
        }
        let _data = {
          data: {
            batchNo: this.batchAddform.batchNo,
            impResult: 2
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findImpDate, _data).then(res => {
          this.errorTableData = res.data.list;
          this.losePage.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getFileName (file, filelist) {
        // if (filelist.length > 1) {
        //   filelist = filelist.splice(0, 1);
        // }
        this.batchLeadForm.fileUniqueName = file.name;
        // this.batchLeadForm.uploadListFlag = true;
        // this.batchLeadForm.uploadList = filelist;
      },
      fileSuccess (res) {
        let _this = this;
        if (res.code === 'CPYY-00001') {
          this.batchLeadForm.fileUniqueNo = res.data;
          // api.postsign(this.apiPath.hrsc.importXlsx, res.data).then(res => {
          //   if (res.code === 'CPYY-00001') {
          //     this.batchLeadFlag = false;
          //     this.batchLeadSeeFlag = true;
          //     this.batchLeadSeeList = res.data;
          //   }
          // }).catch(err => {
          //   console.log(err);
          // });
        } else {
          this.batchLeadForm.fileUniqueName = '';
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
        this.batchLeadForm.fileUniqueName = '';
        this.batchLeadForm.fileUniqueNo = '';
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
        this.batchLeadForm.fileUniqueNo = '';
        this.batchLeadForm.uploadListFlag = false;
        this.batchLeadForm.uploadList = [];
      },
      // 导入确认
      submitUpload () {
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
        api.postsign(this.apiPath.hrsc.downloadImpfailData, batchNo).then(res => {
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
        this.$refs.batchLeadForm.validate((valid) => {
          if (valid) {
            // this.$refs.batchUpload.submit();
            // let params = JSON.parse(JSON.stringify(this.batchLeadForm));
            api.postsign(this.apiPath.hrsc.updateCostCentCentBatch, this.batchLeadForm.fileUniqueNo).then(res => {
              if (res.code === 'CPYY-00001') {
                this.batchLeadFlag = false;
                this.batchAddform = res.data;
                this.batchLeadSeeFlag = true;
                this.drawPie(res.data.totalNum, res.data.succNum, res.data.failNum);
                this.successViewAll(this.pageNum, this.pageSize);
                this.errorViewAll(this.losePage.pageNum, this.losePage.pageSize);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 模板下载
      downloadFun () {
        api.postsign(this.apiPath.hrsc.downloadByTypeByorder, 60).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
        // this.downloadFlag = true;
      },
      downSubmitFun () {
        this.downloadForm.impFileId = '2018-01-09@142a3e953818475cb8dff9b762fd69bc';
        api.postsign(this.apiPath.hrsc.validateTemp, this.downloadForm).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
            this.downloadFlag = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.successViewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.successViewAll(this.pageNum, this.pageSize);
      },
      pageHandlerLose: function (pageNum) {
        this.losePage.pageNum = pageNum;
        this.errorViewAll(this.losePage.pageNum, this.losePage.pageSize);
      },
      choooseNumLose: function (pageSize) {
        this.losePage.pageSize = pageSize;
        // this.losePage.pageNum = 1;
        this.errorViewAll(this.losePage.pageNum, this.losePage.pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
        this.batchLeadForm.fileUniqueName = '';
        this.$refs.batchUpload.uploadFiles = [];
        this.batchLeadForm.fileUniqueNo = '';
        this.batchLeadForm.uploadList = [];
      }
    }
  };
</script>

