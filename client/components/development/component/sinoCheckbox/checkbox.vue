<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Checkbox 多选框</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-checkbox v-model="checked">复选框</sino-checkbox>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-checkbox v-model=&quot;checked&quot;&gt;复选框&lt;/sino-checkbox&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data () {
      return {
        checked: true
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">在<code>sino-checkbox</code>元素中定义<code>v-model</code>绑定变量，单一的<code>checkbox</code>中，默认绑定变量的值会是<code>Boolean</code>，选中为<code>true</code></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show = !show">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
        <span v-if="!show">显示代码</span>
        <span v-if="show">收起代码</span>
      </div>
    </div>
    <h3 class="sino-compon-h3">禁用状态</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-checkbox v-model="checked" disabled>复选框</sino-checkbox>
        <sino-checkbox v-model="checkedDis" disabled>复选框</sino-checkbox>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="showDis">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-checkbox v-model=&quot;checked&quot; disabled&gt;复选框&lt;/sino-checkbox&gt;
  &lt;sino-checkbox v-model=&quot;checkedDis&quot; disabled&gt;复选框&lt;/sino-checkbox&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data () {
      return {
        checked: true,
        checkedDis: false,
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">注意：请牢记，选中的条件是绑定的变量值等于
            <code>label</code>中的值。只要在
            <code>sino-checkbox</code>元素中设置
            <code>disabled</code>属性即可，它接受一个
            <code>Boolean</code>，<code>true</code>为禁用。</div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="showDis = !showDis">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!showDis,'sino-angle-double-up':showDis}"></i>
        <span v-if="!showDis">显示代码</span>
        <span v-if="showDis">收起代码</span>
      </div>
    </div>
    <h3 class="sino-compon-h3">多选框组</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-checkbox-group v-model="checksdf">
          <sino-checkbox label="复选框 A"></sino-checkbox>
          <sino-checkbox label="复选框 B"></sino-checkbox>
          <sino-checkbox label="复选框 C"></sino-checkbox>
          <sino-checkbox label="禁用" disabled></sino-checkbox>
          <sino-checkbox label="选中且禁用" disabled></sino-checkbox>
        </sino-checkbox-group>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-checkbox-group v-model=&quot;checksdf&quot;&gt;
    &lt;sino-checkbox label=&quot;复选框 A&quot;&gt;&lt;/sino-checkbox&gt;
    &lt;sino-checkbox label=&quot;复选框 B&quot;&gt;&lt;/sino-checkbox&gt;
    &lt;sino-checkbox label=&quot;复选框 C&quot;&gt;&lt;/sino-checkbox&gt;
    &lt;sino-checkbox label=&quot;禁用&quot; disabled&gt;&lt;/sino-checkbox&gt;
    &lt;sino-checkbox label=&quot;选中且禁用&quot; disabled&gt;&lt;/sino-checkbox&gt;
  &lt;/sino-checkbox-group&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data () {
      return {
        checksdf: [&#39;选中且禁用&#39;, &#39;复选框 A&#39;]
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">
            <code>checkbox-group</code>元素能把多个
            <code>checkbox</code> 管理为一组，只需要在
            <code>Group</code> 中使用<code>v-model</code>绑定
            <code>Array</code>类型的变量即可。
            <code>sino-checkbox</code> 的
            <code>label</code>属性是该 <code>checkbox</code> 对应的值，若该标签中无内容，则该属性也充当
            <code>checkbox</code> 按钮后的介绍。<code>label</code>
            与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。</div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show1 = !show1">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show1,'sino-angle-double-up':show1}"></i>
        <span v-if="!show1">显示代码</span>
        <span v-if="show1">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">indeterminate 状态</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</sino-checkbox>
        <sino-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <sino-checkbox v-for="(city, index) in cities" :label="city" :key="city">{{city}}</sino-checkbox>
        </sino-checkbox-group>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-checkbox :indeterminate=&quot;isIndeterminate&quot; v-model=&quot;checkAll&quot; @change=&quot;handleCheckAllChange&quot;&gt;全选&lt;/sino-checkbox&gt;
  &lt;sino-checkbox-group v-model=&quot;checkedCities&quot; @change=&quot;handleCheckedCitiesChange&quot;&gt;
    &lt;sino-checkbox v-for=&quot;city in cities&quot; :label=&quot;city&quot; :key=&quot;city&quot;&gt;{{city}}&lt;/sino-checkbox&gt;
  &lt;/sino-checkbox-group&gt;
&lt;/template&gt;
&lt;script&gt;
  const cityOptions = [&#39;上海&#39;, &#39;北京&#39;, &#39;广州&#39;, &#39;深圳&#39;];
  export default {
    data () {
      return {
        checkAll: false,
        checkedCities: [&#39;上海&#39;, &#39;北京&#39;],
        cities: cityOptions,
        isIndeterminate: true,
        city: &#39;&#39;
      };
    },
    methods: {
      handleCheckAllChange (event) {
        this.checkedCities = event.target.checked ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange (value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount &gt; 0 &amp;&amp; checkedCount &lt; this.cities.length;
      }
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">全选不全选</div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show2 = !show2">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show2,'sino-angle-double-up':show2}"></i>
        <span v-if="!show2">显示代码</span>
        <span v-if="show2">收起代码</span>
      </div>
    </div>
  </div>
</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data () {
      return {
        show: false,
        showDis: false,
        show1: false,
        show2: false,
        checked: true,
        checkedDis: false,
        checksdf: ['选中且禁用', '复选框 A'],
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,
        city: ''
      };
    },
    methods: {
      handleCheckAllChange (event) {
        this.checkedCities = event.target.checked ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange (value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  };
</script>
