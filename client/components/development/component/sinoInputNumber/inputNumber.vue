<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">InputNumber 计数器</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input-number v-model="num1" @change="handleChange"></sino-input-number>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input-number v-model=&quot;num1&quot; @change=&quot;handleChange&quot;&gt;&lt;/sino-input-number&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        num1: &#39;0&#39;
      };
    },
    methods: {
      handleChange (value) {
        console.log(value);
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


    <h3 class="sino-compon-h3">限制范围</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input-number v-model="num2" @change="handleChange" :min="1" :max="10"></sino-input-number>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input-number v-model=&quot;num2&quot; @change=&quot;handleChange&quot; :min=&quot;1&quot; :max=&quot;10&quot;&gt;&lt;/sino-input-number&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        num2: &#39;1&#39;
      };
    },
    methods: {
      handleChange (value) {
        console.log(value);
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


    <h3 class="sino-compon-h3">禁用状态</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input-number v-model="num3" @change="handleChange" :disabled="true"></sino-input-number>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input-number v-model=&quot;num3&quot; @change=&quot;handleChange&quot; :disabled=&quot;true&quot;&gt;&lt;/sino-input-number&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        num3: &#39;5&#39;
      };
    },
    methods: {
      handleChange (value) {
        console.log(value);
      }
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

  </div>
</template>

<script>
  export default{
    components: {},
    data () {
      return {
        show: false,
        show1: false,
        show2: false,
        num1: '0',
        num2: '1',
        num3: '5'
      };
    },
    methods: {
      handleChange (value) {
        console.log(value);
      }
    }
  };
</script>
