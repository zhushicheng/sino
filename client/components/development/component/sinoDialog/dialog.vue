<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Dialog 对话框</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
    <sino-button type="primary" @click="dialogFormVisible = true" lock-scroll="true" style="width:auto;padding: 0 5px">打开嵌套表单的 Dialog</sino-button>
      </div>
        <sino-collapse-transition>
          <div class="demo-meta" v-show="show">
            <div class="demo-highlight">
              <code>
<pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button type=&quot;primary&quot; @click=&quot;dialogFormVisible = true&quot; lock-scroll=&quot;true&quot; style=&quot;width:auto;padding: 0 5px&quot;&gt;
    打开嵌套表单的 Dialog
  &lt;/sino-button&gt;
  &lt;!-- 弹层 --&gt;
  &lt;sino-dialog :visible.sync=&quot;dialogFormVisible&quot;&gt;
    &lt;sino-title slot=&quot;title&quot; type=&quot;levelOne&quot; title=&quot;查询模板&quot; class=&quot;sino-dialog-title&quot;&gt;&lt;/sino-title&gt;
    &lt;form class=&quot;sino-dialog-form&quot; :model=&quot;form&quot;&gt;
      &lt;div class=&quot;sino-dialog-item&quot;&gt;
        &lt;div class=&quot;sino-dialog-L&quot;&gt;
          &lt;label class=&quot;sino-dialog-form-item-label&quot;&gt;
            模板名称
            &lt;span class=&quot;sino-dialog-form-item-labels&quot;&gt;:&lt;/span&gt;
          &lt;/label&gt;
          &lt;div class=&quot;sino-dialog-form-item-content&quot;&gt;
            &lt;div class=&quot;sino-dialog-input&quot;&gt;
              &lt;input type=&quot;text&quot; placeholder=&quot;增值税计算器&quot; v-model=&quot;form.name&quot; auto-complete=&quot;off&quot;
                     class=&quot;sino-dialog-input-inner&quot; disabled&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;sino-dialog-R&quot;&gt;
          &lt;label class=&quot;sino-dialog-form-item-label&quot;&gt;
            模板类型
            &lt;span class=&quot;sino-dialog-form-item-labels&quot;&gt;:&lt;/span&gt;
          &lt;/label&gt;
          &lt;div class=&quot;sino-dialog-select&quot;&gt;
            &lt;div class=&quot;sino-dialog-border&quot;&gt;
              &lt;div class=&quot;sino-dialog-select--border&quot;&gt;
                &lt;select class=&quot;sino-dialog-option&quot; disabled&gt;
                  &lt;option&gt;税务&lt;/option&gt;
                  &lt;option&gt;财务&lt;/option&gt;
                &lt;/select&gt;
              &lt;/div&gt;
              &lt;div class=&quot;sino-dialog-Lowertriangle&quot;&gt;&lt;i class=&#39;iconfont sino-unie628&#39;&gt;&lt;/i&gt;&lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;sino-dialog-textarea&quot;&gt;
        &lt;label class=&quot;sino-dialog-form-item-label&quot;&gt;
          模板描述
          &lt;span class=&quot;sino-dialog-form-item-labels&quot;&gt;:&lt;/span&gt;
        &lt;/label&gt;
        &lt;div class=&quot;sino-dialog-textarea-input&quot;&gt;
          &lt;textarea class=&quot;sino-dialog-textareas&quot; cols=&quot;30&quot; rows=&quot;10&quot; disabled&gt;增值器计算器Excel&lt;/textarea&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;sino-dialog-Enclosure&quot;&gt;
        &lt;label class=&quot;sino-dialog-form-item-Label&quot;&gt;模板附件&lt;span class=&quot;sino-dialog-form-item-Dot&quot;&gt;:&lt;/span&gt; &lt;/label&gt;
        &lt;div class=&quot;sino-dialog-Paperclip&quot;&gt;
          &lt;div class=&quot;sino-dialog-PaperClip&quot;&gt;&lt;i class=&quot;iconfont sino-qubiezhen&quot;&gt;&lt;/i&gt;&lt;/div&gt;
          &lt;span class=&quot;sino-dialog-Calculator&quot;&gt;增值税计算器.dox&lt;/span&gt;
          &lt;a class=&quot;sino-dialog-download&quot; href=&quot;file&quot; target=&quot;_blank&quot;&gt;下载&lt;/a&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/form&gt;
    &lt;span slot=&quot;footer&quot; class=&quot;sino-dialog-Close&quot; @click=&quot;dialogFormVisible = false&quot;&gt;
        &lt;span&gt;关闭&lt;/span&gt;
      &lt;/span&gt;
  &lt;/sino-dialog&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        dialogFormVisible: false,
        form: {
          name: &#39;&#39;,
          region: &#39;&#39;,
          date1: &#39;&#39;,
          date2: &#39;&#39;,
          delivery: false,
          type: [],
          resource: &#39;&#39;,
          desc: &#39;&#39;
        }
      }
    }
  }
