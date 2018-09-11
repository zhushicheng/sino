<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Form 表单校验</h2>
    <div class="demo-block">
      <div class="demo-source">
        <sino-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm" >
          <sino-form-item label="活动名称：" prop="name">
            <sino-input v-model="ruleForm.name" placeholder="请输入活动名称"></sino-input>
          </sino-form-item>
          <sino-form-item label="活动区域：" prop="region">
            <sino-select :tipText="'请选择'" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="ruleForm.region" :chooseId.sync="ruleForm.regionId"  :clear="true" method='GET' :url="localHref + '/selectArray.json'"></sino-select>
          </sino-form-item>
          <sino-form-item label="活动时间：" prop="date">
            <sino-date-picker v-model="ruleForm.date" type="date" placeholder="请选择时间" :editable="false" :readonly="false" :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="活动性质：" prop="type" class="checkbox-item" :justText="true">
            <sino-checkbox-group v-model="ruleForm.type">
              <sino-checkbox label="美食/餐厅线上活动" name="type"></sino-checkbox>
              <sino-checkbox label="地推活动" name="type"></sino-checkbox>
              <sino-checkbox label="线下主题活动" name="type"></sino-checkbox>
              <sino-checkbox label="单纯品牌曝光" name="type"></sino-checkbox>
            </sino-checkbox-group>
          </sino-form-item>
          <sino-form-item label="特殊资源：" prop="resource" class="radio-item" :justText="true">
            <sino-radio-group v-model="ruleForm.resource">
              <sino-radio label="线上"></sino-radio>
              <sino-radio label="线下"></sino-radio>
            </sino-radio-group>
          </sino-form-item>
          <sino-form-item>
            <sino-button type="primary" @click="submitForm('ruleForm')">立即创建</sino-button>
            <sino-button @click="resetForm('ruleForm')">重置</sino-button>
          </sino-form-item>
        </sino-form>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-form :model=&quot;ruleForm&quot; :rules=&quot;rules&quot; ref=&quot;ruleForm&quot;  class=&quot;demo-ruleForm&quot; &gt;
      &lt;sino-form-item label=&quot;活动名称：&quot; prop=&quot;name&quot;&gt;
        &lt;sino-input v-model=&quot;ruleForm.name&quot; placeholder=&quot;请输入活动名称&quot;&gt;&lt;/sino-input&gt;
      &lt;/sino-form-item&gt;
      &lt;sino-form-item label=&quot;活动区域：&quot; prop=&quot;region&quot;&gt;
        &lt;sino-select :tipText=&quot;&#39;
                请选择&#39;&quot; :filterable=&quot;false&quot; :multiselect=&quot;false&quot;
                :isshowTotol=&quot;false&quot; :disabled=&quot;false&quot; :totalNum=&quot;false&quot; :isPage=&quot;false&quot;
                :isGroup=&quot;false&quot; :chooseName.sync=&quot;ruleForm.region&quot;
                :chooseId.sync=&quot;ruleForm.regionId&quot;  :clear=&quot;true&quot; method=&#39;GET&#39;
                :url=&quot;localHref + &#39;/selectArray.json&#39;&quot;&gt;&lt;/sino-select&gt;
      &lt;/sino-form-item&gt;
      &lt;sino-form-item label=&quot;活动时间：&quot; prop=&quot;date&quot;&gt;
        &lt;sino-date-picker v-model=&quot;ruleForm.date&quot;
                type=&quot;date&quot; placeholder=&quot;请选择时间&quot;
                :editable=&quot;false&quot; :readonly=&quot;false&quot; :clearable=&quot;true&quot;&gt;
        &lt;/sino-date-picker&gt;
      &lt;/sino-form-item&gt;
      &lt;sino-form-item label=&quot;活动性质：&quot; prop=&quot;type&quot; class=&quot;checkbox-item&quot; :justText=&quot;true&quot;&gt;
        &lt;sino-checkbox-group v-model=&quot;ruleForm.type&quot;&gt;
          &lt;sino-checkbox label=&quot;美食/餐厅线上活动&quot; name=&quot;type&quot;&gt;&lt;/sino-checkbox&gt;
          &lt;sino-checkbox label=&quot;地推活动&quot; name=&quot;type&quot;&gt;&lt;/sino-checkbox&gt;
          &lt;sino-checkbox label=&quot;线下主题活动&quot; name=&quot;type&quot;&gt;&lt;/sino-checkbox&gt;
          &lt;sino-checkbox label=&quot;单纯品牌曝光&quot; name=&quot;type&quot;&gt;&lt;/sino-checkbox&gt;
        &lt;/sino-checkbox-group&gt;
      &lt;/sino-form-item&gt;
      &lt;sino-form-item label=&quot;特殊资源：&quot; prop=&quot;resource&quot; class=&quot;radio-item&quot; :justText=&quot;true&quot;&gt;
        &lt;sino-radio-group v-model=&quot;ruleForm.resource&quot;&gt;
          &lt;sino-radio label=&quot;线上&quot;&gt;&lt;/sino-radio&gt;
          &lt;sino-radio label=&quot;线下&quot;&gt;&lt;/sino-radio&gt;
        &lt;/sino-radio-group&gt;
      &lt;/sino-form-item&gt;
      &lt;sino-form-item&gt;
        &lt;sino-button type=&quot;primary&quot; @click=&quot;submitForm(&#39;ruleForm&#39;)&quot;&gt;立即创建&lt;/sino-button&gt;
        &lt;sino-button @click=&quot;resetForm(&#39;ruleForm&#39;)&quot;&gt;重置&lt;/sino-button&gt;
      &lt;/sino-form-item&gt;
    &lt;/sino-form&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {
    },
    data () {
      return {
        localHref: window.location.href.split(&#39;#&#39;)[0],
        ruleForm: {
          name: &#39;&#39;,
          region: &#39;&#39;,
          regionId: &#39;&#39;,
          date: &#39;&#39;,
          type: [],
          resource: &#39;&#39;
        },
        rules: {
          name: [
            { required: true, message: &#39;请输入活动名称请输入活动名称请输入活动名称请输入活动名称请输入活动名称请输入活动名称请输入活动名称&#39;, trigger: &#39;change&#39; },
            { min: 3, max: 5, message: &#39;长度在 3 到 5 个字符&#39;, trigger: &#39;change&#39; }
          ],
          region: [
            { required: true, message: &#39;请选择活动区域&#39;, trigger: &#39;change&#39; }
          ],
          date: [
            { type: &#39;date&#39;, required: true, message: &#39;请选择日期&#39;, trigger: &#39;change&#39; }
          ],
          type: [
            { type: &#39;array&#39;, required: true, message: &#39;请至少选择一个活动性质&#39;, trigger: &#39;change&#39; }
          ],
          resource: [
            { required: true, message: &#39;请选择活动资源&#39;, trigger: &#39;change&#39; }
          ]
        }
      };
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) =&gt; {
          if (valid) {
            this.$alert(&#39;submit!&#39;, &#39;表单提交&#39;, {
              confirmButtonText: &#39;确 定&#39;,
              type: &#39;info&#39;,
              dragFlag: true,
              lockScroll: true,
              callback: action =&gt; {
              }
            });
          } else {
            console.log(&#39;error submit!!&#39;);
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
&lt;/script&gt;
&lt;style&gt;
  .checkbox-item .sino-checkbox-group,.radio-item .sino-radio{margin-top:5px;}
&lt;/style&gt;</pre>
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
    components: {
    },
    data () {
      return {
        show: false,
        localHref: window.location.href.split('#')[0],
        ruleForm: {
          name: '',
          region: '',
          regionId: '',
          date: '',
          type: [],
          resource: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称请输入活动名称请输入活动名称请输入活动名称请输入活动名称请输入活动名称请输入活动名称', trigger: 'change' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$alert('submit!', '表单提交', {
              confirmButtonText: '确 定',
              type: 'warning',
              dragFlag: true,
              lockScroll: true,
              callback: action => {
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
<style>
  .checkbox-item .sino-checkbox-group,.radio-item .sino-radio{margin-top:5px;}
</style>
