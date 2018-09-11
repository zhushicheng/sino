<template>
  <div class="usermanage invinfo">
    <sino-con>
      <sino-title type="levelOne" title="成本中心查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one costcenter-width">
              <span class="search-inner-name">客户名称：</span>
              <sino-select :filterable="true" class="fl"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="custInfoSelectBox"
                           :chooseName.sync="searchForm.custName"
                           :chooseId.sync="searchForm.custId"
                           :token="token"
                           :clear="true"></sino-select>
            </li>
            <li class="clear">
              <span class="search-inner-name">成本中心编号：</span>
              <sino-input class="fl" type="text" v-model="searchForm.costCentNo"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">成本中心名称：</span>
              <sino-input type="text" class="fl" v-model="searchForm.costCentName"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">状态：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="searchForm.isEffectName"
                           :chooseId.sync="searchForm.isEffect"
                           :clear="true" :data="{code: 'IS_EFFECT'}" :url="getDictSelectBox"></sino-select>
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
    <div class="sino-table-total sino-table-radio mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left">
          <sino-button type="icon-text" @click="addRole()"><i class="iconfont sino-add"></i>新增
          </sino-button>
        </div>
      </div>
      <sino-table :data="tableData"  stripe  border max-height="416" v-on:viewAll="viewAll"> <!-- v-on:select="selectCallBack"-->
        <!--<sino-table-column  type="selection"></sino-table-column>-->
        <sino-table-column  type="index" label="序号"  width="60" align="center"></sino-table-column>
        <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
        <sino-table-column prop="costCentName" label="成本中心名称" min-width="180"></sino-table-column>
        <sino-table-column prop="moneyUpperLimit" label="金额上限" width="150" type="money" align="center"></sino-table-column>
        <sino-table-column prop="moneyLowerLimit" label="提醒下限" width="150" type="money" align="center"></sino-table-column>
        <sino-table-column prop="isEffectName" label="状态"></sino-table-column>
        <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
        <sino-table-column label="操作" align="center" width="140" fixed="right">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="seeRole(scope.row)">查看</span><i class="table-i" v-if="scope.row.isEffect === 1" >|</i>
              <span @click="modifyRole(scope.row)" v-if="scope.row.isEffect === 1"  class="table-span">修改</span><i class="table-i" v-if="scope.row.isEffect === 1 && scope.row.isDefault !== 1" >|</i>
              <span class="table-span" v-if="scope.row.isEffect === 1 && scope.row.isDefault !== 1" @click="delRole(scope.row)">失效</span>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                 :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                 :total="page.total"></sino-page>
    </div>
    <!-- 查看 -->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="成本中心信息详情" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>成本中心名称</h6><input v-model="seeDto.costCentName">
          </li>
          <li>
            <h6>客户名称</h6><input v-model="seeDto.custName">
          </li>
          <li>
            <h6>金额上限</h6><input v-model="seeDto.moneyUpperLimit">
          </li>
          <li>
            <h6>提醒下限</h6><input v-model="seeDto.moneyLowerLimit">
          </li>
          <li>
            <h6>创建人</h6><input v-model="seeDto.creName">
          </li>
          <li>
            <h6>创建时间</h6><span>{{seeDto.creTime | date }}</span>
          </li>
          <li class="li-last">
            <h6>备注</h6><input v-model="seeDto.remark">
          </li>
        </ul>
      </div>
    </sino-dialog>
    <!--新增/修改-->

    <sino-dialog :visible.sync="modifyAndAdd" size="samll"  v-on:close="resetForm('modifyAndAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="modifyAndAddForm" :rules="modifyAndAddFormRules"   ref="modifyAndAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="客户名称："  prop="custName" class="sino-form-item-width">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="alertTitle === '修改成本中心信息'"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :chooseName.sync="modifyAndAddForm.custName"
                       :chooseId.sync="modifyAndAddForm.custId"
                       :token="token"
                       :clear="alertTitle === '修改成本中心信息' ? false : true" :url="custInfoSelectBox"></sino-select>
        </sino-form-item>
        <sino-form-item label="成本中心名称：" prop="costCentName">
          <sino-input v-model="modifyAndAddForm.costCentName" ></sino-input>
        </sino-form-item>
        <sino-form-item label="金额上限：" prop="moneyUpperLimit" >
          <sino-input v-model.number="modifyAndAddForm.moneyUpperLimit" ></sino-input>
        </sino-form-item>
        <sino-form-item label="提醒下限：" prop="moneyLowerLimit">
          <sino-input v-model.number="modifyAndAddForm.moneyLowerLimit" ></sino-input>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
          <sino-input type="textarea" v-model="modifyAndAddForm.remark" :disabled="false" ></sino-input>
        </sino-form-item>
        <!--<sino-form-item class="usermanage-button">
         </sino-form-item>-->
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm('modifyAndAddForm')">确 定</sino-button>
      </span>
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
  //  let checkedArr = '';
