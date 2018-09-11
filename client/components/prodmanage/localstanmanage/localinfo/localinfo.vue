<template>
  <!--地方基本信息-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <div class="prod-tab sino-tabs sino-tabs-card tab-group">
        <div class="sino-tabs-header">
          <div class="sino-tabs-nav">
            <div class="sino-tabs-item" @click="prodScheFun">地方标准组合</div>
            <div class="sino-tabs-item is-active">地方标准基本信息</div>
          </div>
        </div>
      </div>
      <sino-con>
        <sino-form :model="localInfoForm" ref="localInfoForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="地方标准名称：" class="search-inner-item" prop="stanName">
                  <sino-input class="fl" type="text"
                              v-model="localInfoForm.stanName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="地方标准类别：" class="search-inner-item" prop="stanTypeDict">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="dictSelUrl"
                                 :data="{code:'LOCAL_STAN_CATE'}"
                                 :chooseName.sync="localInfoForm.stanTypeDict"
                                 :chooseId.sync="localInfoForm.stanType"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="地方标准项：" class="search-inner-item" prop="prodName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="prodUrl"
                                 :data="{}"
                                 :chooseName.sync="localInfoForm.prodName"
                                 :chooseId.sync="localInfoForm.prodId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <!--<li>
                <sino-form-item label="状态：" class="search-inner-item" prop="state">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'LOCAL_STAN_STATE'}"
                               :chooseName.sync="localInfoForm.stateName"
                               :chooseId.sync="localInfoForm.state"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>-->
              <li>
                <sino-form-item label="政策发布日期：" class="search-inner-item" prop="begDate">
                  <sino-date-picker
                    v-model="localInfoForm.begDate"
                    type="date"
                    :editable="false"
                    :readonly="false" @change="dataChange"
                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="执行开始日期：" class="search-inner-item" prop="takeEffectDate">
                  <sino-date-picker
                    v-model="localInfoForm.takeEffectDate"
                    type="date"
                    :editable="false"
                    :readonly="false" @change="takeEffectChange"
                    :picker-options="pickerOptions"
                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
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
                               :chooseName.sync="localInfoForm.areaName"
                               :chooseId.sync="localInfoForm.areaId"
                               :data="{data:{areaTypes:[4,5]}}"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('localInfoForm')">重 置</sino-button>
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
              <!--<sino-button type="icon-text" @click="startFun"><i class="iconfont sino-duihao"></i>启用</sino-button>-->
              <!--<sino-button type="icon-text" @click="stopFun"><i class="iconfont sino-invalid"></i>停用</sino-button>-->
              <!--<sino-button type="icon-text" @click="addPay"><i class="iconfont sino-add"></i>新增补缴</sino-button>-->
            </div>
          </div>
          <sino-table :data="localInfoData" border max-height="416" stripe v-on:radioSelect="selectCallBack" v-on:viewAll="viewAll">
            <!--<sino-table-column type="radioSelection" width="40" align="center"></sino-table-column>-->
            <sino-table-column type="index" label="序号" align="center" width="60" fixed></sino-table-column>
            <sino-table-column prop="areaName" label="地区" min-width="180" fixed></sino-table-column>
            <sino-table-column prop="stanName" label="地方标准名称" min-width="180" fixed></sino-table-column>
            <sino-table-column prop="stanTypeDict" label="地方标准类别" min-width="105"></sino-table-column>
            <sino-table-column prop="begDate" label="政策发布日期" min-width="120"></sino-table-column>
            <sino-table-column prop="takeEffectDate" label="执行开始日期" min-width="120"></sino-table-column>
            <sino-table-column prop="entPayProp" label="企业比例（%）" min-width="120"></sino-table-column>
            <sino-table-column prop="perPayProp" label="个人比例（%）" min-width="120"></sino-table-column>
            <sino-table-column prop="entRadixUpperLimit" label="企业基数上限" min-width="120"></sino-table-column>
            <sino-table-column prop="perRadixUpperLimit" label="个人基数上限" min-width="120"></sino-table-column>
            <sino-table-column prop="entRadixLowerLimit" label="企业基数下限" min-width="120"></sino-table-column>
            <sino-table-column prop="perRadixLowerLimit" label="个人基数下限" min-width="120"></sino-table-column>
            <sino-table-column prop="socAvgWage" label="社平"></sino-table-column>
            <sino-table-column label="操作" align="center" width="140" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i">|</i>
                  <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.updateLocalStan === 0">修改</span><i class="table-i" v-if="scope.row.updateLocalStan === 0">|</i>
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
      <!-- 查看 -->
      <sino-dialog :visible.sync="localInfoSeeFlag" size="small" class="local-info-dialog">
        <sino-title slot="title" type="levelOne" title="
