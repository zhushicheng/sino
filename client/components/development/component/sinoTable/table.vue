<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Table 表格</h2>
    <h3 class="sino-compon-h3">没有边框、带筛选、带删除、分页的表格</h3>

    <div class="sino-table-total">
      <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
        <div class="sino-table-icon-left">
          <sino-button type="icon-text"><i class="iconfont sino-tianjia"></i>新增</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-modify"></i>修改</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-shanchu1"></i>删除</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-xiangqing1"></i>详情</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-guanlian"></i>关联业务单位</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-zhibiao08"></i>转化</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-shangchuan"></i>上传</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-download-copy"></i>下载</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-guanlian"></i>关联业务单位</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-zhibiao08"></i>转化</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-shangchuan"></i>上传</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-download-copy"></i>下载</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-guanlian"></i>关联业务单位</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-zhibiao08"></i>转化</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-shangchuan"></i>上传</sino-button>
          <sino-button type="icon-text"><i class="iconfont sino-download-copy"></i>下载</sino-button>
        </div>
        <sino-button type="icon-text" class="fr sino-table-icon-right" @click="moreIcon">
          <i class="iconfont" :class="{'sino-shuangjiantou-copy':isA,'sino-angle-double-up':!isA}"></i>
          <span v-if="isA">更多操作</span>
          <span v-if="!isA">收起操作</span>
        </sino-button>
      </div>
      <sino-table :data="tableData" style="width: 100%" height="275" stripe>
        <sino-table-column prop="date" label="日期" width="180"></sino-table-column>
        <sino-table-column prop="name" label="姓名"></sino-table-column>
        <sino-table-column prop="address" label="地址" width="250"></sino-table-column>
        <sino-table-column prop="tag" label="标签"
                           width="100"
                           :filters="[{ text: '消息', value: '消息' }, { text: '通知', value: '通知' }, { text: '只读', value: '只读' }]"
                           :filter-method="filterTag"
                           filter-placement="bottom-end">
          <template scope="scope">
            <el-tag :type="scope.row.tag === '消息' ? 'info' : scope.row.tag === '通知' ? 'notice': 'disabled'" close-transition>{{scope.row.tag}}</el-tag>
          </template>
        </sino-table-column>
        <sino-table-column label="操作" width="70">
          <template scope="scope">
            <sino-button @click="deleteClick(scope.row)" type="text" size="small">删除</sino-button>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="page"
                 v-bind:page-size="pageSize"
                 v-on:pagehandler="pageHandler"
                 :pageArray="pageArray"
                 v-on:choosePageFun="choooseNum"
                 v-bind:object="object"
                 :total="total"></sino-page>
    </div>

    <h3 class="sino-compon-h3">排序、固定表头</h3>
    <sino-table :data="tableData" style="width: 100%" height="150" border :row-class-name="tableRowClassName" :default-sort = "{prop: 'date', order: 'descending'}">
      <sino-table-column prop="date" label="日期" sortable width="180"></sino-table-column>
      <sino-table-column prop="name" label="姓名" sortable width="180"></sino-table-column>
      <sino-table-column prop="address" label="地址" :formatter="formatter"></sino-table-column>
    </sino-table>

    <h3 class="sino-compon-h3">固定列和表头</h3>
    <sino-table :data="tableData" style="width: 100%" height="200" stripe border>
      <sino-table-column fixed prop="date" label="日期"></sino-table-column>
      <sino-table-column prop="name" label="姓名" width="120"></sino-table-column>
      <sino-table-column prop="province" label="省份" width="120"></sino-table-column>
      <sino-table-column prop="city" label="市区"></sino-table-column>
      <sino-table-column prop="address" label="地址"></sino-table-column>
      <sino-table-column prop="zip" label="邮编"></sino-table-column>
      <sino-table-column fixed="right" label="操作" width="100">
        <template scope="scope">
          <sino-button @click="handleClick" type="text" size="small">查看</sino-button>
        </template>
      </sino-table-column>
    </sino-table>

    <h3 class="sino-compon-h3">多选、流体高度</h3>
    <sino-table :data="tableData" style="width: 100%" height="200" stripe border>
      <sino-table-column type="selection" width="55"></sino-table-column>
      <sino-table-column fixed prop="date" label="日期" width="150"></sino-table-column>
      <sino-table-column prop="name" label="姓名" width="120"></sino-table-column>
      <sino-table-column prop="province" label="省份" width="120"></sino-table-column>
      <sino-table-column prop="city" label="市区" width="120"></sino-table-column>
      <sino-table-column prop="address" label="地址"></sino-table-column>
      <sino-table-column prop="zip" label="邮编" width="120"></sino-table-column>
      <sino-table-column fixed="right" label="操作" width="100">
        <template scope="scope">
          <sino-button @click="handleClick" type="text" size="small">查看</sino-button>
        </template>
      </sino-table-column>
    </sino-table>
    <h3 class="sino-compon-h3">分页无数据</h3>
    <div>
      <sino-table :data="tableDataNull" style="width: 100%" min-height="275" stripe>
        <sino-table-column prop="date" label="日期"></sino-table-column>
        <sino-table-column prop="name" label="姓名"></sino-table-column>
        <sino-table-column prop="address" label="地址"></sino-table-column>
        <sino-table-column prop="tag" label="标签"
                           :filters="[{ text: '消息', value: '消息' }, { text: '通知', value: '通知' }, { text: '只读', value: '只读' }]"
                           :filter-method="filterTag"
                           filter-placement="bottom-end">
          <template scope="scope">
            <el-tag :type="scope.row.tag === '消息' ? 'info' : scope.row.tag === '通知' ? 'notice': 'disabled'" close-transition>{{scope.row.tag}}</el-tag>
          </template>
        </sino-table-column>
        <sino-table-column label="操作" align="center">
          <template scope="scope">
            <sino-button @click="deleteClick(scope.row)" type="text" size="small">删除</sino-button>
          </template>
        </sino-table-column>
      </sino-table>
    </div>

    <h3 class="sino-compon-h3">默认不展示数据</h3>
    <div>
      <sino-button>点击显示表格数据</sino-button>
      <sino-table :data="tableDataDeafult" style="width: 100%" min-height="275" stripe v-on:viewAll="viewAll">
        <sino-table-column prop="date" label="日期"></sino-table-column>
        <sino-table-column prop="name" label="姓名"></sino-table-column>
        <sino-table-column prop="address" label="地址"></sino-table-column>
        <sino-table-column prop="tag" label="标签"
                           :filters="[{ text: '消息', value: '消息' }, { text: '通知', value: '通知' }, { text: '只读', value: '只读' }]"
                           :filter-method="filterTag"
                           filter-placement="bottom-end">
          <template scope="scope">
            <el-tag :type="scope.row.tag === '消息' ? 'info' : scope.row.tag === '通知' ? 'notice': 'disabled'" close-transition>{{scope.row.tag}}</el-tag>
          </template>
        </sino-table-column>
        <sino-table-column label="操作" align="center">
          <template scope="scope">
            <sino-button @click="deleteClick(scope.row)" type="text" size="small">删除</sino-button>
          </template>
        </sino-table-column>
      </sino-table>
    </div>

  </div>
