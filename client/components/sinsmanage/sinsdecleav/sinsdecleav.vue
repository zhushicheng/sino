<template>
  <!--<div>社保申报审核</div>-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">合计</div>
          <div class="sino-tabs-item" @click="prodScheFun">详情</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="sinsDeclForm" ref="sinsDeclForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="单位社保账号：" class="search-inner-item" prop="unitSinsNo">
                <sino-input class="fl" type="text"
                            v-model="sinsDeclForm.unitSinsNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="社保账户名称：" class="search-inner-item" prop="sinsAcctName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="findSinsAcctName"
                             :chooseName.sync="sinsDeclForm.sinsAcctName"
                             :chooseId.sync="sinsDeclForm.sinsAcctId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="执行地区：" class="search-inner-item" prop="areaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaUrl"
                             :chooseName.sync="sinsDeclForm.areaName"
                             :chooseId.sync="sinsDeclForm.areaId"
                             :data="{data: {areaTypes:[4,5]}}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="eavFun"><i class="iconfont sino-queren"></i>审核通过</sino-button>
            <sino-button type="icon-text" @click="conFun"><i class="iconfont sino-zhangdan-copy"></i>差异对比</sino-button>
            <sino-button type="icon-text" @click="downFun"><i class="iconfont sino-download-copy"></i>下载申报表</sino-button>
          </div>
        </div>
        <div class="sino-queryspan">
          <span>合计：<em>{{total === null? 0 : total}}</em> 条
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            已勾选：<em>{{checkedArr.length}}</em> 条
          </span>
        </div>
        <sino-table :data="sinsDeclData" class="table-have-no-margin" border max-height="416" stripe v-on:selection-change="selectCallBack" v-on:viewAll="viewAll">
          <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60"></sino-table-column>
          <sino-table-column prop="unitSinsNo" label="单位社保账号" min-width="150"></sino-table-column>
          <sino-table-column prop="sinsAcctName" label="社保账户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="executeAreaName" label="执行地区" min-width="180"></sino-table-column>
          <sino-table-column prop="chargeEndDay" label="截单日"></sino-table-column>
          <sino-table-column prop="addPeoCount" label="增加人数"></sino-table-column>
          <sino-table-column prop="deletePeoCount" label="减少人数"></sino-table-column>
          <sino-table-column prop="supplyPeoCont" label="补缴人数"></sino-table-column>
          <sino-table-column prop="adjustBasePeoCount" label="调基人数"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--差异对比-->
    <sino-dialog :visible.sync="conFlag" size="small" class="batch-import" @close="uploadClose">
      <sino-title slot="title" type="levelOne" title="差异比对" class="sino-dialog-title"></sino-title>
      <sino-form class="demo-ruleForm" :model="uploadForm" ref="uploadForm">
        <sino-form-item prop="executeAreaName" label="执行地区：" class="area-top-form" :rules="{required: true, message: '执行地区为必填项', trigger: 'change'}">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="apiPath.hrsc.findAreaListByBusiAreaType"
                       :chooseName.sync="uploadForm.executeAreaName"
                       :chooseId.sync="uploadForm.executeAreaId"
                       :data="{data: {busiAreaTypes: [1,2]}}"
                       :clear="true"></sino-select>
        </sino-form-item>
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
        <sino-button class="clear mgauto" type="primary" @click="upBankData">确 定</sino-button>
      </sino-form>
    </sino-dialog>
    <sino-dialog :visible.sync="importVisible" class="dialog-auto">
      <sino-title slot="title" type="levelOne" title="差异比对"></sino-title>
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
      <span slot="footer">
              <sino-button type="primary" @click="confirm">确 定</sino-button>
          </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
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
        areaUrl: this.apiPath.hrsc.findAreaList,
        fileAction: this.apiPath.hrsc.uploadFilePublic,
        findSinsAcctName: this.apiPath.sins.findSinsAcctName,
        uploadHeader: {Token: ""},
        checkedArr: [],
        sinsDeclForm: {
          unitSinsNo: '',
          sinsAcctName: '',
          areaId: '',
          areaName: ''
        },
        sinsDeclData: null,
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
        conFlag: false,
        importVisible: false,
        uploadForm: {
          executeAreaName: '',
          executeAreaId: '',
          fileUniqueNo: '',
          fileName: ''
        },
        confObj: {},
        activeOnyNum: ''
      };
    },
    created () {
      this.uploadHeader.Token = Cookie.get('Token');
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      prodScheFun (order) {
        let arr;
        if (this.checkedArr && this.checkedArr.length > 0) {
          arr = this.checkedArr.map(function (item) {
            return item.sinsAcctId;
          });
        }
        this.$router.push({path: '/sinsDeclEavDetail', query: {sinsAcctIds: arr}});
      },
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
        if ((this.checkedArr.length > 0)) {
          for (var i = 0; i < this.checkedArr.length; i++) {
            if (this.checkedArr[i].flag === 1) {
              this.checkedArr.splice(i);
              return;
            }
          }
        }
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.sinsDeclForm
        };
        api.post(this.apiPath.sins.checkDeclareTotal, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.sinsDeclData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 差异对比
      conFun () {
        this.conFlag = true;
      },
      upBankData () {
        this.$refs.uploadForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.sins.differenceComparison, this.uploadForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.fileUniqueNo = res.data;
                this.importVisible = true;
                this.confObj = res.data;
                this.confObj.fileName = this.uploadForm.fileName;
                this.conFlag = false;
              }
            });
          }
        });
      },
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.uploadForm.fileName = file.name;
        } else {
          this.$refs.fileNameFile.clearFiles();
        }
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.activeOnyNum = res.data;
          this.uploadForm.fileUniqueNo = res.data;
        } else {
          this.uploadForm.fileName = '';
          this.$alert(res.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
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
          }
        });
      },
      confirm () {
        this.importVisible = false;
        this.conFlag = false;
        this.uploadForm.fileName = '';
      },
      downTotalFun () {
        api.postsign(this.apiPath.sins.uploadContExcelAction, this.activeOnyNum).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      updataDownFun (url) {
        api.download(url);
      },
      // 审核通过
      eavFun () {
        if (!this.checkedArr || this.checkedArr.length < 1) {
          this.$alert('请选择至少一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let custSinsIdsList = this.checkedArr.map(function (list) {
          return list.sinsAcctId;
        });
        api.post(this.apiPath.sins.checkTotalUpdateState, {custSinsIdList: custSinsIdsList}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '审核通过！', type: 'success'});
            this.searchFun();
          }
        });
      },
      // 下载申报表
      downFun () {
        if (this.checkedArr.length < 1) {
          this.$alert('请选择社保信息。', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        }
        let arr = this.checkedArr.map(function (item) {
          return item.sinsAcctId;
        });
        api.post(this.apiPath.sins.downloadApplyAuditExcel, {custSinsIdList: arr}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      uploadClose () {
        this.$refs.fileNameFile.clearFiles();
        this.$refs.uploadForm.resetFields();
      }
    }
  };
</script>
