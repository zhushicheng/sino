<template>
  <!--雇员派出-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con class="single-empass" :style="{'border-bottom':'0'}">
        <sino-title type="levelOne" title="新增服务协议"></sino-title>
        <div class="local-info">
          <sino-form :model="singleEmpassForm" ref="singleEmpassForm" class="serch-form">
            <ul class="local-info-ul">
              <li class="remak">
                <sino-form-item class="sino-form-item-width" prop="remark" label="客户名称：">
                  <sino-input class="fl" type="text"
                              v-model="singleEmpassForm.remark"
                              :disabled="true"
                              :style="{'width':'100%'}"
                  ></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="选择服务内容：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="singleEmpassForm.ecoTypeName"
                               :chooseId.sync="singleEmpassForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="执行地区：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="singleEmpassForm.ecoTypeName"
                               :chooseId.sync="singleEmpassForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="受托供应商：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="singleEmpassForm.ecoTypeName"
                               :chooseId.sync="singleEmpassForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="起做止做原则：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="singleEmpassForm.ecoTypeName"
                               :chooseId.sync="singleEmpassForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
            </ul>
          </sino-form>
        </div>
      </sino-con>
      <sino-con class="single-empass">
        <div class="clear"></div>
        <sino-title type="levelTwo" title="设置产品服务要求"></sino-title>
        <div class="local-info">
          <sino-form :model="epmBasicForm" ref="epmBasicForm" class="serch-form">
            <!--社保服务-->
            <ul class="local-info-ul clearfix local-social-ul">
              <li class="local-social">
                <div class="local-social-div">
                  社保服务
                </div>
              </li>
              <li>
                <sino-form-item label="执行地区：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="受托供应商：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="起做止做原则：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="缴费方式：" class="search-inner-item" prop="localStanType">
                  <sino-radio v-for="(item, index) in localStanList" :key="index"
                              v-model="singleEmpassForm.localStanType"
                              :label="item.id">{{item.title}}</sino-radio>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="社保账户：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="发票科目：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'INV_SUB_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="户口性质：" class="search-inner-item" prop="localStanType">
                  <sino-radio v-for="(item, index) in householdProyList" :key="index"
                              v-model.number="epmBasicForm.householdProy"
                              :label="item.id">{{item.title}}</sino-radio>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="地方标准组合：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li></li>
              <li>
                <sino-form-item label="户口性质：" class="search-inner-item" prop="localStanType">
                  <sino-radio v-for="(item, index) in householdProyList" :key="index"
                              v-model.number="epmBasicForm.householdProy"
                              :label="item.id">{{item.title}}</sino-radio>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="地方标准组合：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
            </ul>
          </sino-form>
          <sino-form :model="epmBasicForm" ref="epmBasicForm" class="serch-form">
          <!--公积金服务-->
            <ul class="local-info-ul clearfix local-social-ul">
              <li class="local-social">
                <div class="local-social-div">公积金服务</div>
              </li>
              <li>
                <sino-form-item label="执行地区：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="受托供应商：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="起做止做原则：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="缴费方式：" class="search-inner-item" prop="localStanType">
                  <sino-radio v-for="(item, index) in localStanList" :key="index"
                              v-model="singleEmpassForm.localStanType"
                              :label="item.id">{{item.title}}</sino-radio>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="公积金账户：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="地方标准组合：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="公积金比例：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="发票科目：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'INV_SUB_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
            </ul>
          </sino-form>
          <sino-form :model="epmBasicForm" ref="epmBasicForm" class="serch-form">
          <!--工资服务-->
            <ul class="local-info-ul clearfix local-social-ul">
              <li class="local-social">
                <div class="local-social-div">工资服务</div>
              </li>
              <li>
                <sino-form-item label="执行地区：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="受托供应商：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="发票科目：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'INV_SUB_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="起做止做原则：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
            </ul>
          </sino-form>
          <sino-form :model="epmBasicForm" ref="epmBasicForm" class="serch-form">
            <!--年度体检-->
            <ul class="local-info-ul clearfix local-social-ul">
              <li class="local-social">
                <div class="local-social-div">年度体检</div>
              </li>
              <li>
                <sino-form-item label="执行地区：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="受托供应商：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="发票科目：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'INV_SUB_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="起做止做原则：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
            </ul>
          </sino-form>
          <sino-form :model="epmBasicForm" ref="epmBasicForm" class="serch-form">
            <!--服务费-->
            <ul class="local-info-ul clearfix local-social-ul">
              <li class="local-social">
                <div class="local-social-div">服务费</div>
              </li>
              <li>
                <sino-form-item label="执行地区：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="受托供应商：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="起做止做原则：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'ECO_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item prop="suppEmpInnerNo" label="收费金额：" class="search-inner-item">
                  <sino-input class="fl" type="text"
                              v-model="epmBasicForm.suppEmpInnerNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item prop="orderCateName" label="付费金额：" class="search-inner-item">
                  <sino-input class="fl" type="text"
                              v-model="epmBasicForm.orderCateName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="发票科目：" class="search-inner-item" prop="ecoTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'INV_SUB_TYPE'}"
                               :chooseName.sync="epmBasicForm.ecoTypeName"
                               :chooseId.sync="epmBasicForm.ecoType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
            </ul>
          </sino-form>
        </div>
        <div class="clear"></div>
        <div class="conf-btn">
          <sino-button type="primary" @click="singleSubmit">确 定</sino-button>
          <sino-button type="text" @click="returnSubmit">取消</sino-button>
        </div>
      </sino-con>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  export default {
    components: {},
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        epmBasicForm: {
          householdProy: ''
        },
        singleEmpassForm: {
          localStanType: ''
        },
        householdProyList: [],
        localStanList: [],
        singleEmpassData: null,
        serverData: null,
        sinsData: null,
        accuData: null,
        routerView: false
      };
    },
    created: function () {
      api.post(this.dictSelUrl, {code: 'PAY_FEE_WAY'}).then(res => {
        this.localStanList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'HOUSEHOLD_TYPE', ids: [1]}).then(res => {
        this.householdProyList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === '/empAss/singleempass') {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    methods: {
      // 添加服务协议
      serviceAgreeAdd () {
        this.routerView = true;
        this.$router.push({path: '/empAss/singleempass/addServiceAgreement'});
      },
      // 服务费交互订单项
      serverCallBack () {},
      serverViewAll () {},
      // 社保交互订单项
      sinsCallBack () {},
      sinsViewAll () {},
      // 住房公积金交互订单项
      accuCallBack () {},
      accuViewAll () {},
      // 确定
      singleSubmit () {},
      // 取消
      returnSubmit () {
        this.routerView = false;
        this.$router.push({path: '/empAss/singleEmpAss'});
      }
    }
  };
</script>
