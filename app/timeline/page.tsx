"use client";

import { useEffect, useState } from "react";
import "./timeline.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const stages = [
  {
    no: "01", short: "获客面访", title: "从一通电话，到第一次握手", phase: "客户准入", owner: "商务客服部 · 业务拓展部 · 业务运营部", time: "第 1—3 天", color: "#d7543f",
    customer: "了解结算平台、账期垫资及物流配套服务，确认合作意向。",
    team: ["获取客户线索并联系企业关键人", "业务拓展上门讲解服务并收集基础材料", "客服质检回访，业务运营生成定制方案"],
    departments: [{name:"商务客服部",action:"获取线索、电话邀约并录入 CRM"},{name:"业务拓展部",action:"上门面访、收集材料与签署意向函"},{name:"商务客服部",action:"二次质检回访，确认合作意向"},{name:"业务运营部",action:"分析经营数据，生成定制结算方案"}],
    handoff: "商务客服分配线索 → 业务拓展完成面访 → 业务运营输出方案 → 管家承接客户",
    document: ["CRM 邀约与面访记录", "合作意向确认函", "北极星定制化结算方案"], tools: ["CRM", "北极星"], result: "合作意向确认",
  },
  {
    no: "02", short: "风控信保", title: "确认客户是否具备合作条件", phase: "客户准入", owner: "资产运营部 · 资金部 · 法务风控", time: "T+1 / 人工尽调约 2 周", color: "#b97824",
    customer: "提交企业资质、近 4 个月出运计划及在手订单信息，等待额度审批。",
    team: ["归集营业执照、法人证件及经营资料", "信保通新建或检索企业买方代码", "提交限额、账期与支付方式并跟进审批"],
    departments: [{name:"外贸服务管家",action:"向客户收集全套企业与出运材料"},{name:"资产运营部",action:"核对资料并整理限额申报信息"},{name:"资金部",action:"在信保通提交限额申请并跟进审批"},{name:"法务风控",action:"参与异常企业的人工尽调与风险判断"}],
    handoff: "管家收集材料 → 资产运营核验 → 资金部申报 → 中信保反馈额度",
    document: ["企业全套准入材料", "保险限额申请", "保险限额及批复统计表"], tools: ["信保通", "CRM"], result: "获得可投保额度",
  },
  {
    no: "03", short: "资方签约", title: "匹配资金方，完成合同签署", phase: "客户准入", owner: "资产运营部 · 外贸服务管家", time: "每日 15:00 前集中提报", color: "#456f8e",
    customer: "确认合作资金方，线上或线下签署物流框架合作协议。",
    team: ["按企业规模、融资金额和红线匹配资方", "同步资方准入结果及驳回原因", "双重审核合同并完成编号、签署和归档"],
    departments: [{name:"资产运营部",action:"匹配资金方、集中提报并批复准入结果"},{name:"资金方",action:"依据准入标准审核企业资质"},{name:"外贸服务管家",action:"告知结果并发起合同签署"},{name:"资产运营部",action:"审核合同、编号登记并完成归档"}],
    handoff: "资产运营提报 → 资金方批复 → 管家组织签署 → 资产运营归档",
    document: ["资方准入批复", "物流框架合作协议", "业务合同档案台账"], tools: ["亿海融", "E签宝", "企业微信"], result: "合同生效并归档",
  },
  {
    no: "04", short: "注册建联", title: "系统配置完成，服务团队就位", phase: "准入落地", owner: "资产运营部 · 管家 · 履约服务部", time: "签约通过后", color: "#3e8f8c",
    customer: "完成公众号注册并签署三方总确权协议，加入专属服务群。",
    team: ["亿海融分配服务方案、保险公司与资金方", "引导企业法人线上注册与确权", "填写客户交接单、搭建企微群并维护客商关系"],
    departments: [{name:"资产运营部",action:"配置服务方案、保险公司及已准入资金方"},{name:"外贸服务管家",action:"引导法人注册、签署确权协议并填写交接单"},{name:"履约服务部",action:"接收交接信息，创建客户及供应商资料"},{name:"客户运营",action:"建立企微服务群并同步补贴与服务规则"}],
    handoff: "资产运营完成配置 → 管家引导注册 → 履约接收客户 → 客户运营持续服务",
    document: ["融资方案配置", "三方总确权协议", "客户交接单"], tools: ["亿海融", "公众号", "企业微信"], result: "具备业务接入条件",
  },
  {
    no: "05", short: "单证放款", title: "这一票业务，正式开始流转", phase: "单票执行", owner: "客户 · 履约服务部 · 资产运营部 · 资金部", time: "开航后进入审单队列", color: "#087cb9",
    customer: "出货并提供报关单、费用等材料；确认账单后获得物流费用垫付。",
    team: ["物流系统建单，制作并校验报关、提单与费用单", "信保投保，执行资产校验与融资校验", "完成应收账款确权，资方审核放款并支付供应商"],
    departments: [{name:"外贸企业",action:"出货并提交报关单、预估费用等材料"},{name:"履约服务部",action:"物流建单、制作单证并取得准确账单"},{name:"资产运营部",action:"登记订单、投保审单并发起融资确权"},{name:"资金方 / 资金部",action:"审核授信与贸易材料，完成融资放款"},{name:"结算部",action:"组织对账并向货代供应商支付费用"}],
    handoff: "客户交单 → 履约建单 → 资产运营投保确权 → 资方放款 → 结算部付款",
    document: ["报关单 / 海运提单", "费用通知单 / 确认单", "投保申报与融资确权记录"], tools: ["物流 SaaS", "亿海融", "信保通"], result: "资方放款、供应商收款",
  },
  {
    no: "06", short: "回款闭环", title: "资料归档，资金完成闭环", phase: "单票执行", owner: "客户 · 管家 · 资产运营部 · 财务部", time: "账期届满前后", color: "#173f57",
    customer: "收到还款提醒，按期支付全部结算款，并获得服务费发票。",
    team: ["归集费用确认单、提单与货代发票", "保后审核并推送资方复核", "创建还款清单、归还融资本金并进行月度复盘"],
    departments: [{name:"外贸服务管家",action:"提前提醒还款日期及应付总金额"},{name:"财务部",action:"确认客户回款并开具服务费发票"},{name:"履约服务部",action:"归集费用确认单、提单及货代发票"},{name:"资产运营部",action:"保后审核、创建还款清单并推送资方"},{name:"业务运营 / 客服",action:"复盘业务数据并持续维护客户"}],
    handoff: "管家提醒 → 客户回款 → 财务确认 → 履约归档 → 资产运营还款 → 运营复盘",
    document: ["保后全套材料", "还款清单", "融资利息与服务费发票"], tools: ["亿海融", "保理业务一览表", "CRM"], result: "单笔业务正式结清",
  },
];

