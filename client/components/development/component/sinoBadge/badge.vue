<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Badge 标记</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-badge :value="12">
          <sino-button>评论</sino-button>
        </sino-badge>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre style=" font-family: 宋体; font-size: 11.3pt;" class="brush:js;toolbar:false;">&lt;template&gt;

    &lt;sino-badge :value=&quot;12&quot;&gt;
      &lt;sino-button&gt;评论&lt;/sino-button&gt;
    &lt;/sino-badge&gt;

&lt;/template&gt;
&lt;script&gt;
  export default {};
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">
            定义<code data-v-01b04186="">value</code>属性，它接受<code data-v-01b04186="">Number</code>或者<code data-v-01b04186="">String</code>
          </div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show = !show">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
        <span v-if="!show">显示代码</span>
        <span v-if="show">收起代码</span>
      </div>
    </div>
    <h3 class="sino-compon-h3">最大值</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-badge :value="200" :max="99">
          <sino-button>最大值99</sino-button>
        </sino-badge>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
<pre class="brush:js;toolbar:false">&lt;sino-badge :value=&quot;200&quot; :max=&quot;99&quot;&gt;
  &lt;sino-button&gt;最大值99&lt;/sino-button&gt;
&lt;/sino-badge&gt;</pre>
              <p>
                <br/>
              </p>
            </code>
          </div>
          <div class="description">
           由<code data-v-01b04186="">max</code>属性定义，它接受一个<code data-v-01b04186="">Number</code>，需要注意的是，只有当<code data-v-01b04186="">value</code>为<code data-v-01b04186="">Number</code>时，它才会生效。
          </div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show1 = !show1">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show1,'sino-angle-double-up':show1}"></i>
        <span v-if="!show">显示代码</span>
        <span v-if="show">收起代码</span>
      </div>
    </div>
    <h3 class="sino-compon-h3">自定义内容</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-badge value="new">
          <sino-button>自定义内容</sino-button>
        </sino-badge>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
<pre class="brush:js;toolbar:false">&lt;sino-badge value=&quot;new&quot;&gt;
  &lt;sino-button&gt;自定义内容&lt;/sino-button&gt;
&lt;/sino-badge&gt;</pre>
              <p>
                <br/>
              </p>
            </code>
          </div>
          <div class="description">
             定义<code data-v-01b04186="">value</code>为<code data-v-01b04186="">String</code>类型是时可以用于显示自定义文本。
          </div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show2 = !show2">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show2,'sino-angle-double-up':show2}"></i>
        <span v-if="!show2">显示代码</span>
        <span v-if="show2">收起代码</span>
      </div>
    </div>
    <h3 class="sino-compon-h3">小圆点</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-badge is-dot>
          <sino-button>小圆点</sino-button>
        </sino-badge>
      </div>
        <sino-collapse-transition>
          <div class="demo-meta" v-show="show3">
            <div class="demo-highlight">
              <code><pre class="brush:js;toolbar:false">&lt;sino-badge is-dot&gt;
  &lt;sino-button&gt;小红点&lt;/sino-button&gt;
&lt;/sino-badge&gt;</pre>
                <p>
                  <br/>
                </p>
              </code>
            </div>
            <div class="description">
              除了数字外，设置<code data-v-01b04186="">is-dot</code>属性，它接受一个<code data-v-01b04186="">Boolean</code>。
            </div>
          </div>
        </sino-collapse-transition>
        <div class="demo-block-control" @click="show3 = !show3">
          <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show3,'sino-angle-double-up':show3}"></i>
          <span v-if="!show3">显示代码</span>
          <span v-if="show3">收起代码</span>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        show: false,
        show1: false,
        show2: false,
        show3: false
      };
    }
  };
</script>
