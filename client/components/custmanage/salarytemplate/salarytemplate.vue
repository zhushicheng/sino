<template>
  <!--客户工资模板-->
  <div class="usermanage salary-template">
    <sino-con>
      <sino-title type="levelOne" title="选择客户"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box no-right-border">
          <ul class="search-inner-box">
            <li class="search-inner-one search-inner-one-long">
              <span class="search-inner-name">客户/供应商名称：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :chooseName.sync="searchForm.custChName"
                           :chooseId.sync="searchForm.custId"
                           :clear="true"
                           :token="token"
                           :url="costCenterUrl"
                           @contentChange="custChangeFun"></sino-select>
            </li>
          </ul>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!-- 工资项 -->
    <div v-if="searchForm.custId===0 || searchForm.custId">
      <div class="sino-table-total mt15">
        <div class="sino-table-icon-left no-float">
          <sino-button type="icon-text" @click="addSalaryFun"><i class="iconfont sino-add"></i>新增工资项</sino-button>
        </div>
        <div class="salary-item" v-for="(parentItem, key, index) in salaryGroupArr" :key="index">
          <sino-title type="levelTwo" :title="key" class="service-module-title">
            <span class="fr salary-item-oper" @click="showAndHide(key)">
              <i class="iconfont" :class="{'sino-angle-double-up':showAndHideArr.indexOf(key) !==-1, 'sino-shuangjiantou-copy':showAndHideArr.indexOf(key) ===-1}"></i>{{showAndHideArr.indexOf(key) !==-1?'收起':'展开'}}</span>
          </sino-title>
          <ul class="salary-item-content" v-if="parentItem && (parentItem.length !==0) && (showAndHideArr.indexOf(key) !==-1)">
            <li v-for="item in parentItem" :key="item" >
              <span class="salary-first">{{item.wageItemNickname}}</span>
              <span class="salary-second" v-if="key != '报税项'">{{ item.custWageDay ? '每月'+ item.custWageDay + '日':'实际到款日' }}</span>
              <span class="salary-third fr">
                <span class="table-span" @click="modifyFun(item.custWageTempItemId, item)"  v-if="key != '报税项'">修改</span><i v-if="key != '报税项'" class="table-i"> |</i>
                  <span class="table-span" @click="deleteFun(item.custWageTempItemId)">删除</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--新增-->
    <sino-dialog :visible.sync="addSalaryFlag" top="5%" dialogHide class="dialog-height salary-add-dialog no-minheight" v-on:close="resetAddFun">
      <sino-title slot="title" type="levelOne" title="新增工资项" class="sino-dialog-title"></sino-title>
      <div class="all-salary-item">
        <sino-form  class="serch-form search-form-secent">
          <div class="search-box search-box-secent">
            <ul class="search-inner-box">
              <li class="search-inner-one-long search-inner-clear">
                <span class="search-inner-name">工资项：</span>
                <sino-input v-model="filterText" class="fl"></sino-input>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box search-first-button-box search-first-button-secentbox">
              <sino-button type="primary" @click="itemFilterFun">查 询</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
        <sino-title type="levelTwo" title="全部工资项" class="service-module-title"></sino-title>
        <div class=""><!--all-salary-auto-->
          <ul class="all-salary-short">
            <li v-for="(item, index) in baseSalarySArr" :key="index"><span @click="chooseingEd.indexOf(item.proPayItemId)===-1?salaryItemClick(item.proPayItemId):''" :class="{'salary-choosing':(chooseingId.indexOf(item.proPayItemId) !== -1), 'salary-choosed': chooseingEd.indexOf(item.proPayItemId)!==-1}">{{item.proPayItemName}}</span></li>
          </ul>
          <ul class="all-salary-long">
            <li v-for="(item, index) in baseSalaryLArr" :key="index"><span @click="chooseingEd.indexOf(item.proPayItemId)===-1?salaryItemClick(item.proPayItemId):''" :class="{'salary-choosing':(chooseingId.indexOf(item.proPayItemId) !== -1), 'salary-choosed': chooseingEd.indexOf(item.proPayItemId)!==-1}">{{item.proPayItemName}}</span></li>
          </ul>
        </div>
      </div>
      <div class="all-salary-item clear">
        <sino-title type="levelTwo" title="自定义工资项" class="service-module-title">
          <span class="fr salary-item-oper" @click="deleteDefineFun">
            <i class="iconfont" :class="{'sino-duihao':deleteItemStatus,'sino-reduce':!deleteItemStatus}"></i>
            {{deleteItemStatus?'完成':'删除'}}
          </span>
          <span class="fr salary-item-oper" @click="addDefineFun">
            <i class="iconfont sino-add"></i>新增自定义
          </span>
        </sino-title>
        <ul class="all-salary-short">
          <li v-for="(item, index) in defineSalaryArr" :key="index">
            <span
              @click="(!deleteItemStatus)?chooseingEd.indexOf(item.proPayItemId)===-1?salaryItemClick(item.proPayItemId):'':''"
              :class="{'item-delete-status':deleteItemStatus,'salary-choosing':(chooseingId.indexOf(item.proPayItemId) !== -1), 'salary-choosed': chooseingEd.indexOf(item.proPayItemId)!==-1}">{{item.proPayItemName}}
              <i class="iconfont sino-cuowu select-icon-error fr" v-if="deleteItemStatus" @click="deleteDefineItemFun(item)"></i>
            </span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="addSalarySure">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--修改-->
    <sino-dialog :visible.sync="modifySalaryFlag" :top="'10%'" class="dialog-height dialog-wage no-minheight dialog-wage-long" v-on:close="resetFun('modifyForm')">
      <sino-title slot="title" type="levelOne" title="修改工资日" class="sino-dialog-title"></sino-title>
      <sino-form :model="modifyForm" :rules="setSalaryFormRules" ref="modifyForm" class="demo-sendAddrAddForm">
        <sino-form-item prop="wageDayType" label="工资日设置方式：">
          <sino-radio v-for="(item, index) in setSalaryArr" :key="index"
                      v-model.number="modifyForm.wageDayType"
                      :label="item.id">
            {{item.title}}
          </sino-radio>
        </sino-form-item>
        <sino-form-item label="工资日：" prop="custWageDay" v-if="modifyForm.wageDayType === 1">
          <sino-input class="fl" type="text"
                      v-model.number="modifyForm.custWageDay"
                      :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item>
          <sino-checkbox v-model="modifyForm.updateAllCustWageItemTime" class="sync-all-salary">同步至所有工资项</sino-checkbox>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="modifySalarySure">修 改</sino-button>
      </span>
    </sino-dialog>
    <!--新增自定义-->
    <sino-dialog :visible.sync="addDefineFlag" :top="'10%'" class="dialog-height dialog-wage width-dialog-wage" v-on:close="resetFun('addDefineForm')">
      <sino-title slot="title" type="levelOne" title="新增自定义" class="sino-dialog-title"></sino-title>
      <sino-form :model="addDefineForm" :rules="wageAddRules" ref="addDefineForm" class="demo-sendAddrAddForm">
        <sino-form-item label="工资项名称：" prop="proPayItemName">
          <sino-input class="fl" type="text"
                      v-model="addDefineForm.proPayItemName"
                      :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item prop="proPayType" label="类型：">
          <sino-radio v-for="(item, index) in proPayTypelist" :key="index"
                      v-model.number="addDefineForm.proPayType"
                      :label="item.id">
            {{item.title}}
          </sino-radio>
        </sino-form-item>
        <sino-form-item prop="isCharge" label="是否收费：">
          <sino-radio v-for="(item, index) in yesnolist" :key="index"
                      v-model.number="addDefineForm.isCharge"
                      :label="item.id">
            {{item.title}}
          </sino-radio>
        </sino-form-item>
        <sino-form-item prop="isTax" label="是否计税：" class="clear">
          <sino-radio v-for="item in yesnolist" :key="index"
                      v-model.number="addDefineForm.isTax"
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
                       :chooseName.sync="addDefineForm.taxRateName" class="fl"
                       :chooseId.sync="addDefineForm.taxRate" :clear="true"></sino-select>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <div class="order-new" v-if="taxPropertyDict">
          <i class="iconfont sino-tip"></i><span>根据您的设置，该工资项目将会被归为“{{taxPropertyDict}}”中</span>
        </div>
        <sino-button type="primary" @click="addDefineSure">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--设置工资日-->
    <sino-dialog :visible.sync="setSalaryFlag" :top="'10%'" class="dialog-height dialog-wage dialog-wage-long no-minheight" v-on:close="resetFun('setSalaryForm')">
      <sino-title slot="title" type="levelOne" title="工资日设置" class="sino-dialog-title"></sino-title>
      <sino-form :model="setSalaryForm" :rules="setSalaryFormRules" ref="setSalaryForm" class="demo-sendAddrAddForm">
        <sino-form-item prop="wageDayType" label="工资日设置方式：">
          <sino-radio v-for="(item, index) in setSalaryArr" :key="index"
                      v-model.number="setSalaryForm.wageDayType"
                      :label="item.id">
            {{item.title}}
          </sino-radio>
        </sino-form-item>
        <sino-form-item label="工资日：" prop="custWageDay" v-if="setSalaryForm.wageDayType === 1">
          <sino-input class="fl" type="text"
                      v-model.number="setSalaryForm.custWageDay"
                      :disabled="false"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="setSalarySure" :disabled="unclick">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  export default {
    data () {
      return {
        wangDayTypeData: [], //  工资日设置方式
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        costCenterUrl: this.apiPath.hrsc.findCustAndSuppByConinfo,
        token: Cookie.get('Token'),
        wageAddFlag: false,
        wageTempId: '',
        modifyForm: {
          wageDayType: 1,
          custWageDay: '',
          updateAllCustWageItemTime: true
        },
        addDefineForm: {
          proPayItemName: '',
          proPayType: 1,
          isCharge: 1,
          isTax: 1,
          custId: '',
          taxRateName: '工资薪金所得税',
          taxRate: 1
        },
        setSalaryForm: {
          custWageDay: '',
          wageDayType: 1
        },
        wageAddRules: {
          proPayItemName: [
            {required: true, message: '工资项名称为必填项', trigger: 'change'}
          ],
          proPayStateName: [
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
        setSalaryFormRules: {
          wageDayType: [
            {required: true, type: 'number', message: '工资日设置方式为必须项', trigger: 'change'}
          ],
          custWageDay: [
            {required: true, type: 'number', message: '工资日为必填项', trigger: 'change'},
            {validator: this.validator.checkDateNum, trigger: 'change'}
          ]
        },
        sessionList: {},
        proPayTypelist: [],
        yesnolist: [],
        baseSalarySArr: [],
        baseSalaryLArr: [],
        defineSalaryArr: [],
        chooseingId: [],
        chooseingEd: [],
        setSalaryArr: [],
        salaryGroupArr: {},
        showAndHideArr: [],
        index: '',
        fixedKeyArr: ['税前增加项', '税前扣减项', '不收费计税项', '税后补发项', '税后减发项', '报税项'],
        searchForm: {
          custChName: '',
          custId: ''
        },
        unclick: false,
        modifySalaryId: '',
        addSalaryFlag: false,
        addDefineFlag: false,
        modifySalaryFlag: false,
        setSalaryFlag: false,
        deleteItemStatus: false,
        taxPropertyDict: '',
        hideShow: true,
        filterText: '',
        copyData: [],
        temporaryData: [],
        // 客户、供应商类别
        cuFlag: null
      };
    },
    created () {
      api.post(this.dictSelUrl, {code: 'WAGE_PRO_PAY_TYPE'}).then(res => {
        this.proPayTypelist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'YES_NO'}).then(res => {
        this.yesnolist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'WAGE_DAY_SET_WAY'}).then(res => {
        this.setSalaryArr = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    watch: {
      'setSalaryForm.wageDayType': function (val) {
        if (val === 2) {
          this.setSalaryForm.custWageDay = '';
        }
      },
      'addDefineForm.isTax': function (val) {
        this.getTaxPropertyDict();
      },
      'addDefineForm.isCharge': function (val) {
        this.getTaxPropertyDict();
      },
      'addDefineForm.proPayType': function (val) {
        this.getTaxPropertyDict();
      }
    },
    methods: {
      filterMethod (source) {
        this.defineSalaryArr = [];
        this.baseSalaryLArr = [];
        this.baseSalarySArr = [];
        source.forEach(function (item) {
          if (item.itemSource === 2) {
            this.defineSalaryArr.push(item);
          } else {
            if (item.proPayItemName.length > 4) {
              this.baseSalaryLArr.push(item);
            } else {
              this.baseSalarySArr.push(item);
            }
          }
        }, this);
      },
      itemFilterFun () {
        if (this.filterText) {
          this.temporaryData.splice(0);
          this.copyData.forEach(function (item) {
            if (item.proPayItemName.indexOf(this.filterText) !== -1) {
              this.temporaryData.push(item);
            }
          }, this);
          this.filterMethod(this.temporaryData);
        } else {
          this.filterMethod(this.copyData);
        }
      },
      getTaxPropertyDict () {
        if ((this.addDefineForm.isTax === 0 || this.addDefineForm.isTax) && (this.addDefineForm.isCharge === 0 || this.addDefineForm.isCharge) && (this.addDefineForm.proPayType === 0 || this.addDefineForm.proPayType)) {
          let obj = {
            isTax: this.addDefineForm.isTax,
            isCharge: this.addDefineForm.isCharge,
            proPayType: this.addDefineForm.proPayType
          };
          api.post(this.apiPath.hrsc.trendsJudgeProPayItem, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.taxPropertyDict = res.data.taxPropertyDict;
            } else {
              this.taxPropertyDict = '';
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.taxPropertyDict = '';
        }
      },
      showAndHide (key) {
        if (this.showAndHideArr.indexOf(key) !== -1) {
          this.showAndHideArr.splice(this.showAndHideArr.indexOf(key), 1);
        } else {
          this.showAndHideArr.push(key);
        }
      },
      salaryItemClick (id) {
        if (this.chooseingId.indexOf(id) === -1) {
          this.chooseingId.push(id);
        } else {
          this.chooseingId.splice(this.chooseingId.indexOf(id), 1);
        }
      },
      modifyFun (id, item) {
        this.modifySalaryFlag =  true;
        this.modifySalaryId = id;
//        this.modifyForm.wageItemType = type;
        if (item.custWageDay > 0) {
          this.modifyForm.wageItemType = 1;
          this.modifyForm.custWageDay = item.custWageDay;
        } else {
          this.modifyForm.wageItemType = 2;
        }
      },
      deleteFun (id) {
        this.$alert('确定删除该工资项吗？', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            if (action !== 'confirm') return;
            api.post(this.apiPath.hrsc.deleteWageTemplateItemById, {custWageTempItemId: id}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.custChangeFun(this.sessionList);
                // api.post(this.apiPath.hrsc.findCustAndSuppByConinfo, {}).then(res => {
                //   if (res.code === 'CPYY-00001') {
                //     res.data.list.forEach(function (item) {
                //       if (item.id === this.searchForm.custId) {
                //         this.custChangeFun(item);
                //       }
                //       return;
                //     }, this);
                //   }
                // }).catch(err => {
                //   console.log(err);
                // });
                // this.custChangeFun();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      custChangeFun (list) {
        this.sessionList = list;
        this.cuFlag = list.flag;
        if (this.searchForm.custId === 0 || this.searchForm.custId) {
          this.chooseingEd = [];
          this.showAndHideArr = [];
          api.post(this.apiPath.hrsc.judgeWageTemplateById, {custId: this.searchForm.custId, custChName: this.searchForm.custChName, custOrSuppType: list.flag}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.wageTempId = res.data.wageTempId;
              let that = this;
              let temporaryObj = {};
              for (var i = 0; i < that.fixedKeyArr.length; i++) {
                temporaryObj[that.fixedKeyArr[i]] = res.data.maplist[that.fixedKeyArr[i]];
              };
              for (var key in res.data.maplist) {
                this.showAndHideArr.push(key);
                if ((res.data.maplist[key]) && (res.data.maplist[key].length > 0)) {
                  res.data.maplist[key].forEach(function (item) {
                    this.chooseingEd.push(item.proPayItemId);
                  }, this);
                };
                if (this.fixedKeyArr.indexOf(key) === -1) {
                  temporaryObj[key] = res.data.maplist[key];
                }
              };
              this.salaryGroupArr = temporaryObj;
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.wageTempId = '';
          this.salaryGroupArr = {};
          this.showAndHideArr = [];
          this.chooseingEd = [];
        }
      },
      getSalaryItem () {
        this.resetAddFun();
        api.post(this.apiPath.hrsc.findProPayItem, {custId: this.searchForm.custId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.copyData = JSON.parse(JSON.stringify(res.data));
            this.addSalaryFlag = true;
            this.defineSalaryArr = [];
            this.baseSalaryLArr = [];
            this.baseSalarySArr = [];
            res.data.forEach(function (item) {
              if (item.itemSource === 2) {
                this.defineSalaryArr.push(item);
              } else {
                if (item.proPayItemName.length > 4) {
                  this.baseSalaryLArr.push(item);
                } else {
                  this.baseSalarySArr.push(item);
                }
              }
            }, this);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      addSalaryFun () {
        this.getSalaryItem();
      },
      addSalarySure () {
        this.setSalaryFlag = true;
      },
      addDefineFun () {
        this.addDefineFlag = true;
        this.getTaxPropertyDict();
      },
      deleteDefineFun () {
        if (this.defineSalaryArr <= 0) {
          return false;
        }
        this.deleteItemStatus = !this.deleteItemStatus;
      },
      addDefineSure () {
        this.$refs.addDefineForm.validate((valid) => {
          if (valid) {
            this.addDefineForm.custId = this.searchForm.custId;
            let that = this;
            api.post(this.apiPath.hrsc.saveWageBageItem, this.addDefineForm).then(res => {
              if (res.code === 'CPYY-00001') {
                let arr = JSON.parse(JSON.stringify(this.chooseingId));
                this.addDefineFlag = false;
                this.getSalaryItem();
                that.chooseingId = JSON.parse(JSON.stringify(arr));
                arr = null;
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit!');
            return false;
          }
        });
      },
      deleteDefineItemFun (item) {
        api.post(this.apiPath.hrsc.deleteWageProPayItemById, {proPayItemId: item.proPayItemId}).then(res => {
          if (res.code === 'CPYY-00001') {
            let arr = JSON.parse(JSON.stringify(this.chooseingId));
            this.getSalaryItem();
            this.deleteItemStatus = true;
            this.chooseingId = JSON.parse(JSON.stringify(arr));
            arr = null;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      modifySalarySure () {
        this.$refs.modifyForm.validate((valid) => {
          if (valid) {
            let obj = {
              custWageTempItemId: this.modifySalaryId,
              custWageDay: this.modifyForm.wageDayType === 2 ? 0 : this.modifyForm.custWageDay,
              wageItemType: this.modifyForm.wageItemType,
              updateAllCustWageItemTime: Number(this.modifyForm.updateAllCustWageItemTime)
            };
            api.post(this.apiPath.hrsc.updateWageTemplateItem, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.modifySalaryFlag =  false;
                this.custChangeFun(this.sessionList);
                // let _this = this;
                // api.post(this.apiPath.hrsc.findCustAndSuppByConinfo, {}).then(res => {
                //   if (res.code === 'CPYY-00001') {
                //     res.data.list.forEach(function (item) {
                //       if (item.flag === _this.cuFlag && item.id === this.searchForm.custId) {
                //         this.custChangeFun(item);
                //       }
                //       return;
                //     }, this);
                //   }
                // }).catch(err => {
                //   console.log(err);
                // });
                // this.custChangeFun();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
        this.addDefineForm.taxRateName = '工资薪金所得税';
        this.addDefineForm.taxRate = 1;
        this.modifyForm.updateAllCustWageItemTime = true;
      },
      setSalarySure () {
        this.$refs.setSalaryForm.validate((valid) => {
          if (valid) {
            this.unclick = true;
            let obj = [];
            for (var i = 0; i < this.chooseingId.length; i++) {
              obj.push({custWageTempId: this.wageTempId, custWageDay: this.setSalaryForm.wageDayType === 2 ? 0 : this.setSalaryForm.custWageDay, proPayItemId: this.chooseingId[i]});
            }
            api.post(this.apiPath.hrsc.saveWageTemplateItem, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.salaryGroupArr = {};
                this.setSalaryFlag = false;
                this.addSalaryFlag = false;
                this.custChangeFun(this.sessionList);
                this.unclick = false;
                // api.post(this.apiPath.hrsc.findCustAndSuppByConinfo, {}).then(res => {
                //   if (res.code === 'CPYY-00001') {
                //     this.unclick = false;
                //     let _this = this;
                //     res.data.list.forEach(function (item) {
                //       if (item.flag === _this.cuFlag && item.id === this.searchForm.custId) {
                //         this.custChangeFun(item);
                //       }
                //       return;
                //     }, this);
                //   }
                // }).catch(err => {
                //   this.unclick = false;
                //   console.log(err);
                // });
              }
            }).catch(err => {
              this.unclick = false;
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetAddFun () {
        this.chooseingId = [];
        this.baseSalarySArr = [];
        this.baseSalaryLArr = [];
        this.defineSalaryArr = [];
        this.deleteItemStatus = false;
        this.filterText = '';
      }
    }
  };
</script>
