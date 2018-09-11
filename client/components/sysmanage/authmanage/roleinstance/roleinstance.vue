<template>
  <!--角色实例-->
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">角色实例</div>
          <div class="sino-tabs-item" @click="changeTabFun('second')">功能授权</div>
          <div class="sino-tabs-item" @click="changeTabFun('third')">数据权限</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="roleSearchForm" ref="ruleForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">用户名称：</span>
              <sino-input class="fl" type="text" v-model="roleSearchForm.userName"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">角色名称：</span>
              <sino-input class="fl" type="text" v-model="roleSearchForm.roleName"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">机构名称：</span>
              <sino-input class="fl" type="text" v-model="roleSearchForm.orgName"></sino-input>
            </li>
            <li v-if="screeWidth<1366"></li>
            <li :class="{'search-long-li': screeWidth<1366}">
              <span class="search-inner-name">筛选维度：</span>
              <div class="fl role-radio-box">
                <sino-radio v-for="(item,index) in trackStatus" :key="index" v-model="roleSearchForm.selectType" :label="item.id" class="leads-sinoradio" :class="{'width-radio':(item.id)=== 4}" :disabled="disabledArray.indexOf(item.id) !==-1">{{item.title}}</sino-radio>
              </div>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchBtnFun">查 询</sino-button>
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
          </div>
        </div>
        <sino-table :data="tableData" border max-height="416" stripe v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="userName" label="用户名称"></sino-table-column>
          <sino-table-column prop="orgName" label="机构名称"></sino-table-column>
          <sino-table-column prop="roleName" label="角色名称"></sino-table-column>
          <!--<sino-table-column prop="isEffectName" label="状态" width="60"></sino-table-column>-->
          <sino-table-column prop="corpName" label="公司名称" width="250"></sino-table-column>
          <sino-table-column label="操作" align="center" width="150" v-if="roleSearchForm.selectType === 4">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="modifyFun(scope.row)">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="deleteFun(scope.row)">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--新增/修改-->
    <sino-dialog :visible.sync="roleInstAdd" size="large" :top="'10%'" class="dialog-height no-minheight special-dialog" @close ="resetForm('roleInstAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="roleInstAddForm" :rules="roleInstAddRules" ref="roleInstAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="公司名称：" class="h25" prop="corpName">
          <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="roleInstAddForm.corpName" :chooseId.sync="roleInstAddForm.corpId" :token="token" :clear="true" :url="corpSelUrl" @change="changeFun"></sino-select>
        </sino-form-item>
        <sino-form-item label="用户名称：" class="h25" prop="userName">
          <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="roleInstAddForm.userName" :chooseId.sync="roleInstAddForm.userId" :token="token" :clear="true" :url="userSelUrl" :data="userData" :linkage="true"></sino-select>
        </sino-form-item>
        <sino-form-item label="机构名称：" class="h25" prop="orgName">
          <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="roleInstAddForm.orgName" :chooseId.sync="roleInstAddForm.orgId" :token="token" :clear="true" :url="orgSelUrl" :data="orgData" :linkage="true"></sino-select>
        </sino-form-item>
        <sino-form-item label="角色名称：" class="h25" prop="roleName">
          <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="roleInstAddForm.roleName" :chooseId.sync="roleInstAddForm.roleId" :token="token" :clear="true" :url="roleSelUrl" :data="roleData" :linkage="true"></sino-select>
        </sino-form-item>
        <sino-form-item label=" " class="h25" v-if="alertTitle === '新增角色实例'">
          <sino-checkbox v-model="checked">保存后继续添加</sino-checkbox>
        </sino-form-item>
        <sino-form-item class="h25">
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm('roleInstAddForm')">{{leadsbtn}}</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="查看产品基本信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>用户名称</h6><span v-text="seeForm.userName"></span>
          </li>
          <li>
            <h6>角色名称</h6><span v-text="seeForm.roleName"></span>
          </li>
          <li>
            <h6>机构名称</h6><span v-text="seeForm.orgName"></span>
          </li>
          <li>
            <h6>公司名称</h6><span v-text="seeForm.corpName"></span>
          </li>
          <li>
            <h6>状态</h6><span v-text="seeForm.isEffectName"></span>
          </li>
          <li>
            <h6>操作人</h6><span v-text="seeForm.operUserName"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="seeForm.creUserName"></span>
          </li>
          <li>
            <h6>操作时间</h6><span>{{seeForm.operTime | date}}</span>
          </li>
          <li class="li-last">
            <h6>创建时间</h6><span>{{ seeForm.creTime | date }}</span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer see-item-sure">
        <sino-button type="primary"  @click="seeItem = false">确 定</sino-button>
        <span class="prodOper" @click="moreProdOperFun" v-if="false">查看产品操作记录</span>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import Cookies from 'js-cookie';
  import api from '../../../../api/index';
  let checkedArr = '';
  export default {
    components: {},
    data () {
      return {
        userData: {id: null},
        orgData: {id: null},
        roleData: {id: null},
        corpSelUrl: this.apiPath.author.findCorpSelectBoxInfo,
        userSelUrl: this.apiPath.author.findUserSelectBoxInfo,
        orgSelUrl: this.apiPath.author.findOrgSelectBoxInfo,
        roleSelUrl: this.apiPath.author.findRoleSelectBoxInfo,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        token: Cookies.get("Token"),
        roleSearchForm: {
          userName: '',
          roleName: '',
          orgName: '',
          selectType: 4
        },
        screeWidth: document.body.clientWidth,
        trackStatus: [],
        disabledArray: [],
        isA: true,
        checked: false,
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
        roleInstAdd: false,
        roleInstAddForm: {
          corpName: '',
          corpId: '',
          userName: '',
          userId: '',
          roleName: '',
          roleId: '',
          orgName: '',
          orgId: ''
        },
        // 校验
        roleInstAddRules: {
          corpName: [
            {required: true, message: '公司名称为必填项', trigger: 'change'}
          ],
          userName: [
            {required: true, message: '用户名称为必填项', trigger: 'change'}
          ],
          roleName: [
            {required: true, message: '角色名称为必填项', trigger: 'change'}
          ],
          orgName: [
            {required: true, message: '机构名称为必填项', trigger: 'change'}
          ]
        },
        seeForm: {},
        leadsAdd: false, // 添加弹层
        seeItem: false, // 控制查看弹层的显示
        moreProdOperFlag: false
      };
    },
    created () {
      api.post(this.dictSelUrl, {code: 'SCREEN_DIMENSION'}).then(res => {
        this.trackStatus = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      let that = this;
      window.onresize = () => {
        that.screeWidth = document.body.clientWidth;
      };
      this.validator.addEnterEvent(this.searchBtnFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    destroyed () {
      window.onresize = null;
    },
    watch: {
      roleSearchForm: {
        handler: function (val) {
          if (val.userName) {
            if (this.disabledArray.indexOf(1) === -1) {
              this.disabledArray.push(1);
              if (this.roleSearchForm.selectType === 1) {
                this.roleSearchForm.selectType = "";
              }
            }
          } else {
            if (this.disabledArray.indexOf(1) !== -1) {
              this.disabledArray.splice(this.disabledArray.indexOf(1), 1);
            }
          }
          if (val.roleName) {
            if (this.disabledArray.indexOf(2) === -1) {
              this.disabledArray.push(2);
              if (this.roleSearchForm.selectType === 2) {
                this.roleSearchForm.selectType = "";
              }
            }
          } else {
            if (this.disabledArray.indexOf(2) !== -1) {
              this.disabledArray.splice(this.disabledArray.indexOf(2), 1);
            }
          }
          if (val.orgName) {
            if (this.disabledArray.indexOf(3) === -1) {
              this.disabledArray.push(3);
              if (this.roleSearchForm.selectType === 3) {
                this.roleSearchForm.selectType = "";
              }
            }
          } else {
            if (this.disabledArray.indexOf(3) !== -1) {
              this.disabledArray.splice(this.disabledArray.indexOf(3), 1);
            }
          }
        },
        deep: true
      }
    },
    methods: {
      // 公司名称
      changeFun () {
        this.userData.id = this.roleInstAddForm.corpId;
        this.orgData.id = this.roleInstAddForm.corpId;
        this.roleData.id = this.roleInstAddForm.corpId;
      },
      // tab 选项卡点击回调事件
      changeTabFun (order) {
        if (order === 'second') {
          this.$router.push({path: '/funAccredit'});
        } else if (order === 'third') {
          this.$router.push({path: '/dataJurisdiction'});
        }
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        checkedArr = selectTion;
      },
      resetForm: function () { // 修改对话框打开回调
        this.$refs.roleInstAddForm.resetFields();
        this.checked = false;
      },
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: 1,
          pageSize: this.pageSize,
          data: {
            userName: '',
            roleName: '',
            orgName: '',
            selectType: ''
          }
        };
        api.post(this.apiPath.author.findUserRolePage, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      searchBtnFun () {
        this.pageNum = 1;
        this.pageSize = 10;
        this.searchFun();
      },
      // 查询
      searchFun () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: this.roleSearchForm
        };
        api.post(this.apiPath.author.findUserRolePage, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
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
        this.roleInstAdd = true;
        this.alertTitle = '新增角色实例';
        this.leadsbtn = '确 定';
      },
      // 查看
      seeFun: function (data) {
        this.seeItem = true;
        api.post(this.apiPath.author.findUserRoleInfoById, { userRoleId: data.userRoleId }).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改
      modifyFun: function (data) {
        this.roleInstAdd = true;
        this.alertTitle = '修改角色实例';
        this.leadsbtn = '修 改';
        api.post(this.apiPath.author.findUserRoleInfoById, {userRoleId: data.userRoleId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.roleInstAddForm = JSON.parse(JSON.stringify(res.data));
            let that = this;
            setTimeout(function () {
              that.roleInstAddForm.userName  = res.data.userName;
              that.roleInstAddForm.userId = res.data.userId;
              that.roleInstAddForm.roleName = res.data.roleName;
              that.roleInstAddForm.roleId = res.data.roleId;
              that.roleInstAddForm.orgName = res.data.orgName;
              that.roleInstAddForm.orgId = res.data.orgId;
            }, 50);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 删除
      deleteFun: function (data) {
        this.$confirm('您确定要删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          var obj = {
            userRoleId: data.userRoleId,
            isEffect: 0
          };
          api.post(this.apiPath.author.updateUserRoleIsEffectById, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      // 新增确定
      submitForm () {
        this.$refs.roleInstAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增角色实例') {
              let obj = {
                userId: this.roleInstAddForm.userId,
                roleId: this.roleInstAddForm.roleId,
                orgId: this.roleInstAddForm.orgId,
                corpId: this.roleInstAddForm.corpId
              };
              api.post(this.apiPath.author.createBaseUserRoleInfo, obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  let _this = this;
                  this.$message({message: '新增成功！',
                    type: 'success',
                    onClose: function () {
                      if (_this.checked) {
                        _this.$refs.roleInstAddForm.resetFields();
                      } else {
                        _this.roleInstAdd = false;
                        _this.checked = false;
                      }
                    }
                  });
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              let obj = {
                userId: this.roleInstAddForm.userId,
                roleId: this.roleInstAddForm.roleId,
                orgId: this.roleInstAddForm.orgId,
                corpId: this.roleInstAddForm.corpId,
                userRoleId: this.roleInstAddForm.userRoleId
              };
              api.post(this.apiPath.author.updateUserRoleById, this.roleInstAddForm).then(res => {
                this.roleInstAdd = false;
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
