const state = {
  locale: "zh",
  datasets: {},
};

const app = {
  toggle: document.getElementById("locale-toggle"),
  heroEyebrow: document.getElementById("hero-eyebrow"),
  heroTitle: document.getElementById("hero-title"),
  heroLead: document.getElementById("project-lead"),
  heroPoints: document.getElementById("hero-points"),
  personaTitle: document.getElementById("persona-title"),
  personaText: document.getElementById("persona-text"),
  statGrid: document.getElementById("stat-grid"),
  audience: document.getElementById("audience-chips"),
  readingOrder: document.getElementById("reading-order"),
  modelGrid: document.getElementById("model-grid"),
  modelFigure: document.getElementById("model-figure-image"),
  probeTitle: document.getElementById("probe-title"),
  probeLead: document.getElementById("probe-lead"),
  probeGrid: document.getElementById("probe-grid"),
  probeBottomNote: document.getElementById("probe-bottom-note"),
  patternTitle: document.getElementById("pattern-title"),
  patternGrid: document.getElementById("pattern-grid"),
  bucketNav: document.getElementById("bucket-nav"),
  caseGrid: document.getElementById("case-grid"),
  highlights: document.getElementById("highlight-list"),
  hypothesis: document.getElementById("hypothesis-list"),
  paths: document.getElementById("path-grid"),
  errorPanel: document.getElementById("error-panel"),
  errorMessage: document.getElementById("error-message"),
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderPills(target, items, className = "pill") {
  target.innerHTML = items.map((item) => `<span class="${className}">${escapeHtml(item)}</span>`).join("");
}

function renderList(target, items) {
  target.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderStack(target, items) {
  target.innerHTML = items
    .map(
      (item) => `
        <article>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `,
    )
    .join("");
}

function resolvePath(template, locale) {
  return template.replaceAll("{locale}", locale);
}

function getFramework() {
  return state.datasets[`framework.${state.locale}`];
}

function getMaterial() {
  return state.datasets[`material.${state.locale}`];
}

function getBucketMeta(bucket) {
  const framework = getFramework();
  return framework.bucketMeta[bucket] || { code: bucket, label: bucket };
}

function qHtml(label, text) {
  return `
    <div class="q-block">
      <span class="q-label">${label}</span>
      <p>${escapeHtml(text).replace(/\n/g, "<br>")}</p>
    </div>
  `;
}

function renderPatternCard(item) {
  return `
    <article class="probe-card">
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.desc)}</p>
      <p style="margin-top: 8px;"><strong>${escapeHtml(item.ideal)}</strong></p>
    </article>
  `;
}

function renderProbeCard(item) {
  return `
    <article class="probe-card">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.detail)}</p>
    </article>
  `;
}

function renderCase(caseItem) {
  const framework = getFramework();
  const bucket = getBucketMeta(caseItem.bucket);
  const scores = [
    ["gpt-5.4-mini", caseItem.scores.gpt],
    ["claude-haiku-4-5-bedrock", caseItem.scores.claude],
    ["gemini-3-flash-preview", caseItem.scores.gemini],
  ];
  const links = [
    [framework.caseSection.linkLabels.meta, caseItem.links.meta],
    [framework.caseSection.linkLabels.gpt, caseItem.links.gpt],
    [framework.caseSection.linkLabels.claude, caseItem.links.claude],
    [framework.caseSection.linkLabels.gemini, caseItem.links.gemini],
  ];

  return `
    <article class="case-card" id="${escapeHtml(caseItem.id)}" data-bucket="${escapeHtml(caseItem.bucket)}">
      <div class="case-top">
        <div>
          <div class="case-kicker">
            <span class="tag">${escapeHtml(bucket.code)} / ${escapeHtml(bucket.label)}</span>
            <span class="tag">${escapeHtml(framework.caseSection.styleLabel)}: ${escapeHtml(caseItem.style)}</span>
            <span class="tag">${escapeHtml(framework.caseSection.roleLabel)}</span>
          </div>
          <h3>${escapeHtml(caseItem.id)} / ${escapeHtml(caseItem.title)}</h3>
          <p class="case-copy">${escapeHtml(caseItem.goal)}</p>
        </div>
        <div class="meta-line">${escapeHtml(bucket.code)} / ${caseItem.displayIndex}</div>
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
              <h4>${escapeHtml(framework.caseSection.scoreTitle)}</h4>
              <span class="muted">${escapeHtml(framework.caseSection.scoreSubtitle)}</span>
            </div>
            <div class="score-row">
              ${scores.map(([name, score]) => `<span class="score-pill">${escapeHtml(name)} ${escapeHtml(score)}</span>`).join("")}
            </div>
          </div>
          <div class="link-card">
            <h4>${escapeHtml(framework.caseSection.materialsTitle)}</h4>
            <div class="link-row">
              ${links
                .map(([name, path]) => `<a class="link-pill" href="${escapeHtml(path)}" target="_blank" rel="noreferrer">${escapeHtml(name)}</a>`)
                .join("")}
            </div>
          </div>
        </aside>
      </div>
    </article>
  `;
}

function applyTextContent() {
  const framework = getFramework();
  const material = getMaterial();
  const introCards = framework.intro.cards;
  const showAudienceChips = framework.intro.showAudienceChips !== false && Array.isArray(framework.intro.audienceChips) && framework.intro.audienceChips.length > 0;
  const showReadingOrder = framework.intro.showReadingOrder !== false && Array.isArray(framework.intro.readingOrder) && framework.intro.readingOrder.length > 0;

  document.documentElement.lang = state.locale === "zh" ? "zh-CN" : "en";
  document.title = framework.site.title;
  document.querySelector('meta[name="description"]').setAttribute("content", framework.site.description);

  app.toggle.textContent = framework.site.toggleButton[state.locale];
  app.heroEyebrow.textContent = framework.project.eyebrow;
  app.heroTitle.textContent = framework.project.title;
  app.heroLead.textContent = framework.project.oneLiner;
  app.personaTitle.textContent = framework.project.personaTitle;
  app.personaText.textContent = framework.project.personaText;

  document.getElementById("intro-1-eyebrow").textContent = introCards[0].eyebrow;
  document.getElementById("intro-1-title").textContent = introCards[0].title;
  document.getElementById("intro-1-body").textContent = introCards[0].body;
  document.getElementById("intro-2-eyebrow").textContent = introCards[1].eyebrow;
  document.getElementById("intro-2-title").textContent = introCards[1].title;
  document.getElementById("intro-2-body").textContent = introCards[1].body;
  document.getElementById("intro-3-eyebrow").textContent = introCards[2].eyebrow;
  document.getElementById("intro-3-title").textContent = introCards[2].title;
  document.getElementById("intro-3-body").textContent = introCards[2].body;
  app.audience.style.display = showAudienceChips ? "" : "none";
  app.readingOrder.style.display = showReadingOrder ? "" : "none";

  document.getElementById("model-eyebrow").textContent = framework.modelSection.eyebrow;
  document.getElementById("model-title").textContent = framework.modelSection.title;
  document.getElementById("case-eyebrow").textContent = framework.caseSection.eyebrow;
  document.getElementById("case-title").textContent = framework.caseSection.title;
  app.patternTitle.textContent = framework.caseSection.patternTitle;
  document.getElementById("highlights-eyebrow").textContent = framework.insightSection.highlightsEyebrow;
  document.getElementById("highlights-title").textContent = framework.insightSection.highlightsTitle;
  document.getElementById("hypothesis-eyebrow").textContent = framework.insightSection.hypothesisEyebrow;
  document.getElementById("hypothesis-title").textContent = framework.insightSection.hypothesisTitle;
  document.getElementById("path-eyebrow").textContent = framework.pathSection.eyebrow;
  document.getElementById("path-title").textContent = framework.pathSection.title;

  app.modelFigure.src = material.figure.src;
  app.modelFigure.alt = framework.modelSection.figureAlt;
}

function render() {
  const framework = getFramework();
  const material = getMaterial();

  applyTextContent();

  renderPills(
    app.heroPoints,
    framework.stats.heroChips.map((item) => `${material.stats[item.key]} ${item.label}`),
  );
  if (framework.intro.showAudienceChips !== false && Array.isArray(framework.intro.audienceChips) && framework.intro.audienceChips.length > 0) {
    renderPills(app.audience, framework.intro.audienceChips, "chip");
  } else {
    app.audience.innerHTML = "";
  }
  if (framework.intro.showReadingOrder !== false && Array.isArray(framework.intro.readingOrder) && framework.intro.readingOrder.length > 0) {
    renderList(app.readingOrder, framework.intro.readingOrder);
  } else {
    app.readingOrder.innerHTML = "";
  }

  app.statGrid.innerHTML = framework.stats.cards
    .map(
      (item) => `
        <article class="stat-card">
          <span class="label">${escapeHtml(item.label)}</span>
          <strong>${material.stats[item.key]}</strong>
        </article>
      `,
    )
    .join("");

  app.modelGrid.innerHTML = framework.modelRanking
    .map(
      (item, index) => `
        <article class="model-card">
          <span class="rank">#${index + 1}</span>
          <h3>${escapeHtml(item.model)}</h3>
          <p>${escapeHtml(item.summary)}</p>
          <div class="watchout">
            <span>Watchout</span>
            <p>${escapeHtml(item.watchout)}</p>
          </div>
        </article>
      `,
    )
    .join("");

  app.probeTitle.textContent = framework.modelProbe.title;
  app.probeLead.textContent = framework.modelProbe.lead;
  app.probeGrid.innerHTML = framework.modelProbe.cards.map(renderProbeCard).join("");
  app.probeBottomNote.textContent = framework.modelProbe.bottomNote;

  app.bucketNav.innerHTML = material.bucketDistribution
    .map((bucket) => {
      const meta = getBucketMeta(bucket.bucket);
      return `<a class="anchor-chip" href="#${escapeHtml(bucket.coreCases[0])}">${escapeHtml(meta.code)} / ${escapeHtml(meta.label)}</a>`;
    })
    .join("");

  app.patternGrid.innerHTML = framework.caseSection.patterns.map(renderPatternCard).join("");
  app.caseGrid.innerHTML = material.coreCases.map(renderCase).join("");
  renderStack(app.highlights, framework.insightSection.highlights);
  renderStack(app.hypothesis, framework.insightSection.hypotheses);

  app.paths.innerHTML = framework.pathSection.items
    .map((item) => {
      const href = item.href || resolvePath(item.hrefTemplate, state.locale);
      const displayPath = item.displayPath.includes("{locale}") ? resolvePath(item.displayPath, state.locale) : item.displayPath;
      return `
        <article class="path-card">
          <a class="path-link" href="${escapeHtml(href)}" target="_blank" rel="noreferrer">
            <span class="path-label">${escapeHtml(item.label)}</span>
            <span class="path-separator">·</span>
            <span class="path-target">${escapeHtml(displayPath)}</span>
          </a>
        </article>
      `;
    })
    .join("");
}

function loadInlineJson(id) {
  const el = document.getElementById(id);
  if (!el) {
    return null;
  }
  const text = el.textContent.trim();
  if (!text) {
    return null;
  }
  return JSON.parse(text);
}

async function loadJson(path, inlineId) {
  const inline = loadInlineJson(inlineId);
  if (inline) {
    return inline;
  }
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

async function init() {
  try {
    const [frameworkZh, frameworkEn, materialZh, materialEn] = await Promise.all([
      loadJson("./data/framework.zh.json", "framework-zh-data"),
      loadJson("./data/framework.en.json", "framework-en-data"),
      loadJson("./data/material.zh.json", "material-zh-data"),
      loadJson("./data/material.en.json", "material-en-data"),
    ]);

    state.datasets = {
      "framework.zh": frameworkZh,
      "framework.en": frameworkEn,
      "material.zh": materialZh,
      "material.en": materialEn,
    };

    app.toggle.addEventListener("click", () => {
      state.locale = state.locale === "zh" ? "en" : "zh";
      render();
    });

    render();
  } catch (error) {
    app.errorPanel.classList.remove("hidden");
    app.errorMessage.textContent = error.message;
    console.error(error);
  }
}

init();
