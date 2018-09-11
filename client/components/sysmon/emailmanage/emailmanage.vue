<template>
  <!--<div>邮箱管理</div>-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="邮箱查询"></sino-title>
      <sino-form :model="mailForm" ref="mailForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="服务器：" class="search-inner-item">
                <sino-input class="fl" type="text"
                            v-model="mailForm.emailHost"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="邮箱账号：" class="search-inner-item">
                <sino-input class="fl" type="text"
                            v-model="mailForm.emailAcct"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="业务类型：" class="search-inner-item">
                <div class="search-inner-radio fl">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="conStateUrl"
                               :data="{code:'EMAIL_BUSI_TYPE'}"
                               :chooseName.sync="mailForm.busiTypesTrans"
                               :chooseId.sync="mailForm.busiTypes"
                               :clear="true"></sino-select>
                </div>
              </sino-form-item>
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
    <!--表格-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="configEmailFun"><i class="iconfont sino-chilun"></i>邮箱配置
            </sino-button>
          </div>
        </div>
        <sino-table max-height="416" :data="mailData" stripe v-on:viewAll="viewAll" border>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="emailHost" label="服务器"></sino-table-column>
          <sino-table-column prop="emailAcct" label="邮箱账号" min-width="180"></sino-table-column>
          <sino-table-column prop="busiTypeObjListString" label="业务类型"></sino-table-column>
          <sino-table-column label="操作" align="center" width="140" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="modifyFun(scope.row)">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="delFun(scope.row)">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
      </div>
    </div>
    <!-- 邮箱配置 -->
    <sino-dialog :visible.sync="emailConfigFlag" size="large" :top="'10%'" class="dialog-height" @close ="closeDialog('emailConfigForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="emailConfigForm" :rules="emailConfigRules" ref="emailConfigForm" class="demo-sendAddrAddForm">
        <sino-form-item label="服务器：" prop="emailHost">
          <sino-input v-model="emailConfigForm.emailHost"></sino-input>
        </sino-form-item>
        <sino-form-item label="邮箱账号：" prop="emailAcct">
          <sino-input v-model="emailConfigForm.emailAcct"></sino-input>
        </sino-form-item>
        <sino-form-item label="密码：" prop="pwd">
          <sino-input v-model="emailConfigForm.pwd"></sino-input>
        </sino-form-item>
        <sino-form-item label="端口：" prop="port">
          <sino-input v-model="emailConfigForm.port"></sino-input>
        </sino-form-item>
        <sino-form-item prop="userDesc" label="业务类型：" class="sino-form-item-width">
          <sino-checkbox-group v-model="emailConfigForm.busiTypes">
            <sino-checkbox label="复选框 A"></sino-checkbox>
            <sino-checkbox label="复选框 B"></sino-checkbox>
            <sino-checkbox label="复选框 C"></sino-checkbox>
            <sino-checkbox label="禁用" disabled></sino-checkbox>
            <sino-checkbox label="选中且禁用" disabled></sino-checkbox>
          </sino-checkbox-group>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{btnText}}</sino-button>
      </span>
    </sino-dialog>
    <!-- 查看 -->
    <sino-dialog :visible.sync="emailSeeFlag" size="small">
      <sino-title slot="title" type="levelOne" title="邮箱管理" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>服务器</h6><input readonly v-model="emailSeeList.corpName">
          </li>
          <li>
            <h6>邮箱账号</h6><input readonly v-model="emailSeeList.userTypeName">
          </li>
          <li>
            <h6>端口</h6><input readonly v-model="emailSeeList.loginName">
          </li>
          <li>
            <h6>操作人</h6><input readonly v-model="emailSeeList.innerNum">
          </li>
          <li>
            <h6>操作时间</h6><input readonly v-model="emailSeeList.fullName">
          </li>
          <li>
            <h6>创建人</h6><input readonly v-model="emailSeeList.nationName">
          </li>
          <li class="li-last">
            <h6>创建时间</h6><input readonly v-model="emailSeeList.userDesc">
          </li>
          <li class="li-last">
            <h6>业务类型</h6><input readonly v-model="emailSeeList.userDesc">
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
         <sino-button type="primary" @click="emailSeeFlag=false">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';

  export default {
    data () {
      return {
        conStateUrl: this.apiPath.hrsc.getDictSelectBox,
        value1: '',
        mailForm: {
          emailHost: '',
          emailAcct: '',
          busiTypes: '',
          busiTypesTrans: ''
        },
        mailData: null,
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
        emailSeeList: {},
        emailSeeFlag: false,
        emailConfigFlag: false,
        emailConfigForm: {
          emailHost: '',
          emailAcct: '',
          pwd: '',
          busiTypes: [],
          port: ''
        },
        emailConfigRules: {},
        alertTitle: '',
        btnText: ''
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      //  查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      submitForm () {},
      viewAll (pageNum, pageSize) {
        let _busiTypes = [];
        if (this.mailForm.busiTypes !== '') {
          _busiTypes.push(this.mailForm.busiTypes);
        }
        this.mailForm.busiTypes = _busiTypes;
        let _data = {
          data: {
            busiTypes: this.mailForm.busiTypes,
            emailAcct: this.mailForm.emailAcct,
            emailHost: this.mailForm.emailHost
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        console.log(_data);
        api.post(this.apiPath.mail.getEmailAccountByPage, _data).then(res => {
          this.mailData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 邮箱配置
      configEmailFun () {
        this.alertTitle = '邮箱配置';
        this.btnText = '确 定';
        this.emailConfigFlag = true;
      },
      // 修改
      modifyFun (data) {
        this.alertTitle = '修改邮箱配置';
        this.btnText = '修 改';
        this.emailConfigFlag = true;
        api.post(this.apiPath.author.findBaseUserInfoById, data).then(res => {
          this.emailConfigForm = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      //  查看
      seeFun (data) {
        api.post(this.apiPath.author.findBaseUserInfoById, data).then(res => {
          this.emailSeeList = res.data;
          this.emailSeeFlag = true;
        }).catch(err => {
          console.log(err);
        });
      },
      // 删除
      delFun (data) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
//          let _data = {};
//          _data.userId = data.userId;
//          _data.isEffect = 0;
//          api.post(this.apiPath.author.updateUserIsEffectById, _data).then(res => {
//            this.$alert('删除成功', '提示信息', {
//              confirmButtonText: '确 定',
//              type: 'success', // icon图标类型
//              dragFlag: true,
//              lockScroll: true,
//              callback: action => {
//                this.searchFun();
//              }
//            });
//          }).catch(err => {
//            console.log(err);
//          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(1, pageSize);
      },
      closeDialog (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
