<template>
  <div class="sino-over" style="padding-bottom:300px;">
    <h2 class="sino-compon-h2">Select 选择器</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-select :tipText="'请选择'"
                     :filterable="false"
                     :multiselect="false"
                     :isshow4Totol="false"
                     :disabled="false"
                     :totalNum="false"
                     :isPage="false"
                     :isGroup="false"
                     :chooseName.sync="name1"
                     :chooseId.sync="id1"
                     :clear="true"
                     method='GET'
                     :url="localHref + '/selectArray.json'"></sino-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                :filterable=&quot;false&quot; :multiselect=&quot;false&quot;
                :isshowTotol=&quot;false&quot; :disabled=&quot;false&quot;
                :totalNum=&quot;false&quot; :isPage=&quot;false&quot;
                :isGroup=&quot;false&quot; :chooseName.sync=&quot;name1&quot;
                :chooseId.sync=&quot;id1&quot; :clear=&quot;true&quot;
                method=&#39;GET&#39;
                :url=&quot;localHref + &#39;/selectArray.json&#39;&quot;&gt;&lt;/sino-select&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        name1: &#39;&#39;,
        id1: &#39;&#39;,
        data: {
          &quot;code&quot;:200,
          &quot;message&quot;:111,
          &quot;data&quot;: {
            &quot;pageNum&quot;,
            &quot;pageSize&quot;,
            &quot;total&quot;,
            &quot;list&quot;:[
              {
                &quot;title&quot;:&quot;成都市&quot;,
                &quot;english&quot;:&quot;chengdushi&quot;,
                &quot;id&quot;:1
              },
              {
                &quot;title&quot;:&quot;绵阳市&quot;,
                &quot;english&quot;:&quot;mianyangshi&quot;,
                &quot;id&quot;:2
              },
              {
                &quot;title&quot;:&quot;自贡市&quot;,
                &quot;english&quot;:&quot;zigongshi&quot;,
                &quot;id&quot;:3
              },
              {
                &quot;title&quot;:&quot;泸州市&quot;,
                &quot;english&quot;:&quot;luzhoushi&quot;,
                &quot;id&quot;:4
              },
              {
                &quot;title&quot;:&quot;阿坝藏族羌族自治州&quot;,
                &quot;english&quot;:&quot;abazangzuqiangzuzhizhizhou&quot;,
                &quot;id&quot;:5
              },
              {
                &quot;title&quot;:&quot;凉山彝族自治州&quot;,
                &quot;english&quot;:&quot;liangshanyizuzhizhizhou&quot;,
                &quot;id&quot;:6
              }
            ]
          }
        },
        localHref: window.location.href.split(&#39;#&#39;)[0]
      };
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
    <h3 class="sino-compon-h3">创建条目</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-create-select
          v-model="value10"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择">
          <sino-create-option
            v-for="item in options5"
            :key="item.value"
            :label="item.title"
            :value="item.id">
          </sino-create-option>
        </sino-create-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show10">
          <div class="demo-highlight">
            <code></code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show10 = !show10">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
        <span v-if="!show10">显示代码</span>
        <span v-if="show10">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">下拉框禁用</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-select :tipText="'请选择'" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="true" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="name2" :chooseId.sync="id2" :clear="true" method='GET' :url="localHref + '/selectArray.json'"></sino-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                :filterable=&quot;false&quot;
                :multiselect=&quot;false&quot;
                :isshowTotol=&quot;false&quot;
                :disabled=&quot;false&quot;
                :totalNum=&quot;false&quot;
                :isPage=&quot;false&quot; :isGroup=&quot;false&quot;
                :chooseName.sync=&quot;name1&quot;
                :chooseId.sync=&quot;id1&quot; :clear=&quot;true&quot;
                method=&#39;GET&#39;
                :url=&quot;localHref + &#39;/selectArray.json&#39;&quot;&gt;&lt;/sino-select&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        name2: &#39;吃饭&#39;,
        id2: 1,
        data: {
          &quot;code&quot;:200,
          &quot;message&quot;:111,
          &quot;data&quot;: {
            &quot;pageNum&quot;,
            &quot;pageSize&quot;,
            &quot;total&quot;,
            &quot;list&quot;:[
              {
                &quot;title&quot;:&quot;成都市&quot;,
                &quot;english&quot;:&quot;chengdushi&quot;,
                &quot;id&quot;:1
              },
              {
                &quot;title&quot;:&quot;绵阳市&quot;,
                &quot;english&quot;:&quot;mianyangshi&quot;,
                &quot;id&quot;:2
              },
              {
                &quot;title&quot;:&quot;自贡市&quot;,
                &quot;english&quot;:&quot;zigongshi&quot;,
                &quot;id&quot;:3
              },
              {
                &quot;title&quot;:&quot;泸州市&quot;,
                &quot;english&quot;:&quot;luzhoushi&quot;,
                &quot;id&quot;:4
              },
              {
                &quot;title&quot;:&quot;阿坝藏族羌族自治州&quot;,
                &quot;english&quot;:&quot;abazangzuqiangzuzhizhizhou&quot;,
                &quot;id&quot;:5
              },
              {
                &quot;title&quot;:&quot;凉山彝族自治州&quot;,
                &quot;english&quot;:&quot;liangshanyizuzhizhizhou&quot;,
                &quot;id&quot;:6
              }
            ]
          }
        }
      };
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


    <h3 class="sino-compon-h3">单选下拉框-模糊查询</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-select :tipText="'请选择'"
                     :filterable="true"
                     :multiselect="false"
                     :isshowTotol="false"
                     :disabled="false"
                     :totalNum="false"
                     :isPage="false"
                     :isGroup="false"
                     :chooseName.sync="name3"
                     :chooseId.sync="id3" :clear="true"
                     method='GET'
                     :url="localHref + '/selectArray.json'"></sino-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                :filterable=&quot;true&quot; :multiselect=&quot;false&quot;
                :isshowTotol=&quot;false&quot; :disabled=&quot;false&quot;
                :totalNum=&quot;false&quot; :isPage=&quot;false&quot;
                :isGroup=&quot;false&quot;
                :chooseName.sync=&quot;name3&quot;
                :chooseId.sync=&quot;id3&quot;
                :clear=&quot;true&quot;
                method=&#39;GET&#39;
                :url=&quot;localHref + &#39;/selectArray.json&#39;&quot;&gt;&lt;/sino-select&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        name3: &#39;&#39;,
        id3: &#39;&#39;,
        data: {
          &quot;code&quot;:200,
          &quot;message&quot;:111,
          &quot;data&quot;: {
            &quot;pageNum&quot;,
            &quot;pageSize&quot;,
            &quot;total&quot;,
            &quot;list&quot;:[
              {
                &quot;title&quot;:&quot;成都市&quot;,
                &quot;english&quot;:&quot;chengdushi&quot;,
                &quot;id&quot;:1
              },
              {
                &quot;title&quot;:&quot;绵阳市&quot;,
                &quot;english&quot;:&quot;mianyangshi&quot;,
                &quot;id&quot;:2
              },
              {
                &quot;title&quot;:&quot;自贡市&quot;,
                &quot;english&quot;:&quot;zigongshi&quot;,
                &quot;id&quot;:3
              },
              {
                &quot;title&quot;:&quot;泸州市&quot;,
                &quot;english&quot;:&quot;luzhoushi&quot;,
                &quot;id&quot;:4
              },
              {
                &quot;title&quot;:&quot;阿坝藏族羌族自治州&quot;,
                &quot;english&quot;:&quot;abazangzuqiangzuzhizhizhou&quot;,
                &quot;id&quot;:5
              },
              {
                &quot;title&quot;:&quot;凉山彝族自治州&quot;,
                &quot;english&quot;:&quot;liangshanyizuzhizhizhou&quot;,
                &quot;id&quot;:6
              }
            ]
          }
        }
      };
    }
  };
