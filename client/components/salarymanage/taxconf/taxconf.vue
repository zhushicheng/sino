<template>
  <div class="usermanage">
    <!--工资税档设置-->
    <sino-con class="top-sino-con">
      <sino-title type="levelOne" title="工资税档设置" class="have-margin-bottom"></sino-title>
      <div class="sino-table-icon-left fr sino-table-icon-spec">
        <sino-button type="icon-text" @click="addFun1()"><i class="iconfont sino-add"></i>新增
        </sino-button>
      </div>
      <sino-table :data="tableData1" stripe border max-height="416" v-on:viewAll="viewAll" id="table">
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="includedTax" label="含税级距" min-width="150"></sino-table-column>
        <sino-table-column prop="notIncludedTax" label="不含税级距" min-width="150"></sino-table-column>
        <!--<sino-table-column prop="pureTax" :render-header="renderHeader1"></sino-table-column>-->
        <!--<sino-table-column prop="annBonusPureTax" :render-header="renderHeader2"></sino-table-column>-->
        <sino-table-column prop="pureTax" label="纯税级距" min-width="150"></sino-table-column>
        <sino-table-column prop="annBonusPureTax" label="年终奖纯税级距" min-width="150"></sino-table-column>
        <sino-table-column prop="taxRate" label="税率(小数)" min-width="95"></sino-table-column>
        <sino-table-column prop="quickDeduction" label="速算扣除数" min-width="95"></sino-table-column>
        <sino-table-column label="操作" align="center" class="user-btns"  width="100">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="modifyFun1(scope.row)">修改</span><i class="table-i">|</i>
              <span class="table-span" @click="deleteFun1(scope.row)">删除</span>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
    </sino-con>
    <!--劳务税档设置-->
    <sino-con>
      <sino-title type="levelOne" title="劳务费税档设置" class="have-margin-bottom"></sino-title>
      <div class="sino-table-icon-left1 fr sino-table-icon-spec">
        <sino-button type="icon-text" @click="addFun2"><i class="iconfont sino-add"></i>新增
        </sino-button>
      </div>
      <sino-table :data="tableData2" stripe border max-height="416" v-on:viewAll="viewAll">
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="includedTax" label="含税级距" min-width="150"></sino-table-column>
        <sino-table-column prop="notIncludedTax" label="不含税级距" min-width="150"></sino-table-column>
        <!--<sino-table-column prop="pureTax" :render-header="renderHeader3"></sino-table-column>-->
        <sino-table-column prop="pureTax" label="纯税级距" min-width="150"></sino-table-column>
        <sino-table-column prop="annBonusPureTaxMin" label="扣除比例" min-width="95"></sino-table-column>
        <sino-table-column prop="taxRate" label="税率(小数)" min-width="95"></sino-table-column>
        <sino-table-column prop="quickDeduction" label="速算扣除数" min-width="95"></sino-table-column>
        <sino-table-column label="操作" align="center" class="user-btns"  width="100">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="modifyFun2(scope.row)">修改</span><i class="table-i">|</i>
              <span class="table-span" @click="deleteFun2(scope.row)">删除</span>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
    </sino-con>
    <!-- 工资税档设置新增/修改-->
    <sino-dialog :visible.sync="taxAddFormFlag1" size="large" :top="'10%'" class="dialog-height" @close ="cleanContent('taxAddForm1')">
      <sino-title slot="title" type="levelOne" :title="alertTitle1" class="sino-dialog-title"></sino-title>
      <sino-form :model="taxAddForm1" :rules="taxAddFormRules1" ref="taxAddForm1" class="demo-sendAddrAddForm tax-add-form">
        <sino-form-item class="only-lable">含税级距</sino-form-item>
        <sino-form-item class="only-lable">不含税级距</sino-form-item>
        <sino-form-item label="开始金额：" prop="includedTaxMin">
          <sino-input v-model.number="taxAddForm1.includedTaxMin"></sino-input>
        </sino-form-item>
        <sino-form-item label="开始金额：" prop="notIncludedTaxMin">
          <sino-input v-model.number="taxAddForm1.notIncludedTaxMin "></sino-input>
        </sino-form-item>
        <sino-form-item label="结束金额：" prop="includedTaxMax">
          <sino-input v-model.number="taxAddForm1.includedTaxMax"></sino-input>
        </sino-form-item>
        <sino-form-item label="结束金额：" prop="notIncludedTaxMax">
          <sino-input v-model.number="taxAddForm1.notIncludedTaxMax"></sino-input>
        </sino-form-item>
        <sino-form-item label="税率(小数)：" prop="taxRate">
          <sino-input v-model.number="taxAddForm1.taxRate"></sino-input>
        </sino-form-item>
        <sino-form-item label="税率(小数)：">
          <sino-input :disabled="true" v-model.number="taxAddForm1.taxRate"></sino-input>
        </sino-form-item>
        <sino-form-item label="速算扣除数：" prop="quickDeduction">
          <sino-input v-model.number="taxAddForm1.quickDeduction"></sino-input>
        </sino-form-item>
        <sino-form-item label="速算扣除数：">
          <sino-input :disabled="true" v-model.number="taxAddForm1.quickDeduction"></sino-input>
        </sino-form-item>
        <sino-form-item class="usermanage-button">
          <sino-button type="primary" @click="submitForm1">{{alertButton1}}</sino-button>
        </sino-form-item>
        <div class="vertical-line"></div>
      </sino-form>
    </sino-dialog>
    <!-- 劳务费税档设置新增/修改-->
    <sino-dialog :visible.sync="taxAddFormFlag2" size="large" :top="'10%'" class="dialog-height" @close ="cleanContent('taxAddForm2')">
      <sino-title slot="title" type="levelOne" :title="alertTitle2" class="sino-dialog-title"></sino-title>
      <sino-form :model="taxAddForm2" :rules="taxAddFormRules2" ref="taxAddForm2" class="demo-sendAddrAddForm tax-add-form">
        <sino-form-item class="only-lable">含税级距</sino-form-item>
        <sino-form-item class="only-lable">不含税级距</sino-form-item>
        <sino-form-item label="开始金额：" prop="includedTaxMin">
          <sino-input v-model.number="taxAddForm2.includedTaxMin"></sino-input>
        </sino-form-item>
        <sino-form-item label="开始金额：" prop="notIncludedTaxMin">
          <sino-input v-model.number="taxAddForm2.notIncludedTaxMin"></sino-input>
        </sino-form-item>
        <sino-form-item label="结束金额：" prop="includedTaxMax">
          <sino-input v-model.number="taxAddForm2.includedTaxMax"></sino-input>
        </sino-form-item>
        <sino-form-item label="结束金额：" prop="notIncludedTaxMax">
          <sino-input v-model.number="taxAddForm2.notIncludedTaxMax"></sino-input>
        </sino-form-item>
        <sino-form-item label="扣除比例：" prop="annBonusPureTaxMin">
          <sino-input v-model.number="taxAddForm2.annBonusPureTaxMin"></sino-input>
        </sino-form-item>
        <sino-form-item label="扣除比例：">
          <sino-input v-model.number="taxAddForm2.annBonusPureTaxMin" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="税率(小数)：" prop="taxRate">
          <sino-input v-model.number="taxAddForm2.taxRate"></sino-input>
        </sino-form-item>
        <sino-form-item label="税率(小数)：" >
          <sino-input v-model.number="taxAddForm2.taxRate" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="速算扣除数：" prop="quickDeduction">
          <sino-input v-model.number="taxAddForm2.quickDeduction"></sino-input>
        </sino-form-item>
        <sino-form-item label="速算扣除数：">
          <sino-input v-model.number="taxAddForm2.quickDeduction" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item class="usermanage-button">
          <sino-button type="primary" @click="submitForm2">{{alertButton2}}</sino-button>
        </sino-form-item>
        <div class="vertical-line"></div>
      </sino-form>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Vue from 'vue';
  import vald from '../../../validator/index.js';
