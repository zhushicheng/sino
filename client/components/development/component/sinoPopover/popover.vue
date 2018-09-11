<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Popover 弹出框</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-popover ref="popover2" :popper-class="'questionTip'" placement="bottom-start" trigger="hover" content="是否外籍人计税注解是否外籍人计税注解外籍人注解是否外籍人计税"></sino-popover>
        <i class="iconfont sino-fangxingwenhao" style="display:inline-block;margin-top:10px;color:#399ff2" v-popover:popover2></i>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-popover ref=&quot;popover2&quot; :popper-class=&quot;&#39;questionTip&#39;&quot;placement=&quot;bottom-start&quot;
                trigger=&quot;hover&quot; content=&quot;是否外籍人计税注解是否外籍人计税注解外籍人注解是否外籍人计税&quot;&gt;&lt;/sino-popover&gt;
                &lt;i class=&quot;iconfont sino-fangxingwenhao&quot;
                style=&quot;display:inline-block;margin-top:10px;color:#399ff2&quot;
                v-popover:popover2&gt;&lt;/i&gt;
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


    <h3 class="sino-compon-h3">错误提示</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input type="text" warn="提示信息提示信息" v-model="input2"  placeholder="请输入内容" :disabled="false" ></sino-input>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input type=&quot;text&quot; warn=&quot;提示信息提示信息&quot; v-model=&quot;input2&quot;  placeholder=&quot;请输入内容&quot; :disabled=&quot;false&quot; &gt;&lt;/sino-input&gt;
&lt;/template&gt;
&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        input2: &#39;&#39;
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


  </div>

</template>

<script>
  export default{
    components: {},
    data () {
      return {
        input2: '',
        show: false,
        show1: false
      };
    },
    methods: {
      empty () {
        this.input = '';
      }
    }
  };
</script>
