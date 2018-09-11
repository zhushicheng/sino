<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Table 可编辑的表格</h2>
    <sino-table :data="data" border style="width: 100%" :row-style="showTr">
      <sino-table-column type="selection"></sino-table-column>
      <sino-table-column prop="id" label="序号" width="70" align="center"></sino-table-column>
      <sino-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text">
        <template scope="scope">
          <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
          <span class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="iconfont icon-wenjianjia1" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="iconfont icon-wenjianjia" aria-hidden="true"></i>
        </span>
          <span v-else-if="index===0" class="ms-tree-space"></span>
          {{scope.row[column.dataIndex]}}
        </template>
      </sino-table-column>
      <sino-table-column label="执行地区">
        <template scope="scope">
          <sino-input v-show="scope.row.edit" @blur="scope.row.edit = false" v-model="scope.row.address"></sino-input>
          <span v-show="!scope.row.edit" @click="scope.row.edit = true">{{ scope.row.address }}</span>
        </template>
      </sino-table-column>
      <sino-table-column label="起做日期">
        <template scope="scope">
          <sino-date-picker v-show="scope.row.editDate" v-model="scope.row.startDate" type="date"
                            placeholder="请选择时间" :editable="false" :readonly="false" format="yyyy-MM-dd"
                            :clearable="true" @change="dateChange"  @blur="scope.row.editDate = false">
          </sino-date-picker>
          <span v-show="!scope.row.editDate" @click="scope.row.editDate = true">{{ scope.row.startDate }}</span>
        </template>
      </sino-table-column>
      <sino-table-column label="止做日期">
        <template scope="scope">
          <sino-date-picker v-show="scope.row.editEndDate"
                            v-model="scope.row.endDate"
                            type="date"
                            placeholder="请选择时间"
                            :editable="false" :readonly="false" :clearable="true"
                            @blur="scope.row.editEndDate = false"></sino-date-picker>
          <span v-show="!scope.row.editEndDate" @click="scope.row.editEndDate = true">{{ scope.row.endDate }}</span>
        </template>
      </sino-table-column>
      <sino-table-column align="center" label="操作" width="80">
        <template scope="scope">
          <sino-button type="text">查看</sino-button>
        </template>
      </sino-table-column>
    </sino-table>

    <sino-button @click="submit" style="margin: 10px auto 0 auto">提交</sino-button>
  </div>
</template>
<script>
  import Utils from './utils/index.js';

  export default {
    components: {
    },
    data () {
      return {
        columns: [
          {
            text: '产品名称',
            dataIndex: 'name'
          }
        ],
        dataSource: [
          {
            id: 1,
            parentId: 0,
            name: '员工管理基础服务',
            age: 18,
            sex: '男',
            startDate: '2016-05-02',
            endDate: '2020-05-02',
            address: '上海市普陀区金沙江路 1518 弄',
            edit: false,
            editDate: false,
            editEndDate: false,
            children: [
              {
                id: '',
                parentId: 1,
                name: '用工协议管理服务',
                age: 22,
                sex: '男',
                startDate: '2016-05-02',
                endDate: '2020-05-02',
                address: '上海市普陀区金沙江路 1518 弄',
                edit: false,
                editDate: false,
                editEndDate: false
              }
            ]
          },
          {
            id: 3,
            parentId: 0,
            name: '入职体检',
            age: 23,
            sex: '女',
            startDate: '2016-05-02',
            endDate: '2020-05-02',
            address: '上海市普陀区金沙江路 1518 弄',
            edit: false,
            editDate: false,
            editEndDate: false,
            children: [
              {
                id: '',
                parentId: 3,
                name: '测试4',
                age: 22,
                sex: '男',
                startDate: '2016-05-02',
                endDate: '2020-05-02',
                address: '上海市普陀区金沙江路 1518 弄',
                edit: false,
                editDate: false,
                editEndDate: false
              },
              {
                id: '',
                parentId: 3,
                name: '测试5',
                age: 25,
                sex: '男',
                startDate: '2016-05-02',
                endDate: '2020-05-02',
                address: '上海市普陀区金沙江路 1518 弄',
                edit: false,
                editDate: false,
                editEndDate: false
              },
              {
                id: '',
                parentId: 3,
                name: '测试6',
                age: 26,
                sex: '女',
                startDate: '2016-05-02',
                endDate: '2020-05-02',
                address: '上海市普陀区金沙江路 1518 弄',
                edit: false,
                editDate: false,
                editEndDate: false,
                children: [
                  {
                    id: '',
                    parentId: 6,
                    name: '测试7',
                    age: 27,
                    sex: '男',
                    startDate: '2016-05-02',
                    endDate: '2020-05-02',
                    address: '上海市普陀区金沙江路 1518 弄',
                    edit: false,
                    editDate: false,
                    editEndDate: false
                  }
                ]
              }
            ]
          },
          {
            id: 18,
            parentId: 0,
            name: '人身意外保险',
            age: 18,
            sex: '男',
            startDate: '2016-05-02',
            endDate: '2020-05-02',
            address: '上海市普陀区金沙江路 1518 弄',
            edit: false,
            editDate: false,
            editEndDate: false
          }
        ],
        treeStructure: true,
        defaultExpandAll: false
      };
    },
//    created() {
//      this.getList();
//    },
    computed: {
      // 格式化数据源
      data: function () {
        let me = this;
        if (me.treeStructure) {
          let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll);
          console.log(data);
          return data;
        }
        return me.dataSource;
      }
    },
    methods: {
      submit () {
        const aa = this.data;
        const bb = this.dataSource;
        console.log(aa);
        console.log(bb);
      },
      getList () {
        let me = this;
        if (me.treeStructure) {
          let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll);
          return data;
        }
        return me.dataSource;
      },
      // 显示行
      showTr: function (row, index) {
        let show = (row._parent ? (row._parent._expanded && row._parent._show) : true);
        row._show = show;
        return show ? '' : 'display:none';
      },
      // 展开下级
      toggle: function (trIndex) {
        let me = this;
        let record = me.data[trIndex];
        record._expanded = !record._expanded;
      },
      // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this;
        if (me.treeStructure && index === 0) {
          return true;
        }
        return false;
      },
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow (index, record) {
        let me = this;
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true;
        }
        return false;
      },
      dateChange (val) {
        console.log(val);
      }
    }
  };
</script>
