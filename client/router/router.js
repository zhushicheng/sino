import Vue from 'vue';
import Router from 'vue-router';
import Frame from '../framework/frame.vue';
import LazyLoad from './lazyLoading';

Vue.use(Router);
export const constantRouterMap = [
  {
    name: '首页',
    path: '/',
    component: Frame,
    meta: {
      requireAuth: true
    },
    children: [
      // {path: 'main', component: LazyLoad('index/index'), name: '首页'},
      {path: 'main', component: LazyLoad('index/main'), name: '首页'},
      {path: 'admin', component: LazyLoad('index/admin'), name: '首页'},
      {path: 'indexNotice', component: LazyLoad('index/notice'), name: '公告'},
      {path: 'indexMessage', component: LazyLoad('index/message'), name: '系统消息'},
      {path: 'updatePwd', component: LazyLoad('updatepwd/update_pwd'), name: "修改密码"},
      {path: 'userManage', component: LazyLoad('sysmanage/usermanage/usermanage'), name: "用户管理"},
      {path: 'roleManage', component: LazyLoad('sysmanage/rolemanage/rolemanage'), name: "角色管理"},
      {path: 'orgManage', component: LazyLoad('sysmanage/orgmanage/orgmanage'), name: "机构管理"},
      {path: 'funManage', component: LazyLoad('sysmanage/funmanage/funmanage'), name: "功能管理"},
      {path: 'turnMonth', component: LazyLoad('sysmanage/turnMonth'), name: "翻月"},
      {path: 'roleInstance', component: LazyLoad('sysmanage/authmanage/roleinstance/roleinstance'), name: "权限管理"},
      {
        path: 'funAccredit',
        component: LazyLoad('sysmanage/authmanage/funaccredit/funaccredit'),
        name: "权限管理",
        children: [
          {path: 'speFunAccredit', component: LazyLoad('sysmanage/authmanage/funaccredit/spefunaccredit'), name: "特殊配置"}
        ]
      },
      {
        path: 'dataJurisdiction',
        component: LazyLoad('sysmanage/authmanage/datajurisdiction/datajurisdiction'),
        name: "权限管理",
        children: [
          {path: 'speDataJurisdiction', component: LazyLoad('sysmanage/authmanage/datajurisdiction/spedatajurisdiction'), name: "特殊配置"}
        ]
      },
      {path: 'dataDict', component: LazyLoad('sysinfo/datadict/datadict'), name: "数据字典"},
      {path: 'bankInfo', component: LazyLoad('sysinfo/bankinfo/bankinfo'), name: "银行信息"},
      {path: 'areaManage', component: LazyLoad('sysinfo/areamanage/areamanage'), name: "地区管理"},
      {path: 'proAskQues', component: LazyLoad('helpcenter/prosexh/proaskques'), name: "前台常见问题"},
      {path: 'proLearnData', component: LazyLoad('helpcenter/prosexh/prolearndata'), name: "前台学习资料"},
      {path: 'proContAdmin', component: LazyLoad('helpcenter/prosexh/procontadmin'), name: "前台联系管理员"},
      {path: 'backAskQues', component: LazyLoad('helpcenter/backoper/backaskques'), name: "帮助中心"},
      {path: 'backLearnData', component: LazyLoad('helpcenter/backoper/backlearndata'), name: "帮助中心"},
      {path: 'backContAdmin', component: LazyLoad('helpcenter/backoper/backcontadmin'), name: "帮助中心"},
      {path: 'rootManage', component: LazyLoad('development/rootManage/root-manage'), name: "词根管理"},
      {path: 'dataStructure', component: LazyLoad('development/dataStructure/data-structure'), name: "数据结构管理"},
      {
        path: 'component',
        component: LazyLoad('development/component/all-component'),
        name: "前端组件库",
        children: [
          {path: 'sinoRadio', component: LazyLoad('development/component/sinoRadio/radio'), name: "Radio单选"},
          {path: 'sinoCheckbox', component: LazyLoad('development/component/sinoCheckbox/checkbox'), name: "Checkbox 多选框"},
          {path: 'sinoInput', component: LazyLoad('development/component/sinoInput/input'), name: "Input 输入框"},
          {path: 'sinoInputNumber', component: LazyLoad('development/component/sinoInputNumber/inputNumber'), name: "InputNumber 计数器"},
          {path: 'sinoSelect', component: LazyLoad('development/component/sinoSelect/select'), name: "Select 选择器"},
          {path: 'sinoCascader', component: LazyLoad('development/component/sinoCascader/cascader'), name: "Cascader 级联选择"},
          {path: 'sinoSwitch', component: LazyLoad('development/component/sinoSwitch/switch'), name: "Switch 开关"},
          {path: 'sinoDatePicker', component: LazyLoad('development/component/sinoDatePicker/datePicker'), name: "DateTimePicker 日期时间选择器"},
          {path: 'sinoUpload', component: LazyLoad('development/component/sinoUpload/upload'), name: "Upload 上传"},
          {path: 'sinoTransfer', component: LazyLoad('development/component/sinoTransfer/transfer'), name: "Transfer 穿梭框"},
          {path: 'sinoForm', component: LazyLoad('development/component/sinoForm/form'), name: "Form 表单"},
          {path: 'sinoTable', component: LazyLoad('development/component/sinoTable/text'), name: "Table 表格"},
          {path: 'sinoEditTable', component: LazyLoad('development/component/sinoEdittable/bb'), name: "Table 可编辑的表格"},
          {path: 'sinoProgress', component: LazyLoad('development/component/sinoProgress/progress'), name: "Progress 进度条"},
          {path: 'sinoTree', component: LazyLoad('development/component/sinoTree/tree'), name: "Tree 树形控件"},
          {path: 'sinoPage', component: LazyLoad('development/component/sinoPage/page'), name: "Pagination 分页"},
          {path: 'sinoBadge', component: LazyLoad('development/component/sinoBadge/badge'), name: "Badge 标记"},
          {path: 'sinoTitle', component: LazyLoad('development/component/sinoTitle/title'), name: "Title 标题"},
          {path: 'sinoButton', component: LazyLoad('development/component/sinoButton/button'), name: "Button 按钮"},
          {path: 'sinoLoading', component: LazyLoad('development/component/sinoLoading/loading'), name: "Loading 加载"},
          {path: 'sinoMessage', component: LazyLoad('development/component/sinoMessage/message'), name: "Message 提示弹框"},
          {path: 'sinoMessagebox', component: LazyLoad('development/component/sinoMessagebox/messagebox'), name: "MessageBox 可拖拽弹框"},
          {path: 'sinoNotification', component: LazyLoad('development/component/sinoNotification/notification'), name: "Notification 通知"},
          {path: 'sinoNavMenu', component: LazyLoad('development/component/sinoNavMenu/navmenu'), name: "NavMenu 导航菜单"},
          {path: 'sinoTabs', component: LazyLoad('development/component/sinoTabs/tabs'), name: "Tabs 标签页"},
          {path: 'sinoBreadcrumb', component: LazyLoad('development/component/sinoBreadcrumb/breadcrumb'), name: "Breadcrumb 面包屑"},
          {path: 'sinoDropdown', component: LazyLoad('development/component/sinoDropdown/dropdown'), name: "Dropdown 下拉菜单"},
          {path: 'sinoStep', component: LazyLoad('development/component/sinoStep/step'), name: "Steps 步骤条"},
          {path: 'sinoDialog', component: LazyLoad('development/component/sinoDialog/dialog'), name: "Dialog 对话框"},
          {path: 'sinoTooltip', component: LazyLoad('development/component/sinoTooltip/tooltip'), name: "Tooltip 文字提示"},
          {path: 'sinoPopover', component: LazyLoad('development/component/sinoPopover/popover'), name: "Popover 弹出框"},
          {path: 'sinoAffix', component: LazyLoad('development/component/sinoaffix/affix'), name: "Affix 图钉"},
          {path: 'sinoRebound', component: LazyLoad('development/component/sinoRebound/rebound'), name: "Rebound 弹层扣块"},
          {path: 'sinoLinkContainer', component: LazyLoad('development/component/sinoLinkContainer/linkContainer'), name: "tree 和指针联动"}
        ]
      },
      {path: 'sampleLibrary', component: LazyLoad('development/sampleLibrary/sample-library'), name: "样本程序库"},
      {path: 'relationManage', component: LazyLoad('development/relationManage/relation-manage'), name: "字段血缘关系管理"},
      {path: 'systemTemplateAdmin', component: LazyLoad('development/systemTemplateAdmin/systemTemplateAdmin'), name: "系统模版管理功能"},
      {path: 'procConf', component: LazyLoad('sysmon/procconf/procconf'), name: "流程配置"},
      {path: 'procReg', component: LazyLoad('sysmon/procreg/procreg'), name: "流程监管"},
      {path: 'sysMess', component: LazyLoad('sysmon/sysmess/sysmess'), name: "系统消息"},
      {path: 'sysNotice', component: LazyLoad('sysmon/sysnotice/sysnotice'), name: "系统公告"},
      {path: 'emailManage', component: LazyLoad('sysmon/emailmanage/emailmanage'), name: "邮箱管理"},
      {path: 'mailManage', component: LazyLoad('sysmon/mailmanage/mailmanage'), name: "邮件管理"},
      // 业务模块
      {path: 'leads', component: LazyLoad('presales/leads'), name: "销售线索"},
      {path: 'leadsManager', component: LazyLoad('presales/leadsmanager'), name: "销售线索（经理）"},
      {path: 'leadsCommiss', component: LazyLoad('presales/leadscommiss'), name: "销售线索（专员）"},
      {path: 'leadsSearch', component: LazyLoad('presales/leadssearch'), name: "销售线索查询"},
      {
        path: 'custBusCon',
        component: LazyLoad('custbuscon/custbuscon'),
        name: "商务合同",
        children: [
          {
            path: 'addBusCon',
            component: LazyLoad('custbuscon/addbuscon'),
            name: '新增商务合同',
            children: [
              {path: 'custinfoupdate', component: LazyLoad('custmanage/custinfo/custinfoupdate/custinfoupdate'), name: "新增客户信息"}
            ]
          },
          {
            path: 'updateBusCon',
            component: LazyLoad('custbuscon/updatebuscon'),
            name: '修改商务合同',
            children: [
              {path: 'custinfoupdate', component: LazyLoad('custmanage/custinfo/custinfoupdate/custinfoupdate'), name: "新增客户信息"}
            ]
          },
          {path: 'busConEav', component: LazyLoad('custbuscon/busconeav'), name: '商务合同审核'},
          {path: 'seeBusCon', component: LazyLoad('custbuscon/seebuscon'), name: '商务合同查看'}
        ]
      },
      {
        path: 'custInfo',
        component: LazyLoad('custmanage/custinfo/custinfo'),
        name: "客户基本信息",
        children: [
          {path: 'custinfoupdate', component: LazyLoad('custmanage/custinfo/custinfoupdate/custinfoupdate'), name: "客户信息"}
        ]
      },
      {
        path: 'custServTemplate',
        component: LazyLoad('custmanage/custservtemplate/custservtemplate'),
        name: "客户产品服务模板",
        children: [
          {path: 'addCustServTemplate', component: LazyLoad('custmanage/custservtemplate/addcustservtemplate/addcustservtemplate'), name: "新增产品服务模板"},
          {path: 'seeCustServTemplate', component: LazyLoad('custmanage/custservtemplate/seecustservtemplate/seecustservtemplate'), name: "服务模板详情"},
          {path: 'modifyCustServTemplate', component: LazyLoad('custmanage/custservtemplate/modifycustservtemplate/modifycustservtemplate'), name: "修改产品服务模板"}
        ]
      },
      {path: 'salaryTemplate', component: LazyLoad('custmanage/salarytemplate/salarytemplate'), name: "客户工资模板"},
      {path: 'bankAcct', component: LazyLoad('custmanage/bankacct/bankacct'), name: "客户银行账户"},
      {path: 'costCenter', component: LazyLoad('custmanage/costcenter/costcenter'), name: "成本中心管理"},
      {path: 'invInfo', component: LazyLoad('custmanage/invinfo/invinfo'), name: "客户发票信息管理"},
      {path: 'sendAddr', component: LazyLoad('custmanage/sendaddr/sendaddr'), name: "客户邮寄地址"},
      {path: 'custAccuAcct', component: LazyLoad('custmanage/custaccuacct/custaccuacct'), name: '客户公积金账户'},
      {path: 'custSinsAcct', component: LazyLoad('custmanage/custsinsacct/custsinsacct'), name: '客户社保账户'},
      {path: 'serveProt', component: LazyLoad('custmanage/serveprot/serveprot'), name: "服务协议"},
      {path: 'suppInfo', component: LazyLoad('suppmanage/suppinfo/suppinfo'), name: "供应商信息"},
      {path: 'suppAcct', component: LazyLoad('suppmanage/suppacct/suppacct'), name: "供应商银行账户"},
      {path: 'suppCont', component: LazyLoad('suppmanage/suppcont/suppcont'), name: "供应商联系人"},
      {path: 'suppSendAddr', component: LazyLoad('suppmanage/suppsendaddr/suppsendaddr'), name: "供应商邮寄地址"},
      {path: 'suppVatInv', component: LazyLoad('suppmanage/suppvatinv/suppvatinv'), name: "供应商增值税发票"},
      {
        path: 'suppDimReason',
        component: LazyLoad('suppmanage/suppdimreason/suppdimreason'),
        name: "供应商离职原因",
        children: [
          {path: 'adddimreason', component: LazyLoad('suppmanage/suppdimreason/adddimreason/adddimreason'), name: "新增供应商离职原因"}
        ]
      },
      {path: 'remiPublish', component: LazyLoad('fnncmanage/remipublish/remipublish'), name: "汇款单发布"},
      {path: 'invSubConf', component: LazyLoad('fnncmanage/invsubconf/invsubconf'), name: "发票科目配置"},
      // 财务管理
      {path: 'invoiceManagement', component: LazyLoad('fnncmanage/invoicemanagement/invoicemanagement'), name: "账单收费管理"},
      {path: 'billClaim', component: LazyLoad('fnncmanage/billclaim/billclaim'), name: '账单认领'},
      {path: 'rebtClaim', component: LazyLoad('fnncmanage/rebtclaim/rebtclaim'), name: '返款认领'},
      {path: 'rateStati', component: LazyLoad('fnncmanage/ratestati/ratestati'), name: '到款率统计'},
      {path: 'paiSinManaSale', component: LazyLoad('fnncmanage/paisinmanasale/paisinmanasale'), name: "拨付单-经办员"},
      {path: 'alloMediSecBack', component: LazyLoad('fnncmanage/paisinmanasale/allomedisecback'), name: "拨付单-经办员"},
      {path: 'paiSinManaFina', component: LazyLoad('fnncmanage/paisinmanafina/paisinmanafina'), name: "拨付单管理-财务"},
      {path: 'applyPay', component: LazyLoad('fnncmanage/applypay/applypay'), name: "其他返款申请"},
      {path: 'alloRepaPay', component: LazyLoad('fnncmanage/allorepapay/allorepapay'), name: "其他返款申请"},
      {path: 'receInq', component: LazyLoad('fnncmanage/receinq/receinq'), name: "收据查询"},
      {path: 'mailInfoSearch', component: LazyLoad('fnncmanage/mailinfosearch/mailinfosearch'), name: "邮寄信息查询"},
      {
        path: 'payAdmin',
        component: LazyLoad('fnncmanage/payadmin/payadmin'),
        name: "支付管理",
        children: [
          {path: 'reimDet', component: LazyLoad('fnncmanage/payadmin/reimdet/reimdet'), name: "报销单明细"},
          {path: 'payFeed', component: LazyLoad('fnncmanage/payadmin/payfeed/payfeed'), name: "支付反馈"}
        ]
      },
      {path: 'invManage', component: LazyLoad('fnncmanage/invmanage/invmanage'), name: "发票管理"},
      {path: 'empBankCardRep', component: LazyLoad('empmanage/empBankCardRep/empBankCardRep'), name: "雇员银行卡维护"},
      {path: 'empInfoRep', component: LazyLoad('empmanage/empInfoRep/empInfoRep'), name: "雇员基本信息维护"},
      {
        path: 'orderhandle',
        component: LazyLoad('empmanage/orderhandle/orderhandle'),
        name: "手续办理",
        children: [
          {path: 'seeOrderHis', component: LazyLoad('empmanage/orderhandle/seeorderhis'), name: "手续办理历史"}
        ]
      },
      {
        path: 'empAss',
        component: LazyLoad('ordermanage/empass/empass'),
        name: "雇员派出",
        children: [
          {
            path: 'batchEmpAss',
            component: LazyLoad('ordermanage/empass/batchempass'),
            name: "批量派出",
            children: [
              {path: 'hisImportSearch', component: LazyLoad('ordermanage/empass/hisimportsearch'), name: "历史导入查询"}
            ]
          },
          {
            path: 'singleEmpAss',
            component: LazyLoad('ordermanage/singleempass/singleempass'),
            name: "单个派出",
            children: [
              {path: 'addServiceAgreement', component: LazyLoad('ordermanage/singleempass/addserviceagreement/addServiceAgreement'), name: "新增服务协议"},
              {path: 'addCustServTemplate', component: LazyLoad('custmanage/custservtemplate/addcustservtemplate/addcustservtemplate'), name: "新增产品服务模板"}
            ]
          },
          {
            path: 'entrustedtasklistimp',
            component: LazyLoad('trustOrderManage/entrustedTaskListImp/entrustedimp'),
            name: '任务单导入',
            children: [
              {
                path: 'sinsaccuacctstan',
                component: LazyLoad('trustOrderManage/entrustedtasklistconfi/sinsaccuacctstan/sinsaccuacctstan'),
                name: '社保公积金账户标准',
                children: [
                  {path: 'custSinsAcct', component: LazyLoad('custmanage/custsinsacct/custsinsacct'), name: '社保账户管理'},
                  {path: 'custAccuAcct', component: LazyLoad('custmanage/custaccuacct/custaccuacct'), name: '公积金账户管理'}
                ]
              },
              {path: 'entrustedtasklistsum', component: LazyLoad('trustOrderManage/entrustedtasklistconfi/entrustedtasklistsum/entrustedtasklistsum'), name: "受托方任务单汇总"},
              {path: 'entrustedtasklisdetails', component: LazyLoad('trustOrderManage/entrustedtasklistconfi/entrustedtasklisdetails/entrustedtasklisdetails'), name: "受托方任务单明细"}
            ]
          }
        ]
      },
      {
        path: 'orderQuery',
        component: LazyLoad('ordermanage/orderquery/orderquery'),
        name: "订单查询",
        children: [
          {path: 'orderDetails', component: LazyLoad('ordermanage/orderquery/orderdetail/orderdetails'), name: "订单详情"},
          {path: 'orderDet', component: LazyLoad('ordermanage/orderquery/orderdetail/orderdet'), name: "订单明细"},
          {path: 'serverProce', component: LazyLoad('ordermanage/orderquery/orderdetail/serverproce'), name: "服务手续"},
          {path: 'otherInfo', component: LazyLoad('ordermanage/orderquery/orderdetail/otherinfo'), name: "其他信息"},
          {path: 'orderPayCharge', component: LazyLoad('ordermanage/orderquery/orderdetail/orderpaycharge'), name: "订单收付费情况"}
        ]
      },
      {
        path: 'jobSingle',
        component: LazyLoad('ordermanage/jobmanage/jobsingle/jobsingle'),
        name: "订单维护",
        children: [
          {path: 'leaveInfo', component: LazyLoad('ordermanage/jobmanage/jobsingle/leaveinfo'), name: "撤离信息"},
          {path: 'updateChargeYm', component: LazyLoad('ordermanage/jobmanage/jobsingle/updatechargeym'), name: "修改收/付费账单年月"}
        ]
      },
      {
        path: 'dataRedeclaration',
        component: LazyLoad('ordermanage/dataredeclaration/dataredeclaration'),
        name: "超截止日数据再申报"
      },
      {
        path: 'jobBatch',
        component: LazyLoad('ordermanage/jobmanage/jobbatch/jobbatch'),
        name: "订单维护",
        children: [
          {path: 'hisImportSearch', component: LazyLoad('ordermanage/jobmanage/jobbatch/hisimportsearch'), name: "历史导入查询"}
        ]
      },
      {
        path: 'modifyCostCenter',
        component: LazyLoad('ordermanage/jobmanage/jobbatch/costCenter'),
        name: "修改成本中心"
      },
      {
        path: 'orderbeginDate',
        component: LazyLoad('ordermanage/jobmanage/jobbatch/orderbeginDate'),
        name: "修改订单开始日期"
      },
      {
        path: 'orderEndDate',
        component: LazyLoad('ordermanage/jobmanage/jobbatch/orderenddate'),
        name: "修改订单结束日期"
      },
      {
        path: 'jobBatchDecNum',
        component: LazyLoad('ordermanage/jobmanage/jobbatch/jobbatchdecnum'),
        name: "批量维护-申报基数",
        children: [
          {path: 'decNumHisSearch', component: LazyLoad('ordermanage/jobmanage/jobbatch/decnumhissearch'), name: "历史导入查询"}
        ]
      },
      {
        path: 'jobBatchLeave',
        component: LazyLoad('ordermanage/jobmanage/jobbatch/jobbatchleave'),
        name: "批量维护-撤离",
        children: [
          {path: 'hisImportSearch', component: LazyLoad('ordermanage/jobmanage/jobbatch/hisimportsearch'), name: "历史导入查询"}
        ]
      },
      {
        path: 'chargeAndPayTime',
        component: LazyLoad('ordermanage/jobmanage/jobbatch/chargeandpaytime'),
        name: "收/付费账单年月"
      },
      {
        path: 'dispCharge',
        component: LazyLoad('ordermanage/dispcharge/dispcharge'),
        name: "一次性收费管理",
        children: [
          {path: 'batchAdd', component: LazyLoad('ordermanage/dispcharge/batchadd'), name: "批量新增"}
        ]
      },
      {
        path: 'entrustedcharge',
        component: LazyLoad('chargenbill/entrustedcharge/entrustedcharge'),
        name: "受托收费账单",
        children: [
          {
            path: 'chargebilltemplate',
            component: LazyLoad('chargenbill/entrustedcharge/chargebilltemplate/chargebilltemplate'),
            name: "收费账单模版管理",
            children: [
              {path: 'ConfigurationHeader', component: LazyLoad('chargenbill/entrustedcharge/chargebilltemplate/ConfigurationHeader'), name: "配置表头"}
            ]
          },
          {path: 'entrustedtogether', component: LazyLoad('chargenbill/entrustedcharge/entrustedtogether/entrustedtogether'), name: "合单"},
          {path: 'chargeEmpSplit', component: LazyLoad('chargenbill/entrustedcharge/chargeempsplit/chargeEmpSplit'), name: "拆分"},
          {path: 'viewBillDet', component: LazyLoad('chargenbill/entrustedcharge/viewbilldet/viewbilldet'), name: "查看账单明细"}
        ]
      },
      {
        path: 'freedomcharge',
        component: LazyLoad('chargenbill/freedomcharge/freedomcharge'),
        name: "自主收费账单",
        children: [
          {
            path: 'freedomtemplate',
            component: LazyLoad('chargenbill/freedomcharge/freedomtemplate/freedomtemplate'),
            name: "收费账单模版管理",
            children: [
              {path: 'ConfigurationHeader', component: LazyLoad('chargenbill/freedomcharge/freedomtemplate/ConfigurationHeader'), name: "配置表头"}
            ]
          },
          {path: 'freedomtogether', component: LazyLoad('chargenbill/freedomcharge/freedomtogether/freedomtogether'), name: "合单"},
          {path: 'freedomAmountSplit', component: LazyLoad('chargenbill/freedomcharge/freedomamountsplit/freedomAmountSplit'), name: "拆单"},
          {path: 'freedomEmpSplit', component: LazyLoad('chargenbill/freedomcharge/freedomempsplit/freedomEmpSplit'), name: "拆单"},
          {path: 'viewBillDet', component: LazyLoad('chargenbill/freedomcharge/viewbilldet/viewbilldet'), name: "查看账单明细"}
        ]
      },
      // {path: 'configurationHeader', component: LazyLoad('chargenbill/configurationHeader'), name: "配置表头"},
      {path: 'suppPayBill', component: LazyLoad('chargenbill/supppaybill'), name: "供应商付费账单"},
      {path: 'billMeter', component: LazyLoad('chargenbill/billmeter'), name: "账单表头维护"},
      {
        path: 'entrustedtasklistconfi',
        component: LazyLoad('trustOrderManage/entrustedtasklistconfi/entrustedtasklistconfi'),
        name: '任务单接收',
        children: [
          {
            path: 'sinsaccuacctstan',
            component: LazyLoad('trustOrderManage/entrustedtasklistconfi/sinsaccuacctstan/sinsaccuacctstan'),
            name: '社保公积金账户标准',
            children: [
              {path: 'custSinsAcct', component: LazyLoad('custmanage/custsinsacct/custsinsacct'), name: '社保账户管理'},
              {path: 'custAccuAcct', component: LazyLoad('custmanage/custaccuacct/custaccuacct'), name: '公积金账户管理'}
            ]
          },
          {path: 'entrustedtasklisdetails', component: LazyLoad('trustOrderManage/entrustedtasklistconfi/entrustedtasklisdetails/entrustedtasklisdetails'), name: "受托方任务单明细"},
          {path: 'entrustedtasklistsum', component: LazyLoad('trustOrderManage/entrustedtasklistconfi/entrustedtasklistsum/entrustedtasklistsum'), name: "受托方任务单汇总"}
        ]
      }, // 任务单接收 （受托方）
      {path: 'signtasklistsum', component: LazyLoad('trustOrderManage/signtasklistsum/signtasklistsum'), name: "签约方任务单汇总"},
      {path: 'signtasklistdetail', component: LazyLoad('trustOrderManage/signtasklistdetail/signtasklistdetail'), name: "签约方任务单明细"},
      // 委托业务管理
      {
        path: 'signtasklistimp',
        component: LazyLoad('trustenmanage/signtasklistimp/signtasklistimp'),
        name: '委托单导入',
        children: [
          {path: 'sinsaccuacctstan', component: LazyLoad('trustOrderManage/entrustedtasklistconfi/sinsaccuacctstan/sinsaccuacctstan'), name: '社保公积金账户标准'}
        ]
      },
      {
        path: 'orderSearch',
        component: LazyLoad('trustenmanage/ordersearch/ordersearch'),
        name: "委托单查询",
        children: [
          {path: 'orderSearchDetails', component: LazyLoad('trustenmanage/ordersearch/ordersearchdetails'), name: "任务单详情"}
        ]
      },
      // 受托业务管理
      {
        path: 'trustManage',
        component: LazyLoad('trustmanage/trustmanage/trustmanage'),
        name: '受托单管理',
        children: [
          {path: 'trustmanageDetail', component: LazyLoad('trustmanage/trustmanage/trustmanageDetail'), name: "查看明细"},
          {path: 'trustmanageFeedback', component: LazyLoad('trustmanage/trustmanage/trustmanageFeedback'), name: "办理反馈"}
        ]
      },
      {
        path: 'salaryManage',
        component: LazyLoad('trustmanage/salarymanage/salarymanage'),
        name: '薪酬管理'
      },
      {
        path: 'trustOrderQuery',
        component: LazyLoad('trustmanage/trustorderquery/trustorderquery'),
        name: '受托订单查询'
      },
      {
        path: 'proxyBillManage',
        component: LazyLoad('trustmanage/proxybillmanage/proxybillmanage'),
        name: '受托账单管理'
      },
      // {
      //   path: 'entOrderSearch',
      //   component: LazyLoad('trustOrderManage/entordersearch/entordersearch'),
      //   name: "受托订单查询",
      //   children: [
      //     {path: 'orderDetails', component: LazyLoad('trustOrderManage/entordersearch/orderdetails'), name: "受托订单详情"},
      //     {path: 'orderDet', component: LazyLoad('trustOrderManage/entordersearch/orderdet'), name: "受托订单明细"},
      //     {path: 'serverProce', component: LazyLoad('trustOrderManage/entordersearch/serverproce'), name: "受托服务手续"},
      //     {path: 'orderPayCharge', component: LazyLoad('trustOrderManage/entordersearch/orderpaycharge'), name: "受托订单收付费情况"},
      //     {path: 'otherInfo', component: LazyLoad('trustOrderManage/entordersearch/otherinfo'), name: "受托其他信息"}
      //   ]
      // },
      // 医疗保障
      {path: 'alloMediSec', component: LazyLoad('medisec/allomedisec/allomedisec'), name: "异地医疗备案"},
      // {path: 'alloMediSecBack', component: LazyLoad('medisec/allomedisecback/allomedisecback'), name: "异地医疗返款"},
      {path: 'physicalReim', component: LazyLoad('medisec/physicalreim/physicalreim'), name: "体检费报销"},
      {path: 'mediMateBill', component: LazyLoad('medisec/medimatebill/medimatebill'), name: "医保生育收单"},
      {path: 'mediMateHandle', component: LazyLoad('medisec/medimatehandle/medimatehandle'), name: "医保生育办理"},
      // 工伤认定
      {
        path: 'injuryidentifybusi',
        component: LazyLoad('injuryidentify/injuryidentifybusi'),
        name: "工伤认定（业务员）",
        children: [
          {path: 'injuryidentifyParticular', component: LazyLoad('injuryidentify/injuryidentifyParticular'), name: "查看工伤认定信息"},
          {path: 'injuryidentifyModify', component: LazyLoad('injuryidentify/injuryidentifyModify'), name: "修改工伤认定信息"}
        ]
      },
      {
        path: 'injuryidentifybusiA',
        component: LazyLoad('injuryidentify/injuryidentifybusi'),
        name: "工伤认定",
        children: [
          {path: 'injuryidentifyParticular', component: LazyLoad('injuryidentify/injuryidentifyParticular'), name: "查看工伤认定信息"},
          {path: 'injuryidentifyModify', component: LazyLoad('injuryidentify/injuryidentifyModify'), name: "修改工伤认定信息"}
        ]
      },
      // 待办审批
      {path: 'agendaApp', component: LazyLoad('agenda/agendaApp'), name: '待办审批'},
      {path: 'approverApp', component: LazyLoad('agenda/approverApp'), name: '审批人审批'},
      // 公积金管理
      {path: 'accuManageCenter', component: LazyLoad('accumanage/accumanagecenter/accumanagecenter'), name: '公积金管理中心'},
      {path: 'accuAuditTotal', component: LazyLoad('accumanage/accuaudit/accuaudittotal'), name: '公积金申报审核'},
      {path: 'accuAuditDetail', component: LazyLoad('accumanage/accuaudit/accuauditdetail'), name: '公积金申报审核'},
      {path: 'accuOpenAccount', component: LazyLoad('accumanage/accuopenaccount/accuopenaccount'), name: '公积金账户开户管理'},
      {path: 'accuPerInfoAdmin', component: LazyLoad('accumanage/accuperinfoadmin/accuperinfoadmin'), name: '公积金个人信息维护'},
      {path: 'accuShare', component: LazyLoad('accumanage/accushare/accushare'), name: '公积金分摊表'},
      {path: 'accuDeclareAll', component: LazyLoad('accumanage/accudeclare/accudeclareall/accudeclareall'), name: '公积金申报'},
      {path: 'accuDeclareFeed', component: LazyLoad('accumanage/accudeclare/accudeclarefeed/accudeclarefeed'), name: '公积金申报'},
      {path: 'accuDeclarePage', component: LazyLoad('accumanage/accudeclare/accudeclarepage/accudeclarepage'), name: '公积金申报'},
      {path: 'accuDeclareReceipt', component: LazyLoad('accumanage/accudeclare/accudeclarereceipt/accudeclarereceipt'), name: '公积金申报'},
      {path: 'accuDataRemote', component: LazyLoad('accumanage/accudataremote/accudataremote'), name: '公积金数据实时查询'},
      {path: 'accuApplyPay', component: LazyLoad('accumanage/accuapplypay/accuapplypay'), name: '申请支付'},
      {path: 'accuPayInquire', component: LazyLoad('accumanage/accupayinquire/accupayinquire'), name: '公积金缴纳查询'},
      {path: 'accuQuestionPersAdmin', component: LazyLoad('accumanage/accuquestionpersadmin/accuquestionpersadmin'), name: '公积金问题人员管理'},
      {
        path: 'accuCounteroffer',
        component: LazyLoad('accumanage/accucounteroffer/accucounteroffer'),
        name: '回盘导入',
        children: [
          {path: 'accuDiffProcess', component: LazyLoad('accumanage/accucounteroffer/accudiffprocess'), name: "差异处理"}
        ]
      },
      // 社保 管理
      {path: 'SSBInfoMainte', component: LazyLoad('sinsmanage/ssbinfomainte/ssbinfomainte'), name: '社保局信息维护'},
      {path: 'sinsDeclEav', component: LazyLoad('sinsmanage/sinsdecleav/sinsdecleav'), name: '社保申报审核'},
      {path: 'sinsDeclEavDetail', component: LazyLoad('sinsmanage/sinsdecleav/sinsdecleavdetail'), name: '社保申报审核'},
      {path: 'sinsOpenAccount', component: LazyLoad('sinsmanage/sinsopenaccount/sinsopenaccount'), name: '社保账户开户管理'},
      {path: 'applyFnncPay', component: LazyLoad('sinsmanage/applyfnncpay/applyfnncpay'), name: '申请财务支付'},
      {path: 'sinsDeclareDetail', component: LazyLoad('sinsmanage/sinsdeclare/sinsdeclaredetail'), name: '社保申报'},
      {path: 'sinsShare', component: LazyLoad('sinsmanage/sinsshare/sinsshare'), name: '社保分摊表'},
      {path: 'sinsDeclareTotal', component: LazyLoad('sinsmanage/sinsdeclare/sinsdeclaretotal'), name: '社保申报'},
      // 回盘 导入
      {
        path: 'counterofferImport',
        component: LazyLoad('sinsmanage/sinsdeclare/counterofferImport'),
        name: '回盘导入',
        children: [
          {path: 'diverPading', component: LazyLoad('sinsmanage/sinsdeclare/diverpading'), name: "差异处理"}
        ]
      },
      {path: 'sinsPerInfoMai', component: LazyLoad('sinsmanage/sinsperinfomai/sinsperinfomai'), name: '社保个人信息维护'},
      {path: 'sinsCardManage', component: LazyLoad('sinsmanage/sinscardmanage/sinscardmanage'), name: '社保卡管理'},
      {path: 'sinsCardGrant', component: LazyLoad('sinsmanage/sinscardgrant/sinscardgrant'), name: '社保卡发放'},
      {
        path: 'sinsQuestionPersAdmin',
        component: LazyLoad('sinsmanage/sinsquestionpersadmin/sinsquestionpersadmin'),
        name: '社保问题人员管理',
        children: [
          {path: 'sinsPerInfoMai', component: LazyLoad('sinsmanage/sinsperinfomai/sinsperinfomai'), name: '社保个人信息维护'},
          {
            path: 'jobSingle',
            component: LazyLoad('ordermanage/jobmanage/jobsingle/jobsingle'),
            name: "订单维护",
            children: [
              {path: 'leaveInfo', component: LazyLoad('ordermanage/jobmanage/jobsingle/leaveinfo'), name: "撤离信息"},
              {path: 'updateChargeYm', component: LazyLoad('ordermanage/jobmanage/jobsingle/updatechargeym'), name: "修改收/付费账单年月"}
            ]
          }
        ]
      },
      {path: 'sinsDataRealTimeQuery', component: LazyLoad('sinsmanage/sinsdatarealtimequery/sinsdatarealtimequery'), name: '社保数据实时查询'},
      {path: 'sinsReaQuery', component: LazyLoad('sinsmanage/sinsreaquery/sinsreaquery'), name: '社保实做查询'},
      // 产品管理
      {path: 'prodInfo', component: LazyLoad('prodmanage/prodinfomanage/prodinfo/prodinfo'), name: "产品信息管理"},
      {path: 'proSche', component: LazyLoad('prodmanage/prodinfomanage/prosche/prosche'), name: "产品信息管理"},
      {path: 'prodPrice', component: LazyLoad('prodmanage/prodinfomanage/prodprice/prodprice'), name: "产品信息管理"},
      {path: 'agentBusManage', component: LazyLoad('prodmanage/agentbusmanage/agentbusmanage'), name: "代收代付管理"},
      {path: 'wageManage', component: LazyLoad('prodmanage/wagemanage/wagemanage'), name: "工资项维护管理"},
      {
        path: 'localStanPkg',
        component: LazyLoad('prodmanage/localstanmanage/localstanpkg/localstanpkg'),
        name: "地方标准管理",
        children: [
          {path: 'confPkg', component: LazyLoad('prodmanage/localstanmanage/localstanpkg/confpkg'), name: '配置组合'}
        ]
      },
      {
        path: 'localInfo',
        component: LazyLoad('prodmanage/localstanmanage/localinfo/localinfo'),
        name: "地方标准管理",
        children: [
          {path: 'addLocalInfo', component: LazyLoad('prodmanage/localstanmanage/localinfo/addlocalinfo'), name: '标准基本信息'}
        ]
      },
      {path: 'speBusi', component: LazyLoad('prodmanage/spebusi/spebusi'), name: "特殊业务说明"},
      {path: 'matConfAdmin', component: LazyLoad('matconfadmin/matconfadmin'), name: "材料配置管理"},
      // 薪资管理
      {path: 'taxConf', component: LazyLoad('salarymanage/taxconf/taxconf'), name: "税档设置"},
      {path: 'payTaxesConf', component: LazyLoad('salarymanage/paytaxesconf/paytaxesconf'), name: "纳税起征点设置"},
      {
        path: 'salaryBatchMainten',
        component: LazyLoad('salarymanage/salarybatchmainten/salarybatchmainten'),
        name: "薪酬维护",
        children: [
          {path: 'hisImportSearch', component: LazyLoad('salarymanage/salarybatchmainten/hisimportsearch'), name: '历史录入查询'},
          {path: 'orderDetSearch', component: LazyLoad('salarymanage/salarybatchmainten/orderdetsearch'), name: '订单明细查询'},
          {path: 'salarySingleMainten', component: LazyLoad('salarymanage/salarysinglemainten/salarysinglemainten'), name: "单个维护"}
        ]
      },
      // 个税查询
      {

        path: 'taxInquiry',
        component: LazyLoad('salarymanage/taxInquiry/taxInquiry'),
        name: '个税查询'
      },
      {

        path: 'salaryPaymentApply',
        component: LazyLoad('salarymanage/salarypaymentapply/salarypaymentapply'),
        name: '薪酬支付申请'
      },
      {
        path: 'revenueDecl',
        component: LazyLoad('salarymanage/revenuedecl/revenuedecl'),
        name: '个税申报'
      },
      // 工伤认定
      {path: 'injuryidentifybusi', component: LazyLoad('injuryidentify/injuryidentifybusi'), name: "工伤认定（业务员）"},
      {path: 'injuryidentify', component: LazyLoad('injuryidentify/injuryidentify'), name: "工伤认定"},
      // 劳动能力鉴定
      {
        path: 'apprLaboCapa',
        component: LazyLoad('apprlabocapa/apprlabocapa/apprlabocapa'),
        name: '劳动能力鉴定',
        children: [
          {path: 'viewApprApplyInfo', component: LazyLoad('apprlabocapa/apprlabocapa/viewapprapplyinfo/viewapprapplyinfo'), name: '查看鉴定申请信息'}
        ]
      },
      {path: 'injTreatApply', component: LazyLoad('apprlabocapa/injtreatapply/injtreatapply'), name: '工伤费用申请'},
      {path: 'injtreathandle', component: LazyLoad('apprlabocapa/injtreatapply/injtreathandle'), name: '工伤待遇办理'},
      {
        path: 'apprLaboCapaHandle',
        component: LazyLoad('apprlabocapa/apprlabocapahandle/apprlabocapahandle'),
        name: '劳动能力鉴定办理',
        children: [
          {path: 'viewApprApplyInfo', component: LazyLoad('apprlabocapa/apprlabocapahandle/viewapprapplyinfo/viewapprapplyinfo'), name: '查看鉴定申请信息'}
        ]
      },
      {
        path: 'adminPer', component: LazyLoad('lcmanage/adminper/adminper'), name: '后台管理-个人'
      },
      {
        path: 'adminEnt', component: LazyLoad('lcmanage/adminent/adminent'), name: '后台管理-企业'
      },
      {
        path: 'journAdmin',
        component: LazyLoad('lcmanage/journadmin/journadmin'),
        name: '新闻查询',
        children: [
          {path: 'journPreview', component: LazyLoad('lcmanage/journadmin/journpreview'), name: '新闻预览'}
        ]
      },
      {
        path: 'journissue', component: LazyLoad('lcmanage/journadmin/journissue'), name: '新闻发布'
      }
    ]
  }, {
    name: 'Login',
    path: '/login',
    component: LazyLoad('login/Login')
  }, {
    name: 'forgetPwd',
    path: '/forgetPwd',
    component: LazyLoad('login/forgetpwd')
  }, {
    name: 'Dashboard',
    path: '/dashboard',
    component: LazyLoad('home/Home')
  }, {
    path: '/',
    redirect: '/main'
  }
];
export default new Router({
  routes: constantRouterMap
});
