<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Breadcrumb 面包屑</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-breadcrumb>
          <sino-breadcrumb-item :to="{ path: '/' }">首页</sino-breadcrumb-item>
          <sino-breadcrumb-item onclick="return false">活动管理</sino-breadcrumb-item>
          <sino-breadcrumb-item onclick="return false">活动列表</sino-breadcrumb-item>
          <sino-breadcrumb-item onclick="return false">活动详情</sino-breadcrumb-item>
        </sino-breadcrumb>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-breadcrumb&gt;
     &lt;sino-breadcrumb-item :to=&quot;{ path: &#39;/&#39; }&quot;&gt;首页&lt;/sino-breadcrumb-item&gt;
     &lt;sino-breadcrumb-item onclick=&quot;return false&quot;&gt;活动管理&lt;/sino-breadcrumb-item&gt;
     &lt;sino-breadcrumb-item onclick=&quot;return false&quot;&gt;活动列表&lt;/sino-breadcrumb-item&gt;
     &lt;sino-breadcrumb-item onclick=&quot;return false&quot;&gt;活动详情&lt;/sino-breadcrumb-item&gt;
   &lt;/sino-breadcrumb&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {};
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      };
    }
  };
</script>
