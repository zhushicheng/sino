<template>
  <!--<div>社保申报审核详情</div>-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun">合计</div>
          <div class="sino-tabs-item is-active">详情</div>
        </div>
      </div>
    </div>
    <sino-con class="sino-con-more">
      <sino-form :model="accuauditForm" ref="accuauditForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="单位公积金账号：" class="search-inner-item" prop="unitNo">
                <sino-input class="fl" type="text"
                            v-model="accuauditForm.unitNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="公积金账户名称：" class="search-inner-item" prop="accuAcctName">
                <sino-input class="fl" type="text"
                            v-model="accuauditForm.accuAcctName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="申报类型：" class="search-inner-item" prop="payTypeSelect">
                <sino-checkbox-group v-model="accuauditForm.payTypeSelect" class="mt5">
                  <sino-checkbox  class="pay-type-lable" v-for="(item, index) in declareTypeArr" :key="index" :label="item.id">{{item.title}}</sino-checkbox>
                </sino-checkbox-group>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="searchFlag">
                <li class="li-wid">
                  <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                    <sino-select class="fl"
                                 :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="apiPath.hrsc.findCustInfoSelectBoxAll"
                                 :chooseName.sync="accuauditForm.custName"
                                 :chooseId.sync="accuauditForm.custId"
                                 :clear="true"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                    <sino-input class="fl" type="text"
                                v-model="accuauditForm.empName"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                    <sino-input class="fl" type="text"
                                v-model="accuauditForm.certNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="公积金职工账号：" class="search-inner-item" prop="perNo">
                    <sino-input class="fl" type="text"
                                v-model="accuauditForm.perNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="执行地区：" class="search-inner-item" prop="execuAreaName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="areaUrl"
                                 :chooseName.sync="accuauditForm.execuAreaName"
                                 :chooseId.sync="accuauditForm.execuAreaId"
                                 :data="{data: {areaTypes:[4,5]}}"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务员：" class="search-inner-item" prop="creName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="findUserByOrgIdsAndRoleType"
                                 :chooseId.sync="accuauditForm.creName"
                                 :chooseName.sync="accuauditForm.creId"
                                 :data="{userRoleId: userRoleId}"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box" :class="{'search-first-button-box': !searchFlag, '': searchFlag}">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun" v-if="searchFlag">重 置</sino-button>
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
            <sino-button type="icon-text" @click="eavFun"><i class="iconfont sino-queren"></i>审核通过</sino-button>
            <!-- <sino-button type="icon-text" @click="conFun"><i class="iconfont sino-zhangdan-copy"></i>差异对比</sino-button>
            <sino-button type="icon-text" @click="downFun"><i class="iconfont sino-download-copy"></i>下载申报表</sino-button>  -->
          </div>
        </div>
        <div class="sino-queryspan">
          <span>合计：<em>{{total? total : 0}}</em> 条
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            已勾选：<em>{{checkedArr.length}}</em> 条
          </span>
        </div>
        <sino-table :data="sinsDeclData" border max-height="416" stripe v-on:selection-change="selectCallBack" v-on:viewAll="viewAll">
          <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60"></sino-table-column>
          <sino-table-column prop="payTypeName" label="申报类型" min-width="120"></sino-table-column>
          <sino-table-column prop="unitNo" label="单位公积金账号" min-width="120"></sino-table-column>
          <sino-table-column prop="accuAcctName" label="公积金账户名称" min-width="170"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="170"></sino-table-column>
          <sino-table-column prop="perNo" label="公积金职工账号" min-width="170"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区" min-width="180"></sino-table-column>
          <sino-table-column prop="chargeEndDay" label="截单日"></sino-table-column>
          <sino-table-column prop="orderBegDate" label="起做日期" min-width="100"></sino-table-column>
          <sino-table-column prop="orderEndDate" label="止做日期" min-width="150"></sino-table-column>
          <sino-table-column prop="perBase" label="个人基数" type="money" width="150"></sino-table-column>
          <sino-table-column prop="comBase" label="企业基数" type="money" width="150"></sino-table-column>
          <sino-table-column prop="monAmo" label="月缴纳额" type="money" width="150"></sino-table-column>
          <sino-table-column prop="accuProp" label="比例"></sino-table-column>
          <sino-table-column prop="ordSendSuppName" label="签约供应商" min-width="180"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="creName" label="业务员"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--差异对比-->
    <sino-dialog :visible.sync="conFlag" size="small" class="batch-import" v-on:close="resetForm('conForm')">
      <sino-title slot="title" type="levelOne" title="差异比对" class="sino-dialog-title"></sino-title>
      <sino-form :model="conForm" ref="conForm" class="demo-ruleForm">
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
              <input class="uploadFileBox" v-model="conForm.fileName" readonly="true"/>
              <span class="chooseFileButton">上传</span>
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
            <span v-text="conDetailForm.fileName"></span>
          </li>
          <li>
            <h6>导入数据数量</h6>
            <span><div class="file-upload-see"><i v-text="conDetailForm.impCount" ></i><i v-show="conDetailForm.impCount>0" class="file-del-btn" v-on:click="importNumDown">下载</i></div></span>
          </li>
          <li>
            <h6>成功数量</h6>
            <span><div class="file-upload-see"><i v-text="conDetailForm.yesImpCount" ></i><i v-show="conDetailForm.yesImpCount>0" class="file-del-btn" v-on:click="importSuccDown">下载</i></div></span>
          </li>
          <li>
            <h6>失败数量</h6>
            <span><div class="file-upload-see"><i v-text="conDetailForm.noImpCount" ></i><i  v-show="conDetailForm.noImpCount>0" class="file-del-btn" v-on:click="importErrDown">下载</i></div></span>
          </li>
          <li>
            <h6>导入人</h6>
            <span v-text="conDetailForm.impPerName"></span>
          </li>
          <li>
            <h6>导入时间</h6>
            <span v-text="conDetailForm.impTime"></span>
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
        userRoleId: Cookie.get("userRoleId"),
        findUserByOrgIdsAndRoleType: this.apiPath.author.findUserByOrgIdsAndRoleType,
        fileAction: this.apiPath.accu.uploadContExcelAction, // 文件上传
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        findUserRoleByOrgAndRoleType: this.apiPath.author.findUserRoleByOrgAndRoleType,
        token: Cookie.get("Token"),
        declareTypeArr: [],
        checkedArr: [],
        accuauditForm: {
          unitNo: '',
          accuAcctName: '',
          payTypeSelect: [],
          custName: '',
          custId: '',
          empName: '',
          certNo: '',
          perNo: '',
          execuAreaName: '',
          execuAreaId: '',
          creName: '',
          creId: ''
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
        importVisible: false,
        conForm: {},
        conDetailForm: {}
      };
    },
    created () {
      api.post(this.dictSelUrl, {code: 'REPORT_TYPE', ids: [1, 2, 4, 5, 6]}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.declareTypeArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
      if (this.$route.query.accuAcctId) {
        this.searchFun();
      }
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      prodScheFun (order) {
        this.$router.push({path: '/accuAuditTotal'});
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
      handleClick (tab, event) {
        console.log(tab, event);
      },
      viewAll (pageNum, pageSize) {
        if (this.$route.query.accuAcctId) {
          this.accuauditForm.accuAcctId = this.$route.query.accuAcctId;
        }
        if (this.$route.query.unitNo) {
          this.accuauditForm.unitNo = this.$route.query.unitNo;
        }
        if (this.$route.query.accuAcctName) {
          this.accuauditForm.accuAcctName = this.$route.query.accuAcctName;
        }
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.accuauditForm
        };
        api.post(this.apiPath.accu.findMonthlyDet, obj).then(res => {
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
        let listArr = [];
        this.checkedArr.forEach(function (item, index) {
          if (listArr.indexOf(item.orderDetId) === -1) {
            listArr.push({orderDetId: item.orderDetId1, payType: item.payType});
          }
        });
        api.post(this.apiPath.accu.updateState, {accuMonthlyDetList: listArr}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '审核通过！', type: 'success'});
            this.searchFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 下载申报表
      downFun () {},
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
        this.$refs.accuauditForm.resetFields();
      },
      // 差异对比
      conFun () {
        this.conFlag = true;
      },
      delFile (form, name) {
        this.$refs[form].clearFiles();
        this.conForm[name] = '';
        this.conForm[name + 'Name'] = '';
      },
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.$set(this.conForm, 'fileName', file.name);
        } else {
          this.$refs.fileNameFile.clearFiles();
        }
      },
      upBankData () {
        if (this.conForm.fileName === '') {
          this.$alert('请选择文件！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true
          });
        } else {
          this.$refs.fileNameFile.submit();
        }
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.conForm = res.data;
          this.importVisible = true;
          this.conFlag = false;
        } else {
          this.conForm.fileName = '';
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
      },
      importErrDown () {
        api.post(this.apiPath.hrsc.epmExportExcelFail, {"batchNo": 1}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      importNumDown () {
        api.post(this.apiPath.hrsc.empExportExcelAll, {"batchNo": 1}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      importSuccDown () {
        api.post(this.apiPath.hrsc.epmExportExcelSucc, {"batchNo": 1}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
