const data = window.SHOWCASE_DATA;

const bucketMeta = {
  "Bucket 1": {
    code: "B1",
    label: "求建议，实则求确认",
  },
  "Bucket 2": {
    code: "B2",
    label: "理性分析，实则测试理解",
  },
  "Bucket 3": {
    code: "B3",
    label: "低显性表达，需主动感知",
  },
  "Bucket 4": {
    code: "B4",
    label: "已有主见，需校准与挑战",
  },
};

function getBucketMeta(bucket) {
  return bucketMeta[bucket] || { code: bucket, label: bucket };
}

const app = {
  heroLead: document.getElementById("project-lead"),
  heroPoints: document.getElementById("hero-points"),
  statGrid: document.getElementById("stat-grid"),
  vision: document.getElementById("project-vision"),
  audience: document.getElementById("audience-chips"),
  readingOrder: document.getElementById("reading-order"),
  modelGrid: document.getElementById("model-grid"),
  probeTitle: document.getElementById("probe-title"),
  probeLead: document.getElementById("probe-lead"),
  probeGrid: document.getElementById("probe-grid"),
  probeBottomNote: document.getElementById("probe-bottom-note"),
  bucketNav: document.getElementById("bucket-nav"),
  caseGrid: document.getElementById("case-grid"),
  highlights: document.getElementById("highlight-list"),
  hypothesis: document.getElementById("hypothesis-list"),
  paths: document.getElementById("path-grid"),
};

function renderPills(target, items, className = "pill") {
  target.innerHTML = items.map((item) => `<span class="${className}">${item}</span>`).join("");
}

function renderList(target, items) {
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderProbeCard(item) {
  return `
    <article class="probe-card">
      <h3>${item.title}</h3>
      <p>${item.detail}</p>
    </article>
  `;
}

function qHtml(label, text) {
  return `
    <div class="q-block">
      <span class="q-label">${label}</span>
      <p>${text.replace(/\n/g, "<br>")}</p>
    </div>
  `;
}

function renderCase(caseItem) {
  const bucket = getBucketMeta(caseItem.bucket);
  const scores = [
    ["gpt-5.4-mini", caseItem.scores.gpt],
    ["claude-haiku-4-5-bedrock", caseItem.scores.claude],
    ["gemini-3-flash-preview", caseItem.scores.gemini],
  ];

  const links = [
    ["说明", caseItem.links.meta],
    ["GPT", caseItem.links.gpt],
    ["Claude", caseItem.links.claude],
    ["Gemini", caseItem.links.gemini],
  ];

  return `
    <article class="case-card" id="${caseItem.id}" data-bucket="${caseItem.bucket}">
      <div class="case-top">
        <div>
          <div class="case-kicker">
            <span class="tag">${bucket.code} · ${bucket.label}</span>
            <span class="tag">${caseItem.style}</span>
            <span class="tag">${caseItem.role}</span>
          </div>
          <h3>${caseItem.id} · ${caseItem.title}</h3>
          <p class="case-copy">${caseItem.goal}</p>
        </div>
        <div class="meta-line">${bucket.code} / ${caseItem.displayIndex}</div>
      </div>

      <div class="case-body">
        <div class="case-text">
          ${qHtml("Q11", caseItem.q11)}
          ${qHtml("Q12", caseItem.q12)}
          ${qHtml("Q13", caseItem.q13)}
        </div>
        <aside class="case-aside">
          <div class="score-card">
            <div class="score-head">
              <h4>三模型对比</h4>
              <span class="muted">来自核心案例摘要</span>
            </div>
            <div class="score-row">
              ${scores.map(([name, score]) => `<span class="score-pill">${name} ${score}</span>`).join("")}
            </div>
            <p class="score-note">${caseItem.summary}</p>
          </div>
          <div class="link-card">
            <h4>案例材料</h4>
            <div class="link-row">
              ${links.map(([name, path]) => `<a class="link-pill" href="${path}" target="_blank" rel="noreferrer">${name}</a>`).join("")}
            </div>
          </div>
        </aside>
      </div>
    </article>
  `;
}

function render() {
  document.title = data.project.title;
  app.heroLead.textContent = `${data.project.one_liner} 面向 ${data.project.target_audience}。`;
  app.vision.textContent = data.project.vision;
  renderPills(app.heroPoints, [
    `${data.stats.core_cases} 个核心案例`,
    `${data.stats.full_cases} 个完整案例`,
    `${data.stats.results} 条评测结果`,
  ]);

  const statCards = [
    ["核心案例", data.stats.core_cases],
    ["完整案例", data.stats.full_cases],
    ["模型数量", data.stats.models],
    ["评测结果", data.stats.results],
  ];
  app.statGrid.innerHTML = statCards
    .map(
      ([label, value]) => `
        <article class="stat-card">
          <span class="label">${label}</span>
          <strong>${value}</strong>
        </article>
      `,
    )
    .join("");

  renderPills(app.audience, [
    "训练",
    "评测",
    "对话产品",
    "数据策略",
  ], "chip");

  renderList(app.readingOrder, [
    "先看首页摘要，阐述了项目目标、方法与规模。",
    "再看三模型结论，展现了当前 benchmark 的主要差异。",
    "最后浏览 8 个核心案例，查看输入、摘要与 GitHub 材料链接。",
  ]);

  app.modelGrid.innerHTML = data.modelRanking
    .map(
      (item) => `
        <article class="model-card">
          <span class="rank">#${item.rank}</span>
          <h3>${item.name}</h3>
          <p>${item.summary}</p>
          <div class="watchout">
            <span>主要特点</span>
            <p>${item.watchout}</p>
          </div>
        </article>
      `,
    )
    .join("");

  app.probeTitle.textContent = data.modelProbe.title;
  app.probeLead.textContent = data.modelProbe.lead;
  app.probeGrid.innerHTML = data.modelProbe.cards.map(renderProbeCard).join("");
  app.probeBottomNote.textContent = data.modelProbe.bottomNote;

  app.bucketNav.innerHTML = data.bucketDistribution
    .map((bucket) => {
      const meta = getBucketMeta(bucket.bucket);
      return `<a class="anchor-chip" href="#${bucket.coreCases[0]}">${meta.code} · ${meta.label}</a>`;
    })
    .join("");

  app.caseGrid.innerHTML = data.coreCases.map(renderCase).join("");

  app.highlights.innerHTML = data.highlights
    .map(
      (item) => `
        <article>
          <h3>${item.title}</h3>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  app.hypothesis.innerHTML = data.strategyHypothesis
    .map(
      (item) => `
        <article>
          <h3>${item.stage}</h3>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");

  app.paths.innerHTML = data.paths
    .map(
      (item) => `
        <article class="path-card">
          <h3>${item.label}</h3>
          <p><a href="${item.url || item.path}" target="_blank" rel="noreferrer">${item.path}</a></p>
          <code>${item.path}</code>
        </article>
      `,
    )
    .join("");
}

render();