//  let tipFun = function (_this) {
//    if (checkedArr.length === 0) {
//      _this.$alert('请勾选一个你要操作的信息项', '提示信息', {
//        confirmButtonText: '确 定',
//        type: 'warning', // icon图标类型
//        dragFlag: true,
//        customClass: '', // 添加class
//        lockScroll: true
//      });
//      return false;
//    } else {
//      return true;
//    }
//  };

  export default {
    data () {
      var upLimit = (rule, value, callback) => {
        if (!value) {
          callback();
          return;
        }
        if (this.modifyAndAddForm.moneyUpperLimit && this.modifyAndAddForm.moneyLowerLimit) {
          if (value <= this.modifyAndAddForm.moneyLowerLimit) {
            callback(new Error('金额下限需大于提醒下限！'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      // ------------------验证金额-----------------------------
      var LowerLimit = (rule, value, callback) => {
        if (!value) {
          callback();
          return;
        }
        if (this.modifyAndAddForm.moneyUpperLimit && this.modifyAndAddForm.moneyLowerLimit) {
          if (value >= this.modifyAndAddForm.moneyUpperLimit) {
            callback(new Error('提醒下限需大于金额下限'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        token: Cookie.get("Token"),
        custInfoSelectBox: this.apiPath.hrsc.custInfoSelectBox,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        saveCostCent: this.apiPath.hrsc.saveCostCent,
        searchForm: { // 搜索条件
          costCentNo: '',
          costCentName: '',
          isEffect: 1,
          isEffectName: '有效',
          custId: '',
          custName: ''
        },
        roleFormRules: {
          roleState: [{}],
          roleType: [{}],
          roleName: [{}]
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
        seeDto: {}, // 查看弹层的数据
        modifyAndAdd: false, // 修改，添加控制弹层显示
        alertTitle: '',
        modifyAndAddForm: {
          custId: '',
          custName: '',
          costCentName: '',
          moneyUpperLimit: '',
          moneyLowerLimit: '',
          remark: ''
        }, // 修改新增 弹框 表单数据
        modifyAndAddFormRules: {
          custName: [
            {required: true, message: '请选择客户名称', trigger: 'change'}
          ],
          costCentName: [
            {required: true, message: '请输入成本中心名称', trigger: 'change'}
          ],
          moneyUpperLimit: [
            {validator: this.validator.checkMaxTwoNumCost, trigger: 'change'},
            {validator: upLimit, trigger: 'change'}
          ],
          moneyLowerLimit: [
            {validator: this.validator.checkMaxTwoNumCost, trigger: 'change'},
            {validator: LowerLimit, trigger: 'change'}
          ]
        },
        roleList: []
      };
    },
//    created () {
//      this.getList()
//      this.getRoleSelectList();
//    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
//      selectCallBack (selectTion, row) { // 手动选中checkBox回调
//        if (selectTion.length >= 2) {
//          selectTion.splice(0, selectTion.length - 1);
//        }
//        checkedArr = selectTion;
//      },
      viewAll: function () {
        this.getList('all');
      },
      searchFun () {
        this.page.pageNum = 1;
        this.getList();
      },
      //  新增成本中心信息
      addFun () {
        this.$refs.modifyAndAddForm.validate((valid) => {
          console.log(this.searchForm.costCentName);
          if (valid) {
            api.post(this.apiPath.hrsc.saveCostCent, this.modifyAndAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                console.log(111);
                this.$message({message: '新增成功！', type: 'success'});
                this.modifyAndAdd = false;
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit');
          }
        });
      },
      // 修改成本中心信息
      updateFun () {
        this.$refs['modifyAndAddForm'].validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.updateCostCent, this.modifyAndAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.$message({message: '修改成功！', type: 'success'});
                this.modifyAndAdd = false;
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit');
          }
        });
      },
      submitForm () {
        if (this.alertTitle === '新增成本中心信息') {
          this.addFun();
        } else {
          this.updateFun();
        }
      },
      getList (all) {
        let obj = {};
        obj.data = this.searchForm;
        if (all === 'all') {
          obj.data = {};
        }
        getPageInfo(obj, this.page);
        api.post(this.apiPath.hrsc.findCustCostPage, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
//          checkedArr = [];
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        this.page.pageNum = page;
        this.getList();
      },
      choooseNum: function (pageSize) {
        this.page.pageSize = pageSize;
        this.getList();
      },
      addRole: function () {
        this.modifyAndAdd = true;
        this.alertTitle = '新增成本中心信息';
      },
      modifyRole: function (data) {
        this.alertTitle = '修改成本中心信息'; // 信息两字放不开，应该修改dialog，title宽度
        this.modifyAndAdd = true;
        api.post(this.apiPath.hrsc.findCostCent, data).then(res => {
          this.modifyAndAddForm = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      seeRole: function (data) {
        this.seeItem = true;
        api.post(this.apiPath.hrsc.findCostCent, data).then(res => {
          this.seeDto = res.data;
          this.seeItem = true;
        }).catch(err => {
          console.log(err);
        });
      },
      delRole: function (data) {
        this.$alert('确定失效该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            if (action === 'cancel') { return; }
            let obj = {};
            obj.isEffect = 0;
            obj.costCentId = data.costCentId;
            api.post(this.apiPath.hrsc.deleteCostCent, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.getList();
                this.$message({message: '失效成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
//        }
      },
//      getCorpSelectList: function () { // 获取公司下拉框的列表
//        api.getCorpSelectList().then(res => {
//          this.cropList = res.list;
//        }).catch(err => {
//          console.log(err);
//        });
//      },
//      getRoleSelectList: function () { // 获取角色类型下拉框的列表
//        api.getRoleSelectList().then(res => {
//          this.roleList = res.list;
//        }).catch(err => {
//          console.log(err);
//        });
//      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
//      getSelectRoleValue: function (name, id) { // 获取角色下拉框的选中值
//        console.log(name, id);
//        this.searchForm.roleType = name;
//        this.searchForm.roleId = id;
//      }
//      modifyOpen: function () { // 修改对话框打开回调
//
//      },
//      getFileName (file) {
//        this.companyForm.upLoadFileName = file.name;
//      },
//      fileSuccess () {
//        this.$alert('上传成功！', '温馨提示', {
//          confirmButtonText: '确 定',
//          type: 'success', // icon图标类型
//          dragFlag: true,
//          customClass: '', // 添加class
//          lockScroll: true,
//          callback: action => {
//          }
//        });
//      },
//      fileError () {
//        this.$alert('上传失败！', '温馨提示', {
//          confirmButtonText: '确 定',
//          type: 'error', // icon图标类型
//          dragFlag: true,
//          customClass: '', // 添加class
//          lockScroll: true,
//          callback: action => {
//          }
//        });
//      }
    }
  };
</script>