查看地方标准基本信息" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="local-info-see">
            <li>
              <h6>地区</h6><span v-text="localInfoSeeList.areaName"></span>
            </li>
            <li>
              <h6>政策发布日期</h6><span v-text="localInfoSeeList.begDate"></span>
            </li>
            <li>
              <h6>执行开始日期</h6><span v-text="localInfoSeeList.takeEffectDate"></span>
            </li>
            <li>
              <h6>社平</h6><span v-text="localInfoSeeList.socAvgWage"></span>
            </li>
            <li>
              <h6>地方标准类型</h6><span v-text="localInfoSeeList.stanTypeDict"></span>
            </li>
            <li>
              <h6>地方标准项</h6><span v-text="localInfoSeeList.prodName"></span>
            </li>
            <li>
              <h6>地方标准名称</h6><span v-text="localInfoSeeList.stanName"></span>
            </li>
            <li>
              <h6>企业比例（%）</h6><span v-text="localInfoSeeList.entPayProp"></span>
            </li>
            <li>
              <h6>个人比例（%）</h6><span v-text="localInfoSeeList.perPayProp"></span>
            </li>
            <li>
              <h6>企业基数上限</h6><span v-text="localInfoSeeList.entRadixUpperLimit"></span>
            </li>
            <li>
              <h6>企业基数下限</h6><span v-text="localInfoSeeList.entRadixLowerLimit"></span>
            </li>
            <li>
              <h6>企业附加（元）</h6><span v-text="localInfoSeeList.entAddiMoney"></span>
            </li>
            <li>
              <h6>个人基数上限</h6><span v-text="localInfoSeeList.perRadixUpperLimit"></span>
            </li>
            <li>
              <h6>个人基数下限</h6><span v-text="localInfoSeeList.perRadixLowerLimit"></span>
            </li>
            <li>
              <h6>个人附加（元）</h6><span v-text="localInfoSeeList.perAddiMoney"></span>
            </li>
            <li>
              <h6>企业基数精度</h6><span v-text="localInfoSeeList.entRadixAccuracyDict"></span>
            </li>
            <li>
              <h6>企业基数舍入原则</h6><span v-text="localInfoSeeList.entRadixRouPrinDict"></span>
            </li>
            <li>
              <h6>企业基数奇偶限定</h6><span v-text="localInfoSeeList.entRadixParityDict"></span>
            </li>
            <li>
              <h6>个人基数精度</h6><span v-text="localInfoSeeList.perRadixAccuracyDict"></span>
            </li>
            <li>
              <h6>个人基数舍入原则</h6><span v-text="localInfoSeeList.perRadixRouPrinDict"></span>
            </li>
            <li>
              <h6>个人基数奇偶限定</h6><span v-text="localInfoSeeList.parRadixParityDict"></span>
            </li>
            <li>
              <h6>企业缴纳额精度</h6><span v-text="localInfoSeeList.entPayAccuracyDict"></span>
            </li>
            <li>
              <h6>企业缴纳额舍入原则</h6><span v-text="localInfoSeeList.entPayRouPrinDict"></span>
            </li>
            <li>
              <h6>企业缴纳额奇偶限定</h6><span v-text="localInfoSeeList.entPayParityDict"></span>
            </li>
            <li>
              <h6>个人缴纳额精度</h6><span v-text="localInfoSeeList.perPayAccuracyDict"></span>
            </li>
            <li>
              <h6>个人缴纳额舍入原则</h6><span v-text="localInfoSeeList.perPayRouPrinDict"></span>
            </li>

            <li>
              <h6>个人缴纳额奇偶限定</h6><span v-text="localInfoSeeList.perPayParityDict"></span>
            </li>
            <li>
              <h6>计算公式类型</h6><span v-text="localInfoSeeList.formulaTypeDict"></span>
            </li>
            <li>
              <h6>收费频率单位</h6><span v-text="localInfoSeeList.chargeFreUnitName"></span>
            </li>
            <li>
              <h6>收费频率</h6><span v-text="localInfoSeeList.chargeFre"></span>
            </li>
            <li>
              <h6>计费频率单位</h6><span v-text="localInfoSeeList.chargingFreUnitName"></span>
            </li>
            <li>
              <h6>计费频率</h6><span v-text="localInfoSeeList.chargingFre"></span>
            </li>
            <li v-if="localInfoSeeList.formulaType === 2">
              <h6>总缴纳额精度</h6><span v-text="localInfoSeeList.sumPayAccuracyDict"></span>
            </li>
            <li v-if="localInfoSeeList.formulaType === 2">
              <h6>总缴纳额舍入原则</h6><span v-text="localInfoSeeList.sumPayRouPrinDict"></span>
            </li>
            <li v-if="localInfoSeeList.formulaType === 2">
              <h6>总缴纳额奇偶限定</h6><span v-text="localInfoSeeList.sumPayParityDict"></span>
            </li>
            <li>
              <h6>创建人</h6><span v-text="localInfoSeeList.creUserName"></span>
            </li>
            <li class="li-last">
              <h6>创建时间</h6><span v-text="localInfoSeeList.creTime"></span>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
         <sino-button type="primary" @click="localInfoSeeFlag=false">确 定</sino-button>
      </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>

