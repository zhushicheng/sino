<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Switch 开关</h2>
    <h3 class="sino-compon-h3">基础用法</h3>

    <div class="demo-block">
      <div class="demo-source">
        <sino-switch v-model="value1" on-color="#ffc333" off-color="#999999"></sino-switch>
        <sino-switch v-model="value3" on-color="#ffc333" off-color="#999999"></sino-switch>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-switch v-model=&quot;value1&quot; on-color=&quot;#ffc333&quot; off-color=&quot;#999999&quot;&gt;&lt;/sino-switch&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        value1: true
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

    <h3 class="sino-compon-h3">禁用状态</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-switch v-model="value2" disabled></sino-switch>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-switch v-model=&quot;value2&quot; disabled&gt;&lt;/sino-switch&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        value2: true
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

  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        show: false,
        show1: false,
        value1: true,
        value3: false,
        value2: true
      };
    }
  };
</script>