</template>
<script>
  import api from '../../../../api/index';
  export default {
    components: {},
    data () {
      return {
        isA: true,
        tableData: null,
        total: null,
        tableDataNull: [],
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
        pageSize: 5,
        pageArray: [10, 20, 30, 50],
        tableDataDeafult: null
      };
    },
    created () {
      this.getList();
    },
    methods: {
      viewAll () {
        console.log(111);
        api.getTable().then(res => {
          this.tableDataDeafult = res.data.items;
        }).catch(err => {
          console.log(err);
        });
      },
      // 筛选
      filterTag (value, row) {
        return row.tag === value;
      },
      // 排序
      formatter (row, column) {
        return row.address;
      },
      moreIcon () {
        this.isA = !this.isA;
      },
      getList () {
        console.log(this.pageSize + '----' + this.page);
        api.getTable().then(res => {
          this.tableData = res.data.items;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      handleClick () {
        console.log(1);
      },
      pageHandler: function (page) {
        this.page = page;
        this.getList();
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.getList();
      },
      deleteClick (row) {
        const index = this.tableData.indexOf(row);
        this.tableData.splice(index, 1);
      }
    },
    computed: {
      tableRowClassName (row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 2) {
          return 'positive-row';
        }
        return '';
      }
    }
  };
</script>
