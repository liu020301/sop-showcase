"use client";

import { useEffect, useState } from "react";

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
          <span className="brand-mark">YC</span>
          <span>易链 · SOP</span>
        </a>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="打开导航">{menu ? "×" : "☰"}</button>
        <div className={`nav-links ${menu ? "open" : ""}`}>
          {chapters.map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => setMenu(false)}>{item.no} {item.title}</a>)}
        </div>
        <a className="nav-cta" href="#journey">开始演示 <span>↗</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="orb orb-a" /><div className="orb orb-b" />
        <div className="eyebrow"><span /> 公司全流程 SOP · 2026</div>
        <h1>让复杂的业务<br /><em>一眼看懂。</em></h1>
        <p className="hero-copy">从一笔外贸订单，到一次完整的资金闭环。<br />我们把业务、角色与资金，放进同一条清晰的轨道。</p>
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
        <h2>一条链路，三层视角</h2>
        <p>先看业务如何发生，再看各方如何协作，最后追踪每一笔资金的去向。</p>
      </section>

      <section className="chapter scene" id="scene">
        <aside className="chapter-index"><b>01</b><span>BUSINESS SCENARIO</span></aside>
        <div className="chapter-content">
          <div className="chapter-head">
            <div><span className="tag">业务场景</span><h2>赋能中心，<br />是整条链路的连接器。</h2></div>
            <p>外贸企业只需要对接一个窗口。赋能中心负责将订舱、报关、拖车、保险与舱单等复杂服务，流转给专业供应商并统一结算。</p>
          </div>

          <div className="flow-stage scene-stage">
            <div className="core-flow">
              <Node label="外贸企业" tone="navy" sub="发起委托" /><Arrow />
              <Node label="赋能中心" tone="coral" sub="统一承接" /><Arrow />
              <Node label="物流" tone="mint" sub="全程履约" />
            </div>
            <div className="service-cluster">
              <span className="cluster-label">专业服务矩阵</span>
              {['订舱', '报关', '拖车', '海运险', '舱单'].map((item, index) => <div key={item} style={{'--i': index} as React.CSSProperties}>{item}</div>)}
            </div>
            <div className="flow-note"><span>↗</span><div><b>价值核心</b><p>业务流转 + 账期结算，一站式完成</p></div></div>
          </div>
          <button className="source-link" onClick={() => show('/flows/business-scene.png')}>查看原始业务图 <span>↗</span></button>
        </div>
      </section>

      <section className="chapter structure" id="structure">
        <aside className="chapter-index"><b>02</b><span>BUSINESS STRUCTURE</span></aside>
        <div className="chapter-content">
          <div className="chapter-head">
            <div><span className="tag red">业务结构</span><h2>专业分工，<br />风险清晰隔离。</h2></div>
            <p>SPV 公司是业务结构的枢纽：一端承接客户委托，一端对接易航道及供应商，同时通过保险与保理构建风险保障。</p>
          </div>
          <div className="structure-grid">
            <div className="party-card suppliers"><span>供应商</span>{['订舱代理 · 美元','报关 · 人民币','舱单 · 人民币','拖车公司等 · 人民币'].map(x => <b key={x}>{x}</b>)}</div>
            <div className="delegate"><small>业务委托</small><span>→</span></div>
            <div className="hub-stack">
              <div className="risk-top">银行<small>再 / 双保理</small></div>
              <div className="risk-mid">保理公司</div>
              <div className="spv"><small>核心枢纽</small><b>SPV 公司</b><span>易航道子公司</span></div>
              <div className="risk-bottom">保险<small>保险共保人</small></div>
            </div>
            <div className="delegate reverse"><small>业务委托</small><span>←</span></div>
            <div className="party-card clients"><span>债务人 · 客户</span>{['外贸公司 A','外贸公司 B','外贸公司 C','外贸公司 D'].map(x => <b key={x}>{x}</b>)}</div>
          </div>
          <button className="source-link" onClick={() => show('/flows/business-structure.png')}>查看原始结构图 <span>↗</span></button>
        </div>
      </section>

      <section className="chapter capital" id="capital">
        <aside className="chapter-index"><b>03</b><span>CAPITAL FLOW</span></aside>
        <div className="chapter-content">
          <div className="chapter-head">
            <div><span className="tag green">资金流转</span><h2>资金有路径，<br />履约有回音。</h2></div>
            <p>资金从保理放款出发，经过 SPV 与易航道完成物流服务支付；客户履约后，回款沿独立路径回到保理账户，形成完整闭环。</p>
          </div>

          <div className="money-map">
            <div className="lane-label top">保理放款</div>
            <div className="money-row">
              <Node label="保理账户" tone="red" sub="① 客户签约，提交融资" /><Arrow />
              <Node label="SPV 公司" tone="mint" sub="② 委托易航道" /><Arrow />
              <Node label="易航道" tone="blue" sub="③ 支付货代费用" /><Arrow />
              <Node label="供应商" tone="navy" sub="报关 · 舱单 · 保险" />
            </div>
            <div className="loop"><span>物流服务履约</span></div>
            <div className="money-row return">
              <Node label="保理账户" tone="red" sub="⑤ 保理还款" /><span className="arrow">←</span>
              <Node label="SPV 公司" tone="mint" sub="资金归集" /><span className="arrow">←</span>
              <Node label="客户账户" tone="blue" sub="④ 客户还款" />
            </div>
            <div className="lane-label bottom">客户还款</div>
          </div>
          <button className="source-link" onClick={() => show('/flows/capital-flow.png')}>查看原始资金图 <span>↗</span></button>
        </div>
      </section>

      <section className="closing">
        <span>END-TO-END VISIBILITY</span>
        <h2>看得见的流程，<br />才是可掌控的增长。</h2>
        <div className="closing-stats"><div><b>01</b><p>一个对接窗口</p></div><div><b>03</b><p>三层业务视角</p></div><div><b>100%</b><p>资金路径可追溯</p></div></div>
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
