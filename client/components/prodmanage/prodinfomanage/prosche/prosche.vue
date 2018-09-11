<template>
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('first')">产品基本信息</div>
          <div class="sino-tabs-item is-active">产品方案</div>
          <div class="sino-tabs-item" @click="prodScheFun('third')">产品定价方案</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="prodScheForm" ref="ruleForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">产品名称：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodScheForm.prodName" :chooseId.sync="prodScheForm.prodId"  :clear="true" :url="prodNameSelUrl"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">产品方案名称：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodScheForm.chName" :chooseId.sync="prodScheForm.chId"  :clear="true" :url="prodScheSelUrl"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">产品方案状态：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodScheForm.scheStateName" :chooseId.sync="prodScheForm.scheState "  :clear="true" :url="dictSelUrl" :data="{code:'PROD_STATE'}"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">供应商：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodScheForm.execuSuppName" :chooseId.sync="prodScheForm.execuSuppId"  :clear="true" :url="prodProSelUrl" :token="token"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">支付方向：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodScheForm.payDirName" :chooseId.sync="prodScheForm.payDir"  :clear="true" :url="dictSelUrl" :data="{code:'PROD_PAY_DIR'}"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">服务对象：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodScheForm.serveObjName" :chooseId.sync="prodScheForm.serveObj"  :clear="true" :url="dictSelUrl" :data="{code:'SERVICE_OBJECT_TYPE'}"></sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchBtnFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增</sino-button>
            <sino-button type="icon-text" @click="startFun"><i class="iconfont sino-duihao"></i>启用</sino-button>
            <sino-button type="icon-text" @click="stopFun"><i class="iconfont sino-invalid"></i>停用</sino-button>
          </div>
        </div>
        <sino-table :data="tableData" border max-height="416" stripe v-on:select="selectCallBack" @select-all="selectAllBack" v-on:viewAll="viewAll">
          <sino-table-column type="selection" width="40"></sino-table-column>
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="prodName" label="产品名称" min-width="180"></sino-table-column>
          <sino-table-column prop="chName" label="产品方案名称" min-width="180"></sino-table-column>
          <sino-table-column prop="execuSuppName" label="供应商" min-width="180"></sino-table-column>
          <sino-table-column prop="suppPriceDesc" label="供应商报价" min-width="95"></sino-table-column>
          <sino-table-column prop="scheStateName" label="产品方案状态" min-width="105"></sino-table-column>
          <sino-table-column prop="payDirName" label="支付方向"></sino-table-column>
          <sino-table-column label="操作" align="center" width="220" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i" v-if="scope.row.scheState!==2">|</i>
                <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.scheState!==2">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="manProdFun(scope.row)">管理产品定价方案</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--新增/修改-->
    <sino-dialog :visible.sync="prodScheAdd" size="large" :top="'10%'" class="dialog-height overflow-dialog" @close ="resetForm('prodScheAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="prodScheAddForm" :rules="prodScheAddRules" ref="prodScheAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="产品名称：" class="sino-form-item-width"  prop="prodName">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="alertTitle==='修改产品方案'"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :chooseName.sync="prodScheAddForm.prodName"
                       :chooseId.sync="prodScheAddForm.prodId"
                       :clear="alertTitle!=='修改产品方案'" :url="prodNameSelUrl"></sino-select>
        </sino-form-item>
        <sino-form-item label="产品方案编号：" class="sino-form-item-width"  prop="code" v-if="alertTitle==='修改产品方案'">
          <sino-input type="text" v-model="prodScheAddForm.code" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item label="产品方案名称：" class="sino-form-item-width"  prop="chName">
          <sino-input type="text" v-model="prodScheAddForm.chName" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item label="产品方案西文名称：" class="sino-form-item-width"  prop="enName">
          <sino-input type="text" v-model="prodScheAddForm.enName" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item label="供应商：" class="sino-form-item-width"  prop="execuSuppName">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :token="token"
                       :chooseName.sync="prodScheAddForm.execuSuppName"
                       :chooseId.sync="prodScheAddForm.execuSuppId"
                       :clear="true" :url="prodProSelUrl"></sino-select>
        </sino-form-item>
        <sino-form-item label="产品方案状态：" class="h25" prop="scheStateName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodScheAddForm.scheStateName" :chooseId.sync="prodScheAddForm.scheState"
                       :clear="true" :url="dictSelUrl" :data="{code:'PROD_STATE'}"></sino-select>
        </sino-form-item>
        <sino-form-item label="供应商报价：" class="h25" prop="suppPriceDesc">
          <sino-input type="text" v-model="prodScheAddForm.suppPriceDesc"></sino-input>
        </sino-form-item>
        <sino-form-item label="支付方向：" class="h25" prop="payDirName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodScheAddForm.payDirName" :chooseId.sync="prodScheAddForm.payDir"
                       :clear="true" :url="dictSelUrl" :data="{code:'PROD_PAY_DIR'}"></sino-select>
        </sino-form-item>
        <sino-form-item label="服务对象：" class="h25" prop="serveObjName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodScheAddForm.serveObjName" :chooseId.sync="prodScheAddForm.serveObj"
                       :clear="true" :url="dictSelUrl" :data="{code:'SERVICE_OBJECT_TYPE'}"></sino-select>
        </sino-form-item>
        <sino-form-item label="计费频率单位：" class="h25" prop="chargingFreUnitName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodScheAddForm.chargingFreUnitName" :chooseId.sync="prodScheAddForm.chargingFreUnit"
                       :clear="true" :url="dictSelUrl" :data="{code:'CHARGE_FRE_UNIT'}" @change="chargingFreUChange"></sino-select>
        </sino-form-item>
        <sino-form-item label="计费频率：" class="h25" prop="chargingFr">
          <sino-input type="text" v-model.number="prodScheAddForm.chargingFr"></sino-input>
        </sino-form-item>
        <sino-form-item label="收费频率单位：" class="h25" prop="chargeFreUnitName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodScheAddForm.chargeFreUnitName" :chooseId.sync="prodScheAddForm.chargeFreUnit"
                       :clear="true" :url="dictSelUrl" :data="{code:'CHARGE_FRE_UNIT  '}"></sino-select>
        </sino-form-item>
        <sino-form-item label="收费频率：" class="h25" prop="chargeFre">
          <sino-input type="text" v-model.number="prodScheAddForm.chargeFre"></sino-input>
        </sino-form-item>
        <sino-form-item label="收费周期参与计算：" prop="isCharging" class="radio-item h25" :justText="false">
          <sino-radio v-for="(item, index) in trackStatus" :key="index" v-model.number="prodScheAddForm.isCharging" :label="item.id" class="leads-sinoradio">{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item label="首末月按天计算：" prop="balance" class="radio-item h25" :justText="false" v-if="prodScheAddForm.chargingFreUnit === 1">

          <sino-radio v-for="(item, index) in trackStatus" :key="index" v-model.number="prodScheAddForm.balance" :label="item.id" class="leads-sinoradio">{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width" prop="scheDesc" label="产品方案说明：">
          <sino-input type="textarea" v-model="prodScheAddForm.scheDesc" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
          <sino-input type="textarea" v-model="prodScheAddForm.remark" :disabled="false" ></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer add-more-button">
        <sino-button type="primary" @click="submitForm('prodScheAddForm')">{{leadsbtn}}</sino-button>
        <sino-button type="text" @click="moreProdOperFun" v-if="alertTitle==='新增产品方案'">保存并添加产品定价方案</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="查看产品方案" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li class="li-last">
            <h6>产品名称</h6><span v-text="seeForm.prodName"></span>
          </li>
          <li>
            <h6>产品方案编号</h6><span v-text="seeForm.code"></span>
          </li>
          <li>
            <h6>产品方案名称</h6><span v-text="seeForm.chName"></span>
          </li>
          <li>
            <h6>产品方案西文名称</h6><span v-text="seeForm.enName"></span>
          </li>
          <li>
            <h6>供应商</h6><span v-text="seeForm.execuSuppName"></span>
          </li>
          <li>
            <h6>产品方案状态</h6><span v-text="seeForm.scheStateName"></span>
          </li>
          <li>
            <h6>供应商报价</h6><span v-text="seeForm.suppPriceDesc"></span>
          </li>
          <li>
            <h6>支付方向</h6><span v-text="seeForm.payDirName"></span>
          </li>
          <li>
            <h6>服务对象</h6><span v-text="seeForm.serveObjName"></span>
          </li>
          <li>
            <h6>计费频率单位</h6><span v-text="seeForm.chargingFreUnitName"></span>
          </li>
          <li>
            <h6>计费频率</h6><span v-text="seeForm.chargingFr"></span>
          </li>
          <li>
            <h6>收费频率单位</h6><span v-text="seeForm.chargeFreUnitName"></span>
          </li>
          <li>
            <h6>收费频率</h6><span v-text="seeForm.chargeFre"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="seeForm.creName"></span>
          </li>
          <li>
            <h6>创建时间</h6><span v-text="seeForm.creTime"></span>
          </li>
          <li class="li-last">
            <h6>产品方案说明</h6><span v-text="seeForm.scheDesc"></span>
          </li>
          <li class="li-last">
            <h6>备注</h6><span v-text="seeForm.remark"></span>
          </li>
        </ul>
      </div>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  import vald from '../../../../validator/index.js';
  import Cookie from 'js-cookie';
  let checkedArr = '';
  export default {
    components: {},
    data () {
      return {
        activeName: 'second',
        prodScheSelUrl: this.apiPath.hrsc.findprodscheselectbox,
        prodNameSelUrl: this.apiPath.hrsc.findprodinfoselectbox,
        prodProSelUrl: this.apiPath.hrsc.selectBox, // g
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        token: Cookie.get('Token'),
        prodScheForm: {
          prodName: '',
          prodId: '',
          chName: '',
          chId: '',
          scheStateName: '',
          scheState: '',
          execuSuppName: '',
          execuSuppId: '',
          payDirName: '',
          payDir: '',
          serveObjName: '',
          serveObj: ''
        },
        trackStatus: [],
        isA: true,
        tableData: null,
        total: null,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        alertTitle: '', // 弹层title
        leadsbtn: '', // 弹层button
        prodScheAdd: false,
        prodScheAddForm: {
          prodName: '',
          prodId: '',
          chName: '',
          execuSuppName: '',
          execuSuppId: '',
          scheStateName: '未启用',
          scheState: 1,
          payDirName: '',
          payDir: '',
          serveObjName: '对员工',
          serveObj: '1',
          chargingFreUnitName: '',
          chargingFreUnit: '',
          chargingFr: '',
          chargeFreUnitName: '',
          chargeFreUnit: '',
          chargeFre: '',
          isCharging: '',
          balance: '',
          balanceName: '',
          enName: '',
          suppPriceDesc: '',
          scheDesc: '',
          remark: '',
          code: ''

        },
        // 校验
        prodScheAddRules: {
          prodName: [
            {required: true, message: '产品名称为必填项', trigger: 'change'}
          ],
          chName: [
            {required: true, message: '产品方案名称为必填项', trigger: 'change'}
          ],
          execuSuppName: [
            {required: true, message: '供应商为必填项', trigger: 'change'}
          ],
          scheStateName: [
            {required: true, message: '产品方案状态为必填项', trigger: 'change'}
          ],
          payDirName: [
            {required: true, message: '支付方向为必填项', trigger: 'change'}
          ],
          serveObjName: [
            {required: true, message: '服务对象为必填项', trigger: 'change'}
          ],
          chargingFreUnitName: [
            {required: true, message: '计费频率单位为必填项', trigger: 'change'}
          ],
          chargingFr: [
            { required: true, type: 'number', message: '计费频率为数字类型，且为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          chargeFreUnitName: [
            {required: true, message: '收费频率单位为必填项', trigger: 'change'}
          ],
          chargeFre: [
            { required: true, type: 'number', message: '收费频率为数字类型，且为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          isCharging: [
            {required: true, type: 'number', message: '收费周期是否参与计算为必选项', trigger: 'blur'}
          ],
          balance: [
            {required: true, type: 'number', message: '首末月是否按天结算为必选项', trigger: 'blur'}
          ]
        },
        seeForm: {},
        leadsAdd: false, // 添加弹层
        seeItem: false, // 控制查看弹层的显示
        moreProdOperFlag: false
      };
    },
    created () {
      if (this.$route.query.prodId) {
        this.prodScheForm.prodId = this.$route.query.prodId;
        this.prodScheForm.prodName = this.$route.query.prodCnName;
        this.searchFun();
      }
      api.post(this.dictSelUrl, {code: 'YES_NO'}).then(res => {
        this.trackStatus = res.data.list;
        console.log(this.trackStatus);
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      this.validator.addEnterEvent(this.searchBtnFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      chargingFreUChange () {
        if (this.prodScheAddForm.chargingFreUnit !== 1) {
          this.prodScheAddForm.balance = '';
        }
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        if (order === 'first') {
          this.$router.push({path: '/prodInfo'});
        } else if (order === 'third') {
          this.$router.push({path: '/prodPrice'});
        }
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
//        if (selectTion.length >= 2) {
//          selectTion.splice(0, selectTion.length - 1);
//        }
        checkedArr = selectTion;
      },
      selectAllBack (selectTion, row) {
        checkedArr = selectTion;
      },
      resetForm: function () { // 修改对话框打开回调
        this.$refs.prodScheAddForm.resetFields();
      },
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: 1,
          pageSize: 10,
          data: this.prodScheForm
        };
        api.post(this.apiPath.hrsc.findpagehrscprodsche, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchBtnFun () {
        this.pageNum = 1;
        this.pageSize = 10;
        this.searchFun();
      },
      searchFun () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: this.prodScheForm
        };
        api.post(this.apiPath.hrsc.findpagehrscprodsche, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      resetFun () {
        this.prodScheForm = {
          prodName: '',
          prodId: '',
          chName: '',
          chId: '',
          scheStateName: '',
          scheState: '',
          execuSuppName: '',
          execuSuppId: '',
          payDirName: '',
          payDir: '',
          serveObjName: '',
          serveObj: ''
        };
      },
      // 分页
      pageHandler: function (page) {
        this.pageNum = page;
        this.searchFun();
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.searchFun();
      },
      // 新增
      addFun: function () {
        this.prodScheAdd = true;
        this.alertTitle = '新增产品方案';
        this.leadsbtn = '确 定';
      },
      // 启用
      startFun: function () {
        let _this = this;
        if (checkedArr === '' || checkedArr.length === 0) {
          this.$alert('请至少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          _this.$confirm('确定启用？', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            let _arr = [];
            checkedArr.forEach(function (list) {
              _arr.push(list.prodScheId);
            });
            var obj = {
              prodScheIds: _arr,
              scheState: 2
            };
            api.post(_this.apiPath.hrsc.updateprodschestate, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                checkedArr = [];
                _this.searchFun();
                _this.$message({message: '启用成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch(() => {
          });
        }
      },
      // 停用
      stopFun: function () {
        let _this = this;
        if (checkedArr === '' || checkedArr.length === 0) {
          _this.$alert('请至少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          _this.$confirm('确定停用？', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            let _arr = [];
            checkedArr.forEach(function (list) {
              _arr.push(list.prodScheId);
            });
            var obj = {
              prodScheIds: _arr,
              scheState: 3
            };
            api.post(_this.apiPath.hrsc.updateprodschestate, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                checkedArr = [];
                _this.searchFun();
                _this.$message({message: '停用成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch(() => {
            console.log('删除失败!');
          });
        }
      },
      // 查看
      seeFun: function (data) {
        this.seeItem = true;
        api.post(this.apiPath.hrsc.findbyidhrscprodsche, {prodScheId: data.prodScheId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改
      modifyFun: function (data) {
        this.prodScheAdd = true;
        this.alertTitle = '修改产品方案';
        this.leadsbtn = '修 改';
        api.post(this.apiPath.hrsc.findbyidhrscprodsche, {prodScheId: data.prodScheId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.prodScheAddForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看管理方案
      manProdFun: function (data) {
        this.$router.push({path: '/prodPrice', query: {prodId: data.prodId, prodName: data.prodName, prodScheId: data.prodScheId, prodScheName: data.chName, type: 1}});
      },
      // 查看更多产品操作记录
      moreProdOperFun: function () {
        this.$refs.prodScheAddForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.addhrscprodsche, this.prodScheAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$router.push({path: '/prodPrice', query: {prodId: this.prodScheAddForm.prodId, prodName: this.prodScheAddForm.prodName, type: 2}});
              } else {
                this.$alert(res.message, '提示信息', {
                  confirmButtonText: '确 定',
                  type: 'warning', // icon图标类型
                  dragFlag: true,
                  customClass: '', // 添加class
                  lockScroll: true,
                  callback: action => {
                    this.leadsAdd = false;
                  }
                });
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 新增确定
      submitForm () {
        this.$refs.prodScheAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增产品方案') {
              api.post(this.apiPath.hrsc.addhrscprodsche, this.prodScheAddForm).then(res => {
                this.prodScheAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(this.apiPath.hrsc.updatehrscprodsche, this.prodScheAddForm).then(res => {
                this.prodScheAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>
