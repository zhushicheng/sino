<template>
  <div class="leads usermanage">
    <sino-con>
      <sino-title type="levelOne" title="系统模版查询"></sino-title>
      <sino-form :model="leadsForm" ref="leadsForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">模版类型：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :chooseName.sync="leadsForm.fileTypeName"
                           :chooseId.sync="leadsForm.fileType"
                           :clear="true"
                           :url="dictUrl"
                           :data="{code: 'FILE_TEMP_TYPE'}"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">模版名称：</span>
              <sino-input class="fl" type="text" v-model="leadsForm.fileName"></sino-input>

            </li>
            <li>
              <span class="search-inner-name">版本号：</span>
              <sino-input class="fl" type="text" v-model="leadsForm.version"></sino-input>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchButFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-table-total sino-table-radio mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left">
          <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增</sino-button>
        </div>
      </div>
      <sino-table :data="tableData" v-on:viewAll="viewAll" stripe border max-height="416">
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="fileTypeName" label="模版类型" min-width="100"></sino-table-column>
        <sino-table-column prop="fileName" label="模板名称" min-width="100"></sino-table-column>
        <sino-table-column prop="remark" label="备注描述" min-width="105"></sino-table-column>
        <sino-table-column prop="version" label="版本号" min-width="105"></sino-table-column>
        <sino-table-column label="操作" align="center" width="205" fixed="right">
          <template scope="scope">
            <div v-if="scope.row.oper === true">
              <span class="table-span" @click="seeFun(scope.row)">查看历史版本</span><i class="table-i">|</i>
              <span class="table-span" @click="modifyFun(scope.row)">修改</span><i class="table-i">|</i>
              <span class="table-span" @click="deleteMess(scope.row)">删除</span>
            </div>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler"
                 :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                 :total="total"></sino-page>
    </div>
    <!--新增-->
    <sino-dialog :visible.sync="leadsAdd"  size="small" v-on:close="modifyClose" >
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title "></sino-title>
      <div class="leadsAdd-form">
        <sino-form :model="leadsAddForm" :rules="rules" ref="leadsAddForm" class="leadsAdd-Form">
          <sino-form-item label="模版类型：" prop="fileTypeName">
            <sino-select
              :filterable="true"
              :multiselect="false"
              :isshowTotol="false"
              :totalNum="false"
              :isPage="true"
              :isGroup="false"
              :chooseName.sync="leadsAddForm.fileTypeName"
              :chooseId.sync="leadsAddForm.fileType"
              :clear="true"
              :url="dictUrl" :data="{code:'FILE_TEMP_TYPE'}"></sino-select>
          </sino-form-item>
          <sino-form-item label="模版名称："   prop="fileName">
            <sino-input type="text"  :disabled="false" v-model="leadsAddForm.fileName"></sino-input>
          </sino-form-item>
          <sino-form-item label="备注描述：" class="sino-form-item-width"  prop="remark">
            <sino-input type="textarea" v-model="leadsAddForm.remark" :disabled="false"></sino-input>
          </sino-form-item>
          <sino-form-item  label="上传文件：" prop="uniqNo" class="sino-form-item-width is-required">
            <sino-upload
              class="upload-demo"
              ref="batchUpload"
              :action="uploadUrl"
              :show-file-list="false"
              :auto-upload="true"
              :on-change="getFileName1"
              :on-success="fileSuccess1"
              :on-error="fileError1"
            >
              <div slot="trigger">
                <input type="hidden" v-model="leadsAddForm.uniqNo">
                <input class="uploadFileBox" type="text" v-model="name"  readonly='true'/>
                <span class="chooseFileButton">上传</span>
              </div>
            </sino-upload>
          </sino-form-item>
        </sino-form>
        <div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm('leadsAddForm')">{{leadsbtn}}</sino-button>
      </span>
    </sino-dialog>
    <!--查看历史版本-->
    <sino-dialog :visible.sync="seeItem" size="small" class="leads-follow dialog-item" >
      <sino-title slot="title" type="levelOne" title="查看版本信息" class="sino-dialog-title"></sino-title>
      <sino-form :model="downloadForm" ref="downloadForm"  class="follow-select">
        <div class="follow-content">
          <sino-form-item label="选择查看版本号：" prop="version">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :clear="true"
                         :data="versionData"
                         :linkage="true"
                         :url="apiPath.hrsc.dropByType"
                         :chooseName.sync="downloadForm.versionTitle"
                         :chooseId.sync="downloadForm.versionId"
            >
            </sino-select>
          </sino-form-item>
        </div>
      </sino-form>
      <span slot="footer" class="dialog-footer">

        <sino-button type="primary" @click="downSubmitFun">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  let _filelist = {};
  let _conEncId = [];

  export default {
    components: {},
    data () {
      return {
        fileNameData: {
          data: {
            title: ''
          }
        },
        name: '', // 上传文件的名字
        dropName: this.apiPath.hrsc.dropName,
        pageFile: this.apiPath.hrsc.pageFile,
        saveFile: this.apiPath.hrsc.saveFile,
        dictUrl: this.apiPath.hrsc.getDictSelectBox,
        uploadUrl: this.apiPath.hrsc.uploadFilePublic,
        headerToken: {"Token": Cookies.get('Token')},
        ProviderName: '',
        custUrl: this.apiPath.hrsc.findCustSelectInfo,
        downloadForm: {
          versionTitle: '',
          versionId: '',
          uniqNo: ''
        },
        leadsForm: {
          fileType: '', // 模版类型
          fileTypeName: '',
          fileName: '', // 模版名称
          version: '' // 版本
        },
        tableData: null,
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
        // 弹层title
        alertTitle: '',
        // 弹层button
        leadsbtn: '',
        leadsAddForm: {
          fileTypeName: '',
          fileType: '',
          fileName: '',
          version: '',
          uniqNo: ''
        },
        // 校验wxy
        rules: {
          fileName: [
            { required: true, message: '请输入文件模版名称', trigger: 'blur' }
          ],
          fileTypeName: [
            { required: true, message: '请选择文件模板类型', trigger: 'change' }
          ],
          uniqNo: [
            { required: true, message: '请上传文件', trigger: 'change' }
          ]
        },
        seeForm: {},
        // 添加弹层
        leadsAdd: false,
        // 控制查看弹层的显示
        seeItem: false,
        versionData: {
          data: {
            fileType: ''
          }
        }
      };
    },
    created () {
      // 获取角色ID和机构ID
      api.post(this.apiPath.author.findCurrUserRole, {token: Cookies.get('Token')}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.fllowData.orgId = res.data.orgId;
          this.ProviderName = res.data.userName;
          this.currUserRoleId = res.data.userRoleId;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      // upload file
      downSubmitFun () {
        this.seeItem = false;
        console.log(this.downloadForm.versionId);
        api.postsign(this.apiPath.hrsc.downloadById, this.downloadForm.versionId).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          this.$alert('下载失败！', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          console.log(err);
        });
      },
      submitUpload () {
        this.$refs.batchUpload.submit();
      },
      getFileName1 (file) {
        this.name = file.name;
      },
      fileSuccess1: function (res, file, filelist) {
        _filelist = filelist;
        if (res.code === 'CPYY-00001') {
          this.leadsAddForm.uniqNo = res.data;
        }
      },
      fileError1: function (error) {
        this.addBusConForm.otherEncFlag = false;
      },
      // newlyModifyDialog Empty
      modifyClose: function () {
        this.$refs.leadsAddForm.resetFields();
        this.$refs.batchUpload.clearFiles();
        this.name = '';
      },
      // getAllTableMessage
      viewAll () {
        let obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: this.leadsForm
        };
        api.post(this.apiPath.hrsc.pageFile, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // clear from
      clearFrom: function (clearFrom) {
        for (var i in clearFrom) {
          clearFrom[i] = "";
        }
      },
      // selectOne
      searchButFun () {
        this.pageNum = 1;
        this.viewAll();
      },
      // delect Message
      deleteMess: function (data) {
        this.$alert('确定删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            if (action === 'cancel') { return; }
            api.postsign(this.apiPath.hrsc.deleteFile, data.id).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchButFun();
                this.$message({message: '删除成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // modify
      modifyFun: function (data) {
        this.alertTitle = '修改系统模板';// 信息两字放不开，应该修改dialog，title宽度
        this.leadsbtn = '修 改';
        this.leadsAdd = true;
        api.postsign(this.apiPath.hrsc.findByIdFile, data.id).then(res => {
          console.log(res.data);
          this.leadsAddForm = res.data;
          this.name = res.data.name;
        }).catch(err => {
          console.log(err);
        });
      },
      // page
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll();
      },
      // page
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll();
      },
      addFun: function () {
        this.leadsAdd = true;
        this.alertTitle = '新增系统模板';
        this.leadsbtn = '确 定';
      },
      // history
      seeFun (data) {
        this.seeItem = true;
        let that = this;
        setTimeout(function () {
          that.versionData.data.fileType = data.fileType;
        });
      },
      // addSubmitButton
      submitForm (formName) {
        this.$refs.leadsAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增系统模板') {
              api.post(this.apiPath.hrsc.saveFile, this.leadsAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.leadsAdd = false;
                  this.searchButFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else if (this.alertTitle === '修改系统模板') {
              api.post(this.apiPath.hrsc.saveFile, this.leadsAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.leadsAdd = false;
                  this.searchButFun();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>
