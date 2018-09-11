<template>
  <!--<div>工资项维护管理</div>-->
  <div class="usermanage">
    <!--特殊业务说明-->
    <sino-con>
      <sino-title type="levelOne" title="工资项查询"></sino-title>
      <sino-form :model="wageForm" ref="wageForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">工资项名称：</span>
              <sino-input class="fl" type="text"
                          v-model="wageForm.proPayItemName"
                          :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">启用状态：</span>
              <sino-select :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="dictSelUrl"
                           :data="{code: 'PRO_PAY_STATE'}"
                           :chooseName.sync="wageForm.proPayStateName" class="fl"
                           :chooseId.sync="wageForm.proPayState" :clear="true"></sino-select>
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
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="wageTableData" stripe border max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号" width="50" align="center"></sino-table-column>
          <sino-table-column prop="proPayItemName" label="工资项名称" min-width="105"></sino-table-column>
          <sino-table-column prop="itemTypeDict" label="工资项目类型" min-width="105"></sino-table-column>
          <sino-table-column prop="proPayTypeDict" label="代收类型"></sino-table-column>
          <sino-table-column prop="isChargeDict" label="是否收费"></sino-table-column>
          <sino-table-column prop="isTaxDict" label="是否计税"></sino-table-column>
          <sino-table-column prop="taxRateName" label="适用税率"></sino-table-column>
          <sino-table-column prop="proPayStateDict" label="启用状态"></sino-table-column>
          <sino-table-column prop="itemSourceDict" label="项目来源"></sino-table-column>
          <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
          <sino-table-column prop="creUserName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" width="140" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.proPayState === 1">修改</span><i class="table-i" v-if="scope.row.proPayState === 1">|</i>
                <span class="table-span" @click="startFun(scope.row)" v-if="scope.row.proPayState === 3 || scope.row.proPayState === 1">启用</span><!--<i class="table-i" v-if="scope.row.proPayState === 2">|</i>-->
                <span class="table-span" @click="stopFun(scope.row)" v-if="scope.row.proPayState === 2">停用</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!-- 新增-->
    <sino-dialog :visible.sync="wageAddFlag" :top="'10%'" class="dialog-height dialog-wage" v-on:close="resetFun('wageAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="wageAddForm" :rules="wageAddRules" ref="wageAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="工资项名称：" prop="proPayItemName" class="wage-wid">
          <sino-input class="fl" type="text"
                      v-model="wageAddForm.proPayItemName"
                      :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item prop="proPayStateDict" label="启用状态：" class="wage-wid">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="dictSelUrl"
                       :data="{code: 'PRO_PAY_STATE'}"
                       :chooseName.sync="wageAddForm.proPayStateDict" class="fl"
                       :chooseId.sync="wageAddForm.proPayState" :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item prop="proPayType" label="类型：">
          <sino-radio v-for="(item, index) in proPayTypelist" :disabled="wageTypeFlag"
                      v-model.number="wageAddForm.proPayType" :key="index"
                      :label="item.id">
            {{item.title}}
          </sino-radio>
          <!--<sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="dictSelUrl"
                       :data="{code: 'PRO_PAY_STATE'}"
                       :chooseName.sync="wageAddForm.suppName" class="fl"
                       :chooseId.sync="wageAddForm.suppId" :clear="true"></sino-select>-->
        </sino-form-item>
        <sino-form-item prop="isCharge" label="是否收费：">
          <sino-radio v-for="(item, index) in yesnolist" :disabled="wageFlag" :key="index"
                      v-model.number="wageAddForm.isCharge"
                      :label="item.id">
            {{item.title}}
          </sino-radio>
        </sino-form-item>
        <sino-form-item prop="isTax" label="是否计税：" class="clear">
          <sino-radio v-for="(item, index) in yesnolist" :disabled="wageFlag" :key="index"
                      v-model.number="wageAddForm.isTax"
                      :label="item.id">
            {{item.title}}
          </sino-radio>
        </sino-form-item>
        <sino-form-item prop="taxRateName" label="适用税率：" class="wage-wid">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="dictSelUrl"
                       :data="{code: 'TAX_RATE'}"
                       :chooseName.sync="wageAddForm.taxRateName" class="fl"
                       :chooseId.sync="wageAddForm.taxRate" :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item prop="remark" label="备注：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="wageAddForm.remark" :disabled="false"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <div class="order-new">
          <i class="iconfont sino-tip"></i>
          <span v-if="!errorFlag">根据您的设置，该工资项目将会被归为“{{wageAddForm.message}}”中</span>
          <span v-if="errorFlag">{{wageAddForm.error}}</span>
        </div>
        <sino-button type="primary" @click="submitForm">{{btnText}}</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        wageForm: {
          proPayItemName: '',
          proPayState: '',
          proPayStateName: ''
        },
        wageTableData: null,
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
        wageAddFlag: false,
        alertTitle: '',
        btnText: '',
        wageAddForm: {
          proPayItemName: '',
          proPayState: '',
          proPayStateDict: '',
          proPayType: '',
          isCharge: '',
          isTax: '',
          message: '',
          taxRate: 1,
          taxRateName: '工资薪金所得税',
          error: '',
          remark: ''
        },
        wageAddRules: {
          proPayItemName: [
            {required: true, message: '请输入工资项名称', trigger: 'change'}
          ],
          proPayStateDict: [
            {required: true, message: '请选择启用状态', trigger: 'change'}
          ],
          taxRateName: [
            {required: true, message: '请选择适用税率', trigger: 'change'}
          ],
          isCharge: [
            {type: 'number', required: true, message: '请选择是否收费', trigger: 'change'}
          ],
          isTax: [
            {type: 'number', required: true, message: '请选择是否计税', trigger: 'change'}
          ],
          proPayType: [
            {type: 'number', required: true, message: '请选择类型', trigger: 'change'}
          ]
        },
        yesnolist: [],
        proPayTypelist: [],
        wageFlag: false,
        wageTypeFlag: false,
        errorFlag: false
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'YES_NO'}).then(res => {
        this.yesnolist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'WAGE_PRO_PAY_TYPE'}).then(res => {
        this.proPayTypelist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      this.wageAddForm.proPayType = 1;
      this.wageAddForm.isCharge = 1;
      this.wageAddForm.isTax = 1;
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    watch: {
      'wageAddForm.proPayType': function (newVal) {
        if (this.alertTitle === '新增工资项') {
          if (newVal === 3) {
            this.wageAddForm.isCharge = 1;
            this.wageAddForm.isTax = 0;
            this.wageFlag = true;
            if (this.wageAddForm.isCharge === 1) {
              if (this.wageAddForm.isTax === 0) {
                this.errorFlag = false;
                this.wageAddForm.message = '报税项';
              }
            }
          } else {
            this.wageAddForm.isCharge = 1;
            this.wageAddForm.isTax = 1;
            this.wageFlag = false;
            if (newVal === 1) {
              if (this.wageAddForm.isCharge === 1) {
                if (this.wageAddForm.isTax === 1) {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税前工资项';
                } else {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税后补发项';
                }
              } else {
                this.errorFlag = true;
                this.wageAddForm.error = '工资代收代付类型选择错误';
              }
            } else if (newVal === 2) {
              if (this.wageAddForm.isCharge === 1) {
                if (this.wageAddForm.isTax === 1) {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税前扣减项';
                } else {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税后减发项';
                }
              } else {
                if (this.wageAddForm.isTax === 1) {
                  this.errorFlag = false;
                  this.wageAddForm.message = '不计费扣税项';
                } else {
                  this.errorFlag = true;
                  this.wageAddForm.error = '工资代收代付类型选择错误';
                }
              }
            }
          }
        }
      },
      'wageAddForm.isCharge': function (newVal) {
        if (this.alertTitle === '新增工资项') {
          if (this.wageAddForm.proPayType === 3) {
            if (newVal === 1) {
              if (this.wageAddForm.isTax === 0) {
                this.errorFlag = false;
                this.wageAddForm.message = '报税项';
              }
            }
          } else {
            if (this.wageAddForm.proPayType === 1) {
              if (newVal === 1) {
                if (this.wageAddForm.isTax === 1) {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税前工资项';
                } else {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税后补发项';
                }
              } else {
                this.errorFlag = true;
                this.wageAddForm.error = "工资代收代付类型选择错误";
              }
            } else if (this.wageAddForm.proPayType === 2) {
              if (newVal === 1) {
                if (this.wageAddForm.isTax === 1) {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税前扣减项';
                } else {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税后减发项';
                }
              } else {
                if (this.wageAddForm.isTax === 1) {
                  this.errorFlag = false;
                  this.wageAddForm.message = '不计费扣税项';
                } else {
                  this.errorFlag = true;
                  this.wageAddForm.error = '工资代收代付类型选择错误';
                }
              }
            }
          }
        }
      },
      'wageAddForm.isTax': function (newVal) {
        if (this.alertTitle === '新增工资项') {
          if (this.wageAddForm.proPayType === 3) {
            if (this.wageAddForm.isCharge === 1) {
              if (newVal === 0) {
                this.errorFlag = false;
                this.wageAddForm.message = '报税项';
              }
            }
          } else {
            if (this.wageAddForm.proPayType === 1) {
              if (this.wageAddForm.isCharge === 1) {
                if (newVal === 1) {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税前工资项';
                } else {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税后补发项';
                }
              } else {
                this.errorFlag = true;
                this.wageAddForm.error = '工资代收代付类型选择错误';
              }
            } else if (this.wageAddForm.proPayType === 2) {
              if (this.wageAddForm.isCharge === 1) {
                if (newVal === 1) {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税前扣减项';
                } else {
                  this.errorFlag = false;
                  this.wageAddForm.message = '税后减发项';
                }
              } else {
                if (newVal === 1) {
                  this.errorFlag = false;
                  this.wageAddForm.message = '不计费扣税项';
                } else {
                  this.errorFlag = true;
                  this.wageAddForm.error = '工资代收代付类型选择错误';
                }
              }
            }
          }
        }
      }
    },
    methods: {
      viewAll (pageNum, pageSize) {
        let _data = {
          data: this.wageForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findAllProPayItem, _data).then(res => {
          this.wageTableData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 新增
      addFun () {
        this.wageAddFlag = true;
        this.alertTitle = '新增工资项';
        this.btnText = '  确 定';
        this.wageFlag = false;
        this.wageTypeFlag = false;
        this.wageAddForm.proPayState = 1;
        this.wageAddForm.proPayStateDict = '未启用';
      },
      // 修改
      modifyFun (_data) {
        this.wageAddFlag = true;
        this.alertTitle = '修改工资项';
        this.btnText = '  修 改';
        api.post(this.apiPath.hrsc.findProPayById, {proPayItemId: _data.proPayItemId}).then(res => {
          this.wageAddForm = res.data;
          if (this.wageAddForm.proPayState === 1) {
            this.wageFlag = false;
            this.wageTypeFlag = false;
          } else {
            this.wageFlag = true;
            this.wageTypeFlag = true;
          }
          this.errorFlag = false;
          this.wageAddForm.message = res.data.itemTypeDict;
        }).catch(() => {
          console.log('失败!');
        });
      },
      // 启用
      startFun (_data) {
        let _this = this;
        api.post(this.apiPath.hrsc.updateProPayState, {proPayItemId: _data.proPayItemId, proPayState: 2}).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.searchFun();
            _this.$message({message: '启用成功！', type: 'success'});
          }
        }).catch(() => {
          console.log('失败!');
        });
      },
      // 停用
      stopFun (_data) {
        let _this = this;
        api.post(this.apiPath.hrsc.updateProPayState, {proPayItemId: _data.proPayItemId, proPayState: 3}).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.searchFun();
            _this.$message({message: '停用成功！', type: 'success'});
          }
        }).catch(() => {
          console.log('失败!');
        });
      },
      // 新增修改确定
      submitForm () {
        let _this = this;
        _this.$refs.wageAddForm.validate((valid) => {
          if (valid) {
            if (_this.alertTitle === '新增工资项') {
              api.post(_this.apiPath.hrsc.saveWageProPayItem, _this.wageAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.wageAddFlag = false;
                  _this.searchFun();
                  _this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(() => {
                console.log('失败!');
              });
            } else {
              api.post(_this.apiPath.hrsc.updateWageProPayItem, _this.wageAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.wageAddFlag = false;
                  _this.searchFun();
                  _this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(() => {
                console.log('失败!');
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
        this.wageAddForm.taxRate = 1;
        this.wageAddForm.taxRateName = '工资薪金所得税';
      }
    }
  };
</script>