&lt;/script&gt;</pre>
                <p>
                  <br/>
                </p>
              </code>
            </div>
            <div class="description">
              需要设置<code>visible</code>属性，它接收<code>Boolean</code>，当为<code>true</code>时显示 Dialog。Dialog 分为两个部分：<code>body</code>和<code>footer</code>，<code>footer</code>需要具名为<code>footer</code>的<code>slot</code>。<code>title</code>属性用于定义标题，它是可选的，默认值为空。
                Dialog 组件的内容可以是任意的，甚至可以是表格或表单。
                <code>close</code>、<code>open</code>是关闭和打开前的两个事件回调。
            </div>
          </div>
        </sino-collapse-transition>
        <div class="demo-block-control" @click="show = !show">
          <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
          <span v-if="!show">显示代码</span>
          <span v-if="show">收起代码</span>
        </div>
    </div>
    <h3 class="sino-compon-h3">滚动条</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button type="primary" @click="dialogFormVisible1 = true" lock-scroll="true" style="width:auto;padding: 0 5px">滚动条Dialog</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code></code>
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
    <!-- 弹层 -->
    <sino-dialog :visible.sync="dialogFormVisible">
      <sino-title slot="title" type="levelOne" title="查询模板" class="sino-dialog-title"></sino-title>

      <form class="sino-dialog-form" :model="form">
        <div class="sino-dialog-item">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-select">
              <div class="sino-dialog-border">
                <div class="sino-dialog-select--border">
                  <select class="sino-dialog-option" disabled>
                    <option>税务</option>
                    <option>财务</option>
                  </select>
                </div>
                <div class="sino-dialog-Lowertriangle"><i class='iconfont sino-unie628'></i></div>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-Enclosure">
          <label class="sino-dialog-form-item-Label" >模板附件<span class="sino-dialog-form-item-Dot">:</span> </label>
          <div class="sino-dialog-Paperclip">
            <div class="sino-dialog-PaperClip"><i class="iconfont sino-qubiezhen" ></i></div>
            <span class="sino-dialog-Calculator">增值税计算器.dox</span>
            <a class="sino-dialog-download" href="file" target="_blank">下载</a>
          </div>
        </div>
      </form>
      <span slot="footer" class="sino-dialog-Close" @click="dialogFormVisible = false">
        <span>关闭</span>
      </span>
    </sino-dialog>
    <sino-dialog :visible.sync="dialogFormVisible1" dialogHide top="5%">
      <sino-title slot="title" type="levelOne" title="查询模板" class="sino-dialog-title"></sino-title>
      <form class="sino-dialog-form" style="overflow: hidden;height: 1000px;" :model="form">
        <div class="sino-dialog-item">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-item mt15">
          <div class="sino-dialog-L">
            <label class="sino-dialog-form-item-label" >
              模板名称
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
          <div class="sino-dialog-R">
            <label class="sino-dialog-form-item-label">
              模板类型
              <span class="sino-dialog-form-item-labels">:</span>
            </label>
            <div class="sino-dialog-form-item-content">
              <div class="sino-dialog-input">
                <input type="text" placeholder="增值税计算器" v-model="form.name" auto-complete="off" class="sino-dialog-input-inner" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="sino-dialog-textarea">
          <label class="sino-dialog-form-item-label" >
            模板描述11111111
            <span class="sino-dialog-form-item-labels">:</span>
          </label>
          <div class="sino-dialog-textarea-input">
            <textarea class="sino-dialog-textareas" cols="30" rows="10" disabled>增值器计算器Excel</textarea>
          </div>
        </div>
        <div class="sino-dialog-Enclosure">
          <label class="sino-dialog-form-item-Label" >模板附件<span class="sino-dialog-form-item-Dot">:</span> </label>
          <div class="sino-dialog-Paperclip">
            <div class="sino-dialog-PaperClip"><i class="iconfont sino-qubiezhen" ></i></div>
            <span class="sino-dialog-Calculator">增值税计算器.dox</span>
            <a class="sino-dialog-download" href="file" target="_blank">下载</a>
          </div>
        </div>
      </form>
      <span slot="footer">
        <sino-button type="is-primary" @click="dialogFormVisible1 = false">关 闭</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        show: false,
        show1: false,
        dialogFormVisible: false,
        dialogFormVisible1: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        prodInfoAddForm: {}
      };
    }
  };
</script>
