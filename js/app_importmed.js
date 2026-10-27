/**
 * IMPORTMED S.A. - Presentation Dynamic Renderers
 * Universidad Nacional de Ingenieria (UNI) - Managua, Nicaragua
 * Dedicated interactive modules and component renderers
 */

// Helper to escape HTML strings safely
function escapeHtmlSafe(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * ===================================================================
 * MODULO 1: Portada y Contexto Industrial de IMPORTMED S.A.
 * ===================================================================
 */
window.renderImportmedSection1 = function(sec) {
  const meta = window.importmedPresentationData.meta;
  const sim = sec.interactiveSimulator;
  
  return `
    <!-- Institutional Academic Header -->
    <div class="glass-card" style="margin-bottom:24px; border-left:4px solid var(--accent-emerald); background:rgba(16,185,129,0.06);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="font-size:11px; font-family:var(--font-mono); color:var(--accent-emerald); font-weight:700; letter-spacing:1px; text-transform:uppercase;">
            ${escapeHtmlSafe(meta.institution)} \u2022 ${escapeHtmlSafe(meta.department)}
          </div>
          <h3 style="font-size:18px; color:#fff; margin-top:4px; font-weight:800;">
            ${escapeHtmlSafe(meta.title)}
          </h3>
          <div style="font-size:13px; color:var(--text-muted); margin-top:4px;">
            ${escapeHtmlSafe(meta.subtitle)}
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px; color:var(--text-dim); font-family:var(--font-mono);">DOCENTE ASESOR</div>
          <div style="font-size:13px; color:#fff; font-weight:700;">${escapeHtmlSafe(meta.advisor)}</div>
          <div style="font-size:11px; color:var(--accent-cyan); margin-top:2px;">${escapeHtmlSafe(meta.location)} \u2022 ${escapeHtmlSafe(meta.date)}</div>
        </div>
      </div>
      
      <div style="margin-top:14px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.08); display:flex; gap:16px; flex-wrap:wrap; font-size:12px;">
        <span style="color:var(--text-dim);">Autores:</span>
        ${meta.authors.map(a => `
          <span style="color:var(--text-main); font-weight:600;">
            ${escapeHtmlSafe(a.name)} <code style="color:var(--accent-cyan); font-size:11px;">(${escapeHtmlSafe(a.id)})</code>
          </span>
        `).join('')}
      </div>
    </div>

    <!-- Top KPI Strip -->
    <div class="kpi-grid" style="margin-bottom:28px;">
      ${sec.kpis.map(k => `
        <div class="kpi-card" style="border-top:3px solid var(--accent-emerald);">
          <div class="kpi-label">${escapeHtmlSafe(k.label)}</div>
          <div class="kpi-value" style="color:var(--accent-emerald);">${escapeHtmlSafe(k.value)} <span class="kpi-unit">${escapeHtmlSafe(k.unit)}</span></div>
          <div class="kpi-desc">${escapeHtmlSafe(k.desc)}</div>
        </div>
      `).join('')}
    </div>

    <!-- Table: 3 Maintenance Strategies -->
    <div class="glass-card" style="margin-bottom:28px;">
      <h3 style="font-size:16px; color:#fff; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-cyan); font-size:18px;">\u2699\uFE0F</span> Comparativa de los 3 Paradigmas de Mantenimiento en Electromedicina
      </h3>
      <div class="strategies-grid">
        ${sec.strategies.map(st => `
          <div class="strategy-card" style="border-top:3px solid ${st.color};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
              <h4 style="font-size:14px; font-weight:700; color:#fff;">${escapeHtmlSafe(st.name)}</h4>
              <span class="badge-tag" style="background:${st.color}22; border-color:${st.color}; color:${st.color}; font-size:10px;">${escapeHtmlSafe(st.tag)}</span>
            </div>
            <p style="font-size:12.5px; color:var(--text-muted); margin-bottom:12px;">${escapeHtmlSafe(st.principle)}</p>
            <div style="font-size:11.5px; margin-bottom:6px;"><strong style="color:#ef4444;">\u274C Desventaja:</strong> <span style="color:var(--text-dim);">${escapeHtmlSafe(st.cons)}</span></div>
            <div style="font-size:11.5px; margin-bottom:8px;"><strong style="color:#10b981;">\u2705 Beneficio:</strong> <span style="color:var(--text-dim);">${escapeHtmlSafe(st.pros)}</span></div>
            <div style="background:rgba(0,0,0,0.3); padding:8px 10px; border-radius:6px; font-size:11.5px; margin-top:8px;">
              <div><strong>Impacto Financiero:</strong> <span style="color:var(--text-main); font-weight:600;">${escapeHtmlSafe(st.costImpact)}</span></div>
              <div style="margin-top:2px;"><strong>Disponibilidad Asistencial:</strong> <span style="color:${st.color}; font-weight:600;">${escapeHtmlSafe(st.availability)}</span></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Interactive Clinical Simulator -->
    <div class="glass-card" style="border:1px solid rgba(16,185,129,0.3);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
        <h3 style="font-size:16px; color:#fff; display:flex; align-items:center; gap:8px;">
          <span>\uD83C\uDFE5</span> ${escapeHtmlSafe(sim.title)}
        </h3>
        <span class="badge-tag" style="background:rgba(16,185,129,0.15); border-color:#10b981; color:#34d399;">SIMULADOR CL\u00CDNICO EN TIEMPO REAL</span>
      </div>

      <div class="brigade-container">
        <!-- Reactive Card -->
        <div class="clinical-card" style="border-left:4px solid #ef4444; background:rgba(239,68,68,0.06);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-weight:700; color:#ef4444; font-size:13px;">${escapeHtmlSafe(sim.reactive.label)}</span>
            <span class="badge-tag" style="background:#ef444422; border-color:#ef4444; color:#fca5a5; font-size:10px;">${escapeHtmlSafe(sim.reactive.riskStatus)}</span>
          </div>
          <p style="font-size:13px; color:#fff; font-weight:600; margin-bottom:6px;">${escapeHtmlSafe(sim.reactive.scenario)}</p>
          <p style="font-size:12.5px; color:var(--text-muted); margin-bottom:14px;">${escapeHtmlSafe(sim.reactive.consequence)}</p>
          <div style="background:rgba(0,0,0,0.4); padding:10px 12px; border-radius:8px; font-size:12px; display:flex; flex-direction:column; gap:4px;">
            <div>\u23F1\uFE0F <strong>Tiempo de Parada:</strong> <span style="color:#ef4444; font-weight:700;">${escapeHtmlSafe(sim.reactive.downtime)}</span></div>
            <div>\uD83D\uDCB8 <strong>Costo del Desastre:</strong> <span style="color:#ef4444; font-weight:700;">${escapeHtmlSafe(sim.reactive.repairCost)}</span></div>
          </div>
        </div>

        <!-- Predictive Card -->
        <div class="clinical-card" style="border-left:4px solid #10b981; background:rgba(16,185,129,0.06);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-weight:700; color:#10b981; font-size:13px;">${escapeHtmlSafe(sim.predictive.label)}</span>
            <span class="badge-tag" style="background:#10b98122; border-color:#10b981; color:#a7f3d0; font-size:10px;">${escapeHtmlSafe(sim.predictive.riskStatus)}</span>
          </div>
          <p style="font-size:13px; color:#fff; font-weight:600; margin-bottom:6px;">${escapeHtmlSafe(sim.predictive.scenario)}</p>
          <p style="font-size:12.5px; color:var(--text-muted); margin-bottom:14px;">${escapeHtmlSafe(sim.predictive.consequence)}</p>
          <div style="background:rgba(0,0,0,0.4); padding:10px 12px; border-radius:8px; font-size:12px; display:flex; flex-direction:column; gap:4px;">
            <div>\u2705 <strong>Tiempo de Parada:</strong> <span style="color:#10b981; font-weight:700;">${escapeHtmlSafe(sim.predictive.downtime)}</span></div>
            <div>\uD83D\uDCB5 <strong>Inversi\u00F3n Preventiva:</strong> <span style="color:#10b981; font-weight:700;">${escapeHtmlSafe(sim.predictive.repairCost)}</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 2: Marco Metodológico (Gartner + 6 Fases Alfaro Arriola)
 * ===================================================================
 */
window.renderImportmedSection2 = function(sec) {
  return `
    <!-- Gartner 4 Levels of Analytics -->
    <div class="glass-card" style="margin-bottom:28px;">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-cyan); font-size:18px;">\uD83D\uDCCA</span> Los 4 Niveles de Madurez Anal\u00EDtica Aplicados al Parque Biom\u00E9dico
      </h3>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:18px;">
        Transici\u00F3n integral desde el reporte pasivo de p\u00E9rdidas hasta la prescripci\u00F3n autom\u00E1tica de \u00F3rdenes de trabajo para ingenieros biom\u00E9dicos.
      </p>

      <div class="clinical-grid">
        ${sec.maturityLevels.map(ml => `
          <div class="clinical-card" style="border-top:3px solid ${ml.color};">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-weight:800; font-size:14px; color:${ml.color};">${escapeHtmlSafe(ml.level)}</span>
              <span class="badge-tag" style="background:${ml.color}15; border-color:${ml.color}; color:${ml.color}; font-size:10px;">${escapeHtmlSafe(ml.question)}</span>
            </div>
            <p style="font-size:12.5px; color:var(--text-main); margin-bottom:12px; line-height:1.5;">${escapeHtmlSafe(ml.desc)}</p>
            <div style="background:rgba(0,0,0,0.3); padding:8px 10px; border-radius:6px; font-size:11.5px; color:var(--text-dim); font-family:var(--font-mono);">
              <strong style="color:var(--text-muted);">Herramientas:</strong> ${escapeHtmlSafe(ml.tools)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 6 Phases of Data Analytics Lifecycle -->
    <div class="glass-card">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-emerald); font-size:18px;">\uD83D\uDD04</span> El Ciclo de Vida de Data Analytics en 6 Fases (Prof. Roberto Alfaro Arriola)
      </h3>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:18px;">
        Proceso iterativo de ingenier\u00EDa de datos y modelado predictivo recorrido para el parque hospitalario de IMPORTMED S.A.
      </p>

      <div style="display:flex; flex-direction:column; gap:12px;">
        ${sec.lifecyclePhases.map(ph => `
          <div style="display:flex; gap:16px; align-items:flex-start; background:rgba(15,23,42,0.6); padding:14px 18px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); transition:all 0.25s;">
            <div style="width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan)); display:flex; align-items:center; justify-content:center; font-weight:800; color:#04070d; font-size:14px; flex-shrink:0;">
              0${ph.step}
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <h4 style="font-size:14px; color:#fff; font-weight:700;">Fase ${ph.step}: ${escapeHtmlSafe(ph.name)}</h4>
                <span class="badge-tag" style="background:rgba(6,182,212,0.15); border-color:var(--accent-cyan); color:var(--accent-cyan); font-size:10.5px;">
                  Entregable: ${escapeHtmlSafe(ph.deliverable)}
                </span>
              </div>
              <p style="font-size:12.5px; color:var(--text-muted); margin-top:6px; line-height:1.5;">${escapeHtmlSafe(ph.activities)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 3: FASE 1 (DOCS) - Ingeniería y Poblado de Datos Clínicos
 * ===================================================================
 */
window.renderImportmedSection3 = function(sec) {
  return `
    <!-- Top Summary Banner -->
    <div class="glass-card" style="margin-bottom:24px; border-left:4px solid var(--accent-cyan);">
      <h3 style="font-size:16px; color:#fff; margin-bottom:8px;">
        \uD83D\uDCE6 Transformaci\u00F3n Transaccional Masiva: M\u00E1s de 9,400 Registros en SQLite
      </h3>
      <p style="font-size:13px; color:var(--text-muted); line-height:1.5;">
        De una base con apenas 2 activos iniciales en Django, se program\u00F3 el script generativo determinista 
        <code style="color:var(--accent-cyan);">poblar_datos_importmed.py</code> con semilla <code style="color:var(--accent-cyan);">random.seed(42)</code>,
        creando una historia operativa de 3.5 a\u00F1os respaldada en <code style="color:var(--accent-emerald);">db.sqlite3.bak</code>.
      </p>
    </div>

    <!-- Data Volume Grid -->
    <div class="kpi-grid" style="margin-bottom:28px;">
      ${sec.dataEntities.map(de => `
        <div class="kpi-card">
          <div class="kpi-label"><code style="color:var(--accent-cyan); font-size:11px;">tabla: ${escapeHtmlSafe(de.table)}</code></div>
          <div class="kpi-value" style="font-size:24px; color:#fff;">${escapeHtmlSafe(de.count.toString())}</div>
          <div class="kpi-desc">${escapeHtmlSafe(de.role)}</div>
        </div>
      `).join('')}
    </div>

    <!-- 3 Physical Laws of Deterioration -->
    <div class="glass-card">
      <h3 style="font-size:16px; color:#fff; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-orange); font-size:18px;">\u26A1</span> Modelado F\u00EDsico de la Degradaci\u00F3n (Inyecci\u00F3n de Se\u00F1al Predictiva)
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:18px;">
        ${sec.physicalLaws.map(pl => `
          <div class="clinical-card" style="border-top:3px solid var(--accent-orange);">
            <h4 style="font-size:14px; font-weight:700; color:var(--accent-orange); margin-bottom:8px;">
              ${escapeHtmlSafe(pl.name)}
            </h4>
            <p style="font-size:12.5px; color:var(--text-muted); line-height:1.55;">
              ${escapeHtmlSafe(pl.desc)}
            </p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 4: FASE 2 (DOCS) - Feature Engineering y Feature Store
 * ===================================================================
 */
window.renderImportmedSection4 = function(sec) {
  return `
    <!-- Top Statistics Strip -->
    <div class="kpi-grid" style="margin-bottom:28px;">
      ${sec.featureStoreStats.map(st => `
        <div class="kpi-card" style="border-top:3px solid var(--accent-cyan);">
          <div class="kpi-label">${escapeHtmlSafe(st.label)}</div>
          <div class="kpi-value" style="color:var(--accent-cyan);">${escapeHtmlSafe(st.value)} <span class="kpi-unit">${escapeHtmlSafe(st.unit)}</span></div>
          <div class="kpi-desc">${escapeHtmlSafe(st.desc)}</div>
        </div>
      `).join('')}
    </div>

    <!-- Anti-Leakage Diagram -->
    <div class="glass-card" style="margin-bottom:28px;">
      <h3 style="font-size:16px; color:#fff; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-emerald); font-size:18px;">\uD83E\uDDF0</span> Metodolog\u00EDa de Ventanas M\u00F3viles con Causalidad Estricta (Anti-Leakage)
      </h3>
      <div style="background:#090e1a; padding:18px; border-radius:var(--radius-md); font-family:var(--font-mono); font-size:12px; line-height:1.6; border:1px solid rgba(255,255,255,0.08); overflow-x:auto;">
<span style="color:#64748b;">// ESQUEMA DE OBSERVACI\u00D3N LONGITUDINAL CADA 30 D\u00CDAS (2023 - 2026)</span>
[==== RETROSPECCI\u00D3N HIST\u00D3RICA (Pasado: Eventos &lt; t) ====] <span style="color:var(--accent-cyan);">| CORTE (t) |</span> [== PROSPECCI\u00D3N OBJETIVO (Futuro: [t, t+30d]) ==]
* Aver\u00EDas correctivas acumuladas previas              <span style="color:var(--accent-cyan);">|           |</span> --&gt; <strong style="color:var(--accent-emerald);">\u00BFOcurre aver\u00EDa en pr\u00F3ximos 30 d\u00EDas?</strong>
* Ventanas m\u00F3viles \u00FAltimos 90 y 30 d\u00EDas                  <span style="color:var(--accent-cyan);">|           |</span>     <span style="color:#ef4444;">1 = Fallo</span> / <span style="color:#10b981;">0 = Operaci\u00F3n Normal</span>
* D\u00EDas desde \u00FAltimo preventivo y tasa de omisiones     <span style="color:var(--accent-cyan);">|           |</span>
* Costos de repuestos y complejidad MTTR             <span style="color:var(--accent-cyan);">|           |</span>
      </div>
    </div>

    <!-- 5 Variable Blocks -->
    <div class="glass-card">
      <h3 style="font-size:16px; color:#fff; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-cyan); font-size:18px;">\uD83D\uDCDA</span> Diccionario del Feature Store (30 Variables en 5 Bloques Tem\u00E1ticos)
      </h3>
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${sec.variableBlocks.map(vb => `
          <div style="background:rgba(15,23,42,0.6); padding:14px 18px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
              <h4 style="font-size:13.5px; color:#fff; font-weight:700;">${escapeHtmlSafe(vb.name)}</h4>
              <span style="font-size:11.5px; color:var(--accent-cyan); font-family:var(--font-mono);">${escapeHtmlSafe(vb.importance)}</span>
            </div>
            <div style="margin-top:6px; font-family:var(--font-mono); font-size:12px; color:var(--text-muted); background:rgba(0,0,0,0.3); padding:6px 10px; border-radius:4px;">
              ${escapeHtmlSafe(vb.vars)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 5: FASE 3 (DOCS) - Formulación Matemática de XGBoost
 * ===================================================================
 */
window.renderImportmedSection5 = function(sec) {
  return `
    <div class="glass-card" style="margin-bottom:24px; border-left:4px solid var(--accent-emerald);">
      <h3 style="font-size:16px; color:#fff; margin-bottom:8px;">
        🧠 ¿Cómo Aprende el Algoritmo Campeón XGBoost en Electromedicina?
      </h3>
      <p style="font-size:13px; color:var(--text-muted); line-height:1.5;">
        A diferencia de modelos heurísticos o lineales, XGBoost optimiza iterativamente ensambles de árboles mediante expansiones de Taylor de segundo orden y regularización estructural para datos biomédicos ruidosos.
      </p>
    </div>

    <div style="display:flex; flex-direction:column; gap:20px;">
      ${sec.mathFoundations.map(mf => `
        <div class="glass-card" style="border:1px solid rgba(6,182,212,0.25);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h4 style="font-size:15px; color:#fff; font-weight:700;">${escapeHtmlSafe(mf.title)}</h4>
            <span class="badge-tag" style="background:rgba(6,182,212,0.15); border-color:var(--accent-cyan); color:var(--accent-cyan); font-size:11px;">FORMULACIÓN RIGUROSA</span>
          </div>
          
          <div class="formula-math-render math-card-highlight">
            ${window.renderMath ? window.renderMath(mf.latex, true) : `<code class="math-fallback">${escapeHtmlSafe(mf.latex)}</code>`}
          </div>

          <p style="font-size:13.5px; color:#cbd5e1; line-height:1.65; margin-top:10px;">
            ${window.renderMathInText ? window.renderMathInText(mf.explanation) : escapeHtmlSafe(mf.explanation)}
          </p>
        </div>
      `).join('')}
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 6: FASE 3 (DOCS) - Torneo de Algoritmos y Gráficas ROC/PR
 * ===================================================================
 */
window.renderImportmedSection6 = function(sec) {
  const cal = sec.thresholdCalibration;
  
  return `
    <!-- Tournament Table -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
        <h3 style="font-size:16px; color:#fff; display:flex; align-items:center; gap:8px;">
          <span style="color:var(--accent-emerald); font-size:18px;">\uD83C\uDFC6</span> Evaluaci\u00F3n Comparativa sobre Test Ciego (3,435 Filas \u2022 196 Fallos Reales)
        </h3>
        <span class="badge-tag" style="background:rgba(16,185,129,0.15); border-color:#10b981; color:#34d399;">XGBoost F2 = ${escapeHtmlSafe(cal.f2Max)}</span>
      </div>

      <div style="overflow-x:auto;">
        <table class="tournament-table" style="width:100%; border-collapse:collapse; font-size:12.5px;">
          <thead>
            <tr style="border-bottom:1px solid var(--border-subtle); background:rgba(13,20,36,0.8); text-align:left;">
              <th style="padding:10px 12px; color:var(--accent-cyan);">Modelo Evaluado</th>
              <th style="padding:10px 12px; color:var(--accent-emerald);">Recall (Sensibilidad)</th>
              <th style="padding:10px 12px; color:var(--text-muted);">Precisi\u00F3n</th>
              <th style="padding:10px 12px; color:#c084fc;">F2-Score</th>
              <th style="padding:10px 12px; color:var(--accent-orange);">ROC-AUC / PR-AUC</th>
              <th style="padding:10px 12px; color:#fff;">Fallos Detectados</th>
            </tr>
          </thead>
          <tbody>
            ${sec.tournamentTable.map((t, i) => `
              <tr style="border-bottom:1px solid rgba(255,255,255,0.05); background:${i === 3 ? 'rgba(16,185,129,0.1)' : 'transparent'};">
                <td style="padding:12px; font-weight:700; color:#fff;">
                  ${escapeHtmlSafe(t.model)}
                  <div style="font-size:11px; color:var(--text-dim); font-weight:400;">${escapeHtmlSafe(t.paradigm)}</div>
                </td>
                <td style="padding:12px; color:var(--accent-emerald); font-weight:700; font-size:13.5px;">${escapeHtmlSafe(t.recall)}</td>
                <td style="padding:12px; color:var(--text-muted);">${escapeHtmlSafe(t.precision)}</td>
                <td style="padding:12px; color:#c084fc; font-weight:700;">${escapeHtmlSafe(t.f2)}</td>
                <td style="padding:12px; font-family:var(--font-mono); color:var(--accent-orange); font-size:11.5px;">
                  ROC: ${escapeHtmlSafe(t.rocAuc)} | PR: ${escapeHtmlSafe(t.prAuc)}
                </td>
                <td style="padding:12px;">
                  <span class="badge-tag" style="background:${i === 3 ? '#10b98133' : '#ef444422'}; border-color:${i === 3 ? '#10b981' : '#ef4444'}; color:#fff; font-size:11px;">
                    ${escapeHtmlSafe(t.detected)}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="background:rgba(6,182,212,0.08); border-left:3px solid var(--accent-cyan); padding:10px 14px; border-radius:4px; margin-top:14px; font-size:12px; color:#bae6fd;">
        <strong>Conclusión Técnica:</strong> ${window.renderMathInText ? window.renderMathInText("La regla heurística tradicional de taller de 180 días dejó escapar 171 fallos reales (87.24% de roturas imprevistas). XGBoost cuadriplica la captura alcanzando 103 fallos detectados con umbral calibrado $\\tau = 0.22$ y métrica $F_2$ ($\\beta = 2$).") : "La regla heurística tradicional de taller de 180 días dejó escapar 171 fallos reales (87.24% de roturas imprevistas). XGBoost cuadriplica la captura alcanzando 103 fallos detectados con umbral calibrado τ = 0.22 y métrica F2 (β = 2)."}
      </div>
    </div>

    <!-- Graphics Gallery (ROC, PR, Confusion, Trade-Off) with Lightbox Zoom -->
    <div class="glass-card">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-cyan); font-size:18px;">\uD83D\uDD2C</span> Galer\u00EDa de Evidencia Anal\u00EDtica: Gr\u00E1ficas de Rendimiento (Clic para Ampliar)
      </h3>

      <div class="graphics-showcase-grid">
        ${sec.graphicsGallery.map(g => `
          <div class="graphic-card" data-theme="emerald">
            <div class="graphic-thumb-wrapper" onclick="openLightbox('${g.src}', '${escapeHtmlSafe(g.title)}', '${escapeHtmlSafe(g.desc)}', 'MACHINE LEARNING FASE 3')">
              <img src="${g.src}" alt="${escapeHtmlSafe(g.title)}">
              <div class="zoom-overlay">
                <span class="zoom-btn-badge">\uD83D\uDD0D Ampliar Gr\u00E1fica</span>
              </div>
            </div>
            <div class="graphic-content">
              <h4>${escapeHtmlSafe(g.title)}</h4>
              <p>${escapeHtmlSafe(g.desc)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 7: FASE 3 (DOCS) - Interpretabilidad SHAP Causal
 * ===================================================================
 */
window.renderImportmedSection7 = function(sec) {
  return `
    <!-- Top Discovery Banner -->
    <div class="glass-card" style="margin-bottom:24px; border-left:4px solid #ef4444; background:rgba(239,68,68,0.06);">
      <h3 style="font-size:16px; color:#ef4444; margin-bottom:6px; display:flex; align-items:center; gap:8px;">
        \uD83D\uDCA5 El Gran Descubrimiento Cient\u00EDfico: Quiebre Catastr\u00F3fico entre D\u00EDas 70 y 125
      </h3>
      <p style="font-size:13px; color:var(--text-main); line-height:1.55;">
        Los fabricantes biom\u00E9dicos estipulan en sus manuales rutinas preventivas semestrales (cada 180 d\u00EDas).
        El an\u00E1lisis de dependencia parcial SHAP demostr\u00F3 que el estr\u00E9s cl\u00EDnico hospitalario en Nicaragua no resiste 180 d\u00EDas:
        <strong>el punto de colapso ocurre bruscamente entre los d\u00EDas 70 y 125</strong>, dejando a las salas de emergencia desprotegidas durante 2 meses completos.
      </p>
    </div>

    <!-- SHAP Importance Ranking -->
    <div class="glass-card" style="margin-bottom:28px;">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-cyan); font-size:18px;">\uD83C\uDFC5</span> Ranking Global de Importancia de Variables (|SHAP Value| Promedio)
      </h3>

      <div style="display:flex; flex-direction:column; gap:10px;">
        ${sec.shapImportanceRanking.map(r => `
          <div style="background:rgba(15,23,42,0.6); padding:12px 16px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:var(--accent-cyan); width:28px;">#0${r.rank}</span>
              <div>
                <div style="font-family:var(--font-mono); font-size:13px; font-weight:700; color:#fff;">${escapeHtmlSafe(r.feature)}</div>
                <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">${escapeHtmlSafe(r.desc)}</div>
              </div>
            </div>
            <div class="badge-tag" style="background:rgba(16,185,129,0.15); border-color:#10b981; color:#34d399; font-size:12px;">
              Impacto: ${escapeHtmlSafe(r.impact)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- SHAP Visual Showcase Grid -->
    <div class="glass-card">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-emerald); font-size:18px;">\uD83D\uDD2C</span> Evidencia Visual SHAP (Barras, Dependencia y Beeswarm Summary)
      </h3>

      <div class="graphics-showcase-grid">
        ${sec.graphicsGallery.map(g => `
          <div class="graphic-card" data-theme="emerald">
            <div class="graphic-thumb-wrapper" onclick="openLightbox('${g.src}', '${escapeHtmlSafe(g.title)}', '${escapeHtmlSafe(g.desc)}', 'INTERPRETABILIDAD SHAP')">
              <img src="${g.src}" alt="${escapeHtmlSafe(g.title)}">
              <div class="zoom-overlay">
                <span class="zoom-btn-badge">\uD83D\uDD0D Ampliar Gr\u00E1fica</span>
              </div>
            </div>
            <div class="graphic-content">
              <h4>${escapeHtmlSafe(g.title)}</h4>
              <p>${escapeHtmlSafe(g.desc)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 8: FASE 3 (DOCS) - Explicabilidad Local SHAP Casos Clínicos
 * ===================================================================
 */
window.renderImportmedSection8 = function(sec) {
  return `
    <!-- Clinical Cases Comparison -->
    <div class="brigade-container" style="margin-bottom:28px;">
      ${sec.clinicalCases.map(c => `
        <div class="brigade-card" style="border-top:4px solid ${c.id === 'caso-rojo' ? '#ef4444' : '#10b981'};">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span class="badge-tag" style="background:${c.id === 'caso-rojo' ? '#ef444422' : '#10b98122'}; border-color:${c.id === 'caso-rojo' ? '#ef4444' : '#10b981'}; color:#fff; font-size:11px;">
              ${escapeHtmlSafe(c.status)}
            </span>
            <span style="font-family:var(--font-mono); font-size:16px; font-weight:800; color:${c.id === 'caso-rojo' ? '#ef4444' : '#10b981'};">
              P = ${escapeHtmlSafe(c.prob)}
            </span>
          </div>

          <h4 style="font-size:14.5px; color:#fff; font-weight:700; margin-bottom:4px;">${escapeHtmlSafe(c.equipment)}</h4>
          <div style="font-size:12px; color:var(--accent-cyan); margin-bottom:14px;">\uD83C\uDFE5 ${escapeHtmlSafe(c.hospital)}</div>

          <!-- Forces List -->
          <div style="font-size:11.5px; font-weight:700; color:#fff; margin-bottom:6px;">Factores que Empujan al Fallo (+):</div>
          <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">
            ${c.positiveForces.map(f => `
              <div style="background:rgba(239,68,68,0.1); border-left:3px solid #ef4444; padding:6px 10px; border-radius:4px; font-size:11.5px;">
                <div style="display:flex; justify-content:space-between;">
                  <strong style="color:#fca5a5;">${escapeHtmlSafe(f.var)}</strong>
                  <span style="color:#ef4444; font-weight:700; font-family:var(--font-mono);">${escapeHtmlSafe(f.push)}</span>
                </div>
                <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">${escapeHtmlSafe(f.note)}</div>
              </div>
            `).join('')}
          </div>

          <div style="font-size:11.5px; font-weight:700; color:#fff; margin-bottom:6px;">Factores Protectores (-):</div>
          <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:14px;">
            ${c.negativeForces.map(f => `
              <div style="background:rgba(16,185,129,0.1); border-left:3px solid #10b981; padding:6px 10px; border-radius:4px; font-size:11.5px;">
                <div style="display:flex; justify-content:space-between;">
                  <strong style="color:#a7f3d0;">${escapeHtmlSafe(f.var)}</strong>
                  <span style="color:#10b981; font-weight:700; font-family:var(--font-mono);">${escapeHtmlSafe(f.push)}</span>
                </div>
                <div style="font-size:11px; color:var(--text-dim); margin-top:2px;">${escapeHtmlSafe(f.note)}</div>
              </div>
            `).join('')}
          </div>

          <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:6px; font-size:12px; border-top:1px solid rgba(255,255,255,0.06);">
            <strong style="color:var(--accent-cyan);">Acci\u00F3n Mandatoria:</strong> ${escapeHtmlSafe(c.action)}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Waterfall Graphic Showcase -->
    <div class="glass-card">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-cyan); font-size:18px;">\uD83D\uDD2C</span> Descomposici\u00F3n Local Gr\u00E1fica de Fuerzas SHAP (Waterfall Plot)
      </h3>

      <div class="graphics-showcase-grid" style="grid-template-columns:1fr;">
        ${sec.graphicsGallery.map(g => `
          <div class="graphic-card" data-theme="emerald">
            <div class="graphic-thumb-wrapper" style="height:320px;" onclick="openLightbox('${g.src}', '${escapeHtmlSafe(g.title)}', '${escapeHtmlSafe(g.desc)}', 'SHAP WATERFALL')">
              <img src="${g.src}" alt="${escapeHtmlSafe(g.title)}">
              <div class="zoom-overlay">
                <span class="zoom-btn-badge">\uD83D\uDD0D Ampliar Descomposici\u00F3n Waterfall</span>
              </div>
            </div>
            <div class="graphic-content">
              <h4>${escapeHtmlSafe(g.title)}</h4>
              <p>${escapeHtmlSafe(g.desc)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 9: FASE 4 (DOCS) & POWER BI - Star Schema de 9 Entidades
 * ===================================================================
 */
window.renderImportmedSection9 = function(sec) {
  const dax = sec.daxChallenge;
  
  return `
    <!-- Top Schema Diagram Banner -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <h3 style="font-size:16px; color:#fff; display:flex; align-items:center; gap:8px;">
          <span style="color:var(--accent-cyan); font-size:18px;">\u2B50</span> Diagrama del Modelo Dimensional en Estrella en Power BI Desktop
        </h3>
        <span class="badge-tag" style="background:rgba(6,182,212,0.15); border-color:var(--accent-cyan); color:var(--accent-cyan);">9 ENTIDADES VERTIPAQ</span>
      </div>

      <div class="graphic-thumb-wrapper" style="height:340px; border-radius:var(--radius-md);" onclick="openLightbox('${sec.graphicsGallery[0].src}', '${escapeHtmlSafe(sec.graphicsGallery[0].title)}', '${escapeHtmlSafe(sec.graphicsGallery[0].desc)}', 'STAR SCHEMA POWER BI')">
        <img src="${sec.graphicsGallery[0].src}" alt="Star Schema Power BI">
        <div class="zoom-overlay">
          <span class="zoom-btn-badge">\uD83D\uDD0D Ampliar Modelo en Estrella Completo</span>
        </div>
      </div>
      <p style="font-size:12.5px; color:var(--text-muted); margin-top:12px; line-height:1.5;">
        ${escapeHtmlSafe(sec.graphicsGallery[0].desc)}
      </p>
    </div>

    <!-- 9 Entities Table -->
    <div class="glass-card" style="margin-bottom:28px;">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px;">
        \uD83D\uDCCB Diccionario de las 9 Entidades Relacionales del Esquema en Estrella
      </h3>
      <div style="overflow-x:auto;">
        <table class="kardex-table" style="font-size:12px;">
          <thead>
            <tr>
              <th>Entidad</th>
              <th>Rol en el Esquema</th>
              <th>Llave Primaria (PK)</th>
              <th>Relaciones (1:\u221E)</th>
              <th>Atributos Principales</th>
            </tr>
          </thead>
          <tbody>
            ${sec.entities.map(e => `
              <tr>
                <td style="font-weight:700; color:#fff; font-family:var(--font-mono);">${escapeHtmlSafe(e.name)}</td>
                <td><span class="badge-tag" style="font-size:10.5px;">${escapeHtmlSafe(e.role)}</span></td>
                <td style="font-family:var(--font-mono); color:var(--accent-cyan);">${escapeHtmlSafe(e.pk)}</td>
                <td style="font-size:11.5px; color:var(--text-muted);">${escapeHtmlSafe(e.fk)}</td>
                <td style="font-size:11.5px; color:var(--text-dim);">${escapeHtmlSafe(e.attrs)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- DAX Challenge Box -->
    <div class="glass-card" style="border:1px solid rgba(16,185,129,0.3);">
      <h3 style="font-size:16px; color:#fff; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-emerald);">\u26A1</span> ${escapeHtmlSafe(dax.title)}
      </h3>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:8px;">
        <strong>Problema Detectado:</strong> ${escapeHtmlSafe(dax.problem)}
      </p>
      <p style="font-size:13px; color:#a7f3d0; margin-bottom:12px;">
        <strong>Soluci\u00F3n en DAX:</strong> ${escapeHtmlSafe(dax.solution)}
      </p>
      <div class="dax-code-card">
        <pre>${escapeHtmlSafe(dax.code)}</pre>
      </div>
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 10: FASE 4 (DOCS) & POWER BI - Página 1 Torre de Control
 * ===================================================================
 */
window.renderImportmedSection10 = function(sec) {
  return `
    <!-- Power BI Page 1 Dashboard Showcase -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <h3 style="font-size:16px; color:#fff; display:flex; align-items:center; gap:8px;">
          <span style="color:var(--accent-cyan); font-size:18px;">\uD83D\uDCCA</span> Vista Real del Cuadro de Mando: Torre de Control Ejecutiva (P\u00E1gina 1)
        </h3>
        <span class="badge-tag" style="background:rgba(6,182,212,0.15); border-color:var(--accent-cyan); color:var(--accent-cyan);">POWER BI DESKTOP</span>
      </div>

      <div class="graphic-thumb-wrapper" style="height:380px; border-radius:var(--radius-md);" onclick="openLightbox('${sec.graphicsGallery[0].src}', '${escapeHtmlSafe(sec.graphicsGallery[0].title)}', '${escapeHtmlSafe(sec.graphicsGallery[0].desc)}', 'POWER BI P\u00C1GINA 1')">
        <img src="${sec.graphicsGallery[0].src}" alt="Torre de Control Power BI">
        <div class="zoom-overlay">
          <span class="zoom-btn-badge">\uD83D\uDD0D Ampliar Tablero en Alta Resoluci\u00F3n</span>
        </div>
      </div>
      <p style="font-size:12.5px; color:var(--text-muted); margin-top:12px; line-height:1.5;">
        ${escapeHtmlSafe(sec.graphicsGallery[0].desc)}
      </p>
    </div>

    <!-- Findings Grid -->
    <div class="glass-card">
      <h3 style="font-size:16px; color:#fff; margin-bottom:16px;">
        \uD83D\uDD0E Hallazgos Macroecon\u00F3micos y Territoriales Revelados en la P\u00E1gina 1
      </h3>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:18px;">
        ${sec.findings.map(f => `
          <div class="clinical-card" style="border-top:3px solid var(--accent-cyan);">
            <h4 style="font-size:14px; color:#fff; font-weight:700; margin-bottom:8px;">${escapeHtmlSafe(f.title)}</h4>
            <p style="font-size:12.5px; color:var(--text-muted); line-height:1.55;">${escapeHtmlSafe(f.desc)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 11: FASE 4 (DOCS) & POWER BI - Página 2 Diagnóstico Causal
 * ===================================================================
 */
window.renderImportmedSection11 = function(sec) {
  return `
    <!-- Power BI Page 2 Dashboard Showcase -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <h3 style="font-size:16px; color:#fff; display:flex; align-items:center; gap:8px;">
          <span style="color:var(--accent-emerald); font-size:18px;">\uD83D\uDD2C</span> Vista Real del Cuadro de Mando: Diagn\u00F3stico Causal y MTTR (P\u00E1gina 2)
        </h3>
        <span class="badge-tag" style="background:rgba(16,185,129,0.15); border-color:#10b981; color:#34d399;">POWER BI DESKTOP</span>
      </div>

      <div class="graphic-thumb-wrapper" style="height:380px; border-radius:var(--radius-md);" onclick="openLightbox('${sec.graphicsGallery[0].src}', '${escapeHtmlSafe(sec.graphicsGallery[0].title)}', '${escapeHtmlSafe(sec.graphicsGallery[0].desc)}', 'POWER BI P\u00C1GINA 2')">
        <img src="${sec.graphicsGallery[0].src}" alt="Diagn\u00F3stico Causal Power BI">
        <div class="zoom-overlay">
          <span class="zoom-btn-badge">\uD83D\uDD0D Ampliar Tablero en Alta Resoluci\u00F3n</span>
        </div>
      </div>
      <p style="font-size:12.5px; color:var(--text-muted); margin-top:12px; line-height:1.5;">
        ${escapeHtmlSafe(sec.graphicsGallery[0].desc)}
      </p>
    </div>

    <!-- Critical Low-Cost Components Table -->
    <div class="glass-card" style="margin-bottom:28px;">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
        <span style="color:#ef4444;">\u26A0\uFE0F</span> La Paradoja de los Repuestos Baratos con Paradas Desproporcionadas
      </h3>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:14px;">
        Peque\u00F1os consumibles de menos de $210 USD paralizan servicios hospitalarios enteros por 72 a 96 horas por falta de reemplazo preventivo sistem\u00E1tico:
      </p>

      <div style="overflow-x:auto;">
        <table class="kardex-table" style="font-size:12.5px;">
          <thead>
            <tr>
              <th>Componente Cr\u00EDtico</th>
              <th>Costo Unitario (USD)</th>
              <th>Tiempo de Parada Asociado</th>
              <th>Impacto Asistencial Cl\u00EDnico</th>
            </tr>
          </thead>
          <tbody>
            ${sec.criticalComponents.map(c => `
              <tr>
                <td style="font-weight:700; color:#fff;">${escapeHtmlSafe(c.item)}</td>
                <td style="font-family:var(--font-mono); color:var(--accent-emerald); font-weight:700;">${escapeHtmlSafe(c.cost)}</td>
                <td style="font-family:var(--font-mono); color:#ef4444; font-weight:700;">${escapeHtmlSafe(c.downtime)}</td>
                <td style="color:var(--text-muted);">${escapeHtmlSafe(c.impact)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Causal Insights -->
    <div class="glass-card">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px;">
        \uD83D\uDCA1 Causas Ra\u00EDz y Din\u00E1mica del Deterioro T\u00E9cnico
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:16px;">
        ${sec.causalInsights.map(ci => `
          <div class="clinical-card" style="border-top:3px solid var(--accent-orange);">
            <h4 style="font-size:14px; color:#fff; font-weight:700; margin-bottom:8px;">${escapeHtmlSafe(ci.title)}</h4>
            <p style="font-size:12.5px; color:var(--text-muted); line-height:1.55;">${escapeHtmlSafe(ci.desc)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

/**
 * ===================================================================
 * MODULO 12: FASE 4 (DOCS) & POWER BI - Página 3 Consola Prescriptiva
 * ===================================================================
 */
window.renderImportmedSection12 = function(sec) {
  return `
    <!-- Power BI Page 3 Dashboard Showcase -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <h3 style="font-size:16px; color:#fff; display:flex; align-items:center; gap:8px;">
          <span style="color:var(--accent-cyan); font-size:18px;">\uD83E\uDDD1\u200D\u2695\uFE0F</span> Vista Real del Cuadro de Mando: Consola Prescriptiva y Kardex (P\u00E1gina 3)
        </h3>
        <span class="badge-tag" style="background:rgba(6,182,212,0.15); border-color:var(--accent-cyan); color:var(--accent-cyan);">POWER BI DESKTOP</span>
      </div>

      <div class="graphic-thumb-wrapper" style="height:380px; border-radius:var(--radius-md);" onclick="openLightbox('${sec.graphicsGallery[0].src}', '${escapeHtmlSafe(sec.graphicsGallery[0].title)}', '${escapeHtmlSafe(sec.graphicsGallery[0].desc)}', 'POWER BI P\u00C1GINA 3')">
        <img src="${sec.graphicsGallery[0].src}" alt="Consola Prescriptiva Power BI">
        <div class="zoom-overlay">
          <span class="zoom-btn-badge">\uD83D\uDD0D Ampliar Tablero en Alta Resoluci\u00F3n</span>
        </div>
      </div>
      <p style="font-size:12.5px; color:var(--text-muted); margin-top:12px; line-height:1.5;">
        ${escapeHtmlSafe(sec.graphicsGallery[0].desc)}
      </p>
    </div>

    <!-- Prescriptive Financial KPIs -->
    <div class="kpi-grid" style="margin-bottom:28px;">
      ${sec.prescriptiveKpis.map(k => `
        <div class="kpi-card" style="border-top:3px solid var(--accent-emerald);">
          <div class="kpi-label">${escapeHtmlSafe(k.label)}</div>
          <div class="kpi-value" style="color:var(--accent-emerald); font-size:24px;">${escapeHtmlSafe(k.value)} <span class="kpi-unit">${escapeHtmlSafe(k.unit)}</span></div>
          <div class="kpi-desc">${escapeHtmlSafe(k.desc)}</div>
        </div>
      `).join('')}
    </div>

    <!-- Logistic Brigades Optimizer -->
    <div class="glass-card" style="margin-bottom:28px;">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-cyan); font-size:18px;">\uD83D\uDE91</span> Optimizador Log\u00EDstico: Despliegue en 2 Brigadas T\u00E9cnicas
      </h3>
      <p style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">
        El 63.41% de las 41 urgencias se concentran en s\u00F3lo 4 instituciones clave. La organizaci\u00F3n en 2 brigadas maximiza la atenci\u00F3n en ruta:
      </p>

      <div class="brigade-container">
        ${sec.brigades.map(b => `
          <div class="brigade-card">
            <div class="brigade-header">
              <span class="brigade-title">${escapeHtmlSafe(b.name)}</span>
              <span class="brigade-badge">${escapeHtmlSafe(b.share)}</span>
            </div>
            <div style="font-size:13px; color:#fff; font-weight:700; margin-bottom:6px;">${escapeHtmlSafe(b.teams.toString())} Equipos Cr\u00EDticos a Intervenir</div>
            <p style="font-size:12.5px; color:var(--text-muted); margin-bottom:10px;">\uD83C\uDFE5 <strong>Centros:</strong> ${escapeHtmlSafe(b.hospitals)}</p>
            <div style="background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:6px; font-size:12px; color:var(--accent-cyan);">
              \uD83D\uDDFA\uFE0F <strong>Plan Operativo:</strong> ${escapeHtmlSafe(b.logistics)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Kardex in Lines Warning Table -->
    <div class="glass-card" style="margin-bottom:28px;">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
        <span style="color:#ef4444; font-size:18px;">\uD83D\uDCE6</span> Monitoreo Kardex en L\u00EDneas: 5 SKUs en Zona de Convergencia Cr\u00EDtica
      </h3>

      <div style="overflow-x:auto;">
        <table class="kardex-table" style="font-size:12.5px;">
          <thead>
            <tr>
              <th>C\u00F3digo SKU</th>
              <th>Descripci\u00F3n del Repuesto</th>
              <th>Stock F\u00EDsico Actual</th>
              <th>Umbral M\u00EDnimo</th>
              <th>Margen de Seguridad</th>
              <th>Nivel de Riesgo Kardex</th>
            </tr>
          </thead>
          <tbody>
            ${sec.criticalSkus.map(s => `
              <tr>
                <td style="font-family:var(--font-mono); font-weight:700; color:var(--accent-cyan);">${escapeHtmlSafe(s.sku)}</td>
                <td style="font-weight:600; color:#fff;">${escapeHtmlSafe(s.name)}</td>
                <td style="font-family:var(--font-mono); font-weight:700; text-align:center;">${escapeHtmlSafe(s.stock.toString())}</td>
                <td style="font-family:var(--font-mono); color:var(--text-dim); text-align:center;">${escapeHtmlSafe(s.min.toString())}</td>
                <td style="font-family:var(--font-mono); color:#ef4444; font-weight:700; text-align:center;">+${escapeHtmlSafe(s.margin.toString())} unid.</td>
                <td>
                  <span class="badge-tag" style="background:#ef444422; border-color:#ef4444; color:#fca5a5; font-size:10.5px;">
                    \u26A0\uFE0F REORDEN URGENTE
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Strategic Recommendations & MLOps -->
    <div class="glass-card" style="border:1px solid rgba(16,185,129,0.3); background:rgba(16,185,129,0.04);">
      <h3 style="font-size:16px; color:#fff; margin-bottom:14px; display:flex; align-items:center; gap:8px;">
        <span style="color:var(--accent-emerald);">\uD83D\uDCCB</span> Conclusiones Estrat\u00E9gicas y Hoja de Ruta MLOps hacia Producci\u00F3n
      </h3>

      <div style="display:flex; flex-direction:column; gap:10px;">
        ${sec.strategicRecommendations.map(rec => `
          <div style="background:rgba(15,23,42,0.7); padding:12px 16px; border-radius:var(--radius-md); border-left:3px solid var(--accent-emerald); font-size:13px; color:#fff; line-height:1.5;">
            ${escapeHtmlSafe(rec)}
          </div>
        `).join('')}
      </div>
    </div>
  `;
};
