<template>
  <!--<div>社保申报合计</div>-->
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
      <sino-form :model="accuauditForm" ref="accuauditForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="单位社保账号：" class="search-inner-item" prop="unitSinsNo">
                <sino-input class="fl" type="text"
                            v-model="accuauditForm.unitSinsNo"
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
                             :chooseName.sync="accuauditForm.sinsAcctName"
                             :chooseId.sync="accuauditForm.sinsAcctId"
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
                             :chooseName.sync="accuauditForm.areaName"
                             :chooseId.sync="accuauditForm.areaId"
                             :data="{data: {areaTypes:[4,5]}}"
                             :clear="true" @change="areaChangeFun"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="所属社保局：" class="search-inner-item" prop="ssbName">
                <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                             :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                             :chooseName.sync="accuauditForm.ssbName" :chooseId.sync="accuauditForm.ssbId" :data="ssbData"
                             :clear="true" :url="findSsbSelectBox"></sino-select>
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
          <div class="sino-table-icon-left long-sino-table-icon-left table-sino-button-tab">
            <sino-button type="icon-text" @click="declare"><i class="iconfont sino-textFile"></i>申报</sino-button>
            <sino-button type="icon-text" @click="declarePubFun('applySuccTotal')"><i class="iconfont sino-queren"></i>申报成功</sino-button>
            <sino-button type="icon-text" @click="receiptPubFun('receipt')"><i class="iconfont sino-huizhi"></i>回单</sino-button>
            <sino-button type="icon-text" @click="importProb"><i class="iconfont sino-import"></i>导入问题人员</sino-button>
            <sino-button type="icon-text" @click="downDeclarForm"><i class="iconfont sino-download-copy"></i>下载申报表</sino-button>
            <sino-button type="icon-text" @click="downPlateForm"><i class="iconfont sino-download-copy"></i>下载导盘表</sino-button>
            <sino-dropdown trigger="click" @visible-change="dropdownDel" class="table-top-dropdown1 el-dropdown-no-stroke" @command="handleCommand" style="top:-16px;left:-10px;">
              <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false" :class="{'is-active':dropdown === true,'is-delete':dropdown === false}">
                <i class="iconfont sino-invalid"></i>取消操作<i class="iconfont sino-unie628"></i>
              </span>
              <sino-dropdown-menu>
                <sino-dropdown-item command="1" class="dropdown-item-no-border">取消申报</sino-dropdown-item>
                <sino-dropdown-item command="2" class="dropdown-item-no-border">取消回单</sino-dropdown-item>
                <sino-dropdown-item command="3" class="dropdown-item-no-border">审核退回</sino-dropdown-item>
                <sino-dropdown-item command="4" class="dropdown-item-no-border">取消申报成功</sino-dropdown-item>
              </sino-dropdown-menu>
            </sino-dropdown>
          </div>
        </div>
        <div class="sino-queryspan">
          <span>合计：<em>{{total? total : 0}}</em> 条
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            已勾选：<em>{{checkedArr.length}}</em> 条
          </span>
        </div>
        <sino-table :data="sinsDeclData" border max-height="475" stripe v-on:selection-change="selectCallBack" v-on:viewAll="viewAll">
          <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60"></sino-table-column>
          <sino-table-column prop="unitSinsNo" label="单位社保账号" min-width="120"></sino-table-column>
          <sino-table-column prop="sinsAcctName" label="社保账户名称" min-width="120"></sino-table-column>
          <sino-table-column prop="ssbName" label="所属社保局" min-width="120"></sino-table-column>
          <sino-table-column prop="areaName" label="执行地区" min-width="120"></sino-table-column>
          <sino-table-column prop="addPeoCount" label="新增人数" min-width="100"></sino-table-column>
          <sino-table-column prop="delPeoCount" label="减少人数" min-width="100"></sino-table-column>
          <sino-table-column prop="waitReportCount" label="待申报" min-width="100"></sino-table-column>
          <sino-table-column prop="reportingCount" label="申报中" min-width="100"></sino-table-column>
          <sino-table-column prop="reportSuccCount" label="申报成功" min-width="100"></sino-table-column>
          <sino-table-column prop="problemPeopleCount" label="问题人员" min-width="100"></sino-table-column>
          <sino-table-column prop="isReceiptedName" label="回单" min-width="100"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--导入问题人员-->
    <sino-dialog :visible.sync="conFlag" class="batch-error" v-on:close="resetForm('conForm')">
      <sino-title slot="title" type="levelOne" :title="title" class="sino-dialog-title"></sino-title>
      <sino-form :model="conForm" ref="conForm" :rules="conRules">
        <sino-form-item prop="fileName" label="上传文件：" class="sino-form-item-width">
          <sino-upload
            ref="fileNameFile"
            :action="uploadUrl"
            :show-file-list="true"
            :auto-upload="false"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :on-error="fileError"
            :on-remove="fileRemove"
            :headers="uploadHeader"
          >
            <div slot="trigger">
              <input type="hidden" v-model="conForm.fileId">
              <input class="uploadFileBox" type="text" readonly="true" v-model="conForm.fileName"/>
              <div class="chooseFileButton">上传</div>
            </div>
          </sino-upload>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="upBankData" :disabled="fileBtn">确 定</sino-button>
        </span>
    </sino-dialog>
    <sino-dialog :visible.sync="importVisible" class="dialog-auto">
      <sino-title slot="title" type="levelOne" :title="article"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>导入文件名称</h6>
            <span v-text="conDetailForm.fileName"></span>
            <input type="hidden" v-model="conDetailForm.fileUniqNo">
          </li>
          <li>
            <h6>导入数据数量</h6>
            <span><div class="file-upload-see"><i v-text="conDetailForm.totalNum" ></i><i v-show="conDetailForm.totalNum>0" class="file-del-btn" v-on:click="importNumDown">下载</i></div></span>
          </li>
          <li>
            <h6>成功数量</h6>
            <span><div class="file-upload-see"><i v-text="conDetailForm.succNum" ></i><i v-show="conDetailForm.succNum>0" class="file-del-btn" v-on:click="importSuccDown">下载</i></div></span>
            <input type="hidden" v-model="conDetailForm.succPath">
          </li>
          <li>
            <h6>失败数量</h6>
            <span><div class="file-upload-see"><i v-text="conDetailForm.failNum" ></i><i  v-show="conDetailForm.failNum>0" class="file-del-btn" v-on:click="importErrDown">下载</i></div></span>
            <input type="hidden" v-model="conDetailForm.failPath">
          </li>
          <li>
            <h6>导入人</h6>
            <span v-text="conDetailForm.operName"></span>
          </li>
          <li>
            <h6>导入时间</h6>
            <span v-text="conDetailForm.impTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer">
        <sino-button type="primary" @click="confirmFun">确 定</sino-button>
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
        findSsbSelectBox: this.apiPath.sins.findSsbSelectBox,
