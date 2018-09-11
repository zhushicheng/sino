<template>
  <div class="sino-compon">
    <div class="sino-compon-left">
      <div class="sino-com">基础组件</div>
      <ul class="sino-compon-ul">
        <li class="sino-compon-tit">表单类</li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoRadio'">Radio 单选框</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoCheckbox'">Checkbox 多选框</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoInput'">Input 输入框</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoInputNumber'">InputNumber 计数器	</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoSelect'">Select 选择器</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoCascader'">Cascader 级联选择</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoSwitch'">Switch 开关</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoDatePicker'">DateTimePicker 日期时间选择器</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoUpload'">Upload 上传</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoTransfer'">Transfer 穿梭框</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoForm'">Form 表单</router-link></li>
      </ul>
      <ul class="sino-compon-ul">
        <li class="sino-compon-tit">数据类</li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoTable'">Table 表格</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoEditTable'">Table 可编辑的表格</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoProgress'">Progress 进度条</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoTree'">Tree 树形控件</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoPage'">Pagination 分页</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoBadge'">Badge 标记</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoTitle'">Title 标题</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoButton'">Button 按钮</router-link></li>
      </ul>
      <ul class="sino-compon-ul">
        <li class="sino-compon-tit">全局类</li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoLoading'">Loading 加载</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoMessage'">Message 提示弹框</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoMessagebox'">MessageBox 可拖拽弹框</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoNotification'">Notification 通知</router-link></li>
      </ul>
      <ul class="sino-compon-ul">
        <li class="sino-compon-tit">导航类</li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoNavMenu'">NavMenu 导航菜单</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoTabs'">Tabs 标签页</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoBreadcrumb'">Breadcrumb 面包屑</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoDropdown'">Dropdown 下拉菜单</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoStep'">Steps 步骤条</router-link></li>
      </ul>
      <ul class="sino-compon-ul">
        <li class="sino-compon-tit">其他</li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoDialog'">Dialog 对话框</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoTooltip'">Tooltip 文字提示</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoPopover'">Popover 弹出框</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoAffix'">Affix 图钉</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoRebound'">Rebound 弹层扣块</router-link></li>
        <li @click="bodyScroll"><router-link :to="'/component/sinoLinkContainer'">tree 和指针联动</router-link></li>
      </ul>
    </div>
    <div class="sino-compon-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    methods: {
      bodyScroll () {
        document.documentElement.scrollTop = 0;
      }
    }
  };
</script>
