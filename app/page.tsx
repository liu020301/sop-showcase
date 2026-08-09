"use client";

import { useEffect, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const chapters = [
  { id: "scene", no: "01", title: "业务场景" },
  { id: "structure", no: "02", title: "业务结构" },
  { id: "capital", no: "03", title: "资金流转" },
];

const icons: Record<string, string> = {
  "外贸企业": "贸", "赋能中心": "赋", "物流": "运", "生产": "产", "支付": "付", "买家": "客",
};

function Arrow() {
  return <span className="arrow" aria-hidden="true">→</span>;
}

function Node({ label, tone = "blue", sub }: { label: string; tone?: string; sub?: string }) {
  return (
    <div className={`node ${tone}`}>
      <span className="node-icon">{icons[label] || label.slice(0, 1)}</span>
      <strong>{label}</strong>
      {sub && <small>{sub}</small>}
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setPreview(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const show = (src: string) => setPreview(src);

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark">YL</span>
          <span>易链 · SOP</span>
        </a>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="打开导航">{menu ? "×" : "☰"}</button>
        <div className={`nav-links ${menu ? "open" : ""}`}>
          {chapters.map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => setMenu(false)}>{item.no} {item.title}</a>)}
          <a href={`${BASE}/timeline/`}>04 互动全流程</a>
        </div>
        <a className="nav-cta" href="#journey">开始演示 <span>↗</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="orb orb-a" /><div className="orb orb-b" />
        <div className="eyebrow"><span /> COMPANY WORKFLOW / 2026</div>
        <h1>外贸供应链<br /><em>全流程 SOP</em></h1>
        <p className="hero-copy">业务场景、参与主体与资金路径<br />从服务委托到客户回款的完整工作视图</p>
        <a className="primary" href="#journey">进入全流程 <span>↓</span></a>

        <div className="hero-flow" aria-label="业务全流程概览">
          <div className="pulse-dot" />
          <div className="mini-step"><span>01</span><b>业务发起</b><small>订单与服务需求</small></div>
          <Arrow />
          <div className="mini-step active"><span>02</span><b>结构协同</b><small>多角色风险隔离</small></div>
          <Arrow />
          <div className="mini-step"><span>03</span><b>资金闭环</b><small>放款、履约、还款</small></div>
        </div>
        <div className="scroll-hint"><i /> SCROLL TO EXPLORE</div>
      </section>

      <section className="journey-intro" id="journey">
        <span className="section-kicker">THE JOURNEY</span>
        <h2>三张图，讲清一条业务链</h2>
        <p>业务如何发生、各方如何协作、资金如何完成闭环。</p>
      </section>

      <section className="chapter scene" id="scene">
        <aside className="chapter-index"><b>01</b><span>BUSINESS SCENARIO</span></aside>
        <div className="chapter-content">
          <div className="chapter-head">
            <div><span className="tag">业务场景</span><h2>从外贸出货，<br />看平台如何参与。</h2></div>
            <p>外贸企业在出货环节进入国际物流流程。赋能中心接收企业的订舱与物流费结算需求：订舱委托分发给指定货代并由平台先行结算；报关、舱单与保险由易航道自营主体承接。</p>
          </div>

          <div className="flow-stage scene-stage">
            <div className="trade-label">外贸企业全流程 · 平台在物流出货环节切入</div>
            <div className="trade-flow">
              {['卖方接单', '生产备货', '物流出货', '贸易结算', '买方收货'].map((item,index)=><div key={item} className={index===2?"active":""}><span>0{index+1}</span><b>{item}</b>{index<4&&<i>→</i>}</div>)}
            </div>
            <div className="platform-entry">
              <Node label="外贸企业" tone="navy" sub="委托订舱与物流费结算" /><Arrow />
              <Node label="赋能中心" tone="coral" sub="统一入口 · 业务归集" /><Arrow />
              <div className="service-model">
                <div className="settlement-service"><span>结算业务</span><b>订舱代理</b><small>委托分发指定货代 · 平台先行结算</small></div>
                <div className="self-service"><span>易航道自营</span><b>报关 · 舱单 · 保险</b><small>由公司自有主体直接承接</small></div>
              </div>
            </div>
            <div className="flow-note"><span>↗</span><div><b>平台价值</b><p>统一结算入口 · 货代前置回款 · 企业最长 180 天免息账期</p></div></div>
          </div>
          <button className="source-link" onClick={() => show(`${BASE}/flows/business-scene.png`)}>查看原始业务图 <span>↗</span></button>
        </div>
      </section>

      <section className="chapter structure" id="structure">
        <aside className="chapter-index"><b>02</b><span>BUSINESS STRUCTURE</span></aside>
        <div className="chapter-content">
          <div className="chapter-head">
            <div><span className="tag red">保理业务结构</span><h2>以保理为核心，<br />构建供应链金融闭环。</h2></div>
            <p>保理业务以真实物流与应收账款为基础，将客户账期需求、物流履约、保险增信和资金供给组织为完整链路。</p>
          </div>
          <div className="structure-grid">
            <div className="party-card suppliers"><span>供应商</span>{['订舱代理 · 美元','报关 · 人民币','舱单 · 人民币','拖车公司等 · 人民币'].map(x => <b key={x}>{x}</b>)}</div>
            <div className="delegate reverse"><small>业务委托</small><span>←</span></div>
            <div className="yihangdao"><small>物流服务平台</small><b>易航道</b></div>
            <div className="delegate reverse"><small>业务委托</small><span>←</span></div>
            <div className="hub-stack">
              <div className="risk-top">银行<small>再 / 双保理</small></div>
              <div className="risk-mid">保理公司</div>
              <div className="spv"><small>核心枢纽</small><b>SPV 公司</b><span>易航道子公司</span></div>
              <div className="risk-bottom">保险<small>保险共保人</small></div>
            </div>
            <div className="delegate reverse"><small>业务委托</small><span>←</span></div>
            <div className="party-card clients"><span>债务人 · 客户</span>{['外贸公司 A','外贸公司 B','外贸公司 C','外贸公司 D'].map(x => <b key={x}>{x}</b>)}</div>
          </div>
          <div className="safeguards">
            <header>
              <div><span>INSURANCE + RISK CONTROL</span><h3>保理业务六大安全保障</h3></div>
              <p>围绕企业准入、交易真实性、资金闭环与物流履约建立多层防线，让供应链金融建立在可验证、可监控、可追溯的业务基础上。</p>
            </header>
            <div className="safeguard-grid">
              <article><i>01</i><b>保险保障</b><p>每笔应收账款纳入保险保障，以信用保险覆盖买方付款风险。</p></article>
              <article><i>02</i><b>子公司股权质押</b><p>通过子公司开户、股权质押与公证安排，隔离资金归集后的关联性潜在风险。</p></article>
              <article><i>03</i><b>前置风险管理</b><p>保险前置信用审核并核定额度、期限，结合海关及第三方数据判断经营情况。</p></article>
              <article><i>04</i><b>资金监管</b><p>管控回款账户，并通过银行虚拟账户体系实现资金监管、分配与闭环管理。</p></article>
              <article><i>05</i><b>安全合规交易结构</b><p>保理交易结构经过论证，保前、保中、保后材料完整且真实可核验。</p></article>
              <article><i>06</i><b>海运物流全程监控</b><p>持续监控订舱、报关、舱单、出运等关键物流节点，以履约数据印证贸易背景。</p></article>
            </div>
          </div>
          <button className="source-link" onClick={() => show(`${BASE}/flows/business-structure.png`)}>查看原始结构图 <span>↗</span></button>
        </div>
      </section>

      <section className="chapter capital" id="capital">
        <aside className="chapter-index"><b>03</b><span>CAPITAL FLOW</span></aside>
        <div className="chapter-content">
          <div className="chapter-head">
            <div><span className="tag green">资金流转</span><h2>资金有路径，<br />履约有回音。</h2></div>
            <p>资金从保理放款出发，经 SPV 委托易航道提供物流服务。易航道向外部货代供应商支付费用，同时以公司自有主体承接报关、舱单与保险等自营业务；客户回款后形成资金闭环。</p>
          </div>

          <div className="money-map">
            <div className="lane-label top">保理放款</div>
            <div className="money-row">
              <Node label="保理账户" tone="red" sub="① 客户签约，提交融资" /><Arrow />
              <Node label="SPV 公司" tone="mint" sub="② 委托易航道" /><Arrow />
              <Node label="易航道" tone="blue" sub="③ 支付及承接物流服务" /><Arrow />
              <div className="recipient-group" aria-label="物流服务承接方">
                <span>物流服务承接方</span>
                <div className="external"><b>供应商 A</b><small>外部货代服务</small></div>
                <div className="external"><b>供应商 B</b><small>外部货代服务</small></div>
                <div className="internal"><b>易航道</b><small>自营：报关 · 舱单 · 保险</small></div>
              </div>
            </div>
            <div className="loop"><span>物流服务履约</span></div>
            <div className="money-row return">
              <Node label="保理账户" tone="red" sub="⑤ 保理还款" /><span className="arrow">←</span>
              <Node label="SPV 公司" tone="mint" sub="资金归集" /><span className="arrow">←</span>
              <Node label="客户账户" tone="blue" sub="④ 客户还款" />
            </div>
            <div className="lane-label bottom">客户还款</div>
          </div>
          <button className="source-link" onClick={() => show(`${BASE}/flows/capital-flow.png`)}>查看原始资金图 <span>↗</span></button>
        </div>
      </section>

      <section className="closing">
        <span>END-TO-END VISIBILITY</span>
        <h2>从客户接入，<br />到单笔业务闭环。</h2>
        <div className="closing-stats"><div><b>全链路</b><p>从客户准入到业务闭环</p></div><div><b>多部门</b><p>关键节点责任与协作清晰</p></div><div><b>可追溯</b><p>业务、单据与资金状态留痕</p></div></div>
        <a href="#top">回到顶部 ↑</a>
      </section>

      <footer><span>易链 · 全流程 SOP</span><span>INTERNAL PRESENTATION · 2026</span></footer>

      {preview && <div className="lightbox" role="dialog" aria-modal="true" aria-label="原始流程图" onClick={() => setPreview(null)}>
        <button onClick={() => setPreview(null)} aria-label="关闭">×</button>
        <img src={preview} alt="原始流程图" onClick={(e) => e.stopPropagation()} />
        <small>点击空白处或按 ESC 关闭</small>
      </div>}
    </main>
  );
}
