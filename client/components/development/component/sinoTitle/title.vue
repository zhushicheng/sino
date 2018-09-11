<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Title 标题</h2>
    <h3 class="sino-compon-h3">一级标题</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-title type="levelOne" title="一级标题"></sino-title>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code><pre class="brush:js;toolbar:false">&lt;sino-title type=&quot;levelOne&quot; title=&quot;一级标题&quot;&gt;&lt;/sino-title&gt;</pre>
              <p>
                <br/>
              </p>
            </code>
          </div>
          <div class="description">
            <code>title</code>接收标题名称
            设置<code data-v-01b04186="">type</code>属性，它接受一个<code data-v-01b04186="">string</code>
            <code>levelOne</code>代表一级 标题。
          </div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show = !show">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
        <span v-if="!show">显示代码</span>
        <span v-if="show">收起代码</span>
      </div>
    </div>
    <h3 class="sino-compon-h3">二级标题</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-title type="levelTwo" title="二级标题"></sino-title>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;sino-title type=&quot;levelTwo&quot; title=&quot;二级标题&quot;&gt;&lt;/sino-title&gt;</pre>
              <p>
                <br/>
              </p>
            </code>
          </div>
          <div class="description">
            <code>title</code>接收标题名称
            设置<code data-v-01b04186="">type</code>属性，它接受一个<code data-v-01b04186="">string</code>
            <code>levelTwo</code>代表二级标题。
          </div>
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
    data: function () {
      return {
        show: false,
        show1: false
      };
    }
  };
</script>
