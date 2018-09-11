/**
 * Created by GuoXiangLian on 2017/10/25.
 */

  // 根据当前是否为开发环境
const BASE_API_URI = process.env.API_BASE_URI;
const WS_URI = process.env.WS_URI;
const WORKFLOW_URI = process.env.WORKFLOW_URI;

// 核心服务网关
const hrsc = BASE_API_URI + 'hrsc/';

// 用户服务网关
const author = BASE_API_URI + 'author/';

// 客户关系服务网关
const crm = BASE_API_URI + 'crm/';

// 薪酬服务网关
const salary = BASE_API_URI + 'salary/';

// 文件服务网关
const fileServer = BASE_API_URI + 'zuul/file/';

// 邮件服务网关
const mailServer = BASE_API_URI + 'mail/';

// 社保服务网关
const sins = BASE_API_URI + 'sins/';

// 公积金服务网关
const accu = BASE_API_URI + 'accu/';

// 两创平台
const lcAuthor = BASE_API_URI + 'lcAuthor/';

const lcPlat = BASE_API_URI + 'lcPlat/';

const lcEMP = BASE_API_URI + 'lcEmp/';

const lcEnterprise = BASE_API_URI + 'lcEnterprise/';


// <=============调试地址===============>
// const xieshengwei = 'http://192.168.85.9:8812';
// const zhiqiang = 'http://192.168.85.190:8812/';
// const junyu = 'http://192.168.85.131:8812/';
// const zhaolin = 'http://192.168.85.106:8850/';
// const lihao = 'http://192.168.85.137:8882/';
// const xiaolie = 'http://192.168.85.213:8832/';
// const lujun = 'http://192.168.85.131:8847/';
// const zhibin = 'http://192.168.85.66:8843/';
// const qinsen = 'http://192.168.85.71:8812/';
// const liangxiao = 'http://192.168.85.188:8812/';
// const xuemei = 'http://192.168.85.150:8812/';
// const guoguo = 'http://192.168.85.214:8832';
// const zhangyan = 'http://192.168.85.214:8832/';
// const jingjing = 'http://192.168.85.206:8814/';
// const lingfeng = 'http://192.168.85.140:8832/';