&lt;/script&gt;</pre>

            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show2 = !show2">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show2,'sino-angle-double-up':show2}"></i>
        <span v-if="!show2">显示代码</span>
        <span v-if="show2">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">多选下拉框基本用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-select :tipText="'请选择'"
                     :filterable="false"
                     :multiselect="true"
                     :isshowTotol="false"
                     :disabled="false"
                     :totalNum="false"
                     :isPage="false" :isGroup="false"
                     :chooseName.sync="name4" :chooseId.sync="id4"
                     method='GET'
                     :url="localHref + '/selectArray.json'"></sino-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show3">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                :filterable=&quot;false&quot; :multiselect=&quot;true&quot;
                :isshowTotol=&quot;false&quot; :disabled=&quot;false&quot;
                :totalNum=&quot;false&quot; :isPage=&quot;false&quot;
                :isGroup=&quot;false&quot;
                :chooseName.sync=&quot;name4&quot;
                :chooseId.sync=&quot;id4&quot;
                method=&#39;GET&#39;
                :url=&quot;localHref + &#39;/selectArray.json&#39;&quot;&gt;&lt;/sino-select&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        name4: [],
        id4: [],
        data: {
          &quot;code&quot;:200,
          &quot;message&quot;:111,
          &quot;data&quot;: {
            &quot;pageNum&quot;,
            &quot;pageSize&quot;,
            &quot;total&quot;,
            &quot;list&quot;:[
              {
                &quot;title&quot;:&quot;成都市&quot;,
                &quot;english&quot;:&quot;chengdushi&quot;,
                &quot;id&quot;:1
              },
              {
                &quot;title&quot;:&quot;绵阳市&quot;,
                &quot;english&quot;:&quot;mianyangshi&quot;,
                &quot;id&quot;:2
              },
              {
                &quot;title&quot;:&quot;自贡市&quot;,
                &quot;english&quot;:&quot;zigongshi&quot;,
                &quot;id&quot;:3
              },
              {
                &quot;title&quot;:&quot;泸州市&quot;,
                &quot;english&quot;:&quot;luzhoushi&quot;,
                &quot;id&quot;:4
              },
              {
                &quot;title&quot;:&quot;阿坝藏族羌族自治州&quot;,
                &quot;english&quot;:&quot;abazangzuqiangzuzhizhizhou&quot;,
                &quot;id&quot;:5
              },
              {
                &quot;title&quot;:&quot;凉山彝族自治州&quot;,
                &quot;english&quot;:&quot;liangshanyizuzhizhizhou&quot;,
                &quot;id&quot;:6
              }
            ]
          }
        }
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show3 = !show3">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show3,'sino-angle-double-up':show3}"></i>
        <span v-if="!show3">显示代码</span>
        <span v-if="show3">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">多选下拉框-模糊查询</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-select :tipText="'请选择'"
                     :filterable="true"
                     :multiselect="true" :isshowTotol="false"
                     :disabled="false" :totalNum="false"
                     :isPage="false" :isGroup="false"
                     :chooseName.sync="name5"
                     :chooseId.sync="id5" :clear="true" method='GET'
                     :url="localHref + '/selectArray.json'"></sino-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show4">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                :filterable=&quot;true&quot; :multiselect=&quot;true&quot; :isshowTotol=&quot;false&quot;
                :disabled=&quot;false&quot; :totalNum=&quot;false&quot;
                :isPage=&quot;false&quot; :isGroup=&quot;false&quot;
                :chooseName.sync=&quot;name5&quot;
                :chooseId.sync=&quot;id5&quot; :clear=&quot;true&quot; method=&#39;GET&#39;
                :url=&quot;localHref + &#39;/selectArray.json&#39;&quot;&gt;&lt;/sino-select&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        name5: [],
        id5: [],
        data: {
          &quot;current&quot;:1,
          &quot;total&quot;:2,
          &quot;data&quot;: {
            &quot;list&quot;:[
              {
                &quot;title&quot;:&quot;成都市&quot;,
                &quot;english&quot;:&quot;chengdushi&quot;,
                &quot;id&quot;:1
              },
              {
                &quot;title&quot;:&quot;绵阳市&quot;,
                &quot;english&quot;:&quot;mianyangshi&quot;,
                &quot;id&quot;:2
              },
              {
                &quot;title&quot;:&quot;自贡市&quot;,
                &quot;english&quot;:&quot;zigongshi&quot;,
                &quot;id&quot;:3
              },
              {
                &quot;title&quot;:&quot;泸州市&quot;,
                &quot;english&quot;:&quot;luzhoushi&quot;,
                &quot;id&quot;:4
              },
              {
                &quot;title&quot;:&quot;阿坝藏族羌族自治州&quot;,
                &quot;english&quot;:&quot;abazangzuqiangzuzhizhizhou&quot;,
                &quot;id&quot;:5
              },
              {
                &quot;title&quot;:&quot;凉山彝族自治州&quot;,
                &quot;english&quot;:&quot;liangshanyizuzhizhizhou&quot;,
                &quot;id&quot;:6
              }
            ]
          }
        }
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show4 = !show4">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show4,'sino-angle-double-up':show4}"></i>
        <span v-if="!show4">显示代码</span>
        <span v-if="show4">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">分组下拉框-单选</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-select :tipText="'请选择'"
                     :filterable="true"
                     :multiselect="false"
                     :isshowTotol="false"
                     :disabled="false"
                     :totalNum="false"
                     :isPage="false"
                     :isGroup="true"
                     :chooseName.sync="name6"
                     :chooseId.sync="id6"
                     method='GET' :url="localHref + '/itemGroup.json'"></sino-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show5">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                :filterable=&quot;true&quot; :multiselect=&quot;false&quot;
                :isshowTotol=&quot;false&quot; :disabled=&quot;false&quot;
                :totalNum=&quot;false&quot; :isPage=&quot;false&quot;
                :isGroup=&quot;true&quot; :chooseName.sync=&quot;name6&quot;
                :chooseId.sync=&quot;id6&quot; method=&#39;GET&#39;
                :url=&quot;localHref + &#39;/itemGroup.json&#39;&quot;&gt;&lt;/sino-select&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        name6: &#39;&#39;,
        id6: &#39;&#39;,
        data: {
          &quot;code&quot;:200,
          &quot;message&quot;:111,
          &quot;data&quot;: {
            &quot;pageNum&quot;,
            &quot;pageSize&quot;,
            &quot;total&quot;,
            &quot;list&quot;: [
              {
                &quot;name&quot;: &quot;山西&quot;,
                &quot;english&quot;:&quot;shanxi&quot;,
                &quot;id&quot;: 1,
                &quot;option&quot;: [
                  {
                    &quot;title&quot;: &quot;太原&quot;,
                    &quot;english&quot;:&quot;taiyuan&quot;,
                    &quot;id&quot;: 11
                  },
                  {
                    &quot;title&quot;: &quot;大同&quot;,
                    &quot;english&quot;:&quot;datong&quot;,
                    &quot;id&quot;: 12
                  },
                  {
                    &quot;title&quot;: &quot;忻州&quot;,
                    &quot;english&quot;:&quot;xinzhou&quot;,
                    &quot;id&quot;: 13
                  },
                  {
                    &quot;title&quot;: &quot;吕梁&quot;,
                    &quot;english&quot;:&quot;lvliang&quot;,
                    &quot;id&quot;: 15
                  }
                ]
              },
              {
                &quot;name&quot;: &quot;内蒙古&quot;,
                &quot;english&quot;:&quot;neimenggu&quot;,
                &quot;id&quot;: 2,
                &quot;option&quot;: [
                  {
                    &quot;title&quot;: &quot;呼和浩特&quot;,
                    &quot;english&quot;:&quot;huhehaote&quot;,
                    &quot;id&quot;: 21
                  },
                  {
                    &quot;title&quot;: &quot;乌兰察布&quot;,
                    &quot;english&quot;:&quot;wulanchabu&quot;,
                    &quot;id&quot;: 22
                  },
                  {
                    &quot;title&quot;: &quot;包头&quot;,
                    &quot;english&quot;:&quot;baotou&quot;,
                    &quot;id&quot;: 23
                  },
                  {
                    &quot;title&quot;: &quot;乌海&quot;,
                    &quot;english&quot;:&quot;wuhai&quot;,
                    &quot;id&quot;: 24
                  }
                ]
              }
            ]
          }
        }
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show5 = !show5">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show5,'sino-angle-double-up':show5}"></i>
        <span v-if="!show5">显示代码</span>
        <span v-if="show5">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">分组下拉框-多选</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-select :tipText="'请选择'"
                     :filterable="true"
                     :multiselect="true"
                     :isshowTotol="false"
                     :disabled="false"
                     :totalNum="false"
                     :isPage="false" :isGroup="true"
                     :chooseName.sync="name7"
                     :chooseId.sync="id7" :clear="true" method='GET'
                     :url="localHref + '/itemGroup.json'"></sino-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show6">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                :filterable=&quot;true&quot;
                :multiselect=&quot;true&quot;
                :isshowTotol=&quot;false&quot; :disabled=&quot;false&quot;
                :totalNum=&quot;false&quot; :isPage=&quot;false&quot; :isGroup=&quot;true&quot;
                :chooseName.sync=&quot;name7&quot;
                :chooseId.sync=&quot;id7&quot; :clear=&quot;true&quot;
                method=&#39;GET&#39; :url=&quot;localHref + &#39;/itemGroup.json&#39;&quot;&gt;&lt;/sino-select&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        name7: [],
        id7: [],
        data: {
          &quot;code&quot;:200,
          &quot;message&quot;:111,
          &quot;data&quot;: {
            &quot;pageNum&quot;,
            &quot;pageSize&quot;,
            &quot;total&quot;,
            &quot;list&quot;: [
              {
                &quot;name&quot;: &quot;山西&quot;,
                &quot;english&quot;:&quot;shanxi&quot;,
                &quot;id&quot;: 1,
                &quot;option&quot;: [
                  {
                    &quot;title&quot;: &quot;太原&quot;,
                    &quot;english&quot;:&quot;taiyuan&quot;,
                    &quot;id&quot;: 11
                  },
                  {
                    &quot;title&quot;: &quot;大同&quot;,
                    &quot;english&quot;:&quot;datong&quot;,
                    &quot;id&quot;: 12
                  },
                  {
                    &quot;title&quot;: &quot;忻州&quot;,
                    &quot;english&quot;:&quot;xinzhou&quot;,
                    &quot;id&quot;: 13
                  },
                  {
                    &quot;title&quot;: &quot;吕梁&quot;,
                    &quot;english&quot;:&quot;lvliang&quot;,
                    &quot;id&quot;: 15
                  }
                ]
              },
              {
                &quot;name&quot;: &quot;内蒙古&quot;,
                &quot;english&quot;:&quot;neimenggu&quot;,
                &quot;id&quot;: 2,
                &quot;option&quot;: [
                  {
                    &quot;title&quot;: &quot;呼和浩特&quot;,
                    &quot;english&quot;:&quot;huhehaote&quot;,
                    &quot;id&quot;: 21
                  },
                  {
                    &quot;title&quot;: &quot;乌兰察布&quot;,
                    &quot;english&quot;:&quot;wulanchabu&quot;,
                    &quot;id&quot;: 22
                  },
                  {
                    &quot;title&quot;: &quot;包头&quot;,
                    &quot;english&quot;:&quot;baotou&quot;,
                    &quot;id&quot;: 23
                  },
                  {
                    &quot;title&quot;: &quot;乌海&quot;,
                    &quot;english&quot;:&quot;wuhai&quot;,
                    &quot;id&quot;: 24
                  }
                ]
              }
            ]
          }
        }
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show6 = !show6">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show6,'sino-angle-double-up':show6}"></i>
        <span v-if="!show6">显示代码</span>
        <span v-if="show6">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">下拉框-分页单选</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-select :tipText="'请选择'"
                     :filterable="true" :multiselect="false"
                     :isshowTotol="false" :disabled="false"
                     :totalNum="false" :isPage="true"
                     :isGroup="false" :chooseName.sync="name8"
                     :chooseId.sync="id8" method='GET'
                     :url="localHref + '/selectArray.json'"></sino-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show7">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                :filterable=&quot;true&quot; :multiselect=&quot;false&quot;
                :isshowTotol=&quot;false&quot; :disabled=&quot;false&quot;
                :totalNum=&quot;false&quot; :isPage=&quot;true&quot;
                :isGroup=&quot;false&quot; :chooseName.sync=&quot;name8&quot;
                :chooseId.sync=&quot;id8&quot; method=&#39;GET&#39;
                :url=&quot;localHref + &#39;/selectArray.json&#39;&quot;&gt;&lt;/sino-select&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        name8: '',
        id8: '',
        data: {
          &quot;code&quot;:200,
          &quot;message&quot;:111,
          &quot;data&quot;: {
            &quot;pageNum&quot;,
            &quot;pageSize&quot;,
            &quot;total&quot;,
            &quot;list&quot;:[
              {
                &quot;title&quot;:&quot;成都市&quot;,
                &quot;english&quot;:&quot;chengdushi&quot;,
                &quot;id&quot;:1
              },
              {
                &quot;title&quot;:&quot;绵阳市&quot;,
                &quot;english&quot;:&quot;mianyangshi&quot;,
                &quot;id&quot;:2
              },
              {
                &quot;title&quot;:&quot;自贡市&quot;,
                &quot;english&quot;:&quot;zigongshi&quot;,
                &quot;id&quot;:3
              },
              {
                &quot;title&quot;:&quot;泸州市&quot;,
                &quot;english&quot;:&quot;luzhoushi&quot;,
                &quot;id&quot;:4
              },
              {
                &quot;title&quot;:&quot;阿坝藏族羌族自治州&quot;,
                &quot;english&quot;:&quot;abazangzuqiangzuzhizhizhou&quot;,
                &quot;id&quot;:5
              },
              {
                &quot;title&quot;:&quot;凉山彝族自治州&quot;,
                &quot;english&quot;:&quot;liangshanyizuzhizhizhou&quot;,
                &quot;id&quot;:6
              }
            ]
          }
        }
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show7 = !show7">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show7,'sino-angle-double-up':show7}"></i>
        <span v-if="!show7">显示代码</span>
        <span v-if="show7">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">下拉框-分页多选</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-select :tipText="'请选择'"
                     :filterable="true"
                     :multiselect="true"
                     :isshowTotol="false"
                     :disabled="false"
                     :totalNum="false"
                     :isPage="true"
                     :isGroup="false"
                     :chooseName.sync="name9"
                     :chooseId.sync="id9" :clear="true" method='GET'
                     :url="localHref + '/selectArray.json'"></sino-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show8">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                :filterable=&quot;true&quot; :multiselect=&quot;true&quot;
                :isshowTotol=&quot;false&quot; :disabled=&quot;false&quot;
                :totalNum=&quot;false&quot; :isPage=&quot;true&quot;
                :isGroup=&quot;false&quot; :chooseName.sync=&quot;name9&quot;
                :chooseId.sync=&quot;id9&quot; :clear=&quot;true&quot;
                method=&#39;GET&#39; :url=&quot;localHref + &#39;/selectArray.json&#39;&quot;&gt;&lt;/sino-select&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        name9: [],
        id9: [],
        data: {
          &quot;code&quot;:200,
          &quot;message&quot;:111,
          &quot;data&quot;: {
            &quot;pageNum&quot;,
            &quot;pageSize&quot;,
            &quot;total&quot;,
            &quot;list&quot;:[
              {
                &quot;title&quot;:&quot;成都市&quot;,
                &quot;english&quot;:&quot;chengdushi&quot;,
                &quot;id&quot;:1
              },
              {
                &quot;title&quot;:&quot;绵阳市&quot;,
                &quot;english&quot;:&quot;mianyangshi&quot;,
                &quot;id&quot;:2
              },
              {
                &quot;title&quot;:&quot;自贡市&quot;,
                &quot;english&quot;:&quot;zigongshi&quot;,
                &quot;id&quot;:3
              },
              {
                &quot;title&quot;:&quot;泸州市&quot;,
                &quot;english&quot;:&quot;luzhoushi&quot;,
                &quot;id&quot;:4
              },
              {
                &quot;title&quot;:&quot;阿坝藏族羌族自治州&quot;,
                &quot;english&quot;:&quot;abazangzuqiangzuzhizhizhou&quot;,
                &quot;id&quot;:5
              },
              {
                &quot;title&quot;:&quot;凉山彝族自治州&quot;,
                &quot;english&quot;:&quot;liangshanyizuzhizhizhou&quot;,
                &quot;id&quot;:6
              }
            ]
          }
        }
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show8 = !show8">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show8,'sino-angle-double-up':show8}"></i>
        <span v-if="!show8">显示代码</span>
        <span v-if="show8">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">下拉框调取后台</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-select :tipText="'请选择'" :filterable="false"
                     :multiselect="false" :isshowTotol="false"
                     :disabled="false" :totalNum="false" :isPage="true"
                     :isGroup="false"    :chooseName.sync="name10"
                     :chooseId.sync="id10" :clear="true" :data="{}"
                     :url="this.apiPath.hrsc.areaSelectBox"></sino-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show9">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-select :tipText=&quot;&#39;请选择&#39;&quot;
                :filterable=&quot;false&quot; :multiselect=&quot;false&quot;
                :isshowTotol=&quot;false&quot; :disabled=&quot;false&quot;
                :totalNum=&quot;false&quot; :isPage=&quot;true&quot;
                :isGroup=&quot;false&quot;
                :chooseName.sync=&quot;name10&quot;
                :chooseId.sync=&quot;id10&quot; :clear=&quot;true&quot; :data=&quot;{}&quot;
                :url=&quot;this.apiPath.author.findUserSelectBoxInfo&quot;&gt;&lt;/sino-select&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        name10: &#39;&#39;,
        id10: &#39;&#39;,
        data: {传参},
        localHref: window.location.href.split(&#39;#&#39;)[0]
        data: { //返回
         &quot;code&quot;:200,
          &quot;message&quot;:111,
          &quot;data&quot;: {
            &quot;pageNum&quot;,
            &quot;pageSize&quot;,
            &quot;total&quot;,
            &quot;list&quot;:[
              {
                &quot;title&quot;:&quot;成都市&quot;,
                &quot;english&quot;:&quot;chengdushi&quot;,
                &quot;id&quot;:1
              },
              {
                &quot;title&quot;:&quot;绵阳市&quot;,
                &quot;english&quot;:&quot;mianyangshi&quot;,
                &quot;id&quot;:2
              },
              {
                &quot;title&quot;:&quot;自贡市&quot;,
                &quot;english&quot;:&quot;zigongshi&quot;,
                &quot;id&quot;:3
              },
              {
                &quot;title&quot;:&quot;泸州市&quot;,
                &quot;english&quot;:&quot;luzhoushi&quot;,
                &quot;id&quot;:4
              },
              {
                &quot;title&quot;:&quot;阿坝藏族羌族自治州&quot;,
                &quot;english&quot;:&quot;abazangzuqiangzuzhizhizhou&quot;,
                &quot;id&quot;:5
              },
              {
                &quot;title&quot;:&quot;凉山彝族自治州&quot;,
                &quot;english&quot;:&quot;liangshanyizuzhizhizhou&quot;,
                &quot;id&quot;:6
              }
            ]
          }
        }
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show9 = !show9">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show9,'sino-angle-double-up':show9}"></i>
        <span v-if="!show9">显示代码</span>
        <span v-if="show9">收起代码</span>
      </div>
    </div>


  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        name1: '',
        id1: '',
        name2: '吃饭',
        id2: 1,
        name3: '',
        id3: '',
        name4: [],
        id4: [],
        name5: [],
        id5: [],
        name6: '',
        id6: '',
        name7: [],
        id7: [],
        name8: '',
        id8: '',
        name9: [],
        id9: [],
        name10: '',
        id10: '',
        data: {},
        localHref: window.location.href.split('#')[0],
        show: false,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        show9: false,
        show10: false,
        options5: [{
          value: 'HTML',
          title: 'HTML',
          id: 1
        }, {
          value: 'CSS',
          title: 'CSS',
          id: 2
        }, {
          value: 'JavaScript',
          title: 'JavaScript',
          id: 3
        }],
        value10: []
      };
    },
    watch: {
      'value10': function (item) {
        console.log(item);
      }
    }
  };
</script>
