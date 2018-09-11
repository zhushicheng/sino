<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Tooltip 文字提示</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <div class="box">
          <div class="top">
            <sino-tooltip class="item" effect="dark" content="Top提示文字" placement="top">
              <sino-button>上</sino-button>
            </sino-tooltip>
          </div>
          <div class="left">
            <sino-tooltip class="item" effect="dark" content="Left提示文字" placement="left">
              <sino-button>左</sino-button>
            </sino-tooltip>
          </div>
          <div class="right">
            <sino-tooltip class="item" effect="dark" content="Right提示文字" placement="right">
              <sino-button>右</sino-button>
            </sino-tooltip>
          </div>
          <div class="bottom">
            <sino-tooltip class="item" effect="dark" content="Bottom提示文字" placement="bottom">
              <sino-button>下</sino-button>
            </sino-tooltip>
          </div>
        </div>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;div class=&quot;box&quot;&gt;
      &lt;div class=&quot;top&quot;&gt;
        &lt;sino-tooltip class=&quot;item&quot; effect=&quot;dark&quot; content=&quot;Top提示文字&quot; placement=&quot;top&quot;&gt;
          &lt;sino-button&gt;上&lt;/sino-button&gt;
        &lt;/sino-tooltip&gt;
      &lt;/div&gt;
      &lt;div class=&quot;left&quot;&gt;
        &lt;sino-tooltip class=&quot;item&quot; effect=&quot;dark&quot; content=&quot;Left提示文字&quot; placement=&quot;left&quot;&gt;
          &lt;sino-button&gt;左&lt;/sino-button&gt;
        &lt;/sino-tooltip&gt;
      &lt;/div&gt;
      &lt;div class=&quot;right&quot;&gt;
        &lt;sino-tooltip class=&quot;item&quot; effect=&quot;dark&quot; content=&quot;Right提示文字&quot; placement=&quot;right&quot;&gt;
          &lt;sino-button&gt;右&lt;/sino-button&gt;
        &lt;/sino-tooltip&gt;
      &lt;/div&gt;
      &lt;div class=&quot;bottom&quot;&gt;
        &lt;sino-tooltip class=&quot;item&quot; effect=&quot;dark&quot; content=&quot;Bottom提示文字&quot; placement=&quot;bottom&quot;&gt;
          &lt;sino-button&gt;下&lt;/sino-button&gt;
        &lt;/sino-tooltip&gt;
      &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;style&gt;
  .box {
    width: 400px;
  }

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
    margin-right:76px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .sino-tooltip__popper, .right .sino-tooltip__popper {
    padding: 8px 10px;
  }
&lt;/style&gt;
&lt;script&gt;
  export  default{
    components: {}
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


    <h3 class="sino-compon-h3">背景为白色</h3>
    <div class="demo-block">
      <div class="demo-source">
        <div class="box">
          <div class="top">
            <sino-tooltip class="item" effect="light" content="Top提示文字" placement="top">
              <sino-button>上</sino-button>
            </sino-tooltip>
          </div>
          <div class="left">
            <sino-tooltip class="item" effect="light" content="Left提示文字" placement="left">
              <sino-button>左</sino-button>
            </sino-tooltip>
          </div>
          <div class="right">
            <sino-tooltip class="item" effect="light" content="Right提示文字" placement="right">
              <sino-button>右</sino-button>
            </sino-tooltip>
          </div>
          <div class="bottom">
            <sino-tooltip class="item" effect="light" content="Bottom提示文字" placement="bottom">
              <sino-button>下</sino-button>
            </sino-tooltip>
          </div>
        </div>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;div class=&quot;box&quot;&gt;
  &lt;div class=&quot;top&quot;&gt;
    &lt;sino-tooltip class=&quot;item&quot; effect=&quot;light&quot; content=&quot;Top提示文字&quot; placement=&quot;top&quot;&gt;
      &lt;sino-button&gt;上&lt;/sino-button&gt;
    &lt;/sino-tooltip&gt;
  &lt;/div&gt;
  &lt;div class=&quot;left&quot;&gt;
    &lt;sino-tooltip class=&quot;item&quot; effect=&quot;light&quot; content=&quot;Left提示文字&quot; placement=&quot;left&quot;&gt;
      &lt;sino-button&gt;左&lt;/sino-button&gt;
    &lt;/sino-tooltip&gt;
  &lt;/div&gt;
  &lt;div class=&quot;right&quot;&gt;
    &lt;sino-tooltip class=&quot;item&quot; effect=&quot;light&quot; content=&quot;Right提示文字&quot; placement=&quot;right&quot;&gt;
      &lt;sino-button&gt;右&lt;/sino-button&gt;
    &lt;/sino-tooltip&gt;
  &lt;/div&gt;
  &lt;div class=&quot;bottom&quot;&gt;
    &lt;sino-tooltip class=&quot;item&quot; effect=&quot;light&quot; content=&quot;Bottom提示文字&quot; placement=&quot;bottom&quot;&gt;
      &lt;sino-button&gt;下&lt;/sino-button&gt;
    &lt;/sino-tooltip&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;/template&gt;
&lt;style&gt;
  .box {
    width: 400px;
  }

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
    margin-right:76px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .sino-tooltip__popper, .right .sino-tooltip__popper {
    padding: 8px 10px;
  }
&lt;/style&gt;
&lt;script&gt;
  export  default{
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
<style>
  .box {
    width: 400px;
  }

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
    margin-right:76px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .sino-tooltip__popper, .right .sino-tooltip__popper {
    padding: 8px 10px;
  }
</style>
<script>
  export  default{
    components: {},
    data () {
      return {
        show: false,
        show1: false
      };
    }
  };
</script>