const interactionGroups = [
  { group: "前端获客", departments: [
    { name: "商务客服部", relation: "线索与意向信息", topics: [
      { title: "CRM 线索同步", detail: "商务客服完成电话邀约和线索分配后，将企业基础信息、邀约记录与初步意向留存在 CRM。资产运营按需调取，用于前期风险预判。", output: "客户线索 · 邀约记录 · 初步意向" },
    ]},
    { name: "业务拓展部", relation: "贷前材料、注册与签约", topics: [
      { title: "贷前资料交接", detail: "管家完成客户面访，在 CRM 上传面访记录与意向确认函，并提交企业基础资料，作为限额申请、资方准入和系统分配的核心依据。", output: "面访记录 · 意向函 · 企业资料" },
      { title: "系统注册协同", detail: "资产运营完成亿海融资方和服务方案配置后通知管家，管家方可引导客户注册；遇到授权材料异常或系统报错时，由管家反馈诉求，资产运营联合产研处理。", output: "后台配置结果 · 注册异常记录" },
      { title: "合同签约协同", detail: "管家在企业微信发起合同审批；资产运营核验合同主体、合同编号及对应资方准入状态，通过后方可进入签署。", output: "合同审批 · 准入核验结果" },
      { title: "业务复购联动", detail: "单票业务闭环后，资产运营同步授信到期与账期调整信息，支持管家开展二次开发和续约跟进。", output: "授信到期提醒 · 账期调整" },
    ]},
  ]},
  { group: "中端支撑", departments: [
    { name: "履约服务部", relation: "贷中单证高频交互", topics: [
      { title: "单证接收", detail: "履约通过物流系统提交托书、报关单、提单、费用通知单与费用确认单，并推送亿海融；资产运营据此开展审单与投保。", output: "全套贸易及物流单证" },
      { title: "异常双向核对", detail: "资产运营发现提单、ATD、应收金额或报关数据错误时反馈履约修正；履约获知改配、船期变化时提前同步，以便调整投保或申请倒签。", output: "异常清单 · 修正单证 · 投保变更" },
      { title: "对账与付款", detail: "履约完成费用确认和对账，提交发票及账单；资产运营结合数据同步付款计划，履约持续跟进发票补开与账单核销。", output: "费用确认单 · 发票 · 付款计划" },
      { title: "保后资料移交", detail: "账期结束后，履约归集提单、费用单、发票和报关单并上传亿海融，移交资产运营完成保后审核及资方闭环。", output: "保后材料包 · 移交记录" },
    ]},
    { name: "业务运营部", relation: "规则、数据与方案", topics: [
      { title: "业务规则同步", detail: "业务运营制定销售 SOP、结算产品规则、补贴策略及转化方案；资产运营依据已确认规则执行投保、额度和放款操作。", output: "产品规则 · 补贴策略 · 销售 SOP" },
      { title: "经营数据互通", detail: "业务运营输出客户转化和月度复盘数据；资产运营反馈授信通过率、投保差错率、闭环时效与逾期风险数据。", output: "转化看板 · 风控运营指标" },
      { title: "流程卡点优化", detail: "双方针对限额慢、审单周期长、注册失败等卡点共同梳理标准 SOP，并持续调整操作流程。", output: "问题清单 · SOP 优化方案" },
      { title: "客户方案落地", detail: "资产运营校验定制方案中的账期、融资金额是否符合保险限额和资方标准；不匹配时反馈业务运营调整。", output: "方案校验意见" },
    ]},
    { name: "专项服务组", relation: "报关、舱单与海运险", topics: [
      { title: "海运险投保", detail: "海运险组同步每票货物出单信息，资产运营结合海运险保单配套信保投保。", output: "海运险保单信息" },
      { title: "报关舱单核对", detail: "报关、舱单组同步出运和清关数据，资产运营核对 ATD 开航日期并判断是否需要保险倒签。", output: "出运数据 · 倒签判断" },
      { title: "物流异常同步", detail: "滞港、改配、退运等异常及时同步资产运营，以便调整投保信息与风险台账。", output: "物流异常通知 · 台账更新" },
    ]},
  ]},
  { group: "金融与职能", departments: [
    { name: "资金部", relation: "资方、放款与资金风险", topics: [
      { title: "贷前资方准入", detail: "资金部维护资方资源及准入红线、额度上限、账期规则；资产运营据此完成系统配置，并汇总企业资料同步资金部及资方。", output: "资方规则 · 企业准入包" },
      { title: "放款计划", detail: "资产运营审单确权后同步合格订单；资金部统筹资金池、匹配资金并执行放款，回传流水与核销台账。", output: "融资订单明细 · 放款流水" },
      { title: "回款与资方还款", detail: "资金部同步企业回款信息；资产运营完成保后闭环后形成还款安排，资金部归还资方本金并完成利息开票。", output: "回款信息 · 还款清单 · 利息发票" },
      { title: "多币种业务", detail: "资金部提供外汇掉期与对冲规则；资产运营在货代双币种应收业务中配套执行，控制汇兑损失。", output: "汇兑对冲规则" },
      { title: "资金风险联动", detail: "资金部监控资金流向与汇率并发出异常预警；资产运营据此调整对应企业的投保和融资额度。", output: "风险预警 · 额度调整" },
    ]},
    { name: "法务风控", relation: "风险判断与合规", topics: [
      { title: "企业风险评估", detail: "共同对接保险机构完成资信限额审核；出现经营风险或失信记录时，法务给出风险结论，资产运营据此调整或驳回额度。", output: "风险结论 · 授信处理意见" },
      { title: "合同双重审核", detail: "法务审核法律条款，资产运营审核金融及资方匹配条款，双重校验后完成审批。", output: "法律审核 · 金融条款审核" },
      { title: "逾期不良处置", detail: "法务牵头追偿；资产运营提供企业投保、融资历史、单据与授信资料作为追偿凭证。", output: "追偿材料包" },
      { title: "全流程合规", detail: "法务输出操作合规要求，资产运营落实投保、审单、放款材料留痕，并定期提交风控台账备查。", output: "风控台账 · 合规留痕" },
    ]},
    { name: "产研中心", relation: "系统与产品支持", topics: [
      { title: "系统需求反馈", detail: "资产运营汇总 CRM、亿海融、信保通、物流 SaaS 的功能故障、流程卡顿与字段缺失，提交产研迭代。", output: "需求清单 · Bug 记录" },
      { title: "上线测试", detail: "新金融产品或系统模块上线前，资产运营参与真实业务场景测试并反馈适配意见。", output: "测试反馈 · 验收意见" },
      { title: "客户注册故障", detail: "注册或授权报错时，管家反馈资产运营，资产运营联合产研实时定位并修复。", output: "故障记录 · 修复结果" },
    ]},
    { name: "经营与组织支持", relation: "总经办、人力、易起学习", topics: [
      { title: "经营协同", detail: "总经办同步经营指标和重大项目要求；资产运营调整授信及放款资源重点，并提交月度运营与风控数据。", output: "月报 · 风控数据 · 资源安排" },
      { title: "人才与培训", detail: "资产运营提出招聘与岗位培训需求，并输出投保、审单、资方操作等实操课程。", output: "岗位需求 · 培训课程" },
      { title: "知识标准化", detail: "将限额申请、投保、保后闭环等 SOP 整理为标准课件，同步易起学习供全公司使用。", output: "标准化 SOP 课件" },
    ]},
  ]},
  { group: "部门内部", departments: [
    { name: "业务支持岗 × 资产运营岗", relation: "贷前、贷中、贷后交接", topics: [
      { title: "贷前移交", detail: "业务支持岗完成资方准入、合同管理、企业配置和限额申请后，将已具备条件的企业及订单移交资产运营岗。", output: "准入与配置完成记录" },
      { title: "贷中贷后承接", detail: "资产运营岗执行投保、审单、融资与保后闭环，完成后将台账状态同步业务支持岗归档。", output: "投保融资状态 · 闭环台账" },
      { title: "异常双向流转", detail: "准入失败或合同不合规退回管家补充；额度不足或单证异常则由资产运营岗同步业务支持岗调整授信配置。", output: "退回原因 · 调整方案" },
    ]},
  ]},
];

