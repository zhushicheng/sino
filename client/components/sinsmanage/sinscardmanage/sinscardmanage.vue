<template>
  <!--<div>社保卡管理</div>-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="社保卡查询"></sino-title>
      <sino-form :model="sinsCardForm" ref="sinsCardForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="li-wid search-inner-name">
              <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="findCustSelectInfo"
                             :chooseName.sync="sinsCardForm.custName"
                             :chooseId.sync="sinsCardForm.custId"
                             :clear="true"
                             :token="token"
                             class="multiple-choice"
                ></sino-select>
              </sino-form-item>
            </li>
            <li class="li-wid search-inner-name">
              <sino-form-item label="社保账户名称：" class="search-inner-item" prop="custSinsIdListName">
                <sino-select :filterable="true" class="multiple-choice"
                             :multiselect="true"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="apiPath.sins.findSinsAcctByIds"
                             :chooseName.sync="sinsCardForm.custSinsIdListName"
                             :chooseId.sync="sinsCardForm.custSinsIdList"
                             :data="sinsIdObj"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <!--<li class="search-inner-name">-->
              <!--<sino-form-item label="单位社保账号：" class="search-inner-item" prop="unitNo">-->
                <!--<sino-select :filterable="true"-->
                             <!--:multiselect="false"-->
                             <!--:isshowTotol="false"-->
                             <!--:disabled="false"-->
                             <!--:totalNum="false"-->
                             <!--:isPage="true"-->
                             <!--:isGroup="false"-->
                             <!--:url="findSinsAcctName"-->
                             <!--:chooseName.sync="sinsCardForm.sinsAcctName"-->
                             <!--:chooseId.sync="sinsCardForm.sinsAcctId"-->
                             <!--:clear="true"></sino-select>-->
              <!--</sino-form-item>-->
            <!--</li>-->
            <li class="search-inner-name">
              <sino-form-item label="执行地区：" class="search-inner-item" prop="areaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaUrl"
                             :chooseName.sync="sinsCardForm.areaName"
                             :chooseId.sync="sinsCardForm.areaId"
                             :data="{data: {areaTypes:[4,5]}}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="search-inner-name">
              <sino-form-item label="批次号：" class="search-inner-item" prop="makeCardBatch">
                <sino-input class="fl" type="text"
                            v-model="sinsCardForm.makeCardBatch"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="searchFlag">
                <li>
                  <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                    <sino-input class="fl" type="text"
                                v-model="sinsCardForm.empName"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                    <sino-input class="fl" type="text"
                                v-model="sinsCardForm.certNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="社保卡状态：" class="search-inner-item" prop="sscStateName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="dictSelUrl"
                                 :data="{code: 'SSC_STATE'}"
                                 :chooseName.sync="sinsCardForm.sscStateName"
                                 :chooseId.sync="sinsCardForm.sscState"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="制卡结果：" class="search-inner-item" prop="makeCardResultName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="dictSelUrl"
                                 :data="{code: 'MAKE_CARD_RESULT'}"
                                 :chooseName.sync="sinsCardForm.makeCardResultName"
                                 :chooseId.sync="sinsCardForm.makeCardResult"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="是否有照片：" class="search-inner-item" prop="isPhotoName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="dictSelUrl"
                                 :data="{code: 'IS_HAVE_PHOTO'}"
                                 :chooseName.sync="sinsCardForm.isPhotoName"
                                 :chooseId.sync="sinsCardForm.isPhoto"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="证件是否重复：" class="search-inner-item" prop="isRepeatName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :data="{code: 'IS_REPEAT'}"
                                 :url="dictSelUrl"
                                 :chooseName.sync="sinsCardForm.isRepeatName"
                                 :chooseId.sync="sinsCardForm.isRepeat"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-button-box-1">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
        <div class="search-more">
          <div @click="searchFlag = !searchFlag">
            <i class="iconfont" :class="{'sino-shuangjiantou-copy':!searchFlag,'sino-angle-double-up':searchFlag}"></i>
            <span v-if="!searchFlag">高级查询</span>
            <span v-if="searchFlag">基本查询</span>
          </div>
        </div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="importCardFun"><i class="iconfont sino-import"></i>导入制卡信息</sino-button>
            <sino-button type="icon-text" @click="relationEmpFun"><i class="iconfont sino-guyuan"></i>联系雇员</sino-button>
            <sino-button type="icon-text" @click="markNoCardFun"><i class="iconfont sino-invalid"></i>标记不制卡</sino-button>
            <sino-button type="icon-text" @click="makeCardFun"><i class="iconfont sino-card"></i>制卡</sino-button>
            <sino-button type="icon-text" @click="getCardFun"><i class="iconfont sino-qianbi"></i>社保卡领取</sino-button>
          </div>
        </div>
        <sino-table :data="sinsDeclData" border max-height="416" stripe v-on:selection-change="selectCallBack" v-on:viewAll="viewAll">
          <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="unitSinsNo" label="单位社保账号" min-width="120"></sino-table-column>
          <sino-table-column prop="sinsPerNo" label="社保个人编号" min-width="120"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="170"></sino-table-column>
          <sino-table-column prop="areaName" label="执行地区" min-width="120"></sino-table-column>
          <sino-table-column prop="isPhotoName" label="是否有照片" min-width="120"></sino-table-column>
          <sino-table-column prop="isRepeatName" label="证件是否重复" min-width="120"></sino-table-column>
          <sino-table-column prop="sscIcNo" label="社保IC卡号" min-width="120"></sino-table-column>
          <sino-table-column prop="receiptNo" label="回执单编号" min-width="150"></sino-table-column>
          <sino-table-column prop="sscStateName" label="社保卡状态" min-width="120"></sino-table-column>npm
          <sino-table-column prop="makeCardBatch" label="制卡批次" min-width="120"></sino-table-column>
          <sino-table-column prop="makeCardResultName" label="制卡结果"></sino-table-column>
          <sino-table-column prop="noticeEmpMakeCardName" label="是否联系员工" min-width="120"></sino-table-column>
          <sino-table-column prop="makeCardContTime" label="联系时间" min-width="180"></sino-table-column>
          <sino-table-column prop="sinsAcctName" label="社保账户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="suppName" label="签约供应商" min-width="180"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column label="操作" align="center" width="100" fixed="right">
            <template scope="scope" v-if="scope.row.oper == true">
              <span class="table-span" @click="enteringFun(scope.row)" v-if="!scope.row.isPhoto && (scope.row.sscState === 1 || scope.row.sscState === 2)">录入回执单</span>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--上传-->
    <sino-dialog :visible.sync="importFlag" size="small" class="batch-import" v-on:close="resetForm('uploadForm')">
      <sino-title slot="title" type="levelOne" :title="importTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="uploadForm" ref="uploadForm" class="demo-ruleForm">
        <sino-form-item prop="fileName" label="上传文件：" class="sino-form-item1">
          <sino-upload
            ref="fileNameFile"
            :action="fileAction"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :on-error="fileError"
            :headers="uploadHeader"
          >
            <div slot="trigger">
              <input class="uploadFileBox" :readonly="true"
                     v-model="uploadForm.fileName"/>
              <div class="chooseFileButton">上传</div>
            </div>
          </sino-upload>
        </sino-form-item>
        <sino-button type="primary" class="card-import-button" @click="submitImp">确 定</sino-button>
      </sino-form>
    </sino-dialog>
    <!--导入结果弹层-->
    <sino-dialog :visible.sync="uploadResultFlag" class="dialog-auto">
      <sino-title slot="title" type="levelOne" :title="importResultTitle"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>文件名称</h6>
            <span v-text="uploadResult.fileName"></span>
          </li>
          <li>
            <h6>总数量</h6>
            <span><div class="file-upload-see"><i v-text="uploadResult.totalNum" ></i><i class="file-del-btn"  v-show="uploadResult.totalNum > 0" v-on:click="importUpLoadFile(uploadResult.fileUniqNo, true)">下载</i></div></span>
          </li>
          <li>
            <h6>成功数量</h6>
            <span><div class="file-upload-see"><i v-text="uploadResult.succNum" ></i><i class="file-del-btn" v-show="uploadResult.succNum > 0" v-on:click="importUpLoadFile(uploadResult.succPath, false)">下载</i></div></span>
          </li>
          <li>
            <h6>失败数量</h6>
            <span><div class="file-upload-see"><i v-text="uploadResult.failNum" ></i><i class="file-del-btn" v-show="uploadResult.failNum > 0" v-on:click="importUpLoadFile(uploadResult.failPath, false)">下载</i></div></span>
          </li>
          <li>
            <h6>上传操作人</h6>
            <span v-text="uploadResult.operName"></span>
          </li>
          <li>
            <h6>上传时间</h6>
            <span v-text="uploadResult.impTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer">
        <sino-button type="primary" @click="confirm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--录入回执单-->
    <sino-dialog :visible.sync="enteringFlag"  size="large" v-on:close="resetForm('enteringForm')">
      <sino-title slot="title" type="levelOne" title="录入回执单" class="sino-dialog-title "></sino-title>
      <div class="leadsAdd-form">
        <sino-form :model="enteringForm" :rules="enterRules" ref="enteringForm" class="leadsAdd-Form">
          <sino-form-item label="雇员姓名：" prop="empName">
            <sino-input v-model="enteringForm.empName" :disabled="true"></sino-input>
          </sino-form-item>
          <sino-form-item label="证件号码：" prop="certNo">
            <sino-input v-model="enteringForm.certNo" :disabled="true"></sino-input>
          </sino-form-item>
          <sino-form-item label="回执单编号：" prop="receiptNo">
            <sino-input v-model="enteringForm.receiptNo"></sino-input>
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="submitForm">确 定</sino-button>
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
        lockScroll: true,
        uploadResult: {}
      });
      return false;
    }
  };
  export default {
    data () {
      return {
        token: Cookie.get("Token"),
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        findUserRoleByOrgAndRoleType: this.apiPath.author.findUserRoleByOrgAndRoleType,
        findSinsAcctName: this.apiPath.sins.findSinsAcctName,
        findCustSelectInfo: this.apiPath.hrsc.findCustSelectInfo1,
        sinsIdObj: {paramIds: []},
        declareTypeArr: [],
        checkedArr: [],
        sinsCardForm: {
          custName: '',
          custId: '',
          custSinsIdListName: [],
          custSinsIdList: [],
          areaName: '',
          areaId: '',
          makeCardBatch: '',
          sscStateName: '',
          sscState: '',
          empName: '',
          certNo: '',
          makeCardResultName: '',
          makeCardResult: '',
          isPhotoName: '',
          isPhoto: '',
          isRepeatName: '',
          isRepeat: ''
        },
        sinsDeclData: null, // 养老
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
        }, // 工伤
        searchFlag: false,
        activeName: 'first',
        uploadData: '',
        uploadHeader: {Token: ""},
        conFlag: false,
        importFlag: false,
        conForm: {},
        conDetailForm: {},
        importTitle: '',
        importResultTitle: '',
//        currentUploadForm: '',
        uploadForm: {
          fileName: ''
        },
        uploadResultFlag: false,
        uploadResult: {},
        enteringFlag: false,
        enteringForm: {
          empName: '',
          certNo: '',
          receiptNo: ''
        },
        enterRules: {
          receiptNo: [
            {required: true, message: '回执单编号为必填项', trigger: 'change'}
          ]
        }
      };
    },
    created () {},
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
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
      importCardFun () {
        this.importFlag = true;
        this.importTitle = "导入制卡信息";
      },
      relationEmpFun () {
        if (this.haveSelected()) {
          let arr = this.checkedArr.map(function (item) {
            return {sscId: item.sscId, sscState: item.sscState};
          });
          api.post(this.apiPath.sins.exportWaitCardEmp, {sscInfoStates: arr}).then(res => {
            if (res.code === 'CPYY-00001') {
              api.download(res.data);
              this.searchFun();
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      markNoCardFun () {
        if (this.haveSelected()) {
          let arr = this.checkedArr.map(function (item) {
            return {sscId: item.sscId, sscState: item.sscState};
          });
          api.post(this.apiPath.sins.updateStateCardNotMaking, {sscInfoStates: arr}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '修改成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      makeCardFun () {
        if (this.haveSelected()) {
          let arr = this.checkedArr.map(function (item) {
            return item.sscId;
          });
          api.post(this.apiPath.sins.updateStateCardMaking, {sscIdList: arr}).then(res => {
            if (res.code === 'CPYY-00001') {
              api.download(res.data);
              this.searchFun();
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      getCardFun () {
        this.importFlag = true;
        this.importTitle = "社保卡领取";
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
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.sinsCardForm
        };
        api.post(this.apiPath.sins.findSscInfoAll, obj).then(res => {
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
      resetFun () {
        this.$refs.sinsCardForm.resetFields();
        this.sinsCardForm.custSinsIdListName = [];
        this.sinsCardForm.custSinsIdList = [];
      },
      submitImp () {  // 点击上传确定
        this.$refs.fileNameFile.submit();
      },
      confirm () { // 点击上传结果弹层确定
        this.uploadResultFlag = false;
        this.searchFun();
      },
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.uploadForm.fileName = file.name;
        } else {
          this.$refs.fileNameFile.clearFiles();
        }
      },
      fileSuccess (res, file) {
        if (res.code === 'CPYY-00001') {
          this.activeFileNo = res.data;
          api.postsign(this.apiPath.sins[this.importTitle === '导入制卡信息' ? 'importSscInfo' : 'getSsc'], this.activeFileNo).then(res => {
            if (res.code === 'CPYY-00001') {
              this.uploadResult = res.data;
              this.uploadResult.fileName = file.name;
              this.importFlag = false;
              this.uploadResultFlag = true;
            }
          }).catch(err => {
            console.log(err);
          });
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
        this.uploadForm.fileName = '';
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
      importUpLoadFile (url, type) {
        if (type) {
          api.postsign(this.apiPath.sins.uploadContExcelAction, this.activeFileNo).then(res => {
            if (res.code === 'CPYY-00001') {
              api.download(res.data);
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          api.download(url);
        }
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      // 录入回执单
      enteringFun (data) {
        this.enteringFlag = true;
        let that = this;
        setTimeout(function () {
          that.enteringForm.certNo = data.certNo;
          that.enteringForm.empName = data.empName;
          that.enteringForm.sscId = data.sscId;
          that.enteringForm.sscState = data.sscState;
          that.enteringForm.receiptNo = data.receiptNo;
        });
      },
      submitForm () {
        this.$refs.enteringForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.sins.updateReceipt, this.enteringForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.enteringFlag = false;
                this.$message({message: '修改成功！', type: 'success'});
                this.searchFun();
              }
            });
          }
        });
      }
    }
  };
</script>
