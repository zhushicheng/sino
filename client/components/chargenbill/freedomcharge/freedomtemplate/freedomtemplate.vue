<template>
  <div>
    <div class=" invinfo" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="收费账单模版查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <span class="search-inner-name">模版名称：</span>
                <sino-input class="fl" type="text" v-model="searchForm.tempName"
                            :disabled="false"></sino-input>
                <input type="hidden" v-model="searchForm.objId">
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
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="locksingle"><i class="iconfont sino-tubiao"></i>拆分
            </sino-button>
            <sino-button type="icon-text" @click="merge"><i class="iconfont sino-Group"></i>合并
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" max-height="416" stripe @selection-change="selectCallBack" @select-all="selectTabelRowAll">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="tempName" label="模板名称" min-width="180"></sino-table-column>
          <sino-table-column prop="costCentName" label="成本中心" min-width="180">
            <template scope="scope">
              <div class="oper-btns" v-if="scope.row.oper == true">
                <span v-for="(items, index) in scope.row.costCents" :key="index">{{items.costCentName +' '}}</span>
              </div>
            </template>
          </sino-table-column>
          <sino-table-column label="涉及产品类型" prop="chargeBillTempProdTypeName" min-width="180">
            <template scope="scope">
              <div class="oper-btns" v-if="scope.row.oper == true">
                <span v-for="(items, index) in scope.row.prodTypes" :key="index">{{items.chargeBillTempProdTypeName +' '}}</span>
              </div>
            </template>
          </sino-table-column>
          <sino-table-column prop="isPostBillName" label="是否邮寄"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right" width="120">
            <template scope="scope">
              <div v-if="scope.row.oper === true">
                <span class="table-span" @click="modifyFun(scope.row.chargeBillTempId)">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="billmeter(scope.row.chargeBillTempId)">配置表头</span>
              </div>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page class="pro-ser-tem" v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
      <!--修改-->
      <sino-dialog :visible.sync="modifyAndAdd" v-on:close="resetForm('modifyList')" size="small"
                   class="see-dirc usermanage accuman-footer-margin small-dialog overFlAu">
        <sino-title slot="title" type="levelOne" title="修改收费账单模版" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-modify1">
          <sino-form :model="modifyList" ref="modifyList" :rules="modifyListRules" class="demo-ruleForm clearfix modify-billing-form">
            <sino-form-item label="收费账单模版名称：" prop="taxpayerTypeDict">
              <sino-input class="fl" type="text" v-model="modifyList.tempName" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="是否邮寄：" prop="isPostBill" style="margin-bottom: 0">
              <sino-radio v-for="(item, index) in postBillList" :key="index" v-model="modifyList.isPostBill" :label="item.id">
                {{item.title}}
              </sino-radio>
            </sino-form-item>
            <!--<sino-form-item label="是否按客户生成账单：" prop="isCustGroup">-->
            <!--<sino-radio v-for="item in postBillList" v-model="modifyList.isCustGroup" :label="item.id">-->
            <!--{{item.title}}-->
            <!--</sino-radio>-->
            <!--</sino-form-item>-->
          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitFun('modifyList')">修 改</sino-button>
      </span>
      </sino-dialog>
      <!-- 拆分弹窗 -->
      <sino-dialog :visible.sync="splitPopsFlag" @close="resetForm('splitForm')" size="samll"  top="5%"
                   class="see-dirc usermanage dialog-overflow-y dialog-overflow-z">
        <sino-title slot="title" type="levelOne" title="拆分收费账单模板" class="sino-dialog-title"></sino-title>

        <sino-form :model="splitForm" :rules="splitFormRules" ref="splitForm" class="serch-form">
          <sino-form-item label="选择拆分类型：" class="search-inner-item new-template-item" prop="chargeBillTempProdType">
            <sino-radio-group  @change="radioChange" v-model="splitForm.radio">
              <sino-radio v-model="splitForm.radio" :label="1">产品类型</sino-radio>
              <sino-radio v-model="splitForm.radio" :label="2">成本中心</sino-radio>
            </sino-radio-group>
          </sino-form-item>
          <sino-title class="exclusive-line" type="levelTwo" :title="'当前模版-'+titleA"></sino-title>
          <div class="local-info" v-if="splitForm.radio === 1">
            <ul class="local-info-ul exclusive-line ml-percentage">
              <li  class="emp-address product-template">
                <sino-button class="mb15" @click="(activeModuleIndex !== null && (prodTypesId.indexOf(item.chargeBillTempProdType) === -1))?spliteTextClick(item):''" :disabled="(prodTypesId.indexOf(item.chargeBillTempProdType) === -1)?false:true"  v-for="(item, index) in moduleList" :key="index">{{item.chargeBillTempProdTypeName}}</sino-button>
              </li>
            </ul>
          </div>
          <div class="local-info" v-if="splitForm.radio === 2">
            <ul class="local-info-ul exclusive-line ml-percentage">
              <li  class="emp-address product-template">
                <sino-button class="mb15" @click="(activeModuleIndexA !== null && (prodTypesIdA.indexOf(item.costCentId) === -1))?spliteTextClickA(item):''" :disabled="(prodTypesIdA.indexOf(item.costCentId) === -1)?false:true"  v-for="(item, index) in moduleListA" :key="index">{{item.costCentName}}</sino-button>
              </li>
            </ul>
          </div>
          <!--新模版-->
          <div class="local-info" v-if="splitForm.radio === 1">
            <sino-title class="exclusive-line" type="levelTwo" title="新模版">
              <sino-button class="fr new-template-btn" type="icon-text"  @click="listAdd"><i class="iconfont sino-add"></i>新增</sino-button>
            </sino-title>
            <ul class="local-info-ul exclusive-line new-template"  v-for="(items,index) in list" :key="index">
              <li>
                <sino-form-item label="模版名称：" class="search-inner-item" prop="tempName">
                  <sino-input class="fl" type="text" :disabled="index !== activeModuleIndex" v-model="list[index].tempName"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="产品类型：" class="search-inner-item new-template-item" prop="chargeBillTempProdType">
                  <sino-input v-for="(item, index) in items.prodTypes" :key="index" v-model="item.chargeBillTempProdTypeName"><i class="iconfont sino-cuowu small-del" v-if="items.flag" @click="delChildType(index,item.chargeBillTempProdType)"></i></sino-input>
                </sino-form-item>
              </li>
              <sino-button class="baocun" type="text" @click="saveAndModify(items.flag,index)">{{items.flag? '保存':'修改'}}</sino-button>
              <sino-button type="text" class="template-del template-clear" v-if="index !==0" @click="del(index,items.prodTypes)">删除</sino-button>
            </ul>
          </div>
          <div class="local-info" v-if="splitForm.radio === 2">
            <sino-title class="exclusive-line" type="levelTwo" title="新模版">
              <sino-button class="fr new-template-btn" type="icon-text"  @click="listAddA"><i class="iconfont sino-add"></i>新增</sino-button>
            </sino-title>
            <ul class="local-info-ul exclusive-line new-template"  v-for="(items,index) in listA" :key="index">
              <li>
                <sino-form-item label="模版名称：" class="search-inner-item" prop="tempName">
                  <sino-input class="fl" type="text" :disabled="index !== activeModuleIndexA" v-model="listA[index].tempName"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="成本中心：" class="search-inner-item new-template-item" prop="costCentId">
                  <sino-input v-for="(item, index) in items.costCents" :key="index" v-model="item.costCentName"><i class="iconfont sino-cuowu small-del" v-if="items.flag" @click="delChildTypeA(index,item.costCentId)"></i></sino-input>
                </sino-form-item>
              </li>
              <sino-button class="baocun" type="text" @click="saveAndModifyA(items.flag,index)">{{items.flag? '保存':'修改'}}</sino-button>
              <sino-button type="text" class="template-del template-clear" v-if="index !==0" @click="delA(index,items.costCents)">删除</sino-button>
            </ul>
          </div>
          <div class="clear"></div>
          <!--<div class="split-template-btn">-->
            <!--<sino-button type="primary" @click="splitFun('splitForm')">确 定</sino-button>-->
          <!--</div>-->
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="splitFun('splitForm')">确 定</sino-button>
      </span>
      </sino-dialog>
      <!-- 合并弹窗 -->
      <sino-dialog :visible.sync="mergeFlag" size="small" class="batch-import" v-on:close="resetForm('modifyAndAddForm')">
        <sino-title slot="title" type="levelOne" title="合并收费账单模版" class="sino-dialog-title"></sino-title>
        <sino-form :model="modifyAndAddForm" ref="modifyAndAddForm" class="demo-ruleForm">
          <sino-form-item label="收费账单模版名称：" prop="taxpayerTypeDict" class="sino-form-item1 consolidated-billing-template">
            <sino-select :tipText="'请选择'"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :linkage="true"
                         :chooseName.sync="modifyAndAddForm.goalChargeBillName"
                         :chooseId.sync="modifyAndAddForm.goalChargeBillId"
                         :data="taxpayerTypeData"
                         :token="token"
                         :clear="true" :url="selectBoxChargeBill"></sino-select>
          </sino-form-item>
        </sino-form>
        <sino-button type="primary" @click="mergeSubmit">确 定</sino-button>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
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
  let checkedArr = [];
  export default {
    data () {
      return {
        token: Cookie.get('Token'),
        routerView: false,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        selectBoxChargeBill: this.apiPath.hrsc.chargeBillTempCustBox, // 下拉
        searchForm: { // 搜索条件
          tempName: '',
          objId: ''
        },
//        radio: 1,
        titleA: '',
        moduleList: [],
        moduleListA: [],
        prodTypesId: [],
        prodTypesIdA: [],
        prodTypesIdLength: 0,
        prodTypesIdLengthA: 0,
        activeModuleIndex: 0,
        activeModuleIndexA: 0,
        postBillList: [],
        searchFormRules: {},
        addlocalInfoRules: {},
        modifyList: {
          tempName: '',
          isPostBill: '',
          chargeBillTempId: ''
        },
        splitForm: {
          radio: 1,
          tempName: '',
          prodTypes: [],
          updateChargeBillTempId: '',
          costCents: []
        },
        list: [
          {flag: true, prodTypes: []}
        ],
        listA: [
          {flag: true, costCents: []}
        ],
        splitFormRules: {},
        taxpayerTypeData: {
          id: this.$route.query.custId,
          list: []
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
        sourceList: [],
        seeItem: false, // 查看弹层控制显示
        seeDirData: {}, // 查看弹层的数据
        splitPopsFlag: false, // 拆分弹窗
        mergeFlag: false, // 合并弹窗
        modifyAndAdd: false, // 修改，添加控制弹层显示
        modifyAndAddForm: {
          goalChargeBillId: '',
          goalChargeBillName: ''
        },
        modifyAndAddFormRules: {},
        modifyListRules: {
          tempName: [
            {required: true, message: '请输入收费账单模版名称', trigger: 'change'}
          ]
        },
        sessionValue: []
      };
    },
    mounted: function () {
      api.post(this.dictSelUrl, {code: 'YES_NO'}).then(res => {
        this.postBillList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    created: function () {
      this.stateFlag = this.$route.query.type;
      if (this.stateFlag === 'modify') {
        this.initFlag = true;
      }
      this.ruoteJudge();
      if (this.$route.query.custId) {
        this.searchForm.objId = this.$route.query.custId;
        this.searchFun();
      }
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/freedomcharge/freedomtemplate") {
            this.routerView = false;
          }
        }
      }
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/freedomcharge/freedomtemplate") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      billmeter (_data) {
        this.routerView = true;
        this.$router.push({path: '/freedomcharge/freedomtemplate/configurationHeader', query: {chargeBillTempId: _data}});
      },
      merge () {
        console.log(checkedArr);
        if (!checkedArr || checkedArr.length === 0) {
          this.$alert('请选择至少一项进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'info', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              return;
            }
          });
          return;
        }
        this.mergeFlag = true;
        // this.taxpayerTypeData.list = [];
        let that = this;
        new Promise(function (resolve) {
          resolve();
        }).then(function () {
          that.taxpayerTypeData.list = checkedArr.map(function (item) {
            return item.chargeBillTempId;
          });
        });
        this.taxpayerTypeData.creSuppId = Number(this.$route.query.objId);
      },
      locksingle () {
        if (checkedArr === '' || checkedArr.length === 0) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        if (checkedArr.length > 1) {
          this.$alert('最多选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        } else {
          api.post(this.apiPath.hrsc.findChargeBillTempCustById, {chargeBillTempId: checkedArr[0].chargeBillTempId}).then(res => {
            this.splitPopsFlag = true;
            this.moduleList = res.data.prodTypes;
            this.moduleListA = res.data.costCents;
            this.titleA = checkedArr[0].tempName;
            this.modifyAndAddForm = checkedArr[0];
            this.splitForm.updateChargeBillTempId = res.data.chargeBillTempId;
            this.splitForm.prodTypes = res.data.prodTypes;
            this.splitForm.costCents = res.data.costCents;
            this.prodTypesIdLength = res.data.prodTypes.length;
            this.prodTypesIdLengthA = res.data.costCents.length;
          });
        }
      },
      spliteTextClick (item) {
        let sessionValue = [];
        let bool = true;
        let val = this.list[this.activeModuleIndex].tempName ? this.list[this.activeModuleIndex].tempName.split(';') : [];
        this.list[this.activeModuleIndex].prodTypes.forEach(item1 => {
          sessionValue.push(item1.chargeBillTempProdTypeName);
        });
        for (let i = 0; i < val.length; i++) {
          if (sessionValue.indexOf(val[i])  == -1) {
            bool = false;
            break;
          }
        }
        if (bool) {
          sessionValue.push(item.chargeBillTempProdTypeName);
          this.list[this.activeModuleIndex].tempName = sessionValue.join(';');
        } else {}
        this.list[this.activeModuleIndex].prodTypes.push(item);
        this.prodTypesId.push(item.chargeBillTempProdType);
      },
      spliteTextClickA (item) {
        let sessionValue = [];
        let bool = true;
        let val = this.listA[this.activeModuleIndexA].tempName ? this.listA[this.activeModuleIndexA].tempName.split(';') : [];
        this.listA[this.activeModuleIndexA].costCents.forEach(item1 => {
          sessionValue.push(item1.costCentName);
        });
        for (let i = 0; i < val.length; i++) {
          if (sessionValue.indexOf(val[i])  == -1) {
            bool = false;
            break;
          }
        }
        if (bool) {
          sessionValue.push(item.costCentName);
          this.listA[this.activeModuleIndexA].tempName = sessionValue.join(';');
        } else {}
        this.listA[this.activeModuleIndexA].costCents.push(item);
        this.prodTypesIdA.push(item.costCentId);
      },
      listAdd () {
        var openDoor = true;
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].flag === true) {
            openDoor = false;
//            console.log(this.list)
          }
        }
        if (this.prodTypesIdLength !== this.prodTypesId.length) {
          if (openDoor) {
            this.list.push({flag: true, prodTypes: [], tempName: ''});
            this.activeModuleIndex = this.list.length - 1;
          }
        }
      },
      listAddA () {
        var openDoor = true;
        for (var i = 0; i < this.listA.length; i++) {
          if (this.listA[i].flag === true) {
            openDoor = false;
//            console.log(this.list)
          }
        }
        if (this.prodTypesIdLengthA !== this.prodTypesIdA.length) {
          if (openDoor) {
            this.listA.push({flag: true, costCents: [], tempName: ''});
            this.activeModuleIndexA = this.listA.length - 1;
          }
        }
      },
      radioChange (value) {
        if (value === 1) {
          this.prodTypesId.splice(0);
          this.list = [{flag: true, prodTypes: []}];
          this.activeModuleIndex = this.list.length - 1;
        }
        if (value === 2) {
          this.prodTypesIdA.splice(0);
          this.listA = [{flag: true, costCents: []}];
          this.activeModuleIndexA = this.listA.length - 1;
        }
      },
      delChildType (index, type) {
        let sessionValue = [];
        let bool = true;
        let val = this.list[this.activeModuleIndex].tempName ? this.list[this.activeModuleIndex].tempName.split(';') : [];
        this.list[this.activeModuleIndex].prodTypes.forEach(item1 => {
          sessionValue.push(item1.chargeBillTempProdTypeName);
        });
        for (let i = 0; i < val.length; i++) {
          if (sessionValue.indexOf(val[i])  == -1) {
            bool = false;
            break;
          }
        }
        if (bool) {
          sessionValue.splice(index, 1);
          this.list[this.activeModuleIndex].tempName = sessionValue.join(';');
        } else {}
        this.list[this.activeModuleIndex].prodTypes.splice(index, 1);
        this.prodTypesId.splice(this.prodTypesId.indexOf(type), 1);
      },
      delChildTypeA (index, type) {
        // this.sessionValue.splice(index, 1);
        let sessionValue = [];
        let bool = true;
        let val = this.listA[this.activeModuleIndexA].tempName ? this.listA[this.activeModuleIndexA].tempName.split(';') : [];
        this.listA[this.activeModuleIndexA].costCents.forEach(item => {
          sessionValue.push(item.costCentName);
        });
        for (let i = 0; i < val.length; i++) {
          if (sessionValue.indexOf(val[i])  == -1) {
            bool = false;
            break;
          }
        }
        if (bool) {
          sessionValue.splice(index, 1);
          this.listA[this.activeModuleIndexA].tempName = sessionValue.join(';');
        } else {}
        this.listA[this.activeModuleIndexA].costCents.splice(index, 1);
        this.prodTypesIdA.splice(this.prodTypesId.indexOf(type), 1);
      },
      del (index, list) {
        for (var j = 0; j < list.length; j++) {
          this.prodTypesId.splice(this.prodTypesId.indexOf(list[j].chargeBillTempProdType), 1);
        }
        this.list.splice(index, 1);
        if (index === this.activeModuleIndex) {
          this.activeModuleIndex = null;
        } else {
          for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].flag) {
              this.activeModuleIndex = i;
            }
          }
        }
      },
      delA (index, listA) {
        for (var j = 0; j < listA.length; j++) {
          this.prodTypesIdA.splice(this.prodTypesIdA.indexOf(listA[j].costCentId), 1);
        }
        this.listA.splice(index, 1);
        if (index === this.activeModuleIndexA) {
          this.activeModuleIndexA = null;
        } else {
          for (var i = 0; i < this.listA.length; i++) {
            if (this.listA[i].flag) {
              this.activeModuleIndexA = i;
            }
          }
        }
      },
      saveAndModify (bool, index) {
//        console.log(this.splitForm.tempName);
        if (bool) {
          if (index === this.activeModuleIndex) {
            this.list[index].flag = !bool;
            this.activeModuleIndex = null;
          }
        } else {
          var openDoor = true;
          for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].flag === true) {
              openDoor = false;
            }
          }
          if (openDoor) {
            this.list[index].flag = true;
            this.activeModuleIndex = index;
          }
        }
      },
      saveAndModifyA (bool, index) {
//        console.log(this.splitForm.tempName);
        if (bool) {
          if (index === this.activeModuleIndexA) {
            this.listA[index].flag = !bool;
            this.activeModuleIndexA = null;
          }
        } else {
          var openDoor = true;
          for (var i = 0; i < this.listA.length; i++) {
            if (this.listA[i].flag === true) {
              openDoor = false;
            }
          }
          if (openDoor) {
            this.listA[index].flag = true;
            this.activeModuleIndexA = index;
          }
        }
      },
      splitFun () {
        let _data = [];
        if (this.list[0].prodTypes.length > 0) {
          for (var i = 0; i < this.list.length; i++) {
            var arr1 = JSON.parse(JSON.stringify(this.list[i]));
            delete arr1.flag;
            arr1.updateChargeBillTempId = this.splitForm.updateChargeBillTempId;
            _data.push(arr1);
          }
          api.post(this.apiPath.hrsc.saveChargeBillTempDetCust, _data).then(res => {
            if (res.code === 'CPYY-00001') {
              this.splitPopsFlag = false;
              this.searchFun();
              this.$message({message: '拆分成功！', type: 'success'});
            }
//            console.log(res);
          });
        }
        if (this.listA[0].costCents.length > 0) {
          for (var j = 0; j < this.listA.length; j++) {
            var arr2 = JSON.parse(JSON.stringify(this.listA[j]));
            delete arr2.flag;
            arr2.updateChargeBillTempId = this.splitForm.updateChargeBillTempId;
            _data.push(arr2);
          }
          api.post(this.apiPath.hrsc.saveChargeBillTempDetCust, _data).then(res => {
            if (res.code === 'CPYY-00001') {
              this.splitPopsFlag = false;
              this.searchFun();
              this.$message({message: '拆分成功！', type: 'success'});
            }
//            console.log(res);
          });
        }
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        let arr = [];
        selectTion.forEach(function (item, index) {
          if (!item.flag) {
            arr.push(JSON.parse(JSON.stringify(item)));
          }
        });
        checkedArr = arr;
      },
      selectTabelRowAll (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.chargeBillTempId) {
            all.push(item);
          }
        }
        this.selectCallBack(all, row);
      },
      searchFun () {
        this.page.pageNum = 1;
        this.getList(this.page.pageNum, this.page.pageSize);
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
        this.list = [{flag: true, prodTypes: []}];
        this.listA = [{flag: true, costCents: []}];
        this.prodTypesId = [];
        this.prodTypesIdA = [];
        this.activeModuleIndex = 0;
        this.activeModuleIndexA = 0;
        this.splitForm.radio = 1;
      },
      submitFun () {
        this.$refs.modifyList.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.updateChargeBillTempCust, this.modifyList).then(res => {
              if (res.code === 'CPYY-00001') {
                this.modifyAndAdd = false;
                this.searchFun();
                this.$message({message: '修改成功！', type: 'success'});
              }
            });
          }
        });
      },
      getList (pageNum, pageSize) {
        let _data = {
          data: this.searchForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findChargeBillTempCustAll, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            if (!res.data.list) {
              this.tableData = '';
              return;
            }
            this.tableData = res.data.list;
            this.page.total = res.data.total;
          };
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler (page) {
        this.page.pageNum = page;
        this.getList(this.page.pageNum, this.page.pageSize);
      },
      choooseNum (pageSize) {
        this.page.pageSize = pageSize;
        this.page.pageNum = 1;
        this.getList(this.page.pageNum, this.page.pageSize);
      },
      modifyFun (data) {
        this.modifyAndAdd = true;
        api.post(this.apiPath.hrsc.findChargeBillTempById, {chargeBillTempId: data}).then(res => {
          this.modifyList.tempName = res.data.tempName;
          this.modifyList.isPostBill = res.data.isPostBill;
          this.modifyList.chargeBillTempId = res.data.chargeBillTempId;
        }).catch(err => {
          console.log(err);
        });
      },
      mergeSubmit () {
        let _chargeBillTempId = [];
        if (checkedArr && checkedArr.length > 0) {
          checkedArr.forEach(function (item, index) {
            _chargeBillTempId.push(item.chargeBillTempId);
          });
        }
        let _data = {
          mergeChargeBillIds: _chargeBillTempId,
          goalChargeBillId: this.modifyAndAddForm.goalChargeBillId
        };
        api.post(this.apiPath.hrsc.mergeChargeBillCust, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.mergeFlag = false;
            this.searchFun();
            this.$message({message: '合并成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>

