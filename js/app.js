/**
 * Backblaze Hard Drive Predictive Maintenance | Machine Learning
 * VANILLA JS VERSION \u2014 reads from global `presentationData` const in js/data.js
 * No fetch(), no server, no CORS issues \u2014 open index.html by double-click!
 */

// Global State — Dual Case Architecture (Backblaze vs IMPORTMED S.A.)
let currentCase = 'backblaze'; // Default to Backblaze as requested by user
if (typeof window !== 'undefined') window.currentCase = currentCase;
let currentSectionIdx = 0;
let isContinuousMode = false;
let autoplayTimer = null;
let autoplayRemaining = 15;
let currentSortColumn = 'f2';
let currentSortAsc = false;

// Section-specific interactive states
let visitedMaturityLevels = new Set([1]);
let selectedYearIndex = 5;
let growthAnimationInterval = null;
let activeFlowStep = 1;
let activeFormulaIndex = 0;
let activeDiagnosedModelId = 'xgb-no-hist';
let activeShapFilter = 'all';
let countersAnimated = false;

/**
 * Access the currently active case dataset
 */
function getActiveData() {
  if (currentCase === 'importmed' && typeof window.importmedPresentationData !== 'undefined') {
    return window.importmedPresentationData;
  }
  return typeof presentationData !== 'undefined' ? presentationData : window.presentationData;
}

// Initialize on DOM Ready — synchronous, no fetch needed
document.addEventListener('DOMContentLoaded', () => {
  if ((typeof presentationData === 'undefined' || !presentationData) &&
      (typeof importmedPresentationData === 'undefined' || !importmedPresentationData)) {
    document.getElementById('sections-container').innerHTML =
      '<p style="color:#ef4444; padding:40px; font-family:monospace;">Error: Los archivos de datos no se cargaron. Asegúrate de que js/data.js y js/data_importmed.js existen.</p>';
    return;
  }
  buildNavigation();
  buildGlossary();
  renderSections();
  setupEventListeners();
  setupKeyboardShortcuts();
  setupFloatingTooltip();
  setupLightbox();

  // Check URL hash or default to first section
  const hash = window.location.hash.replace('#', '');
  const activeSections = getActiveData().sections;
  const sectionIdx = activeSections.findIndex(s => s.id === hash);
  goToSection(sectionIdx >= 0 ? sectionIdx : 0);
});

/**
 * Setup Navigation Sidebar & Dots
 */
function buildNavigation() {
  const navList = document.getElementById('nav-list');
  const slideDots = document.getElementById('slide-dots');
  const activeData = getActiveData();

  // Update sidebar section counter
  const sidebarCountEl = document.querySelector('.sidebar-title span:last-child');
  if (sidebarCountEl) {
    sidebarCountEl.textContent = `${activeData.sections.length} SECCIONES`;
  }
  
  navList.innerHTML = '';
  slideDots.innerHTML = '';

  activeData.sections.forEach((sec, idx) => {
    // Sidebar Item
    const navBtn = document.createElement('button');
    navBtn.className = `nav-item ${idx === 0 ? 'active' : ''}`;
    navBtn.id = `nav-item-${idx}`;
    const numDisplay = sec.index < 10 ? `0${sec.index}` : `${sec.index}`;
    navBtn.innerHTML = `
      <span class="nav-num">${numDisplay}</span>
      <span class="nav-label">${sec.badge || sec.title}</span>
    `;
    navBtn.addEventListener('click', () => {
      goToSection(idx);
    });
    navList.appendChild(navBtn);

    // Slide Dot
    const dot = document.createElement('div');
    dot.className = `slide-dot ${idx === 0 ? 'active' : ''}`;
    dot.id = `slide-dot-${idx}`;
    dot.title = `${numDisplay}. ${sec.title}`;
    dot.addEventListener('click', () => goToSection(idx));
    slideDots.appendChild(dot);
  });
}

/**
 * Setup Glossary Drawer & Search (Enriched with Project Context & Analogies)
 */