let apiPath = {
  hrsc: {
    findPaidOrdersAndDetPageButton: hrsc + 'fnnc/applyPay/findPaidOrdersAndDetPageButton', // 异地医疗返款查询按钮功能
    getOrderInfoExce: hrsc + 'order/getOrderInfoExce', // 订单导出
    findExitsConInfo: hrsc + 'coninfo/findExitsConInfo', // 新增合同之前的查询
    findCertNoById: hrsc + 'CUST/findCertNoById', // 客户下拉框根据客户Id获取客户个人证件号码
    findCostCentSelectBoxByEmpNo: hrsc + 'COSTCENT/findCostCentSelectBoxByEmpNo', // 当前雇员所在客户下的成本中心下拉框
    todoCountByTime: hrsc + 'flow/todoCountByTime', // 根据时间查询待办数量
    applyPayDownEmpEnt: hrsc + 'fnnc/applyPay/applyPayDownEmpEnt', // 增值税发票弹层
    applyPayDownEmp: hrsc + 'fnnc/applyPay/applyPayDownEmp', // 增值税发票弹层
    findCustInvInfo: hrsc + 'custSuppInvInfo/findCustInvInfo', // 增值税发票弹层
    updateCustImpState: hrsc + 'lcplat/updateCustImpState', // 修改企业导入状态
    downDetLoadOffer: hrsc + 'fnnc/applyPay/downDetLoadOffer', // 下载报盘
    doDetApply: hrsc + 'fnnc/applyPay/doDetApply', // 退回
    reback: hrsc + 'fnnc/applyPay/reback', // 退回
    previwReback: hrsc + 'fnnc/applyPay/previwReback', // 退汇退回前弹层展示
    getRemiOrderDetCombination: hrsc + 'fnnc/applyPay/getRemiOrderDetCombination', // 退汇查询
    judgeSuppExistCon: hrsc + 'coninfo/judgeSuppExistCon', // 判断供应商下是否存在合同
    updateEmpState: hrsc + 'userInfo/updateEmpState', // 修改导入雇员状态
    findSuppInfoChargeBillSelectbox: hrsc + 'suppinfo/findSuppInfoChargeBillSelectbox', // 根据当前登录人所负责的商务合同查询供应商信息下拉框
    selectByEnName: hrsc + 'suppinfo/selectByEnName', // 供应商简称下拉框
    findPaidOrderAll: hrsc + 'fnnc/applyPay/findPaidOrderAll', // 申请支付（ 默认查询页面数据）
    findCustAndSuppByConinfo: hrsc + 'suppinfo/findCustAndSuppByConinfo', // 申请支付（ 客户/供应商名称）
    lookReimOrderDet: hrsc + 'fnnc/applyPay/lookReimOrderDet', // 申请支付（ 查看详情）
    confirmApplyPayEmp: hrsc + 'fnnc/applyPay/confirmApplyPayEmp', // 申请支付（ 点击最后一步确认【申请支付】-雇员）
    confirmApplyPayEmpEnt: hrsc + 'fnnc/applyPay/confirmApplyPayEmpEnt', // 申请支付（ 点击最后一步确认【申请支付】-雇员）
    applyPayUpPage: hrsc + 'fnnc/applyPay/applyPayUpPage', // 申请支付（ 点击【上一页】 -支付方向为雇员员）
    updatePaidOrderReimEmp: hrsc + 'fnnc/applyPay/updatePaidOrderReimEmp', // 申请支付（ 点击【生成报销单】-支付方向为雇员）
    updatePaidOrderReimEmpEnt: hrsc + 'fnnc/applyPay/updatePaidOrderReimEmpEnt', // 申请支付（ 点击【生成报销单】-支付方向为雇员）
    applyPayDownPage: hrsc + 'fnnc/applyPay/applyPayDownPage', // 申请支付（ 点击【下一页】 - 支付方向为雇员）
    confirmApplyPayEnt: hrsc + 'fnnc/applyPay/confirmApplyPayEnt', // 申请支付（点击确认申请支付【申请支付】-企业）
    updatePaidOrderReimEnt: hrsc + 'fnnc/applyPay/updatePaidOrderReimEnt', // 申请支付（【查看报销单】-支付方向为企业）
    lookReimOrder: hrsc + 'fnnc/applyPay/lookReimOrder', // 申请支付页面（查看报销单）
    findApplyPay: hrsc + 'fnnc/applyPay/findApplyPay', // 申请支付页面查询（查询全部）
    applyPayFnnc: hrsc + 'fnnc/applyPay/applyPayFnnc', // 申请支付页面（ 点击【申请支付】）
    paidOrderDetDownload: hrsc + 'fnnc/applyPay/paidOrderDetDownload', // 支付管理（下载报销单明细）
    // getRemiOrderDetCombination: hrsc + 'fnnc/applyPay/getRemiOrderDetCombination', // 支付管理----报销单明细查询
    doApply: hrsc + 'fnnc/applyPay/doApply', // 支付管理----确认支付
    getPreviewApply: hrsc + 'fnnc/applyPay/getPreviewApply', // 支付管理----查看凭证
    doUploadApply: hrsc + 'fnnc/applyPay/doUploadApply', // 支付管理----上传凭证
    downLoadOffer: hrsc + 'fnnc/applyPay/downLoadOffer', // 支付管理----下载报盘
    checkReimOrderIsLoadOffer: hrsc + 'fnnc/applyPay/checkReimOrderIsLoadOffer', // 支付管理----下载报盘
    getPayInfoCombination: hrsc + 'fnnc/applyPay/getPayInfoCombination', // 支付管理----查询支付信息
    treatSelectBox: hrsc + 'fnnc/paidOrder/treatSelectBox', // 待遇类型下拉框
    getFnncReceiptInfo: hrsc + 'fnnc/paidOrder/getFnncReceiptInfo', // 收据查询
    fnncReceiptClaim: hrsc + 'fnnc/paidOrder/fnncReceiptClaim', // 返款认领--提交
    getFnncReceiptCombination: hrsc + 'fnnc/paidOrder/getFnncReceiptCombination', // 收据查询
    getFnncReceiptPayCorpName: hrsc + 'fnnc/paidOrder/getFnncReceiptPayCorpName', // 付款方名称下拉框
    remiClaim: hrsc + 'fnnc/remi/remiClaim', // 账单提交
    claimChargeBill: hrsc + 'bill/charge/chargeBillSupp/claimChargeBill', // 账单查询
    findChargeBillMerge: hrsc + 'bill/charge/chargeBillSupp/findChargeBillMerge', // 受托账单查询
    downloadDet: hrsc + 'bill/head/data/downloadDet', // 受托自主下载
    findChargeBillSpilit: hrsc + 'bill/charge/chargeBillSupp/findChargeBillSpilit', // 拆分已有账单查询
    comboGetRemiInfo: hrsc + 'fnnc/remi/comboGetRemiInfo', // 汇款单查询
    pageSelectRemiNameSelectBox: hrsc + 'fnnc/remi/pageSelectRemiNameSelectBox', // 汇款方名称下拉框
    applyForWriteOutReceipt: hrsc + 'fnnc/paidOrder/applyForWriteOutReceipt', // 拨付单--开收据
    getPreviewLayerThickness: hrsc + 'fnnc/paidOrder/getPreviewLayerThickness', // 拨付单--附件查看
    getPaidCombination: hrsc + 'fnnc/paidOrder/getPaidCombination', // 拨付单查询
    getCtrackingInvCombiantion: hrsc + 'fnnc/invManage/getCtrackingInvCombiantion', // 邮寄信息查询
    splitByEmpNo: hrsc + 'bill/charge/chargeBillCust/splitByEmpNo', // 自主收费账单拆分(按雇员拆分)拆分到已有账单
    findChagreBillByEmp: hrsc + 'bill/charge/chargeBillSuppDet/findChagreBillByEmp', // 受托收费账单拆分(按雇员拆分)一级查询
    splitNewChargeBill: hrsc + 'bill/charge/chargeBillCust/splitNewChargeBill', // 自主收费账单拆分(按雇员拆分)拆分到新的账单
    findExistChargeBill: hrsc + 'bill/charge/chargeBillCust/findExistChargeBill', // 自主收费账单拆分(按雇员拆分)查询已有账单
    updateChargeBillSpilit: hrsc + 'bill/charge/chargeBillSupp/updateChargeBillSpilit', // 自主收费账单拆分(按雇员拆分)查询已有账单
    findAreaIdSelectBoxByEmpNameCertNo: hrsc + 'orderSearch/findAreaIdSelectBoxByEmpNameCertNo', // 根据雇员姓名和证件号码获取工伤险种地区集合
    findCustSelectBoxByCertNoAndAreaId: hrsc + 'CUST/findCustSelectBoxByCertNoAndAreaId', // 根据证件号和执行地区（订单明细社保中的执行地区）查客户下拉框
    findCertNoAndAreaId: hrsc + 'suppinfo/findCertNoAndAreaId', // 付费供应商下拉框
    findPaySuppSelectBox: hrsc + 'suppinfo/findPaySuppSelectBox', // 任务单导入签约方-付费供应商下拉框
    findMatConfByDimenAndConfUse: hrsc + 'matConf/findMatConfByDimenAndConfUse', // 根据材料用途，维度，维度值查询材料配置
    findAllMatConfs: hrsc + 'matConf/findAllMatConfs', // 材料配置（查询）
    updateConfByDimenId: hrsc + 'matConf/updateConfByDimenId', // 材料配置（修改材料配置）
    addMatConf: hrsc + 'matConf/addMatConf', // 材料配置（新增材料配置）
    matInfoSelectBox: hrsc + 'matInfo/matInfoSelectBox', // 材料配置（材料下拉框）
    addMatInfos: hrsc + 'matInfo/addMatInfos', // 材料配置（添加材料）
    deleteByDimenId: hrsc + 'matConf/deleteByDimenId', // 材料配置（删除材料配置）
    findByEmp: hrsc + 'bill/chargeBill/detCust/findByEmp',  // 自主收费账单拆分(按雇员拆分)查询雇员信息
    mergeBillChargeCust: hrsc + 'bill/charge/chargeBillCust/mergeBillChargeCust', // 自主收费账单合单（合并）
    findMergeBillChargeCust: hrsc + 'bill/charge/chargeBillCust/findMergeBillChargeCust', // 自主收费账单合单（查询）
    empUpdateSynchro: hrsc + 'employee/empUpdateSynchro', // 社保个人信息维护（同步雇员模块--->确定）
    chargeDownload: hrsc + 'charge/head/data/download', // 受托收费账单批量下载(自主）
    findProdInfoAndProPaySelectBox: hrsc + 'prodinfo/findProdInfoAndProPaySelectBox', // 自主收费账单明细产品名称下拉框
    findByChargeBillDetCustId: hrsc + 'bill/chargeBill/detCust/findByChargeBillDetCustId', // 自主收费账单明细
    findChargeBillTempCustAll: hrsc + 'bill/charge/chargeBillTempCust/findChargeBillTempCustAll', // 自主收费账单模板查询
    updateChargeBillTempCust: hrsc + 'bill/charge/chargeBillTempCust/updateChargeBillTempCust', // 修改自主收费账单模板
    mergeChargeBillCust: hrsc + 'bill/charge/chargeBillTempCust/mergeChargeBillCust', // 合并自主收费账单模板
    chargeBillTempCustBox: hrsc + 'bill/charge/chargeBillTempCust/chargeBillTempCustBox', // 自主收费账单模板下拉框
    saveChargeBillTempDetCust: hrsc + 'bill/charge/chargeBillTempCust/saveChargeBillTempDetCust', // 拆分自主收费账单模板
    findChargeBillTempCustById: hrsc + 'bill/charge/chargeBillTempCust/findChargeBillTempCustById', // 查看自主收费账单模板
    chargeUpdate: hrsc + 'charge/temp/head/update', // 收付费根据收费账单模板表头ID编辑表头信息
    headFindByChName: hrsc + 'head/findByChName', // 收付费根据中文名称查询表头信息
    chargeDelete: hrsc + 'charge/temp/head/delete', // 收付费移除模板表头信息
    chargeSave: hrsc + 'charge/temp/head/save', // 收付费批量移入模板表头信息
    findAll: hrsc + 'head/findAll', // 收付费关联查询不重复的所有表头信息
    chargeFind: hrsc + 'charge/temp/head/find', // 收付费根据账单模板ID查看所有表头信息
    findCostCentSelectBox: hrsc + 'bill/charge/chargeBillCust/findCostCentSelectBox', // 自主成本中心下拉
    findByCustId: hrsc + 'bill/charge/chargeBillCust/findByCustId', // 自主按明细查询自主收费账单
    publishCustBill: hrsc + 'bill/charge/chargeBillCust/publishCustBill', // 自主收费账单发布财务
    updateCustBill: hrsc + 'bill/charge/chargeBillCust/updateCustBill', // 自主收费账单修改信息
    unlockChargeBillCust: hrsc + 'bill/charge/chargeBillCust/unlockChargeBillCust', // 自主收费账单解锁
    lockChargeBillCust: hrsc + 'bill/charge/chargeBillCust/lockChargeBillCust', // 自主收费账单锁单
    billFindCustInfo: hrsc + 'bill/charge/chargeBillCust/findCustInfo', // 自主收费账单查询
    updateChargeBillSupp: hrsc + 'bill/charge/chargeBillSupp/updateChargeBillSupp', // 受托收费账单修改信息
    updateChargeBillMerge: hrsc + 'bill/charge/chargeBillSupp/updateChargeBillMerge', // 受托收费账单修改信息
    saveChargeBillSpilit: hrsc + 'bill/charge/chargeBillSupp/saveChargeBillSpilit', // 受托收费账单拆分到新账单
    updateListSuppAddr: hrsc + 'suppaddr/updateListSuppAddr', // 受托批量修改邮寄地址
    saveOrUpdateCustAddr: hrsc + 'custAddr/saveOrUpdateCustAddr', // 自主批量修改邮寄地址
    publishChargeBill: hrsc + 'bill/charge/chargeBillSupp/publishChargeBill', // 受托收费发布财务
    areaFindBySuppid: hrsc + 'supp/suppBusiArea/findBySuppid', // 查看供应商业务可执行地区配置
    findBySuppId: hrsc + 'suppaddr/findBySuppId', // 供应商ID查询邮寄地址信息
    findSuppAddrSuppids: hrsc + 'suppaddr/findSuppAddrSuppids', // 供应商ID查询邮寄地址信息
    updateSuppBusiArea: hrsc + 'supp/suppBusiArea/updateSuppBusiArea', // 更新供应商业务可执行地区配置
    saveSelectboxBusiArea: hrsc + 'supp/suppBusiArea/saveSelectboxBusiArea', // 供应商配置可执行地区
    custInvInfoSelectbox: hrsc + 'custSuppInvInfo/custInvInfoSelectbox', // 客户增值税下拉
    suppInvInfoSelectbox: hrsc + 'custSuppInvInfo/suppInvInfoSelectbox', // 供应商增值税下拉
    findInvInfoSuppids: hrsc + 'custSuppInvInfo/findInvInfoSuppids', // 供应商集合增值税下拉
    unlockChargeBill: hrsc + 'bill/charge/chargeBillSupp/unlockChargeBill', // 受托收费账单解锁
    lockChargeBill: hrsc + 'bill/charge/chargeBillSupp/lockChargeBill', // 受托收费账单锁单
    findChargeBillSupp: hrsc + 'bill/charge/chargeBillSupp/findChargeBillSupp', // 签约方供应商查询收费账单
    listTaskInfosByCondition: hrsc + 'task/taskInfo/listTaskInfosByCondition', // 受托任务单查询
    getTaskInfoByTaskId: hrsc + 'task/taskInfo/getTaskInfoByTaskId', // 受托任务单查看明细
    listTaskDetServe: hrsc + 'task/taskInfo/listTaskDetServe', // 受托任务单查看明细服务费
    listTaskDetProdPay: hrsc + 'task/taskInfo/listTaskDetProdPay', // 受托任务单明细社保公积金
    listTaskDetWage: hrsc + 'task/taskInfo/listTaskDetWage', // 受托任务单明细工资
    batchDownloadImportFile: hrsc + 'task/taskImportBatch/batchDownloadImportFile', // 任务单导入下载
    listTaskImportBatch: hrsc + 'task/taskImportBatch/listTaskImportBatch', // 任务单导入原文件
    clerkTaskImportResult: hrsc + 'task/taskImport/clerkTaskImportResult', // 受托方导入确定
    listTaskInfos: hrsc + 'task/taskInfo/listTaskInfos', // 受托方任务单确认查询
    listTaskDetServeByTaskIds: hrsc + 'task/taskInfo/listTaskDetServeByTaskIds', // 受托方任务单确认按明细处理服务费
    getProdNumAndEmpNumByTaskIds: hrsc + 'task/taskInfo/getProdNumAndEmpNumByTaskIds', // 受托方任务单确认-消息
    listTaskDetProdPayByTaskIds: hrsc + 'task/taskInfo/listTaskDetProdPayByTaskIds', // 受托方任务单确认按明细处理代收代付
    findCustByPubBatchId: hrsc + 'taskConfirm/findCustByPubBatchId', // 受托方任务单确认-确认查询
    saveServeTempDet: hrsc + 'taskConfirm/saveServeTempDet', // 受托方任务单确认-确认确定
    saveServeTempDetAndTaskDetAndOrderDet: hrsc + 'taskConfirm/saveServeTempDetAndTaskDetAndOrderDet', // 受托方任务单确认-确认确定
    findPaySuppByPubId: hrsc + 'taskConfirm/findPaySuppByPubId', // 受托方任务单确认-确认维护收费截止日
    refuseTaskByPublishBatchId: hrsc + 'taskConfirm/refuseTaskByPublishBatchId', // 受托方任务单确认-拒绝
    refuseTaskByTaskIds: hrsc + 'taskConfirm/refuseTaskByTaskIds', // 受托方任务单确认-拒绝
    findPaySuppByTaskIds: hrsc + 'taskConfirm/findPaySuppByTaskIds', // 受托方任务单确认-任务单汇总
    findCustByTaskIds: hrsc + 'taskConfirm/findCustByTaskIds', // 受托方任务单确认-任务单汇总A
    checkTaskDeclRadixIsExsit: hrsc + 'taskConfirm/checkTaskDeclRadixIsExsit', // 任务单接收添加雇员社保、公积金申报基数校验
    downloadFilePublic: hrsc + 'download/downloadFilePublic', // 受托方导入确定
    updateTaskPublishBatchState: hrsc + 'task/taskPublishBatch/updateTaskPublishBatchState', // 任务单导入发布批次信息/删除
    findByChName: hrsc + 'suppinfo/findByChName', // 受托收费账单查询
    listTaskPublishBatch: hrsc + 'task/taskPublishBatch/listTaskPublishBatch', // 任务单发布批次
    signSuppTaskImportResult: hrsc + 'task/taskImport/signSuppTaskImportResult', // 任务单模版导入
    downloadTaskTemplate: hrsc + 'task/downloadTemplate/downloadTaskTemplate', // 任务单模版下载
    findServeTempSelectBoxbyCustId: hrsc + 'serveTempProvide/findServeTempSelectBoxbyCustId', // 任务单模版下载
    findCustName: hrsc + 'taskTemp/findCustName', // 维护产品查询客户
    findTaskTempByCustId: hrsc + 'taskTemp/findTaskTempByCustId', // 维护产品查询客户
    addTaskTemp: hrsc + 'taskTemp/addTaskTemp', // 维护产品查询客户保存
    getTaskImportResult: hrsc + 'taskTemp/getTaskImportResult', // 维护产品查询客户导入数据
    updateChargeBillTemp: hrsc + 'bill/charge/chargeBillTemp/updateChargeBillTemp', // 受托模版修改
    mergeChargeBill: hrsc + 'bill/charge/chargeBillTemp/mergeChargeBill', // 受托模版合并
    findChargeBillTempById: hrsc + 'bill/charge/chargeBillTemp/findChargeBillTempById', // 受托拆分查看
    saveListChargeBillTemp: hrsc + 'bill/charge/chargeBillTemp/saveListChargeBillTemp', // 受托收费账单模版拆分
    findChargeBillTempAll: hrsc + 'bill/charge/chargeBillTemp/findChargeBillTempAll', // 受托收费账单模版查询
    selectBoxChargeBill: hrsc + 'bill/charge/chargeBillTemp/selectBoxChargeBill', // 受托收费账单模版下拉
    pageEntrusted: hrsc + 'order/pageEntrusted', // 受托订单查询
    entrustedDetail: hrsc + 'order/entrustedDetail', // 受托订单详情
    entrustedpage: hrsc + 'order/det/serve/page', // 受托订单明细
    proPayPage: hrsc + 'order/det/proPay/page', // 受托订单明细代收代付
    wagePage: hrsc + 'order/det/wage/page', // 受托明细工资table
    pageAutonomy: hrsc + 'order/pageAutonomy', // 自主订单查询
    pageOrder: hrsc + 'order/pageOrder', // 自主订单查询
    prodNameDrop: hrsc + 'order/det/prodNameDrop', // 自主订单产品名称下拉框
    accrAreaDrop: hrsc + 'order/accrAreaDrop', // 自主订单派出地区下拉
    autonomyDetail: hrsc + 'order/autonomyDetail', // 自主订单-订单详情
    orderDetail: hrsc + 'order/orderDetail', // 自主订单-订单详情-new
    autoService: hrsc + 'order/det/empHandle/page', // 自主订单-订单服务手续
    modifyChargeBeginYm: hrsc + 'order/det/modifyChargeBeginYm', // 修改收费启动月
    modifyBegDate: hrsc + 'order/det/modifyBegDate', // 修改起做日期
    autonomyJobManageSingle: hrsc + 'order/autonomyJobManageSingle', // 在职管理单个维护一级查询
    getLeaveInfo: hrsc + 'order/getLeaveInfo', // 在职管理单个维护-撤离
    dimReasonDrop: hrsc + 'order/dimReasonDrop', // 在职管理单个维护-撤离
    calLeaveBegDate: hrsc + 'order/calLeaveBegDate', // 在职管理单个维护-撤离查询
    cancelLeaveSingle: hrsc + 'order/cancelLeaveSingle', // 在职管理取消撤离
    leaveSingle: hrsc + 'order/leaveSingle', // 在职管理单个维护-确认撤离
    updateOrderCostCentById: hrsc + 'order/updateOrderCostCentById', // 单个维护-修改成本中心
    updateOrderBegEndDate: hrsc + 'order/updateOrderBegEndDate', // 单个维护-修改订单开始结束日期
    findDetByOrderId: hrsc + 'order/det/findDetByOrderId', // 单个维护-修改订单明细起止做日期
    findServeByOrderId: hrsc + 'order/det/findServeByOrderId', // 单个维护-查询服务费金额
    updateOrderDetServeAmo: hrsc + 'order/det/updateOrderDetServeAmo', // 单个维护修改服务费金额
    updateOrderDetBegEndDate: hrsc + 'order/det/updateOrderDetBegEndDate', // 单个维护修改明细起止日期
    confirmAssSingle: hrsc + 'order/confirmAssSingle', // 单个派出确定
    epmExportExcelFail: hrsc + 'bankCardExp/exportExcelFail', // 雇员失败数据下载
    epmExportExcelSucc: hrsc + 'bankCardExp/exportExcelSucc', // 雇员成功数据下载
    empExportExcelAll: hrsc + 'bankCardExp/exportExcelAll', // 雇员全部数据下载
    inputBankCardExcel: hrsc + 'bankCard/inputBankCardExcel', // 批量导入excel数据
    bankCardDownTemplate: hrsc + 'bankCard/bankCardDownTemplate', // 下载银行卡模版
    findEtymaListByName: hrsc + 'etymaManager/findEtymaListByName', //  获取词根管理表格字段
    findColumnList: hrsc + 'etymaManager/findColumnList', // 获取词根管理检索结果
    saveEtyma: hrsc + 'etymaManager/saveEtyma', // 新增词根
    updateEtyma: hrsc + 'etymaManager/updateEtyma', // 修改词根
    deleteEtymaById: hrsc + 'etymaManager/deleteEtymaById', // 修改词根
    dropName: hrsc + 'mongo/fileTemplate/dropName', // 文件模版名称模糊查询
    saveFile: hrsc + 'mongo/fileTemplate/save', // 添加文件模版
    pageFile: hrsc + 'mongo/fileTemplate/page', // 分页条件一级查询
    deleteFile: hrsc + 'mongo/fileTemplate/delete', // 分页条件一级查询
    updateFile: hrsc + 'mongo/fileTemplate/update', // 分页条件一级查询
    findByIdFile: hrsc + 'mongo/fileTemplate/findById', // 分页条件一级查询
    dropByType: hrsc + 'mongo/fileTemplate/dropByType', // 分页条件一级查询
    downloadByType: hrsc + 'mongo/fileTemplate/downloadByType', // 根据文件模板类型下载模板
    downloadById: hrsc + 'mongo/fileTemplate/downloadById', // 根据文件模板类型下载模板
    empAll: hrsc + 'employee/empAll', // 雇员个人信息管理
    empUpdate: hrsc + 'employee/empUpdate', // 雇员个人信息管理
    bcAll: hrsc + 'bankCard/bcAll', // 雇员银行卡查询
    bcFind: hrsc + 'bankCard/bcFind', // 雇员银行卡查询
    bcDelete: hrsc + '/bankCard/bcDelete', // 雇员银行卡查询
    findAllOrderHandle: hrsc + '/empHandle/findAllOrderHandle', // 雇员手续办理查询
    findOrderById: hrsc + '/empHandle/findOrderById', // 雇员手续办理查询
    saveEmpHandle: hrsc + '/empHandle/saveEmpHandle', // 雇员手续办理确定
    findNoHandleCount: hrsc + '/empHandle/findNoHandleCount', // 雇员手续办理查询数据
    findHandleByOrderId: hrsc + '/empHandle/findHandleByOrderId', // 雇员手续办理查询历史
    findAllSucc: hrsc + 'OrderBatch/findAllSucc', // 雇员批量派出
    findAllOrderBatch: hrsc + 'OrderBatch/findAllOrderBatch', // 雇员批量派出查询成功失败
    validateTemp: hrsc + 'OrderBatch/validateTemp', // 雇员批量派出下载
    findAllFile: hrsc + 'OrderBatch/findAllFile', // 雇员批量派出查询
    orderExportExcelAll: hrsc + 'orderBatch/imp/exportExcelAll', // 雇员批量派出下载
    orderExportExcelFail: hrsc + 'orderBatch/imp/exportExcelFail', // 雇员批量派出下载
    orderExportExcelSucc: hrsc + 'orderBatch/imp/exportExcelSucc', // 雇员批量派出下载
    importXlsx: hrsc + 'OrderBatch/importXlsx', // 雇员批量派出导入
    addBatchOrder: hrsc + 'order/addBatchOrder', // 雇员批量派出确认派出
    addOrder: hrsc + 'order/addOrder', // 雇员单个派出查询列表
    addAreaDrop: hrsc + 'order/addAreaDrop', // 雇员单个派出地区
    originalDownload: hrsc + 'OrderBatch/originalDownload', // 雇员批量派出源文件
    downloadOrderLeaveExcel: hrsc + 'OrderBatch/downloadOrderLeaveExcel', // 在职管理-批量撤离-下载
    downloadOrderUpServeMoneyExcel: hrsc + 'OrderBatch/downloadOrderUpServeMoneyExcel', // 批量维护-服务费下载
    downloadOrderUpServeMoneyData: hrsc + 'OrderBatch/downloadOrderUpServeMoneyData', // 批量维护-导入数据下载
    impOrderLeaveExcel: hrsc + 'OrderBatch/impOrderLeaveExcel', // 在职管理-批量撤离-导入
    impOrderUpServeMoneyExcel: hrsc + 'OrderBatch/impOrderUpServeMoneyExcel', // 批量维护-模板上传
    downloadOrderLeaveDataByBatNo: hrsc + 'OrderBatch/downloadOrderLeaveDataByBatNo', // 在职管理-批量撤离-导入下载失败数据
    findAllImpOrderLeaveExcelByBatNo: hrsc + 'OrderBatch/findAllImpOrderLeaveExcelByBatNo', // 在职管理-批量撤离-导入成功列表数据
    findOrderLeaveImpInfo: hrsc + 'OrderBatch/findOrderLeaveImpInfo', // 在职管理-批量撤离-历史导入信息查询
    findOrderLeaveImpDelInfo: hrsc + 'OrderBatch/findOrderLeaveImpDelInfo', // 在职管理-批量撤离-历史导入明细查询
    findCcustSelectBox: hrsc + 'OrderBatch/findCcustSelectBox', // 在职管理-批量撤离-历史-客户下拉框
    findCustInfoSelectBoxAll: hrsc + 'custInfo/findCustInfoSelectBoxAll', // 在职管理-批量撤离-历史-客户下拉框
    findCustAndSuppSelectBox: hrsc + 'custInfo/findCustAndSuppSelectBox', // 后台管理-个人客户供应商公用一个下拉框
    findCustInfoSelectBoxBySuppId: hrsc + 'custInfo/findCustInfoSelectBoxBySuppId', // 根据订单上的签约供应商查订单的客户下拉框
    // 数据结构管理
    findTableNameList: hrsc + 'dataStructure/findTableNameList', // 数据管理
    findTableData: hrsc + 'dataStructure/findTableData', // 显示表数据
    listDictInfos: hrsc + 'dictInfo/listDictInfos', // 初始化查询字典
    updateDictInfo: hrsc + 'dictInfo/updateDictInfo', // 数据字典更新
    getDictInfo: hrsc + 'dictInfo/getDictInfo', // 查看字典
    deleteDictInfo: hrsc + 'dictInfo/deleteDictInfo', // 数据字典删除
    getDictInfoDetail: hrsc + 'dictInfoDetail/getDictInfoDetail', // 查看字典值
    saveDictInfoDetail: hrsc + 'dictInfoDetail/saveDictInfoDetail', // 新增字典值
    updateDictInfoDetail: hrsc + 'dictInfoDetail/updateDictInfoDetail', // 更新字典值
    deleteDictInfoDetail: hrsc + 'dictInfoDetail/deleteDictInfoDetail', // 删除字典值
    listDictInfoDetail: hrsc + 'dictInfoDetail/listDictInfoDetail', // 查询按钮点击查询字典值
    listDictInfo: hrsc + 'dictInfo/listDictInfo', // 数据字典查询
    saveDictInfo: hrsc + 'dictInfo/saveDictInfo', // 数据字典新增
    getMaxDictInfoValueByCode: hrsc + 'dictInfoDetail/getMaxDictInfoValueByCode', // 获取最新字典码
    findBankInfoListByName: hrsc + 'bank/findBankInfoListByName', // 银行信息查询
    saveBankInfo: hrsc + 'bank/saveBankInfo', // 银行信息添加
    updateBankInfo: hrsc + 'bank/updateBankInfo', // 银行信息修改
    findBankInfoById: hrsc + 'bank/findBankInfoById', // 银行信息查看
    deleteBankInfoById: hrsc + 'bank/deleteBankInfoById', // 银行信息删除
    bankDownTemplate: hrsc + 'bank/bankDownTemplate', // 银行信息下载
    inputBankInfoExcel: hrsc + 'bank/inputBankInfoExcel', // 银行信息导入
    downBankExcel: hrsc + 'bank/downBankExcel', // 银行信息下载
    findAreaListTree: hrsc + 'areaManager/findAreaListTree', // 地区管理树查询
    loadAreaList: hrsc + 'areaManager/loadAreaList', // 地区管理逐级加载
    findAreaById: hrsc + 'areaManager/findAreaById', // 地区管理查看详情
    saveArea: hrsc + 'areaManager/saveArea',  // 地区管理添加
    updateArea: hrsc + 'areaManager/updateArea', // 地区管理修改
    deleteAreaById: hrsc + 'areaManager/deleteAreaById', // 地区管理删除
    getDictSelectBox: hrsc + 'dictSelectBox/getDictSelectBox', // 字典下拉框
    findAreaList: hrsc + 'areaManager/findAreaList', // 地区管理
    findAreaListByBusiAreaType: hrsc + 'areaManager/findAreaListByBusiAreaType', // 根据业务类型获取地区下拉框
    raiseArea: hrsc + 'areaManager/raiseArea', // 地区向上
    downArea: hrsc + 'areaManager/downArea', // 地区向下
    findPageInfos: hrsc + 'CUST/findPageInfos', // 查询客户基本信息
    findCustInfo: hrsc + 'CUST/findCustInfo', // 查看客户基本信息
    saveCust: hrsc + 'CUST/saveCust', // 新增客户基本信息
    updateCustInfEo: hrsc + 'CUST/updateCustInfEo', // 修改客户基本信息
    deleteCustInfEo: hrsc + 'CUST/deleteCustInfEo', // 删除客户基本信息
    findCustCostPage: hrsc + 'COSTCENT/findCustCostPage', // 查询成本信息
    saveCostCent: hrsc + 'COSTCENT/saveCostCent', // 新增客户成本信息
    deleteCostCent: hrsc + 'COSTCENT/deleteCostCent', // 删除客户成本信息
    updateCostCent: hrsc + 'COSTCENT/updateCostCent', // 修改客户成本信息
    findCostCent: hrsc + 'COSTCENT/findCostCent', // 查看客户成本信息
    findCostCentSelectBoxBy: hrsc + 'COSTCENT/findCostCentSelectBoxByCustIdAndRespBusiRepId', // 成本中心
    costCentSelectBox: hrsc + 'COSTCENT/findCostCentSelectBox', // 成本中心下拉框
    findCustSelectInfo: hrsc + 'serveTemp/custInfoSelectBox', // 全部客户下拉框
    custSelectBox: hrsc + 'OrderBatch/custSelectBox', // 历史派出客户下拉
    bankInfoDropdown: hrsc + 'bank/bankInfoDropdown', // 开户行下拉
    findBankNoById: hrsc + 'bank/findBankNoById', // 开户行下拉
    findCustBankAccts: hrsc + 'BANKACCT/findCustBankAccts', // 查询客户银行
    saveCustBankAcct: hrsc + 'BANKACCT/saveCustBankAcct', // 新增银行
    findAreaListGroup: hrsc + 'areaManager/findAreaListGroup', // 城市下拉框
    deleteCustBankAcct: hrsc + 'BANKACCT/deleteCustBankAcct', // 删除客客户银行
    updateCustBankAcct: hrsc + 'BANKACCT/updateCustBankAcct', // 修改客户银行
    findCustBankAcct: hrsc + 'BANKACCT/findCustBankAcct', // 查看客户银行
    findCustAddrPageInfo: hrsc + 'custAddr/findCustAddrPageInfo', // 查询客户邮寄地址
    findCustAddr: hrsc + 'bill/charge/chargeBillCust/findCustAddr', // 查询客户邮寄地址
    updateCustAddr: hrsc + 'custAddr/updateCustAddr', // 修改客户邮寄地址
    deleteCustAddr: hrsc + 'custAddr/deleteCustAddr', // 删除客户邮寄地址
    saveCustAddr: hrsc + 'custAddr/saveCustAddr', // 新增客户邮寄地址
    findCustAddrById: hrsc + 'custAddr/findCustAddrById', // 查看客户邮寄地址
    findAcctInfo: hrsc + 'suppacct/findAcctInfo', // 查询供应商银行账户
    suppacctSave: hrsc + '/suppacct/save', // 新增供应商银行账户
    suppacctUpdate: hrsc + 'suppacct/update', // 修改供应商银行账户
    suppacctDelete: hrsc + 'suppacct/delete', // 删除供应商银行账户
    suppacctFind: hrsc + 'suppacct/find', // 查看供应商银行账户
    suppinfoAll: hrsc + 'suppinfo/all', // 查询供应商基础信息
    suppinfoFind: hrsc + 'suppinfo/find', // 查看供应商基础信息
    suppinfoUpdate: hrsc + 'suppinfo/update', // 修改供应商基础信息
    suppinfoDelete: hrsc + 'suppinfo/delete', // 供应商基础信息
    suppinfoQueryExistOtherInfo: hrsc + 'suppinfo/queryExistOtherInfo', // 确认改供应商下是否存在其他信息
    suppinfoAdd: hrsc + 'suppinfo/add', // 供应商基础信息
    billSuppCust: hrsc + 'suppinfo/billSuppCust', // 客户/供应商下拉框
    suppUpdateChargeEndDate: hrsc + 'suppinfo/updateChargeEndDate', // 修改供应商收费截止日期
    findByOrderSignSupp: hrsc + 'suppinfo/findByOrderSignSupp', // 签约供应商下拉框
    findAddrAndInfo: hrsc + 'suppaddr/findAddrAndInfo', // 供应商邮寄地址查询
    suppaddrSave: hrsc + 'suppaddr/save', // 供应商邮寄地址新增
    suppaddrUpdate: hrsc + 'suppaddr/update', // 供应商邮寄地址修改
    suppaddrDelete: hrsc + 'suppaddr/delete', // 供应商邮寄地址删除
    findCont: hrsc + 'suppcont/findCont', // 供应商联系人查询
    suppcontFind: hrsc + 'suppcont/find', // 供应商联系人查看
    findSave: hrsc + 'suppcont/save', // 供应商联系人新增
    findUpdate: hrsc + 'suppcont/update', // 供应商联系人修改
    findDelete: hrsc + 'suppcont/delete', // 供应商联系人删除
    findEqualName: hrsc + 'suppcont/findEqualName', // 供应商联系人查询是否存在重复姓名
    listSuppInvInfo: hrsc + 'custSuppInvInfo/listSuppInvInfo', // 供应商发票查询
    listCustInvInfo: hrsc + 'custSuppInvInfo/listCustInvInfo', // 客户管理发票查询
    saveCustOrSuppInvInfo: hrsc + 'custSuppInvInfo/saveCustOrSuppInvInfo', // （客户管理和供应商管理）发票新增
    getCustSuppInvInfo: hrsc + 'custSuppInvInfo/getCustSuppInvInfo', // （客户管理和供应商管理）发票查看
    invMatFileDownload: hrsc + 'custSuppInvInfo/invMatFileDownload', // 客户管理发票获取下载图片链接
    updateCustSuppInvInfo: hrsc + 'custSuppInvInfo/updateCustSuppInvInfo', // （客户管理和供应商管理）发票修改
    listCustSuppInvMatNames: hrsc + 'custSuppInvMat/listCustSuppInvMatNames', //  获取发票材料名称的请求
    getCustInvInfoExcel: hrsc + 'custSuppInvInfo/getCustInvInfoExcel', // 客户管理获取发票导出链接
    getSuppInvInfoExcel: hrsc + 'custSuppInvInfo/getSuppInvInfoExcel', // 供应商管理获取发票导出链接
    findSuppDimReason: hrsc + 'SuppDimReason/findSuppDimReason', // 供应商离职原因查看
    findAllSuppDimReason: hrsc + 'SuppDimReason/findAllSuppDimReason', // 供应商离职原因查询
    saveSuppDimReason: hrsc + 'SuppDimReason/saveSuppDimReason', // 供应商离职原因新增
    updateSuppDimReason: hrsc + 'SuppDimReason/updateSuppDimReason', // 供应商离职原因修改
    deleteSuppDimRason: hrsc + 'SuppDimReason/deleteSuppDimRason', // 供应商离职原因删除
    findByDimReasonId: hrsc + 'SuppDimReason/findByDimReasonId', // 供应商离职原因材料删除查询
    selectSuppDimReasonBox: hrsc + 'DimReason/selectSuppDimReasonBox', // 供应商离职原因下拉选择
    findDimReasonAll: hrsc + 'DimReason/findDimReasonAll', // 离职原因材料查询
    findDimReasonById: hrsc + 'DimReason/findDimReasonById', // 离职原因材料查看
    saveDimReason: hrsc + 'DimReason/saveDimReason', // 离职原因材料新增
    updateDimReason: hrsc + 'DimReason/updateDimReason', // 离职原因材料修改
    deletDimReason: hrsc + 'DimReason/deletDimReason', // 离职原因材料删除
    selectDimReasonMatBox: hrsc + 'DimReason/selectDimReasonMatBox', // 离职原因材料下拉框
    findConSuppCust: hrsc + 'coninfo/findConSuppCust', // 商务合同查询
    delete: hrsc + 'coninfo/delete', // 商务合同作废
    respbusidepid: hrsc + 'coninfo/respbusidepid', // 商务合同指派业务部门
    uploadFilePublic: fileServer + 'upload/upload', // 文件上传服务
    uploadToCom: fileServer + 'upload/uploadToCom', // 两创轮播图
    previewTemp: fileServer + 'previewTemp', // 文件上传服务
    preview: fileServer + 'preview', // 文件下载服务
    respbusirepid: hrsc + 'coninfo/respbusirepid', // 商务合同指派业务代表确定
    chanallbusistate: hrsc + 'coninfo/chanallbusistate', // 商务合同指派业务代表确定
    downLoadEnc: hrsc + 'coninfo/downLoadEnc', // 商务合同附件下载
    save: hrsc + 'coninfo/save', // 商务合同新增保存
    update: hrsc + 'coninfo/update', // 商务合同修改
    all: hrsc + 'suppinfo/all', // 商务合同客户
    selectBox: hrsc + 'suppinfo/selectBox', // 供应商名称下拉框
    coninfoSelectBox: hrsc + 'coninfo/selectBox', // 商务合同下拉框
    findByCustIdSelectBox: hrsc + 'coninfo/findByCustIdSelectBox', // 商务合同下拉框最新
    preEnc: hrsc + 'coninfo/preEnc', // 商务合同审核查看附件
    checkcustconinfo: hrsc + 'coninfo/checkconinfo', // 商务合同审核审核通过
    nonapprova: hrsc + 'coninfo/nonapproval', // 商务合同审核审核不通过
    find: hrsc + 'coninfo/find', // 商务合同查看
    listLocalStanPkgs: hrsc + 'localStanPkg/listLocalStanPkgs', // 地区标准组合查询
    saveLocalStanPkg: hrsc + 'localStanPkg/saveLocalStanPkg', // 地区标准组合新增确认
    updateLocalStanPkg: hrsc + 'localStanPkg/updateLocalStanPkg', // 地区标准组合修改确认
    getLocalStanPkg: hrsc + 'localStanPkg/getLocalStanPkg', // 地区标准组合启用
    getLocalStanPkgAndLocalStansExcel: hrsc + 'localStanPkg/getLocalStanPkgAndLocalStansExcel', // 地区标准组合导出
    getLocalStanPkgList: hrsc + 'localStanPkg/getLocalStanPkgList', // 地区标准组合配置
    listLocalStanNotInPkg: hrsc + 'localStanPkgRel/listLocalStanNotInPkg', // 地区标准组合配置
    saveLocalStanPkgRel: hrsc + 'localStanPkgRel/saveLocalStanPkgRel', // 地区标准组合配置移入
    deleteLocalStanPkgRel: hrsc + 'localStanPkgRel/deleteLocalStanPkgRel', // 地区标准组合配置移除
    getLocalStanPkgSelectBox: hrsc + 'localStanPkg/getLocalStanPkgSelectBox', // 地方标准组合下拉框
    findpropayname: hrsc + 'prodpropay/findpropayname', // 地区标准基本信息地方标准项下拉菜单
    listLocalStans: hrsc + 'localStan/listLocalStans', // 地区标准基本信息查询
    updateLocalStan: hrsc + 'localStan/updateLocalStan', // 地区标准基本信息启用
    deleteLocalStan: hrsc + 'localStan/deleteLocalStan', // 地区标准基本信息删除
    saveAddiStan: hrsc + 'localStan/saveAddiStan', // 地区标准基本信息新增补缴
    saveLocalStan: hrsc + 'localStan/saveLocalStan', // 地区标准基本信息新增
    getLocalStan: hrsc + 'localStan/getLocalStan', // 地区标准基本信息查看
    updateEndDate: hrsc + 'localStan/updateEndDate', // 地区标准组合配置
    listLocalStanSpeDescs: hrsc + 'localStanSpeDesc/listLocalStanSpeDescs', // 特殊业务说明查询
    saveLocalStanSpeDesc: hrsc + 'localStanSpeDesc/saveLocalStanSpeDesc', // 特殊业务说明新增
    updateLocalStanSpeDesc: hrsc + 'localStanSpeDesc/updateLocalStanSpeDesc', // 特殊业务说明修改
    getLocalStanSpeDesc: hrsc + 'localStanSpeDesc/getLocalStanSpeDesc', // 特殊业务说明查看
    deleteLocalStanSpeDesc: hrsc + 'localStanSpeDesc/deleteLocalStanSpeDesc', // 特殊业务说明删除
    speDescDrop: hrsc + 'rule/exCaseName/drop', // 特殊情况名称下拉
    speDescInfoDrop: hrsc + 'rule/exCaseNo/drop', // 特殊情况编号下拉
    conList: hrsc + 'flow/model/list', // 流程配置查询
    conInsert: hrsc + 'flow/model/insert', // 流程配置添加
    conDisable: hrsc + 'flow/model/disableModel', // 流程配置停用
    conUpdate: hrsc + 'flow/model/update', // 流程配置修改
    conDelete: hrsc + 'flow/model/delete', // 流程配置删除
    conDeployment: hrsc + 'flow/model/deployment', // 流程配置发布
    conGetById: hrsc + 'flow/model/getById', // 流程配置查看
    count: hrsc + 'flow/process/count', // 流程监管查询
    countList: hrsc + 'flow/info/list', // 流程监管查询
    countDrop: hrsc + 'flow/model/drop', // 流程名称下拉
    versions: hrsc + 'flow/model/versions', // 流程版本下拉
    countMain: hrsc + 'flow/todo/count', // 首页代办审批数量
    getParticipateStateCount: hrsc + 'flow/getParticipateStateCount', // 我参与的审批状态数量
    getByStarterResultCount: hrsc + 'flow/getByStarterResultCount', // 我发起的审批状态数量
    previewflow: hrsc + 'flow/preview', // 流程版本查看
    countInfoList: hrsc + 'flow/info/task/list', // 流程监管查看
    dropCorp: hrsc + 'fnnc/dropCorp', // 汇款方公司名称下拉框
    page: hrsc + 'fnnc/remi/page', // 汇款方查询
    remiSave: hrsc + 'fnnc/remi/save', // 汇款方新增
    remiUpdate: hrsc + 'fnnc/remi/update', // 汇款方修改
    remiDelete: hrsc + 'fnnc/remi/delete', // 汇款方删除
    remiPublish: hrsc + 'fnnc/remi/publish', // 汇款方发布
    remiTemplate: hrsc + 'fnnc/remi/template', // 汇款方下载模板
    remiNoPublish: hrsc + 'fnnc/remi/nopublish', // 汇款取消发布
    remiGetById: hrsc + 'fnnc/remi/getById', // 汇款查看
    remiImportXls: hrsc + 'fnnc/remi/importXls', // 汇款批量导入
    autoMatching: hrsc + 'fnnc/remi/autoMatching', // 汇款自动认领
    batchPublish: hrsc + 'fnnc/remi/batchPublish', // 汇款自动认领发布
    autoClaim: hrsc + 'fnnc/remi/autoClaim', // 汇款自动认领确认认领
    pageBatchPublish: hrsc + 'fnnc/remi/pageBatchPublish', // 汇款自动认领查看
    exportExcelFail: hrsc + 'fnnc/remi/imp/exportExcelFail', // 汇款批量下载失败数据
    exportExcelSucc: hrsc + 'fnnc/remi/imp/exportExcelSucc', // 汇款批量下载成功数据
    exportExcelAll: hrsc + 'fnnc/remi/imp/exportExcelAll', // 下载所有数据
    findInvSub: hrsc + 'fnnc/invSub/findInvSub', // 发票科目查询
    getCashingInv: hrsc + 'fnnc/invManage/getCashingInv', // 发票领取
    getCtrackingInv: hrsc + 'fnnc/invManage/getCtrackingInv', // 发票邮寄(获取)
    ctrackingInv: hrsc + 'fnnc/invManage/ctrackingInv', // 发票邮寄(获取)
    getDraftInv: hrsc + 'fnnc/invManage/getDraftInv', // 发票邮寄(获取上一条下一条)
    updateDraftInv: hrsc + 'fnnc/invManage/updateDraftInv', // 发票邮寄(获取上一条下一条)
    cashingInv: hrsc + 'fnnc/invManage/cashingInv', // 发票领取确定
    getInvManager: hrsc + 'fnnc/invManage/getInvManager', // 发票查看
    cancalInvoiceInv: hrsc + 'fnnc/invManage/cancalInvoiceInv', // 取消发票
    cancalCashingInv: hrsc + 'fnnc/invManage/cancalCashingInv', // 取消领取
    cancalCtrackingInv: hrsc + 'fnnc/invManage/cancalCtrackingInv', // 取消邮寄
    updateInvSub: hrsc + 'fnnc/invSub/updateInvSub', // 发票科目修改
    findInvSubById: hrsc + 'fnnc/invSub/findInvSubById', // 发票科目查看
    saveInvSub: hrsc + 'fnnc/invSub/saveInvSub', // 发票科目新增
    findallquestion: hrsc + 'helpquestion/findallquestion', // 常见问题查询
    addquestion: hrsc + 'helpquestion/addquestion', // 常见问题新增
    getInvModelExcel: hrsc + '/fnnc/billCharge/getInvModelExcel', // 账单管理页模板下载
    showSaveInvInfo: hrsc + '/fnnc/billCharge/showSaveInvInfo', // 开票信息弹层
    updatehelpquestion: hrsc + 'helpquestion/updatequestion', // 常见问题修改
    findbyidquestion: hrsc + 'helpquestion/findbyidquestion', // 常见问题查看
    deletequestion: hrsc + 'helpquestion/deletequestion', // 常见问题失效
    findallhelpstudydata: hrsc + 'helpstudydata/findallhelpstudydata', // 学习资料查询
    deletehelpstudydata: hrsc + 'helpstudydata/deletehelpstudydata', // 学习资料失效
    addhelpstudydata: hrsc + 'helpstudydata/addhelpstudydata', // 学习资料添加
    findbyidhelpstudydata: hrsc + 'helpstudydata/findbyidhelpstudydata', // 学习资料查看
    updatehelpstudydata: hrsc + 'helpstudydata/updatehelpstudydata', // 学习资料修改
    pictureVideo: hrsc + 'helpstudydata/pictureVideo', // 学习资料视频
    downloadFile: hrsc + 'helpstudydata/downloadFile', // 学习资料下载
    findhelpadmin: hrsc + 'helpadmin/findhelpadmin', // 联系管理员查询
    addhelpadmin: hrsc + 'helpadmin/addhelpadmin', // 联系管理员新增
    updatehelpadmin: hrsc + 'helpadmin/updatehelpadmin', // 联系管理员修改
    findPriceSelectBoxEnable: hrsc + 'prodinfo/findPriceSelectBoxEnable', // 所有已起用的产品价方案下拉框
    // 系统公告
    findAllSysNotice: hrsc + 'system/sysAll', // 系统公告查询
    sysSave: hrsc + 'system/sysSave', // 系统公告新增
    sysFind: hrsc + 'system/sysFind', //  系统公告查看
    sysPublish: hrsc + 'system/sysPublish', // 系统公告发布
    sysUpdate: hrsc + 'system/sysUpdate', // 系统公告修改
    sysFindUser: hrsc + 'system/sysFind', // 系统通知点击后的公告地址
    sysSaveRead: hrsc + 'system/sysSaveRead', // 统计阅读人数
    sysPublishByTokenList: hrsc + 'system/sysPublishByTokenList', // 再次发送系统公告
    // 代收代付项管理
    addprodpropay: hrsc + 'prodpropay/addprodpropay', // 添加代收代付
    updateprodpropay: hrsc + 'prodpropay/updateprodpropay', // 修改代收代付
    deleteprodpropay: hrsc + 'prodpropay/deleteprodpropay', // 代收代付启用停用
    findallprodpropay: hrsc + 'prodpropay/findallprodpropay', // 查询代收代付
    findbyidprodpropay: hrsc + 'prodpropay/findbyidprodpropay', // 查看代收代付
    invSubSelectBox: hrsc + 'fnnc/invSub/invSubSelectBox', // 发票科目下拉框
    // 账单收费管理
    findBillCharge: hrsc + '/fnnc/billCharge/findBillCharge', // 账单收费页面查询
    updateBillChargeState: hrsc + '/fnnc/billCharge/updateBillChargeState', // 收费
    saveInvInfo: hrsc + '/fnnc/billCharge/saveInvInfo', // 开票
    updateCancelChargeState: hrsc + '/fnnc/billCharge/updateCancelChargeState', // 取消收费
    importInvInfoExcel: hrsc + '/fnnc/billCharge/importInvInfoExcel', // 导入
    findInvInfo: hrsc + '/fnnc/billCharge/findInvInfo',  // 查看发票信息
    updatePublishRetState: hrsc + '/fnnc/billCharge/updatePublishRetState', // 发布退回
    updateCancelDrawerList: hrsc + '/fnnc/billCharge/updateCancelDrawerList',  //  取消开票
    updateCancelDrawer: hrsc + '/fnnc/billCharge/updateCancelDrawer', // 单个取消开票
    // 发票管理
    findInvSubInv: hrsc + 'fnnc/invManage/findInvSub', // 单个取消开票
    // 产品管理
    findprodinfoselectbox: hrsc + 'prodinfo/findprodinfoselectbox', // 产品名称下拉框
    findallpageprodinfo: hrsc + 'prodinfo/findallpageprodinfo', // 产品信息查询
    findbyidprodinfo: hrsc + 'prodinfo/findbyidprodinfo', // 产品信息查看
    addprodinfo: hrsc + 'prodinfo/addprodinfo', // 新增产品信息
    updateprodinfostate: hrsc + 'prodinfo/updateprodinfostate', // 产品启用/停用
    updateprodinfo: hrsc + 'prodinfo/updateprodinfo', // 修改产品基本信息
    // 产品方案
    findprodscheselectbox: hrsc + 'prodinfo/findprodscheselectbox', // 产品方案下拉框
    findpagehrscprodsche: hrsc + 'hrscprodsche/findpagehrscprodsche', // 产品方案查询
    updateprodschestate: hrsc + 'hrscprodsche/updateprodschestate', // 产品方案启用/停用
    findbyidhrscprodsche: hrsc + 'hrscprodsche/findbyidhrscprodsche', // 产品方案查看
    addhrscprodsche: hrsc + 'hrscprodsche/addhrscprodsche', // 新增产品方案
    updatehrscprodsche: hrsc + 'hrscprodsche/updatehrscprodsche', // 修改产品方案
    // 产品定价方案
    findpageprodpricesche: hrsc + 'prodpricesche/findpageprodpricesche', // 产品定价方案查询
    updateprodpriceschestate: hrsc + 'prodpricesche/updateprodpriceschestate', // 产品定价方案启用/停用
    findbyidprodpricesche: hrsc + 'prodpricesche/findbyidprodpricesche', // 产品定价方案查看
    addprodpricesche: hrsc + 'prodpricesche/addprodpricesche', // 新增产品定价方案
    updateprodpricesche: hrsc + 'prodpricesche/updateprodpricesche', // 修改产品定价方案
    findprodpricescheselectbox: hrsc + 'prodinfo/findprodpricescheselectbox', // 产品定价方案下拉框
    findList: hrsc + 'head/findList', // 账单表头维护
    saveBillMeter: hrsc + 'head/save', // 账单表头新增
    findBillMeter: hrsc + 'head/find', // 账单表头查看
    updateBillMeter: hrsc + 'head/update', // 账单表头修改
    deleteBillMeter: hrsc + 'head/delete', // 账单表头删除
    // 系统消息
    showMess: hrsc + 'system/showMess', // 系统消息总体查询
    findSysMessList: hrsc + 'system/findSysMessList', // 系统消息查询
    findSysMessById: hrsc + 'system/findSysMessById', // 系统消息查看
    downEnc: hrsc + 'system/downEnc', // 系统消息下载
    updateMessState: hrsc + 'system/updateMessState', // 标记为已读
    // 产品服务模板
    findServeTempSelectBoxByToken: hrsc + 'serveTemp/findServeTempSelectBoxByToken', // 服务模板下拉
    custInfoSelectBox: hrsc + 'serveTemp/custInfoSelectBox', // 客户下拉框
    busiCustInfoSelectBox: hrsc + 'custInfo/busiCustInfoSelectBox', // 公积金管理（客户下拉框）
    custInfoSelectBoxSource: hrsc + 'serveTemp/custInfoSelectBoxSource', // 产品服务模板客户下拉框
    areaSelectBox: hrsc + 'serveTemp/areaSelectBox', // 执行地区下拉框
    findProdTypes: hrsc + 'serveTemp/findProdTypes', // 明细计费点击第二个下一步请求方法
    findPriceProPayTypes: hrsc + 'serveTemp/findPriceProPayTypes', // 汇总计费点击第二个下一步请求方法
    localStanPkgSelectBox: hrsc + 'serveTemp/localStanPkgSelectBox', // 地方标准组合
    saveServeTemp: hrsc + 'serveTemp/saveServeTemp', // 产品服务模板明细保存方法
    prodPriceScheSelectBox: hrsc + 'serveTemp/prodPriceScheSelectBox', // 明细服务内容下拉框
    findServeContent: hrsc + 'serveTemp/findServeContent', // 汇总服务内容下拉框
    findServeTempSelectBox: hrsc + 'serveTemp/findServeTempSelectBox', // 产品服务模板下拉框
    findServeTempSelectBoxBy: hrsc + 'serveTemp/findServeTempSelectBoxByCustIdAndRespBusiCustId', // 产品服务模板下拉框
    findServeTemps: hrsc + 'serveTemp/findServeTemps', // 服务模板查询接口
    findServeTempById: hrsc + 'serveTemp/findServeTempById', // 产品服务模板查看
    deleteServeTemp: hrsc + 'serveTemp/deleteServeTemp', // 产品服务模板删除
    findReceSuppIdRequired: hrsc + 'serveTemp/findReceSuppIdRequired',  // 校验付费金额是否为必填项
    findServeTempContent: hrsc + 'serveTempChan/findServeTempContent', // 查询服务内容
    addServeTempChan: hrsc + 'serveTempChan/addServeTempChan', // 修改产品服务模板第一个下一步
    findServeTempChanByServeTempId: hrsc + 'serveTempChan/findServeTempChanByServeTempId', // 查看产品服务模板变更记录
    deleteServeTempChan: hrsc + 'serveTempChan/deleteServeTempChan', // 删除产品服务模板变更记录
    findOrderCountByCustAndTempId: hrsc + 'serveTempChan/findOrderCountByCustAndTempId', // 产品服务模板
    // 工资
    findAllProPayItem: hrsc + 'wageProPayItem/findAllProPayItem', // 工资项维护管理查询
    saveWageProPayItem: hrsc + 'wageProPayItem/saveWageProPayItem', // 工资项维护管理新增
    findProPayById: hrsc + 'wageProPayItem/findProPayById', // 工资项维护管理查看
    updateWageProPayItem: hrsc + 'wageProPayItem/updateWageProPayItem', // 工资项维护管理修改
    updateProPayState: hrsc + 'wageProPayItem/updateProPayState', // 工资项维护管理启用
    // 收费截止日维护
    checkChargeEndDate: hrsc + 'CUST/checkChargeEndDate', // 查看是否有收费截止日
    updateChargeEndDate: hrsc + 'CUST/updateChargeEndDate', // 维护收费截止日
    // 工资模板
    judgeWageTemplateById: hrsc + 'wageTemplate/judgeWageTemplateById', // 工资模板新增
    findProPayItem: hrsc + 'wageProPayItem/findProPayItem', // 显示工资基础项
    saveWageBageItem: hrsc + 'wageProPayItem/saveWageBageItem', // 自定义工资基础项
    deleteWageProPayItemById: hrsc + 'wageProPayItem/deleteWageProPayItemById', // 删除自定义工资项
    saveWageTemplateItem: hrsc + 'wageTemplateItem/saveWageTemplateItem', // 工资模板项新增
    deleteWageTemplateItemById: hrsc + 'wageTemplateItem/deleteWageTemplateItemById', // 删除工资项
    updateWageTemplateItem: hrsc + 'wageTemplateItem/updateWageTemplateItem', // 修改工资项
    findCustCertCode: hrsc + 'CUST/findCustCertCode', // 确定客户名称后，自动带出统一社会信用代码，同时可修改统一社会信用代码
    trendsJudgeProPayItem: hrsc + 'wageProPayItem/trendsJudgeProPayItem', // 自定义提示语句
    findProPaySins: hrsc + 'prodpropay/findProPaySins', // 参保险种
    selectBoxSuppBusiArea: hrsc + 'supp/suppBusiArea/selectBoxSuppBusiArea', // 受托供应商下拉框
    findCustSelectInfo1: hrsc + 'CUST/findCustSelectInfo',
    saveOrderDetWageExcel: hrsc + 'order/detwage/saveOrderDetWageExcel', // 导入
    pageSuccOrderWageDetExcel: hrsc + 'order/detwage/pageSuccOrderWageDetExcel', // 成功失败数据
    getOrgData: hrsc + 'order/detwage/getOrgData', // 薪酬维护-批量导入下载
    findHistoryImportList: hrsc + 'order/detwage/findHistoryImportList', // 导入批量查询
    downloadFailedCount: hrsc + 'order/detwage/downloadFailedCount', // 失败文件下载
    downloadOrgFile: hrsc + 'order/detwage/downloadOrgFile', // 原文件下载
    findImportDet: hrsc + 'order/detwage/findImportDet', // 导入明细查询
    detwageSelectBox: hrsc + 'wageProPayItem/selectBox', // 工资项下拉框
    findHeaderList: hrsc + 'order/detwage/findHeaderList', // 导入明细查询表头
    findOrderWageDet: hrsc + 'order/detwage/findOrderWageDet', // 薪酬维护订单明细查询
    submitPaidOrder: hrsc + 'fnnc/paidOrder/submitPaidOrder', // 提交拨付单（业务员）
    savePaidOrder: hrsc + 'fnnc/paidOrder/savePaidOrder', // 拨付单业务员新增
    updatePaidOrder: hrsc + 'fnnc/paidOrder/updatePaidOrder', // 修改拨付单
    findPaidOrderDetById: hrsc + 'fnnc/paidOrder/findPaidOrderDetById', // 查询要修改的拨付单
    paidSelectBox: hrsc + 'fnnc/paidOrder/paidSelectBox', // 拨付类型下拉框
    // 审批
    getParticipate: hrsc + 'flow/getParticipate', // 我参与的审批一级查询
    getByStarter: hrsc + 'flow/getByStarter', // 我发起的审批一级查询
    taskList: hrsc + 'flow/info/task/list', // 查看节点信息
    approve: hrsc + 'flow/approve', // 审批通过不通过
    findUserInfo: hrsc + 'userInfo/findUserInfo', // 后台管理-个人查询
    getEmpInfo: hrsc + 'employee/getEmpInfo', // 后台管理-个人查询
    findOrderEmpByCertNo: hrsc + 'order/findOrderEmpByCertNo', // 后台管理-审核
    updateRegState: hrsc + 'userInfo/updateRegState', // 后台管理-个人停用启用
    findEntUser: hrsc + 'lcplat/findEntUser', // 后台管理-企业查询
    updateUserStateById: hrsc + 'lcplat/updateUserStateById', // 后台管理-企业启用停用
    findEntUserById: hrsc + 'lcplat/findEntUserById', // 后台管理-企业查看
    findCustCert: hrsc + 'custCert/findCustCert', // 后台管理-企业导入企业
    impUserInfo: hrsc + 'userInfo/impUserInfo', // 后台管理-个人导入
    // 薪酬-单个维护
    singlePageShow: hrsc + 'order/detwage/singlePageShow', // 查询
    singleUpdateShow: hrsc + 'order/detwage/singleUpdateShow', // 修改查看
    saveOrderWageDetSignle: hrsc + 'order/detwage/saveOrderWageDetSignle', // 修改保存
    // 体检费报销
    findReimInfoByNoAndName: hrsc + 'physicalExamFeeReim/findReimInfoByNoAndName',
    saveReimInfoToSaveAndPay: hrsc + 'physicalExamFeeReim/saveReimInfoToSaveAndPay', // 保存并支付
    findAllReimInfo: hrsc + 'physicalExamFeeReim/findAllReimInfo', // 一级查询
    findReimInfoById: hrsc + 'physicalExamFeeReim/findReimInfoById', // 查看
    updateReimByIdPay: hrsc + 'physicalExamFeeReim/updateReimByIdPay', // 修改中的保存并申请支付
    updateHandleScheduleById: hrsc + 'physicalExamFeeReim/updateHandleScheduleById', // 申请支付
    updateReimByIdSave: hrsc + 'physicalExamFeeReim/updateReimByIdSave', // 申请支付
    applyPay: hrsc + 'physicalExamFeeReim/applyPay', // 确认支付
    saveReimInfoToSave: hrsc + 'physicalExamFeeReim/saveReimInfoToSave', // 保存
    findBankCardInfoByRel: hrsc + 'physicalExamFeeReim/findBankCardInfoByRel', // 查银行卡信息
    findMatConfByUses: hrsc + 'matConf/findMatConfByUses', // 查询上传材料接口
    checkSuppInfoIsExist: hrsc + 'task/taskImport/checkSuppInfoIsExist', // 导入模板校验供应商是否存在
    // 一次性收支管理
    getDispchargeManage: hrsc + 'dispcharge/multiTableQuery', // 一次性收支管理查询
    findSuppBusiAreaBySuppId: hrsc + 'supp/suppBusiArea/findSuppBusiAreaBySuppId', // 添加执行地区
    findPriceSelectBoxByPayFre: hrsc + 'prodinfo/findPriceSelectBoxByPayFre', // 服务内容
    findDispchargeById: hrsc + 'dispcharge/findById', // 一次性收支查看单个数据
    findDispchargeModify: hrsc + 'dispcharge/modify', // 一次性收支修改单个数据
    findDispchargeCencel: hrsc + 'dispcharge/cencel', // 一次性收支查看单个数据作废
    getOrderByEmpNameAndCertNo: hrsc + 'order/getOrderByEmpNameAndCertNo', // 根据雇员姓名与证件号码获取订单信息
    saveByEmp: hrsc + 'dispcharge/saveByEmp', // 按雇员添加
    saveByCustom: hrsc + 'dispcharge/save', // 按客户添加
    dispbatchDownload: hrsc + 'dispbatch/download', // 批量新增下载
    saveByBatch: hrsc + 'dispbatch/saveByBatch', // 批量导入
    findCustInfoSelectBoxBySuppInfoId: hrsc + 'custInfo/findCustInfoSelectBoxBySuppInfoId', // 客户下拉选
    findByTokenSelectbox: hrsc + 'suppinfo/findByTokenSelectbox', // 付费供应商下拉选项
    downloadWageTemplate: hrsc + 'order/detwage/downloadWageTemplate', // 下载工资模板
    findSuccOrFailList: hrsc + 'dispbatch/findSuccOrFailList', // 付费供应商下拉选项
    // 到款率統計
    getAllPaymentRate: hrsc + 'fnnc/paymentRate/getAllPaymentRate', // 全年到款率统计
    getPaymentRate: hrsc + 'fnnc/paymentRate/getPaymentRate', // 全年到款率统计
    savePaymentRate: hrsc + 'fnnc/paymentRate/savePaymentRate', // 全年到款率统计
    findAllBillDet: hrsc + 'bill/head/data/findAllBillDet', // 条件查询账单明细
    downloadPaymentRate: hrsc + 'fnnc/paymentRate/downloadPaymentRate', // 全年到款率统计
    // 超截止日数据再申报
    findOrderExceedDeclByOrderId: hrsc + 'orderExceedDecl/findOrderExceedDeclByOrderId', // 超截止日查看详情
    updateOrderExceedDecl: hrsc + 'orderExceedDecl/updateOrderExceedDecl', // 超截止日查看详情
    findAllOrderExceedDecl: hrsc + 'orderExceedDecl/findAllOrderExceedDecl', // 超截止日申请列表查询
    // 批量维护-基数申报
    downloadOrderUpDeclWageExcel: hrsc + 'OrderBatch/downloadOrderUpDeclWageExcel', // 改费服务模板下载
    impOrderUpDeclWageExcel: hrsc + 'OrderBatch/impOrderUpDeclWageExcel', // 改费服务模板导入
    downloadFailOrderUpDeclWageData: hrsc + 'OrderBatch/downloadFailOrderUpDeclWageData', // 错误数据下载
    findOrderUpDeclWageImpDelInfo: hrsc + 'OrderBatch/findOrderUpDeclWageImpDelInfo', // 导入数据查询
    findOrderCustSelectBox: hrsc + 'OrderBatch/findOrderCustSelectBox', // 申报基数历史导入客户名称下拉框
    // 订单维护 --修改订单开始日期
    downloadByTypeByorder: hrsc + 'mongo/fileTemplate/downloadByType', // 下载模板
    downloadOrderBatchModifyBegDateFailData: hrsc + 'order/batch/downloadOrderBatchModifyBegDateFailData', // 失败下载
    impOrderUpBegDateExcel: hrsc + 'OrderBatch/impOrderUpBegDateExcel', // 文件导入
    pageOrderBatchModifyBegDateSucc: hrsc + 'order/batch/pageOrderBatchModifyBegDateSucc', // 文件导入失败展示数据
    pageOrderBatchModifyBegDateFail: hrsc + 'order/batch/pageOrderBatchModifyBegDateFail', // 文件导入成功展示数据
    impOrderUpEndDateExcel: hrsc + 'OrderBatch/impOrderUpEndDateExcel', // 订单批量维护-订单结束日期上传
    downloadOrderBatchModifyEndDateFailData: hrsc + 'order/batch/downloadOrderBatchModifyEndDateFailData', // 订单批量维护-错误数据下载
    pageOrderBatchModifyEndDateSucc: hrsc + 'order/batch/pageOrderBatchModifyEndDateSucc', // 订单批量维护-成功数据查询
    pageOrderBatchModifyEndDateFail: hrsc + 'order/batch/pageOrderBatchModifyEndDateFail', // 订单批量维护-失败数据查询
    findSuppInfoByCertNo: hrsc + 'suppinfo/findSuppInfoByCertNo', // 付费方供应商下拉框
    findCustInfoByCertNo: hrsc + 'custInfo/findCustInfoByCertNo', // 客户名称下拉框
    deleteCustInfoInformation: hrsc + 'custInfo/deleteCustInfoInformation', // 删除客户信息时提示信息
    servePage4ModifyChargePayYm: hrsc + 'order/det/serve/page4ModifyChargePayYm', // 查看服务费订单明细
    proPayPage4ModifyChargePayYm: hrsc + 'order/det/proPay/page4ModifyChargePayYm', // 查看公积金订单明细
    getProdNameAndProPay: hrsc + 'order/det/getProdNameAndProPay', // 产品名称下拉框
    updateOrderDetChargePayBegYm: hrsc + 'updateOrderDet/updateOrderDetChargePayBegYm', // 修改首付账单年月
    // 订单维护--成本中心
    updateCostCentCentBatch: hrsc + 'order/updateCostCentCentBatch', // 导入数据
    findImpDate: hrsc + 'order/findImpDate', // 查询导入成功、失败数据
    downloadImpfailData: hrsc + 'order/downloadImpfailData', // 下载导入失败数据
    // 翻月
    saveFnncMonthToNext: hrsc + 'fnncMonth/saveFnncMonthToNext', // 获取最大财务年月
    queryMaxFnncMonth: hrsc + 'fnncMonth/queryMaxFnncMonth', // 默认最大财务年月
    turnOverMonth: hrsc + 'bill/charge/turn/month/turnOverMonth', // 账单翻月
    page4ModifyChargePayYmS: hrsc + 'order/det/serve/page4ModifyChargePayYm', // 单个查看服务费订单明细
    page4ModifyChargePayYmC: hrsc + 'order/det/proPay/page4ModifyChargePayYm', // 单个查看公积金订单明细
    findAllQuick: hrsc + 'system/findAllQuick', // 首页-系统公告查询
    findAllNoticeToHead: hrsc + 'system/findAllNoticeToHead', // 公告查询
    updateIsIgnoreById: hrsc + 'system/updateIsIgnoreById', // 忽略
    findByCustIdsSelectBox: hrsc + 'coninfo/findByCustIdsSelectBox', // 批量派出商务合同路径
    findServeTempOptionSelectBox: hrsc + 'serveTemp/findServeTempOptionSelectBox', // 产品服务模板
    bankTypeSelectBoxInfo: hrsc + 'bankCard/bankTypeSelectBoxInfo', // 账单翻月
    checkSinsAccuWage: hrsc + 'order/det/checkSinsAccuWage', // 由其他改为撤销服务调取接口
    createOrderDetAmoZero: hrsc + 'order/det/createOrderDetAmoZero', // 由其他改为撤销服务保存接口
    updateOrderDimReasons: hrsc + 'order/det/updateOrderDimReasons', // 由其他改为其他保存接口
    findDetDateByOrderId: hrsc + 'order/det/findDetDateByOrderId', // 由撤销服务改为其他调取
    getDetEndDateByOrderEndDate: hrsc + 'order/det/getDetEndDateByOrderEndDate', // 根据订单结束日期计算明细只做日期
    createOrderDetAmo: hrsc + 'order/det/createOrderDetAmo', // 订单保存由不收费改为收费
    // 刷新缓存字典值
    initDictInfo: hrsc + 'initDict/initDictInfo', // 刷新缓存字典值
    faceValid: 'https://demo.cpyysyb.cn:8013/faceValid' // 视频请求获取数据
  },
  author: {
    findUserRoleGroupByUserName: author + 'userRoleSelect/findUserRoleGroupByUserName', // 用户分组,统计id集合
    findUserRoleListByToken: author + 'authority/findUserRoleListByToken', // 切换角色
    findUserByOrgIdsAndRoleType: author + 'authority/findUserByOrgIdsAndRoleType', // 账单管理页业务员
    findRoleFunByUserIdAndUserRoleId: author + 'roleFunInfo/findRoleFunByUserIdAndUserRoleId', // 获取菜单集合
    findOrgSelectBoxByCorpId: author + 'dropDown/findOrgSelectBoxByCorpId', // 商务合同指派业务员
    findRoleFunByUserRoleId: author + 'quick/findRoleFunByUserRoleId', // 快捷功能查询
    findQuickFunByUserRoleId: author + 'quick/findQuickFunByUserRoleId', // 快捷功能菜单查询
    findQuickFunIdsByUserRoleId: author + 'quick/findQuickFunIdsByUserRoleId', // 快捷功能查询
    addOrUpdateQuickFunByUserRoleId: author + 'quick/addOrUpdateQuickFunByUserRoleId', // 快捷功能添加修改
    findUserRoleByOrgAndRoleType: author + 'userRoleInfo/findUserRoleByOrgAndRoleType.do', // 商务合同指派业务代表
    findUserRoleInfoOfBusiPerAndOperator: author + 'userRoleInfo/findUserRoleInfoOfBusiPerAndOperator', // 商务合同指派业务代表
    findBaseUserInfoPage: author + 'userInfo/findBaseUserInfoPage.do', // 用户管理查询
    findOrgSelectBoxInfo: author + 'dropDown/findOrgSelectBoxInfo', // 用户管理所属机构
    updateUserIsEffectById: author + 'userInfo/updateUserIsEffectById', // 用户管理删除
    updateBaseUserById: author + 'userInfo/updateBaseUserById.do', // 用户管理修改
    saveUser: author + 'userInfo/saveUser.do', // 用户管理添加
    findBaseUserInfoById: author + 'userInfo/findBaseUserInfoById.do', // 用户管理查看
    login: author + 'login/login.do', // login
    findLoginFailNumByLoginName: author + 'login/findLoginFailNumByLoginName.do', // 获取登录错误次数
    findLoginValidNumByLoginName: author + 'login/findLoginValidNumByLoginName.do', // 获取验证码
    logout: author + 'login/logout.do', // logout
    addOrUpdateLoginConfigByUser: author + 'login/addOrUpdateLoginConfigByUser', // 选择角色实例
    findRoleByFunAndUser: author + 'roleFunInfo/findRoleByFunAndUser', // 点击菜单选择角色
    changeUserRoleToTokenByRole: author + 'login/changeUserRoleToTokenByRole', // 点击菜单选择角色确定
    createValidNumToEmail: author + 'userInfo/createValidNumToEmail.do', // 邮箱验证码
    validEmailNumByLoginName: author + 'userInfo/validEmailNumByLoginName.do', // 第一步
    updateResetUserPwd: author + 'userInfo/updateResetUserPwd.do', // 第二步
    updateUserPwdByLoginName: author + 'userInfo/updateUserPwdByLoginName.do', // 修改密码
    createBaseRoleInfo: author + 'roleInfo/createBaseRoleInfo.do', // 角色管理添加
    findBaseRoleInfoPage: author + 'roleInfo/findBaseRoleInfoPage.do', // 角色管理查询
    findBaseRoleInfoById: author + 'roleInfo/findBaseRoleInfoById.do', // 角色管理查看
    updateRoleIsEffectById: author + 'roleInfo/updateRoleIsEffectById.do', // 角色管理删除
    updateRoleInfoById: author + 'roleInfo/updateRoleInfoById.do', // 角色管理修改
    findUserSelectBoxInfo: author + 'dropDown/findUserSelectBoxInfo.do', // 用户下拉
    findRoleSelectBoxInfo: author + 'dropDown/findRoleSelectBoxInfo.do', // 角色下拉框
    findCorpSelectBoxInfo: author + 'dropDown/findCorpSelectBoxInfo.do', // 公司下拉框
    findUserRoleSelectBoxInfo: author + 'dropDown/findUserRoleSelectBoxInfo.do', // 公司下拉框
    findCorpTreeNodeList: author + 'tree/findCorpTreeNodeList.do', // 机构管理左侧公司树
    findFunTreeNodeList: author + 'tree/findFunTreeNodeList.do', // 功能管理左侧树
    findCurrUserRole: author + 'userRoleInfo/findCurrUserRole.do', // 根据token获取当前角色实例信息
    findUserRoleByOrgAndRole: author + 'dropDown/findUserRoleByOrgAndRole',
    createBaseFunInfo: author + 'funInfo/createBaseFunInfo.do', // 功能管理左侧树添加
    updateFunIsEffectById: author + 'funInfo/updateFunIsEffectById.do', // 功能菜单左侧树删除
    findBaseFunInfoById: author + 'funInfo/findBaseFunInfoById.do', // 功能菜单左侧查看
    updateUpFunOrderById: author + 'funInfo/updateUpFunOrderById.do', // 功能菜单左侧上移
    updateDownFunOrderById: author + 'funInfo/updateDownFunOrderById.do', // 功能菜单左侧下移
    updateFunInfoById: author + 'funInfo/updateFunInfoById.do', // 功能菜单左侧修改
    findFunButtonListByFunId: author + 'funBtnInfo/findFunButtonListByFunId.do', // 功能管理右侧列表查询
    createFunButtonInfo: author + 'funBtnInfo/createFunButtonInfo.do',  // 功能菜单右侧添加按钮
    findFunButtonInfoById: author + 'funBtnInfo/findFunButtonInfoById.do',  // 功能菜单右侧查看按钮
    updateFunButtonById: author + 'funBtnInfo/updateFunButtonById.do', // 功能呢菜单右侧修改按钮
    updateFunButtonIsEffectById: author + 'funBtnInfo/updateFunButtonIsEffectById.do', // 功能菜单右侧删除按钮
    updateUpCorpOrderById: author + 'corpInfo/updateUpCorpOrderById.do', // 机构管理=》公司管理=》公司上移
    updateDownCorpOrderById: author + 'corpInfo/updateDownCorpOrderById.do', // 机构管理=》公司管理=》公司下移
    findBaseCorpInfoById: author + 'corpInfo/findBaseCorpInfoById.do', // 机构管理=》公司管理=》查看
    updateBaseCorpIsEffectById: author + 'corpInfo/updateBaseCorpIsEffectById.do', // 机构管理=》公司管理=》删除
    createBaseCorpInfo: author + 'corpInfo/createBaseCorpInfo.do', // 机构管理=》公司管理=》查看
    updateBaseCorpInfoById: author + 'corpInfo/updateBaseCorpInfoById.do', // 机构管理=》公司管理=》修改
    findOrgTreeNodeList: author + 'tree/findOrgTreeNodeList.do', // 机构管理=》机构管理=》树查询
    updateUpOrgOrderById: author + 'orgInfo/updateUpOrgOrderById', // 机构管理=》机构管理=》机构上移
    updateDownOrgOrderById: author + 'orgInfo/updateDownOrgOrderById', // 机构管理=》机构管理=》机构下移
    findOrgInfoById: author + 'orgInfo/findOrgInfoById.do', // 机构管理=》机构管理=》查看
    createOrgInfo: author + 'orgInfo/createOrgInfo.do', // 机构管理=》机构管理=》添加
    updateOrgInfoById: author + 'orgInfo/updateOrgInfoById.do', // 机构管理=》机构管理=》修改
    updateOrgIsEffectById: author + 'orgInfo/updateOrgIsEffectById.do', // 机构管理=》机构管理=》删除
    updateCorpParent: author + 'corpInfo/updateCorpParent', // 调整公司层级
    updateOrgParent: author + 'orgInfo/updateOrgParent', // 调整公司层级
    findUserByOrgIdAndRoleType: author + 'authority/findUserByOrgIdAndRoleType', // 角色实例信息下拉框
    // 权限管理 =》 角色实例
    findUserRoleInfoById: author + 'userRoleInfo/findUserRoleInfoById.do', // 角色实例查看
    findUserRolePage: author + 'userRoleInfo/findUserRolePage.do', // 角色实例查询
    createBaseUserRoleInfo: author + 'userRoleInfo/createBaseUserRoleInfo.do', // 角色实例新增
    updateUserRoleById: author + 'userRoleInfo/updateUserRoleById.do', // 角色实例修改
    updateUserRoleIsEffectById: author + 'userRoleInfo/updateUserRoleIsEffectById.do', // 角色实例删除
    // 权限管理=》功能权限
    findRoleFunBtnIsByRoleFunId: author + 'roleBtnInfo/findRoleFunBtnIsByRoleFunId', // 获取之前保存的按钮信息
    addBatchRoleFunInfo: author + 'roleFunInfo/addBatchRoleFunInfo', // 添加或修改
    findUserRoleSpeSelectBoxInfo: author + 'dropDown/findUserRoleSpeSelectBoxInfo', // 角色实例下拉框
    findRoleFunBtnIsByUserRoleFunId: author + 'roleBtnInfo/findRoleFunBtnIsByUserRoleFunId', // 根据角色实例获取按钮集合
    findRoleFunIdsByRoleId: author + 'roleFunInfo/findRoleFunIdsByRoleId',  // 根据角色名称id 获取已配置菜单id集合
    addSpeFunByUserRoleId: author + 'roleFunInfo/addSpeFunByUserRoleId', // 特殊配置提交方法
    addSpeFunCopyFromUserRole: author + 'roleFunInfo/addSpeFunCopyFromUserRole', // 复制来源方法
    findRoleFunIdsByRoleIdAndUserRoleId: author + 'roleFunInfo/findRoleFunIdsByRoleIdAndUserRoleId', // 根据角色实例id 获取已配置菜单id集合
    // 权限管理=》 数据权限
    findDataRangePage: author + 'dataRange/findDataRangePage', // 数据权限查询
    addDataRange: author + 'dataRange/addDataRange',  // 数据权限新增
    deleteDataRangeByOrgIdAndRoleId: author + 'dataRange/deleteDataRangeByOrgIdAndRoleId', // 数据权限删除
    findSpeDataRangePage: author + 'dataRange/findSpeDataRangePage', // 特殊数据权限查询
    addSpeDataRange: author + 'dataRange/addSpeDataRange', // 特殊数据权限新增
    deleteSpeDataRange: author + 'dataRange/deleteSpeDataRange', // 特殊数据权限删除
    checkLogin: author + 'login/checkLogin' // 校验登录信息是否有效
  },
  crm: {
    findSaleClueRadioBox: crm + 'saleClue/findSaleClueRadioBox', // 销售线索摘要下拉框
    findSaleClueList1: crm + 'saleClue/findSaleClueList1', // 销售线索查询\
    findSaleClueList: crm + 'saleClue/findSaleClueList', // 销售线索查询\
    updateSaleClueTrackResult: crm + 'saleClue/updateSaleClueTrackResult', // 销售线索跟进改为已成单或未成单
    saveSaleClue: crm + 'saleClue/saveSaleClue', // 销售线索新增
    findSaleClueById: crm + 'saleClue/findSaleClueById', // 查看销售线索
    findSaleClueExcel: crm + 'saleClue/findSaleClueExcel', // 销售线索导出
    deleteSaleClueById: crm + 'saleClue/deleteSaleClueById', // 销售线索删除
    findSaleClueSelectBox: crm + 'saleClue/findSaleClueSelectBox', // 商务合同销售线索摘要
    updateSaleClue: crm + 'saleClue/updateSaleClue', // 销售线索修改
    findTrackRemarkById: crm + 'saleClue/findTrackRemarkById', // 销售线索查看跟进备注
    updateTrackRemarkById: crm + 'saleClue/updateTrackRemarkById', // 销售线索修改跟进备注
    findRemarkHisList: crm + 'saleClue/findRemarkHisList', // 销售线索修改跟进备注历史
    updateSaleClueTrackId: crm + 'saleClue/updateSaleClueTrackId', // 销售线索修改
    findConBySaleClueId: crm + 'saleClue/findConBySaleClueId', // 查询销售线索是否关联商务合同
    findPaySalary: crm + 'paySalary/findPaySalary' // 薪酬支付-查询
  },
  salary: {
    saveReimOrder: salary + 'paySalary/saveReimOrder', // 薪酬申请支付确认申请支付
    saveTaxThr: salary + 'tax/saveTaxThr', // 添加纳税起征点
    deleteTaxThrById: salary + 'tax/deleteTaxThrById', // 删除纳税起征点
    findTaxThrList: salary + 'tax/findTaxThrList', // 查询纳税起征点
    updateTaxThr: salary + 'tax/updateTaxThr', // 修改纳税起征点
    findTaxBracWageList: salary + 'tax/findTaxBracWageList', // 显示工资税档信息
    saveTaxBracWage: salary + 'tax/saveTaxBracWage', // 添加工资税档信息
    deleteTaxBracWageById: salary + 'tax/deleteTaxBracWageById', // 删除工资税档信息
    findTaxBracWageById: salary + 'tax/findTaxBracWageById', // 查询工资税档信息
    updateTaxBracWage: salary + 'tax/updateTaxBracWage', // 显示工资税档信息
    findTaxBracServeFeeList: salary + 'tax/findTaxBracServeFeeList', // 显示劳务税档设置
    saveTaxBracServeFee: salary + 'tax/saveTaxBracServeFee', // 添加劳务税档设置
    deleteTaxBracServeFeeById: salary + 'tax/deleteTaxBracServeFeeById', // 删除劳务税档设置
    updateTaxBracServeFee: salary + 'tax/updateTaxBracServeFee', // 修改劳务税档设置
    findTaxBracServeFeeById: salary + 'tax/findTaxBracServeFeeById', // 查询劳务税档设置
    downloadWageTemplate: salary + 'salary/downloadWageTemplate', // 下载工资模板
    findPaySalary: salary + 'paySalary/findPaySalary', // 下载工资模板
    findWageDet: salary + 'paySalary/findWageDet', // 下载工资模板
    applyPay: salary + 'paySalary/applyPay', // 选中数据申请财务支付
    findReimOrder: salary + 'paySalary/findReimOrder', // 生成报销单
    findPerIncomeTaxDecl: salary + 'perIncomeTax/findPerIncomeTaxDecl', // 个税申报查询
    downloadPerIncomeTaxes: salary + 'perIncomeTax/downloadPerIncomeTaxes', // 下载申报表
    updateDeclTax: salary + 'perIncomeTax/updateDeclTax', // 确认已报税
    updateFeeDateNo: salary + 'paySalary/updateFeeDateNo', // 修改费用申报期
    findPerIncomeTaxAll: salary + 'perIncomeTax/findPerIncomeTaxAll', // 个税查询
    downloadThreePerIncomeTaxExcels: salary + 'perIncomeTax/downloadThreePerIncomeTaxExcels' // 修改费用申报期
  },
  sins: {
    findSsbNameSelectBox: sins + 'ssbInfo/findSsbNameSelectBox', // 社保经办机构名称下拉框
    sinsTurnOverMonthDealWith: sins + 'sinsTurnOverMonth/sinsTurnOverMonthDealWith', // 社保翻月
    countInjIdenData: sins + 'injIdenHandle/countInjIdenData', // 工伤认定页面的数据统计
    findSinsInjApprCount: sins + 'injAppr/findSinsInjApprCount', // 查询劳动能力鉴定各个状态的数量
    findQuestypeSelectbox: sins + 'sinsQuesPer/findQuestypeSelectbox', // 社保问题人员(类型下拉框)
    findDatasourceSelectbox: sins + 'sinsQuesPer/findDatasourceSelectbox', // 社保问题人员(来源下拉框)
    handleSinsQuesPer: sins + 'sinsQuesPer/handleSinsQuesPer', // 社保问题人员管理(处理问题人员)
    findQuesPerById: sins + 'sinsQuesPer/findQuesPerById', // 社保问题人员管理(根据问题人员ID查询问题人员信息)
    findSinsQuesPers: sins + 'sinsQuesPer/findSinsQuesPers', // 社保问题人员管理（条件查询问题人员）
    updateSinsInjApprByApprId: sins + 'injAppr/updateSinsInjApprByApprId', // 劳动能力鉴定（修改劳动能力鉴定）
    findSscBackImpAll: sins + 'sscBackImp/findSscBackImpAll', // 社保卡回盘导入查询
    getPreview: sins + 'injAppr/getPreview', // 劳动能力鉴定（浏览）
    deleteInjApprMat: sins + 'injAppr/deleteInjApprMat', // 劳动能力鉴定（删除材料）
    updateApprResult: sins + 'injAppr/updateApprResult', // 劳动能力鉴定（审核不通过）
    updateApprDate: sins + 'injAppr/updateApprDate', // 劳动能力鉴定（审核不通过）
    updateApprCenterEavFail: sins + 'injAppr/updateApprCenterEavFail', // 劳动能力鉴定（审核不通过）
    updateApprCenterEavSuccess: sins + 'injAppr/updateApprCenterEavSuccess', // 劳动能力鉴定（审核通过）
    updateDeclApprCenter: sins + 'injAppr/updateDeclApprCenter', // 劳动能力鉴定（送鉴定中心鉴定）
    saveInjAppr: sins + 'injAppr/saveInjAppr', // 劳动能力鉴定（新增劳动能力鉴定和材料表）
    findSinsInjApprByApprId: sins + 'injAppr/findSinsInjApprByApprId', // 劳动能力鉴定（详情）
    updateIssueApprByApprId: sins + 'injAppr/updateIssueApprByApprId', // 劳动能力鉴定（发放鉴定书）
    updateGiveUpApprByApprId: sins + 'injAppr/updateGiveUpApprByApprId', // 劳动能力鉴定（放弃鉴定）
    updateApprHandleStateIsCommit: sins + 'injAppr/updateApprHandleStateIsCommit', // 劳动能力鉴定（提交鉴定）
    updateNoticeEmpApprByApprIdList: sins + 'injAppr/updateNoticeEmpApprByApprIdList', // 劳动能力鉴定（通知雇员鉴定）
    findSinsInjApprAll: sins + 'injAppr/findSinsInjApprAll', // 劳动能力鉴定（查询）
    featureFindSinsEmpInfo: sins + 'empInfo/featureFindSinsEmpInfo', // 社保个人信息维护页面（查询）
    updateSinsEmpInfo: sins + 'empInfo/updateSinsEmpInfo', // 社保个人信息维护页面（确定）
    findSsbInfoPage: sins + 'ssbInfo/findSsbInfoPage', // 社保局信息维护查询
    findSsbInfo: sins + 'ssbInfo/findSsbInfo', // 社保局信息维护查看
    saveSsbInfo: sins + 'ssbInfo/saveSsbInfo', // 社保局新增
    updateSsbInfo: sins + 'ssbInfo/updateSsbInfo', // 社保局修改
    deleteSsbInfo: sins + 'ssbInfo/deleteSsbInfo', // 社保局删除
    uploadContExcelAction: sins + 'ssbCont/uploadContExcelAction', // 下载通讯录模板文件
    deteleSinsAcctInfo: sins + 'acctInfo/deteleSinsAcctInfo', // 社保账户删除
    findSinsAcctInfoPage: sins + 'acctInfo/findSinsAcctInfoPage', // 查询社保账户
    downloadSinsAcctMat: sins + 'acctInfo/downloadSinsAcctMat', // 社保资料下载
    findSsbSelectBox: sins + 'selectBox/findSsbSelectBox', // 社保经办机构下拉框
    saveSinsAcctInfo: sins + 'acctInfo/saveSinsAcctInfo', // 社保账户新增
    findSinsAcctInfo: sins + 'acctInfo/findSinsAcctInfo', // 社保账户查看
    updateSinsAcctInfo: sins + 'acctInfo/updateSinsAcctInfo', // 社保查看
    checkDeclareTotal: sins + 'monthlyDet/checkDeclareTotal', // 社保申报审核合并查询
    findMonthlyDet: sins + 'monthlyDet/findMonthlyDet', // 社保申报审核明细查询
    checkTotalUpdateState: sins + 'monthlyDet/checkTotalUpdateState', // 社保申报审核通过
    passThroughDet: sins + 'monthlyDet/passThroughDet', // 社保审核-明细页面审核通过
    findMeteMediInfo: sins + 'monthlyDet/findMeteMediInfo', // 根据省份证查询雇员信息
    AcctSelectBox: sins + 'selectBox/AcctSelectBox', // 产品模板社保账户下拉框
    findIsSameProduct: sins + 'acctInfo/findIsSameProduct',
    findCertCodeByCustId: sins + 'acctInfo/findCertCodeByCustId', // 确定客户名称后，自动带出统一社会信用代码，同时可修改统一社会信用代码
    findBySsbId: sins + 'ssb/mat/findBySsbId', // 通过社保经办机构ID请求社保局对应材料
    uploadContExcels: sins + 'ssbCont/uploadContExcels', // 上传通讯录成功后回调
    downLoadCont: sins + 'ssbCont/downLoadCont', // 总条数下载
    downloadApplyAuditExcel: sins + 'download/downloadApplyAuditExcel', // 总条数下载
    updateSinsAcctState: sins + 'acctInfo/updateSinsAcctState', // 提交按钮
    findHandleSinsAcctInfoPage: sins + 'acctHandle/findHandleSinsAcctInfoPage', // 社保账户开户查询
    findSinsAcctName: sins + 'selectBox/findSinsAcctName', // 社保账户名称下拉框
    handleSinsAcctUpdateState: sins + 'acctHandle/handleSinsAcctUpdateState', // 社保账户开户办理
    updateStateToReturn: sins + 'acctHandle/updateStateToReturn', // 社保杭虎开户退回
    findHandleSinsAcctInfo: sins + 'acctHandle/findHandleSinsAcctInfo', // 社保账户查看
    findSalesmanSelectBox: sins + 'selectBox/findSalesmanSelectBox', // 社保账户业务员下拉框
    differenceComparison: sins + 'monthlyDet/differenceComparison', // 社保审核差异对比
    findAllTotal: sins + 'applyTotal/findAllTotal', // 社保申报合计查询
    applyTotal: sins + 'applyTotal/applyTotal', // 社保申报合计申报
    applySuccTotal: sins + 'applyTotal/applySuccTotal', // 社保申报合计申报成功
    cancelAuditingPassTotal: sins + 'applyTotal/cancelAuditingPassTotal', // 社保申报合计申报退回
    cancelApplySuccTotal: sins + 'applyTotal/cancelApplySuccTotal', // 社保申报合计申报退回
    cancelApplyTotal: sins + 'applyTotal/cancelApplyTotal', // 社保申报合计申报取消
    receipt: sins + 'applyTotal/receipt', // 社保申报合计回单
    cancelReceipt: sins + 'applyTotal/cancelReceipt', // 社保申报合计取消回单
    impQuestionPeo: sins + 'impQuestionPeo/impQuestionPeo', // 社保申报-导入问题人员
    findUnauditedBySinsId: sins + 'applyTotal/findUnauditedBySinsId', // 查看是否有未审核社保数据
    findAllDet: sins + 'applyDet/findAllDet', // 社保申报详情查询
    applyPassDet: sins + 'applyDet/applyPassDet', // 社保申报详情申报
    applySuccessDet: sins + 'applyDet/applySuccessDet', // 社保申报详情申报成功
    handleReturnDet: sins + 'applyDet/handleReturnDet', // 社保申报详情审核退回
    cancelApplySuccDet: sins + 'applyDet/cancelApplySuccDet', // 社保申报取消申报成功
    cancelApplyDet: sins + 'applyDet/cancelApplyDet', // 社保申报详情取消申报
    cannelQuestionPerAction: sins + 'applyDet/cannelQuestionPerAction', // 社保申报详情取消申报
    checkMarkQuestionPer: sins + 'applyDet/checkMarkQuestionPer', // 校验是否可标记问题人员
    findInjIdenHandleList: sins + 'injIdenHandle/findInjIdenHandleList', // 工伤认定列表查询
    saveInjRecAction: sins + 'injIdenHandle/saveInjRecAction', // 工伤备案
    saveInjIdenAction: sins + 'injIdenHandle/saveInjIdenAction', // 工伤认定
    findUnUsedInjRecAndDateByCertNo: sins + 'injIdenHandle/findUnUsedInjRecAndDateByCertNo', // 带出工伤认定数据
    submitInjApplyAction: sins + 'injIdenHandle/submitInjApplyAction', // 提交
    checkSsbInjAction: sins + 'injIdenHandle/checkSsbInjAction', // 送社保
    checkSsbPassAction: sins + 'injIdenHandle/checkSsbPassAction', // 审核通过
    checkSsbNotPassAction: sins + 'injIdenHandle/checkSsbNotPassAction', // 审核不通过
    importInjIdenTableAction: sins + 'injIdenHandle/importInjIdenTableAction', // 导出
    findInjEmpHandleAction: sins + 'injIdenHandle/findInjEmpHandleAction', // 详情
    updateInjIdenAction: sins + 'injIdenHandle/updateInjIdenAction', // 修改
    injIdenDelayedApplyAction: sins + 'injIdenHandle/injIdenDelayedApplyAction', // 修改
    sendIssueSignAction: sins + 'injIdenHandle/sendIssueSignAction', // 发放认定书
    backAddResultAction: sins + 'injIdenHandle/backAddResultAction', // 回填结果
    giveUpDescAction: sins + 'injIdenHandle/giveUpDescAction', // 放弃认定
    findIsExistApply: sins + 'applyDet/findIsExistApply', // 五险合一校验
    findSinsAcctByIds: sins + 'selectBox/findSinsAcctByIds', // 社保账户和账号下拉框
    downloadApplyExcel: sins + 'download/downloadApplyExcel', // 社保审核合计下载
    downloadGuide: sins + 'download/downloadGuide', // 社保申报合计下载导盘表
    importSscInfo: sins + 'sscImportInfo/importSscInfo', // 导入制卡信息
    exportWaitCardEmp: sins + 'sscInfo/exportWaitCardEmp', // 联系雇员-支持部
    exportReciveCardEmp: sins + 'sscInfo/exportReciveCardEmp', // 联系雇员 - 业务部
    updateReceipt: sins + 'sscInfo/updateReceipt', // 录入员回执单
    updateStateCardNotMaking: sins + 'sscInfo/updateStateCardNotMaking', // 标记不制卡
    updateStateCardMaking: sins + 'sscInfo/updateStateCardMaking', // 制卡
    saveIssueSsc: sins + 'sscInfo/saveIssueSsc', // 社保卡发放
    findSscIngoBusiAll: sins + 'sscInfo/findSscIngoBusiAll', // 社保卡查询-业务部
    findSscInfoAll: sins + 'sscInfo/findSscInfoAll', // 社保卡查询-支持部
    getSsc: sins + 'sscRecive/getSsc', // 社保卡领取
    findIssueSsc: sins + 'sscInfo/findIssueSsc',  // 社保卡发放带出数据
    markQuesstionPerAction: sins + 'applyDet/markQuesstionPerAction', // 标记问题人员
    publishQuestionPerAction: sins + 'applyDet/publishQuestionPerAction', // 发布问题人员
    findAllRecInfo: sins + 'alloMediRec/findAllRecInfo', // 异地医疗备案查询
    findEmpInfoAndDetByNo: sins + 'empInfo/findEmpInfoAndDetByNo', // 异地医疗备案申请-查询
    updateSubmitBatch: sins + 'alloMediRec/updateSubmitBatch', // 异地医疗备案-提交经办员
    updateBatchSendSins: sins + 'alloMediRec/updateBatchSendSins', // 异地医疗备案-送社保
    updateBatchResult: sins + 'alloMediRec/updateBatchResult', // 异地医疗备案-结果反馈
    updateRetById: sins + 'alloMediRec/updateRetById', // 异地医疗备案-修改查询
    saveRecInfo: sins + 'alloMediRec/saveRecInfo', // 异地医疗备案-新增保存
    saveRecInfoSubmit: sins + 'alloMediRec/saveRecInfoSubmit', // 异地医疗备案-新增提交经办员
    updateRetInfoById: sins + 'alloMediRec/updateRetInfoById', // 异地医疗备案-修改保存
    updateRecInfoByIdSave: sins + 'alloMediRec/updateRecInfoByIdSave', // 异地医疗备案-修改保存
    updateRecInfoByIdSubmit: sins + 'alloMediRec/updateRecInfoByIdSubmit', // 异地医疗备案-修改提交
    updateEavById: sins + 'alloMediRec/updateEavById', // 异地医疗备案-审核提交
    findRecInfoById: sins + 'alloMediRec/findRecInfoById', // 异地医疗备案-查看
    findAlloMediRecBackPaid: sins + 'alloMediRecBackPaid/findAlloMediRecBackPaid', // 异地医疗返款-查询
    doImportAlloMediRecBackPaid: sins + 'alloMediRecBackPaid/doImportAlloMediRecBackPaid', // 异地医疗返款-弹层确定
    saveAlloMediRecBack: sins + 'alloMediRecBackPaid/saveAlloMediRecBack', // 异地医疗返款-导入成功确定
    findSinsAcctNameAndUnitSinsNo: sins + 'acctInfo/findSinsAcctNameAndUnitSinsNo', // 异地医疗返款-社保账户带单位社保
    findApplyFnncPay: sins + 'applyFnncPay/findApplyFnncPay', // 申请财务支付-弹层
    addApplyFnncPay: sins + 'applyFnncPay/addApplyFnncPay', // 申请财务支付-确定弹层
    findApplyFnncPayAll: sins + 'applyFnncPay/findApplyFnncPayAll', // 申请财务支付查询
    findEmpAndOrderInfoByNo: sins + 'empInfo/findEmpAndOrderInfoByNo', // 通过证件号码来调用信息
    findAllInjTreatInfo: sins + 'injTreat/findAllInjTreatInfo', // 一级查询
    findInjTreatById: sins + 'injTreat/findInjTreatById', // 查看
    updateInjTreatInfoSave: sins + 'injTreat/updateInjTreatInfoSave', // 修改
    updateInjTreatInfoSubmit: sins + 'injTreat/updateInjTreatInfoSubmit', // 修改
    saveInjTreatInfoSave: sins + 'injTreat/saveInjTreatInfoSave', // 工伤待遇申请保存
    saveInjTreatInfoSubmit: sins + 'injTreat/saveInjTreatInfoSubmit', // 工伤待遇申请提交
    updateBatchInjTreatInfoSubmit: sins + 'injTreat/updateBatchInjTreatInfoSubmit', // 批量提交
    updateScheduleEavNo: sins + 'injTreat/updateScheduleEavNo', // 审核不通过
    updateScheduleEavYes: sins + 'injTreat/updateScheduleEavYes', // 审核通过
    updateBatchScheduleSendSins: sins + 'injTreat/updateBatchScheduleSendSins', // 送社保
    findInjIdenApprTreatByEmpAction: sins + 'injIdenHandle/findInjIdenApprTreatByEmpAction', // 拨付单新增查询接口
    findActualData: sins + 'actualDataControl/findActualData', // 社保数据实时查询
    findImpleDataByYear: sins + 'impleData/findImpleDataByYear', // 社保实做查询年账户
    findImpleDataByMon: sins + 'impleData/findImpleDataByMon', // 社保实做查询月账户
    findSinsMonthlyShareInfoAction: sins + 'monthlyShare/findSinsMonthlyShareInfoAction', // 社保分摊表
    createMonthlyShareInfoAction: sins + 'monthlyShare/createMonthlyShareInfoAction', // 生成分摊表
    checkDataIsLegal: sins + 'mediBackDet/checkDataIsLegal', // 如果上传成功则立马调用数据校验
    importDataInfo: sins + 'mediBackDet/importDataInfo', // 点击确定时的接口调用
    findAllPaidInfo: sins + 'mediBackPaid/findAllPaidInfo', // 条件查询拨付单信息
    findPaidAttachInfoById: sins + 'mediBackPaid/findPaidAttachInfoById', // 条件查询拨付单信息
    updatePaidInfo: sins + 'mediBackPaid/updatePaidInfo', // 修改拨付单信息
    updateBatchPayScheduleById: sins + 'mediBackPaid/updateBatchPayScheduleById', // 提交拨付单信息
    // 回盘导入
    findCounterofferImpTotal: sins + 'counteroffer/findCounterofferImpTotal', // 查询回盘导入查询
    findDifferenceDateAction: sins + 'counteroffer/findDifferenceDateAction', // 差异处理查询
    exportQuestionPerAction: sins + 'counteroffer/exportQuestionPerAction', // 导出
    updateQuestionStateAction: sins + 'counteroffer/updateQuestionStateAction', // 发布以及不处理
    findExecuteAreaPruductIdAction: sins + 'counteroffer/findExecuteAreaPruductIdAction', // 发布以及不处理
    counterofferImp: sins + 'counteroffer/counterofferImp', // 导入的确定
    compareDataAction: sins + 'counteroffer/compareDataAction', // 导入的确定
    // 医疗生育收单
    findAllMediMateReim: sins + 'mediMateReim/findAllMediMateReim', // 医疗生育收单查询
    findMediMateReimById: sins + 'mediMateReim/findMediMateReimById', // 医疗生育查看
    updateCommitByListId: sins + 'mediMateReim/updateCommitByListId', // 医疗生育提交
    addMediMateReim: sins + 'mediMateReim/addMediMateReim', // 医疗生育申请
    findAreaNameBox: sins + 'monthlyDet/findAreaNameBox', // 社保执行地下拉框
    updateMediMateReimById: sins + 'mediMateReim/updateMediMateReimById', // 医疗生育修改接口
    deleteMediMateReimMat: sins + 'mediMateReim/deleteMediMateReimMat', // 删除材料接口
    findMatConfByUses: sins + 'matConf/findMatConfByUses', // 新增上传材料调取
    sendSins: sins + 'mediMateReim/sendSins', // 送社保
    updateEavPassByListId: sins + 'mediMateReim/updateEavPassByListId', // 审核通过
    updateEavReturnById: sins + 'mediMateReim/updateEavReturnById', // 审核不通过
    // 社保申请支付
    findSinsApplyFnncPayAll: sins + 'fnncPay/findApplyFnncPayAll', // 财务支付信息查询
    findSinsApplyFnncPay: sins + 'fnncPay/findApplyFnncPay', // 财务支付信息查询
    doReimOrder: sins + 'fnncPay/doReimOrder', // 财务支付信息查询
    findReimOrder: sins + 'fnncPay/findReimOrder', // 查看报销单
    findDetailInfo: sins + 'fnncPay/findDetailInfo', // 查看详情
    doSinsApplyFnncPay: sins + 'fnncPay/doApplyFnncPay', // 查看详情
    // 工伤医疗费用申请 --
    findInjReimInfoByCertNo: sins + 'injReim/findInjReimInfoByCertNo', // 鼠标移出后自动带出基本信息
    saveInjReimInfoSubmit: sins + 'injReim/saveInjReimInfoSubmit', // 点击【提交】按钮
    saveInjReimInfoSave: sins + 'injReim/saveInjReimInfoSave', // 点击【保存】按钮
    findInjReimInfoById: sins + 'injReim/findInjReimInfoById', // 点击【修改】按钮
    updateInjReimInfoByIdToSubmit: sins + 'injReim/updateInjReimInfoByIdToSubmit', // 修改页面点击【修改】按钮
    updateInjReimInfoByIdToSave: sins + 'injReim/updateInjReimInfoByIdToSave', // 修改页面点击【保存】按钮
    updateBatchScheduleToSubmit: sins + 'injReim/updateBatchScheduleToSubmit', // 修改页面点击【保存】按钮
    // 下一级权限
    updateBatchScheduleToSendSsb: sins + 'injReim/updateBatchScheduleToSendSsb', // 点击送社保时
    updateBatchScheduleToSuccess: sins + 'injReim/updateBatchScheduleToSuccess', // 业务员点击【审核】按钮
    updateBatchScheduleToEavFail: sins + 'injReim/updateBatchScheduleToEavFail' // 若点击审核不通过则调用接口
  },
  accu: {
    fileDownload: accu + 'operFile/fileDownload', // 公积金获取文件下载路径（浏览）
    filePreview: accu + 'operFile/filePreview', // 公积金获取文件预览路径（浏览）
    accuChangeMonth: accu + 'accuMonthlyDetRe/accuChangeMonth', // 公积金翻月
    findQuestionPerType: accu + 'questionPer/findQuestionPerType', // 问题人员类型下拉框
    findQuestionPerSource: accu + 'questionPer/findQuestionPerSource', // 问题人员来源下拉框
    doDealQuestionPer: accu + 'questionPer/doDealQuestionPer', // 公积金问题人员处理(确定)
    findQuestionPerById: accu + 'questionPer/findQuestionPerById', // 公积金问题人员处理
    findQuestionPer: accu + 'questionPer/findQuestionPer', // 公积金问题人员查询
    featureFindAccuEmpInfo: accu + 'accuEmpInfo/featureFindAccuEmpInfo', // 公积金个人信息维护页面（查询）
    updateAccuEmpInfo: accu + 'accuEmpInfo/updateAccuEmpInfo', // 公积金个人信息维护页面（确定）
    findAccuCenterAll: accu + 'accuCenter/findAccuCenterAll', // 社保局信息维护查询
    findAccuCenter: accu + 'accuCenter/findAccuCenter', // 公积金管理中心查看
    addAccuCenter: accu + 'accuCenter/addAccuCenter', // 公积金管理中心新增
    updateAccuCenter: accu + 'accuCenter/updateAccuCenter', // 公积金管理中心修改
    deleteAccuCenter: accu + 'accuCenter/deleteAccuCenter', // 公积金管理中心删除
    downContExcels: accu + 'AccuCenterCont/downContExcels', // 下载通讯录模板文件
    findCenterSelectBox: accu + 'accuCenter/findCenterSelectBox', // 公积金模块
    findAccuAcctAll: accu + 'accuAcct/findAccuAcctAll', // 公积金账户查询
    addAccuAcct: accu + 'accuAcct/addAccuAcct', // 公积金账户添加
    delAccuAcct: accu + 'accuAcct/delAccuAcct', // 删除公积金账户
    updateAccuAcct: accu + 'accuAcct/updateAccuAcct', // 修改公积金账户信息
    downloadEnc: accu + 'accuAcct/downloadEnc', // 公积金账户材料下载
    findAccuAcct: accu + 'accuAcct/findAccuAcct', // 公积金账户查看
    findCenterSelect: accu + 'accuCenter/findCenterSelect', // 公积金管理机构下拉框
    accuAcctSelectBox: accu + 'accuAcctSelect/accuAcctSelectBox', // 产品服务模板公积金下拉框
    findAcctNameUnitNoSelectBox: accu + 'accuAcctSelect/findAcctNameUnitNoSelectBox', // 公积金账户名称(多选)
    AcctSelectBox: accu + 'selectBox/AcctSelectBox', // 公积金下拉框
    findAccuPropSelect: accu + 'accuAcct/findAccuPropSelect', // 公积金比例下拉框
    findMonthlyDet: accu + 'monthlyDet/findMonthlyDet', // 公积金审核查询-明细
    findMonthlyDetAll: accu + 'monthlyDet/findMonthlyDetAll', // 公积金审核查询-合计
    uploadContExcelAction: accu + 'AccuCenterCont/uploadContExcelAction', // 上传通讯录
    updateAcctState: accu + 'accuAcct/updateAcctState', // 提交按钮
    findAccuAcctByState: accu + 'accuAcct/findAccuAcctByState', // 查询公积金账户支持部
    findAccuAcctSupport: accu + 'accuAcct/findAccuAcctSupport', // 公积金账户支持部查看
    updateAcctStateHandle: accu + 'accuAcct/updateAcctStateHandle', // 公积金账户办理
    updateAcctStateDet: accu + 'accuAcct/updateAcctStateDet', // 公积金账户退回
    findAccuAcctSelect: accu + 'accuAcct/findAccuAcctSelect', // 公积金账户名称下拉框
    findAccuCreaName: accu + 'accuAcct/findAccuCreaName', // 公积金业务员下拉框
    findMatByCenterId: accu + 'accuCenterMat/findMatByCenterId', // 公积金上传材料列表接口
    updateStateTotal: accu + 'monthlyDet/updateStateTotal', // 公积金月度审核=》合计
    updateState: accu + 'monthlyDet/updateState', // 公积金月度审核=》详情,
    findAccuPay: accu + 'accuPay/findAccuPay', // 公积金缴纳查询接口
    findActualData: accu + 'actualData/findActualData', // 实时查询
    doExportAccuPay: accu + 'accuPay/doExportAccuPay', // 公积金缴纳到导出
    findAccuMonthlyShareInfoAction: accu + 'monthlyShare/findAccuMonthlyShareInfoAction', // 公积金分摊查询
    createAccuMonthlyShareInfoAction: accu + 'monthlyShare/createAccuMonthlyShareInfoAction', // 公积金分摊查询
    // 公积金申请财务申请
    findApplyFnncPayAll: accu + 'applyFnncPay/findApplyFnncPayAll', // 一级查询
    findApplyAmo: accu + 'applyFnncPay/findApplyAmo', // 申请财富支付
    doReimOrder: accu + 'applyFnncPay/doReimOrder', // 生成费用报销单
    doApplyFnncPay: accu + 'applyFnncPay/doApplyFnncPay', // 费用报销单确定
    findReimOrder: accu + 'applyFnncPay/findReimOrder', // 费用报销单查看
    findDetailInfo: accu + 'applyFnncPay/findDetailInfo', // 查看详情
    // 公积金申报审核
    accuDifferenceComparison: accu + 'monthlyDet/accuDifferenceComparison', // 差异对比

    // 公积金申报
    findAllApplyByAcct: accu + 'applyWhole/findAllApplyByAcct', // 公积金分摊查询
    findAllApplyByEmp: accu + 'applyWhole/findAllApplyByEmp', // 详细页面条件查询
    eavRetTotal: accu + 'applyWhole/eavRetTotal', // 审核退回
    cancelDeclTotal: accu + 'applyWhole/cancelDeclTotal', // 取消申报
    cancelDeclSuccTotal: accu + 'applyWhole/cancelDeclSuccTotal', // 取消申报成功
    cancelReturn: accu + 'applyWhole/cancelReturn', // 取消回单
    declSuccess: accu + 'applyWhole/declSuccess', // 申报反馈页面-申报成功
    checkReturn: accu + 'applyWhole/checkReturn', // 回单页面-回单
    eavRetDet: accu + 'applyWhole/eavRetDet', // 回单页面-回单
    cancelDeclDet: accu + 'applyWhole/cancelDeclDet', // 回单页面-回单
    cancelDeclSuccDet: accu + 'applyWhole/cancelDeclSuccDet', // 回单页面-回单
    findApplyByAcct: accu + 'applyDecl/findApplyByAcct', // 申报页面-查询下载历史
    findTempTypeByArea: accu + 'applyDecl/findTempTypeByArea', // 申报页面-查询下载历史
    findPerNum: accu + 'applyDecl/findPerNum', // 申报页面-查询下载数量
    downloadRecDeclFile: accu + 'applyDecl/downloadRecDeclFile', // 申报页面-下载历史申报文件
    downloadDeclExcel: accu + 'applyDecl/downloadDeclExcel', // 申报页面-下载申报表
    findApplyPerNumReturn: accu + 'applyFeedBack/findApplyPerNumReturn', // 公积金回单
    findApplyPerNum: accu + 'applyFeedBack/findApplyPerNum', // 公积金社保反馈
    declReturn: accu + 'applyFeedBack/declReturn', // 公积金回单
    impQuestionPer: accu + 'applyFeedBack/impQuestionPer', // 申报反馈确定按钮
    // 公积金回盘导入
    findCounterofferImpTotal: accu + 'counteroffer/findCounterofferImpTotal', // 公积金回盘导入列表查询
    counterofferImpCheck: accu + 'counteroffer/counterofferImpCheck', // 回盘导入--导入文件校验
    compareDataAction: accu + 'counteroffer/compareDataAction', // 回盘导入--差异对比
    findDifferenceDateAction: accu + 'counteroffer/findDifferenceDateAction', // 回盘导入--差异数据查询
    updateQuestionStateAction: accu + 'counteroffer/updateQuestionStateAction', // 回盘导入--差异处理
    exportQuestionPerAction: accu + 'counteroffer/exportQuestionPerAction', // 回盘导入--导出
    redealQuestionPer: accu + 'counteroffer/redealQuestionPer' // 回盘导入--导出

  },
  lcAuthor: {
    impCustInfo: lcAuthor + 'userInfo/impCustInfo', // 后台管理-企业导入平台
    findUserInfo: lcAuthor + 'userInfo/findUserInfo', // 后台管理-个人查询
    findOrderEmpByCertNo: lcAuthor + 'order/findOrderEmpByCertNo', // 后台管理-审核
    impUserInfo: lcAuthor + 'userInfo/impUserInfo', // 后台管理-个人导入
    updateRegState: lcAuthor + 'userInfo/updateRegState', // 后台管理-个人停用启用
    findEntUser: lcAuthor + 'userInfo/findEntUser', // 后台管理-企业 查询
    findEntUserById: lcAuthor + 'userInfo/findEntUserById', // 后台管理-企业 查看
    updateUserStateById: lcAuthor + 'userInfo/updateUserStateById' // 后台管理-企业 查看
  },
  lcPlat: {
    selectNewsInfoByCondition: lcPlat + 'espmNewsInfo/selectNewsInfoByCondition', // 新闻管理查询
    selectPreviewByNewsId: lcPlat + 'espmNewsInfo/selectPreviewByNewsId', // 新闻管理修改
    updateByNewsId: lcPlat + 'espmNewsInfo/updateByNewsId', // 新闻管理修改保存
    insertNewsInfo: lcPlat + 'espmNewsInfo/insertNewsInfo', // 新闻管理新增
    selectMaxSwiperNum: lcPlat + 'espmNewsInfo/selectMaxSwiperNum', // 新闻管理轮播图是否上
    doMarkIsSwiper: lcPlat + 'espmNewsInfo/doMarkIsSwiper', // 取消轮播
    doMarkSwiperPicture: lcPlat + 'espmNewsInfo/doMarkSwiperPicture', // 上传轮播图片
    updateNewsState: lcPlat + 'espmNewsInfo/updateNewsState' // 新闻管理发布
  },
  lcEnterprise: {
    findEntUserOperHis: lcEnterprise + 'entUserOperHis/findEntUserOperHis' // 企业用户操作记录查询
  },
  lcEMP: {
    findPerUserOperHis: lcEMP + 'perUserOperHis/findPerUserOperHis' // 个人用户操作记录查询
  },
  file: {
    upload: fileServer + 'video/upload',
    preview: fileServer + 'preview' // 预览
  },
  mail: {
    getAllHistoryByPage: mailServer + 'getAllHistoryByPage',
    getHistoryByHisId: mailServer + 'getHistoryByHisId',
    getEmailAccountByPage: mailServer + 'getEmailAccountByPage'
  },
  push: {
    connect: WS_URI
  },
  WORKFLOW_URI: WORKFLOW_URI
};
export default apiPath;

