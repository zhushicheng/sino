<template>
  <div class=" invinfo">
    <sino-con>
      <sino-title type="levelOne" title="供应商账户查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li  class="search-inner-one">
              <span class="search-inner-name">供应商名称：</span>
              <sino-input class="fl" type="text" v-model="searchForm.chName"
                          :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">供应商类型：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :data="{code: 'SUPP_TYPE'}"
                           :url="getDictSelectBox"
                           :chooseName.sync="searchForm.suppTypeName"
                           :chooseId.sync="searchForm.suppType"
                           :clear="true" >
              </sino-select>
            </li>
            <li>
              <span class="search-inner-name">银行类型：</span>
              <sino-select class="fl"
                :filterable="true"
                :multiselect="false"
                :isshowTotol="false"
                :totalNum="false"
                :isPage="false"
                :isGroup="false"
                :data="bankTypeData"
                @change="changeBank"
                :chooseName.sync="searchForm.bankTypeName"
                :chooseId.sync="searchForm.bankType"
                :clear="true" :url="getDictSelectBox">
              </sino-select>
            </li>
            <li >
              <span class="search-inner-name">开户单位名称：</span>
              <sino-input class="fl" type="text" v-model="searchForm.acctBankName"
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
    <div class=" sino-table-total sino-table-total mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left">
          <sino-button type="icon-text" @click="add()"><i class="iconfont sino-add"></i>新增
          </sino-button>
        </div>
      </div>
      <sino-table :data="tableData" max-height="416"  :row-class-name="tableRowClassName"  v-on:viewAll="viewAll"  stripe border>
        <sino-table-column  type="index" label="序号"  width="60" align="center"></sino-table-column>
        <sino-table-column prop="chName" label="供应商名称" min-width="180"></sino-table-column>
        <sino-table-column prop="bankTypeName" label="银行类型" min-width="180"></sino-table-column>
        <sino-table-column prop="acctBankName" label="开户名称" min-width="180"></sino-table-column>
        <sino-table-column prop="acctNo" label="账号" min-width="180"></sino-table-column>
        <sino-table-column prop="acctBankAreaName" label="城市" min-width="180"></sino-table-column>
        <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
        <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
        <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
        <sino-table-column label="操作" align="center" width="100" fixed="right">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="modify(scope.row)">修改</span><i class="table-i">|</i>
              <span class="table-span" @click="del(scope.row)">删除</span>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                 :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                 :total="page.total"></sino-page>
    </div>
    <!-- 查看 -->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-costcenter usermanage">
      <sino-title slot="title" type="levelOne" title="供应商基本信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>供应商编号</h6><input v-model="RoleSeeDto.fullName">
          </li>
          <li>
            <h6>负责人</h6><input v-model="RoleSeeDto.creUserName">
          </li>
          <li>
            <h6>供应商名称</h6><input v-model="RoleSeeDto.corpName">
          </li>
          <li>
            <h6>城市</h6><input v-model="RoleSeeDto.creTime">
          </li>
          <li>
            <h6>供应商类型</h6><input v-model="RoleSeeDto.roleType">
          </li>
          <li>
            <h6>付费截止日</h6><input v-model="RoleSeeDto.roleType">
          </li>
          <li>
            <h6>创建人</h6><input v-model="RoleSeeDto.roleType">
          </li>
          <li>
            <h6>创建时间</h6><input v-model="RoleSeeDto.operUserName">
          </li>
          <li class="li-last">
            <h6>备注</h6><input v-model="RoleSeeDto.roleDesc">
          </li>
        </ul>
      </div>
    </sino-dialog>
    <!--修改-->
    <sino-dialog :visible.sync="modifyAndAdd" size="samll"  @close="dialogClose('modifyAndAddForm')" class="usermanage">
      <sino-title slot="title" type="levelOne" :title="stateFlag === 'add'? '新增供应商账户':'修改供应商账户'" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify1">
        <sino-form :model="modifyAndAddForm"  :rules="modifyAndAddFormRules" ref="modifyAndAddForm" class="demo-sendAddrAddForm">
          <sino-form-item label="供应商名称："  prop="chName" class="h25 sino-form-item-width">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :disabled="stateFlag === 'modify'"
                         :chooseName.sync="modifyAndAddForm.chName"
                         :chooseId.sync="modifyAndAddForm.suppId"
                         :url="suppInfoSelectBox"
                         :token="token"
                         @change="changeChName()"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="城市：" prop="acctBankAreaName">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="findAreaList"
                         :chooseName.sync="modifyAndAddForm.acctBankAreaName"
                         :chooseId.sync="modifyAndAddForm.acctBankArea"
                         :data="cityData"
                         @change="changeCity" :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="银行类型："  prop="bankTypeName">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :data="bankTypeData"
                         @change="changeBank"
                         :chooseName.sync="modifyAndAddForm.bankTypeName"
                         :chooseId.sync="modifyAndAddForm.bankType"
                         :clear="true" :url="getDictSelectBox">
            </sino-select>
          </sino-form-item>
          <sino-form-item label="开户行："  prop="acctName" class="sino-form-item-width">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :chooseName.sync="modifyAndAddForm.acctName"
                         :chooseId.sync="modifyAndAddForm.acctBank"
                         :data="acctBankData"
                         :linkage="true"
                         @change="changeBankNo"
                         :clear="true" :url="bankInfoDropdown"></sino-select>
          </sino-form-item>

          <sino-form-item label="开户单位名称：" class="sino-form-item-width" prop="acctBankName">
            <sino-input v-model="modifyAndAddForm.acctBankName"></sino-input>
          </sino-form-item>
          <sino-form-item label="联行号：" prop="unionpayNum">
            <sino-input type="text" placeholder="自动带出" :disabled="true" v-model="modifyAndAddForm.unionpayNum"></sino-input>
          </sino-form-item>
          <sino-form-item label="银行账号："  prop="acctNo">
            <sino-input v-model="modifyAndAddForm.acctNo"></sino-input>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
            <sino-input type="textarea" v-model="modifyAndAddForm.remark"  :disabled="false" ></sino-input>
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitFun('modifyAndAddForm')">{{stateFlag === 'add' ? '确 定': '修 改'}}</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Vue from 'vue';
  import Cookie from 'js-cookie';
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
  export default {

    components: {},
    data () {
      return {
        suppInfoSelectBox: this.apiPath.hrsc.selectBox, // g
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        bankInfoDropdown: this.apiPath.hrsc.bankInfoDropdown,
        token: Cookie.get('Token'),
        searchForm: { // 搜索条件
          suppTypeName: '',
          suppType: '',
          chName: '',
          bankType: '',
          bankTypeName: '',
          acctBankName: ''
        },
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
        RoleSeeDto: {}, // 查看弹层的数据
        modifyAndAdd: false, // 修改，添加控制弹层显示
        stateFlag: '',
        modifyAndAddForm: {
          suppId: '',
          chName: '',
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
        }, // 修改新增 弹框 表单数据
        modifyAndAddFormRules: {
          chName: [
            {required: true, message: '请输入供应商名称', trigger: 'change'}
          ],
          acctBankAreaName: [
            {required: true, message: '请选择城市', trigger: 'change'}
          ],
          bankTypeName: [
            {required: true, message: '请选择银行类型', trigger: 'change'}
          ],
          acctName: [
            {required: true, message: '请选择开户行', trigger: 'change'}
          ],
          acctNo: [
            {required: true, message: '请输入银行账号', trigger: 'blur'}
          ]
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
      viewAll () {
        this.getList(1, this.pageSize, 'all');
      },
      changeChName: function () {
        if (this.stateFlag === 'add') {
          this.modifyAndAddForm.acctBankName = this.modifyAndAddForm.chName;
        }
      },
      changeBankNo: function () {
        if (this.modifyAndAddForm.acctBank) {
          let obj = {"bankId": this.modifyAndAddForm.acctBank};
          api.post(this.apiPath.hrsc.findBankNoById, obj).then(res => {
            this.modifyAndAddForm.unionpayNum =  res.data;
            console.log(this.modifyAndAddForm);
          }).catch(err => {
            console.log(err);
          });
        }
      },
      changeCity: function () {
        this.acctBankData.data.cityName = this.modifyAndAddForm.acctBankAreaName;
      },
      changeBank: function () {
        this.acctBankData.data.bankType = this.modifyAndAddForm.bankType;
      },
      searchFun () {
        this.page.pageNum = 1;
        this.getList();
      },
      // 新增
      addFun () {
        this.$refs.modifyAndAddForm.validate((valid) => {
          //  修改词根
          if (valid) {
            api.post(this.apiPath.hrsc.suppacctSave, this.modifyAndAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.getList();
                this.modifyAndAdd = false;
                this.$message({message: '新增成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit');
          }
        });
      },
      // 修改
      updateFun () {
        this.$refs['modifyAndAddForm'].validate((valid) => {
          //  修改词根
          if (valid) {
            api.post(this.apiPath.hrsc.suppacctUpdate, this.modifyAndAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.getList();
                this.modifyAndAdd = false;
                this.$message({message: '修改成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit');
          }
        });
      },
      submitFun () {
        if (this.stateFlag === 'add') {
          // 新增供应商信息
          this.addFun();
        } else {
          // 修改供应商信息
          this.updateFun();
        }
      },
      getList (pageNum, pageSize, all) {
        pageNum ? '' : pageNum = this.pageNum;
        let obj = {
          data: this.searchForm,
          pageNum: pageNum,
          pageSize: this.pageSize
        };
        if (all) {
          obj.data = {};
        }
        api.post(this.apiPath.hrsc.findAcctInfo, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      choooseNum: function (pageSize) {
//        改变分页显示条数;
        this.pageNum = 1;
        this.page.pageSize = pageSize;
        this.getList();
      },
      add: function () {
        this.modifyAndAdd = true;
        this.stateFlag = 'add';
      },
      modify: function (data) {
        this.modifyAndAdd = true;
        this.stateFlag = 'modify';
        let _this = this;
        api.post(this.apiPath.hrsc.suppacctFind, {acctId: data.acctId}).then(res => {
          this.acctNameSelect.acctName = res.data.acctName;
          this.acctNameSelect.acctBank = res.data.acctBank; // 下拉框异步赋值
          this.modifyAndAddForm = res.data;
          setTimeout(function () {
            _this.modifyAndAddForm.acctName = _this.acctNameSelect.acctName;
            _this.modifyAndAddForm.acctBank = _this.acctNameSelect.acctBank;
          });
        }).catch(err => {
          console.log(err);
        });
      },
      see: function (data) {
        console.log(Vue.filter('date'));
        this.seeItem = true;
        api.post(this.apiPath.hrsc.suppacctFind, data).then(res => {
          this.RoleSeeDto = res.data;
          this.seeItem = true;
        }).catch(err => {
          console.log(err);
        });
      },
      del: function (data) {
        this.$alert('确定删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            if (action === 'cancel') { return; }
            api.post(this.apiPath.hrsc.suppacctDelete, data).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.$message({message: '删除成功！', type: 'success'});
                return;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      getFileName (file) {
        this.companyForm.upLoadFileName = file.name;
      },
      fileSuccess () {
        this.$message({message: '上传成功！', type: 'success'});
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
      dialogClose: function (formName) { // 修改对话框打开回调
        this.$refs[formName].resetFields();
        this.acctNameSelect.acctName = '';
        this.acctNameSelect.acctBank = '';
      }
    }
  };
</script>
