<template>
  <!--地方标准管理-->
  <div>
    <div class="leads usermanage" v-if="!routerView">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">地方标准组合</div>
          <div class="sino-tabs-item" @click="prodScheFun">地方标准基本信息</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="localStanForm" ref="localStanForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="地方标准组合名称：" class="search-inner-item" prop="pkgName">
                <sino-input class="fl" type="text"
                            v-model="localStanForm.pkgName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="地方标准类别：" class="search-inner-item" prop="localStanTypeDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :chooseName.sync="localStanForm.localStanTypeDict"
                             :chooseId.sync="localStanForm.localStanType"
                             :data="{code: 'LOCAL_STAN_CATE'}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>

            <!--<li class="search-inner-one">
              <sino-form-item label="地方标准类别：" class="search-inner-item" prop="localStanType">
                <sino-radio v-for="item in localStanList"
                            v-model.number="localStanForm.localStanType"
                            :label="item.id">{{item.title}}</sino-radio>
              </sino-form-item>
            </li>-->
            <li>
              <sino-form-item label="地区：" class="search-inner-item" prop="areaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaUrl"
                             :chooseName.sync="localStanForm.areaName"
                             :chooseId.sync="localStanForm.areaId"
                             :data="{data: {areaTypes:[4,5]}}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="户籍类型：" class="search-inner-item" prop="householdAreaListDict">
                <sino-select :filterable="false"
                             :multiselect="true"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :chooseName.sync="localStanForm.householdAreaListDict"
                             :chooseId.sync="localStanForm.householdAreaList"
                             :data="{code: 'HOUSEHOLD_AREA'}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="户口性质：" class="search-inner-item" prop="householdTypeListDict">
                <sino-select :filterable="false"
                             :multiselect="true"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :chooseName.sync="localStanForm.householdTypeListDict"
                             :chooseId.sync="localStanForm.householdTypeList"
                             :data="{code: 'HOUSEHOLD_TYPE'}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="是否补缴组合：" class="search-inner-item" prop="isAddiPkgDict">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :chooseName.sync="localStanForm.isAddiPkgDict"
                             :chooseId.sync="localStanForm.isAddiPkg"
                             :data="{code: 'YES_NO'}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="状态：" class="search-inner-item" prop="pkgStateDict">
                <!--<sino-radio v-for="item in pkgStateList"
                            v-model="localStanForm.pkgState"
                            :label="item.id">{{item.title}}</sino-radio>-->
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :chooseName.sync="localStanForm.pkgStateDict"
                             :chooseId.sync="localStanForm.pkgState"
                             :data="{code: 'LOCAL_STAN_STATE'}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增</sino-button>
            <sino-button type="icon-text" @click="confPkg"><i class="iconfont sino-add"></i>配置组合</sino-button>
            <sino-button type="icon-text" @click="startFun"><i class="iconfont sino-duihao"></i>启用</sino-button>
            <sino-button type="icon-text" @click="stopFun"><i class="iconfont sino-invalid"></i>停用</sino-button>
            <sino-button type="icon-text" @click="downLoadFun"><i class="iconfont sino-export"></i>导出</sino-button>
          </div>
        </div>
        <sino-table :data="localStanData" border max-height="416" stripe v-on:radioSelect="selectCallBack" v-on:viewAll="viewAll">
          <sino-table-column type="radioSelection" min-width="40" prop="pkgId"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60"></sino-table-column>
          <sino-table-column prop="areaName" label="地区" min-width="180"></sino-table-column>
          <sino-table-column prop="pkgName" label="地方标准组合名称" min-width="140"></sino-table-column>
          <sino-table-column prop="localStanTypeDict" label="地方标准类别" min-width="105"></sino-table-column>
          <sino-table-column prop="householdArea" label="户籍类型" min-width="105"></sino-table-column>
          <sino-table-column prop="householdType" label="户口性质" min-width="150"></sino-table-column>
          <sino-table-column prop="pkgStateDict" label="状态" min-width="105"></sino-table-column>
          <sino-table-column prop="isAddiPkgDict" label="是否补缴组合" min-width="105"></sino-table-column>
          <sino-table-column prop="isHaveAddiPkgDict" label="有无补缴组合" min-width="120"></sino-table-column>
          <sino-table-column prop="addiPkgName" label="关联组合" min-width="105"></sino-table-column>
          <sino-table-column prop="creUserName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="modifyFun(scope.row)">修改</span>
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
    <!--新增/修改-->
    <sino-dialog :visible.sync="localStanAddFlag" size="large" :top="'10%'" class="dialog-height"  v-on:close="resetForm('localStanAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="localStanAddForm" :rules="localStanAddRules" ref="localStanAddForm" class="demo-sendAddrAddForm">
        <sino-form-item prop="pkgName" label="地方标准组合名称：">
          <sino-input type="text" v-model="localStanAddForm.pkgName" :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item label="地区：" prop="areaName">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="areaUrl"
                       :chooseName.sync="localStanAddForm.areaName"
                       :chooseId.sync="localStanAddForm.areaId"
                       :data="{data: {areaTypes:[4,5]}}"
                       :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item label="地方标准类别：" prop="localStanType">
          <sino-radio v-for="(item, index) in localStanList" :key="index"
                      v-model="localStanAddForm.localStanType"
                      :label="item.id">{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item label="组合类别：" prop="pkgTypeDict">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="dictSelUrl"
                       :data="{code: 'LOCAL_STAN_PKG_TYPE'}"
                       :chooseName.sync="localStanAddForm.pkgTypeDict"
                       :chooseId.sync="localStanAddForm.pkgType"
                       :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item label="户籍类型：" prop="householdAreaListDict" v-if="localStanAddForm.localStanType === 1">
          <sino-select :filterable="false"
                       :multiselect="true"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="dictSelUrl"
                       :data="{code: 'HOUSEHOLD_AREA'}"
                       :chooseName.sync="localStanAddForm.householdAreaListDict"
                       :chooseId.sync="localStanAddForm.householdAreaList"
                       :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item label="户口性质：" prop="householdTypeListDict" v-if="localStanAddForm.localStanType === 1">
          <sino-select :filterable="false"
                       :multiselect="true"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="dictSelUrl"
                       :data="{code: 'HOUSEHOLD_TYPE'}"
                       :chooseName.sync="localStanAddForm.householdTypeListDict"
                       :chooseId.sync="localStanAddForm.householdTypeList"
                       :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item label="是否补缴组合：" prop="isAddiPkg">
          <sino-radio v-for="(item, index) in isAddiPkgList" :key="index"
                      v-model="localStanAddForm.isAddiPkg"
                      :disabled="!isLocalStanAdd"
                      :label="item.id">{{item.title}}</sino-radio>
        </sino-form-item>
        <!--<sino-form-item label="缴费人员类别：" prop="payFeePerTypeDict">
          <sino-select :tipText="'请选择'"
                       :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="dictSelUrl"
                       :data="{code: 'PAY_FEE_PER_CATE'}"
                       :chooseName.sync="localStanAddForm.payFeePerTypeDict"
                       :chooseId.sync="localStanAddForm.payFeePerType"
                       :clear="true"></sino-select>
        </sino-form-item>-->
        <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
          <sino-input type="textarea" v-model="localStanAddForm.remark" :disabled="false"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
         <sino-button type="primary" @click="submitForm('localStanAddForm')">{{btnText}}</sino-button>
      </span>
    </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  let checkedArr = [];
  export default {
    components: {},
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
//        areaUrl: this.apiPath.hrsc.findAreaListGroup,
        areaUrl: this.apiPath.hrsc.findAreaList,
        btnText: '',
        routerView: false,
        localStanForm: {
          pkgName: '',
          localStanType: '',
          localStanTypeDict: '',
          areaId: '',
          areaName: '',
          householdAreaList: [],
          householdAreaListDict: [],
          householdTypeList: [],
          householdTypeListDict: [],
          isAddiPkg: '',
          isAddiPkgDict: '',
          pkgState: '',
          pkgStateDict: ''
        },
        localStanData: null,
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
        alertTitle: '', // 弹层title
        localStanAddFlag: false,
        isLocalStanAdd: true,
        localStanAddForm: {
          pkgName: '',
          areaId: '',
          areaName: '',
          localStanType: '',
          pkgType: '',
          pkgTypeDict: '',
          householdAreaList: [],
          householdAreaListDict: [],
          householdTypeList: [],
          householdTypeListDict: [],
          isAddiPkg: '',
          payFeePerType: '',
          payFeePerTypeDict: '',
          remark: ''
        },
        // 校验
        localStanAddRules: {
          pkgName: [
            {required: true, message: '请输入地方标准组合名称', trigger: 'change'},
            {max: 100, message: '最多输入100个字符'}
          ],
          areaName: [
            {required: true, message: '请选择地区', trigger: 'change'}
          ],
          localStanType: [
            {required: true, type: 'number', message: '请选择地方标准类别', trigger: 'change'}
          ],
          householdAreaListDict: [
            {type: 'array', required: true, message: '请选择户籍', trigger: 'change'}
          ],
          householdTypeListDict: [
            {type: 'array', required: true, message: '请选择户口性质', trigger: 'change'}
          ],
          isAddiPkg: [
            {required: true, type: 'number', message: '请选择是否补缴组合', trigger: 'change'}
          ]
        },
        localStanList: [],
        isAddiPkgList: []
      };
    },
    mounted () {
      checkedArr = [];
      api.post(this.dictSelUrl, {code: 'LOCAL_STAN_CATE'}).then(res => {
        this.localStanList = res.data.list;
        this.localStanList.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.localStanForm.localStanType = val.id;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      // 是否补缴组合
      api.post(this.dictSelUrl, {code: 'YES_NO'}).then(res => {
        this.isAddiPkgList = res.data.list;
        this.isAddiPkgList.forEach(function (val, index, arr) {
          if (val.isDefault) {
            this.localStanForm.isAddiPkg = val.id;
          }
        }, this);
      }).catch(err => {
        console.log(err);
      });
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/localStanPkg") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        this.$router.push({path: '/localInfo'});
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        checkedArr = selectTion;
      },
      resetForm: function () { // 关闭弹层
        this.$refs.localStanAddForm.resetFields();
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.localStanForm
        };
        api.post(this.apiPath.hrsc.listLocalStanPkgs, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.localStanData = res.data.list;
            this.total = res.data.total;
            checkedArr = [];
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 新增
      addFun: function () {
        if (checkedArr.length === 0) {
          this.localStanAddForm.isAddiPkg = 0;
          this.localStanAddFlag = true;
          this.isLocalStanAdd = true;
          this.alertTitle = '新增地方标准组合';
          this.btnText = '确 定';
        }
        if (checkedArr.length > 0) {
          if (checkedArr[0].isAddiPkg === 1) {
            this.$alert('此组合是补缴组合，无法再次添加补缴组合!', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              lockScroll: true
            });
            return;
          } else {
            this.localStanAddForm.isAddiPkg = 1;
            this.localStanAddFlag = true;
            this.isLocalStanAdd = true;
            this.alertTitle = '新增地方标准组合';
            this.btnText = '确 定';
          }
        }
      },
      // 配置组合
      confPkg () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.routerView = true;
        this.$router.push({path: '/localStanPkg/confPkg', name: '配置组合', params: {'pkgId': checkedArr[0].pkgId}});
      },
      // 启用
      startFun: function () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _obj = {
          pkgId: checkedArr[0].pkgId,
          pkgState: 1
        };
        api.post(this.apiPath.hrsc.updateLocalStanPkg, _obj).then(res => {
          if (res.code === 'CPYY-00001') {
            checkedArr = [];
            this.searchFun();
            this.$message({message: '启用成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 停用
      stopFun: function () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _obj = {
          pkgId: checkedArr[0].pkgId,
          pkgState: 0
        };
        api.post(this.apiPath.hrsc.updateLocalStanPkg, _obj).then(res => {
          if (res.code === 'CPYY-00001') {
            checkedArr = [];
            this.searchFun();
            this.$message({message: '停用成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改
      modifyFun: function (_data) {
        api.post(this.apiPath.hrsc.getLocalStanPkg, {pkgId: _data.pkgId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.localStanAddFlag = true;
            this.isLocalStanAdd = false;
            this.alertTitle = '修改地方标准组合';
            this.btnText = '修 改';
            this.localStanAddForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 封装方法
      saveLocal () {
        if (checkedArr.length !== 0) {
          this.localStanAddForm.pkgId = checkedArr[0].pkgId;
        }
        api.post(this.apiPath.hrsc.saveLocalStanPkg, this.localStanAddForm).then(res => {
          if (res.code === 'CPYY-00001') {
            this.localStanAddFlag = false;
            checkedArr = [];
            this.searchFun();
            this.$message({message: '新增成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      updateLocal () {
        delete this.localStanAddForm.householdArea;
        delete this.localStanAddForm.householdType;
        api.post(this.apiPath.hrsc.updateLocalStanPkg, this.localStanAddForm).then(res => {
          if (res.code === 'CPYY-00001') {
            this.localStanAddFlag = false;
            checkedArr = [];
            this.searchFun();
            this.$message({message: '修改成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增地方标准组合') {
              this.saveLocal();
            } else {
              this.updateLocal();
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      // 导出
      downLoadFun () {
        api.post(this.apiPath.hrsc.getLocalStanPkgAndLocalStansExcel, this.localStanForm).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      resetFun () {
        this.$refs.localStanForm.resetFields();
        this.localStanAddForm.householdAreaList = [];
        this.localStanAddForm.householdAreaListDict = [];
        this.localStanAddForm.householdTypeList = [];
        this.localStanAddForm.householdTypeListDict = [];
      }
    },
    created () {
      this.ruoteJudge();
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/localStanPkg") {
            this.routerView = false;
          }
        },
        deep: true
      }
    }
  };
</script>