const verifiedInteractions = [
  { group: "授信阶段", departments: [
    { name: "外贸服务管家", relation: "申请、材料与客户现场协同", topics: [
      { title: "限额申请", detail: "管家提交企业限额申请资料；若中信保批复额度不足或未通过，则向客户说明并按实际情况申请提额或调整业务安排。", output: "限额申请资料 · 客户沟通结果" },
      { title: "合同审批发起", detail: "管家在企微发起合同审批。业务支持岗核验签约主体、资方准入状态及合同信息，出具合同号后审批方可继续流转。", output: "合同审批单 · 合同号" },
      { title: "分配资方材料", detail: "管家提交合同、营业执照、法人身份证和邮箱。业务支持岗检查盖章、页数、主体、合同号与扫描质量后完成后台分配。", output: "合同 · 营业执照 · 法人证件 · 企业邮箱" },
      { title: "企业注册", detail: "收到“已分配资方”通知后，管家方可在客户现场协助企业注册。注册授权异常由业务支持岗联系上海产融处理。", output: "注册结果 · 授权异常记录" },
    ]},
    { name: "资方", relation: "准入批复与签约条件", topics: [
      { title: "准入提报", detail: "业务支持岗依据不同资方准入红线配置企业，并将当日 15:00 前收到的申请汇总至各资方准入统计表，15:30 前完成提报。", output: "资方准入申请统计表" },
      { title: "准入结果批复", detail: "资方返回准入结果后，业务支持岗立即在亿海融【资方准入管理】中批复，系统通知管家后续签约。", output: "准入通过 / 驳回结果" },
      { title: "双主体合同补全", detail: "双主体合同需邮寄资方审核盖章；资方寄回后，由业务支持岗在亿海融更新完整版合同。", output: "资方盖章完整版合同" },
    ]},
    { name: "上海产融", relation: "企业注册问题处理", topics: [
      { title: "注册授权异常", detail: "客户注册过程中出现手机号错误、授权信息异常等问题时，管家反馈业务支持岗，由业务支持岗联系上海产融修改或处理。", output: "异常修复结果" },
    ]},
  ]},
  { group: "贷中阶段", departments: [
    { name: "履约服务部", relation: "物流订单与基础单证来源", topics: [
      { title: "提单号交接", detail: "履约操作同事在“物流-运营审单群”发送提单号。业务支持岗据此在亿海融导出订单信息，并登记企业、资方、ATD、应收金额与账期到期日。", output: "提单号 · 客户名称 · 所属资方" },
      { title: "单证异常修正", detail: "发起一融时若资产校验或融资校验出现错误，业务支持岗联系对应履约操作人员补充或修正单证，修正后重新审核。", output: "托书 · 报关单 · 提单 · 费用单修正版" },
      { title: "保后材料补齐", detail: "放款后如发票、费用确认单或提单未齐，履约补充上传；业务支持岗确认材料齐全且校验通过后再推送资方。", output: "发票 · 费用确认单 · 提单" },
    ]},
    { name: "研发中心产品部", relation: "投保签名与产品规则支持", topics: [
      { title: "投保签名", detail: "业务支持岗在信保通完成明细申报导入、数据核验与提交后，由研发中心产品部完成投保签名；信保生效后进入审单流程。", output: "已签名投保申报 · 保险申报单" },
      { title: "系统卡点临时方案", detail: "无法查询运踪、限额未更新等订单被系统卡住时，资产运营岗向研发中心产品部说明问题，推动快速解决或提供临时处理方案。", output: "问题处理意见 · 临时方案" },
    ]},
    { name: "资方", relation: "确权接收与融资放款", topics: [
      { title: "批量确权", detail: "业务支持岗核对数据透视表与亿海融中的订单笔数、金额一致后，按企业批量确权，并汇总确权笔数与放款金额发送资方。", output: "确权订单 · 确权汇总" },
      { title: "特殊资方通知", detail: "汇鑫业务需将应收账款转让通知书及费用通知单发送客户并抄送资方，告知应收账款权益转让。", output: "转让通知邮件" },
      { title: "放款", detail: "确权完成且资方审核通过后，由资方执行放款；资产运营部跟进订单状态与放款结果。", output: "放款结果 · 订单状态" },
    ]},
  ]},
  { group: "贷后阶段", departments: [
    { name: "资方", relation: "保后接收与本金归还", topics: [
      { title: "保后推送", detail: "业务支持岗在放款后按资方要求整理保后材料，在亿海融核验文件齐全、无校验失败后手工推送；时限为发起融资后 45 天内。", output: "保后材料推送记录" },
      { title: "资方还款", detail: "资产运营岗根据还款金额筛选订单，在亿海融制作还款清单并提交企微审批；审批后打印单据交财务执行。", output: "还款清单 · 还款审批单" },
    ]},
    { name: "财务", relation: "还款执行与水单反馈", topics: [
      { title: "还款金额通知", detail: "财务对接人或资产运营经理向资产运营岗提供各资方需还金额，作为订单筛选与清单制作依据。", output: "各资方应还金额" },
      { title: "执行资方还款", detail: "收到审批通过的纸质还款单据后，财务执行还款并反馈还款水单；资产运营岗完成还款登记与台账更新。", output: "还款水单 · 还款登记" },
    ]},
    { name: "履约服务部", relation: "保后材料补充", topics: [
      { title: "异常材料跟进", detail: "资产运营岗每周检查保后订单，发现材料不全或逾期预警时，联系履约相关人员补传，直至满足资方推送条件。", output: "补齐材料 · 异常闭环记录" },
    ]},
  ]},
  { group: "资产运营部内", departments: [
    { name: "业务支持岗", relation: "资产运营岗下的业务支持分支", topics: [
      { title: "贷前配置", detail: "负责资方配置与结果批复、合同号出具、客户资方分配、注册协助和合同归档。", output: "准入批复 · 合同号 · 资方配置" },
      { title: "资产登记与投保", detail: "每日按 11:20 和 17:00 两个截单点登记保理业务一览表，并在当日上午或下午完成对应批次投保。", output: "保理业务一览表 · 投保申报" },
      { title: "审单、融资与确权", detail: "根据信保生效状态审核一融票据，核对开航日、到期日和融资总额，审核通过后发起融资并批量确权。", output: "审核结果 · 融资发起 · 确权记录" },
      { title: "保后推送", detail: "检查发票、费用确认单与提单是否齐全且校验通过，并在规定时限内推送资方。", output: "保后推送结果" },
    ]},
    { name: "资产运营岗", relation: "放还款、异常推进与流程优化", topics: [
      { title: "资方放款 / 还款跟进", detail: "负责还款订单筛选、清单制作、审批跟进、单据交财务、水单跟进和还款登记，并持续监控放款流程状态。", output: "还款清单 · 审批 · 水单 · 台账" },
      { title: "授信卡点推进", detail: "每周按资方检查授信进行中客户，重点催办未分配资方、未注册、保险限额失效和合同到期问题。", output: "授信卡点清单 · 催办结果" },
      { title: "异常订单闭环", detail: "按资方盘点异常订单，与对应负责人沟通直至闭环；可标准化的问题沉淀为处理流程。", output: "异常订单台账 · 标准处理流程" },
      { title: "流程优化与带教", detail: "梳理高频卡点，推动线下流程线上化和系统优化；同时承担新员工流程讲解、成果检查与操作准确性反馈。", output: "优化需求 · 培训记录" },
    ]},
    { name: "产研中心", relation: "系统缺陷与功能迭代", topics: [
      { title: "系统需求反馈", detail: "资产运营岗汇总亿海融高频异常、功能缺陷和流程短板，向产研反馈并协同产品、技术团队评估及推进迭代。", output: "需求清单 · 迭代方案" },
    ]},
  ]},
];