//        fileAction: this.apiPath.accu.uploadContExcelAction, // 文件上传
        uploadUrl: this.apiPath.hrsc.uploadFilePublic,
        fileAction: this.apiPath.sins.impQuestionPeo, // 文件上传
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        findSinsAcctName: this.apiPath.sins.findSinsAcctName,
        checkedArr: [],
        ssbData: {areaId: ''},
        accuauditForm: {
          unitSinsNo: '',
          sinsAcctName: '',
          sinsAcctId: '',
          areaName: '',
          areaId: '',
          ssbName: '',
          ssbId: ''
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
        activeName: 'first',
        uploadData: '',
        uploadHeader: {Token: ""},
        conFlag: false,
        importVisible: false,
        conForm: {
          fileName: '',
          fileId: ''
        },
        conRules: {
          fileName: [
            {required: true, message: '请选择数据文件', trigger: 'change'}
          ]
        },
        conDetailForm: {
          failPath: '',
          failNum: '',
          succPath: '',
          succNum: '',
          totalNum: '',
          fileName: '',
          impTime: '',
          operName: '',
          fileUniqNo: ''
        },
        dropdown: false,
        article: '',
        title: '',
        dialogPush: '',
        fileBtn: false
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 执行地区级联所属社保局
      areaChangeFun () {
        this.ssbData.areaId = this.accuauditForm.areaId;
      },
      dropdownDel () {
        this.dropdown = !this.dropdown;
      },
      handleCommand (command) {
        if (command === '1') {
          this.declarePubFun('cancelApplyTotal');
        } else if (command === '2') {
          this.receiptPubFun('cancelReceipt');
        } else if (command === '3') {
          this.declarePubFun('cancelAuditingPassTotal');
        } else {
          this.declarePubFun('cancelApplySuccTotal');
        }
      },
      prodScheFun (order) {
        let arr;
        if (this.checkedArr.length > 0) {
          arr = this.checkedArr.map(function (item) {
            return item.sinsAcctId;
          });
        }
        this.$router.push({path: '/sinsDeclareDetail', query: {sinsAcctIds: arr}});
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
          data: this.accuauditForm
        };
        api.post(this.apiPath.sins.findAllTotal, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.sinsDeclData = res.data.list;
            this.total = res.data.total;
          };
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 判断table是否有选择
      haveSelected () {
        if (!(this.checkedArr && this.checkedArr.length > 0)) {
          this.$alert('请选择至少一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return false;
        } else {
          return true;
        }
      },
      declare () {
        if (this.haveSelected()) {
          let arr = [];
          this.checkedArr.forEach(function (item) {
            if (item.sinsAcctName) {
              arr.push({sinsAcctId: item.sinsAcctId, sinsAcctName: item.sinsAcctName});
            }
          }, this);
          api.post(this.apiPath.sins.findUnauditedBySinsId, arr).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data) {
                this.$confirm(res.data + '账户下存在待审核数据，是否继续申报？', '提示信息', {
                  confirmButtonText: '确 定',
                  cancelButtonText: ' ',
                  type: 'warning'
                }).then(() => {
                  this.declarePubFun('applyTotal');
                }).catch(() => {
                });
              } else {
                this.declarePubFun('applyTotal');
              }
            }
          });
        }
      },
      // 申报公共方法
      declarePubFun (url) {
        if (this.haveSelected()) {
          let arr = this.checkedArr.map(function (item) {
            return item.sinsAcctId;
          });
          api.post(this.apiPath.sins[url], {custSinsIdList: arr}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              let tipString = '操作成功！';
//              if (url === 'applyTotal') {
//                tipString = '操作成功！';
//              } else if (url === 'applySuccTotal') {
//                tipString = '操作成功！';
//              } else if (url === 'cancelAuditingPassTotal') {
//                tipString = '操作成功！';
//              } else {
//                tipString = '操作成功！';
//              }
              this.$message({message: tipString, type: 'success'});
            }
          });
        }
      },
      // 回单公共方法
      receiptPubFun (url) {
        if (this.haveSelected()) {
          let arr = this.checkedArr.map(function (item) {
            return item.sinsAcctId;
          });
          api.post(this.apiPath.sins[url], arr).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data) {
                this.$alert(res.data, '提示信息', {
                  confirmButtonText: '确 定',
                  type: 'warning',
                  dragFlag: true,
                  customClass: '', // 添加class
                  lockScroll: true
                });
              } else {
                this.searchFun();
                let tipString = '操作成功！';
//                if (url === 'receipt') {
//                  tipString = '操作成功！';
//                } else if (url === 'cancelReceipt') {
//                  tipString = '操作成功！';
//                }
                this.$message({message: tipString, type: 'success'});
              }
            }
          });
        }
      },
      receipt () {
      },
      // 导入问题人员
      importProb () {
        if (this.checkedArr.length < 1) {
          this.$alert('请选择一条社保信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        }
        this.title = '导入问题人员';
        this.conFlag = true;
        this.dialogPush = '1';
      },
      downDeclarForm () {
        if (this.checkedArr.length < 1) {
          this.$alert('请选择社保信息', '提示信息', {
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
        api.post(this.apiPath.sins.downloadApplyExcel, {custSinsIdList: arr}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      downPlateForm () {
        if (this.checkedArr && this.checkedArr.length < 1) {
          this.$alert('请选择一条要操作的数据', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
        } else {
          let _arr = [];
          this.checkedArr.forEach(function (list) {
            _arr.push(list.sinsAcctId);
          });
          api.post(this.apiPath.sins.downloadGuide, {custSinsIdList: _arr}).then(res => {
            if (res.code === 'CPYY-00001') {
              api.download(res.data);
            }
          });
        }
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
      // 差异对比
      conFun () {
        this.conFlag = true;
        this.title = '差异比对';
      },
      upBankData () {
        this.$refs.conForm.validate((valid) => {
          if (valid) {
            this.fileBtn = true;
            this.$refs.fileNameFile.submit();
          }
        });
      },
      delFile (form, name) {
        this.$refs[form].clearFiles();
        this.conForm[name] = '';
        this.conForm[name + 'Name'] = '';
      },
      getFileName (file, filelist) {
        if (filelist.length > 1) {
          filelist = filelist.splice(0, 1);
        }
        if (checkImgFileType(file, this)) {
          this.conForm.fileName = file.name;
        } else {
          this.$refs.fileNameFile.clearFiles();
        }
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          let _obj = {
            fileUniqNo: res.data,
            sinsAcctId: this.checkedArr[0].sinsAcctId
          };
          api.postsign(this.apiPath.sins.impQuestionPeo, _obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.conDetailForm = res.data;
              this.importVisible = true;
              this.article = '导入问题人员';
              this.fileBtn = false;
            } else {
              this.fileBtn = false;
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.conForm.fileName = '';
          this.fileBtn = false;
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
      fileRemove (file, filelist) {
        filelist = filelist.splice(filelist.indexOf(file), 1);
        if (filelist.length === 0) {
          this.$refs.fileNameFile.uploadFiles = [];
          this.conForm.fileName = '';
        }
      },
      fileError () {
        this.fileBtn = false;
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
      confirmFun () {
        this.importVisible = false;
        this.conFlag = false;
      },
      importErrDown () {
        api.download(this.conDetailForm.failPath);
      },
      importNumDown () {
        api.postsign(this.apiPath.sins.uploadContExcelAction, this.conDetailForm.fileUniqNo).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      importSuccDown () {
        api.download(this.conDetailForm.succPath);
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
        this.$refs.fileNameFile.uploadFiles = [];
      }
    }
  };
</script>
