<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Steps 步骤条</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-steps :space="150" :active="active" finish-status="success" style="margin-left: 10px;">
          <sino-step :title="list.title" :description="list.description" v-for="(list,index) in lists" :key="index">
          </sino-step>
        </sino-steps>
        <sino-button style="margin-top: 12px;" @click="next">下一步</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-steps :space=&quot;150&quot; :active=&quot;active&quot; finish-status=&quot;success&quot; style=&quot;margin-left: 10px;&quot;&gt;
    &lt;sino-step :title=&quot;list.title&quot; :description=&quot;list.description&quot; v-for=&quot;(list,index) in lists&quot;&gt;
    &lt;/sino-step&gt;
  &lt;/sino-steps&gt;
  &lt;sino-button style=&quot;margin-top: 12px;&quot; @click=&quot;next&quot;&gt;下一步&lt;/sino-button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        active: 1,
        lists: [
          {title: &#39;步骤1&#39;, description: &#39;描述信息&#39;},
          {title: &#39;步骤2&#39;, description: &#39;描述信息&#39;},
          {title: &#39;步骤3&#39;, description: &#39;描述信息&#39;},
          {title: &#39;步骤4&#39;, description: &#39;描述信息&#39;}
        ]
      };
    },
    methods: {
      next () {
        if (this.active++ &gt; 4) this.active = 5;
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


    <h3 class="sino-compon-h3">各种样式</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-steps :space="100" :active="1" finish-status="success" style="margin-left: 10px;">
          <sino-step title="步骤1" status="finish"></sino-step>
          <sino-step title="步骤2" status="success"></sino-step>
          <sino-step title="步骤3" status="error"></sino-step>
          <sino-step title="步骤4" status="wait"></sino-step>
        </sino-steps>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-steps :space=&quot;100&quot; :active=&quot;1&quot; finish-status=&quot;success&quot; style=&quot;margin-left: 10px;&quot;&gt;
  &lt;sino-step title=&quot;步骤1&quot; status=&quot;finish&quot;&gt;&lt;/sino-step&gt;
  &lt;sino-step title=&quot;步骤2&quot; status=&quot;success&quot;&gt;&lt;/sino-step&gt;
  &lt;sino-step title=&quot;步骤3&quot; status=&quot;error&quot;&gt;&lt;/sino-step&gt;
  &lt;sino-step title=&quot;步骤4&quot; status=&quot;wait&quot;&gt;&lt;/sino-step&gt;
&lt;/sino-steps&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {}
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
  export default{
    components: {},
    data () {
      return {
        show: false,
        show1: false,
        active: 1,
        lists: [
          {title: '步骤1', description: '描述信息'},
          {title: '步骤2', description: '描述信息'},
          {title: '步骤3', description: '描述信息'},
          {title: '步骤4', description: '描述信息'}
        ]
      };
    },
    methods: {
      next () {
        if (this.active++ > 4) this.active = 5;
      }
    }
  };
</script>