</template>
<script>
  import api from '../../../../api/index';
  let checkedArr = '';
  export default {
    components: {},
    data () {
      return {
        pickerOptions: {
          disabledDate (time) {
//            return time.getTime() < (Date.now() - 8.64e7) || time.getTime() > (Date.now() + 6 * 8.64e7)
            return Date.now() == 1;
          }
        },
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
//        areaUrl: this.apiPath.hrsc.findAreaListGroup,
        areaUrl: this.apiPath.hrsc.findAreaList,
        prodUrl: this.apiPath.hrsc.findpropayname,
        routerView: false,
        localInfoForm: {
          stanName: '',
          stanType: '',
          stanTypeDict: '',
//          state: '',
//          stateName: '',
          begDate: '',
          takeEffectDate: '',
          areaId: '',
          areaName: '',
          prodId: '',
          prodName: ''
        },
        trackStatus: [],
        localInfoSeeFlag: false,
        localInfoSeeList: {
          areaName: '',
          begDate: '',
          takeEffectDate: '',
          socAvgWage: '',
          stanTypeDict: '',
          prodName: '',
          stanName: '',
          entPayProp: '',
          perPayProp: '',
          entRadixUpperLimit: '',
          entRadixLowerLimit: '',
          entAddiMoney: '',
          perRadixUpperLimit: '',
          perRadixLowerLimit: '',
          perAddiMoney: '',
          entRadixAccuracyDict: '',
          entRadixRouPrinDict: '',
          entRadixParityDict: '',
          perRadixAccuracyDict: '',
          perRadixRouPrinDict: '',
          parRadixParityDict: '',
          entPayAccuracyDict: '',
          entPayRouPrinDict: '',
          entPayParityDict: '',
          perPayAccuracyDict: '',
          perPayRouPrinDict: '',
          perPayParityDict: '',
          formulaTypeDict: '',
          chargeFreUnitName: '',
          chargeFreDict: '',
          chargingFreDict: '',
          chargingFreUnitName: '',
          sumPayAccuracyDict: '',
          sumPayRouPrinDict: '',
          sumPayParityDict: '',
          creUserName: '',
          creTime: ''
        },
        localInfoData: null,
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
        localInfoAddFlag: false,
        pkgStateList: []
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/localInfo") {
            this.routerView = false;
            if (this.$route.query.type === 'addlocal' || this.$route.query.type === 'updatelocal') {
              this.searchFun();
            }
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/localInfo") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        this.$router.push({path: '/localStanPkg'});
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        checkedArr = selectTion;
      },
      resetForm (formName) { // 修改对话框打开回调
        this.$refs[formName].resetFields();
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        var obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.localInfoForm
        };
        api.post(this.apiPath.hrsc.listLocalStans, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.localInfoData = res.data.list;
            this.total = res.data.total;
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
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 新增
      addFun: function () {
        this.routerView = true;
        this.$router.push({path: '/localInfo/addLocalInfo', name: '标准基本信息', params: {'type': 'addLocal'}});
      },
      // 新增补缴
//      addPay () {
//        if (!checkedArr || checkedArr.length < 1) {
//          this.$alert('请选择一条数据在进行操作', '提示信息', {
//            confirmButtonText: '确 定',
//            type: 'warning', // icon图标类型
//            dragFlag: true,
//            lockScroll: true
//          });
//          return;
//        }
//        if (checkedArr[0].state === 1) {
//          this.$alert('该数据为启用状态无法新增补缴', '提示信息', {
//            confirmButtonText: '确 定',
//            type: 'warning', // icon图标类型
//            dragFlag: true,
//            lockScroll: true
//          });
//          return;
//        }
//        this.routerView = true;
//        this.$router.push({path: '/localInfo/addLocalInfo', name: '标准基本信息', params: {'stanId': checkedArr[0].stanId, 'type': 'addPay'}});
//      },
      // 启用
//      startFun: function () {
//        if (!checkedArr || checkedArr.length < 1) {
//          this.$alert('请选择一条数据在进行操作', '提示信息', {
//            confirmButtonText: '确 定',
//            type: 'warning', // icon图标类型
//            dragFlag: true,
//            lockScroll: true
//          });
//          return;
//        }
//        let _data = {
//          stanId: checkedArr[0].stanId,
//          state: 1
//        };
//        api.post(this.apiPath.hrsc.updateLocalStan, _data).then(res => {
//          if (res.code === 'CPYY-00001') {
//            checkedArr = [];
//            this.searchFun();
//            this.$alert('启用成功！', '提示信息', {
//              confirmButtonText: '确 定',
//              type: 'success', // icon图标类型
//              dragFlag: true,
//              customClass: '', // 添加class
//              lockScroll: true
//            });
//          }
//        }).catch(err => {
//          console.log(err);
//        });
//      },
      // 停用
//      stopFun: function () {
//        if (!checkedArr || checkedArr.length < 1) {
//          this.$alert('请选择一条数据在进行操作', '提示信息', {
//            confirmButtonText: '确 定',
//            type: 'warning', // icon图标类型
//            dragFlag: true,
//            lockScroll: true
//          });
//          return;
//        }
//        let _data = {
//          stanId: checkedArr[0].stanId,
//          state: 0
//        };
//        if ((checkedArr[0].relAddiStanName !== '' && checkedArr[0].relAddiStanName !== null) || (checkedArr[0].relLocalStanName !== '' && checkedArr[0].relLocalStanName !== null)) {
//          this.$confirm('停用, 是否继续?', '提示', {
//            confirmButtonText: '确 定',
//            cancelButtonText: ' ',
//            type: 'warning'
//          }).then(() => {
//            api.post(this.apiPath.hrsc.updateLocalStan, _data).then(res => {
//              if (res.code === 'CPYY-00001') {
//                checkedArr = [];
//                this.searchFun();
//                this.$alert('停用成功！', '提示信息', {
//                  confirmButtonText: '确 定',
//                  type: 'success', // icon图标类型
//                  dragFlag: true,
//                  customClass: '', // 添加class
//                  lockScroll: true
//                });
//              }
//            }).catch(err => {
//              console.log(err);
//            });
//          }).catch(() => {
//            console.log('删除失败!');
//          });
//        } else {
//          api.post(this.apiPath.hrsc.updateLocalStan, _data).then(res => {
//            if (res.code === 'CPYY-00001') {
//              checkedArr = [];
//              this.searchFun();
//              this.$alert('停用成功！', '提示信息', {
//                confirmButtonText: '确 定',
//                type: 'success', // icon图标类型
//                dragFlag: true,
//                customClass: '', // 添加class
//                lockScroll: true
//              });
//            }
//          }).catch(err => {
//            console.log(err);
//          });
//        }
//      },
      // 查看
      seeFun: function (scope) {
        this.localInfoSeeFlag = true;
        api.post(this.apiPath.hrsc.getLocalStan, {stanId: scope.stanId}).then(res => {
          this.localInfoSeeList = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改
      modifyFun: function (scope) {
        this.routerView = true;
        this.$router.push({path: '/localInfo/addLocalInfo', name: '标准基本信息', params: {'stanId': scope.stanId, 'type': 'modifyLocal'}});
      },
      // 删除
      delFun (scope) {
        let _this = this;
        _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(_this.apiPath.hrsc.deleteLocalStan, {stanId: scope.stanId}).then(res => {
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
      },
      dataChange (val) {
        this.localInfoForm.begDate = val;
      },
      takeEffectChange (val) {
        this.localInfoForm.takeEffectDate = val;
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
