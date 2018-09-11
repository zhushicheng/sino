<template>
  <div class=" invinfo">
    <sino-con>
      <sino-title type="levelOne" title="雇员银行卡查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">雇员唯一号：</span>
              <sino-input class="fl" type="text" v-model="searchForm.uniqNo"
                          :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">雇员姓名：</span>
              <sino-input type="text" class="fl" v-model="searchForm.empName"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">银行类型：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                           :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                           :chooseName.sync="searchForm.bankName" :chooseId.sync="searchForm.bankType"
                           :data="{title: ''}" :clear="true" :url="bankTypeSelectBoxInfo"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">证件号码：</span>
              <sino-input type="text" class="fl" v-model="searchForm.certNo"
                          :disabled="false"></sino-input>
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
    <div class="sino-table-total sino-table-total mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left"  >
          <sino-button type="icon-text" @click="del()"><i class="iconfont sino-invalid"></i>失效
          </sino-button>
          <sino-button type="icon-text" @click="importFun()" size="small"><i class="iconfont sino-import fs19"></i>批量导入
          </sino-button>
          <sino-button type="icon-text" @click="download()"><i class="iconfont sino-download-copy fs19"></i>下载模板
          </sino-button>
        </div>
      </div>
      <sino-table :data="tableData" stripe border @select="selectTabelRow" max-height="416" v-on:viewAll="getList">
        <sino-table-column type="selection"></sino-table-column>
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="uniqNo" label="雇员唯一号" min-width="105"></sino-table-column>
        <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
        <sino-table-column prop="cardOwner" label="卡主姓名"></sino-table-column>
        <sino-table-column prop="bankTypeName" label="银行类型"></sino-table-column>
        <sino-table-column prop="bankNo" label="银行卡号" min-width="200"></sino-table-column>
        <sino-table-column prop="isEffectName" label="是否有效"></sino-table-column>
        <sino-table-column label="操作" align="center" fixed="right">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="see(scope.row)" v-if="scope.row.isEffect === 1">查看</span>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                 :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                 :total="page.total"></sino-page>
    </div>
    <!--批量导入-->
    <sino-dialog :visible.sync="importFormFlag" size="small" class="leads-follow remilead-wid" v-on:close="resetFun('importForm')">
      <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
      <sino-form :model="importForm" ref="importForm" class="follow-select import-form" :rules="importRules">
        <sino-form-item prop="fileName" label="数据文件：" class="sino-form-item1">
          <sino-upload
            ref="fileNameFile"
            :action="fileAction"
            :show-file-list="true"
            :auto-upload="false"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :on-error="fileError"
            :on-remove="fileRemove"
            :headers="uploadHeader"
          >
            <div slot="trigger">
              <input class="uploadFileBox" type="text" readonly="true" v-model="importForm.fileName">
              <div class="chooseFileButton">上传</div>
            </div>
          </sino-upload>
        </sino-form-item>
        <!--<div class="file-batch-del" v-show="modifyAndAddForm.fileName"><i-->
          <!--class="iconfont sino-clip ml40"></i><span>{{modifyAndAddForm.fileName}}</span> <span class="file-del-btn"-->
          <!--v-on:click="delFile('fileNameFile', 'fileName')">删除</span>-->
        <!--</div>-->
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" :disabled="grayDisFlag" @click="upBankData">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--选择银行卡用途-->
    <sino-dialog :visible.sync="bankCardFlag" size="small" class="leads-follow remilead-wid" v-on:close="resetForm('bankCardForm')">
      <sino-title slot="title" type="levelOne" title="选择银行卡用途" class="sino-dialog-title"></sino-title>
      <sino-form :model="bankCardForm" ref="bankCardForm" class="follow-select import-form" :rules="bankCardRules">
        <sino-form-item prop="bankCardUseList" label="用途：" class="sino-form-item1">
          <input type="hidden" v-model="bankCardForm.fileNo">
          <sino-checkbox-group v-model="bankCardForm.bankCardUseList" class="mt5">
            <sino-checkbox :label="list.id" v-for="(list, index) in bankCardUseList" :key="index">{{list.title}}</sino-checkbox>
          </sino-checkbox-group>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" :disabled="bankCardBtnFlag" @click="bankCardFun">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--批量导入查看-->
    <sino-dialog :visible.sync="importVisible" class="dialog-auto">
      <sino-title slot="title" type="levelOne" title="批量导入"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
            <li>
              <h6>导入文件名称</h6>
              <input v-model="modifyAndAddForm.fileName">
            </li>
            <li>
              <h6>导入数据数量</h6>
              <span><div class="file-upload-see"><i v-text="modifyAndAddForm.impCount" ></i><i v-show="modifyAndAddForm.impCount>0" class="file-del-btn" v-on:click="importNumDown">下载</i></div></span>
            </li>
            <li>
              <h6>成功数量</h6>
              <span><div class="file-upload-see"><i v-text="modifyAndAddForm.yesImpCount" ></i><i v-show="modifyAndAddForm.yesImpCount>0" class="file-del-btn" v-on:click="importSuccDown">下载</i></div></span>
            </li>
            <li>
              <h6>失败数量</h6>
              <span><div class="file-upload-see"><i v-text="modifyAndAddForm.noImpCount" ></i><i  v-show="modifyAndAddForm.noImpCount>0" class="file-del-btn" v-on:click="importErrDown">下载</i></div></span>
            </li>
            <li>
              <h6>导入人</h6>
              <input v-model="modifyAndAddForm.impPerName">
            </li>
            <li>
              <h6>导入时间</h6>
              <input v-model="modifyAndAddForm.impTime">
            </li>
        </ul>
      </div>
      <span slot="footer">
        <sino-button type="primary" @click="confirm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--查看银行卡-->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc" v-on:close="seeItem = false">
      <sino-title slot="title" type="levelOne" title="查看银行卡" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list ">
        <ul class="usermanagement-ul">
          <li>
            <h6>雇员唯一号</h6><input v-model="seeDirData.uniqNo">
          </li>
          <li>
            <h6>雇员姓名</h6><input v-model="seeDirData.empName">
          </li>
          <li>
            <h6>证件类型</h6><input v-model="seeDirData.certTypeName">
          </li>
          <li>
            <h6>证件号码</h6><input v-model="seeDirData.certNo">
          </li>
          <li>
            <h6>卡主姓名</h6><input v-model="seeDirData.cardOwner">
          </li>
          <li>
            <h6>开户行名称</h6><input v-model="seeDirData.acctBankName">
          </li>
          <li>
            <h6>银行类型</h6><input v-model="seeDirData.bankTypeName">
          </li>
          <li>
            <h6>银行卡号</h6><input v-model="seeDirData.bankNo">
          </li>
          <li>
            <h6>创建人</h6><input v-model="seeDirData.creName">
          </li>
          <li>
            <h6>创建时间</h6><input v-model="seeDirData.creTime">
          </li>
        </ul>
      </div>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  let getPageInfo = function (obj, page) {
    obj.pageNum = page.pageNum;
    obj.pageSize = page.pageSize;
  };
  let callTip = function (_this, type, msg) {
    _this.modifyAndAdd = false;
    _this.$alert(msg, '提示信息', {
      confirmButtonText: '确 定',
      type: type, // icon图标类型
      dragFlag: true,
      customClass: '', // 添加class
      lockScroll: true,
      callback: action => {
      }
    });
  };
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
  let checkedArr = [];
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        bankTypeSelectBoxInfo: this.apiPath.hrsc.bankTypeSelectBoxInfo,
        selectBox: this.apiPath.hrsc.selectBox, // g
        importVisible: false,
        bankInfoDropdown: this.apiPath.hrsc.bankInfoDropdown,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        uploadHeader: {Token: ""},
        searchForm: { // 搜索条件
          empName: '',
          uniqNo: '',
          bankName: '',
          bankType: '',
          certNo: ''
        },
        taxpayerTypeData: {code: 'TAXPAYER_TYPE'},
        tableData: null, // 表格数据
        page: { // 分页数据
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
        },
        seeItem: false, // 查看弹层控制显示
        seeDirData: {}, // 查看弹层的数据
        importFormFlag: false, // 导入，添加控制弹层显示
        modifyAndAddForm: {
          impCount: '', // 导入总数
          yesImpCount: '', // 成功导入数量
          noImpCount: '', // 失败数量
          impPerName: '', // 导入人用户名
          impTime: '', // 导入时间
          batchNo: '', // 批次号
          taxPayerTrc: ''
        },
        importForm: {
          fileName: '' // 导入文件名
        },
        activeBatchNo: '',
        importRules: {
          fileName: [
            {required: true, message: '请选择数据文件', trigger: 'change'}
          ]
        },
        grayDisFlag: false,
        bankCardFlag: false,
        bankCardForm: {
          fileNo: '',
          bankCardUseList: []
        },
        bankCardRules: {
          bankCardUseList: [
            {type: 'array', required: true, message: '请选择用途', trigger: 'change'}
          ]
        },
        bankCardUseList: [],
        bankCardBtnFlag: false
      };
    },
    created () {
      this.uploadHeader.Token = Cookie.get('Token');
      api.post(this.dictSelUrl, {code: 'BANK_CARD_USE'}).then(res => {
        this.bankCardUseList = res.data.list;
      });
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      importErrDown () {
        api.post(this.apiPath.hrsc.epmExportExcelFail, {"batchNo": this.activeBatchNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      importNumDown () {
        api.post(this.apiPath.hrsc.empExportExcelAll, {"batchNo": this.activeBatchNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      importSuccDown () {
        api.post(this.apiPath.hrsc.epmExportExcelSucc, {"batchNo": this.activeBatchNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      // 导入确定
      upBankData () {
        if (this.grayDisFlag) {
          return;
        }
        this.$refs.importForm.validate((valid) => {
          if (valid) {
            this.grayDisFlag = true;
            this.$refs.fileNameFile.submit();
          }
        });
      },
      confirm () {
        this.importVisible = false;
        this.searchFun();
      },
      downloadFile (name) {
        let obj = {};
        obj.fileUniqueNo = this.seeDirData[name];
        api.get(this.apiPath.hrsc.invMatFileDownload, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectTabelRow (selection, row) {
        checkedArr = selection;
      },
      download () {
        let _this = this;
        api.postsign(_this.apiPath.hrsc.downloadByType, 21).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      searchFun () {
        this.page.pageNum = 1;
        this.getList();
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
        this.$refs.fileNameFile.uploadFiles = [];
        this.importForm.fileName = '';
      },
      getList () {
        let obj = {
          data: this.searchForm
        };
        getPageInfo(obj, this.page);
        api.post(this.apiPath.hrsc.bcAll, obj).then(res => {
          this.tableData = res.data.list;
         // console.log(this.tableData);
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      choooseNum (pageSize) {
//        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.getList();
      },
      add () {
        this.modifyAndAdd = true;
        this.formState = 'add';
      },
      // 修改
      importFun () {
        this.importFormFlag = true;
      },
      see (data) {
        let obj = {};
        obj.empBankCardId = data.empBankCardId;
        api.post(this.apiPath.hrsc.bcFind, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeItem = true;
            this.seeDirData = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 失效
      del (data) {
        let obj = {};
        if (checkedArr.length > 0) {
          this.$alert('确定失效这些信息吗？', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              obj.empBankCardId = checkedArr[0].empBankCardId;
              api.post(this.apiPath.hrsc.bcDelete, obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  checkedArr = [];
                  this.$message({message: '数据已失效！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        } else {
          this.$alert('请勾选你要操作的信息项！', '提示信息', {
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
      delFile (form, name) {
        this.$refs[form].clearFiles();
        this.modifyAndAddForm[name] = '';
        this.modifyAndAddForm[name + 'Name'] = '';
      },
      getFileName (file, filelist) {
        if (checkImgFileType(file, this)) {
          if (filelist.length > 1) {
            filelist = filelist.splice(0, 1);
          }
          this.importForm.fileName = file.name;
        } else {
          this.$refs.fileNameFile.clearFiles();
        }
      },
      fileSuccess (res, file) {
        if (res.code === 'CPYY-00001') {
          this.bankCardForm.fileNo = res.data;
          this.grayDisFlag = false;
          this.importForm.fileName = file.name;
          this.importFormFlag = false;
          this.bankCardFlag = true;
        } else {
          this.importForm.fileName = '';
          this.grayDisFlag = false;
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
        this.grayDisFlag = false;
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
      fileRemove () {
        this.importForm.fileName = '';
      },
      // 用途确定
      bankCardFun () {
        if (this.bankCardBtnFlag) {
          return;
        }
        this.$refs.bankCardForm.validate((valid) => {
          if (valid) {
            this.bankCardBtnFlag = true;
            api.post(this.apiPath.hrsc.inputBankCardExcel, this.bankCardForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.modifyAndAddForm = res.data;
                this.bankCardFlag = false;
                this.importVisible = true;
                this.bankCardBtnFlag = false;
                this.activeBatchNo = res.data.batchNo;
              } else {
                this.bankCardBtnFlag = false;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      }
    }
  };
</script>
