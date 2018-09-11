<template>
  <!--数据权限-->
  <div>
    <div class="leads usermanage" v-if="!routerView">
      <div class="prod-tab sino-tabs sino-tabs-card tab-group">
        <div class="sino-tabs-header">
          <div class="sino-tabs-nav">
            <div class="sino-tabs-item" @click="changeTabFun('first')">角色实例</div>
            <div class="sino-tabs-item" @click="changeTabFun('second')">功能授权</div>
            <div class="sino-tabs-item is-active">数据权限</div>
          </div>
        </div>
      </div>
      <sino-con>
        <sino-form :model="dataSearchForm" ref="ruleForm" class="serch-form leads-serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <span class="search-inner-name">机构名称：</span>
                <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                             :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="dataSearchForm.orgName" :chooseId.sync="dataSearchForm.orgId" :token="token" :clear="true" :url="orgSelUrl"></sino-select>
              </li>
              <li class="search-inner-one">
                <span class="search-inner-name">角色名称：</span>
                <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false"
                             :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="dataSearchForm.roleName" :chooseId.sync="dataSearchForm.roleId" :token="token" :clear="true" :url="roleSelUrl"></sino-select>
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
              <sino-button type="icon-text" @click="dataConfigFun"><i class="iconfont sino-setting"></i>数据权限配置</sino-button>
              <sino-button type="icon-text" @click="speDataConfigFun"><i class="iconfont sino-setting"></i>特殊配置</sino-button>
            </div>
          </div>
          <sino-table :data="tableData" border max-height="416" stripe v-on:viewAll="viewAll">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="orgName" label="机构名称" width="200"></sino-table-column>
            <sino-table-column prop="roleName" label="角色名称" width="100"></sino-table-column>
            <sino-table-column prop="typeName" label="维度" width="100"></sino-table-column>
            <sino-table-column label="维度值" class="dimension">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span v-for="(item,index) in scope.row.queryRangeList" class="table-for-span">{{item.queryName}}<i v-if="(index+1) !== scope.row.queryRangeList.length">，</i></span>
                </template>
              </template>
            </sino-table-column>
            <sino-table-column label="操作" align="center" width="60">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="deleteFun(scope.row)">删除</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
        </div>
      </div>
      <!--新增/修改-->
      <sino-dialog :visible.sync="accessDataAdd" size="large" :top="'10%'" class="dialog-height special-dialog no-minheight donot-need-scroll" @close ="resetForm('accessDataAddForm')">
        <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
        <sino-form :model="accessDataAddForm" :rules="accessDataAddRules" ref="accessDataAddForm" class="demo-sendAddrAddForm">
          <sino-form-item label="机构名称：" class="h25" prop="orgName">
            <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="accessDataAddForm.orgName" :chooseId.sync="accessDataAddForm.orgId" :token="token" :clear="true" :url="orgSelUrl"></sino-select>
          </sino-form-item>
          <sino-form-item label="角色名称：" class="h25" prop="roleName">
            <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="accessDataAddForm.roleName" :chooseId.sync="accessDataAddForm.roleId" :token="token" :clear="true" :url="roleSelUrl"></sino-select>
          </sino-form-item>
          <sino-form-item label="维度：" class="h25" prop="queryRangeTypeName">
            <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="accessDataAddForm.queryRangeTypeName" :chooseId.sync="accessDataAddForm.queryRangeType" :token="token" :clear="true" :url="dictSelUrl" :data="{code:'QUERY_RANGE_TYPE'}" @change="changeFun"></sino-select>
          </sino-form-item>
          <sino-form-item label="维度值：" class="h25" prop="rangeTypeValuesName">
            <sino-select :filterable="true" :multiselect="true" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="accessDataAddForm.rangeTypeValuesName" :chooseId.sync="accessDataAddForm.rangeTypeValues" :token="token" :clear="true" :url="dimensionalityUrl" :data="dimensionalityData" :linkage="true"></sino-select>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm('accessDataAddForm')">{{leadsbtn}}</sino-button>
      </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
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
        userSelUrl: this.apiPath.author.findUserSelectBoxInfo,
        orgSelUrl: this.apiPath.author.findOrgSelectBoxInfo,
        roleSelUrl: this.apiPath.author.findRoleSelectBoxInfo,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        dimensionalityUrl: '',
        dimensionalityData: null,
        routerView: false,
        token: Cookies.get("Token"),
        dataSearchForm: {
          orgName: '',
          orgId: '',
          roleName: '',
          roleId: ''
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
        accessDataAdd: false,
        accessDataAddForm: {
          orgName: '',
          orgId: '',
          roleName: '',
          roleId: '',
          queryRangeTypeName: '',
          queryRangeType: '',
          rangeTypeValues: [],
          rangeTypeValuesName: []
        },
        // 校验
        accessDataAddRules: {
          orgName: [
            {required: true, message: '机构名称为必填项', trigger: 'change'}
          ],
          roleName: [
            {required: true, message: '角色名称为必填项', trigger: 'change'}
          ],
          queryRangeTypeName: [
            {required: true, message: '维度为必填项', trigger: 'change'}
          ],
          rangeTypeValuesName: [
            {required: true, message: '维度值为必填项', trigger: 'change', type: 'array'}
          ]
        },
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
      this.ruoteJudge();
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
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/dataJurisdiction") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    methods: {
      ruoteJudge () { // 解决刷新页面后退的bug
        if (this.$route.path !== "/dataJurisdiction") {
          this.routerView = true;
        }
      },
      // 维度值更新后的回调
      changeObj () {
        if (this.dimensionalityData === null) {
          this.dimensionalityData = {};
        } else {
          this.dimensionalityData = null;
        }
      },
      changeFun () {
        if (this.accessDataAddForm.queryRangeTypeName) {
          if (this.accessDataAddForm.queryRangeType === 1) {
            this.dimensionalityUrl = this.apiPath.author.findOrgSelectBoxInfo;
            this.changeObj();
          } else if (this.accessDataAddForm.queryRangeType === 2) {
            this.dimensionalityUrl = this.apiPath.hrsc.coninfoSelectBox;
            this.changeObj();
          } else if (this.accessDataAddForm.queryRangeType === 3) {
            this.dimensionalityUrl = this.apiPath.hrsc.findCustSelectInfo;
            this.changeObj();
          }
        } else {
          this.dimensionalityUrl = '';
          this.dimensionalityData = null;
        }
      },
      // tab 选项卡点击回调事件
      changeTabFun (order) {
        if (order === 'second') {
          this.$router.push({path: '/funAccredit'});
        } else if (order === 'first') {
          this.$router.push({path: '/roleInstance'});
        }
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        checkedArr = selectTion;
      },
      resetForm: function () { // 修改对话框打开回调
        this.$refs.accessDataAddForm.resetFields();
      },
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: 1,
          pageSize: this.pageSize,
          data: {
            orgName: '',
            orgId: '',
            roleName: '',
            roleId: ''
          }
        };
        api.post(this.apiPath.author.findDataRangePage, obj).then(res => {
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
          data: this.dataSearchForm
        };
        api.post(this.apiPath.author.findDataRangePage, obj).then(res => {
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
      // 数据权限配置
      dataConfigFun: function () {
        this.accessDataAdd = true;
        this.alertTitle = '数据权限配置';
        this.leadsbtn = '确 定';
        this.resetForm();
      },
      // 特殊数据权限配置
      speDataConfigFun () {
        this.routerView = true;
        this.$router.push({path: '/dataJurisdiction/speDataJurisdiction'});
      },
      // 删除
      deleteFun: function (data) {
        this.$confirm('您确定要删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          var obj = {
            orgId: data.orgId,
            roleId: data.roleId,
            queryRangeType: data.queryRangeType
          };
          api.post(this.apiPath.author.deleteDataRangeByOrgIdAndRoleId, obj).then(res => {
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
        this.$refs.accessDataAddForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.author.addDataRange, this.accessDataAddForm).then(res => {
              this.accessDataAdd = false;
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.$message({message: '新增成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      }
    }
  };
</script>
