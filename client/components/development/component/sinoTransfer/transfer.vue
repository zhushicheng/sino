<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Transfer 穿梭框</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-transfer v-model="value1" :data="data" :titles="['列表名称1', '列表名称2']" v-on:emitPage="emitPage" v-on:emitRightPage="emitRightPage"></sino-transfer>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">
                &lt;template&gt;
                &lt;sino-transfer v-model=&quot;value1&quot;
                :data=&quot;data&quot;
                :titles=&quot;[&#39;列表名称1&#39;, &#39;列表名称2&#39;]&quot; v-on:emitPage=&quot;emitPage&quot;
                v-on:emitRightPage=&quot;emitRightPage&quot;&gt;&lt;/sino-transfer&gt;
&lt;/template&gt;
&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        data: {
          &quot;total&quot;:100,
          &quot;page&quot;:1,
          &quot;pageSize&quot;:10,
          &quot;items&quot;:[
            {
              &quot;key&quot;:1,
              &quot;label&quot;:&quot;用户管理&quot;,
              &quot;disabled&quot;:true
            },
            {
              &quot;key&quot;:2,
              &quot;label&quot;:&quot;系统设置&quot;,
              &quot;disabled&quot;:true
            },
            {
              &quot;key&quot;:3,
              &quot;label&quot;:&quot;权限管理&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:4,
              &quot;label&quot;:&quot;角色管理&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:5,
              &quot;label&quot;:&quot;机构管理&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:6,
              &quot;label&quot;:&quot;组织机构&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:7,
              &quot;label&quot;:&quot;功能权限&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:8,
              &quot;label&quot;:&quot;数据字典&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:9,
              &quot;label&quot;:&quot;地区管理&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:10,
              &quot;label&quot;:&quot;词根管理&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:11,
              &quot;label&quot;:&quot;数据结构管理&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:12,
              &quot;label&quot;:&quot;样本程序库&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:13,
              &quot;label&quot;:&quot;前端组件库&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:14,
              &quot;label&quot;:&quot;字段血缘关系管理&quot;,
              &quot;disabled&quot;:false
            },
            {
              &quot;key&quot;:15,
              &quot;label&quot;:&quot;快捷功能&quot;,
              &quot;disabled&quot;:false
            }
          ]
        },
        value1: [1, 4]
      };
    },
    methods: {
      emitPage (ev) {
        const data = {
          &#39;page&#39;: ev
        };
        api.getTransfer(data).then(res =&gt; {
          this.data =  res.items;
        }).catch(err =&gt; {});
      },
      emitRightPage (ev) {
        const data = {
          &#39;page&#39;: ev
        };
        api.getTransfer(data).then(res =&gt; {
          this.data =  res.items;
        }).catch(err =&gt; {});
      }
    }
  };
&lt;/script&gt;</pre>
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


    <h3 class="sino-compon-h3">模糊查询</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-transfer v-model="value2" :data="data2" filterable  filter-placeholder="请输入城市拼音或者名称"></sino-transfer><!-- :filter-method="filterMethod"-->
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-transfer v-model=&quot;value2&quot; :data=&quot;data2&quot; filterable  filter-placeholder=&quot;请输入城市拼音或者名称&quot;&gt;&lt;/sino-transfer&gt;
&lt;/template&gt;
&lt;script&gt;
  export default{
    components: {},
    data () {
      const generateData2 = _ =&gt; {
        const data = [];
        const cities = [&#39;上海&#39;, &#39;北京&#39;, &#39;广州&#39;, &#39;深圳&#39;, &#39;南京&#39;, &#39;西安&#39;, &#39;成都&#39;, &#39;山西&#39;, &#39;河南&#39;, &#39;海南&#39;];
        const pinyin = [&#39;shanghai&#39;, &#39;beijing&#39;,
                &#39;guangzhou&#39;, &#39;shenzhen&#39;, &#39;nanjing&#39;,
                &#39;xian&#39;, &#39;chengdu&#39;, &#39;shanxi&#39;, &#39;henan&#39;,
                &#39;hainan&#39;];
        cities.forEach((city, index) =&gt; {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        data2: generateData2(),
        value2: []
      };
    },
    methods: {
      emitPage (ev) {

      }
    }
  };
&lt;/script&gt;</pre>
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
  export default{
    components: {},
    data () {
      const generateData2 = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都', '山西', '河南', '海南'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu', 'shanxi', 'henan', 'hainan'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        show: false,
        show1: false,
        data: null,
        value1: [1, 4],
        data2: generateData2(),
        value2: []
      };
    },
    created () {
      api.getTransfer({'page': 1}).then(res => {
        this.data =  res.items;
      }).catch(err => {

      });
    },
    methods: {
      comFun (ev) {
        const data = {
          'page': ev
        };
        api.getTransfer(data).then(res => {
          this.data =  res.items;
        }).catch(err => {});
      },
      emitPage (ev) {
        this.comFun(ev);
      },
      emitRightPage (ev) {
        this.comFun(ev);
      }
    }
  };
</script>
