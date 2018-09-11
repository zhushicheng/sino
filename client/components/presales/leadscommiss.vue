<template>
  <!--销售线索（专员）-->
  <div class="leads usermanage">
    <sino-con>
      <sino-title type="levelOne" title="查询条件"></sino-title>
      <sino-form :model="leadsForm" ref="ruleForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">销售线索摘要：</span>
              <sino-input class="fl" type="text" v-model="leadsForm.outLine"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">公司名称：</span>
              <sino-input class="fl" type="text" v-model="leadsForm.corpName"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">销售线索状态：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="leadsForm.clueStateName" :chooseId.sync="leadsForm.clueState"  :clear="true" :url="selUrl" :data="{code:'CLUE_STATE'}"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">跟进结果：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="leadsForm.trackResultName" :chooseId.sync="leadsForm.trackResult"  :clear="true" :url="selUrl" :data="{code:'TRACK_STATE'}"></sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchButFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-table-total sino-table-radio mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left">
          <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增</sino-button>
        </div>
      </div>
      <sino-table :data="tableData" v-on:select="selectCallBack" v-on:viewAll="viewAll" stripe border max-height="416">
        <sino-table-column type="selection" width="40"></sino-table-column>
        <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
        <sino-table-column prop="outLine" label="销售线索摘要" min-width="180"></sino-table-column>
        <sino-table-column prop="corpName" label="公司名称" min-width="180"></sino-table-column>
        <sino-table-column prop="clueStateName" label="销售线索状态" min-width="105"></sino-table-column>
        <sino-table-column prop="trackResultName" label="跟进结果"></sino-table-column>
        <sino-table-column prop="trackName" label="线索跟进人" min-width="95"></sino-table-column>
        <sino-table-column prop="providerName" label="线索提供人" min-width="95"></sino-table-column>
        <sino-table-column prop="creName" label="线索创建人" min-width="95"></sino-table-column>
        <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
        <sino-table-column label="操作" align="center" width="170" fixed="right">
          <template scope="scope">
            <div v-if="scope.row.oper === true">
              <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i" v-if="currUserRoleId == scope.row.trackId">|</i>
              <span class="table-span" @click="modifyFun(scope.row)" v-if="currUserRoleId == scope.row.trackId">修改</span><i class="table-i" v-if="scope.row.clueState === 1 && currUserRoleId === scope.row.creId">|</i>
              <span class="table-span" @click="delFun(scope.row)" v-if="scope.row.clueState === 1 && currUserRoleId == scope.row.creId">作废</span><i class="table-i" v-if="currUserRoleId == scope.row.trackId">|</i>
              <span class="table-span" @click="followRemarkFun(scope.row)" v-if="currUserRoleId == scope.row.trackId">跟进备注</span>
            </div>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler"
                 :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                 :total="total"></sino-page>
    </div>
    <!--新增-->
    <sino-dialog :visible.sync="leadsAdd"  size="large" v-on:close="modifyClose" :top="'5%'">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title "></sino-title>
      <div class="leadsAdd-form">
        <sino-form :model="leadsAddForm" :rules="rules" ref="leadsAddForm" class="leadsAdd-Form">
          <sino-form-item label="线索摘要：" prop="outLine">
            <sino-input v-model="leadsAddForm.outLine" ></sino-input>
          </sino-form-item>
          <sino-form-item label="销售线索来源：" prop="sourceName">
            <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                         :chooseName.sync="leadsAddForm.sourceName" :chooseId.sync="leadsAddForm.source"
                         :clear="true" :url="selUrl" :data="{code:'CLUE_SOURCE'}"></sino-select>
          </sino-form-item>
          <sino-form-item label="客户名称：" class="sino-form-item-width"  prop="custChName" v-if="leadsAddForm.source === 5">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="custUrl"
                         :data="{}"
                         :token="token"
                         :chooseName.sync="leadsAddForm.custChName"
                         :chooseId.sync="leadsAddForm.custChType"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="线索提供人：" prop="providerName">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="custInfoUrl"
                         :token="token"
                         :chooseName.sync="leadsAddForm.providerName"
                         :chooseId.sync="leadsAddForm.providerId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="提供日期：" prop="provideDate">
            <sino-date-picker
              type="date"
              v-model="leadsAddForm.provideDate"
              :editable="false"
              :readonly="false"
              :clearable="true"
            >
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="联系人姓名：" class="clear"  prop="contName">
            <sino-input v-model="leadsAddForm.contName"></sino-input>
          </sino-form-item>
          <sino-form-item label="手机号码："  prop="phone">
            <sino-input v-model="leadsAddForm.phone"></sino-input>
          </sino-form-item>
          <sino-form-item label="固定电话：" prop="tel">
            <sino-input v-model="leadsAddForm.tel"></sino-input>
          </sino-form-item>
          <sino-form-item label="邮箱地址：" prop="email">
            <sino-input v-model="leadsAddForm.email"></sino-input>
          </sino-form-item>
          <sino-form-item label="公司名称：" class="sino-form-item-width" prop="corpName">
            <sino-input v-model="leadsAddForm.corpName" class="leads-company-input"></sino-input>
          </sino-form-item>
          <sino-form-item label="公司地址：" class="sino-form-item-width" prop="corpAddr">
            <sino-input v-model="leadsAddForm.corpAddr" class="leads-addr-input"></sino-input>
          </sino-form-item>
          <sino-form-item label="人员规模：" prop="perScaleName">
            <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"
                         :chooseName.sync="leadsAddForm.perScaleName" :chooseId.sync="leadsAddForm.perScale"
                         :clear="true" :url="selUrl" :data="{code:'PER_SCALE'}"></sino-select>
          </sino-form-item>
          <sino-form-item label="行业类型：" prop="induTypeName">
            <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                         :chooseName.sync="leadsAddForm.induTypeName" :chooseId.sync="leadsAddForm.induType"
                         :clear="true" :url="selUrl" :data="{code:'INDU_TYPE'}"></sino-select>
          </sino-form-item>
          <sino-form-item label="线索内容：" class="sino-form-item-width"  prop="clueDesc">
            <sino-input type="textarea" v-model="leadsAddForm.clueDesc" :disabled="false"></sino-input>
          </sino-form-item>
        </sino-form>
        <div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="order-new">
          <i class="iconfont sino-tip"></i><span>手机号码、固定电话和邮箱地址至少任选其一填写。</span>
        </div>
        <sino-button type="primary" @click="submitForm('leadsAddForm')">{{leadsbtn}}</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="销售线索信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list mt15">
        <ul class="usermanagement-ul">
          <li>
            <h6>销售线索摘要</h6><input v-model="seeForm.outLine">
          </li>
          <li>
            <h6>线索提供人</h6><input v-model="seeForm.providerName">
          </li>
          <li>
            <h6>公司名称</h6><input v-model="seeForm.corpName">
          </li>
          <li>
            <h6>手机号码</h6><input v-model="seeForm.phone">
          </li>
          <li>
            <h6>公司联系人</h6><input v-model="seeForm.contName">
          </li>
          <li>
            <h6>邮箱</h6><input v-model="seeForm.email">
          </li>
          <li>
            <h6>固定电话</h6><input v-model="seeForm.tel">
          </li>
          <li>
            <h6>销售线索状态</h6><input v-model="seeForm.clueStateName">
          </li>
          <li>
            <h6>跟进结果</h6><input v-model="seeForm.trackResultName">
          </li>
          <li>
            <h6>线索跟进人</h6><input v-model="seeForm.trackName">
          </li>
          <li>
            <h6>操作人</h6><input v-model="seeForm.operName">
          </li>
          <li>
            <h6>操作时间</h6><input v-model="seeForm.operTime">
          </li>
          <li>
            <h6>线索创建人</h6><input v-model="seeForm.creName">
          </li>
          <li>
            <h6>创建时间</h6><input v-model="seeForm.creTime ">
          </li>
          <li class="li-last">
            <h6>销售线索内容</h6><input v-model="seeForm.clueDesc">
          </li>
        </ul>
      </div>
    </sino-dialog>
    <!--跟进-->
    <sino-dialog :visible.sync="follow" class="leads-follow" v-on:close="followClose">
      <sino-title slot="title" type="levelOne" title="选择跟进人" class="sino-dialog-title"></sino-title>
      <div class="follow-select">
        <sino-form :model="followForm" class="follow-form" :rules="followRules" ref="followForm">
          <div class="follow-content">
            <sino-form-item label="跟进人：" prop="trackName">
              <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="followForm.trackName" :chooseId.sync="followForm.trackId" :linkage="true" :clear="true" :url="followSelUrl" :data="fllowData"></sino-select>
            </sino-form-item>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button class="alert-btn" type="primary" @click="followSure">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--跟进备注-->
    <sino-dialog :visible.sync="followRemarkFlag" class="followremark lead-dialog"  size="large" v-on:close="followRemarkClose" :top="'5%'" dialogHide>
      <sino-title slot="title" type="levelOne" title="跟进备注" class="sino-dialog-title"></sino-title>
      <div class="leadsAdd-form">
        <sino-form :model="followRemarkForm" :rules="followRemarkRules" ref="followRemarkForm" class="leadsAdd-Form">
          <sino-form-item label="跟进人："   prop="trackName" >
            <sino-select
              :filterable="false"
              :multiselect="false"
              :isshowTotol="false"
              :disabled="false"
              :totalNum="false"
              :isPage="false"
              :isGroup="false"
              :chooseName.sync="followRemarkForm.trackName"
              :chooseId.sync="followRemarkForm.trackId"
              :clear="true" :url="followSelUrl" :data="efData" ></sino-select>
          </sino-form-item>
          <sino-form-item label="跟进日期：" prop="operTime">
            <sino-date-picker
              type="date"
              v-model="followRemarkForm.operTime"
              :editable="false"
              :readonly="false"
              :clearable="true"
              :picker-options="pickerOptions"
            >
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="跟进结果：" prop="trackResultName" class="clear">
            <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :totalNum="false" :isPage="false" :isGroup="false"
                         :chooseName.sync="followRemarkForm.trackResultName" :chooseId.sync="followRemarkForm.trackResult" :disabled="disabledFlag"
                         :clear="true" :url="selUrl" :data="{code:'TRACK_STATE',ids:[1,2,3]}"></sino-select>
          </sino-form-item>
          <sino-form-item label="备注：" class="sino-form-item-width" prop="trackRemark">
            <sino-input type="textarea" v-model="followRemarkForm.trackRemark"></sino-input>
            <input type="hidden" v-model="followRemarkForm.saleClueId">
            <input type="hidden" v-model="followRemarkForm.outline">
            <input type="hidden" v-model="followRemarkForm.custChType">
            <input type="hidden" v-model="followRemarkForm.custChName">
          </sino-form-item>
        </sino-form>
        <sino-title type="levelTwo" class="fl" title="历史跟进情况">
          <sino-button type="icon-text" class="fr" @click="moreIcon" v-if="remarkHisList && remarkHisList.length > 0">
            <i class="iconfont" :class="{'sino-shuangjiantou-copy':isA,'sino-angle-double-up':!isA}"></i>
            <span v-if="isA">展开</span>
            <span v-if="!isA">收起</span>
          </sino-button>
        </sino-title>
        <div class="follow-remark fl" v-if="!isA">
          <sino-form v-for="(list, index) in remarkHisList" :key="index">
            <sino-form-item label="跟进人：" prop="trackName">
              <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                           :disabled="true" :totalNum="false" :isPage="false" :isGroup="false"
                           :chooseName.sync="list.trackName" :chooseId.sync="list.trackId"
                           :clear="true" :url="followSelUrl" :data="efData"></sino-select>
            </sino-form-item>
            <sino-form-item label="跟进日期：" prop="trackTime">
              <sino-date-picker
                type="date"
                v-model="list.trackTime"
                :editable="false"
                :readonly="false"
                :disabled="true"
                :clearable="true"
              >
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="跟进结果：" prop="trackResultName" class="clear">
              <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                           :disabled="true" :totalNum="false" :isPage="false" :isGroup="false"
                           :chooseName.sync="list.trackResultName" :chooseId.sync="list.trackResult"
                           :clear="true" :url="selUrl" :data="{code:'TRACK_STATE',ids:[1,2,3]}"></sino-select>
            </sino-form-item>
            <sino-form-item label="备注：" class="sino-form-item-width" prop="trackRemark">
              <sino-input type="textarea" v-model="list.trackRemark" :disabled="true"></sino-input>
            </sino-form-item>
          </sino-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="followReSub('followRemarkForm')">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../api/index';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    components: {},
    data () {
      return {
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > new Date();
          }
        },
        dropdown: false,
        checkedArr: [],
        followSelUrl: this.apiPath.author.findUserByOrgIdAndRoleType,
        custUrl: this.apiPath.hrsc.findCustSelectInfo,
        custInfoUrl: this.apiPath.author.findUserSelectBoxInfo,
        fllowData: {orgId: '', roleTypes: []},
        efData: {orgId: '', roleTypes: [3, 4]},
        selUrl: this.apiPath.hrsc.getDictSelectBox,
        token: Cookie.get('Token'),
        checked: true,
        leadsForm: {
          outLine: '',
          corpName: '',
          clueState: '',
          clueStateName: '',
          trackResult: ''
        },
        leadsRules: {},
        SalesList: [],
        isA: true,
        tableData: null,
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
        alertTitle: '',
        leadsbtn: '',
        leadsAddForm: {
          outLine: '',
          source: '',
          providerId: Cookie.get('UserId'),
          providerName: Cookie.get('CPYY-INFO-NAME'),
          provideDate: '',
          contName: '',
          phone: '',
          tel: '',
          email: '',
          corpName: '',
          corpAddr: '',
          perScale: '',
          induType: '',
          clueDesc: '',
          perScaleName: '',
          induTypeName: '',
          sourceName: '',
          custChType: '',
          custChName: ''
        },
        // 校验
        rules: {
          contName: [
            { required: true, message: '请输入联系人名称', trigger: 'blur' }
          ],
          custChName: [
            { required: true, message: '请选择客户名称', trigger: 'change' }
          ],
          providerName: [
            { required: true, message: '请选择线索提供人', trigger: 'change' }
          ],
          phone: [
            {validator: this.validator.checkPhone, trigger: 'blur'}
          ],
          corpName: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          clueDesc: [
            { required: true, message: '请输入线索内容', trigger: 'blur' }
          ],
          tel: [
            {validator: this.validator.checkTelphone, trigger: 'blur'}
          ]
        },
        seeForm: {
          providerName: ''
        },
        leadsAdd: false,
        seeItem: false,
        RoleSeeList: '',
        value1: '',
        IndustryList: [],
        followList: [],
        follow: false,
        followForm: {
          trackId: '',
          trackName: ''
        },
        followRules: {
          trackName: [
            {required: true, message: '请选择跟进人', trigger: 'blur'}
          ]
        },
        followRemarkFlag: false,
        followRemarkForm: {
          trackId: '',
          trackName: '',
          trackResult: '',
          trackResultName: '',
          operTime: '',
          trackRemark: '',
          custChType: '',
          custChName: '',
          outline: '',
          saleClueId: ''
        },
        followRemarkRules: {
          trackName: [
            {required: false, message: '请选择跟进人', trigger: 'change'}
          ],
          trackResultName: [
            {required: true, message: '请选择跟进结果', trigger: 'change'}
          ],
          operTime: [
            {type: 'date', required: true, message: '请选择跟进日期', trigger: 'change'}
          ],
          trackRemark: [
            {required: true, message: '请输入备注', trigger: 'change'}
          ]
        },
        remarkHisList: [],
        currUserRoleId: '',
        conObj: {},
        disabledFlag: false
      };
    },
    created () {
      // 获取角色ID和机构ID
      api.post(this.apiPath.author.findCurrUserRole, {token: Cookie.get('Token')}).then(res => {
        if (res.code === 'CPYY-00001') {
          // console.log(res.data);
          this.fllowData.orgId = res.data.orgId;
          this.efData.orgId = res.data.orgId;
//          this.ProviderName = res.data.userName;
          this.currUserRoleId = res.data.userRoleId;
          this.pageNum = 1;
          this.viewAll(this.pageNum, this.pageSize);
        }
      }).catch(err => {
        console.log(err);
      });
      let _data = new Date();
      this.followRemarkForm.operTime = _data;
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchButFun);
    },
    methods: {
      // icon图标切换
      moreIcon () {
        this.isA = !this.isA;
      },
      // 手动选中checkBox回调
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
      },
      // 销售人员规模下拉框列表
      getRoleSelectList: function () {
        api.getRoleSelectList().then(res => {
          this.IndustryList = res.list;
        }).catch(err => {
          console.log(err);
        });
      },
      // 新增&修改关闭弹层回调
      modifyClose: function () {
        this.$refs.leadsAddForm.resetFields();
      },
      // 跟进人关闭弹层回调
      followClose: function () {
        this.$refs.followForm.resetFields();
      },
      // 跟进备注弹层关闭回调
      followRemarkClose () {
        this.$refs.followRemarkForm.resetFields();
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.leadsForm
        };
        api.post(this.apiPath.crm.findSaleClueList, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            if (Cookie.set('userRoleId')) {
              res.data.list.forEach(function (list) {
                list.userRoleId = JSON.parse(Cookie.set('userRoleId'));
              });
            }
            this.tableData = res.data.list;
            this.total = res.data.total;
            console.log(this.tableData);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchButFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 显示条数变化回调
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 新增销售线索
      addFun: function () {
        this.leadsAdd = true;
        this.alertTitle = '新增销售线索';
        this.leadsbtn = '确 定';
//        this.leadsAddForm.provider = this.ProviderName;
        this.leadsAddForm.provideDate = new Date();
      },
      // 修改
      seeFun (data) {
        api.postsign(this.apiPath.crm.findSaleClueById, data.saleClueId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeItem = true;
            this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 跟进备注
      getSTime (val) {
        this.followRemarkForm.trackTime = val;
      },
      // 跟进备注
      followRemarkFun (_data) {
        this.followRemarkFlag = true;
        this.followRemarkForm.saleClueId = _data.saleClueId;
        this.followRemarkForm.trackResult = _data.trackResult;
        this.followRemarkForm.trackResultName = _data.trackResultName;
        if (_data.trackResult === 3) {
          this.disabledFlag = true;
        } else {
          this.disabledFlag = false;
        }
//        if (_data.trackResult !== 3) {
//          this.followRemarkForm.trackResult = 1;
//          this.followRemarkForm.trackResultName = '跟进中';
//          this.disabledFlag = false;
//        } else {
//          this.followRemarkForm.trackResult = _data.trackResult;
//          this.followRemarkForm.trackResultName = '已成单';
//          this.disabledFlag = true;
//        }
        this.followRemarkForm.trackName = _data.trackName;
        this.followRemarkForm.trackId = _data.trackId;
        api.postsign(this.apiPath.crm.findTrackRemarkById, this.followRemarkForm.saleClueId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.followRemarkForm.custChType = res.data.custChType;
            this.followRemarkForm.custChName = res.data.custChName;
            this.followRemarkForm.outline = res.data.outLine;
            this.followRemarkForm.saleClueId = res.data.saleClueId;
            api.postsign(this.apiPath.crm.findRemarkHisList, this.followRemarkForm.saleClueId).then(res => {
              if (res.code === 'CPYY-00001') {
                this.remarkHisList = res.data;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
        api.postsign(this.apiPath.crm.findConBySaleClueId, this.followRemarkForm.saleClueId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.conObj = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 跟进备注确定
      followReSub () {
        const _this = this;
        let _aa = JSON.parse(JSON.stringify(_this.followRemarkForm));
        _this.$refs.followRemarkForm.validate((valid) => {
          if (valid) {
            this.followRemarkForm.operTime = Vue.filter('date')(this.followRemarkForm.operTime, 'yyyy-MM-dd');
            let _data = _this.followRemarkForm;
            _data.saleClueId = _this.followRemarkForm.saleClueId;
            if (_this.followRemarkForm.trackResult === 3) {
              if (this.conObj.contract === false || (this.conObj.contract === true && this.conObj.effect === false)) {
                _data.trackResult = 1;
              }
            }
            api.post(_this.apiPath.crm.updateSaleClueTrackResult, {saleClueIds: [_data.saleClueId], trackResult: _data.trackResult}).then(res => {
            }).catch(err => {
              console.log(err);
            });
            api.post(this.apiPath.crm.updateTrackRemarkById, _data).then(res => {
              if (res.code === 'CPYY-00001') {
                if (_aa.trackResult === 3 && this.conObj.contract === false) {
                  this.$router.push({path: '/custBusCon/addBusCon', query: {outline: _this.followRemarkForm.outline, saleClueId: _this.followRemarkForm.saleClueId, custChType: _this.followRemarkForm.custChType, custChName: _this.followRemarkForm.custChName}});
                } else {
                  this.followRemarkFlag = false;
                  this.searchButFun();
                  this.$message({message: '跟进备注成功！', type: 'success'});
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 修改
      modifyFun: function (data) {
        this.leadsAdd = true;
        this.alertTitle = '修改销售线索'; // 信息两字放不开，应该修改dialog，title宽度
        this.leadsbtn = '修 改';
        api.postsign(this.apiPath.crm.findSaleClueById, data.saleClueId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.leadsAddForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 作废
      delFun: function (data) {
        this.$confirm('确定作废该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.crm.deleteSaleClueById, {saleClueId: data.saleClueId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchButFun();
              this.$message({message: '作废成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      // 跟进弹层 确认方法
      followSure () {
        this.$refs.followForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.crm.updateSaleClueTrackId, {saleClueId: this.checkedArr[0].saleClueId, trackId: this.followForm.trackId}).then(res => {
              this.follow = false;
              if (res.code === 'CPYY-00001') {
                this.leadsAdd = false;
                this.searchButFun();
                this.$message({message: '跟进人分配成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 新增确定
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增销售线索') {
              if (this.leadsAddForm.provideDate) {
                this.leadsAddForm.provideDate = Vue.filter('date')(this.leadsAddForm.provideDate, 'yyyy-MM-dd');
              }
              if (this.leadsAddForm.tel === '' && this.leadsAddForm.phone === '' && this.leadsAddForm.email === '') {
                this.$alert('手机号码、固定电话和邮箱地址至少任选其一填写。', '提示信息', {
                  confirmButtonText: '确 定',
                  type: 'warning', // icon图标类型
                  dragFlag: true,
                  customClass: '', // 添加class
                  lockScroll: true,
                  callback: action => {}
                });
                return;
              }
              api.post(this.apiPath.crm.saveSaleClue, this.leadsAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.leadsAdd = false;
                  this.searchButFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              if (this.leadsAddForm.provideDate) {
                this.leadsAddForm.provideDate = Vue.filter('date')(this.leadsAddForm.provideDate, 'yyyy-MM-dd');
              }
              if (this.leadsAddForm.contName === '' && this.leadsAddForm.phone === '' && this.leadsAddForm.email === '') {
                this.$alert('手机号码、固定电话和邮箱地址至少任选其一填写。', '提示信息', {
                  confirmButtonText: '确 定',
                  type: 'warning', // icon图标类型
                  dragFlag: true,
                  customClass: '', // 添加class
                  lockScroll: true,
                  callback: action => {}
                });
                return;
              }
              api.post(this.apiPath.crm.updateSaleClue, this.leadsAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.leadsAdd = false;
                  this.searchButFun();
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
