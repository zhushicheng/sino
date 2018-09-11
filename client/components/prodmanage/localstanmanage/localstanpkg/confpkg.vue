<template>
  <!--配置组合-->
  <div class="usermanage">
    <sino-con class="marbom">
      <sino-title type="levelOne" title="配置组合"></sino-title>
      <sino-form :model="confPkgForm" ref="confPkgForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="标准名称：" class="search-inner-item" prop="stanName">
                <sino-input class="fl" type="text"
                            v-model="confPkgForm.stanName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="标准项：" class="search-inner-item" prop="prodName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="prodUrl"
                             :data="{}"
                             :chooseName.sync="confPkgForm.prodName"
                             :chooseId.sync="confPkgForm.prodId" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <span class="two-dater-span">执行开始日期：</span>
              <div class="two-dater">
                <sino-form-item class="search-inner-item" prop="takeEffectDate">
                  <sino-date-picker class="fl"
                                    v-model="confPkgForm.takeEffectDate"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl">至</span>
                <sino-form-item class="search-inner-item" prop="takeEffectDate">
                  <sino-date-picker class="fl"
                                    v-model="confPkgForm.takeEffectDateEnd"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </div>
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
      <!--表格-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="addFun()"><i class="iconfont sino-add"></i>移入到组合</sino-button>
            </div>
          </div>
          <sino-table max-height="416" :data="confPkgInData" stripe v-on:viewAll="viewAll" @selection-change="selectCallBack" border>
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="stanName" label="地方标准名称" min-width="105"></sino-table-column>
            <sino-table-column prop="prodName" label="地方标准项" min-width="105"></sino-table-column>
            <sino-table-column prop="takeEffectDate" label="执行开始日期" min-width="120"></sino-table-column>
            <sino-table-column prop="entPayProp" label="企业比例（%）" min-width="130"></sino-table-column>
            <sino-table-column prop="entRadixUpperLimit" label="企业基数上限" min-width="105"></sino-table-column>
            <sino-table-column prop="entRadixLowerLimit" label="企业基数下限" min-width="105"></sino-table-column>
            <sino-table-column prop="perPayProp" label="个人比例（%）" min-width="130"></sino-table-column>
            <sino-table-column prop="perRadixUpperLimit" label="个人基数上限" min-width="105"></sino-table-column>
            <sino-table-column prop="perRadixLowerLimit" label="个人基数下限" min-width="105"></sino-table-column>
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
    </sino-con>
    <sino-con>
      <sino-title type="levelOne" title="已配置组合信息"></sino-title>
      <sino-form :model="confPkgOutForm" ref="confPkgForm" class="serch-form">
        <div class="search-box bornone">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="地方标准组合名称：" class="search-inner-item" prop="pkgName">
                <sino-input class="fl" type="text"
                            v-model="confPkgOutForm.pkgName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="地区：" class="search-inner-item" prop="areaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="true"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="areaUrl"
                             :data="{data:{level :3}}"
                             :chooseName.sync="confPkgOutForm.areaName"
                             :chooseId.sync="confPkgOutForm.areaId" :clear="false"></sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="clear"></div>
      </sino-form>
      <!--表格-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="removeFun()"><i class="iconfont sino-add"></i>移出</sino-button>
              <sino-button type="icon-text" @click="configDialogFun"><i class="iconfont sino-modify"></i>维护执行结束日期</sino-button>
            </div>
          </div>
          <sino-table max-height="416" :data="confPkgOutData" stripe v-on:viewAll="viewAll1" border @selection-change="handleSelectionChange"><!--v-on:select="selectOutCallBack" -->
            <sino-table-column type="selection" prop="conId"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="stanName" label="地方标准名称" min-width="105"></sino-table-column>
            <sino-table-column prop="takeEffectDate" label="执行开始日期" min-width="120"></sino-table-column>

            <sino-table-column label="执行结束日期" min-width="120" prop="endDate"><!-- :editType="editTypeFlag"-->
              <!--<template scope="scope">
                <sino-date-picker v-show="scope.row.editDateSub" v-model="scope.row.takeEffectDateEnd" type="date" placeholder="请选择时间" :editable="false" :readonly="false" format="yyyy-MM-dd" :clearable="false" @blur="scope.row.editDateSub = false;blurDate(scope,$event)">
                </sino-date-picker>
                <span v-show="!scope.row.editDateSub" @click="editDateSubFun(scope)">{{ scope.row.takeEffectDateEnd | capitalize}}</span>
              </template>-->
            </sino-table-column>

            <sino-table-column prop="entPayProp" label="企业比例（%）" min-width="130"></sino-table-column>
            <sino-table-column prop="entRadixUpperLimit" label="企业基数上限" min-width="105"></sino-table-column>
            <sino-table-column prop="entRadixLowerLimit" label="企业基数下限" min-width="105"></sino-table-column>
            <sino-table-column prop="perPayProp" label="个人比例（%）" min-width="130"></sino-table-column>
            <sino-table-column prop="perRadixUpperLimit" label="个人基数上限" min-width="105"></sino-table-column>
            <sino-table-column prop="perRadixLowerLimit" label="个人基数下限" min-width="105"></sino-table-column>
          </sino-table>
          <sino-page v-bind:page="confPage.pageNum"
                     v-bind:page-size="confPage.pageSize"
                     v-on:pagehandler="pageHandler1"
                     :pageArray="confPage.pageArray"
                     v-on:choosePageFun="choooseNum1"
                     v-bind:object="object"
                     :total="confPage.total"></sino-page>
        </div>
      </div>
    </sino-con>
    <!--执行结束日期-->
    <sino-dialog :visible.sync="configDateFlag" class="leads-follow" v-on:close="resetForm('configDateForm')">
      <sino-title slot="title" type="levelOne" title="维护执行结束日期" class="sino-dialog-title"></sino-title>
      <div class="follow-select">
        <sino-form :model="configDateForm" class="follow-form" ref="configDateForm" :rules="configDateRules">
          <div class="follow-content">
            <sino-form-item label="执行结束日期：" prop="endDate">
              <sino-date-picker v-model="configDateForm.endDate" type="date" :editable="false" :picker-options="endDateFun" :readonly="false" format="yyyy-MM-dd" :clearable="false">
              </sino-date-picker>
            </sino-form-item>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="configConfirm">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  import Vue from 'vue';
  let checkedArr;
  let checkedOutArr;
  function parents (ele, tagName) {
    if (ele.parentNode.nodeType === 1 && ele.parentNode.tagName === tagName) {
      return ele.parentNode;
    } else {
      if (ele.parentNode) {
        return parents(ele.parentNode, tagName);
      }
    }
  }

  export default {
    components: {
    },
    data () {
      let _that = this;
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        prodUrl: this.apiPath.hrsc.findpropayname,
        configPkgFlag: false,
        localStanList: [],
        isA: true,
        confPkgInData: null,
        confPkgOutData: null,
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
        confPage: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null
        },
        confPkgForm: {
          stanName: '',
          prodName: '',
          prodId: '',
          takeEffectDate: '',
          takeEffectDateEnd: ''
        },
        confPkgOutForm: {
          areaName: '',
          areaId: '',
          pkgName: ''
        },
        configPkgDialogForm: {},
        configData: null,
        editTypeFlag: false,
        configDateFlag: false,
        configDateForm: {
          endDate: ''
        },
        configDateRules: {
          endDate: [
            { type: 'date', required: true, message: '请选择执行结束日期', trigger: 'change' }
          ]
        },
        endDateFun: {
          disabledDate (time) {
            return time.getTime() < new Date(checkedOutArr[0].takeEffectDate);
          }
        }
      };
    },
    filters: {
      capitalize: function (value) {
        if (!value) return '';
        const d = new Date(value);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        return year + '-' + month + '-' + day + ' ';
      }
    },
    mounted () {
      this.searchFun();
      this.confPage.pageNum = 1;
      this.viewAll1(this.confPage.pageNum, this.confPage.pageSize);
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
//        if (selectTion.length >= 2) {
//          selectTion.splice(0, selectTion.length - 1);
//        }
        checkedArr = selectTion;
      },
      handleSelectionChange (val) {
        checkedOutArr = val;
      },