//  var Profile1 = Vue.extend({
//    template: "<div><span>纯税级距</span><sino-popover popper-class='questionTip' placement='bottom-start' trigger='hover' content='(工资/劳务费纯税信息)的来源:" +
//    "【工资含税级距】的各级开始/结束金额与【工资不含税级距】的各级开始/结束金额之差。" +
//    "【劳务费含税级距】的各级开始/结束金额与【劳务费不含税级距】的各级开始/结束金额之差。" +
//    "以工资为例，【工资纯税级距】的第二级来源为：" +
//    "开始金额：1500 - 1455 = 45" +
//    "结束金额：4500 - 4155 = 345" +
//    "税率：0.1 " +
//    "速算扣除数：105'><i class='iconfont sino-fangxingwenhao' style='display:inline-block;margin-left:2px;margin-top:10px;color:#399ff2' slot='reference'></i></sino-popover></div>",
//    data: function () {
//      return {};
//    }
//  });
//  var Profile2 = Vue.extend({
//    template: "<div><span>年终奖纯税级距</span><sino-popover popper-class='questionTip' placement='bottom-start' trigger='hover' content='(工资/劳务费纯税信息)的来源:" +
//    "【工资含税级距】的各级开始/结束金额与【工资不含税级距】的各级开始/结束金额之差。" +
//    "【劳务费含税级距】的各级开始/结束金额与【劳务费不含税级距】的各级开始/结束金额之差。" +
//    "以工资为例，【工资纯税级距】的第二级来源为：" +
//    "开始金额：1500 - 1455 = 45" +
//    "结束金额：4500 - 4155 = 345" +
//    "税率：0.1 " +
//    "速算扣除数：105'><i class='iconfont sino-fangxingwenhao' style='display:inline-block;margin-left:2px;margin-top:10px;color:#399ff2' slot='reference'></i></sino-popover></div>",
//    data: function () {
//      return {};
//    }
//  });
//  var Profile3 = Vue.extend({
//    template: "<div><span>纯税级距</span><sino-popover popper-class='questionTip' placement='bottom-start' trigger='hover' content='(工资/劳务费纯税信息)的来源:" +
//    "【工资含税级距】的各级开始/结束金额与【工资不含税级距】的各级开始/结束金额之差。" +
//    "【劳务费含税级距】的各级开始/结束金额与【劳务费不含税级距】的各级开始/结束金额之差。" +
//    "以工资为例，【工资纯税级距】的第二级来源为：" +
//    "开始金额：1500 - 1455 = 45" +
//    "结束金额：4500 - 4155 = 345" +
//    "税率：0.1 " +
//    "速算扣除数：105'><i class='iconfont sino-fangxingwenhao' style='display:inline-block;margin-left:2px;margin-top:10px;color:#399ff2' slot='reference'></i></sino-popover></div>",
//    data: function () {
//      return {};
//    }
//  });
  export default {
    components: {},
    data () {
      return {
        modifyId1: '',
        modifyId2: '',
        tableData1: [],
        taxAddFormFlag1: false,
        alertTitle1: '',
        alertButton1: '',
        taxAddForm1: {
          includedTaxMin: '',
          notIncludedTaxMin: '',
          includedTaxMax: '',
          notIncludedTaxMax: '',
          taxRate: '',
          quickDeduction: ''
        },
        taxAddFormRules1: {
          includedTaxMin: [
            {required: true, type: 'number', message: '含税级距开始金额为数字类型，且为必填项', trigger: 'change'},
            {validator: vald.checkNum, trigger: 'change'}
          ],
          notIncludedTaxMin: [
            { required: true, type: 'number', message: '不含税级距开始金额为数字类型，且为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          includedTaxMax: [
            { required: true, type: 'number', message: '含税级距结束金额为数字类型，且为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          notIncludedTaxMax: [
            { required: true, type: 'number', message: '不含税级距结束金额为数字类型，且为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          taxRate: [
            { required: true, type: 'number', message: '税率（小数）为数字类型,且为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          quickDeduction: [
            { required: true, type: 'number', message: '速算扣除数为数字类型，且为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ]
        },
        tableData2: [],
        taxAddFormFlag2: false,
        alertTitle2: '',
        alertButton2: '',
        taxAddForm2: {
          includedTaxMin: '',
          notIncludedTaxMin: '',
          includedTaxMax: '',
          notIncludedTaxMax: '',
          annBonusPureTaxMin: '',
          taxRate: '',
          quickDeduction: ''
        },
        taxAddFormRules2: {
          includedTaxMin: [
            { required: true, type: 'number', message: '含税级距开始金额为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          notIncludedTaxMin: [
            { required: true, type: 'number', message: '不含税级距开始金额为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          includedTaxMax: [
            { required: true, type: 'number', message: '含税级距结束金额为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          notIncludedTaxMax: [
            { required: true, type: 'number', message: '不含税级距结束金额为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          annBonusPureTaxMin: [
            { required: true, type: 'number', message: '扣除比例为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          taxRate: [
            { required: true, type: 'number', message: '税率（小数）为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ],
          quickDeduction: [
            { required: true, type: 'number', message: '速算扣除数为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ]
        }
      };
    },
    mounted () {
      this.getTableList1();
      this.getTableList2();
//      this.$nextTick(function () {
//        setTimeout(function () {
//          new Profile1().$mount('#render1');
//          new Profile2().$mount('#render2');
//          new Profile3().$mount('#render3');
//        }, 50);
//      });
    },
    methods: {
//      renderHeader1 (createElement, { _self }) {
//        return createElement(
//          'div',
//          {
//            attrs: {
//              "id": "render1"
//            }
//          }
//        );
//      },
//      renderHeader2 (createElement, { _self }) {
//        return createElement(
//          'div',
//          {
//            attrs: {
//              "id": "render2"
//            }
//          }
//        );
//      },
//      renderHeader3 (createElement, { _self }) {
//        return createElement(
//          'div',
//          {
//            attrs: {
//              "id": "render3"
//            }
//          }
//        );
//      },
      getTableList1 () {
        api.post(this.apiPath.salary.findTaxBracWageList, {}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData1 = res.data.list;
          }
        });
      },
      getTableList2 () {
        api.post(this.apiPath.salary.findTaxBracServeFeeList, {}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData2 = res.data.list;
          }
        });
      },
      viewAll () {},
      addFun1 () {
        this.taxAddFormFlag1 = true;
        this.alertTitle1 = '新增工资级距信息';
        this.alertButton1 =  '确 定';
      },
      modifyFun1 (data) {
        this.taxAddFormFlag1 = true;
        this.alertTitle1 = '修改工资级距信息';
        this.alertButton1 =  '修 改';
        this.modifyId1 = data.wageTaxBracId;
        api.postsign(this.apiPath.salary.findTaxBracWageById, data.wageTaxBracId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.taxAddForm1 = res.data;
          }
        });
      },
      deleteFun1 (data) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.postsign(this.apiPath.salary.deleteTaxBracWageById, data.wageTaxBracId).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getTableList1();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      submitForm1 () {
        this.$refs.taxAddForm1.validate((valid) => {
          if (valid) {
            if (this.alertTitle1 === '新增工资级距信息') {
              api.post(this.apiPath.salary.saveTaxBracWage, this.taxAddForm1).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.taxAddFormFlag1 = false;
                  this.getTableList1();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              });
            } else {
              this.taxAddForm1.wageTaxBracId = this.modifyId1;
              api.post(this.apiPath.salary.updateTaxBracWage, this.taxAddForm1).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.taxAddFormFlag1 = false;
                  this.getTableList1();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              });
            }
          }
        });
      },
      addFun2 () {
        this.taxAddFormFlag2 = true;
        this.alertTitle2 = '新增劳务费级距信息';
        this.alertButton2 =  '确 定';
      },
      modifyFun2 (data) {
        this.taxAddFormFlag2 = true;
        this.alertTitle2 = '修改劳务费级距信息';
        this.alertButton2 =  '修 改';
        this.modifyId2 = data.serveFeeTaxBracId;
        api.postsign(this.apiPath.salary.findTaxBracServeFeeById, data.serveFeeTaxBracId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.taxAddForm2 = res.data;
          }
        });
      },
      deleteFun2 (data) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.postsign(this.apiPath.salary.deleteTaxBracServeFeeById, data.serveFeeTaxBracId).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getTableList2();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      submitForm2 () {
        this.$refs.taxAddForm2.validate((valid) => {
          if (valid) {
            if (this.alertTitle2 === '新增劳务费级距信息') {
              api.post(this.apiPath.salary.saveTaxBracServeFee, this.taxAddForm2).then(res => {
                this.taxAddFormFlag2 = false;
                if (res.code === 'CPYY-00001') {
                  this.getTableList2();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              });
            } else {
              this.taxAddForm2.serveFeeTaxBracId = this.modifyId2;
              api.post(this.apiPath.salary.updateTaxBracServeFee, this.taxAddForm2).then(res => {
                this.taxAddFormFlag2 = false;
                if (res.code === 'CPYY-00001') {
                  this.getTableList2();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              });
            }
          }
        });
      },
      cleanContent (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
