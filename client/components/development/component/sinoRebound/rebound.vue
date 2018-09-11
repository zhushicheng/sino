<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">弹层扣块</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button @click="sinoReboundVisible=true">点我</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
<pre class="brush:js;toolbar:false">&lt;template&gt;
   &lt;sino-button @click=&quot;sinoReboundVisible=true&quot;&gt;点我&lt;/sino-button&gt;
   &lt;sino-rebound :visible.sync=&quot;sinoReboundVisible&quot; :option=&quot;option&quot; :closeCallback=&quot;closeCallback&quot; v-on:closeRebound=&quot;sinoReboundVisible=false&quot;&gt;
     &lt;div  slot=&quot;contener&quot;   &gt;
       &lt;span&gt;鼠标滑上时候；右侧会出现悬浮小窗口，点击可以进行操作。&lt;/span&gt;
     &lt;/div&gt;
   &lt;/sino-rebound&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data () {
      return {
        sinoReboundVisible: false,
        option: {
          left: &#39;490&#39;,
          top: &#39;100&#39;,
          height: &#39;80&#39;,
          width: &#39;200&#39;
        },
        show: false
      };
    },
    methods: {
      closeCallback: function () {
      }
    }
  };
&lt;/script&gt;</pre>
              <p>
                <br/>
              </p>
            </code>
          </div>
          <div class="description">
            sino-rebound 通过<code>visible</code>参数接收控制其显示，
            sino-rebound 需要一个对象<code>option</code> 属性传入， option内有以下属性<code>left</code>、<code>top</code> 控制居左、上距离浏览器可视窗口的距离， <code>width</code>、 <code>height</code>分别控制遮罩可视区域宽、高。单位均为“px”。
            <code>solt=contener</code> 标签内可以输入自定义内容
            <code>closeCallback</code>是关闭后的回调。
          </div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show = !show">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
        <span v-if="!show">显示代码</span>
        <span v-if="show">收起代码</span>
      </div>
    </div>
    <sino-rebound :visible.sync="sinoReboundVisible" :option="option" :closeCallback="closeCallback" v-on:closeRebound="sinoReboundVisible=false">
      <div  slot="contener">
        <span>鼠标滑上时候；右侧会出现悬浮小窗口，点击可以进行操作。</span>
      </div>
    </sino-rebound>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        sinoReboundVisible: false,
        option: {
          left: '490',
          top: '100',
          height: '80',
          width: '200'
        },
        show: false
      };
    },
    methods: {
      closeCallback: function () {
//           alert(1)
      }
    }
  };
</script>