//      selectOutCallBack (selectTion, row) { // 手动选中checkBox回调
//        if (selectTion.length >= 2) {
//          selectTion.splice(0, selectTion.length - 1);
//        }
//        checkedOutArr = selectTion;
//      },
      viewAll (pageNum, pageSize) {
        this.confPkgForm.pkgId = this.$route.params.pkgId;
        let _data = {
          data: this.confPkgForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.listLocalStanNotInPkg, _data).then(res => {
          this.confPkgInData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      viewAll1 (pageNum, pageSize) {
        let _data = {
          pageNum: this.confPage.pageNum,
          pageSize: this.confPage.pageSize,
          pkgId: this.$route.params.pkgId
        };
        api.post(this.apiPath.hrsc.getLocalStanPkgList, _data).then(res => {
          this.confPkgOutData = res.data.newPage.list;
          this.confPage.total = res.data.newPage.total;
          this.confPkgOutForm = res.data;
          this.confPkgOutData.forEach(function (list) {
            list.editDateSub = false;
            list.takeEffectDateEnd = '2017-11-22';
          });
        }).catch(() => {
          console.log('失败!');
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      pageHandler1: function (pageNum) {
        this.confPage.pageNum = pageNum;
        this.viewAll1(this.confPage.pageNum, this.confPage.pageSize);
      },
      choooseNum1: function (pageSize) {
        this.confPage.pageSize = pageSize;
        this.confPage.pageNum = 1;
        this.viewAll1(this.confPage.pageNum, this.confPage.pageSize);
      },
      addFun () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请选择一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _this = this;
        let _stanId = [];
        checkedArr.forEach(function (list) {
          _stanId.push(list.stanId);
        });
        let _data = {
          stanIds: _stanId,
          pkgId: _this.$route.params.pkgId
        };
        api.post(_this.apiPath.hrsc.saveLocalStanPkgRel, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            checkedArr = [];
            _this.searchFun();
            _this.confPage.pageNum = 1;
            _this.viewAll1(_this.confPage.pageNum, _this.confPage.pageSize);
            checkedOutArr = [];
            this.$message({message: '移入成功！', type: 'success'});
            return;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      removeFun () {
        if (!checkedOutArr || checkedOutArr.length < 1) {
          this.$alert('请选择一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _this = this;
        let _stanid = [];
        checkedOutArr.forEach(function (list) {
          _stanid.push(list.stanId);
        });
        let _data = {
          stanIds: _stanid,
          pkgId: _this.$route.params.pkgId
        };
        api.post(_this.apiPath.hrsc.deleteLocalStanPkgRel, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            checkedArr = [];
            _this.searchFun();
            _this.confPage.pageNum = 1;
            _this.viewAll1(_this.confPage.pageNum, _this.confPage.pageSize);
            checkedOutArr = [];
            this.$message({message: '移出成功！', type: 'success'});
            return;
          }
        });
      },
      configDialogFun () {
        if (!checkedOutArr || checkedOutArr.length < 1 || checkedOutArr.length > 1) {
          this.$alert('请选择一条数据在进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _data = {
          stanId: checkedOutArr[0].stanId,
          pkgId: this.$route.params.pkgId
        };
        api.post(this.apiPath.hrsc.updateEndDate, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.configDateFlag = true;
          }
        });
//        this.editTypeFlag = true;
      },
      configConfirm () {
        let _data = {
          stanId: checkedOutArr[0].stanId,
          endDate: Vue.filter('date')(this.configDateForm.endDate, 'yyyy-MM-dd'),
          pkgId: this.$route.params.pkgId
        };
        api.post(this.apiPath.hrsc.updateEndDate, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.configDateFlag = false;
            this.confPage.pageNum = 1;
            this.viewAll1(this.confPage.pageNum, this.confPage.pageSize);
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
//      editDateSubFun (_scope) {
//        if (checkedOutArr && checkedOutArr.length > 0) {
//          if (checkedOutArr[0].stanId !== _scope.row.stanId) {
//            this.$alert('请修改当前选中的数据', '提示信息', {
//              confirmButtonText: '确 定',
//              type: 'warning', // icon图标类型
//              dragFlag: true,
//              lockScroll: true
//            });
//            return;
//          }
//        }
//        if (this.editTypeFlag === true) {
//          let ssss = JSON.parse(JSON.stringify(_scope.row));
//          for (let j = 0; j < this.confPkgOutData.length; j++) {
//            if (_scope.row.stanId === this.confPkgOutData[j].stanId) {
//              this.confPkgOutData[j].stanName = '';
//              this.confPkgOutData[j].editDateSub = true;
//              this.confPkgOutData[j].stanName = ssss.stanName;
//            }
//          }
//        }
//      },
//      blurDate (sc, event) {
//        let _this = this;
//        if (_this.confPkgOutData && _this.confPkgOutData.length > 0) {
//          for (let i = 0; i < _this.confPkgOutData.length; i++) {
//            if (sc.row.id === _this.confPkgOutData[i].stanId) {
//              var d = new Date(sc.row.takeEffectDateEnd);
//              var year = d.getFullYear();
//              var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
//              var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
//              sc.row.takeEffectDateEnd = year + '-' + month + '-' + day;
//              if (sc.row.takeEffectDateEnd !== _this.confPkgOutData[i].takeEffectDateEnd) {
//                parents(event.$el, 'TD').className += ' is-finish';
//              } else {
//                let classAry = parents(event.$el, 'TD');
//                let ary = classAry.className.replace(/(^ +| +$)/g, '').split(/ +/g);
//                for (let i = 0, len = ary.length; i < len; i++) {
//                  let curName = ary[i];
//                  if (curName === 'is-finish') {
//                    let reg = new RegExp('(^| +)' + curName + '( +|$)', 'g');
//                    classAry.className = classAry.className.replace(reg, ' ');
//                  }
//                }
//              }
//            }
//          }
//          setTimeout(function () {
//            let _data = sc.row;
//            api.post(_this.apiPath.hrsc.updateLocalStan, _data).then(res => {
//              _this.$alert(res.message, '提示信息', {
//                confirmButtonText: '确 定',
//                type: 'success',
//                dragFlag: true,
//                lockScroll: true
//              });
//            }).catch(err => {
//              console.log(err);
//            });
//          }, 200);
//        }
//      }
    }
  };
</script>
