<template>
  <!--数据结构辅助-->
  <div class="sino-structure">
    <div class="structure-border">
      <sino-title type="levelOne" title="数据结构管理"></sino-title>
      <!--树和表格-->
      <div class="structure-tree">
        <div class="structure-content">
          <div style="margin-top: 1px">
            <sino-form :model="strucForm" ref="strucForm" class="struc-form fl">
              <div class="rule-form-content">
                <sino-form-item label="表名称：" class="struc-form-item fl mb15">
                  <sino-input type="text" v-model="strucForm.tableEnName"></sino-input>
                </sino-form-item>
                <sino-form-item label="表注释：" class="struc-form-item fl mb15">
                  <sino-input type="text" v-model="strucForm.tableComment"></sino-input>
                </sino-form-item>
              </div>
            </sino-form>
          </div>
          <div class="struc-form-button fr">
            <div class="struc-search">
              <sino-button class="is-primary"  @click="searchFun" type="p">查 询</sino-button><br><sino-button class="mt15" @click="resetForm('strucForm')" style="margin-top: 15px" type="p">重 置</sino-button>
            </div>
          </div>
          <sino-tree :data="strucList" :isRadio="false"
                     show-checkbox node-key="id" :props="defaultProps" ref="tree" @node-expand="nodeExpand" @node-collapse="nodeCollapse"
                     check-strictly class="tree-linkBox struct-tree-box"  @check-change="handleCheckChange"></sino-tree>
        </div>
        <sino-link-container :outBoxStyle="outBoxStyle" :innerBoxStyle="innerBoxStyle" :triangleStyle="triangleStyle">
          <div class="structure-content2">
            <sino-title type="levelTwo" title="数据结构管理"></sino-title>
            <div style="height: 97px; margin-top: 20px">
              <div class="structure-blue">
                <div style="float: left;">
                  <span class="structure-alldata">全部数据</span>
                  <br>
                  <span class="structure-number"><span class="structure-individual">{{totalNum}}</span> 行</span>
                </div>
                <span class="structure-icon1">
                  <img src="../../../assets/img/structure-alldata.png" alt="">
                </span>
              </div>
              <div class="structure-line"></div>
              <div class="structure-yellow">
                <div style="float: left;">
                  <span class="structure-alldata">空数据</span>
                  <br>
                  <span class="structure-number"><span class="structure-individual structure-emptyData">{{emptyNum}}</span> 行</span>
                </div>
                <span class="structure-icon1">
                  <img src="../../../assets/img/structure-nulldata.png" alt="">
                </span>
              </div>
            </div>
            <!-- 表格-->
            <div style="margin-top: 21px">
              <sino-table :data="tableData1" style="width: 100%" min-height="275" stripe border v-on:viewAll="viewAll">
                <sino-table-column type="index" label="序号" width="60"></sino-table-column>
                <sino-table-column prop="columnName" label="字段名称"></sino-table-column>
                <sino-table-column prop="columnComment" label="字段描述" ></sino-table-column>
                <sino-table-column prop="dataType" label="数据类型"></sino-table-column>
                <sino-table-column prop="columnDefault" label="默认值"></sino-table-column>
              </sino-table>
              <sino-page v-bind:page="page" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
            </div>
          </div>
        </sino-link-container>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../api';
  let CHECKKEYS;
  function offset (curEle) {
    var disTop = curEle.offsetTop;
    var par = curEle.offsetParent;
    while (par) {
      disTop += par.offsetTop;
      par = par.offsetParent;
    }
    return disTop;
  }
  export default {
    components: {},
    data () {
      return {
        tableData1: [], // 获取表格数据
        total: null, // 分页总数
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        page: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        strucForm: { // 搜索条件
          tableEnName: '',
          tableComment: ''
        },
        outBoxStyle: {
          width: '60%',
          float: 'left'
        },
        innerBoxStyle: {
          height: '100%',
          boxSizing: 'border-box',
          marginLeft: '10px'
        },
        triangleStyle: {
          display: 'none',
          top: 0
        },
        id1: '',
        list: [],
        radio: '',
        strucList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        activeData: {},
        totalNum: 0,
        emptyNum: 0
      };
    },
    mounted () {
      this.searchFun();
    },
    methods: {
      // 树列表查询
      searchFun () {
        api.post(this.apiPath.hrsc.findTableNameList, this.strucForm).then(res => {
          if (res.code === 'CPYY-00001') {
            this.strucList = [res.data];
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        this.page = page; // 分页方法
        this.viewAll();
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize; // 分页方法
        this.viewAll();
      },
      viewAll () { // 获取表格数据
        let obj = {
          pageNum: this.page,
          pageSize: this.pageSize,
          data: this.activeData
        };
        api.post(this.apiPath.hrsc.findTableData, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData1 = res.data.pageInfo.list;
            this.total = res.data.pageInfo.total;
            this.totalNum = res.data.dataCount;
            this.emptyNum = res.data.nullColumnCount;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 树选中回调
      handleCheckChange (data, checked) {
        if (data.children === null) {
          if (checked) {
            this.activeData.tableSchema = data.tableSchema;
            this.activeData.tableEnName = data.tableName;
            this.page = 1;
            this.viewAll();
            let that = this;
            setTimeout(function () {
              that.$refs.tree.setCheckedKeys([data.id]);
              setTimeout(function () {
                that.triangleStyle.display = 'block';
                that.triangleStyle.top = (offset(document.getElementsByClassName('is-checked')[0]) - offset(document.getElementsByClassName('sino-link-container')[0])) + 'px';
              });
            });
          } else {
            let _this = this;
            setTimeout(function () {
              if (_this.$refs.tree.getCheckedKeys().length === 0) {
                _this.triangleStyle.display = 'none';
                _this.activeData.tableSchema = '';
                _this.activeData.tableEnName = '';
                _this.tableData1 = [];
                _this.total = null;
                _this.totalNum = 0;
                _this.emptyNum = 0;
              }
            });
          }
        }
      },
      // 节点展开时触发
      nodeExpand (data) {
        if (this.expandedkeys) {
          this.expandedkeys.push(data.id);
        } else {
          this.expandedkeys = [];
          this.expandedkeys.push(data.id);
        }
      },
      // 节点关闭时触发
      nodeCollapse (data) {
        this.expandedkeys.splice(this.expandedkeys.indexOf(data.id), 1);
      },
      resetForm () {
        this.strucForm.tableEnName = '';
        this.strucForm.tableComment = '';
      }
    }
  };
</script>
