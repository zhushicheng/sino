<template>
  <sino-table :data="tableData" border>
    <sino-table-column type="selection" width="50"></sino-table-column>
    <sino-table-column prop="id" label="序号" width="50" align="center"></sino-table-column>
    <sino-table-column label="产品名称">
      <template scope="scope">
        <i class="iconfont sino-tree-folder" v-show="scope.row.folder"></i>
        <span :class="{'is-span':scope.row.folder === false}">{{ scope.row.name }}</span>
      </template>
    </sino-table-column>
    <sino-table-column label="执行地区">
      <template scope="scope">
        <sino-input v-show="scope.row.edit" v-model="scope.row.address"></sino-input>
        <span v-show="!scope.row.edit">{{ scope.row.address }}</span>
      </template>
    </sino-table-column>
    <sino-table-column label="起做日期" min-width="100">
      <template scope="scope">
        <sino-date-picker v-show="scope.row.edit" v-model="scope.row.startDate" type="date"
                          placeholder="请选择时间" :editable="false" :readonly="false" format="yyyy-MM-dd"
                          :clearable="true" @change="dateChange">
        </sino-date-picker>
        <span v-show="!scope.row.edit">{{ scope.row.startDate }}</span>
      </template>
    </sino-table-column>
    <sino-table-column label="止做日期" min-width="100">
      <template scope="scope">
        <sino-date-picker v-show="scope.row.edit" v-model="scope.row.endDate" type="date" placeholder="请选择时间"
                          :editable="false" :readonly="false" :clearable="true"></sino-date-picker>
        <span v-show="!scope.row.edit">{{ scope.row.endDate }}</span>
      </template>
    </sino-table-column>
    <sino-table-column align="center" label="编辑" width="100">
      <template scope="scope">
        <sino-button type="text" v-show='!scope.row.edit' @click='scope.row.edit=true'>编辑</sino-button>
        <sino-button type="text" v-show='scope.row.edit' @click='scope.row.edit=false'>完成</sino-button>
      </template>
    </sino-table-column>
  </sino-table>
</template>
<script>
  import api from '../../../../api/index';
  export default{
    components: {},
    data () {
      return {
        tableData: null
      };
    },
    created () {
      this.getList();
    },
    methods: {
      getList () {
        console.log(this.pageSize + '----' + this.page);
        api.getEditTable().then(res => {
          const resData = res.data.items;
          resData.splice(1, 0, {'id': '',
            'startDate': '2016-05-02',
            'endDate': '2020-05-02',
            'name': '二级',
            'address': '二级地址',
            'edit': true,
            'folder': false});
          this.tableData = resData.map(v => {
            v.edit = false;
            return v;
          });
        }).catch(err => {
          console.log('error');
        });
      },
      dateChange (val) {
        console.log(val);
      }
    }
  };
</script>
