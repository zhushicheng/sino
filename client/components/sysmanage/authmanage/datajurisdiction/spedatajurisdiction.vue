<template>
  <!--角色实例-->
  <div class="leads usermanage">
    <sino-con>
      <sino-title type="levelOne" title="特殊配置"></sino-title>
      <sino-form :model="speSearchForm" ref="ruleForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">角色实例：</span>
              <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                           :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="speSearchForm.userRoleName" :chooseId.sync="speSearchForm.userRoleId" :clear="true" :url="roleInstanceUrl" class="fl" :token="token"></sino-select>
            </li>
            <li class="search-inner-one">
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
          <sino-table-column prop="userRoleName" label="角色实例"></sino-table-column>
          <sino-table-column prop="typeName" label="维度"></sino-table-column>
          <sino-table-column label="维度值" class="dimension">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span v-for="(item,index) in scope.row.queryRangeList" class="table-for-span" :class="{'spe-table-for-span': item.speFlag === 1}">{{item.queryName}}<i v-if="(index+1) !== scope.row.queryRangeList.length">，</i></span>
              </template>
            </template>
          </sino-table-column>
          <sino-table-column label="操作" align="center" width="100">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
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
    <sino-dialog :visible.sync="roleInstAdd" size="large" :top="'10%'" class="dialog-height special-dialog no-minheight donot-need-scroll" @close ="resetForm('roleInstAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="roleInstAddForm" :rules="roleInstAddRules" ref="roleInstAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="角色实例：" class="h25" prop="userRoleName">
          <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"   :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="roleInstAddForm.userRoleName" :chooseId.sync="roleInstAddForm.userRoleId" :clear="true" :url="roleInstanceUrl" class="fl" :token="token" :disabled="alertTitle === '修改特殊配置'"></sino-select>
        </sino-form-item>
        <sino-form-item label="维度：" class="h25" prop="queryRangeTypeName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                       :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="roleInstAddForm.queryRangeTypeName" :chooseId.sync="roleInstAddForm.queryRangeType" :token="token" :clear="true" :url="dictSelUrl" :data="{code:'QUERY_RANGE_TYPE'}" @change="changeFun" :disabled="alertTitle === '修改特殊配置'"></sino-select>
        </sino-form-item>
        <sino-form-item label="维度值：" class="h25" prop="rangeTypeValuesName">
          <sino-select :filterable="true" :multiselect="true" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="roleInstAddForm.rangeTypeValuesName" :chooseId.sync="roleInstAddForm.rangeTypeValues" :token="token" :clear="true" :url="dimensionalityUrl" :data="dimensionalityData" :linkage="true"></sino-select>
        </sino-form-item>
        <sino-form-item>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm('roleInstAddForm')">{{leadsbtn}}</sino-button>
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
        roleInstanceUrl: this.apiPath.author.findUserRoleSpeSelectBoxInfo,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        dimensionalityUrl: '',
        dimensionalityData: null,
        token: Cookies.get("Token"),
        speSearchForm: {
          userRoleName: '',
          userRoleId: ''
        },
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
          userRoleName: '',
          userRoleId: '',
          queryRangeTypeName: '',
          queryRangeType: '',
          rangeTypeValuesName: [],
          rangeTypeValues: []
        },
        // 校验
        roleInstAddRules: {
          userRoleName: [
            {required: true, message: '角色实例为必填项', trigger: 'change'}
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
    },
    mounted () {
      this.validator.addEnterEvent(this.searchBtnFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 维度值更新后的回调
      changeObj () {
        if (this.dimensionalityData === null) {
          this.dimensionalityData = {};
        } else {
          this.dimensionalityData = null;
        }
      },
      changeFun () {
        if (this.roleInstAddForm.queryRangeTypeName) {
          if (this.roleInstAddForm.queryRangeType === 1) {
            this.dimensionalityUrl = this.apiPath.author.findOrgSelectBoxInfo;
            this.changeObj();
          } else if (this.roleInstAddForm.queryRangeType === 2) {
            this.dimensionalityUrl = this.apiPath.hrsc.coninfoSelectBox;
            this.changeObj();
          } else if (this.roleInstAddForm.queryRangeType === 3) {
            this.dimensionalityUrl = this.apiPath.hrsc.findCustSelectInfo;
            this.changeObj();
          }
        } else {
          this.dimensionalityUrl = '';
          this.changeObj();
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
        this.$refs.roleInstAddForm.resetFields();
      },
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: 1,
          pageSize: this.pageSize,
          data: {
            userRoleName: '',
            userRoleId: ''
          }
        };
        api.post(this.apiPath.author.findSpeDataRangePage, obj).then(res => {
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
        this.searchFun();
      },
      // 查询
      searchFun () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: this.speSearchForm
        };
        api.post(this.apiPath.author.findSpeDataRangePage, obj).then(res => {
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
        this.alertTitle = '新增特殊配置';
        this.leadsbtn = '确 定';
        this.$refs.roleInstAddForm.resetFields();
      },
      // 修改
      modifyFun: function (data) {
        this.roleInstAdd = true;
        this.alertTitle = '修改特殊配置';
        this.leadsbtn = '修 改';
        api.post(this.apiPath.author.findSpeDataRangePage, {pageNum: 1, pageSize: 10, data: { userRoleId: data.userRoleId, queryRangeType: data.queryRangeType }}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.roleInstAddForm = res.data.list[0];
            this.roleInstAddForm.queryRangeTypeName = res.data.list[0].typeName;
            let that = this;
            setTimeout(function () {
              that.roleInstAddForm.rangeTypeValuesName = [];
              that.roleInstAddForm.rangeTypeValues = [];
              for (var i = 0; i < res.data.list[0].queryRangeList.length; i++) {
                that.roleInstAddForm.rangeTypeValuesName.push(res.data.list[0].queryRangeList[i].queryName);
                that.roleInstAddForm.rangeTypeValues.push(res.data.list[0].queryRangeList[i].queryId);
              }
            });
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
            queryRangeType: data.queryRangeType
          };
          api.post(this.apiPath.author.deleteSpeDataRange, obj).then(res => {
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
            api.post(this.apiPath.author.addSpeDataRange, this.roleInstAddForm).then(res => {
              this.roleInstAdd = false;
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.$message({message: this.alertTitle === '新增特殊配置' ? '新增成功！' : '修改成功！', type: 'success'});
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
