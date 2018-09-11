<template>
  <div class="roleMange">
    <div class="role-content">
        <sino-title type="levelOne" title="配置表头"></sino-title>
        <sino-form :model="billMeterForm" ref="billMeterForm" class="serch-form leads-serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <span class="search-inner-name">收费帐单模板名称：</span>
                <sino-input class="fl" type="text" v-model="billMeterForm.tempName" disabled></sino-input>
              </li>
              <li class="search-inner-one">
                <span class="search-inner-name">中文名称：</span>
                <sino-input class="fl" type="text" v-model="billMeterForm.chName"></sino-input>
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
    </div>
      <div style="background: #fff;margin-top: 10px">
        <div class="sino-table-icon-left configuration-table-title">
          <sino-button type="text" @click="clickFun('','add')" :style="{'margin-left':'21px','padding-top':'5px','width':'150px'}"><i class="iconfont sino-zhangdan-copy"></i>应用到其它模版
          </sino-button>
        </div>
        <div class="etyma-content small-etyma-content fl configuration-table" :style="{'margin-right':'3%','padding-left':'20px'}">
          <div>
            <div class="clear"></div>
            <div class="sino-table-total configuration-table-box">
              <div class="configuration-table-box-child">未配置表头</div>
              <div class="configuration-table-box-childa">
                <sino-checkbox class="configuration-table-box-checkbox"></sino-checkbox>
                <span>已选<span :style="{'color':'#399ff2'}">{{checkLenth}}/{{total}}</span>项</span></div>
              <!---->
              <sino-table :data="tableDataA" max-height="416" class="get-check-table"  v-on:select="selectCallBack" border stripe>
                <sino-table-column  type="selection"></sino-table-column>
                <sino-table-column  type="index" label="序号"></sino-table-column>
                <sino-table-column  prop="chName" label="中文名称"></sino-table-column>
                <sino-table-column prop="enName" label="西文名称"></sino-table-column>
              </sino-table>
              <!---->
              <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                         :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                         :total="total"></sino-page>
            </div>
          </div>
        </div>
        <div class="configuration-table-btn">
          <sino-button class="configuration-table-btn-left"
                       @click="moveRight" :class="{'is-configuration-table-btn':isA, 'no-configuration-table-btn':!isA}">
            <i class="iconfont sino-you1"></i>
          </sino-button>
          <sino-button class="configuration-table-btn-right"
                       @click="moveLeft" :class="{'is-configuration-table-btn':isB, 'no-configuration-table-btn':!isB}">
            <i class="iconfont sino-zuo"></i>
          </sino-button>
        </div>
        <div class="etyma-content small-etyma-content fl configuration-table">
            <div class="etyma-content-box" >
              <div class="clear"></div>
              <div class="sino-table-total configuration-table-box" >
                <div class="configuration-table-box-child">已配置表头</div>
                <div class="configuration-table-box-childa"><sino-checkbox class="configuration-table-box-checkbox"></sino-checkbox>已选<span :style="{'color':'#399ff2'}">{{checkLenth2}}/{{total2}}</span>项</div>
                <sino-table :data="tableDataB" v-on:select="selectCallBack2" stripe border max-height="416">
                  <sino-table-column  type="selection"></sino-table-column>
                  <sino-table-column  type="index" label="序号"></sino-table-column>
                  <sino-table-column prop="chName" label="中文名称"></sino-table-column>
                  <sino-table-column prop="enName" label="西文名称"></sino-table-column>
                  <sino-table-column prop="showSort" label="排序" :editType='true' width="60" align="center">
                    <template scope="scope">
                      <sino-input v-show="scope.row.edit"
                                  v-model="scope.row.showSort" v-on:blur="scope.row.edit = false;change(scope.row.showSort, scope.row.edit)"></sino-input>
                      <span v-show="!scope.row.edit" @click="scope.row.edit = true;">{{ scope.row.showSort }}</span>
                    </template>
                  </sino-table-column>
                </sino-table>
                <sino-page v-bind:page="page2.pageNum" v-bind:page-size="page2.pageSize" v-on:pagehandler="pageHandler2"
                           :pageArray="page2.pageArray" v-on:choosePageFun="choooseNum2" v-bind:object="object"
                           :total="total2"></sino-page>
              </div>
            </div>
        </div>
        <div class="clear"></div>
      </div>
    <!-- 应用到其它模版 -->
    <sino-dialog :visible.sync="modifyAndAdd" class="see-dirc adddimreason-dialog" @close="modifyClose">
      <sino-title slot="title" type="levelOne" title="选择账单模版" class="sino-dialog-title"></sino-title>
      <sino-form :model="billMeterForm" ref="billMeterForm" class="serch-form leads-serch-form">
        <div class="search-box" :style="{'width':'65%'}">
          <ul class="">
            <li class="search-inner-one">
              <span class="search-inner-name">签约供应商名称：</span>
              <sino-input class="fl" type="text" v-model="billMeterForm.chName"></sino-input>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchFun" :style="{'width':'90px'}">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <div class="roleMange">
        <div class="ml10">
          <sino-tree :data="treeList" :show-checkbox="true"
                     node-key="id"
                     :default-expand-all="false"
                     :props="defaultProps"
                     v-on:ascNode="ascNode"
                     ref="tree"
                     :showAsc="false"
                     :showDown="false"
                     :check-strictly="true"
                     lazy
                     @current-change="checkChangeFun"
                     :load="loadingNode"
          ></sino-tree>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitFun">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../../../api/index';
  import Vue from 'vue';
  import vald from '../../../../../validator/index.js';
  let checkedArr = [];
  let checkedArr2 = [];
  let tipFun = function (_this, array, tipMessage) {
    if (array.length === 0) {
      _this.$alert(tipMessage, '提示信息', {
        confirmButtonText: '确 定',
        type: 'warning', // icon图标类型
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    } else {
      return true;
    }
  };

  export default {
    components: {},
    data () {
      var checkNum = (rule, value, callback) => {
        if (!value) {
          callback(new Error('不能为空'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
      };
      return {
        // 树
//        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        modifyAndAdd: false,
        isA: false,
        isB: false,
        tableDataA: null, // 表格数据
        tableDataB: null, // 表格数据
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        checkLenth: 0,
        checkLenth2: 0,
        total: 0, // 分页总条数
        page2: { // 展示分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        total2: 0, // 分页总条数
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: false,
          isjumper: false,
          isSelectPage: false
        },
        billMeterForm: {
          tempName: '',
          chName: '',
          enName: '',
          billHeadType: '',
          billHeadTypeName: '',
          isDefaultName: '',
          isDefault: ''
        },
        // tree
        treeList: [],
        modifyAndAddForm: {
          dictName: '',
          code: '',
          dictDesc: ''
        }
      };
    },
    created () {
      let obj = {
        pageNum: this.page2.pageNum,
        pageSize: this.page2.pageSize,
        data: this.$route.query
      };
      api.post(this.apiPath.hrsc.chargeFind, obj).then(res => {
        this.tableDataB = res.data.list;
        this.total2 = res.data.total;
        this.tableDataB.forEach(function (list) {
          list.edit = false;
        });
      }).catch(err => {
        console.log(err);
      });
      let obj2 = {
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize,
        data: this.$route.query
      };
      api.post(this.apiPath.hrsc.findAll, obj2).then(res => {
        this.tableDataA = res.data.list;
        this.total = res.data.total;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.apiPath.hrsc.findChargeBillTempById, this.$route.query).then(res => {
        this.billMeterForm.tempName = res.data.tempName;
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      change (data, _data) {
        if (checkedArr2.length === 0) {
          this.$alert('请选择一项进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'info', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              return;
            }
          });
        } else {
          let obj = {
            chargeBillTempHeadId: checkedArr2[0].chargeBillTempHeadId,
            showSort: data
          };
          api.post(this.apiPath.hrsc.chargeUpdate, obj).then(res => {
            _data = false;
          }).catch(err => {
            console.log(err);
          });
        }
//        console.log(checkedArr2);
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        checkedArr = selectTion;
        this.checkLenth = checkedArr.length;
        if (checkedArr.length === 0) {
          this.isA = false;
        } else {
          this.isA = true;
        }
      },
      selectCallBack2 (selectTion, row) { // 手动选中checkBox回调
        checkedArr2 = selectTion;
        this.checkLenth2 = checkedArr2.length;
        if (checkedArr2.length === 0) {
          this.isB = false;
        } else {
          this.isB = true;
        }
      },
      moveRight () {
        let arr = [];
        for (var i = 0; i < checkedArr.length; i++) {
          var obj = {
            chargeBillTempId: this.$route.query.chargeBillTempId,
            headId: checkedArr[i].headId,
            headName: checkedArr[i].headName,
            chName: checkedArr[i].chName,
            enName: checkedArr[i].enName,
            showSort: checkedArr[i].showSort,
            colName: checkedArr[i].colName,
            remark: checkedArr[i].remark,
            groupCodt: checkedArr[i].groupCodt
          };
          arr.push(obj);
        }
        if (!checkedArr || checkedArr.length === 0) {
          this.$alert('请选择至少一项进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'info', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              return;
            }
          });
        } else {
          let obj1 = {headDefineList: arr};
          api.post(this.apiPath.hrsc.chargeSave, obj1).then(res => {
            checkedArr.length = 0;
            this.isA = false;
            if (res.code === "CPYY-00001") {
              api.post(this.apiPath.hrsc.chargeFind, {pageNum: 1, pageSize: 10, data: this.$route.query}).then(res => {
                this.tableDataB = res.data.list;
                this.total2 = res.data.total;
                this.checkLenth2 = 0;
              }).catch(err => {
                console.log(err);
              });
              api.post(this.apiPath.hrsc.findAll, {pageNum: 1, pageSize: 10, data: this.$route.query}).then(res => {
                this.tableDataA = res.data.list;
                this.total = res.data.total;
                this.checkLenth = 0;
//                console.log(res);
              }).catch(err => {
                console.log(err);
              });
            }
            console.log(res);
          }).catch(err => {
            console.log(err);
          });
        }
      },
      moveLeft () {
        let _arr = [];
        for (var j = 0; j < checkedArr2.length; j++) {
          var _obj = checkedArr2[j].headId;
          _arr.push(_obj);
        };
        let obj2 = {
          chargeBillTempId: this.$route.query.chargeBillTempId,
          headIds: _arr
        };
        if (!checkedArr2 || checkedArr2.length === 0) {
          this.$alert('请选择至少一项进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'info', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              return;
            }
          });
        } else {
          api.post(this.apiPath.hrsc.chargeDelete, {chargeBillSuppId: obj2}).then(res => {
            checkedArr2.length = 0;
            this.isB = false;
            if (res.code === "CPYY-00001") {
              api.post(this.apiPath.hrsc.chargeFind, {pageNum: 1, pageSize: 10, data: this.$route.query}).then(res => {
                this.tableDataB = res.data.list;
                this.total2 = res.data.total;
                this.checkLenth2 = 0;
              }).catch(err => {
                console.log(err);
              });
              api.post(this.apiPath.hrsc.findAll, {pageNum: 1, pageSize: 10, data: this.$route.query}).then(res => {
                this.tableDataA = res.data.list;
                this.total = res.data.total;
              }).catch(err => {
                console.log(err);
              });
            }
          });
        }
      },
      searchFun () {
        this.page.pageNum = 1;
        this.page.pageSize = 10;
        this.getList();
      },
      submitFun () {
        this.modifyAndAdd = false;
      },
      getList () {
//        api.post(this.apiPath.hrsc.findAll, {data: this.$route.query}).then(res => {
//          this.tableDataA = res.data.list;
//          this.total = res.data.total;
//        }).catch(err => {
//          console.log(err);
//        });
        let obj = {
          chargeBillTempId: this.$route.query.chargeBillTempId,
          chName: this.billMeterForm.chName
        };
        api.post(this.apiPath.hrsc.headFindByChName, {pageNum: this.page.pageNum, pageSize: this.page.pageSize, data: obj}).then(res => {
          this.tableDataA = res.data.list;
          this.total = res.data.total;
        });
      },
      getList2 () {
//        api.post(this.apiPath.hrsc.chargeFind, {data: this.$route.query}).then(res => {
//          this.tableDataB = res.data.list;
//          this.total2 = res.data.total;
//        }).catch(err => {
//          console.log(err);
//        });
      },
      pageHandler: function (page) {
        this.page.pageNum = page;
        this.getList();
      },
      pageHandler2: function (page) {
        this.page2.pageNum = page;
//        this.getList2();
      },
      choooseNum: function (pageSize) {
//        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.getList();
      },
      choooseNum2: function (pageSize) {
//        改变分页显示条数;
        this.page2.pageSize = pageSize;
//        this.getList2();
      },
      clickFun: function (data, type) {
        this.modifyAndAdd = true;
      },
      modifyClose: function (formName) { // 修改对话框打开回调
        this.$refs.billMeterForm.resetFields();
      },
      // 树
      ascNode (val, self, type) {
//        CHECKKEYS = this.$refs.tree.getCheckedKeys(true);
//        CHECKEDFLAG = true;
      },
      checkChangeFun (data, node) {
        if (node.checked) {
          this.checkedNodeId = data.id;
          this.$refs.tree.setCheckedKeys([data.id]);
        } else {
          this.$refs.tree.setCheckedKeys([]);
          this.checkedNodeId = '';
        }
      },
      loadingNode (node, resolve) {
        if (node.level === 0) {
          api.postsign(this.apiPath.hrsc.loadAreaList, 0).then(res => {
            return resolve(res.data);
          });
        }
        var hasChild;
        if (node.data.isFolder === 1) {
          hasChild = true;
        } else {
          hasChild = false;
        }
        if (hasChild) {
          api.postsign(this.apiPath.hrsc.loadAreaList, node.data.id).then(res => {
            let that = this;
            if (this.checkedNodeId) {
              setTimeout(function () {
                that.$refs.tree.setCheckedKeys([that.checkedNodeId]);
              });
            }
            return resolve(res.data);
          });
        }
      }
    }
  };
</script>

