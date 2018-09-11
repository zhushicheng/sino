<template>
  <!--客户银行账户-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="客户银行账户查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">客户名称：</span>
              <!--<sino-input class="fl" type="text" v-model="searchForm.custChName"-->
                          <!--:disabled="false"></sino-input>-->
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :chooseName.sync="searchForm.custChName"
                           :chooseId.sync="searchForm.custId"
                           :token="token"
                           :clear="true" :url="costCenterUrl"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">银行类型：</span>
              <!--<sino-input type="text" class="fl" v-model="searchForm.bankType"-->
              <!--:disabled="false"></sino-input>-->
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :data="bankTypeData"
                           :chooseName.sync="searchForm.bankTypeName"
                           :chooseId.sync="searchForm.bankType"
                           :clear="true" :url="getDictSelectBox">
              </sino-select>
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
    <!-- 表格 -->
    <div>
      <div class="sino-table-total mt15">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="clickFun('','add')"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="bankAcctData" max-height="416" stripe border v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="acctBankName" label="开户单位名称" min-width="180"></sino-table-column>
          <sino-table-column prop="acctName" label="开户行" min-width="180"></sino-table-column>
          <sino-table-column prop="acctNo" label="银行账号" min-width="200"></sino-table-column>
          <sino-table-column prop="bankTypeName" label="银行类型"></sino-table-column>
          <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" width="140" align="center" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="clickFun(scope.row,'view')">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="clickFun(scope.row,'modify')">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="clickFun(scope.row,'del')">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-if="bankAcctData !== null"
                   v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total">
        </sino-page>
      </div>
    </div>
    <!--新增-->
    <sino-dialog :visible.sync="bankAcctFlag" size="large"  class="dialog-height" @close ="cleanContent('bankAcctForm')">
      <sino-title slot="title" type="levelOne" :title="stateFlag === 'add' ? '新增银行账户' : '修改银行账户'" class="sino-dialog-title"></sino-title>
      <sino-form :model="bankAcctForm" :rules="bankAcctRules" ref="bankAcctForm" class="demo-bankAcctForm">
        <sino-form-item label="客户名称："  prop="custName" class="sino-form-item-width">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="stateFlag === 'modify'"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :chooseName.sync="bankAcctForm.custName"
                       :chooseId.sync="bankAcctForm.custId"
                       @change="changeCustName"
                       :token="token"
                       :clear="true" :url="costCenterUrl"></sino-select>
        </sino-form-item>
        <sino-form-item label="城市：" prop="acctBankAreaName">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :chooseName.sync="bankAcctForm.acctBankAreaName"
                       :chooseId.sync="bankAcctForm.acctBankArea"
                       :clear="true"
                       :data="cityData"
                       :url="findAreaList"></sino-select>
        </sino-form-item>
        <sino-form-item label="银行类型："  prop="bankTypeName">
          <sino-select  class="fl"
                       :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :data="bankTypeData"
                       @change="changeBank"
                       :chooseName.sync="bankAcctForm.bankTypeName"
                       :chooseId.sync="bankAcctForm.bankType"
                       :clear="true" :url="getDictSelectBox">
          </sino-select>
        </sino-form-item>
        <sino-form-item label="开户行："  prop="acctName">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :chooseName.sync="bankAcctForm.acctName"
                       :chooseId.sync="bankAcctForm.acctBank"
                       :data="acctBankData"
                       :linkage="true"
                       @change="changeBankNo"
                       :clear="true" :url="bankInfoDropdown"></sino-select>
        </sino-form-item>
        <sino-form-item label="联行号：" class="is-required" prop="unionpayNum">
          <sino-input type="text" placeholder="自动带出" :disabled="true" v-model="bankAcctForm.unionpayNum"></sino-input>
        </sino-form-item>
        <sino-form-item label="开户单位名称：" class="clear" prop="acctBankName">
          <sino-input v-model="bankAcctForm.acctBankName"></sino-input>
        </sino-form-item>
        <sino-form-item label="银行账号：" class="is-required" prop="acctNo">
          <sino-input v-model="bankAcctForm.acctNo"></sino-input>
        </sino-form-item>
        <sino-form-item prop="remark" label="备注：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="bankAcctForm.remark"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{stateFlag === 'add'? '确 定' : '修 改'  }}</sino-button>
      </span>
    </sino-dialog>
    <!-- 查看 -->
    <sino-dialog :visible.sync="bankAcctViewFlag" size="small" class="dialog-height">
      <sino-title slot="title" type="levelOne" title="客户银行账户信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>客户名称</h6><input v-model="bankAcctViewList.custName">
          </li>
          <li>
            <h6>城市</h6><input v-model="bankAcctViewList.acctBankAreaName">
          </li>
          <li>
            <h6>银行类型</h6><input v-model="bankAcctViewList.bankTypeName">
          </li>
          <li>
            <h6>开户行</h6><input v-model="bankAcctViewList.acctName">
          </li>
          <li>
            <h6>联行号</h6><input v-model="bankAcctViewList.unionpayNum">
          </li>
          <li>
            <h6>开户单位名称</h6><input v-model="bankAcctViewList.acctBankName">
          </li>
          <li>
            <h6>银行账号</h6><input v-model="bankAcctViewList.acctNo">
          </li>
          <li>
            <h6>创建人</h6><input v-model="bankAcctViewList.creName">
          </li>
          <li class="li-last">
            <h6>创建时间</h6><input v-model="bankAcctViewList.creTime">
          </li>
          <li class="li-last">
            <h6>备注</h6><input v-model="bankAcctViewList.remark">
          </li>
        </ul>
      </div>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  let callTip = function (_this, type, msg) {
    _this.getBankAcctList();
    _this.bankAcctFlag = false;
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
  export default {
    data () {
      return {
        token: Cookie.get("Token"),
        costCenterUrl: this.apiPath.hrsc.custInfoSelectBox,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        bankInfoDropdown: this.apiPath.hrsc.bankInfoDropdown,
        searchForm: {
          bankType: '',
          bankTypeName: ''
        },
        isA: true,
        bankAcctData: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [5, 10, 20, 50],
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        total: null,
        bankAcctFlag: false,
        bankAcctViewFlag: false,
        stateFlag: '',
        bankAcctForm: {
          custId: '',
          custName: '',
          acctBankArea: '',
          acctBankAreaName: '',
          acctBank: '',
          acctName: '',
          acctNo: '',
          acctBankName: '',
          bankType: '',
          bankTypeName: '',
          unionpayNum: '',
          remark: ''
        },
        bankAcctRules: {
          custName: [
            {required: true, message: '请选择客户名称', trigger: 'change'}
          ],
          acctBankAreaName: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          bankTypeName: [
            {required: true, message: '请选择银行类型', trigger: 'change'}
          ],
          acctBankName: [
            {required: true, message: '请输入开户行单位名称', trigger: 'change'}
          ],
          acctName: [
            {required: true, message: '请选择开户行', trigger: 'change'}
          ],
          acctNo: [
            {required: true, message: '请输入银行账号', trigger: 'change'},
            {validator: this.validator.checkNumX, trigger: 'change'}
          ]
        },
        userList: [],
        bankAcctViewList: {
          custId: ''
        },
        cityData: {'data': {'level': 4}},
        bankTypeData: {code: 'BANK_TYPE'},
        acctBankData: {data: {bankType: '', cityName: ''}}, // 开户行下拉请数据
        acctNameSelect: {} // 开户行下拉数据暂存
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      changeCustName () {
        if (this.stateFlag === 'add') {
          this.bankAcctForm.acctBankName = this.bankAcctForm.custName;
        }
      },
      changeBankNo: function () {
        if (this.bankAcctForm.acctBank) {
          let obj = {"bankId": this.bankAcctForm.acctBank};
          api.post(this.apiPath.hrsc.findBankNoById, obj).then(res => {
            this.bankAcctForm.unionpayNum =  res.data;
            console.log(this.bankAcctForm);
          }).catch(err => {
            console.log(err);
          });
        }
      },
      changeCity: function () {
        this.acctBankData.data.cityName = this.bankAcctForm.acctBankAreaName;
      },
      changeBank: function () {
        this.acctBankData.data.bankType = this.bankAcctForm.bankType;
      },
      viewAll () {
        this.searchFun();
      },
      searchFun: function () {
        this.pageNum = 1;
        this.getBankAcctList();
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.getBankAcctList(pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.getBankAcctList(this.pageNum, pageSize);
      },
      getBankAcctList () {
        let obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        obj.data = this.searchForm;
        api.post(this.apiPath.hrsc.findCustBankAccts, obj).then(res => {
          this.bankAcctData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      clickFun (obj, type) {
        let _this = this;
        if (type === 'add') {
          this.stateFlag = 'add';
          _this.bankAcctFlag = true;
//          _this.bankAcctForm = {};
        }
        if (type === 'view') {
          _this.bankAcctViewFlag = true;
          api.post(this.apiPath.hrsc.findCustBankAcct, {conAcctId: obj.conAcctId}).then(res => {
            this.bankAcctViewList = res.data;
            // this.bankAcctViewFlag = false;
          }).catch(err => {
            console.log(err);
          });
        }
        if (type === 'modify') {
          this.stateFlag = 'modify';
          this.bankAcctFlag = true;
          api.post(this.apiPath.hrsc.findCustBankAcct, {conAcctId: obj.conAcctId}).then(res => {
            this.acctNameSelect.acctName = res.data.acctName;
            this.acctNameSelect.acctBank = res.data.acctBank; // 下拉框异步赋值
            this.bankAcctForm = res.data;
            setTimeout(function () {
              _this.bankAcctForm.acctName = _this.acctNameSelect.acctName;
              _this.bankAcctForm.acctBank = _this.acctNameSelect.acctBank;
            });
            // if (res.code === 'CPYY-00001') {
            //   this.changeBank();
            //   this.$message({message: '恭喜您，修改成功！', type: 'success'});
            // }
          }).catch(err => {
            console.log(err);
          });
//          _this.bankAcctForm = JSON.parse(JSON.stringify(obj));
        }
        if (type === 'del') {
          _this.$confirm('您确定要删除吗？', '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            api.post(this.apiPath.hrsc.deleteCustBankAcct, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.$message({message: '恭喜您，删除成功！', type: 'success'});
              }
            }).catch(() => {
            });
          }).catch(() => {
            console.log('删除取消!');
          });
        }
      },
      submitForm () {
        if (this.stateFlag === 'add') {
          this.$refs.bankAcctForm.validate((valid) => { // 新增
            if (valid) {
              api.post(this.apiPath.hrsc.saveCustBankAcct, this.bankAcctForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.bankAcctFlag = false;
                  this.$message({message: '恭喜您，新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        } else {
          this.$refs.bankAcctForm.validate((valid) => { //  修改
            let _this = this;
            if (valid) {
              api.post(_this.apiPath.hrsc.updateCustBankAcct, this.bankAcctForm).then(res => {
                let msg, type;
                if (res.code === 'CPYY-00001') {
                  _this.getBankAcctList();
                  _this.bankAcctFlag = false;
                  _this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        }
      },
      cleanContent (formName) {
        this.$refs[formName].resetFields();
        this.acctNameSelect.acctName = '';
        this.acctNameSelect.acctBank = '';
      }
    }
  };
</script>