export default function TimelinePage() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [interactionGroup, setInteractionGroup] = useState(0);
  const [interactionDept, setInteractionDept] = useState(0);
  const stage = stages[active];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive((value) => {
      if (value === stages.length - 1) { setPlaying(false); return value; }
      return value + 1;
    }), 3200);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    const keys = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setActive(v => Math.min(v + 1, stages.length - 1));
      if (event.key === "ArrowLeft") setActive(v => Math.max(v - 1, 0));
    };
    window.addEventListener("keydown", keys);
    return () => window.removeEventListener("keydown", keys);
  }, []);

  return <main className="timeline-page" style={{"--stage": stage.color} as React.CSSProperties}>
    <nav className="timeline-nav">
      <a className="brand" href={`${BASE}/`}><span className="brand-mark">YC</span><span>易链 · SOP</span></a>
      <div className="timeline-nav-center"><a href={`${BASE}/`}>业务总览</a><b>互动全流程</b></div>
      <a className="back-link" href={`${BASE}/`}>返回总览 ↗</a>
    </nav>

    <header className="timeline-hero">
      <div><span className="timeline-kicker">ONE SHIPMENT · ONE JOURNEY</span><h1>跟着一票业务，<br />走完全流程。</h1></div>
      <div className="ticket-intro"><b>演示单号</b><strong>YL · 2026 · 001</strong><p>从客户第一次接触，到这一票业务完成结清。点击下方节点，查看每个环节发生了什么。</p></div>
    </header>

    <section className="timeline-console" aria-label="业务互动时间线">
      <div className="console-top">
        <div className="parallel-label"><b>三线并行视图</b><small>客户动作 · 内部执行 · 单据流转</small></div>
        <button className={`play ${playing ? "playing" : ""}`} onClick={() => { if (active === stages.length - 1) setActive(0); setPlaying(!playing); }}><span>{playing ? "Ⅱ" : "▶"}</span>{playing ? "暂停演示" : "自动演示"}</button>
      </div>

      <div className="rail-wrap">
        <div className="phase-labels"><span>客户准入</span><span>准入落地</span><span>单票执行</span></div>
        <div className="rail"><i style={{width: `${(active / (stages.length - 1)) * 100}%`}} />
          {stages.map((item, index) => <button key={item.no} className={index === active ? "active" : index < active ? "done" : ""} onClick={() => {setActive(index); setPlaying(false);}} aria-label={`查看${item.short}`}><span>{index < active ? "✓" : item.no}</span><b>{item.short}</b><small>{item.time}</small></button>)}
        </div>
      </div>

      <div className="stage-panel" key={active}>
        <div className="stage-meta"><span>{stage.phase}</span><b>{stage.no} / 06</b></div>
        <div className="stage-main">
          <div className="stage-copy"><small>当前节点</small><h2>{stage.title}</h2><div className="owner"><span>主责团队</span><b>{stage.owner}</b></div></div>
          <div className="parallel-views">
            <article className="view-lane customer-lane"><header><i>客</i><div><b>客户动作</b><small>客户在这个阶段做什么</small></div></header><p>{stage.customer}</p></article>
            <article className="view-lane team-lane"><header><i>协</i><div><b>部门协同</b><small>谁负责什么，如何接力</small></div></header><ol>{stage.departments.map((item, index) => <li key={`${item.name}-${index}`}><em>{index + 1}</em><span><b>{item.name}</b><small>{item.action}</small></span></li>)}</ol><div className="handoff"><span>协作交接</span><p>{stage.handoff}</p></div></article>
            <article className="view-lane document-lane"><header><i>单</i><div><b>单据流转</b><small>本阶段关键材料</small></div></header><ul>{stage.document.map(item => <li key={item}>{item}</li>)}</ul></article>
          </div>
        </div>
        <div className="stage-bottom">
          <div className="tools"><span>经过系统</span>{stage.tools.map(item => <b key={item}>{item}</b>)}</div>
          <div className="result"><span>本阶段交付</span><b>{stage.result}</b><i>→</i></div>
        </div>
      </div>

      <div className="console-actions">
        <button disabled={active === 0} onClick={() => setActive(v => v - 1)}>← 上一步</button>
        <span>也可使用键盘方向键</span>
        <button disabled={active === stages.length - 1} onClick={() => setActive(v => v + 1)}>下一步 →</button>
      </div>
    </section>

    <section className="collaboration-map" id="collaboration">
      <div className="collab-heading"><span>VERIFIED SOP · 2025.11</span><h2>部门之间，<br />具体如何协作。</h2><p>内容按正式 SOP 重新校准。业务支持岗作为资产运营岗下的业务支持分支单独展开，便于讲清配置、合同、投保和融资支持等具体动作。</p><div className="mechanism"><b>关键时效</b><span>15:00 前申请 · 15:30 前报资方</span><span>11:20 / 17:00 两次截单投保</span><span>天食审单确权 · 当日 15:00 前</span><span>其他资方 · 当日下班前</span><span>保后材料 · 发起融资后 45 天内</span></div></div>
      <div className="interaction-explorer">
        <div className="group-tabs">{verifiedInteractions.map((item,index)=><button key={item.group} className={interactionGroup===index?"active":""} onClick={()=>{setInteractionGroup(index);setInteractionDept(0);}}>{item.group}<small>{item.departments.length}</small></button>)}</div>
        <div className="explorer-body">
          <aside>{verifiedInteractions[interactionGroup].departments.map((item,index)=><button key={item.name} className={interactionDept===index?"active":""} onClick={()=>setInteractionDept(index)}><b>{item.name}</b><small>{item.relation}</small><i>→</i></button>)}</aside>
          <div className="topic-list">
            <header><span>{verifiedInteractions[interactionGroup].group}</span><h3>{verifiedInteractions[interactionGroup].departments[interactionDept].name}</h3><p>{verifiedInteractions[interactionGroup].departments[interactionDept].relation}</p></header>
            {verifiedInteractions[interactionGroup].departments[interactionDept].topics.map((topic,index)=><details key={topic.title} open={index===0}><summary><i>{String(index+1).padStart(2,"0")}</i><b>{topic.title}</b><span>展开详情 ＋</span></summary><div><p>{topic.detail}</p><small>交接产出</small><strong>{topic.output}</strong></div></details>)}
          </div>
        </div>
        <div className="review-bar"><span>流程控制</span><b>亿海融 · 信保通 · 企微 · 保理业务一览表</b><p>系统状态与线下台账双向核对，异常订单持续跟进直至闭环。</p></div>
      </div>
    </section>

    <section className="integration">
      <div><span>与业务总览联动</span><h2>在关键节点，<br />回看全局关系。</h2></div>
      <div className="integration-links">
        <a href={`${BASE}/#structure`}><b>03—04</b><span>业务结构</span><small>客户、SPV、易航道、供应商如何协作</small><i>↗</i></a>
        <a href={`${BASE}/#capital`}><b>05—06</b><span>资金流转</span><small>放款、物流履约与客户还款如何闭环</small><i>↗</i></a>
      </div>
    </section>
    <footer><span>易链 · 客户及单票业务全流程</span><span>INTERNAL PRESENTATION · 2026</span></footer>
  </main>;
}