function buildGlossary() {
  const glossaryList = document.getElementById('glossary-list');
  const searchInput = document.getElementById('glossary-search');
  const btnCount = document.getElementById('glossary-btn-text');
  const activeGlossary = getActiveData().glossary || [];

  if (btnCount) {
    btnCount.textContent = `Glosario (${activeGlossary.length})`;
  }

  function renderTerms(filter = '') {
    glossaryList.innerHTML = '';
    const q = filter.trim().toLowerCase();
    
    const filtered = activeGlossary.filter(item => {
      return item.term.toLowerCase().includes(q) || 
             item.short.toLowerCase().includes(q) || 
             item.definition.toLowerCase().includes(q) ||
             (item.tooltip_context && item.tooltip_context.toLowerCase().includes(q)) ||
             (item.practical_analogy && item.practical_analogy.toLowerCase().includes(q));
    });

    if (filtered.length === 0) {
      glossaryList.innerHTML = `
        <div style="text-align:center; padding:40px 20px; color:var(--text-muted); font-size:13px;">
          No se encontraron términos para "<strong>${escapeHtml(filter)}</strong>"
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'term-card';
      card.id = `term-card-${slugify(item.term)}`;
      card.innerHTML = `
        <div class="term-name">
          <span style="color:var(--accent-cyan); margin-right:6px;">\u2726</span>${escapeHtml(item.term)}
        </div>
        <div class="term-short">${escapeHtml(item.short)}</div>
        <div class="term-def">${escapeHtml(item.definition)}</div>
        
        ${item.tooltip_context ? `
          <div style="background:rgba(249,115,22,0.1); border-left:3px solid var(--accent-orange); padding:8px 10px; border-radius:4px; margin-top:10px; font-size:12px; color:#fed7aa; line-height:1.45;">
            <strong style="color:var(--accent-orange);">\u26A1 \u00BFC\u00F3mo se aplica en este proyecto?:</strong> ${escapeHtml(item.tooltip_context)}
          </div>
        ` : ''}

        ${item.practical_analogy ? `
          <div style="background:rgba(16,185,129,0.08); border-left:3px solid var(--accent-emerald); padding:8px 10px; border-radius:4px; margin-top:8px; font-size:11.5px; color:#a7f3d0; line-height:1.45;">
            <strong style="color:var(--accent-emerald);">\uD83D\uDCA1 Analog\u00EDa cotidiana:</strong> ${escapeHtml(item.practical_analogy)}
          </div>
        ` : ''}
      `;
      glossaryList.appendChild(card);
    });
  }

  searchInput.addEventListener('input', (e) => {
    renderTerms(e.target.value);
  });

  renderTerms();
}

/**
 * Open/Close Glossary Drawer
 */
window.toggleGlossary = function(show, targetTerm = null) {
  const drawer = document.getElementById('glossary-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  
  if (show) {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    
    if (targetTerm) {
      const searchInput = document.getElementById('glossary-search');
      searchInput.value = '';
      buildGlossary();
      
      setTimeout(() => {
        const slug = slugify(targetTerm);
        const termElement = document.getElementById(`term-card-${slug}`);
        if (termElement) {
          termElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          termElement.classList.add('highlighted');
          setTimeout(() => termElement.classList.remove('highlighted'), 2000);
        }
      }, 250);
    }
  } else {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  }
};

/**
 * ===================================================================
 * KaTeX Mathematical Typesetting Engine (100% Offline)
 * ===================================================================
 */
window.renderMath = function(latexString, displayMode = true) {
  if (!latexString) return '';
  if (typeof window.katex !== 'undefined') {
    try {
      return window.katex.renderToString(latexString, {
        displayMode: displayMode,
        throwOnError: false,
        output: 'html'
      });
    } catch (e) {
      console.warn('KaTeX render error:', e);
    }
  }
  return `<code class="math-fallback">${escapeHtml(latexString)}</code>`;
};

window.renderMathInText = function(text) {
  if (!text) return '';
  // Convert $$...$$ display math
  let result = text.replace(/\$\$(.+?)\$\$/gs, (_, formula) => {
    return window.renderMath(formula.trim(), true);
  });
  // Convert $...$ inline math
  result = result.replace(/\$([^\$\n]+?)\$/g, (_, formula) => {
    return window.renderMath(formula.trim(), false);
  });
  return result;
};

/**
 * Render All Sections (Backblaze or IMPORTMED)
 */
function renderSections() {
  const container = document.getElementById('sections-container');
  container.innerHTML = '';
  const activeSections = getActiveData().sections;

  activeSections.forEach((sec, idx) => {
    const secEl = document.createElement('section');
    secEl.className = `view-section ${idx === 0 ? 'active' : ''}`;
    secEl.id = `section-${sec.id}`;
    secEl.dataset.index = idx;

    const numDisplay = sec.index < 10 ? `0${sec.index}` : `${sec.index}`;

    // Header Box
    let innerHTML = `
      <div class="section-header-box">
        <div class="section-top-meta">
          <span class="badge-tag">M\u00F3dulo ${numDisplay}</span>
          <span style="font-size:12px; font-family:var(--font-mono); color:var(--accent-cyan); font-weight:600;">
            ${sec.badge || 'An\u00E1lisis T\u00E9cnico'}
          </span>
        </div>
        <h2 class="section-title">${sec.title}</h2>
        <div class="section-tagline">${sec.tagline || ''}</div>
        <p class="section-desc">${linkifyTerms(sec.description || sec.summary || '')}</p>
      </div>
    `;

    // Render Specific Interactive Components for each Section
    switch (sec.id) {
      // Caso 1: Backblaze
      case 'portada-contexto':
        innerHTML += renderSection1(sec);
        break;
      case 'niveles-madurez':
        innerHTML += renderSection2(sec);
        break;
      case 'big-data-desafio':
        innerHTML += renderSection3(sec);
        break;
      case 'ciclo-de-vida':
        innerHTML += renderSection4(sec);
        break;
      case 'ingenieria-datos':
        innerHTML += renderSection5(sec);
        break;
      case 'torneo-algoritmos':
        innerHTML += renderSection6(sec);
        break;
      case 'interpretabilidad-shap':
        innerHTML += renderSection7(sec);
        break;
      case 'conclusiones-mlops':
        innerHTML += renderSection8(sec);
        break;

      // Caso 2: IMPORTMED S.A.
      case 'importmed-portada':
        innerHTML += window.renderImportmedSection1 ? window.renderImportmedSection1(sec) : '';
        break;
      case 'importmed-metodologia':
        innerHTML += window.renderImportmedSection2 ? window.renderImportmedSection2(sec) : '';
        break;
      case 'importmed-fase1-poblado':
        innerHTML += window.renderImportmedSection3 ? window.renderImportmedSection3(sec) : '';
        break;
      case 'importmed-fase2-features':
        innerHTML += window.renderImportmedSection4 ? window.renderImportmedSection4(sec) : '';
        break;
      case 'importmed-fase3-modelado':
        innerHTML += window.renderImportmedSection5 ? window.renderImportmedSection5(sec) : '';
        break;
      case 'importmed-fase3-torneo':
        innerHTML += window.renderImportmedSection6 ? window.renderImportmedSection6(sec) : '';
        break;
      case 'importmed-fase3-shap':
        innerHTML += window.renderImportmedSection7 ? window.renderImportmedSection7(sec) : '';
        break;
      case 'importmed-fase3-casos-clinicos':
        innerHTML += window.renderImportmedSection8 ? window.renderImportmedSection8(sec) : '';
        break;
      case 'importmed-fase4-star-schema':
        innerHTML += window.renderImportmedSection9 ? window.renderImportmedSection9(sec) : '';
        break;
      case 'importmed-fase4-pbi-torre':
        innerHTML += window.renderImportmedSection10 ? window.renderImportmedSection10(sec) : '';
        break;
      case 'importmed-fase4-pbi-diagnostico':
        innerHTML += window.renderImportmedSection11 ? window.renderImportmedSection11(sec) : '';
        break;
      case 'importmed-fase4-pbi-prescriptiva':
        innerHTML += window.renderImportmedSection12 ? window.renderImportmedSection12(sec) : '';
        break;

      default:
        innerHTML += `<div class="glass-card"><p>Contenido del m\u00F3dulo...</p></div>`;
    }

    secEl.innerHTML = innerHTML;
    container.appendChild(secEl);
  });

  // Attach interactive DOM listeners for rendered sections
  attachInteractiveListeners();

  // Run KaTeX Auto-Render pass for residual math symbols in DOM ($...$ or $$...$$)
  if (typeof window.renderMathInElement !== 'undefined' && container) {
    try {
      window.renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX auto-render pass error:', e);
    }
  }
}


/**
 * ===================================================================
 * SECTION 1: Portada y Contexto Industrial (Tabla 1 & Slider)
 * ===================================================================
 */
function renderSection1(sec) {
  const s = sec.sliderComparison;
  return `
    <!-- KPI Overview Grid -->
    <div class="kpi-grid">
      ${sec.kpis.map(k => `
        <div class="kpi-card">
          <div class="kpi-val">${k.value} <span class="kpi-unit">${k.unit}</span></div>
          <div class="kpi-label">${k.label}</div>
          <div class="kpi-desc">${k.desc}</div>
        </div>
      `).join('')}
    </div>

    <!-- Tabla 1: Comparativa de Estrategias -->
    <div class="glass-card" style="margin-top:28px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
        <h3 style="font-size:16px; font-weight:700; color:#fff; display:flex; align-items:center; gap:8px;">
          <span>\uD83D\uDCCB</span> ${sec.table1.title}
        </h3>
        <span style="font-size:12px; color:var(--text-muted); font-family:var(--font-mono);">
          Selecciona una estrategia para comparar costos y riesgos
        </span>
      </div>

      <div class="strat-card-grid">
        ${sec.table1.strategies.map((strat, i) => `
          <div class="strat-card ${i === 2 ? 'active-strat' : ''}" id="strat-card-${strat.id}" onclick="selectStrategy('${strat.id}')">
            <span class="strat-tag" style="background:${strat.color}22; color:${strat.color}; border:1px solid ${strat.color}55;">
              ${strat.tag}
            </span>
            <h4 style="font-size:15px; font-weight:700; color:#fff; margin-bottom:8px;">${strat.name}</h4>
            <p style="font-size:12.5px; color:var(--text-muted); margin-bottom:12px; line-height:1.5;">${linkifyTerms(strat.principle)}</p>
            
            <div style="font-size:12px; margin-bottom:8px;">
              <span style="color:#ef4444; font-weight:700;">El Gran Peligro:</span>
              <div style="color:#cbd5e1; font-size:12px; margin-top:2px;">${linkifyTerms(strat.cons)}</div>
            </div>

            <div style="margin-top:12px; padding-top:10px; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:var(--text-dim); font-family:var(--font-mono);">Disponibilidad:</span>
              <span style="font-size:12px; font-weight:700; color:${strat.color}; font-family:var(--font-mono);">${strat.availability}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Slider Interactivo de Comparaci\u00F3n Operativa -->
    <div class="sim-slider-container">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
        <div>
          <h3 style="font-size:16px; font-weight:700; color:#fff;">
            <span>\uD83C\uDF9A\uFE0F</span> ${s.title}
          </h3>
          <p style="font-size:12px; color:var(--text-muted);">
            Arrastra el deslizador hacia los lados para comparar el costo de reaccionar tarde frente al ahorro de predecir a tiempo:
          </p>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn-header" onclick="setSliderPreset(0)" style="font-size:11px; padding:4px 10px;">Reactivo (0%)</button>
          <button class="btn-header" onclick="setSliderPreset(100)" style="font-size:11px; padding:4px 10px; border-color:var(--accent-cyan); color:var(--accent-cyan);">Predictivo (100%)</button>
        </div>
      </div>

      <input type="range" min="0" max="100" value="70" class="slider-range-bar" id="comparison-slider" oninput="updateComparisonSlider(this.value)">

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:16px;" id="slider-details-grid">
        <!-- Tarjeta Reactiva -->
        <div class="glass-card" style="border-color:rgba(239,68,68,0.3); background:rgba(239,68,68,0.05);" id="card-reactive-state">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:11px; font-weight:700; color:#ef4444; font-family:var(--font-mono); text-transform:uppercase;">
              ${s.before.label}
            </span>
            <span style="font-size:11px; padding:2px 8px; border-radius:10px; background:#ef444433; color:#fca5a5; font-weight:700;">
              ${s.before.status}
            </span>
          </div>
          <div style="font-size:26px; font-weight:800; color:#ef4444; font-family:var(--font-mono); margin-bottom:6px;" id="reactive-cost">
            ${s.before.cost}
          </div>
          <div style="font-size:12.5px; color:#cbd5e1; margin-bottom:8px;">${s.before.subtitle}</div>
          <ul style="font-size:12px; color:var(--text-muted); list-style:none; display:flex; flex-direction:column; gap:6px;">
            <li>\u23F1\uFE0F <strong>Downtime (tiempo fuera):</strong> ${s.before.downtime}</li>
            <li>\u26A1 <strong>Impacto en I/O (disco):</strong> ${s.before.ioImpact}</li>
            <li>\u26A0\uFE0F <strong>Riesgo de perder datos:</strong> ${s.before.dataRisk}</li>
          </ul>
        </div>

        <!-- Tarjeta Predictiva -->
        <div class="glass-card" style="border-color:rgba(6,182,212,0.4); background:rgba(6,182,212,0.08);" id="card-predictive-state">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:11px; font-weight:700; color:var(--accent-cyan); font-family:var(--font-mono); text-transform:uppercase;">
              ${s.after.label}
            </span>
            <span style="font-size:11px; padding:2px 8px; border-radius:10px; background:rgba(6,182,212,0.2); color:var(--accent-cyan-glow); font-weight:700;">
              ${s.after.status}
            </span>
          </div>
          <div style="font-size:26px; font-weight:800; color:var(--accent-cyan-glow); font-family:var(--font-mono); margin-bottom:6px;" id="predictive-cost">
            ${s.after.cost}
          </div>
          <div style="font-size:12.5px; color:#cbd5e1; margin-bottom:8px;">${s.after.subtitle}</div>
          <ul style="font-size:12px; color:var(--text-muted); list-style:none; display:flex; flex-direction:column; gap:6px;">
            <li>\u23F1\uFE0F <strong>Downtime (tiempo fuera):</strong> ${s.after.downtime}</li>
            <li>\u26A1 <strong>Impacto en I/O (disco):</strong> ${s.after.ioImpact}</li>
            <li>\uD83D\uDEE1\uFE0F <strong>Riesgo de perder datos:</strong> ${s.after.dataRisk}</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

/**
 * ===================================================================
 * SECTION 2: Los 4 Niveles de Madurez Anal\u00EDtica (Tabla 3 & Escalera)
 * ===================================================================
 */
function renderSection2(sec) {
  return `
    <!-- Banner de Advertencia de la Regla de Oro (Oculto o Din\u00E1mico) -->
    <div id="golden-rule-container" style="display:none;"></div>

    <!-- Escalera de Madurez Interactiva -->
    <div class="maturity-staircase">
      ${sec.levels.map(l => {
        const isVisited = visitedMaturityLevels.has(l.level);
        return `
          <div class="maturity-step-card ${isVisited ? 'active-step' : ''}" id="maturity-step-${l.level}" onclick="handleMaturityStepClick(${l.level})">
            <div class="step-num-badge" style="background:${l.color}22; color:${l.color}; border:1px solid ${l.color}66;">
              0${l.level}
            </div>
            <div class="step-body">
              <div class="step-title">
                <span>${l.name}</span>
                <span class="badge-tag" style="background:${l.color}18; color:${l.color}; border-color:${l.color}44; font-size:10px;">
                  ${l.badge}
                </span>
                ${l.level === 4 ? `<span style="font-size:11px; color:#f97316; font-family:var(--font-mono);">\uD83D\uDD12 Requiere Nivel 2 y 3</span>` : ''}
              </div>
              <div class="step-question"><strong>Pregunta central:</strong> ${l.question}</div>
              
              <div class="step-expanded-details" id="step-detail-${l.level}" style="margin-top:14px; padding-top:12px; border-top:1px solid var(--border-subtle); display:${isVisited ? 'block' : 'none'};">
                <p style="font-size:13px; color:#cbd5e1; margin-bottom:8px; line-height:1.5;">${linkifyTerms(l.detail)}</p>
                <div style="background:rgba(0,0,0,0.3); border-radius:6px; padding:10px 14px; font-size:12px; margin-bottom:8px;">
                  <strong style="color:var(--accent-cyan);">En el caso real de Backblaze:</strong> ${linkifyTerms(l.example)}
                </div>
                <div style="font-size:11.5px; color:var(--text-dim); font-family:var(--font-mono);">
                  <strong>Herramientas utilizadas:</strong> ${l.tools}
                </div>
              </div>
            </div>
            <div class="step-status-icon" id="step-status-icon-${l.level}">
              ${isVisited ? '\u2705' : (l.level === 4 ? '\uD83D\uDD12' : '\uD83D\uDC41\uFE0F')}
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="glass-card" style="margin-top:24px; border-left:3px solid var(--accent-orange);">
      <h4 style="font-size:14px; font-weight:700; color:#fff; margin-bottom:6px;">
        \uD83D\uDCA1 Lecci\u00F3n de Negocios para no cometer errores
      </h4>
      <p style="font-size:12.5px; color:var(--text-muted); line-height:1.5;">
        Querer automatizar \u00F3rdenes de reemplazo sin haber diagnosticado las causas f\u00EDsicas ni calibrado las probabilidades predictivas solo genera \u00F3rdenes falsas, desconfianza en los t\u00E9cnicos y saturaci\u00F3n de la red del centro de datos. La disciplina metodol\u00F3gica es la que hace que la Inteligencia Artificial ahorre dinero real.
      </p>
    </div>
  `;
}

/**
 * Handle clicking on a maturity step
 */
window.handleMaturityStepClick = function(level) {
  const container = document.getElementById('golden-rule-container');

  // INTERACTIVITY RULE CHECK:
  // If clicking on Level 4 without having visited Level 2 and Level 3:
  if (level === 4 && (!visitedMaturityLevels.has(2) || !visitedMaturityLevels.has(3))) {
    // Show Golden Rule Alert in Red
    container.innerHTML = `
      <div class="golden-rule-banner" id="golden-alert-box">
        <span style="font-size:28px;">\uD83D\uDEA8</span>
        <div>
          <div class="golden-rule-title">\u26A0\uFE0F Regla de oro: \u00A1No se puede prescribir sin antes diagnosticar y predecir!</div>
          <div class="golden-rule-desc">
            Intentaste saltar directo al <strong>Nivel 4 (Prescriptivo)</strong>. En ingenier\u00EDa y ciencia de datos, no puedes darle la orden al sistema de reemplazar discos autom\u00E1ticamente sin antes haber entendido las causas f\u00EDsicas del fallo con <strong>SHAP en el Nivel 2</strong> y calibrado los modelos de <strong>XGBoost en el Nivel 3</strong>.
          </div>
          <div style="margin-top:10px; display:flex; gap:10px;">
            <button class="btn-header" style="font-size:11px; padding:4px 10px;" onclick="handleMaturityStepClick(2)">Explorar Nivel 2 (Diagn\u00F3stico) \u2192</button>
            <button class="btn-header" style="font-size:11px; padding:4px 10px;" onclick="handleMaturityStepClick(3)">Explorar Nivel 3 (Predictivo) \u2192</button>
          </div>
        </div>
      </div>
    `;
    container.style.display = 'block';

    // Visual shake on step 4 card
    const step4Card = document.getElementById('maturity-step-4');
    if (step4Card) {
      step4Card.style.animation = 'shakeAlert 0.4s ease-in-out';
      setTimeout(() => step4Card.style.animation = '', 500);
    }

    showToast('\u26A0\uFE0F Regla de oro: No se puede prescribir sin diagnosticar y predecir', 'alert');
    return;
  }

  // If valid, mark as visited
  visitedMaturityLevels.add(level);
  if (container) container.style.display = 'none';

  // Update DOM states
  for (let i = 1; i <= 4; i++) {
    const card = document.getElementById(`maturity-step-${i}`);
    const details = document.getElementById(`step-detail-${i}`);
    const icon = document.getElementById(`step-status-icon-${i}`);
    
    if (visitedMaturityLevels.has(i)) {
      if (card) card.classList.add('active-step');
      if (details) details.style.display = 'block';
      if (icon) icon.textContent = '\u2705';
    }
  }

  showToast(`Nivel 0${level} desbloqueado y visible`, 'info');
};

/**
 * ===================================================================
 * SECTION 3: Big Data y Alta Dimensionalidad (Tabla 2 & Figura 1)
 * ===================================================================
 */
function renderSection3(sec) {
  const g = sec.growthChart;
  const currentData = g.data[selectedYearIndex] || g.data[g.data.length - 1];

  return `
    <!-- Explicaci\u00F3n de la limitaci\u00F3n humana vs Machine Learning -->
    <div class="glass-card" style="margin-bottom:20px; border-left:3px solid var(--accent-cyan); background:rgba(6,182,212,0.06);">
      <h4 style="font-size:14.5px; font-weight:700; color:#fff; margin-bottom:6px;">
        \uD83E\uDDE0 ${sec.humanLimitation.title}
      </h4>
      <p style="font-size:13px; color:#cbd5e1; line-height:1.55;">
        ${linkifyTerms(sec.humanLimitation.text)}
      </p>
    </div>

    <!-- Las 4 V del Big Data -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:16px;">
      ${sec.fourVs.map(v => `
        <div class="glass-card" style="border-top:3px solid ${v.color};">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:11px; font-weight:700; color:${v.color}; font-family:var(--font-mono); text-transform:uppercase;">
              ${v.v}
            </span>
            <span style="font-size:13px; font-weight:800; color:#fff; font-family:var(--font-mono);">
              ${v.stat}
            </span>
          </div>
          <p style="font-size:12px; color:var(--text-muted); line-height:1.5;">${linkifyTerms(v.desc)}</p>
        </div>
      `).join('')}
    </div>

    <!-- Figura 1: Gr\u00E1fico de Barras Animado de Crecimiento Dimensional -->
    <div class="growth-chart-container">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <div>
          <h3 style="font-size:16px; font-weight:700; color:#fff;">
            <span>\uD83D\uDCCA</span> ${g.title}
          </h3>
          <p style="font-size:12px; color:var(--text-muted);">${g.subtitle}</p>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="btn-header" id="btn-animate-growth" onclick="toggleGrowthAnimation()">
            <span id="growth-anim-icon">\u25B6</span> Animar Crecimiento
          </button>
          <div style="display:flex; gap:4px;">
            ${g.data.map((d, i) => `
              <button class="btn-header" style="padding:4px 8px; font-size:11px; ${i === selectedYearIndex ? 'border-color:var(--accent-cyan); color:var(--accent-cyan);' : ''}" onclick="selectGrowthYear(${i})">
                ${d.year}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Bars Visualization -->
      <div class="growth-bars-grid" id="growth-bars-grid">
        ${g.data.map((d, i) => {
          const colHeight = (d.columns / 140) * 100;
          return `
            <div class="growth-bar-col ${i === selectedYearIndex ? 'active-year' : ''}" onclick="selectGrowthYear(${i})" title="${d.year}: ${d.attributes} Atributos (${d.columns} Columnas)">
              <div class="growth-bar-fill" style="height:${colHeight}%;">
                <span class="growth-bar-val">${d.columns} col</span>
              </div>
              <span class="growth-year-label">${d.year}</span>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Year Detail Breakdown Box -->
      <div style="margin-top:20px; padding:16px; background:rgba(0,0,0,0.3); border-radius:var(--radius-md); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;" id="growth-year-details">
        <div>
          <span style="font-size:11px; color:var(--accent-cyan); font-family:var(--font-mono); font-weight:700;">A\u00D1O SELECCIONADO: ${currentData.year}</span>
          <div style="font-size:14px; font-weight:700; color:#fff; margin-top:2px;">
            ${currentData.attributes} Atributos S.M.A.R.T. distintos &bull; ${currentData.columns} Columnas Totales
          </div>
          <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">
            Discos duros monitoreados activamente: <strong>${currentData.drivesMonitored} unidades</strong> (${currentData.notes})
          </div>
        </div>
        <div style="display:flex; gap:12px;">
          <div style="background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:6px; text-align:center;">
            <div style="font-size:11px; color:var(--text-dim);">Atributos</div>
            <div style="font-size:18px; font-weight:800; color:var(--accent-cyan); font-family:var(--font-mono);">${currentData.attributes}</div>
          </div>
          <div style="background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:6px; text-align:center;">
            <div style="font-size:11px; color:var(--text-dim);">Columnas (Raw+Norm)</div>
            <div style="font-size:18px; font-weight:800; color:var(--accent-orange); font-family:var(--font-mono);">${currentData.columns}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Explicador S.M.A.R.T. (Tooltips e Informaci\u00F3n Clave) -->
    <div class="glass-card" style="margin-top:24px;">
      <h3 style="font-size:15px; font-weight:700; color:#fff; margin-bottom:12px;">
        \uD83D\uDD0D ${sec.smartExplanation.title}
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
        ${sec.smartExplanation.concepts.map(c => `
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:14px;">
            <div style="font-size:13px; font-weight:700; color:var(--accent-cyan); margin-bottom:6px;">${linkifyTerms(c.term)}</div>
            <p style="font-size:12px; color:var(--text-muted); line-height:1.5;">${linkifyTerms(c.explanation)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Handle Year Selection in Growth Bar Chart
 */
window.selectGrowthYear = function(index) {
  selectedYearIndex = index;
  const sec = presentationData.sections.find(s => s.id === 'big-data-desafio');
  if (!sec) return;
  const g = sec.growthChart;
  const currentData = g.data[selectedYearIndex];

  // Update bar columns active class
  const cols = document.querySelectorAll('.growth-bar-col');
  cols.forEach((col, i) => {
    if (i === selectedYearIndex) col.classList.add('active-year');
    else col.classList.remove('active-year');
  });

  // Update Detail Box
  const detailBox = document.getElementById('growth-year-details');
  if (detailBox) {
    detailBox.innerHTML = `
      <div>
        <span style="font-size:11px; color:var(--accent-cyan); font-family:var(--font-mono); font-weight:700;">A\u00D1O SELECCIONADO: ${currentData.year}</span>
        <div style="font-size:14px; font-weight:700; color:#fff; margin-top:2px;">
          ${currentData.attributes} Atributos S.M.A.R.T. distintos &bull; ${currentData.columns} Columnas Totales
        </div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">
          Discos duros monitoreados activamente: <strong>${currentData.drivesMonitored} unidades</strong> (${currentData.notes})
        </div>
      </div>
      <div style="display:flex; gap:12px;">
        <div style="background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:6px; text-align:center;">
          <div style="font-size:11px; color:var(--text-dim);">Atributos</div>
          <div style="font-size:18px; font-weight:800; color:var(--accent-cyan); font-family:var(--font-mono);">${currentData.attributes}</div>
        </div>
        <div style="background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:6px; text-align:center;">
          <div style="font-size:11px; color:var(--text-dim);">Columnas (Raw+Norm)</div>
          <div style="font-size:18px; font-weight:800; color:var(--accent-orange); font-family:var(--font-mono);">${currentData.columns}</div>
        </div>
      </div>
    `;
  }
};

/**
 * Toggle Growth Animation Loop
 */
window.toggleGrowthAnimation = function() {
  const btn = document.getElementById('btn-animate-growth');
  const icon = document.getElementById('growth-anim-icon');
  
  if (growthAnimationInterval) {
    clearInterval(growthAnimationInterval);
    growthAnimationInterval = null;
    if (icon) icon.textContent = '\u25B6';
    return;
  }

  if (icon) icon.textContent = '\u23F8';
  let step = 0;
  growthAnimationInterval = setInterval(() => {
    selectGrowthYear(step % 6);
    step++;
    if (step >= 6) {
      clearInterval(growthAnimationInterval);
      growthAnimationInterval = null;
      if (icon) icon.textContent = '\u25B6';
    }
  }, 900);
};

/**
 * ===================================================================
 * SECTION 4: Ciclo de Vida de Data Analytics (6 Fases & Scripts)
 * ===================================================================
 */
function renderSection4(sec) {
  return `
    <div style="margin-bottom:18px;">
      <p style="font-size:13px; color:var(--text-muted);">
        Haz clic en cualquiera de las 6 fases para ver los scripts reales de c\u00F3digo que utilizamos para transformar 55 GB de datos crudos en un modelo predictivo:
      </p>
    </div>

    <!-- Timeline Vertical Interactiva -->
    <div class="timeline-vertical-wrapper">
      ${sec.phases.map((p, idx) => `
        <div class="timeline-v-item ${idx === 0 ? 'expanded' : ''}" id="timeline-phase-${p.phase}">
          <div class="timeline-v-marker">${p.phase}</div>
          <div class="timeline-v-card" onclick="toggleTimelinePhase(${p.phase})">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="badge-tag" style="font-size:10px;">${p.tag}</span>
                <h4 style="font-size:15px; font-weight:700; color:#fff;">${p.name}</h4>
              </div>
              <span style="font-size:11px; font-family:var(--font-mono); color:var(--accent-cyan); font-weight:600;">
                ${p.metrics}
              </span>
            </div>
            
            <p style="font-size:12.5px; color:var(--text-muted); margin-top:8px; line-height:1.5;">
              ${linkifyTerms(p.objective)}
            </p>

            <!-- Contenido Expandible (Script Viewer & Key Deliverable) -->
            <div class="timeline-phase-body" id="phase-body-${p.phase}" style="display:${idx === 0 ? 'block' : 'none'}; margin-top:14px; padding-top:12px; border-top:1px solid var(--border-subtle);">
              <div style="font-size:12px; color:#cbd5e1; margin-bottom:10px;">
                <strong style="color:var(--accent-emerald);">Entregable Clave:</strong> ${linkifyTerms(p.keyDeliverable)}
              </div>

              <!-- Visor de Script -->
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:11px; font-family:var(--font-mono); color:var(--accent-orange); font-weight:600;">
                  \uD83D\uDCC4 ${p.script}
                </span>
                <span style="font-size:10px; color:var(--text-dim); font-family:var(--font-mono);">Bash / Python / SQL</span>
              </div>
              
              <div class="script-code-box">
                <button class="btn-copy-script" onclick="copyScriptCode(event, 'code-box-${p.phase}')">
                  \uD83D\uDCCB Copiar Script
                </button>
                <pre id="code-box-${p.phase}"><code>${escapeHtml(p.scriptCode)}</code></pre>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Toggle Timeline Phase Expansion
 */
window.toggleTimelinePhase = function(phaseNum) {
  const item = document.getElementById(`timeline-phase-${phaseNum}`);
  const body = document.getElementById(`phase-body-${phaseNum}`);
  if (!item || !body) return;

  const isExpanded = item.classList.contains('expanded');
  if (isExpanded) {
    item.classList.remove('expanded');
    body.style.display = 'none';
  } else {
    item.classList.add('expanded');
    body.style.display = 'block';
  }
};

/**
 * Copy Script to Clipboard
 */
window.copyScriptCode = function(event, elementId) {
  event.stopPropagation();
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.innerText;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Script copiado al portapapeles', 'info');
  }).catch(() => {
    showToast('No se pudo copiar autom\u00E1ticamente', 'alert');
  });
};

/**
 * ===================================================================
 * SECTION 5: Ingenier\u00EDa de Datos y Feature Engineering (Flowchart)
 * ===================================================================
 */
function renderSection5(sec) {
  const w = sec.rollingWindowDetails;
  const imb = sec.imbalanceChallenge;

  return `
    <!-- Met\u00E1fora de la ventana m\u00F3vil de 10 d\u00EDas -->
    <div class="glass-card" style="margin-bottom:20px; border-left:3px solid var(--accent-cyan); background:rgba(6,182,212,0.06);">
      <h4 style="font-size:14.5px; font-weight:700; color:#fff; margin-bottom:6px;">
        \uD83C\uDFAC ${sec.rollingWindowMetaphor.title}
      </h4>
      <p style="font-size:13px; color:#cbd5e1; line-height:1.55;">
        ${linkifyTerms(sec.rollingWindowMetaphor.quote)}
      </p>
    </div>

    <!-- Resumen del Desaf\u00EDo de Desbalance -->
    <div style="display:grid; grid-template-columns:1fr 2fr; gap:18px; margin-bottom:24px;">
      <div class="glass-card" style="border-left:3px solid var(--accent-orange); display:flex; flex-direction:column; justify-content:center;">
        <span style="font-size:11px; font-family:var(--font-mono); color:var(--accent-orange); font-weight:700; text-transform:uppercase;">
          Desbalance Extremo en Producci\u00F3n
        </span>
        <div style="font-size:26px; font-weight:800; color:#fff; font-family:var(--font-mono); margin:4px 0;">
          ${imb.ratio}
        </div>
        <div style="font-size:12px; color:var(--text-muted);">Discos Sanos vs Discos en Fallo</div>
      </div>

      <div class="glass-card">
        <h4 style="font-size:14px; font-weight:700; color:#fff; margin-bottom:6px;">
          Por qu\u00E9 la Telemetr\u00EDa de un Solo D\u00EDa No Alcanza
        </h4>
        <p style="font-size:12.5px; color:var(--text-muted); line-height:1.5;">
          ${linkifyTerms(imb.explanation)}
        </p>
      </div>
    </div>

    <!-- Diagrama de Flujo Interactivo -->
    <div class="glass-card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
        <h3 style="font-size:16px; font-weight:700; color:#fff;">
          <span>\uD83D\uDD04</span> Diagrama de Flujo del Pipeline de Datos
        </h3>
        <span style="font-size:12px; color:var(--text-muted); font-family:var(--font-mono);">
          Haz clic en cada etapa para inspeccionar su l\u00F3gica de transformaci\u00F3n
        </span>
      </div>

      <div class="flowchart-wrapper">
        ${sec.pipelineFlow.map((step, idx) => `
          <div class="flow-node ${step.step === activeFlowStep ? 'active-flow' : ''}" id="flow-node-${step.step}" onclick="selectFlowStep(${step.step})">
            <div style="font-size:11px; font-weight:700; color:var(--accent-cyan); font-family:var(--font-mono); margin-bottom:4px;">
              ETAPA 0${step.step}
            </div>
            <div style="font-size:13px; font-weight:700; color:#fff; margin-bottom:2px;">
              ${step.title}
            </div>
            <div style="font-size:11px; color:var(--text-dim);">${step.subtitle}</div>
          </div>
          ${idx < sec.pipelineFlow.length - 1 ? `<div class="flow-arrow-icon">\u2794</div>` : ''}
        `).join('')}
      </div>

      <!-- Detalle de la Etapa Seleccionada -->
      <div style="margin-top:20px; padding:18px; background:rgba(0,0,0,0.3); border-radius:var(--radius-md); border:1px solid var(--border-subtle);" id="flow-step-detail">
        <!-- Injected dynamically -->
      </div>
    </div>

    <!-- Detalle de las 5 Agregaciones en Ventana de 10 D\u00EDas -->
    <div class="glass-card" style="margin-top:24px;">
      <h3 style="font-size:15px; font-weight:700; color:#fff; margin-bottom:12px;">
        \u23F1\uFE0F Funciones de Ventanas M\u00F3viles de 10 D\u00EDas (${w.windowSize})
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:14px;">
        ${w.aggregations.map(a => `
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:12px 14px;">
            <div style="font-size:13px; font-weight:700; color:var(--accent-cyan); font-family:var(--font-mono); margin-bottom:4px;">
              ${a.func}
            </div>
            <p style="font-size:12px; color:var(--text-muted); line-height:1.4;">${linkifyTerms(a.desc)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Handle Flow Step Selection
 */
window.selectFlowStep = function(stepNum) {
  activeFlowStep = stepNum;
  const sec = presentationData.sections.find(s => s.id === 'ingenieria-datos');
  if (!sec) return;
  const step = sec.pipelineFlow.find(st => st.step === stepNum);
  if (!step) return;

  // Update nodes active class
  const nodes = document.querySelectorAll('.flow-node');
  nodes.forEach(n => n.classList.remove('active-flow'));
  const activeNode = document.getElementById(`flow-node-${stepNum}`);
  if (activeNode) activeNode.classList.add('active-flow');

  // Update detail box
  const box = document.getElementById('flow-step-detail');
  if (box) {
    box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
        <div>
          <span style="font-size:11px; font-weight:700; color:var(--accent-cyan); font-family:var(--font-mono);">ETAPA SELECCIONADA: 0${step.step}</span>
          <h4 style="font-size:16px; font-weight:700; color:#fff; margin-top:2px;">${step.title} &bull; ${step.subtitle}</h4>
          <p style="font-size:13px; color:#cbd5e1; margin-top:6px; line-height:1.5;">${linkifyTerms(step.desc)}</p>
        </div>
      </div>
      <div style="margin-top:12px; background:#050811; border:1px solid rgba(255,255,255,0.1); border-radius:6px; padding:12px; font-family:var(--font-mono); font-size:12px; color:var(--accent-cyan-glow); overflow-x:auto;">
        ${escapeHtml(step.sqlExample)}
      </div>
    `;
  }
};

/**
 * ===================================================================
 * SECTION 6: El Torneo de Algoritmos y las Matem\u00E1ticas del Modelo
 * ===================================================================
 */
function renderSection6(sec) {
  return `
    <!-- Trilog\u00EDa Matem\u00E1tica Interactiva (F\u00F3rmulas A, B y C) -->
    <div class="formula-showcase-container">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <div>
          <h3 style="font-size:16px; font-weight:700; color:#fff;">
            <span>\uD83D\uDCD0</span> Las 3 F\u00F3rmulas Matem\u00E1ticas que Hacen Funcionar el Modelo
          </h3>
          <p style="font-size:12px; color:var(--text-muted);">
            Haz clic en cada pesta\u00F1a para entender qu\u00E9 hace cada f\u00F3rmula explicada en cristiano:
          </p>
        </div>
      </div>

      <!-- Formula Tab Buttons -->
      <div class="formula-tabs-nav">
        ${sec.mathFormulas.map((form, idx) => `
          <button class="formula-tab-btn ${idx === activeFormulaIndex ? 'active-formula-tab' : ''}" id="formula-tab-btn-${idx}" onclick="selectFormulaTab(${idx})">
            ${form.title.split(':')[0]}
          </button>
        `).join('')}
      </div>

      <!-- Formula Display Card -->
      <div id="formula-active-card">
        <!-- Rendered dynamically -->
      </div>
    </div>

    <!-- Tabla 7: Resultados Comparativos Ordenables con Diagn\u00F3stico al Clic -->
    <div class="glass-card" style="margin-top:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <div>
          <h3 style="font-size:16px; font-weight:700; color:#fff;">
            <span>\uD83C\uDFC6</span> ${sec.table7.title}
          </h3>
          <p style="font-size:12px; color:var(--text-muted);">${sec.table7.subtitle}</p>
        </div>
        <div>
          <button class="btn-header" style="font-size:11px; padding:4px 10px; border-color:var(--accent-emerald); color:var(--accent-emerald);" onclick="highlightWinnerXGB()">
            \u2728 Destacar \u00D3ptimo Operativo
          </button>
        </div>
      </div>

      <div style="overflow-x:auto;">
        <table class="tournament-table" id="tournament-table" style="width:100%; border-collapse:collapse; font-size:13px;">
          <thead>
            <tr style="border-bottom:1px solid var(--border-subtle); text-align:left;">
              <th class="sortable-th" onclick="sortTournament('model')" style="padding:10px 12px;">Estrategia <span class="sort-dir-arrow" id="sort-arrow-model"></span></th>
              <th class="sortable-th" onclick="sortTournament('missed')" style="padding:10px 12px; text-align:center;">Omitidos (FN) <span class="sort-dir-arrow" id="sort-arrow-missed"></span></th>
              <th class="sortable-th" onclick="sortTournament('detected')" style="padding:10px 12px; text-align:center;">Detectados (TP) <span class="sort-dir-arrow" id="sort-arrow-detected"></span></th>
              <th class="sortable-th" onclick="sortTournament('falseAlarms')" style="padding:10px 12px; text-align:center;">Falsas Alarmas (FP) <span class="sort-dir-arrow" id="sort-arrow-falseAlarms"></span></th>
              <th class="sortable-th" onclick="sortTournament('recall')" style="padding:10px 12px; text-align:center;">Recall (%) <span class="sort-dir-arrow" id="sort-arrow-recall"></span></th>
              <th class="sortable-th" onclick="sortTournament('precision')" style="padding:10px 12px; text-align:center;">Precisi\u00F3n (%) <span class="sort-dir-arrow" id="sort-arrow-precision"></span></th>
              <th class="sortable-th" onclick="sortTournament('f2')" style="padding:10px 12px; text-align:center;">F2-Score <span class="sort-dir-arrow" id="sort-arrow-f2">\u25BC</span></th>
              <th style="padding:10px 12px;">Veredicto Operativo</th>
            </tr>
          </thead>
          <tbody id="tournament-table-body">
            <!-- Rendered dynamically -->
          </tbody>
        </table>
      </div>

      <!-- Panel de Diagn\u00F3stico en Profundidad del Modelo Seleccionado -->
      <div id="tournament-diagnosis-container">
        <!-- Rendered dynamically upon row click -->
      </div>
    </div>
  `;
}

/**
 * Switch Active Formula Tab
 */
window.selectFormulaTab = function(idx) {
  activeFormulaIndex = idx;
  const sec = presentationData.sections.find(s => s.id === 'torneo-algoritmos');
  if (!sec || !sec.mathFormulas) return;
  const form = sec.mathFormulas[idx];
  if (!form) return;

  // Update tabs
  document.querySelectorAll('.formula-tab-btn').forEach((btn, i) => {
    if (i === idx) btn.classList.add('active-formula-tab');
    else btn.classList.remove('active-formula-tab');
  });

  const card = document.getElementById('formula-active-card');
  if (card) {
    card.innerHTML = `
      <div class="formula-display-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <h4 style="font-size:15px; font-weight:700; color:#fff;">${form.title}</h4>
          <span class="badge-tag" style="background:${form.color}22; color:${form.color}; border-color:${form.color}66; font-size:10px;">
            ${form.badge}
          </span>
        </div>

        <div class="formula-math-render math-card-highlight">
          ${window.renderMath ? window.renderMath(form.latex, true) : escapeHtml(form.latex)}
        </div>

        <div class="formula-analogy-box">
          <strong style="color:var(--accent-orange); display:block; margin-bottom:4px;">💡 En Cristiano / Explicación Cotidiana:</strong>
          ${window.renderMathInText ? window.renderMathInText(linkifyTerms(form.plainExplanation)) : linkifyTerms(form.plainExplanation)}
        </div>

        <div class="formula-var-grid">
          ${form.variables.map(v => `
            <div class="formula-var-chip">
              <div class="formula-var-name">${window.renderMathInText ? window.renderMathInText(v.name) : v.name}</div>
              <div class="formula-var-desc">${window.renderMathInText ? window.renderMathInText(linkifyTerms(v.desc)) : linkifyTerms(v.desc)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // KaTeX auto-render safety pass on active formula card
    if (typeof window.renderMathInElement !== 'undefined') {
      try {
        window.renderMathInElement(card, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch (e) {}
    }
  }
};

/**
 * Handle Row Click in Tournament Table
 */
window.selectTournamentRow = function(rowId) {
  activeDiagnosedModelId = rowId;
  renderTournamentRows();
  renderTournamentDiagnosis();
};

function renderTournamentDiagnosis() {
  const container = document.getElementById('tournament-diagnosis-container');
  if (!container) return;

  const sec = presentationData.sections.find(s => s.id === 'torneo-algoritmos');
  if (!sec) return;
  const row = sec.table7.rows.find(r => r.id === activeDiagnosedModelId) || sec.table7.rows[3]; // default to XGBoost

  container.innerHTML = `
    <div class="model-diagnosis-box">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:18px;">\uD83D\uDD0E</span>
          <h4 style="font-size:15px; font-weight:800; color:#fff;">
            ${row.diagnosisTitle || ('Diagn\u00F3stico: ' + row.model)}
          </h4>
        </div>
        <span class="badge-tag" style="font-size:10px; border-color:var(--accent-cyan);">
          F2: ${row.f2.toFixed(3)} | Recall: ${row.recall.toFixed(1)}% | Alarmas: ${row.falseAlarms}
        </span>
      </div>
      <p style="font-size:13.5px; color:#e2e8f0; line-height:1.55;">
        ${linkifyTerms(row.diagnosisText || row.evaluation)}
      </p>
    </div>
  `;
}

/**
 * Sort and Render Tournament Table
 */
function renderTournamentRows() {
  const tbody = document.getElementById('tournament-table-body');
  if (!tbody) return;

  const sec = presentationData.sections.find(s => s.id === 'torneo-algoritmos');
  if (!sec) return;

  let rows = [...sec.table7.rows];

  // Sorting
  rows.sort((a, b) => {
    let valA = a[currentSortColumn];
    let valB = b[currentSortColumn];
    if (typeof valA === 'string') {
      return currentSortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return currentSortAsc ? valA - valB : valB - valA;
  });

  tbody.innerHTML = rows.map(r => {
    const isXGB = r.id.startsWith('xgb');
    const isDiagnosed = r.id === activeDiagnosedModelId;
    return `
      <tr class="${isXGB ? 'xgb-row-hover' : ''} ${r.isOptimal ? 'winner-row' : ''} ${isDiagnosed ? 'active-diagnosed-row' : ''}" 
          onclick="selectTournamentRow('${r.id}')"
          title="Haz clic para ver el an\u00E1lisis a fondo de este algoritmo"
          style="border-bottom:1px solid rgba(255,255,255,0.05); transition:all 0.2s ease;">
        <td style="padding:12px;">
          <div style="font-weight:700; color:#fff; display:flex; align-items:center; gap:6px;">
            ${isDiagnosed ? '<span style="color:var(--accent-cyan); font-size:11px;">\uD83D\uDC49</span>' : ''}
            ${r.model}
          </div>
          <div style="font-size:11px; color:var(--text-dim); font-family:var(--font-mono);">${r.type}</div>
        </td>
        <td style="padding:12px; text-align:center; font-family:var(--font-mono); color:${r.missed > 100 ? '#ef4444' : '#fca5a5'}; font-weight:700;">
          ${r.missed}
        </td>
        <td style="padding:12px; text-align:center; font-family:var(--font-mono); color:${r.detected > 50 ? '#34d399' : '#94a3b8'}; font-weight:700;">
          ${r.detected}
        </td>
        <td style="padding:12px; text-align:center; font-family:var(--font-mono); color:${r.falseAlarms > 200 ? '#ef4444' : 'var(--accent-cyan)'}; font-weight:700;">
          ${r.falseAlarms}
        </td>
        <td style="padding:12px; text-align:center; font-family:var(--font-mono); font-weight:700; color:${r.recall > 50 ? 'var(--accent-cyan-glow)' : 'inherit'};">
          ${r.recall.toFixed(1)}%
        </td>
        <td style="padding:12px; text-align:center; font-family:var(--font-mono); font-weight:700;">
          ${r.precision.toFixed(1)}%
        </td>
        <td style="padding:12px; text-align:center; font-family:var(--font-mono); font-weight:800; font-size:14px; color:${r.f2 > 0.5 ? 'var(--accent-emerald-glow)' : 'inherit'};">
          ${r.f2.toFixed(3)}
        </td>
        <td style="padding:12px; font-size:12px; color:var(--text-muted); line-height:1.4;">
          ${linkifyTerms(r.evaluation)}
        </td>
      </tr>
    `;
  }).join('');
}

window.sortTournament = function(colKey) {
  if (currentSortColumn === colKey) {
    currentSortAsc = !currentSortAsc;
  } else {
    currentSortColumn = colKey;
    currentSortAsc = false;
  }

  // Update header arrows
  ['model', 'missed', 'detected', 'falseAlarms', 'recall', 'precision', 'f2'].forEach(k => {
    const arrow = document.getElementById(`sort-arrow-${k}`);
    if (arrow) {
      if (k === currentSortColumn) {
        arrow.textContent = currentSortAsc ? '\u25B2' : '\u25BC';
      } else {
        arrow.textContent = '';
      }
    }
  });

  renderTournamentRows();
  showToast(`Tabla ordenada por ${colKey} (${currentSortAsc ? 'asc' : 'desc'})`, 'info');
};

window.highlightWinnerXGB = function() {
  currentSortColumn = 'f2';
  currentSortAsc = false;
  activeDiagnosedModelId = 'xgb-no-hist';
  renderTournamentRows();
  renderTournamentDiagnosis();
  showToast('XGBoost sin historia (N \u2264 7) destacado como el \u00F3ptimo operativo', 'info');
};

/**
 * ===================================================================
 * SECTION 7: Interpretabilidad del Modelo (SHAP y F-Score)
 * ===================================================================
 */
function renderSection7(sec) {
  const f = sec.figure2;
  return `
    <div class="shap-chart-wrapper">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <div>
          <h3 style="font-size:16px; font-weight:700; color:#fff;">
            <span>\uD83D\uDD2C</span> ${f.title}
          </h3>
          <p style="font-size:12px; color:var(--text-muted);">${f.subtitle}</p>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn-header" style="font-size:11px; padding:4px 8px;" onclick="filterShap('all')">Todas</button>
          <button class="btn-header" style="font-size:11px; padding:4px 8px; border-color:var(--accent-orange); color:var(--accent-orange);" onclick="filterShap('heuristic')">Heur\u00EDstica (Naranja)</button>
          <button class="btn-header" style="font-size:11px; padding:4px 8px; border-color:var(--accent-cyan); color:var(--accent-cyan);" onclick="filterShap('age-context')">Edad del Disco (Azul)</button>
        </div>
      </div>

      <!-- Horizontal Bars Grid -->
      <div id="shap-bars-container">
        ${f.features.map(feat => {
          const widthPct = (feat.importance / 0.30) * 100;
          return `
            <div class="shap-bar-row" data-type="${feat.type}" onmouseenter="showShapFeatureDetail('${feat.feature}')">
              <div class="shap-label" title="${feat.name}">
                ${feat.name}
              </div>
              <div class="shap-track">
                <div class="shap-fill ${feat.type}" style="width:${widthPct}%;">
                  ${(feat.importance * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Feature Decision Details Box -->
      <div style="margin-top:20px; padding:16px; background:rgba(0,0,0,0.3); border-radius:var(--radius-md); border:1px solid var(--border-subtle);" id="shap-detail-box">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
          <span style="font-size:11px; font-family:var(--font-mono); font-weight:700; color:var(--accent-cyan); text-transform:uppercase;">
            HALLAZGO CR\u00CDTICO SELECCIONADO
          </span>
          <span style="font-size:11px; padding:2px 8px; border-radius:10px; background:rgba(6,182,212,0.2); color:var(--accent-cyan-glow); font-weight:700;">
            SMART 9 Raw (3er Lugar)
          </span>
        </div>
        <p style="font-size:13px; color:#cbd5e1; line-height:1.5;" id="shap-detail-text">
          Pasa el cursor sobre cualquiera de las barras para ver la justificaci\u00F3n f\u00EDsica de por qu\u00E9 el modelo tom\u00F3 esa decisi\u00F3n. El atributo <strong>SMART 9 Raw (Horas de Encendido)</strong> prueba que XGBoost contextualiza los errores seg\u00FAn la fatiga del disco: 10 errores en un disco viejo son letales, mientras que en uno nuevo pueden tolerarse m\u00E1s tiempo.
        </p>
      </div>
    </div>
  `;
}

window.showShapFeatureDetail = function(featureKey) {
  const sec = presentationData.sections.find(s => s.id === 'interpretabilidad-shap');
  if (!sec) return;
  const feat = sec.figure2.features.find(f => f.feature === featureKey);
  if (!feat) return;

  const text = document.getElementById('shap-detail-text');
  if (text) {
    text.innerHTML = `<strong>${escapeHtml(feat.name)}:</strong> ${escapeHtml(feat.explanation)}`;
  }
};

window.filterShap = function(type) {
  activeShapFilter = type;
  const rows = document.querySelectorAll('.shap-bar-row');
  rows.forEach(r => {
    if (type === 'all' || r.dataset.type === type) {
      r.style.display = 'flex';
    } else {
      r.style.display = 'none';
    }
  });
};

/**
 * ===================================================================
 * SECTION 8: Conclusiones y Hoja de Ruta (MLOps & Counters)
 * ===================================================================
 */
function renderSection8(sec) {
  return `
    <!-- Contadores Animados -->
    <div class="counters-grid">
      ${sec.animatedCounters.map(c => `
        <div class="counter-card">
          <div class="counter-val" id="${c.id}" data-target="${c.target}">0</div>
          <div class="counter-label">${c.label}</div>
          <div class="counter-sub">${c.desc}</div>
        </div>
      `).join('')}
    </div>

    <!-- Tabla 8: Hoja de Ruta hacia Producci\u00F3n (4 Pilares) -->
    <div class="glass-card" style="margin-top:28px;">
      <h3 style="font-size:16px; font-weight:700; color:#fff; margin-bottom:16px;">
        <span>\uD83D\uDE80</span> ${sec.table8.title}
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:18px;">
        ${sec.table8.pillars.map(p => `
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:18px; border-top:3px solid ${p.color};">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:11px; font-weight:700; color:${p.color}; font-family:var(--font-mono); text-transform:uppercase;">
                PILAR 0${p.pillar} &bull; ${p.tag}
              </span>
              <span style="font-size:10px; padding:2px 6px; border-radius:4px; background:${p.color}22; color:${p.color}; font-weight:700;">
                Fase 2
              </span>
            </div>
            <h4 style="font-size:14.5px; font-weight:700; color:#fff; margin-bottom:8px;">${p.name}</h4>
            <div style="font-size:12px; color:var(--text-muted); margin-bottom:8px;">
              <strong style="color:#94a3b8;">Estado Actual:</strong> ${p.current}
            </div>
            <div style="font-size:12px; color:#cbd5e1; margin-bottom:10px; line-height:1.4;">
              <strong style="color:${p.color};">Paso a Producci\u00F3n:</strong> ${linkifyTerms(p.production)}
            </div>
            <div style="padding-top:8px; border-top:1px solid var(--border-subtle); font-size:11.5px; color:var(--text-dim); font-family:var(--font-mono);">
              \uD83D\uDEE1\uFE0F <strong>Impacto Real:</strong> ${p.impact}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Animate Numbers in Section 8
 */
function animateCounters() {
  if (countersAnimated) return;
  const sec = presentationData.sections.find(s => s.id === 'conclusiones-mlops');
  if (!sec) return;

  sec.animatedCounters.forEach(c => {
    const el = document.getElementById(c.id);
    if (!el) return;
    const target = c.target;
    let current = 0;
    const duration = 1200; // ms
    const stepTime = 30;
    const increment = Math.ceil(target / (duration / stepTime));

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + (c.unit === 'GB' ? ' GB' : '');
    }, stepTime);
  });

  countersAnimated = true;
}

/**
 * ===================================================================
 * NAVIGATION & INTERACTIVITY CONTROLLERS
 * ===================================================================
 */
window.goToSection = function(idx) {
  const activeSections = getActiveData().sections;
  if (idx < 0 || idx >= activeSections.length) return;
  currentSectionIdx = idx;

  // Update hash
  const sec = activeSections[idx];
  window.history.replaceState(null, null, `#${sec.id}`);

  // View Mode: Slides vs Continuous
  if (!isContinuousMode) {
    document.querySelectorAll('.view-section').forEach((el, i) => {
      if (i === idx) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const targetEl = document.getElementById(`section-${sec.id}`);
    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Update sidebar active item
  document.querySelectorAll('.nav-item').forEach((btn, i) => {
    if (i === idx) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  // Update slide dots
  document.querySelectorAll('.slide-dot').forEach((dot, i) => {
    if (i === idx) dot.classList.add('active');
    else dot.classList.remove('active');
  });

  // Update footer counter & buttons
  const counter = document.getElementById('slide-counter');
  const totalSecs = activeSections.length;
  const curDisplay = (idx + 1) < 10 ? `0${idx + 1}` : `${idx + 1}`;
  const totDisplay = totalSecs < 10 ? `0${totalSecs}` : `${totalSecs}`;
  if (counter) counter.textContent = `${curDisplay} / ${totDisplay}`;

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  if (btnPrev) btnPrev.disabled = idx === 0;
  if (btnNext) btnNext.disabled = idx === totalSecs - 1;

  // Trigger Section 8 counters if reached in Backblaze
  if (sec.id === 'conclusiones-mlops') {
    setTimeout(animateCounters, 200);
  }

  // If section 6 in Backblaze, ensure formulas and table diagnosis are rendered
  if (sec.id === 'torneo-algoritmos') {
    selectFormulaTab(activeFormulaIndex);
    renderTournamentRows();
    renderTournamentDiagnosis();
  }

  // If section 5 in Backblaze, ensure initial flow step is rendered
  if (sec.id === 'ingenieria-datos') {
    selectFlowStep(1);
  }
};

/**
 * Switch Active Case (Backblaze vs IMPORTMED S.A.)
 */
window.switchCase = function(caseId) {
  if (currentCase === caseId) return;
  currentCase = caseId;
  if (typeof window !== 'undefined') window.currentCase = caseId;

  // Toggle active class on switcher buttons
  const btnBackblaze = document.getElementById('btn-case-backblaze');
  const btnImportmed = document.getElementById('btn-case-importmed');
  if (btnBackblaze) btnBackblaze.classList.toggle('active', caseId === 'backblaze');
  if (btnImportmed) btnImportmed.classList.toggle('active', caseId === 'importmed');

  const headerTitle = document.getElementById('header-title');
  const headerSubtitle = document.getElementById('header-subtitle');
  const brandLogo = document.getElementById('brand-logo');
  const headerBadges = document.getElementById('header-badges');

  if (caseId === 'importmed') {
    if (headerTitle) headerTitle.textContent = "IMPORTMED S.A. | Mantenimiento Predictivo Biom\u00E9dico";
    if (headerSubtitle) headerSubtitle.textContent = "UNIVERSIDAD NACIONAL DE INGENIER\u00CDA (UNI) \u2022 229 EQUIPOS \u2022 17 HOSPITALES";
    if (brandLogo) {
      brandLogo.style.background = 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))';
      brandLogo.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      `;
    }
    if (headerBadges) {
      headerBadges.innerHTML = `
        <span class="badge-tag" title="M\u00E9trica rectora de evaluaci\u00F3n cl\u00EDnica">
          <span style="width:7px; height:7px; border-radius:50%; background:#10b981; display:inline-block; box-shadow:0 0 10px #10b981;"></span>
          XGBoost F2 = 0.4735
        </span>
        <span class="badge-tag" title="Factor de protecci\u00F3n financiera">
          <span style="width:7px; height:7px; border-radius:50%; background:#06b6d4; display:inline-block; box-shadow:0 0 10px #06b6d4;"></span>
          Protecci\u00F3n 27.54x ($415k)
        </span>
        <span class="badge-tag badge-tag-alt" title="Parque biom\u00E9dico evaluado">
          <span style="width:7px; height:7px; border-radius:50%; background:#f59e0b; display:inline-block; box-shadow:0 0 10px #f59e0b;"></span>
          229 Equipos \u2022 17 Centros
        </span>
      `;
    }
    showToast('Caso cargado: IMPORTMED S.A. (Parque Biom\u00E9dico)', 'success');
  } else {
    if (headerTitle) headerTitle.textContent = "Backblaze Data Center | Mantenimiento Predictivo HDD";
    if (headerSubtitle) headerSubtitle.textContent = "TELEMETR\u00CDA S.M.A.R.T. & MACHINE LEARNING \u2022 FLOTA ST4000DM000";
    if (brandLogo) {
      brandLogo.style.background = 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))';
      brandLogo.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      `;
    }
    if (headerBadges) {
      headerBadges.innerHTML = `
        <span class="badge-tag" title="M\u00E9trica campeona de evaluaci\u00F3n">
          <span style="width:7px; height:7px; border-radius:50%; background:#06b6d4; display:inline-block; box-shadow:0 0 10px #06b6d4;"></span>
          XGBoost F2 = 0.528
        </span>
        <span class="badge-tag badge-tag-alt" title="Conjunto independiente ciego">
          <span style="width:7px; height:7px; border-radius:50%; background:#f97316; display:inline-block; box-shadow:0 0 10px #f97316;"></span>
          165 Fallos Reales (test_2019)
        </span>
      `;
    }
    showToast('Caso cargado: Centros de Datos Backblaze (HDDs)', 'info');
  }

  // Re-build navigation, glossary and sections
  buildNavigation();
  buildGlossary();
  renderSections();
  goToSection(0);
};

/**
 * Lightbox Image Modal Logic
 */
window.openLightbox = function(src, title, caption, badgeText = 'AN\u00C1LISIS GR\u00C1FICO') {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const captionEl = document.getElementById('lightbox-caption');
  const badgeEl = document.getElementById('lightbox-badge');

  if (!modal || !img) return;

  img.src = src;
  if (titleEl) titleEl.textContent = title || 'Gr\u00E1fica Detallada';
  if (captionEl) captionEl.textContent = caption || '';
  if (badgeEl) badgeEl.textContent = badgeText;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

function setupLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const backdrop = document.getElementById('lightbox-backdrop');

  if (closeBtn) closeBtn.addEventListener('click', window.closeLightbox);
  if (backdrop) backdrop.addEventListener('click', window.closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLightbox();
      toggleGlossary(false);
    }
  });
}

function setupEventListeners() {
  // Case Switcher Buttons (Backblaze vs IMPORTMED S.A.)
  const btnCaseBb = document.getElementById('btn-case-backblaze');
  const btnCaseIm = document.getElementById('btn-case-importmed');
  if (btnCaseBb) btnCaseBb.addEventListener('click', () => window.switchCase('backblaze'));
  if (btnCaseIm) btnCaseIm.addEventListener('click', () => window.switchCase('importmed'));

  // Footer Prev/Next
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  if (btnPrev) btnPrev.addEventListener('click', () => goToSection(currentSectionIdx - 1));
  if (btnNext) btnNext.addEventListener('click', () => goToSection(currentSectionIdx + 1));

  // Toggle View Mode (Continuous vs Presentation)
  const btnMode = document.getElementById('btn-toggle-mode');
  if (btnMode) {
    btnMode.addEventListener('click', () => {
      isContinuousMode = !isContinuousMode;
      const presContainer = document.getElementById('pres-container');
      const modeText = document.getElementById('mode-text');
      const modeIcon = document.getElementById('mode-icon');
      
      if (isContinuousMode) {
        presContainer.classList.add('continuous-mode');
        btnMode.classList.add('active');
        if (modeText) modeText.textContent = 'Modo Diapositiva';
        if (modeIcon) modeIcon.textContent = '\uD83D\uDDA5\uFE0F';
        showToast('Modo de lectura continua activado', 'info');
      } else {
        presContainer.classList.remove('continuous-mode');
        btnMode.classList.remove('active');
        if (modeText) modeText.textContent = 'Modo Continuo';
        if (modeIcon) modeIcon.textContent = '\uD83D\uDCD1';
        goToSection(currentSectionIdx);
        showToast('Modo de presentaci\u00F3n por diapositivas activado', 'info');
      }
    });
  }

  // Autoplay Toggle
  const btnAutoplay = document.getElementById('btn-autoplay');
  if (btnAutoplay) {
    btnAutoplay.addEventListener('click', () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
        btnAutoplay.classList.remove('active');
        document.getElementById('autoplay-text').textContent = 'Auto (15s)';
        document.getElementById('autoplay-icon').textContent = '\u25B6';
        showToast('Reproducci\u00F3n autom\u00E1tica pausada', 'info');
      } else {
        btnAutoplay.classList.add('active');
        autoplayRemaining = 15;
        document.getElementById('autoplay-icon').textContent = '\u23F8';
        document.getElementById('autoplay-text').textContent = `${autoplayRemaining}s`;
        
        autoplayTimer = setInterval(() => {
          autoplayRemaining--;
          document.getElementById('autoplay-text').textContent = `${autoplayRemaining}s`;
          if (autoplayRemaining <= 0) {
            autoplayRemaining = 15;
            const activeSecs = getActiveData().sections;
            let nextIdx = (currentSectionIdx + 1) % activeSecs.length;
            goToSection(nextIdx);
          }
        }, 1000);

        showToast('Reproducci\u00F3n autom\u00E1tica iniciada (15s por diapositiva)', 'info');
      }
    });
  }

  // Glossary Drawer Buttons (header + sidebar)
  const btnGlossary = document.getElementById('btn-open-glossary');
  if (btnGlossary) btnGlossary.addEventListener('click', () => toggleGlossary(true));

  const btnSidebarGlossary = document.getElementById('btn-sidebar-glossary');
  if (btnSidebarGlossary) btnSidebarGlossary.addEventListener('click', () => toggleGlossary(true));

  const drawerClose = document.getElementById('drawer-close-btn');
  if (drawerClose) drawerClose.addEventListener('click', () => toggleGlossary(false));

  const drawerBackdrop = document.getElementById('drawer-backdrop');
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => toggleGlossary(false));

  // Fullscreen Button
  const btnFullscreen = document.getElementById('btn-fullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }
}

function setupKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        goToSection(currentSectionIdx + 1);
      }
    } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        goToSection(currentSectionIdx - 1);
      }
    } else if (e.key === 'Escape') {
      toggleGlossary(false);
    }
  });
}

function attachInteractiveListeners() {
  // Initial render of section 6 formulas and table
  selectFormulaTab(0);
  renderTournamentRows();
  renderTournamentDiagnosis();
  selectFlowStep(1);
}

/**
 * Update Slider in Section 1
 */
window.updateComparisonSlider = function(val) {
  const reactiveCard = document.getElementById('card-reactive-state');
  const predCard = document.getElementById('card-predictive-state');

  const v = parseFloat(val); // 0 to 100
  if (reactiveCard && predCard) {
    reactiveCard.style.opacity = (1.2 - (v / 100)).toFixed(2);
    predCard.style.opacity = (0.2 + (v / 100) * 0.8).toFixed(2);
  }
};

window.setSliderPreset = function(val) {
  const slider = document.getElementById('comparison-slider');
  if (slider) {
    slider.value = val;
    updateComparisonSlider(val);
  }
};

window.selectStrategy = function(stratId) {
  const cards = document.querySelectorAll('.strat-card');
  cards.forEach(c => c.classList.remove('active-strat'));
  const target = document.getElementById(`strat-card-${stratId}`);
  if (target) target.classList.add('active-strat');

  if (stratId === 'correctiva') setSliderPreset(0);
  else if (stratId === 'preventiva') setSliderPreset(50);
  else if (stratId === 'predictiva') setSliderPreset(100);
};

/**
 * ===================================================================
 * FLOATING TOOLTIP & GLOSARIO TERM ENRICHMENT (Project Specific Context)
 * ===================================================================
 */
function setupFloatingTooltip() {
  const tooltip = document.getElementById('floating-tooltip');
  
  document.addEventListener('mouseover', (e) => {
    const termEl = e.target.closest('.term-ref');
    if (termEl) {
      const termKey = termEl.dataset.term;
      const activeGlossary = getActiveData().glossary || [];
      const termItem = activeGlossary.find(g => slugify(g.term) === slugify(termKey));
      if (termItem) {
        tooltip.innerHTML = `
          <div class="tooltip-term-title">
            <span>${escapeHtml(termItem.term)}</span>
            <span class="tooltip-trans-tag">${escapeHtml(termItem.short)}</span>
          </div>
          <div class="tooltip-def-text">
            ${escapeHtml(termItem.definition)}
          </div>
          
          ${termItem.tooltip_context ? `
            <div class="tooltip-project-box">
              <strong style="color:var(--accent-orange); display:block; margin-bottom:2px;">\u26A1 Aplicaci\u00F3n en el Proyecto:</strong>
              ${escapeHtml(termItem.tooltip_context)}
            </div>
          ` : ''}

          ${termItem.practical_analogy ? `
            <div class="tooltip-analogy-box">
              <strong style="color:var(--accent-emerald); display:block; margin-bottom:2px;">\uD83D\uDCA1 Analog\u00EDa cotidiana:</strong>
              ${escapeHtml(termItem.practical_analogy)}
            </div>
          ` : ''}

          <div class="tooltip-footer-hint">
            <span>\uD83D\uDDB1\uFE0F</span> Haz clic para abrir la ficha completa en el Glosario
          </div>
        `;
        tooltip.classList.add('visible');
        const rect = termEl.getBoundingClientRect();
        
        let topPos = rect.bottom + 8;
        let leftPos = rect.left;

        // Keep inside viewport bounds
        if (leftPos + 360 > window.innerWidth) {
          leftPos = window.innerWidth - 370;
        }
        if (topPos + 220 > window.innerHeight) {
          topPos = rect.top - 180;
        }

        tooltip.style.top = `${topPos}px`;
        tooltip.style.left = `${Math.max(10, leftPos)}px`;
      }
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.term-ref')) {
      tooltip.classList.remove('visible');
    }
  });

  document.addEventListener('click', (e) => {
    const termEl = e.target.closest('.term-ref');
    if (termEl) {
      const termKey = termEl.dataset.term;
      toggleGlossary(true, termKey);
    }
  });
}

/**
 * Convert technical terms in text into clickable, tooltip-enabled elements
 */
function linkifyTerms(text) {
  const activeGlossary = getActiveData().glossary;
  if (!text || !activeGlossary) return text || '';
  let out = text;
  
  // Sort glossary terms by length descending to match multi-word terms first
  const terms = [...activeGlossary].sort((a, b) => b.term.length - a.term.length);

  terms.forEach(item => {
    // Avoid double-wrapping already wrapped elements
    const escaped = item.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?<!data-term=["'][^"']*|class=["'][^"']*)\\b(${escaped})\\b`, 'gi');
    out = out.replace(regex, (match) => {
      return `<span class="term-ref" data-term="${escapeHtml(item.term)}">${match}</span>`;
    });
  });

  return out;
}


/**
 * Toast Notifications
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'alert') {
    toast.style.borderColor = '#ef4444';
    toast.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.4)';
  }

  toast.innerHTML = `
    <span style="font-size:16px;">${type === 'alert' ? '\uD83D\uDEA8' : '\u2139\uFE0F'}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Helpers
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Embedded Fallback Data (Backblaze Storage Center Data)
 */
function getEmbeddedFallbackData() {
  return {
    "meta": {
      "title": "Mantenimiento Predictivo de Unidades de Disco Duro",
      "subtitle": "Caso de Estudio: Telemetr\u00EDa S.M.A.R.T. y Aprendizaje Autom\u00E1tico en Centros de Datos de Backblaze",
      "version": "3.1.0",
      "author": "Equipo de Ciencia de Datos & Arquitectura de Almacenamiento",
      "theme": "dark-glassmorphism",
      "lastUpdated": "Octubre 2026"
    },
    "sections": []
  };
}
