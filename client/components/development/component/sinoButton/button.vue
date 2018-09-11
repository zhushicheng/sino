<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Button 按钮</h2>
    <h3 class="sino-compon-h3">默认按钮</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button type="primary">主按钮</sino-button>
        <sino-button>辅助按钮</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button type=&quot;primary&quot;&gt;主按钮&lt;/sino-button&gt;
  &lt;sino-button&gt;辅助按钮&lt;/sino-button&gt;
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

    <h3 class="sino-compon-h3">提示按钮</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button type="success">成功按钮</sino-button>
        <sino-button type="error">失败按钮</sino-button>
        <sino-button type="warning">警告按钮</sino-button>
        <sino-button type="danger">危险按钮</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button type=&quot;success&quot;&gt;成功按钮&lt;/sino-button&gt;
  &lt;sino-button type=&quot;error&quot;&gt;失败按钮&lt;/sino-button&gt;
  &lt;sino-button type=&quot;warning&quot;&gt;警告按钮&lt;/sino-button&gt;
  &lt;sino-button type=&quot;danger&quot;&gt;危险按钮&lt;/sino-button&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {};
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


    <h3 class="sino-compon-h3">文本按钮</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button type="text">文本按钮</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code><pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button type=&quot;text&quot;&gt;文本按钮&lt;/sino-button&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {};
&lt;/script&gt;</pre></code>
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


    <h3 class="sino-compon-h3">只读按钮</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button type="primary" disabled>只读按钮</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show3">
          <div class="demo-highlight">
            <code><pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button type=&quot;primary&quot; disabled&gt;只读按钮&lt;/sino-button&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {};
&lt;/script&gt;</pre></code>
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

    <h3 class="sino-compon-h3">带icon按钮</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button icon="sino-duigou">显示icon</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show4">
          <div class="demo-highlight">
            <code><pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button icon=&quot;sino-duigou&quot;&gt;显示icon&lt;/sino-button&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {};
&lt;/script&gt;</pre></code>
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

    <h3 class="sino-compon-h3">加载中</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button loading>加载中</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show5">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button loading&gt;加载中&lt;/sino-button&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {};
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

  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false
      };
    }
  };
</script>
