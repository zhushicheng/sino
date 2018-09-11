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
      <sino-form :model="sinsDetailForm" ref="sinsDetailForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one li-wid">
              <sino-form-item label="社保账号名称：" class="search-inner-item" prop="unitSinsNo">
                <sino-select :filterable="true" class="multiple-choice"
                             :multiselect="true"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="apiPath.sins.findSinsAcctByIds"
                             :chooseName.sync="sinsDetailForm.custSinsIdListName"
                             :chooseId.sync="sinsDetailForm.custSinsIdList"
                             :data="sinsIdObj"
                             :linkage="true"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="申报类型：" class="search-inner-item" prop="sinsState">
                <sino-checkbox-group v-model="sinsDetailForm.sinsStateList" class="mt5">
                  <sino-checkbox :label="list.id" v-for="(list, index) in sinsStateList" :key="index">{{list.title}}</sino-checkbox>
                </sino-checkbox-group>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-if="searchFlag">
                <li class="li-wid">
                  <sino-form-item label="客户名称：" class="search-inner-item" prop="busiCustName">
                    <sino-select class="fl"
                                 :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="apiPath.hrsc.findCustInfoSelectBoxAll"
                                 :chooseName.sync="sinsDetailForm.busiCustName"
                                 :chooseId.sync="sinsDetailForm.custId"
                                 :clear="true"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                    <sino-input class="fl" type="text"
                                v-model="sinsDetailForm.empName"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                    <sino-input class="fl" type="text"
                                v-model="sinsDetailForm.certNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="社保个人编号：" class="search-inner-item" prop="perComCode">
                    <sino-input class="fl" type="text"
                                v-model="sinsDetailForm.perComCode"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="执行地区：" class="search-inner-item" prop="executeAreaName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="areaUrl"
                                 :chooseName.sync="sinsDetailForm.executeAreaName"
                                 :chooseId.sync="sinsDetailForm.executeAreaId"
                                 :data="{data: {areaTypes:[4,5]}}"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务员：" class="search-inner-item" prop="creRoleName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="findUserByOrgIdsAndRoleType"
                                 :chooseName.sync="sinsDetailForm.creRoleName"
                                 :chooseId.sync="sinsDetailForm.creRoleId"
                                 :data="{orgId: 1, roleTypes:[5]}"
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
            <!--<sino-button type="icon-text" @click="conFun"><i class="iconfont sino-zhangdan-copy"></i>差异对比</sino-button>-->
            <!--<sino-button type="icon-text" @click="downFun"><i class="iconfont sino-download-copy"></i>下载申报表</sino-button>-->
          </div>
        </div>
        <sino-tabs v-model="activeName" type="card" @tab-click="handleClick" class="sino-tab-decl">
          <sino-tab-pane :label="item.proPayName" :name="'step'+ index" v-for="(item, index) in insurance" :key="index">
            <div class="sino-queryspan">
              <span>合计：<em>{{total === null ? 0:total}}</em> 条
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                已勾选：<em>{{checkedArr.length}}</em> 条
              </span>
            </div>
            <sino-table :data="sinsDeclData" border max-height="416" stripe v-on:selection-change="selectCallBack" v-on:viewAll="viewAll" class="table-have-no-margin">
              <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
              <sino-table-column type="index" label="序号" width="60"></sino-table-column>
              <sino-table-column prop="sinsStateName" label="申报类型" min-width="120"></sino-table-column>
              <sino-table-column prop="unitSinsNo" label="单位社保账号" min-width="120"></sino-table-column>
              <sino-table-column prop="sinsAcctName" label="社保账户名称" min-width="120"></sino-table-column>
              <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
              <sino-table-column prop="certNo" label="证件号码" min-width="170"></sino-table-column>
              <sino-table-column prop="perComCode" label="社保个人编号" min-width="95"></sino-table-column>
              <sino-table-column prop="executeAreaName" label="执行地区"></sino-table-column>
              <sino-table-column prop="chargeEndDay" label="截单日"></sino-table-column>
              <sino-table-column prop="orderBegDate" label="起做日期" min-width="100"></sino-table-column>
              <sino-table-column prop="orderEndDate" label="止做日期" min-width="100"></sino-table-column>
              <sino-table-column prop="perRadix" label="个人基数" type="money" width="120"></sino-table-column>
              <sino-table-column prop="unitRadix" label="企业基数" type="money" width="120"></sino-table-column>
              <sino-table-column prop="signSuppName" label="签约供应商" min-width="180"></sino-table-column>
              <sino-table-column prop="busiCustName" label="客户名称" min-width="180"></sino-table-column>
              <sino-table-column prop="creRoleName" label="业务员"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
          </sino-tab-pane>
        </sino-tabs>
      </div>
    </div>
    <!--差异对比-->
    <sino-dialog :visible.sync="conFlag" size="small" class="batch-import" @close="uploadClose">
      <sino-title slot="title" type="levelOne" title="差异比对" class="sino-dialog-title"></sino-title>
      <sino-form class="demo-ruleForm">
        <sino-form-item label="上传文件：" class="sino-form-item1">
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
              <input class="uploadFileBox" type="text" readonly="true" v-model="fileName"/>
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
        findUserByOrgIdsAndRoleType: this.apiPath.author.findUserByOrgIdsAndRoleType,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        fileAction: this.apiPath.hrsc.uploadFilePublic,
        roleUrl: this.apiPath.author.findUserRoleByOrgAndRoleType,
        findSinsAcctName: this.apiPath.sins.findSinsAcctName,
        userRoleId: '5',
        token: Cookie.get("Token"),
        uploadHeader: {Token: ""},
        checkedArr: [],
        sinsIdObj: {paramIds: []},
        declarationType: [],    //  申报类型
        roleData: {userRoleId: Cookie.get('userRoleId')},
        sinsDetailForm: {
          custSinsIdListName: [],
          custSinsIdList: [],
          busiCustName: '',
          custId: '',
          empName: '',
          certNo: '',
          perComCode: '',
          executeAreaId: '',
          executeAreaName: '',
          creRoleId: '',
          creRoleName: '',
          productId: 4, // 险种
          sinsStateList: []
        },
        insurance: [
          {proPayId: '', proPayName: ''},
          {proPayId: '', proPayName: ''},
          {proPayId: '', proPayName: ''},
          {proPayId: '', proPayName: ''},
          {proPayId: '', proPayName: ''},
          {proPayId: '', proPayName: ''}
        ],  //  字典查询的险种
        illData: null,
        illPage: {
          total: null,
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
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
        },
        searchFlag: false,
        activeName: 'step0',
        conFlag: false,
        importVisible: false,
        fileName: '',
        confObj: {},
        activeOnyNum: '',
        sinsStateList: []
      };
    },
    mounted () {
      if (typeof this.$route.query.sinsAcctIds === 'string') {
        this.$route.query.sinsAcctIds = [this.$route.query.sinsAcctIds];
      }
      this.sinsIdObj.paramIds = this.$route.query.sinsAcctIds;
      api.post(this.dictSelUrl, {code: 'REPORT_TYPE'}).then(res => {
        this.sinsStateList = res.data.list;
      });
      this.uploadHeader.Token = Cookie.get('Token');
      if (this.$route.query.sinsAcctIds) {
        api.post(this.apiPath.sins.findSinsAcctByIds, {paramIds: this.$route.query.sinsAcctIds}).then(res => {
          if (res.code === 'CPYY-00001') {
            JSON.parse(JSON.stringify(res.data.list)).forEach(function (item) {
              this.sinsDetailForm.custSinsIdListName.push(item.title);
              this.sinsDetailForm.custSinsIdList.push(item.id);
            }, this);
            this.insuranceType();
          }
        });
      } else {
        this.insuranceType();
      }
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 详情页 获取险种
      insuranceType () {
        api.post(this.apiPath.hrsc.findProPaySins, {}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.insurance = res.data;
            this.viewAll(this.pageNum, this.pageSize, 0);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      prodScheFun (order) {
        this.$router.push({path: '/sinsDeclEav'});
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
        this.viewAll(1, this.pageSize, parseInt(tab.index));
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize, index) {
        this.sinsDetailForm.sinsAcctId = this.$route.query.sinsAcctId;
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.sinsDetailForm
        };
        obj.data.productId = this.insurance[index].proPayId;
        api.post(this.apiPath.sins.findMonthlyDet, obj).then(res => {
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
        this.viewAll(this.pageNum, this.pageSize, this.activeName[4]);
      },
      // 差异对比
      conFun () {
        this.conFlag = true;
      },
      upBankData () {
        if (this.fileName === '') {
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
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.fileName = file.name;
        } else {
          this.$refs.fileNameFile.clearFiles();
        }
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.activeOnyNum = res.data;
          api.postsign(this.apiPath.sins.differenceComparison, res.data).then(res => {
            if (res.code === 'CPYY-00001') {
              this.importVisible = true;
              this.confObj = res.data;
              this.confObj.fileName = this.fileName;
              this.conFlag = false;
            }
          });
        } else {
          this.fileName = '';
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
        this.fileName = '';
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
        let listArr = [];
        this.checkedArr.forEach(function (item, index) {
          listArr.push({orderId: item.orderId, sinsState: item.sinsState});
        });
        api.post(this.apiPath.sins.passThroughDet, {monthlyDetList: listArr}).then(res => {
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
      // 养老
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize, this.activeName[4]);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize, this.activeName[4]);
      },
      resetFun () {
        this.sinsDetailForm = {
          custSinsIdListName: [],
          custSinsIdList: [],
          busiCustName: '',
          empName: '',
          certNo: '',
          perComCode: '',
          executeAreaId: '',
          executeAreaName: '',
          creRoleId: '',
          creRoleName: '',
          productId: 4,
          sinsStateList: []
        };
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      uploadClose () {
        this.$refs.fileNameFile.clearFiles();
        this.fileName = '';
      }
    }
  };
</script>
