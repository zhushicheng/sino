<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Notification 通知</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button type="success" @click="open">可自动关闭</sino-button>
        <sino-button type="success" @click="open2">不可自动关闭</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button type=&quot;success&quot; @click=&quot;open&quot;&gt;可自动关闭&lt;/sino-button&gt;
  &lt;sino-button type=&quot;success&quot; @click=&quot;open2&quot;&gt;不可自动关闭&lt;/sino-button&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    methods: {
      open () {
        const h = this.$createElement;

        this.$notify({
          title: &#39;标题名称&#39;,
          titleType: &#39;level&#39;,
          message: h(&#39;span&#39;, &#39;这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案&#39;)
        });
      },

      open2 () {
        this.$notify({
          title: &#39;提示&#39;,
          message: &#39;这是一条不会自动关闭的消息这是一条不会自动关闭的消息这是一条不会自动关闭的消息&#39;,
          type: &#39;info&#39;,
          duration: 0,
        });
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      };
    },
    methods: {
      open () {
        const h = this.$createElement;

        this.$notify({
          title: '标题名称',
          titleType: 'level',
          message: h('span', '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'),
          click: function () {
          }
        });
      },
      open2 () {
        this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息这是一条不会自动关闭的消息这是一条不会自动关闭的消息',
          type: 'warning',
          duration: 0,
          click: function () {
          }
        });
      }
    }
  };
</script>
