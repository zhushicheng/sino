<template>
  <!--在职管理批量维护-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun">单个维护</div>
          <div class="sino-tabs-item is-active">批量维护</div>
        </div>
      </div>
    </div>
    <sino-con class="empass-sino-icon">
      <sino-title type="levelTwo" title="选择维护内容" class="overFl"></sino-title>
      <div class="sino-table-icon-left empass-sino-icon">
        <ul class="empass-module-box">
          <li class="empass-module-label" @click="moduleClickFun(1)">
            <div class="lable-icon-box lable-icon-box-1"></div>
            <p class="empass-module-text">撤 离</p>
          </li>
          <li class="empass-module-label" @click="moduleClickFun(2)">
            <div class="lable-icon-box lable-icon-box-2"></div>
            <p class="empass-module-text">申报基数</p>
          </li>
          <li class="empass-module-label" @click="moduleClickFun(3)">
            <div class="lable-icon-box lable-icon-box-3"></div>
            <p class="empass-module-text">成本中心</p>
          </li>
          <li class="empass-module-label" @click="moduleClickFun(4)">
            <div class="lable-icon-box lable-icon-box-4-1"></div>
            <p class="empass-module-text">订单开始日期</p>
          </li>
          <li class="empass-module-label" @click="moduleClickFun(5)">
            <div class="lable-icon-box lable-icon-box-4-2"></div>
            <p class="empass-module-text">订单结束日期</p>
          </li>
          <li class="empass-module-label" @click="moduleClickFun(6)">
            <div class="lable-icon-box lable-icon-box-5"></div>
            <p class="empass-module-text">服务费</p>
          </li>
          <li class="empass-module-label" @click="moduleClickFun(7)">
            <div class="lable-icon-box lable-icon-box-6"></div>
            <p class="empass-module-text">起/止做日期</p>
          </li>
          <li class="empass-module-label" @click="moduleClickFun(8)">
            <div class="lable-icon-box lable-icon-box-7"></div>
            <p class="empass-module-text">收/付费账单年月</p>
          </li>
          <li class="empass-module-label" @click="moduleClickFun(9)">
            <div class="lable-icon-box lable-icon-box-8"></div>
            <p class="empass-module-text">产品服务模板</p>
          </li>
          <li class="clearfix"></li>
        </ul>
      </div>
    </sino-con>
    <!--服务费-->
    <sino-dialog :visible.sync="modifySerFlag" top="5%" dialogHide class="medimat-see" @close="servClose()">
      <sino-title slot="title" type="levelOne" title="修改服务费" class="sino-dialog-title"></sino-title>
      <div class="usermanage dialog-com-tree-look-box toview-box toview-box-three">
        <div class="crumbs">
          <ul>
            <li :class="{'li-finish': servActiveNode > 1, 'li-active': servActiveNode === 1, 'li-notthr': servActiveNode  < 1}"><span class="span33"><i class="step-num iconfont" :class="{'sino-duigou': servActiveNode > 1}">{{servActiveNode > 1? '':1}}</i>选择服务内容</span></li>
            <li :class="{'li-finish': servActiveNode > 2, 'li-active': servActiveNode === 2, 'li-notthr': servActiveNode  < 2}"><span class="span33"><i class="step-num iconfont" :class="{'sino-duigou': servActiveNode > 2}">{{servActiveNode > 2? '':2}}</i>导入雇员名单</span></li>
            <li :class="{'li-finish': servActiveNode > 3, 'li-active': servActiveNode === 3, 'li-notthr': servActiveNode  < 3}"><span class="span33"><i class="step-num iconfont" :class="{'sino-duigou': servActiveNode > 3}">{{servActiveNode > 3? '':3}}</i>完成</span></li>
          </ul>
        </div>
      </div>
      <div v-if="chooiceServFlag">
        <sino-title type="levelTwo" title="您有下载好的模板吗？" class="mt15"></sino-title>
        <ul class="module-type-box mb15 overhid">
          <li @click="noTemplate">
            <div class="one-module-type">
              <div class="no-template"></div>
              <p>没有模板</p>
            </div>
            <h6>需先选择需要修改的服务下载模板填写后导入</h6>
          </li>
          <li @click="yesTemplate">
            <div class="one-module-type">
              <div class="have-template"></div>
              <p>是的,有模板</p>
            </div>
            <h6>直接导入雇员名单</h6>
          </li>
          <li class="clearfix"></li>
        </ul>
      </div>
      <div class="no-template-box" v-if="servConFlag">
        <sino-form  ref="batchForm" class="his-serch-form serch-form no-template-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="服务内容：" class="search-inner-item" prop="custName">
                  <sino-input type="text" v-model="servName" :disabled="false" placeholder="模糊查询"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box search-one-button-box">
              <sino-button type="primary right-ser-btn" @click="servQuery">查 询</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
        <div class="server-content-box">
          <div class="server-content-item" v-for="(list, index) in servList" :key="index" :class="{'server-content-item-active': list.flag}" @click="willChooseFun(list, index)">{{list.title}}</div>
        </div>
      </div>
      <div class="template-upload" v-if="servHaveFlag">
        <sino-form class="demo-ruleForm mt25" :model="servFileForm" :rules="servFileRules" ref="servFileForm">
          <sino-form-item prop="fileName" label="上传文件：">
            <sino-upload
              ref="servFile"
              :action="fileAction"
              :show-file-list="true"
              :auto-upload="true"
              :on-change="getFileServName"
              :on-success="fileServSuc"
              :on-error="fileServError"
              :on-remove="fileServRemove"
              :headers="uploadHeader"
            >
              <div slot="trigger">
                <input class="uploadFileBox" readonly="true" v-model="servFileForm.fileName"/>
                <div class="chooseFileButton">上传</div>
              </div>
            </sino-upload>
          </sino-form-item>
        </sino-form>
      </div>
      <div class="usermanagement-list" v-if="confObjFlag">
        <ul class="usermanagement-ul">
          <li>
            <h6>导入文件名称</h6>
            <span v-text="confObj.fileName"></span>
          </li>
          <li>
            <h6>导入数据数量</h6>
            <span><div class="file-upload-see"><i v-text="confObj.totalNum" ></i><i v-show="confObj.totalNum>0" class="file-del-btn" v-on:click="servTotalDown(confObj.fileId)">下载</i></div></span>
          </li>
          <li>
            <h6>成功数量</h6>
            <span><div class="file-upload-see"><i v-text="confObj.succNum" ></i><i v-show="confObj.succNum>0" class="file-del-btn" v-on:click="servSucDown(confObj.batchNo)">下载</i></div></span>
          </li>
          <li>
            <h6>失败数量</h6>
            <span><div class="file-upload-see"><i v-text="confObj.failNum" ></i><i  v-show="confObj.failNum>0" class="file-del-btn" v-on:click="servFailDown(confObj.batchNo)">下载</i></div></span>
          </li>
          <li>
            <h6>导入人</h6>
            <span v-text="confObj.creName"></span>
          </li>
          <li>
            <h6>导入时间</h6>
            <span v-text="confObj.creTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer" v-if="servConBtnFlag">
        <sino-button type="primary" @click="servDown">下载模板</sino-button>
      </span>
      <span slot="footer" v-if="servHaveBtnFlag">
        <sino-button type="text" @click="servBack">上一步</sino-button>
        <sino-button type="primary" @click="servUpload">确 定</sino-button>
      </span>
      <span slot="footer" v-if="confObjBtnFlag">
        <sino-button type="primary" @click="confObjUpdate">继续修改</sino-button>
      </span>
    </sino-dialog>
    <!--更换产品服务模板-->
    <sino-dialog :visible.sync="changeTemFlag" top="5%"  class="medimat-see dialog-maxauto" @close="resetFun()">
      <sino-title slot="title" type="levelOne" title="修改服务费" class="sino-dialog-title"></sino-title>
      <div class="usermanage dialog-com-tree-look-box toview-box">
        <div class="crumbs">
          <ul>
            <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1, 'li-notthr': activeNode  < 1}"><span class="span33"><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 1}">{{activeNode > 1? '':1}}</i>选择模板</span></li>
            <li :class="{'li-finish': activeNode > 2, 'li-active': activeNode === 2, 'li-notthr': activeNode  < 2}"><span class="span33"><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 2}">{{activeNode > 2? '':2}}</i>确认时间范围</span></li>
            <li :class="{'li-finish': activeNode > 3, 'li-active': activeNode === 3, 'li-notthr': activeNode  < 3}"><span class="span33"><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 3}">{{activeNode > 3? '':3}}</i>导入雇员信息</span></li>
            <li :class="{'li-finish': activeNode > 4, 'li-active': activeNode === 4, 'li-notthr': activeNode  < 4}"><span class="span33"><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 4}">{{activeNode > 4? '':4}}</i>完成</span></li>
          </ul>
        </div>
      </div>
      <div>
        <sino-form :model="changeTemplateForm" ref="changeTemplateForm" class="demo-sendAddrAddForm">
          <sino-form-item label="客户名称：" class="sino-form-item-width"  prop="prodCnName">
            <sino-select class="fl"
                         :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :data="{code: 'YES_NO'}"
                         :url="dictSelUrl"
                         :chooseName.sync="changeTemplateForm.prodCnName"
                         :chooseId.sync="changeTemplateForm.isOwnCard"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="现产品服务模板：" class="sino-form-item-width"  prop="prodCnName">
            <sino-select class="fl"
                         :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :data="{code: 'YES_NO'}"
                         :url="dictSelUrl"
                         :chooseName.sync="changeTemplateForm.prodCnName"
                         :chooseId.sync="changeTemplateForm.isOwnCard"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="新产品服务模板：" class="sino-form-item-width"  prop="prodCnName">
            <sino-select class="fl"
                         :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :data="{code: 'YES_NO'}"
                         :url="dictSelUrl"
                         :chooseName.sync="changeTemplateForm.prodCnName"
                         :chooseId.sync="changeTemplateForm.isOwnCard"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="人员范围：" class="sino-form-item-width"  prop="localStanType">
            <sino-radio v-model="changeTemplateForm.localStanType"
                        :label="1">全部更换</sino-radio>
            <sino-radio v-model="changeTemplateForm.localStanType"
                        :label="2">部分更换</sino-radio>
          </sino-form-item>
          <sino-form-item class="clearfix"></sino-form-item>
        </sino-form>
        <div>
          <sino-title type="levelTwo" title="服务模板变化明细" class="mt15"></sino-title>
          <sino-auto-table :data="tableData" stripe border ref="searchTable" :span-method="objectSpanMethod" :row-style="rowStyleFun">
            <sino-table-column prop="chanContent" label="变更内容"></sino-table-column>
            <sino-table-column prop="chanTypeName" label="变更信息"></sino-table-column>
            <sino-table-column prop="chanBefore" label="变更前"></sino-table-column>
            <sino-table-column prop="chanAfter" label="变更后"></sino-table-column>
          </sino-auto-table>
        </div>
      </div>
      <div class="local-info template-change-info">
        <sino-form :model="effectDataForm" class="follow-form form-overflow-hidden" ref="effectDataForm" >
          <div class="follow-content">
            <sino-form-item prop="feeDateNoString" label="生效日期：" :rules="[{required: true, type: 'date', message: '费用所属期为必填项', trigger: 'change'}]">
              <sino-date-picker
                v-model="effectDataForm.feeDateNoString"
                type="month"
                :editable="false"
                :readonly="false">
              </sino-date-picker>
            </sino-form-item>
          </div>
        </sino-form>
        <ul class="leaveinfo-ul">
          <li class="change-ser-title"><i class="iconfont sino-qiandai"></i>服务费金额变化</li>
          <li>
            <div class="leaveinfo-ul-li">
              <span v-text="'住房公积金'"></span>
            </div>
            <div class="leaveinfo-ul-li">
              <span class="fl">改费起做日期：</span>
              <sino-date-picker class="fl"
                                v-model="changeForm.publishEndDate"
                                type="date"
                                :editable="false"
                                :disabled="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </div>
          </li>
        </ul>
        <ul class="leaveinfo-ul">
          <li class="change-ser-title"><i class="iconfont sino-module"></i>增加服务内容</li>
          <li>
            <div class="leaveinfo-ul-li">
              <span v-text="'住房公积金'"></span>
            </div>
            <div class="leaveinfo-ul-li">
              <span class="fl">改费起做日期：</span>
              <sino-date-picker class="fl"
                                v-model="changeForm.publishEndDate"
                                type="date"
                                :editable="false"
                                :disabled="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </div>
          </li>
          <li>
            <div class="leaveinfo-ul-li">
              <span v-text="'住房公积金'"></span>
            </div>
            <div class="leaveinfo-ul-li">
              <span class="fl">改费起做日期：</span>
              <sino-date-picker class="fl"
                                v-model="changeForm.publishEndDate"
                                type="date"
                                :editable="false"
                                :disabled="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </div>
          </li>
        </ul>
        <ul class="leaveinfo-ul">
          <li class="change-ser-title"><i class="iconfont sino-delete"></i>减少服务内容</li>
          <li>
            <div class="leaveinfo-ul-li">
              <span v-text="'住房公积金'"></span>
            </div>
            <div class="leaveinfo-ul-li">
              <span class="fl">退费起做日期：</span>
              <sino-date-picker class="fl"
                                v-model="changeForm.publishEndDate"
                                type="date"
                                :editable="false"
                                :disabled="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </div>
          </li>
        </ul>
        <sino-form :model="effectDataForm" class="follow-form form-overflow-hidden" ref="effectDataForm" >
          <div class="follow-content">
            <sino-form-item prop="feeDateNoString" class="sino-form-item-width"  label="备注：">
              <sino-input type="textarea" v-model="effectDataForm.remark" :disabled="false" ></sino-input>
            </sino-form-item>
          </div>
        </sino-form>
      </div>
      <div class="template-upload">
        <sino-form class="demo-ruleForm" :model="uploadForm" ref="uploadForm">
          <sino-form-item prop="fileName" label="上传文件：" :rules="{required: true, message: '上传文件为必填项', trigger: 'change'}">
            <sino-upload
              ref="fileNameFile"
              :action="fileAction"
              :show-file-list="false"
              :auto-upload="true"
              :on-change="getFileName"
              :on-success="fileSuccess"
              :on-error="fileError"
              :headers="uploadHeader"
            >
              <div slot="trigger">
                <input class="uploadFileBox" readonly="true" v-model="uploadForm.fileName"/>
                <div class="chooseFileButton">上传</div>
              </div>
            </sino-upload>
          </sino-form-item>
        </sino-form>
      </div>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>导入文件名称</h6>
            <span v-text="confObj.fileName"></span>
          </li>
          <li>
            <h6>导入数据数量</h6>
            <span><div class="file-upload-see"><i v-text="confObj.totalSize" ></i><i v-show="confObj.totalSize>0" class="file-del-btn" v-on:click="downTotalFun()">下载</i></div></span>
          </li>
          <li>
            <h6>成功数量</h6>
            <span><div class="file-upload-see"><i v-text="confObj.succSize" ></i><i v-show="confObj.succSize>0" class="file-del-btn" v-on:click="updataDownFun(confObj.backSuccessPath)">下载</i></div></span>
          </li>
          <li>
            <h6>失败数量</h6>
            <span><div class="file-upload-see"><i v-text="confObj.failSize" ></i><i  v-show="confObj.failSize>0" class="file-del-btn" v-on:click="updataDownFun(confObj.backFailPath)">下载</i></div></span>
          </li>
          <li>
            <h6>导入人</h6>
            <span v-text="confObj.oprRoleName"></span>
          </li>
          <li>
            <h6>导入时间</h6>
            <span v-text="confObj.oprTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="seeFlag = false">下载模板</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  import echarts from 'echarts';
  let checkImgFileType = function (file, _this) {
    let _s = file.raw.name.split('.')[1];
    let _arr = ['xlsx', 'xls'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    }  else {
      _this.$alert('请上传excel文件！', '提示信息', {
        confirmButtonText: '确 定',
        type: 'warning',
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    }
  };

  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        uploadHeader: {"Token": Cookies.get('Token')},
        modifySerFlag: false,
        changeTemFlag: false,
        searchContent: '',
        uploadForm: {
          fileName: ''
        },
        changeTemplateForm: {},
        tableData: [],
        changeForm: {
          publishEndDate: ''
        },
        downloadForm: {
          signSuppId: ''
        },
        effectDataForm: {},
        chooiceServFlag: true,
        servConFlag: false,
        servConBtnFlag: false,
        servHaveFlag: false,
        servHaveBtnFlag: false,
        servName: '',
        servList: [],
        servCopyList: [],
        servFileForm: {
          fileName: '',
          fileUniqueNo: ''
        },
        servFileRules: {
          fileName: [
            {required: true, message: '上传文件为必填项', trigger: 'change'}
          ]
        },
        confObjFlag: false,
        confObjBtnFlag: false,
        confObj: {
          fileName: '',
          totalNum: '',
          succNum: '',
          failNum: '',
          creName: '',
          creTime: '',
          batchNo: '',
          fileId: ''
        },
        activeNode: '',
        servActiveNode: ''
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/jobBatch") {
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
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/jobBatch") {
          this.routerView = true;
        }
      },
      handleClick (tab, event) {
        this.activeName = tab.name;
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        this.$router.push({path: '/jobSingle'});
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
        this.$router.push({path: '/jobBatch/hisImportSearch'});
      },
      modifyServerFun () {
        this.modifySerFlag = true;
        this.chooiceServFlag = true;
      },
      moduleClickFun (num) {
        if (num === 1) {
          this.$router.push({path: '/jobBatchLeave'});
        } else if (num === 2) {
          this.$router.push({path: '/jobBatchDecNum'});
        } else if (num === 3) {
          this.$router.push({path: '/modifyCostCenter'});
        } else if (num === 4) {
          this.$router.push({path: '/orderbeginDate'});
        } else if (num === 5) {
          this.$router.push({path: '/orderEndDate'});
        } else if (num === 6) {
          this.modifyServerFun();
        } else if (num === 8) {
          this.$router.push({path: '/chargeAndPayTime'});
        } else if (num === 9) {
          this.changeTemFlag = true;
        }
      },
      searchFun () {},
      downTotalFun () {},
      updataDownFun () {},
      resetFun () {},
      objectSpanMethod ({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          if (this.indexArr.indexOf(rowIndex) !== -1) {
            return {
              rowspan: this.mapObj[row.chanContent],
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      rowStyleFun ({row, rowIndex}) {
        if (this.tableData.length < 5) {
          if (rowIndex >= this.tableData.length) {
            return {display: 'none'};
          }
        }
      },
      // 服务费
      noTemplate () {
        this.chooiceServFlag = false;
        this.servConFlag = true;
        this.servConBtnFlag = true;
      },
      yesTemplate () {
        this.chooiceServFlag = false;
        this.servHaveFlag = true;
        this.servHaveBtnFlag = true;
      },
      // 无模板查询
      servQuery () {
        let that = this;
        api.post(that.apiPath.hrsc.findprodpricescheselectbox, {title: that.servName}).then(res => {
          if (res.code === 'CPYY-00001') {
            that.servList = res.data.list;
            that.servList.forEach(function (list) {
              list.flag = false;
              list.headerName = list.title;
              that.servCopyList.forEach(function (item) {
                if (list.id === item.id) {
                  list.flag = true;
                }
              });
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      willChooseFun (list, index) {
        if (this.servList[index].flag === false) {
          this.servList[index].flag = true;
          this.servCopyList.push(list);
        } else {
          this.servList[index].flag = false;
          this.servCopyList.splice(this.servCopyList.indexOf(list), 1);
        }
      },
      // 下载模板
      servDown () {
        let that = this;
        api.post(that.apiPath.hrsc.downloadOrderUpServeMoneyExcel, that.servCopyList).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
            that.servClose();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      servClose () {
        this.chooiceServFlag = false;
        this.servConFlag = false;
        this.servConBtnFlag = false;
        this.servName = '';
        this.servList = [];
        this.servCopyList = [];
        this.confObjFlag = false;
        this.confObjBtnFlag = false;
        this.modifySerFlag = false;
      },
      // 上一步
      servBack () {
        this.chooiceServFlag = true;
        this.servHaveFlag = false;
        this.servHaveBtnFlag = false;
      },
      getFileServName (file, filelist) {
        if (checkImgFileType(file, this)) {
          if (filelist.length > 1) {
            filelist = filelist.splice(0, 1);
          }
          this.servFileForm.fileName = file.name;
        } else {
          this.$refs.servFile.clearFiles();
          this.servFileForm.fileName = '';
        }
      },
      fileServSuc (res) {
        let _this = this;
        if (res.code === 'CPYY-00001') {
          _this.servFileForm.fileUniqueNo = res.data;
        } else {
          _this.$alert(res.message, '温馨提示', {
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
      fileServError () {
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
      fileServRemove (file, filelist) {
        filelist = filelist.splice(filelist.indexOf(file), 1);
        if (filelist.length === 0) {
          this.$refs.servFile.uploadFiles = [];
          this.servFileForm.fileName = '';
        }
      },
      servUpload () {
        this.$refs.servFileForm.validate((valid) => {
          if (valid) {
            api.postsign(this.apiPath.hrsc.impOrderUpServeMoneyExcel, {fileUniqueNo: this.servFileForm.fileUniqueNo}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$refs.servFile.clearFiles();
                this.servFileForm.fileName = '';
                this.servHaveFlag = false;
                this.servHaveBtnFlag = false;
                this.confObjFlag = true;
                this.confObjBtnFlag = true;
                this.confObj = res.data;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 继续修改 downloadOrderUpServeMoneyData
      confObjUpdate () {
        this.chooiceServFlag = true;
        this.confObjFlag = false;
        this.confObjBtnFlag = false;
        this.servConFlag = false;
        this.servConBtnFlag = false;
        this.servHaveFlag = false;
        this.servHaveBtnFlag = false;
      },
      servTotalDown (id) {
        api.postsign(this.apiPath.hrsc.originalDownload, id).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      servSucDown (id) {
        api.post(this.apiPath.hrsc.downloadOrderUpServeMoneyData, {batchNo: id, impResult: 1}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      servFailDown (id) {
        api.post(this.apiPath.hrsc.downloadOrderUpServeMoneyData, {batchNo: id, impResult: 2}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
