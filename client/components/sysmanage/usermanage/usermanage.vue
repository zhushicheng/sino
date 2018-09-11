<template>
  <div class="usermanage">
    <!--用户管理-->
    <sino-con>
      <sino-title type="levelOne" title="查询条件"></sino-title>
      <sino-form :model="userForm" ref="ruleForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">登录名称：</span>
              <sino-input class="fl" type="text"
                          v-model="userForm.loginName"
                          :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">用户名称：</span>
              <sino-input type="text" class="fl"
                          v-model="userForm.fullName"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">是否有效：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="userForm.isEffectName"
                           :chooseId.sync="userForm.isEffect" :clear="true"
                           :data="{code: 'IS_EFFECT'}"
                           :url="dictSelUrl"></sino-select>
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
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="clickFun('','add')"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" max-height="416" border v-on:viewAll="viewAll" stripe>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column prop="loginName" label="登录名称" align="left"></sino-table-column>
          <sino-table-column prop="fullName" label="用户名称" align="center"></sino-table-column>
          <sino-table-column prop="innerNum" label="员工编号" align="center"></sino-table-column>
          <sino-table-column prop="isEffectName" label="是否有效" align="center"></sino-table-column>
          <sino-table-column prop="userTypeName" label="用户类型" align="center"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称" min-width="180" align="center"></sino-table-column>
          <sino-table-column label="操作" align="center" width="180" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="clickFun(scope.row,'modify')">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="clickFun(scope.row,'del')">删除</span><i class="table-i">|</i>
                <span class="table-span" @click="resetPassFun(scope.row)">重置</span>
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
    <!-- 新增-->
    <sino-dialog :visible.sync="userMangageFlag" size="large" :top="'10%'" class="dialog-height" v-on:close="cleanContent('userMangageForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="userMangageForm" :rules="userMangageRules" ref="userMangageForm" class="demo-sendAddrAddForm">
        <sino-form-item label="登录名称：" prop="loginName">
          <sino-input v-model="userMangageForm.loginName"></sino-input>
        </sino-form-item>
        <sino-form-item label="用户名称：" prop="fullName">
          <sino-input v-model="userMangageForm.fullName"></sino-input>
        </sino-form-item>
        <sino-form-item label="性别：" prop="sex">
          <span class="usermanage-radio">
            <sino-radio v-for="(item,index) in sexlist" :key="index" v-model="userMangageForm.sex" :label="item.id.toString()">{{item.title}}</sino-radio>
          </span>
        </sino-form-item>
        <sino-form-item prop="corpName" label="所属公司：">
          <sino-select :tipText="''"
                       :filterable="true" :token="token"
                       :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                       :chooseName.sync="userMangageForm.corpName"
                       :chooseId.sync="userMangageForm.corpId" :clear="true"
                       :url="corpSelUrl"
                       @change="corpChanage"></sino-select>
        </sino-form-item>
        <sino-form-item prop="loginPwd" label="登录密码：">
          <sino-input type="password" v-model="userMangageForm.loginPwd"></sino-input>
        </sino-form-item>
        <sino-form-item prop="orgName" label="所属部门：">
          <sino-select :tipText="''"
                       :filterable="true"
                       :token="token"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :chooseName.sync="userMangageForm.orgName"
                       :chooseId.sync="userMangageForm.orgId" :clear="true"
                       :url="orgSelUrl"
                       :linkage="true"
                       :data="orgData"></sino-select>
        </sino-form-item>
        <sino-form-item prop="reloginPwd" label="确认密码：">
          <sino-input type="password" v-model="userMangageForm.reloginPwd"></sino-input>
        </sino-form-item>
        <sino-form-item prop="innerNum" label="员工编号：">
          <sino-input v-model="userMangageForm.innerNum"></sino-input>
        </sino-form-item>
        <sino-form-item prop="mobile" label="手机号码：">
          <sino-input v-model="userMangageForm.mobile"></sino-input>
        </sino-form-item>
        <sino-form-item prop="userTypeName" label="用户类型：">
          <sino-select :tipText="''"
                       :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="userMangageForm.userTypeName"
                       :chooseId.sync="userMangageForm.userType"
                       :data="{code:'USER_TYPE'}" :clear="true"
                       :url="dictSelUrl"></sino-select>
        </sino-form-item>
        <sino-form-item prop="phone" label="电话号码：">
          <sino-input v-model="userMangageForm.phone"></sino-input>
        </sino-form-item>
        <sino-form-item prop="postCode" label="邮政编码：">
          <sino-input v-model="userMangageForm.postCode"></sino-input>
        </sino-form-item>
        <sino-form-item prop="nationName" label="民族：">
            <sino-select :tipText="''"
                         :filterable="false"
                         v-model="userMangageForm.nation"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :chooseName.sync="userMangageForm.nationName"
                         :chooseId.sync="userMangageForm.nation"
                         :clear="true"
                         :url="dictSelUrl"
                         :data="{code:'nation'}"></sino-select>
        </sino-form-item>
        <sino-form-item prop="email" label="邮箱地址：">
          <sino-input v-model="userMangageForm.email"></sino-input>
        </sino-form-item>
        <sino-form-item prop="addr" label="家庭住址：" class="sino-form-item-width">
          <sino-input type="text" v-model="userMangageForm.addr"></sino-input>
        </sino-form-item>
        <sino-form-item prop="userDesc" label="描述：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="userMangageForm.userDesc"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--修改-->
    <sino-dialog :visible.sync="userMangageEditFlag" size="large" :top="'10%'" class="dialog-height" @close="cleanContent('userMangageEditForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="userMangageEditForm" :rules="userMangageEditRules" ref="userMangageEditForm" class="demo-sendAddrAddForm">
        <sino-form-item label="登录名称：" prop="loginName">
          <sino-input v-model="userMangageEditForm.loginName"></sino-input>
        </sino-form-item>
        <sino-form-item label="用户名称：" prop="fullName">
          <sino-input v-model="userMangageEditForm.fullName"></sino-input>
        </sino-form-item>
        <sino-form-item label="性别：" prop="sex">
          <span class="usermanage-radio">
            <sino-radio v-for="(item, index) in sexlist" v-model="userMangageEditForm.sex" :key="index" :label="item.id">{{item.title}}</sino-radio>
          </span>
        </sino-form-item>
        <sino-form-item prop="corpName" label="所属公司：">
          <sino-select :tipText="''"
                       :token="token" :filterable="false"
                       :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false"
                       :isPage="true" :isGroup="false"
                       :chooseName.sync="userMangageEditForm.corpName"
                       :chooseId.sync="userMangageEditForm.corpId" :clear="true"
                       :url="corpSelUrl"
                       @change="editCorpChanage"></sino-select>
        </sino-form-item>
        <sino-form-item prop="orgName" label="所属部门：">
          <sino-select :tipText="''" :token="token"
                       :filterable="false" :multiselect="false"
                       :isshowTotol="false" :disabled="false"
                       :totalNum="false" :isPage="false" :isGroup="false"
                       :chooseName.sync="userMangageEditForm.orgName"
                       :chooseId.sync="userMangageEditForm.orgId" :clear="true"
                       :url="orgSelUrl"
                       :data="orgEditData"
                       :linkage="true"></sino-select>
        </sino-form-item>
        <sino-form-item prop="innerNum" label="员工编号：">
          <sino-input v-model="userMangageEditForm.innerNum"></sino-input>
        </sino-form-item>
        <sino-form-item class="clear" prop="mobile" label="手机号码：">
          <sino-input v-model="userMangageEditForm.mobile"></sino-input>
        </sino-form-item>
        <sino-form-item prop="userTypeName" label="用户类型：">
          <sino-select :tipText="''"
                       :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="userMangageEditForm.userTypeName"
                       :chooseId.sync="userMangageEditForm.userType"
                       :data="{code:'USER_TYPE'}" :clear="true"
                       :url="dictSelUrl"></sino-select>
        </sino-form-item>
        <sino-form-item prop="phone" label="电话号码：">
          <sino-input v-model="userMangageEditForm.phone"></sino-input>
        </sino-form-item>
        <sino-form-item prop="postCode" label="邮政编码：">
          <sino-input v-model="userMangageEditForm.postCode"></sino-input>
        </sino-form-item>
        <sino-form-item prop="nationName" label="民族：">
          <sino-select :tipText="''"
                       :filterable="false"
                       v-model="userMangageEditForm.nation" :multiselect="false"
                       :isshowTotol="false" :disabled="false" :totalNum="false"
                       :isPage="true" :isGroup="false"
                       :chooseName.sync="userMangageEditForm.nationName"
                       :chooseId.sync="userMangageEditForm.nation" :clear="true"
                       :url="dictSelUrl"
                       :data="{code:'NATION'}"></sino-select>
        </sino-form-item>
        <sino-form-item prop="email" label="邮箱地址：">
          <sino-input v-model="userMangageEditForm.email"></sino-input>
        </sino-form-item>
        <sino-form-item prop="addr" label="家庭住址：" class="sino-form-item-width">
          <sino-input type="text" v-model="userMangageEditForm.addr"></sino-input>
        </sino-form-item>
        <sino-form-item prop="userDesc" label="描述：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="userMangageEditForm.userDesc"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitEditForm">确 定</sino-button>
      </span>
    </sino-dialog>

    <!-- 查看 -->
    <sino-dialog :visible.sync="seeItem" size="small">
      <sino-title slot="title" type="levelOne" title="用户信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>公司</h6><input readonly v-model="roleSeeList.corpName">
          </li>
          <li>
            <h6>用户类型</h6><input readonly v-model="roleSeeList.userTypeName">
          </li>
          <li>
            <h6>登录名称</h6><input readonly v-model="roleSeeList.loginName">
          </li>
          <li>
            <h6>员工编号</h6><input readonly v-model="roleSeeList.innerNum">
          </li>
          <li>
            <h6>用户名称</h6><input readonly v-model="roleSeeList.fullName">
          </li>
          <li>
            <h6>民族</h6><input readonly v-model="roleSeeList.nationName">
          </li>
          <li>
            <h6>手机号码</h6><input readonly v-model="roleSeeList.mobile">
          </li>
          <li>
            <h6>性别</h6><input readonly v-model="roleSeeList.sexName">
          </li>
          <li>
            <h6>电话号码</h6><input readonly v-model="roleSeeList.phone">
          </li>
          <li>
            <h6>邮箱</h6><input readonly v-model="roleSeeList.email">
          </li>
          <li>
            <h6>状态</h6><input readonly v-model="roleSeeList.isEffectName">
          </li>
          <li>
            <h6>创建时间</h6><input readonly v-model="roleSeeList.creTime">
          </li>
          <li>
            <h6>住址</h6><input readonly v-model="roleSeeList.addr">
          </li>
          <li>
            <h6>操作人</h6><input readonly v-model="roleSeeList.creUserName">
          </li>
          <li>
            <h6>邮政编码</h6><input readonly v-model="roleSeeList.postCode">
          </li>
          <li>
            <h6>操作时间</h6><input readonly v-model="roleSeeList.operTime">
          </li>
          <li class="li-last">
            <h6>描述</h6><input readonly v-model="roleSeeList.userDesc">
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
         <sino-button type="primary" @click="seeItem=false">确 定</sino-button>
      </span>
    </sino-dialog>

    <!--重置密码-->
    <sino-dialog :visible.sync="resetPassFlag" size="small" class="leads-follow dialog-item" @close="cleanContent('resetPassForm')">
      <sino-title slot="title" type="levelOne" title="重置密码" class="sino-dialog-title"></sino-title>
      <sino-form :model="resetPassForm" ref="resetPassForm" :rules="resetPassRules" class="follow-select">
        <div class="follow-content">
          <sino-form-item label="用户名：" prop="fullName">
            <sino-input v-model="resetPassForm.fullName" :disabled="true"></sino-input>
            <input type="hidden" v-model="resetPassForm.loginName">
          </sino-form-item>
          <sino-form-item label="新密码：" prop="newPwd">
            <sino-input v-model="resetPassForm.newPwd"></sino-input>
          </sino-form-item>
          <sino-form-item label="确认密码：" prop="renewPwd">
            <sino-input v-model="resetPassForm.renewPwd"></sino-input>
          </sino-form-item>
        </div>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="resetSubmitFun">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  export default {
    data () {
      const validateNewPwd = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入新密码'));
        } else {
          callback();
        }
      };
      let validateArginNewPwd = (rule, value, callback) => {
        let _this = this;
        if (value === undefined || value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== _this.resetPassForm.newPwd) {
          callback(new Error('请与新密码输入一致'));
        } else {
          callback();
        }
      };
      return {
        sexlist: [],
        orgData: {id: '', title: ''},
        orgEditData: {id: '', title: ''},
        corpSelUrl: this.apiPath.author.findCorpSelectBoxInfo,
        userSelUrl: this.apiPath.author.findUserSelectBoxInfo,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        orgSelUrl: this.apiPath.author.findOrgSelectBoxInfo,
        isEffectlist: [],
        userForm: { // 搜索条件
          fullName: '',
          userName: '',
          isEffectName: '',
          isEffect: ''
        },
        token: Cookie.get("Token"),
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
        alertTitle: '',
        roleSeeList: {},
        seeItem: false, // 查看弹层控制显示
        userMangageForm: {
          loginName: '',
          fullName: '',
          sex: '',
          corpName: '',
          corpId: '',
          loginPwd: '',
          orgId: '',
          orgName: '',
          reloginPwd: '',
          nationName: '',
          innerNum: '',
          mobile: '',
          userType: '',
          userTypeName: '',
          phone: '',
          postCode: '',
          roleType: '',
          roleTypeName: '',
          email: '',
          addr: '',
          userDesc: ''
        },
        userMangageEditForm: {
          loginName: '',
          fullName: '',
          sex: '',
          corpName: '',
          corpId: '',
          orgId: '',
          orgName: '',
          nationName: '',
          innerNum: '',
          mobile: '',
          userType: '',
          userTypeName: '',
          phone: '',
          postCode: '',
          roleType: '',
          roleTypeName: '',
          email: '',
          addr: '',
          userDesc: ''
        },
        userMangageRules: {
          loginName: [
            {required: true, message: '请输入登录名称', trigger: 'change'}
          ],
          fullName: [
            {required: true, message: '请输入用户名称', trigger: 'change'}
          ],
          corpName: [
            {required: true, message: '请选择所属公司', trigger: 'change'}
          ],
          loginPwd: [
            {required: true, message: '请输入登录密码', trigger: 'change'}
          ],
          reloginPwd: [
            {required: true, trigger: 'blur', message: '请确认登录密码'}
          ],
          orgName: [
            {required: true, message: '请输入所属行政机构', trigger: 'change'}
          ],
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'change'},
            {min: 11, max: 11, message: '长度在 11 个字符', trigger: 'change'},
            {validator: this.validator.checkPhone, trigger: 'blur'}
          ],
          userTypeName: [
            {required: true, message: '请选择用户类型', trigger: 'change'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ]
        },
        userMangageEditRules: {
          loginName: [
            {required: true, message: '请输入登录名称', trigger: 'change'}
          ],
          fullName: [
            {required: true, message: '请输入用户名称', trigger: 'change'}
          ],
          corpName: [
            {required: true, message: '请选择所属公司', trigger: 'change'}
          ],
          orgName: [
            {required: true, message: '请输入所属行政机构', trigger: 'change'}
          ],
          mobile: [
            {required: true, message: '请输入手机号码', trigger: 'change'},
            {min: 11, max: 11, message: '长度在 11 个字符', trigger: 'change'}
          ],
          userTypeName: [
            {required: true, message: '请选择用户类型', trigger: 'change'}
          ]
        },
        userMangageFlag: false,
        userMangageEditFlag: false,
        resetPassFlag: false,
        resetPassForm: {
          loginName: '',
          fullName: '',
          newPwd: '',
          renewPwd: ''
        },
        resetPassRules: {
          newPwd: [
            {required: true, trigger: 'blur', validator: validateNewPwd},
            { min: 1, message: '请输入1-16位的字母和数字的组合', trigger: 'blur' }
          ],
          renewPwd: [
            {required: true, trigger: 'blur', validator: validateArginNewPwd}
          ]
        }
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'SEX'}).then(res => {
        this.sexlist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      corpChanage (data) {
        this.orgData.id =  this.userMangageForm.corpId;
      },
      editCorpChanage () {
        this.orgEditData.id =  this.userMangageEditForm.corpId;
      },
      moreIcon () {
        this.isA = !this.isA;
      },
      viewAll (pageNum, pageSize) {
        let data = {
          data: this.userForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.author.findBaseUserInfoPage, data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
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
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      seeFun (data) {
        api.post(this.apiPath.author.findBaseUserInfoById, data).then(res => {
          this.roleSeeList = res.data;
          this.seeItem = true;
        }).catch(err => {
          console.log(err);
        });
      },
      clickFun: function (data, type) {
        if (type === 'modify') {
          let _this = this;
          _this.userMangageEditFlag = true;
          api.post(this.apiPath.author.findBaseUserInfoById, data).then(res => {
            _this.alertTitle = '修改用户';
            _this.userMangageEditForm = res.data;
            let _org = JSON.parse(JSON.stringify(res.data));
            setTimeout(function () {
              _this.userMangageEditForm.orgId = _org.orgId;
              _this.userMangageEditForm.orgName = _org.orgName;
            }, 0);
          }).catch(err => {
            console.log(err);
          });
        }
        if (type === 'add') {
          this.userMangageFlag = true;
          this.alertTitle = '新增用户';
          if (this.$refs.userMangageForm !== undefined) {
            this.$refs.userMangageForm.resetFields();
          }
        }
        if (type === 'del') {
          this.$confirm('此操作将删除该条数据, 是否继续?', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            let _data = {};
            _data.userId = data.userId;
            _data.isEffect = 0;
            api.post(this.apiPath.author.updateUserIsEffectById, _data).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.$message({message: '删除成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch(() => {
            console.log('删除失败!');
          });
        }
      },
      submitForm () {
        const _this = this;
        _this.$refs.userMangageForm.validate((valid) => {
          if (valid) {
            if (_this.userMangageForm.loginPwd !== _this.userMangageForm.reloginPwd) {
              for (let i = 0; i < _this.$refs.userMangageForm.$children.length; i++) {
                if (_this.$refs.userMangageForm.$children[i].prop === 'reloginPwd') {
                  _this.$refs.userMangageForm.$children[i].validateState = 'error';
                  _this.$refs.userMangageForm.$children[i].validateMessage = '请确认两次密码保持一致';
                }
              }
            }
            api.post(_this.apiPath.author.saveUser, this.userMangageForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.userMangageFlag = false;
                this.searchFun();
                this.$message({message: '新增成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit!!');
          }
        });
      },
      submitEditForm () {
        this.$refs.userMangageEditForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.author.updateBaseUserById, this.userMangageEditForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.userMangageEditFlag = false;
                this.searchFun();
                this.$message({message: '修改成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit!!');
          }
        });
      },
      // 重置密码
      resetPassFun (_data) {
        this.resetPassFlag = true;
        this.resetPassForm.fullName = _data.fullName;
        this.resetPassForm.loginName = _data.loginName;
      },
      resetSubmitFun () {
        this.$refs.resetPassForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.author.updateResetUserPwd, this.resetPassForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.resetPassFlag = false;
                this.$message({message: '密码重置成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cleanContent: function (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
