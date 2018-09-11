<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Loading 加载</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button type="primary" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">显示整页加载，3秒消失</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button type=&quot;primary&quot; @click=&quot;openFullScreen&quot; v-loading.fullscreen.lock=&quot;fullscreenLoading&quot;&gt;显示整页加载，3秒消失&lt;/sino-button&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        fullscreenLoading: false
      };
    },
    methods: {
      openFullScreen () {
        this.fullscreenLoading = true;
        setTimeout(() =&gt; {
          this.fullscreenLoading = false;
        }, 3000);
      }
    }
  };
&lt;/script&gt;
&lt;style&gt;
  body {
    margin: 0;
  }
&lt;/style&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show = !show">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
        <span v-if="!show">显示代码</span>
        <span v-if="show">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">局部加载</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-table :data="tableData" style="width: 100%" border height="260" v-loading="loading2" element-loading-text="拼命加载中">
          <sino-table-column prop="date" label="日期" sortable min-width="100"></sino-table-column>
          <sino-table-column prop="name" label="姓名" sortable width="180"></sino-table-column>
          <sino-table-column prop="address" label="地址" :formatter="formatter"></sino-table-column>
        </sino-table>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-table :data=&quot;tableData&quot; style=&quot;width: 100%&quot; border height=&quot;260&quot; v-loading=&quot;loading2&quot; element-loading-text=&quot;拼命加载中&quot;&gt;
  &lt;sino-table-column prop=&quot;date&quot; label=&quot;日期&quot; sortable width=&quot;180&quot;&gt;&lt;/sino-table-column&gt;
  &lt;sino-table-column prop=&quot;name&quot; label=&quot;姓名&quot; sortable width=&quot;180&quot;&gt;&lt;/sino-table-column&gt;
  &lt;sino-table-column prop=&quot;address&quot; label=&quot;地址&quot; :formatter=&quot;formatter&quot;&gt;&lt;/sino-table-column&gt;
&lt;/sino-table&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        tableData: [{
          &quot;id&quot;:1,
          &quot;date&quot;: &quot;2016-05-03&quot;,
          &quot;name&quot;: &quot;王小虎&quot;,
          &quot;province&quot;: &quot;上海&quot;,
          &quot;city&quot;: &quot;普陀区&quot;,
          &quot;address&quot;: &quot;上海市普陀区金沙江路 1518 弄&quot;,
          &quot;tag&quot;:&quot;消息&quot;,
          &quot;zip&quot;: 200333
        }, {
          &quot;id&quot;:2,
          &quot;date&quot;: &quot;2016-05-02&quot;,
          &quot;name&quot;: &quot;王小虎&quot;,
          &quot;province&quot;: &quot;上海&quot;,
          &quot;city&quot;: &quot;普陀区&quot;,
          &quot;address&quot;: &quot;上海市普陀区金沙江路 1518 弄&quot;,
          &quot;tag&quot;:&quot;消息&quot;,
          &quot;zip&quot;: 200333
        }, {
          &quot;id&quot;:3,
          &quot;date&quot;: &quot;2016-05-04&quot;,
          &quot;name&quot;: &quot;王小虎&quot;,
          &quot;province&quot;: &quot;上海&quot;,
          &quot;city&quot;: &quot;普陀区&quot;,
          &quot;address&quot;: &quot;上海市普陀区金沙江路 11 弄&quot;,
          &quot;tag&quot;:&quot;只读&quot;,
          &quot;zip&quot;: 200333
        }, {
          &quot;id&quot;:4,
          &quot;date&quot;: &quot;2016-05-01&quot;,
          &quot;name&quot;: &quot;王小虎&quot;,
          &quot;province&quot;: &quot;上海&quot;,
          &quot;city&quot;: &quot;普陀区&quot;,
          &quot;address&quot;: &quot;上海市普陀区金沙江路 2 弄&quot;,
          &quot;tag&quot;:&quot;消息&quot;,
          &quot;zip&quot;: 200333
        }, {
          &quot;id&quot;:5,
          &quot;date&quot;: &quot;2016-05-01&quot;,
          &quot;name&quot;: &quot;王小虎&quot;,
          &quot;province&quot;: &quot;上海&quot;,
          &quot;city&quot;: &quot;普陀区&quot;,
          &quot;address&quot;: &quot;上海市普陀区金沙江路 22 弄&quot;,
          &quot;tag&quot;:&quot;通知&quot;,
          &quot;zip&quot;: 200333
        }],
        loading2: true
      };
    },
    methods: {
      // 排序
      formatter (row, column) {
        return row.address;
      },
      openFullScreen () {
        this.fullscreenLoading = true;
        setTimeout(() =&gt; {
          this.fullscreenLoading = false;
        }, 3000);
      }
    }
  };
&lt;/script&gt;
&lt;style&gt;
  body {
    margin: 0;
  }
&lt;/style&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show1 = !show1">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show1,'sino-angle-double-up':show1}"></i>
        <span v-if="!show1">显示代码</span>
        <span v-if="show1">收起代码</span>
      </div>
    </div>

  </div>
</template>
<script>
  import api from '../../../../api/index';
  export default {
    components: {},
    data () {
      return {
        show: false,
        show1: false,
        fullscreenLoading: false,
        tableData: null,
        loading2: true
      };
    },
    created () {
      this.getList();
    },
    methods: {
      getList () {
        api.getTable().then(res => {
          this.tableData = res.data.items;
        }).catch(err => {
          console.log('error!');
        });
      },
      // 排序
      formatter (row, column) {
        return row.address;
      },
      openFullScreen () {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 3000);
      }
    }
  };
</script>
<style>
  body {
    margin: 0;
  }
</style>
