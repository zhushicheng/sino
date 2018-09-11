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
        <sino-table :data="tableData" max-height="416" stripe @selection-change="selectCallBack" @select-all='selectTabelRow' border>
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="tempName" label="收费账单模板名称" min-width="180"></sino-table-column>
          <sino-table-column prop="chName" label="签约供应商名称" min-width="180"></sino-table-column>
          <sino-table-column label="涉及产品类型" prop="chargeBillTempProdTypeName" min-width="180">
            <template scope="scope">
              <div class="oper-btns" v-if="scope.row.oper == true">
                <span v-for="(items, index) in scope.row.prodTypes" :key="index">{{items.chargeBillTempProdTypeName +' '}}</span>
              </div>
            </template>
          </sino-table-column>
          <sino-table-column prop="isPostBillName" label="是否邮寄"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right" min-width="120">
            <template scope="scope">
              <div v-if="scope.row.oper === true">
                <span class="table-span" @click="modifyFun(scope.row.chargeBillTempId)">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="billmeter(scope.row.chargeBillTempId)">配置表头</span>
              </div>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
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
            <sino-form-item label="是否邮寄：" prop="isPostBill">
              <sino-radio v-for="(item, index) in postBillList" :key="index" v-model="modifyList.isPostBill" :label="item.id">
                {{item.title}}
              </sino-radio>
            </sino-form-item>
            <sino-form-item label="是否按客户生成账单：" prop="isCustGroup" style="margin-bottom: 0">
              <sino-radio v-for="(item, index) in postBillList" :key="index" v-model="modifyList.isCustGroup" :label="item.id">
                {{item.title}}
              </sino-radio>
            </sino-form-item>
          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitFun('modifyList')">修 改</sino-button>
      </span>
    </sino-dialog>
    <!-- 拆分弹窗 -->
    <sino-dialog :visible.sync="splitPopsFlag" @close="resetForm('splitForm')" size="samll" top="5%"
                 class="see-dirc usermanage accuman-footer-margin dialog-overflow-y dialog-overflow-z">
      <sino-title slot="title" type="levelOne" title="拆分收费账单模板" class="sino-dialog-title"></sino-title>

        <sino-form :model="splitForm" :rules="splitFormRules" ref="splitForm" class="serch-form">
          <sino-title class="exclusive-line" type="levelTwo" :title="'当前模版-'+titleA"></sino-title>
          <div class="local-info">
            <ul class="local-info-ul exclusive-line ml-percentage">
              <li  class="emp-address product-template">
                <sino-button class="mb15" @click="(activeModuleIndex !== null && (prodTypesId.indexOf(item.chargeBillTempProdType) === -1))?spliteTextClick(item):''" :disabled="(prodTypesId.indexOf(item.chargeBillTempProdType) === -1)?false:true"  v-for="(item, index) in moduleList" :key="index">{{item.chargeBillTempProdTypeName}}</sino-button>
              </li>
            </ul>
          </div>
          <!--新模版-->
          <div class="local-info">
            <sino-title class="exclusive-line" type="levelTwo" title="新模版">
              <sino-button class="fr new-template-btn" type="icon-text"  :disabled=disableda @click="listAdd"><i class="iconfont sino-add"></i>新增</sino-button>
            </sino-title>
            <ul class="local-info-ul exclusive-line new-template"  v-for="(items,index) in list" :key="index">
              <li>
                <sino-form-item label="模版名称：" class="search-inner-item" prop="tempName">
                  <sino-input class="fl" type="text" :disabled="index !== activeModuleIndex" v-model="list[index].tempName"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="产品类型：" class="search-inner-item new-template-item" prop="chargeBillTempProdType">
                  <sino-input v-for="(item, index) in items.prodTypes" v-model="item.chargeBillTempProdTypeName" :key="index"><i class="iconfont sino-cuowu small-del" v-if="items.flag" @click="delChildType(index,item.chargeBillTempProdType)"></i></sino-input>
                </sino-form-item>
              </li>
              <sino-button class="baocun" type="text" @click="saveAndModify(items.flag,index)">{{items.flag? '保存':'修改'}}</sino-button>
              <sino-button type="text" class="template-del template-clear" v-if="index !==0" @click="del(index,items.prodTypes)">删除</sino-button>
            </ul>
          </div>
          <div class="clear"></div>
          <!--   <div class="split-template-btn">

             </div>-->
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="splitFun('splitForm')">确 定</sino-button>
      </span>
      </sino-dialog>
      <!-- 合并弹窗 -->
      <sino-dialog :visible.sync="mergeFlag" size="small" class="batch-import" v-on:close="resetForm('modifyAndAddForm')">
        <sino-title slot="title" type="levelOne" title="合并收费账单模版" class="sino-dialog-title"></sino-title>
        <sino-form :model="modifyAndAddForm" ref="modifyAndAddForm" class="demo-ruleForm">
          <sino-form-item label="选择目标账单模板：" prop="taxpayerTypeDict" class="sino-form-item1 consolidated-billing-template">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :chooseName.sync="modifyAndAddForm.goalChargeBillName"
                         :chooseId.sync="modifyAndAddForm.goalChargeBillId"
                         :linkage="true"
                         :data="taxpayerTypeData"
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
        routerView: false,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        selectBoxChargeBill: this.apiPath.hrsc.selectBoxChargeBill, // 下拉
        searchForm: { // 搜索条件
          tempName: ''
        },
        disableda: false,
        titleA: '',
        moduleList: [],
        prodTypesId: [],
        prodTypesIdLength: 0,
        activeModuleIndex: 0,
        postBillList: [],
        searchFormRules: {},
        addlocalInfoRules: {},
        modifyList: {
          tempName: '',
          isPostBill: '',
          isCustGroup: '',
          chargeBillTempId: ''
        },
        splitForm: {
          tempName: '',
          prodTypes: [],
          updateChargeBillTempId: ''
        },
        list: [
          {flag: true, prodTypes: []}
        ],
        splitFormRules: {},
        taxpayerTypeData: {
          // code: "TAXPAYER_TYPE",
          list: []
        },
        tableData: null, // 表格数据
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 40, 50],
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
        }
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/entrustedcharge/chargebilltemplate") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    mounted: function () {
      this.validator.addEnterEvent(this.searchFun);
      api.post(this.dictSelUrl, {code: 'YES_NO'}).then(res => {
        this.postBillList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    created: function () {
      // this.stateFlag = this.$route.query.type;
      // if (this.stateFlag === 'modify') {
      //   this.initFlag = true;
      // }
      this.ruoteJudge();
      this.searchFun();
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/entrustedcharge/chargebilltemplate") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      billmeter (_data) {
        this.routerView = true;
        this.$router.push({path: '/entrustedcharge/chargebilltemplate/configurationHeader', query: {chargeBillTempId: _data}});
      },
//      billmeter (_data) {
//        console.log(_data);
//        this.routerView = true;
//        this.$router.push({path: '/entrustedcharge/chargebilltemplate/ConfigurationHeader', query: {chargeBillTempId: _data}});
//      },
      merge () {
        if (!checkedArr || checkedArr.length === 0) {
          this.$alert('请选择至少一项数据进行操作', '提示信息', {
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
            type: 'warning', // icon图标类型
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
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        } else {
          api.post(this.apiPath.hrsc.findChargeBillTempById, {chargeBillTempId: checkedArr[0].chargeBillTempId}).then(res => {
            this.splitPopsFlag = true;
            this.moduleList = res.data.prodTypes;
            this.titleA = checkedArr[0].tempName;
            this.modifyAndAddForm = checkedArr[0];
            this.splitForm.updateChargeBillTempId = res.data.chargeBillTempId;
            this.splitForm.prodTypes = res.data.prodTypes;
            this.prodTypesIdLength = res.data.prodTypes.length;
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
      listAdd () {
        var openDoor = true;
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].flag === true) {
            openDoor = false;
          }
        }
        if (this.prodTypesIdLength !== this.prodTypesId.length) {
          if (openDoor) {
            this.list.push({flag: true, prodTypes: [], tempName: ''});
            this.activeModuleIndex = this.list.length - 1;
          }
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
      saveAndModify (bool, index) {
        console.log(this.splitForm.tempName);
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
      splitFun () {
        let _data = [];
        for (var i = 0; i < this.list.length; i++) {
          var arr1 = JSON.parse(JSON.stringify(this.list[i]));
          delete arr1.flag;
          arr1.updateChargeBillTempId = this.splitForm.updateChargeBillTempId;
          _data.push(arr1);
        }
        api.post(this.apiPath.hrsc.saveListChargeBillTemp, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.splitPopsFlag = false;
            this.$message({message: '拆分成功！', type: 'success'});
            this.searchFun();
          }
          console.log(res);
        });
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
      selectTabelRow (selectTion, row) {
        let all = [];
        for (let item of selectTion) {
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
        this.prodTypesId = [];
        this.activeModuleIndex = 0;
      },
      submitFun () {
        this.$refs.modifyList.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.updateChargeBillTemp, this.modifyList).then(res => {
              if (res.code === 'CPYY-00001') {
                this.getList(this.page.pageNum, this.page.pageSize);
                this.modifyAndAdd = false;
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
        _data.data.objId = this.$route.query.objId;   //  查询完  跳转传参
        api.post(this.apiPath.hrsc.findChargeBillTempAll, _data).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
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
          this.modifyList.isCustGroup = res.data.isCustGroup;
          this.modifyList.chargeBillTempId = res.data.chargeBillTempId;
//          this.modifyAndAddForm.goalChargeBillId = res.data.goalChargeBillId;
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
        api.post(this.apiPath.hrsc.mergeChargeBill, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.mergeFlag = false;
            this.$message({message: '合并成功！', type: 'success'});
            this.searchFun();
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>

