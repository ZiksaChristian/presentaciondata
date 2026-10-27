// ==============================================================================
// IMPORTMED S.A. - PREDICTIVE MAINTENANCE & CLINICAL BI PRESENTATION DATA
// Universidad Nacional de Ingenieria (UNI) - Managua, Nicaragua
// Autores: Angel Daniel Escobar Baez, Brayan Brandon Mairena Fonseca, Jimmy Antonio Palacios Baez
// Docente: Ing. Roberto Alfaro Arriola
// Octubre 2026
// ==============================================================================

const importmedPresentationData = {
  meta: {
    caseId: "importmed",
    title: "Mantenimiento Predictivo del Parque Biom\u00E9dico de IMPORTMED S.A.",
    subtitle: "Anal\u00EDtica Predictiva, Diagn\u00F3stico Causal SHAP y Optimizaci\u00F3n Prescriptiva en Power BI",
    institution: "Universidad Nacional de Ingenier\u00EDa (UNI)",
    department: "Facultad de Electrotecnia y Computaci\u00F3n - Ingenier\u00EDa en Computaci\u00F3n",
    authors: [
      { name: "\u00C1ngel Daniel Escobar B\u00E1ez", id: "2022-0752I" },
      { name: "Brayan Brandon Mairena Fonseca", id: "2022-0749I" },
      { name: "Jimmy Antonio Palacios B\u00E1ez", id: "2022-0734I" }
    ],
    advisor: "Ing. Roberto Alfaro Arriola",
    location: "Managua, Nicaragua",
    date: "Octubre 2026",
    version: "2.5.0",
    theme: "clinical-emerald-cyan",
    badges: [
      { text: "XGBoost F2 = 0.4735", color: "#10b981", glow: true, title: "M\u00E9trica rectora de confiabilidad cl\u00EDnica (Recall=52.55%)" },
      { text: "229 Equipos \u2022 17 Hospitales", color: "#06b6d4", glow: false, title: "Parque biom\u00E9dico distribuido en Nicaragua" },
      { text: "Protecci\u00F3n 27.54x ($415k Riesgo)", color: "#f59e0b", glow: true, title: "$15,090 USD de preventivo mitigan $415,580 USD de riesgo" }
    ]
  },

  sections: [
    // --------------------------------------------------------------------------
    // MODULO 1: CONTEXTO INDUSTRIAL Y CLINICO
    // --------------------------------------------------------------------------
    {
      id: "importmed-portada",
      index: 1,
      badge: "Contexto Cl\u00EDnico e Industrial",
      title: "Contexto Cl\u00EDnico e Industrial: La Crisis Operativa en Electromedicina",
      tagline: "De la reparaci\u00F3n reactiva que paraliza hospitales a la anticipaci\u00F3n algor\u00EDtmica del fallo biom\u00E9dico.",
      summary: "IMPORTMED S.A. suministra y brinda soporte t\u00E9cnico especializado a 229 activos biom\u00E9dicos cr\u00EDticos (analizadores hematol\u00F3gicos, bioqu\u00EDmicos, autoclaves de esterilizaci\u00F3n y centr\u00EDfugas cl\u00EDnicas) en 17 instituciones hospitalarias de Nicaragua. La operaci\u00F3n hist\u00F3rica ha estado atrapada en un c\u00EDrculo vicioso reactivo: el 92.4% del presupuesto ($214,000 USD de $229,310 USD) se ha consumido en reparaciones correctivas de emergencia provocando 61,635 horas acumuladas de parada de servicios m\u00E9dicos.",
      kpis: [
        { label: "Parque Biom\u00E9dico", value: "229", unit: "activos", desc: "Equipos cl\u00EDnicos monitoreados" },
        { label: "Red Hospitalaria", value: "17", unit: "centros", desc: "Hospitales MINSA, privados y laboratorios" },
        { label: "Tasa de Falla Hist\u00F3rica", value: "57.0", unit: "%", desc: "Las aver\u00EDas superan a los preventivos" },
        { label: "Gasto Correctivo", value: "$214k", unit: "USD", desc: "92.4% del gasto total ($229,310 USD)" },
        { label: "Horas de Parada Acumuladas", value: "61,635", unit: "horas", desc: "Impacto asistencial acumulado en salas cl\u00EDnicas" }
      ],
      strategies: [
        {
          id: "correctiva",
          name: "1. Mantenimiento Correctivo (Run-to-Failure)",
          tag: "Reactivo Tradicional",
          color: "#ef4444",
          icon: "alert-triangle",
          principle: "Intervenir \u00FAnicamente cuando el cliente hospitalario reporta que el analizador o autoclave colaps\u00F3 por completo.",
          pros: "Cero inversi\u00F3n anticipada aparente mientras el equipo est\u00E9 encendido.",
          cons: "Paradas de 72 a 96 horas en laboratorios cl\u00EDnicos, cancelaci\u00F3n de pruebas de sangre de emergencia, costo disparado ($450+ USD por evento) y riesgo vital en pacientes.",
          costImpact: "Cr\u00EDtico: $214,000 USD consumidos (92.4% del presupuesto hist\u00F3rico)",
          availability: "Baja e impredecible (Tasa de falla global del 57%)"
        },
        {
          id: "preventiva",
          name: "2. Mantenimiento Preventivo R\u00EDgido (Calendario a 180 d\u00EDas)",
          tag: "Heur\u00EDstica Est\u00E1tica",
          color: "#f59e0b",
          icon: "calendar",
          principle: "Visitar el hospital r\u00EDgidamente cada 6 meses (180 d\u00EDas) seg\u00FAn recomendaci\u00F3n nominal de f\u00E1brica.",
          pros: "F\u00E1cil de agendar en calendarios administrativos.",
          cons: "Ignora el estr\u00E9s operativo real. Nuestra auditor\u00EDa revel\u00F3 que el colapso electromec\u00E1nico ocurre entre los d\u00EDas 70 y 125, llegando 2 meses tarde al fallo.",
          costImpact: "Ineficiente: No logr\u00F3 frenar el 57% de aver\u00EDas en hospitales con alta carga",
          availability: "Moderada (Valles preventivos desataron olas de aver\u00EDas)"
        },
        {
          id: "predictiva",
          name: "3. Mantenimiento Predictivo & Prescriptivo (XGBoost + Power BI)",
          tag: "Inteligencia Cl\u00EDnica",
          color: "#10b981",
          icon: "activity",
          principle: "Evaluar el desgaste f\u00EDsico multivariado, el hist\u00F3rico de intervenciones y prescribir intervenciones con 30 d\u00EDas de anticipaci\u00F3n.",
          pros: "Detecci\u00F3n del 52.55% de fallos reales a ciegas, factor de protecci\u00F3n de 27.54x ($15k salvan $415k de riesgo) y planificaci\u00F3n log\u00EDstica en 2 brigadas t\u00E9cnicas.",
          cons: "Demanda gobierno de datos, telemetr\u00EDa de \u00F3rdenes y recalibraci\u00F3n continua.",
          costImpact: "\u00D3ptimo: $45 a $90 USD por servicio preventivo oportuno",
          availability: "M\u00E1xima: Continuidad ininterrumpida en diagn\u00F3sticos cr\u00EDticos"
        }
      ],
      interactiveSimulator: {
        title: "Simulador Cl\u00EDnico: Aver\u00EDa en Sala de Emergencias (Reactivo vs Predictivo)",
        reactive: {
          label: "Enfoque Reactivo: Run-to-Failure",
          scenario: "Un Analizador Hematol\u00F3gico Mindray BC-5000 falla s\u00FAbitamente un s\u00E1bado en el Hospital Militar.",
          consequence: "Se suspenden 180 hemogramas de emergencia. El reactivo se derrama por obstrucci\u00F3n en v\u00E1lvula solenoide.",
          downtime: "84 horas de parada t\u00E9cnica (espera de repuesto importado)",
          repairCost: "$580 USD (tarjeta principal da\u00F1ada por cortocircuito de v\u00E1lvula)",
          riskStatus: "CR\u00CDTICO - RIESGO VITAL EN PACIENTES"
        },
        predictive: {
          label: "Enfoque Predictivo con XGBoost",
          scenario: "A los 85 d\u00EDas del \u00FAltimo servicio, el modelo emite Alerta Roja (P = 68.4%) por incremento de micro-obstrucciones.",
          consequence: "La Brigada Metropolitana acude el martes de 8:00 AM a 9:30 AM. Se cambia junta de silicona ($130) y calibraci\u00F3n preventiva.",
          downtime: "0 horas de parada asistencial (servicio coordinado en cambio de turno)",
          repairCost: "$45 USD de mantenimiento programado",
          riskStatus: "EQUIPO BLINDADO - CONTINUIDAD GARANTIZADA"
        }
      }
    },

    // --------------------------------------------------------------------------
    // MODULO 2: MARCO METODOLOGICO (GARTNER + 6 FASES ALFARO ARRIOLA)
    // --------------------------------------------------------------------------
    {
      id: "importmed-metodologia",
      index: 2,
      badge: "Metodolog\u00EDa y Arquitectura",
      title: "Marco Metodol\u00F3gico: 4 Niveles de Madurez Anal\u00EDtica y Ciclo de Vida de 6 Fases",
      tagline: "El rigor metodol\u00F3gico de la Ingenier\u00EDa en Computaci\u00F3n UNI al servicio de la salud p\u00FAblica.",
      summary: "Siguiendo las ense\u00F1anzas del Profesor Roberto Alfaro Arriola en la UNI, este proyecto no es una simple colecci\u00F3n de gr\u00E1ficas, sino la articulaci\u00F3n formal de los 4 Niveles de Madurez de Gartner con las 6 Fases del Ciclo de Vida de Data Analytics.",
      maturityLevels: [
        {
          level: "1. Descriptivo",
          question: "\u00BFQu\u00E9 sucedi\u00F3 en IMPORTMED?",
          desc: "Exploraci\u00F3n cuantitativa del historial biom\u00E9dico: 229 equipos, tasa de falla global del 57.0%, 61,635 horas de parada y asimetr\u00EDa presupuestaria de $214k en correctivo.",
          tools: "SQLite, Pandas, Medidas DAX de recuento e importes en Power BI",
          color: "#3b82f6"
        },
        {
          level: "2. Diagn\u00F3stico",
          question: "\u00BFPor qu\u00E9 sucedieron los fallos?",
          desc: "Apertura de la caja negra con valores SHAP: identificaci\u00F3n del umbral de ruptura entre d\u00EDas 70 y 125, inestabilidad post-reparaci\u00F3n (~220 casos) y fallos cr\u00F3nicos en v\u00E1lvulas y fuentes.",
          tools: "SHAP Beeswarm, Dependencia de caracter\u00EDsticas, An\u00E1lisis de MTTR y dispersi\u00F3n",
          color: "#8b5cf6"
        },
        {
          level: "3. Predictivo",
          question: "\u00BFQu\u00E9 puede suceder en los pr\u00F3ximos 30 d\u00EDas?",
          desc: "Estimaci\u00F3n de probabilidades de aver\u00EDa futura mediante XGBoost calibrado con escala de asimetr\u00EDa 17.04 y umbral \u03C4 = 0.22, detectando 103 roturas reales a ciegas.",
          tools: "XGBoost, Curvas ROC/PR, scale_pos_weight, Evaluaci\u00F3n Out-of-Time",
          color: "#06b6d4"
        },
        {
          level: "4. Prescriptivo",
          question: "\u00BFQu\u00E9 acciones concretas debemos ejecutar?",
          desc: "Generaci\u00F3n automatizada de 41 \u00F3rdenes urgentes, agrupaci\u00F3n en 2 brigadas territoriales, y emisi\u00F3n de alertas rojas de reorden para 5 SKUs en convergencia cr\u00EDtica en Kardex.",
          tools: "Power BI Consola Prescriptiva, Optimizador de Rutas, Matriz de Retorno (27.54x)",
          color: "#10b981"
        }
      ],
      lifecyclePhases: [
        {
          step: 1,
          name: "Descubrimiento",
          activities: "Entrevistas con t\u00E9cnicos de taller, definici\u00F3n del baseline de 6 meses, matriz de asimetr\u00EDa de costos ($45 vs $450) y delimitaci\u00F3n del alcance en 17 centros.",
          deliverable: "Documento de Arquitectura y Matriz de Objetivos de Negocio"
        },
        {
          step: 2,
          name: "Preparaci\u00F3n de Datos",
          activities: "Poblado masivo con coherencia relacional en db.sqlite3 (>9,400 transacciones) y construcci\u00F3n del Feature Store con ventanas m\u00F3viles retrospectivas.",
          deliverable: "Base SQLite auditada y dataset anal\u00EDtico (9,389 snapshots x 30 variables)"
        },
        {
          step: 3,
          name: "Planificaci\u00F3n del Modelo",
          activities: "Definici\u00F3n del horizonte N=30 d\u00EDas, selecci\u00F3n de la m\u00E9trica F2-Score (privilegiando Recall sobre Precisi\u00F3n) y partici\u00F3n temporal Out-of-Time estricta.",
          deliverable: "Estrategia experimental anti-leakage y esquema de validaci\u00F3n ciego"
        },
        {
          step: 4,
          name: "Construcci\u00F3n del Modelo",
          activities: "Entrenamiento de XGBoost con regularizaci\u00F3n L2, penalizaci\u00F3n de desbalance scale_pos_weight=17.04 y calibraci\u00F3n fina del umbral \u03C4=0.22.",
          deliverable: "Modelo binario serializado (modelo_xgboost_preventivo.joblib) y JSON de m\u00E9tricas"
        },
        {
          step: 5,
          name: "Comunicaci\u00F3n de Resultados",
          activities: "Traducci\u00F3n de scores matem\u00E1ticos a lenguaje cl\u00EDnico: gr\u00E1ficas ROC/PR, matrices de confusi\u00F3n, reportes de impacto y an\u00E1lisis de explicabilidad SHAP.",
          deliverable: "8 Gr\u00E1ficas anal\u00EDticas de alta resoluci\u00F3n e informe t\u00E9cnico APA 7"
        },
        {
          step: 6,
          name: "Operacionalizaci\u00F3n & BI",
          activities: "Dise\u00F1o del Star Schema en Power BI (9 entidades), c\u00E1lculo de medidas DAX avanzadas y publicaci\u00F3n de 3 p\u00E1ginas de tableros con consola prescriptiva.",
          deliverable: "Archivo IMPORTMEDBI.pbix y consola prescriptiva en tiempo real"
        }
      ]
    },

    // --------------------------------------------------------------------------
    // MODULO 3: FASE 1 (DOCS) - INGENIERIA Y POBLADO DE DATOS
    // --------------------------------------------------------------------------
    {
      id: "importmed-fase1-poblado",
      index: 3,
      badge: "Fase 1 \u2022 Ingenier\u00EDa de Datos",
      title: "Fase 1: Ingenier\u00EDa y Poblado de Datos Cl\u00EDnicos (>9,400 Registros)",
      tagline: "De 2 equipos dispersos a un ecosistema masivo con leyes electromec\u00E1nicas de degradaci\u00F3n f\u00EDsica.",
      summary: "La base original de Django contaba con s\u00F3lo 2 equipos de prueba. Mediante un proceso determinista de ingenier\u00EDa de datos, se expandi\u00F3 la base a 229 equipos y m\u00E1s de 9,400 registros hist\u00F3ricos interconectados a lo largo de 3.5 a\u00F1os (2023 - 2026), inyectando se\u00F1ales reales de confiabilidad y degradaci\u00F3n.",
      dataEntities: [
        { table: "equipos", count: 229, role: "Activos con n\u00FAmeros seriales \u00FAnicos y fecha de adquisici\u00F3n" },
        { table: "hospital", count: 17, role: "Hospitales p\u00FAblicos (MINSA), privados y laboratorios en 7 departamentos" },
        { table: "orden_de_recepcion", count: 1400, role: "Ingresos a taller (65% correctivos por rotura, 25% preventivos, 10% inspecci\u00F3n)" },
        { table: "diagnostico_orden", count: 1400, role: "Descripci\u00F3n t\u00E9cnica estructurada del s\u00EDntoma y an\u00E1lisis de falla" },
        { table: "orden_de_entrega", count: 1300, role: "Reporte de liberaci\u00F3n de equipo y confirmaci\u00F3n cl\u00EDnica" },
        { table: "servicio", count: 1300, role: "Liquidaciones financieras con desglose de mano de obra y repuestos" },
        { table: "repuesto_usado", count: 2150, role: "Trazabilidad de piezas cr\u00EDticas sustituidas por intervenci\u00F3n" },
        { table: "mantenimiento_preventivo", count: 750, role: "Rutinas peri\u00F3dicas programadas (cumplidas vs omitidas)" }
      ],
      physicalLaws: [
        {
          name: "Curva de la Ba\u00F1era & Factor Hospitalario",
          desc: "Los equipos en hospitales p\u00FAblicos de alta afluencia (ej. Hospital Militar o Manolo Morales) sufren un r\u00E9gimen intensivo de trabajo que acelera el desgaste t\u00E9rmico y mec\u00E1nico frente a laboratorios privados."
        },
        {
          name: "Ley de Penalizaci\u00F3n por Omisi\u00F3n (x3.2)",
          desc: "Si un analizador biom\u00E9dico supera los 180 d\u00EDas continuos sin recibir mantenimiento preventivo, su probabilidad de registrar una aver\u00EDa correctiva grave en los siguientes 30 d\u00EDas se multiplica por 3.2 de forma determinista."
        },
        {
          name: "Coherencia Transaccional Taller",
          desc: "Se asegur\u00F3 la secuencia l\u00F3gica completa: Recepci\u00F3n \u2192 Diagn\u00F3stico \u2192 Orden de Entrega \u2192 Servicio Liquidado \u2192 Repuestos Usados, respaldado con el archivo db.sqlite3.bak inmutable."
        }
      ]
    },

    // --------------------------------------------------------------------------
    // MODULO 4: FASE 2 (DOCS) - FEATURE STORE ANTI-LEAKAGE
    // --------------------------------------------------------------------------
    {
      id: "importmed-fase2-features",
      index: 4,
      badge: "Fase 2 \u2022 Feature Store",
      title: "Fase 2: Feature Engineering y Feature Store Longitudinal Anti-Leakage",
      tagline: "9,389 instant\u00E1neas anal\u00EDticas temporales con causalidad estricta y divisi\u00F3n temporal ciega.",
      summary: "Para transformar el esquema relacional OLTP en una matriz apta para Machine Learning, se implement\u00F3 un pipeline de ventanas m\u00F3viles retrospectivas con muestreo mensual cada 30 d\u00EDas. Esto garantiza que el modelo s\u00F3lo observe informaci\u00F3n pasada antes de la fecha de corte t, eliminando toda contaminaci\u00F3n de futuro (Data Leakage).",
      featureStoreStats: [
        { label: "Snapshots Anal\u00EDticos", value: "9,389", unit: "filas", desc: "229 equipos \u00D7 41 fechas de corte mensuales" },
        { label: "Variables de Ingenier\u00EDa", value: "30", unit: "columnas", desc: "5 bloques tem\u00E1ticos de telemetr\u00EDa" },
        { label: "Train Set (Pasado)", value: "5,954", unit: "filas", desc: "Mayo 2023 \u2013 Junio 2025 (330 fallos reales)" },
        { label: "Test Set Ciego (Futuro)", value: "3,435", unit: "filas", desc: "Julio 2025 \u2013 Septiembre 2026 (196 fallos reales)" },
        { label: "Tasa Natural de Falla", value: "5.54", unit: "%", desc: "Fuerte desbalance de clases del mundo real" }
      ],
      variableBlocks: [
        {
          name: "Bloque A: Identificadores & Equipo",
          vars: "id_equipo, numero_serial, marca, modelo, categoria (Hematolog\u00EDa, Bioqu\u00EDmica, etc.)",
          importance: "Permite aislar patrones intr\u00EDnsecos por l\u00EDnea tecnol\u00F3gica de hardware."
        },
        {
          name: "Bloque B: Entorno & Carga Institucional",
          vars: "id_hospital, tipo_hospital (p\u00FAblico, privado), entidad (hospital, cl\u00EDnica), departamento, antiguedad_dias",
          importance: "Captura la severidad del entorno cl\u00EDnico y antig\u00FCedad f\u00EDsica del activo."
        },
        {
          name: "Bloque C: Historial de Aver\u00EDas y Desgaste",
          vars: "total_correctivos_previos, correctivos_ultimos_90d, correctivos_ultimos_30d, mtbf_estimado_dias",
          importance: "Mide la tendencia hacia el fallo recurrente o degradaci\u00F3n acelerada."
        },
        {
          name: "Bloque D: Cumplimiento de Preventivos",
          vars: "dias_desde_ultimo_preventivo, ratio_preventivo_omisiones, preventivos_completados",
          importance: "Variable reina: cuantifica el abandono preventivo y tiempo en riesgo."
        },
        {
          name: "Bloque E: Complejidad Financiera & Piezas",
          vars: "costo_total_acumulado_usd, piezas_criticas_usadas, mttr_promedio_horas",
          importance: "Se\u00F1ala equipos 'pesadilla' con alta reparabilidad y reemplazos frecuentes."
        }
      ]
    },

    // --------------------------------------------------------------------------
    // MODULO 5: FASE 3 (DOCS) - FORMULACION MATEMATICA DE XGBOOST
    // --------------------------------------------------------------------------
    {
      id: "importmed-fase3-modelado",
      index: 5,
      badge: "Fase 3 \u2022 Algoritmo Campe\u00F3n",
      title: "Fase 3: Fundamentos Matem\u00E1ticos de XGBoost y Manejo del Desbalance",
      tagline: "Optimizaci\u00F3n por series de Taylor de segundo orden y penalizaci\u00F3n asim\u00E9trica 17.04x.",
      summary: "Para resolver la predicci\u00F3n de aver\u00EDas a 30 d\u00EDas, se seleccion\u00F3 XGBoost (eXtreme Gradient Boosting). Dado que s\u00F3lo el 5.54% de los eventos hist\u00F3ricos son fallos, un \u00E1rbol convencional tender\u00EDa a clasificar todo como normal. Mediante el factor scale_pos_weight = 17.04, obligamos al algoritmo a penalizar con 17 veces m\u00E1s severidad los falsos negativos.",
      mathFoundations: [
        {
          title: "1. Función Objetivo Global Regularizada",
          latex: "\\mathcal{L}^{(t)} = \\sum_{i=1}^n l\\left(y_i, \\, \\hat{y}_i^{(t-1)} + f_t(x_i)\\right) + \\Omega(f_t)",
          explanation: "Optimiza de forma aditiva una función de pérdida convexa $l$ con un término de regularización formal $\\Omega(f_t)$ que penaliza la complejidad estructural de cada nuevo árbol para erradicar el sobreajuste."
        },
        {
          title: "2. Penalización Estructural del Árbol (Regularización L2 y L1)",
          latex: "\\Omega(f_t) = \\gamma T + \\frac{1}{2}\\lambda \\sum_{j=1}^T w_j^2 + \\alpha \\sum_{j=1}^T |w_j|",
          explanation: "Donde $T$ es el número de hojas terminales y $w_j$ son las ponderaciones de cada hoja. Con $\\lambda = 1.0$ (regularización $L_2$), se comprime la varianza frente a datos de taller ruidosos."
        },
        {
          title: "3. Aproximación por Series de Taylor de Segundo Orden",
          latex: "\\tilde{\\mathcal{L}}^{(t)} \\approx \\sum_{i=1}^n \\left[ l\\left(y_i, \\hat{y}_i^{(t-1)}\\right) + g_i f_t(x_i) + \\frac{1}{2} h_i f_t^2(x_i) \\right] + \\Omega(f_t)",
          explanation: "Permite una convergencia cuadrática ultra veloz calculando los gradientes de primer orden $g_i$ y hessianos $h_i$ en torno a las predicciones del paso anterior."
        },
        {
          title: "4. Gradiente y Hessiano de Entropía Cruzada Binaria",
          latex: "g_i = p_i - y_i, \\quad h_i = p_i(1 - p_i) \\quad \\text{con} \\quad p_i = \\frac{1}{1 + e^{-\\hat{y}_i}}",
          explanation: "Calcula con precisión analítica la pendiente $g_i$ y curvatura $h_i$ de la pérdida logística para cada una de las 9,389 observaciones biomédicas, donde $p_i$ es la probabilidad predicha y $y_i \\in \\{0, 1\\}$ es la etiqueta real."
        },
        {
          title: "5. Ponderación por Asimetría de Clases (scale_pos_weight)",
          latex: "\\text{scale\\_pos\\_weight} = \\frac{\\sum_{i: y_i=0} 1}{\\sum_{i: y_i=1} 1} = \\frac{5{,}624 \\text{ sanos}}{330 \\text{ averías}} = \\mathbf{17.04}",
          explanation: "Un Falso Negativo (dejar escapar un analizador que colapsa sin aviso) es catastrófico para un hospital. Este factor multiplica por 17.04 los gradientes de la clase avería, blindando la detección."
        }
      ]
    },

    // --------------------------------------------------------------------------
    // MODULO 6: FASE 3 (DOCS) - TORNEO DE ALGORITMOS Y GRAFICAS ROC/PR
    // --------------------------------------------------------------------------
    {
      id: "importmed-fase3-torneo",
      index: 6,
      badge: "Fase 3 \u2022 Torneo y Calibraci\u00F3n",
      title: "El Torneo de Algoritmos y Calibraci\u00F3n de Umbral de Decisi\u00F3n (F2)",
      tagline: "XGBoost captura 103 fallos reales frente a solo 25 del taller sobre el conjunto ciego.",
      summary: "Evaluamos 4 paradigmas predictivos sobre el conjunto de test ciego (3,435 observaciones, 196 fallos reales). Se prioriz\u00F3 la m\u00E9trica F2-Score (\u03B2=2) porque da el doble de importancia al Recall que a la Precisi\u00F3n: es preferible revisar preventivamente un equipo sano que permitir que un analizador muera en urgencias.",
      tournamentTable: [
        {
          model: "Regla Heur\u00EDstica de Taller",
          paradigm: "Regla manual de 180 d\u00EDas",
          recall: "12.76%",
          precision: "34.25%",
          f1: "0.1859",
          f2: "0.1504",
          prAuc: "0.082",
          rocAuc: "0.540",
          detected: "25 de 196",
          missed: "171 fallos",
          verdict: "Insuficiente: deja escapar el 87% de los desastres cl\u00EDnicos"
        },
        {
          model: "Regresi\u00F3n Log\u00EDstica Ponderada",
          paradigm: "Modelo lineal con pesos",
          recall: "38.27%",
          precision: "21.68%",
          f1: "0.2768",
          f2: "0.3240",
          prAuc: "0.184",
          rocAuc: "0.725",
          detected: "75 de 196",
          missed: "121 fallos",
          verdict: "L\u00EDmite lineal: no capta interacciones complejas de desgaste"
        },
        {
          model: "Random Forest Classifier",
          paradigm: "Ensamble de 150 \u00E1rboles",
          recall: "44.39%",
          precision: "28.52%",
          f1: "0.3473",
          f2: "0.4012",
          prAuc: "0.287",
          rocAuc: "0.782",
          detected: "87 de 196",
          missed: "109 fallos",
          verdict: "Competitivo pero con mayor retenci\u00F3n de falsos positivos"
        },
        {
          model: "XGBoost Calibrado (\u03C4 = 0.22)",
          paradigm: "Gradient Boosting Regularizado",
          recall: "52.55%",
          precision: "33.55%",
          f1: "0.4095",
          f2: "0.4735",
          prAuc: "0.312",
          rocAuc: "0.814",
          detected: "103 de 196",
          missed: "93 fallos",
          verdict: "CAMPE\u00D3N: Cuadriplica la capacidad de captura del taller"
        }
      ],
      graphicsGallery: [
        {
          id: "g1",
          src: "graficas/01_curvas_roc_pr_comparativas.png",
          title: "Curvas ROC y Precision-Recall Comparativas",
          desc: "Demuestra la superioridad estoc\u00E1stica de XGBoost con un ROC-AUC de 0.814 y un PR-AUC de 0.312, superando por amplio margen a Random Forest (0.287) y a la regla del taller (0.082)."
        },
        {
          id: "g2",
          src: "graficas/02_matrices_confusion_comparativas.png",
          title: "Matrices de Confusi\u00F3n en Conjunto Ciego (Test 2025-2026)",
          desc: "Muestra c\u00F3mo XGBoost reduce los Falsos Negativos cr\u00EDticos de 171 a 93, detectando 103 aver\u00EDas reales antes de que ocurran frente a s\u00F3lo 25 detectadas por el m\u00E9todo tradicional."
        },
        {
          id: "g3",
          src: "graficas/03_tradeoff_umbral_decision.png",
          title: "Trade-Off de Umbral de Decisi\u00F3n (\u03C4 = 0.22)",
          desc: "Curvas de evoluci\u00F3n de F1, F2, Precision y Recall. Demuestra con precisi\u00F3n matem\u00E1tica por qu\u00E9 el umbral \u00F3ptimo cl\u00EDnico se sit\u00FAa en \u03C4 = 0.22, donde F2 alcanza su m\u00E1ximo global (0.4735)."
        },
        {
          id: "g4",
          src: "graficas/04_distribucion_probabilidad_semaforo.png",
          title: "Distribuci\u00F3n de Probabilidades y Sem\u00E1foro Cl\u00EDnico",
          desc: "Separaci\u00F3n n\u00EDtida de densidades de probabilidad entre equipos sanos y averiados, fundamentando los cortes del sem\u00E1foro: Verde (<20%), Amarillo (20-35%) y Rojo (\u226535%)."
        }
      ],
      thresholdCalibration: {
        tau: "0.22",
        f2Max: "0.4735",
        recallRate: "52.55%",
        clinicalRule: "Todo equipo con P \u2265 0.35 pasa a Riesgo Alto (Alerta Roja); de 0.20 a 0.34 a Riesgo Medio (Amarillo); y < 0.20 a Operaci\u00F3n Normal (Verde)."
      }
    },

    // --------------------------------------------------------------------------
    // MODULO 7: FASE 3 (DOCS) - INTERPRETABILIDAD SHAP Y CURVA DE DEGRADACION
    // --------------------------------------------------------------------------
    {
      id: "importmed-fase3-shap",
      index: 7,
      badge: "Fase 3 \u2022 Diagn\u00F3stico Causal SHAP",
      title: "Interpretabilidad Causal con SHAP: El Hallazgo del Domo Cr\u00EDtico (D\u00EDas 70-125)",
      tagline: "Desmintiendo la regla ingenua de 180 d\u00EDas con la f\u00EDsica del deterioro hospitalario.",
      summary: "Mediante la teor\u00EDa de juegos de Shapley (SHAP), abrimos la caja negra de XGBoost para responder \u00BFpor qu\u00E9 fallan los equipos biom\u00E9dicos? El descubrimiento cient\u00EDfico m\u00E1s trascendental del proyecto fue demostrar que los equipos cl\u00EDnicos colapsan mucho antes de los 180 d\u00EDas estipulados por el fabricante: el verdadero punto cr\u00EDtico de ruptura ocurre entre los d\u00EDas 70 y 125.",
      shapImportanceRanking: [
        { rank: 1, feature: "dias_desde_ultimo_preventivo", impact: "+0.842", desc: "Variable hegem\u00F3nica: m\u00E1s de 70 d\u00EDas sin servicio dispara exponencialmente la probabilidad." },
        { rank: 2, feature: "ratio_preventivo_omisiones", impact: "+0.518", desc: "El historial de cancelaciones o postergaciones de mantenimiento duplica la tasa de fallo." },
        { rank: 3, feature: "total_correctivos_previos", impact: "+0.385", desc: "Equipos con fatiga estructural previa acumulan mayor propensi\u00F3n al colapso definitivo." },
        { rank: 4, feature: "antiguedad_dias", impact: "+0.294", desc: "Deterioro electromec\u00E1nico en hardware biom\u00E9dico con m\u00E1s de 3 a\u00F1os de operaci\u00F3n." },
        { rank: 5, feature: "piezas_criticas_usadas", impact: "+0.247", desc: "Sustituciones pasadas de v\u00E1lvulas y motores advierten sobre estr\u00E9s acumulado en subsistemas." },
        { rank: 6, feature: "tipo_hospital_publico", impact: "+0.210", desc: "Penalizaci\u00F3n por mayor r\u00E9gimen de operaci\u00F3n continua en centros MINSA." }
      ],
      graphicsGallery: [
        {
          id: "g5",
          src: "graficas/05_shap_importancia_barras.png",
          title: "Ranking Global de Importancia de Variables (SHAP Bar Plot)",
          desc: "Cuantifica el impacto absoluto medio de cada variable sobre las predicciones de fallo, situando a los d\u00EDas desde el preventivo como el factor preponderante absoluto."
        },
        {
          id: "g6",
          src: "graficas/06_shap_dependencia_preventivo.png",
          title: "Curva de Dependencia SHAP: El Quiebre en D\u00EDas 70-125",
          desc: "Gr\u00E1fica crucial de dependencia parcial: hasta los 65 d\u00EDas el SHAP es negativo (protecci\u00F3n); al llegar al d\u00EDa 70 cruza el eje cero y entre los d\u00EDas 75 y 125 se dispara bruscamente hacia +1.8."
        },
        {
          id: "g_sum",
          src: "graficas/shap_summary_plot.png",
          title: "SHAP Beeswarm Summary Plot Multivariado",
          desc: "Muestra la distribuci\u00F3n completa de impactos para cada observaci\u00F3n. Puntos rojos (valores altos de d\u00EDas sin preventivo y omisiones) se desplazan marcadamente hacia la derecha (mayor riesgo)."
        }
      ]
    },

    // --------------------------------------------------------------------------
    // MODULO 8: FASE 3 (DOCS) - CASOS CLINICOS SHAP
    // --------------------------------------------------------------------------
    {
      id: "importmed-fase3-casos-clinicos",
      index: 8,
      badge: "Fase 3 \u2022 Auditor\u00EDa Cl\u00EDnica",
      title: "Explicabilidad Local SHAP: Auditor\u00EDa Forense de Casos Cl\u00EDnicos Reales",
      tagline: "Explicando m\u00E9dicamente por qu\u00E9 la IA alerta sobre un activo hospitalario concreto.",
      summary: "A diferencia de un modelo de 'caja negra' que un director de hospital o ingeniero jefe rechazar\u00EDa por falta de transparencia, SHAP descompone la probabilidad de cada activo en factores que empujan el riesgo hacia arriba (+) o hacia abajo (-).",
      clinicalCases: [
        {
          id: "caso-rojo",
          title: "Caso Cl\u00EDnico Cr\u00EDtico: Alerta Roja en Hospital Militar",
          equipment: "Analizador Hematol\u00F3gico Mindray BC-5000 (SN-HEM-2023-0042)",
          hospital: "Hospital Militar Dr. Alejandro D\u00E1vila Bola\u00F1os (Managua)",
          prob: "68.4%",
          status: "ALERTA ROJA (RIESGO ALTO)",
          positiveForces: [
            { var: "dias_desde_ultimo_preventivo = 115 d\u00EDas", push: "+1.24", note: "Super\u00F3 holgadamente la ventana de seguridad cl\u00EDnica (70 d\u00EDas)" },
            { var: "tipo_hospital = P\u00FAblico / Alta Demanda", push: "+0.32", note: "R\u00E9gimen ininterrumpido de 3 turnos diarios" },
            { var: "ratio_preventivo_omisiones = 0.33", push: "+0.28", note: "1 de cada 3 servicios preventivos previos fue cancelado" },
            { var: "total_correctivos_previos = 4", push: "+0.21", note: "Historial de micro-obstrucciones en l\u00EDneas hidr\u00E1ulicas" }
          ],
          negativeForces: [
            { var: "antiguedad_dias = 420 d\u00EDas", push: "-0.15", note: "Equipo relativamente joven (< 1.5 a\u00F1os de instalaci\u00F3n)" }
          ],
          action: "Emisi\u00F3n prioritaria de orden preventiva, reemplazo preventivo de v\u00E1lvula solenoide y calibraci\u00F3n fotom\u00E9trica."
        },
        {
          id: "caso-verde",
          title: "Caso de Control Saludable: Sem\u00E1foro Verde en Hospital V\u00E9lez Paiz",
          equipment: "Autoclave Cl\u00EDnico Biobase BKM-Z18N (SN-AUT-2024-0018)",
          hospital: "Hospital Fernando V\u00E9lez Paiz (Managua)",
          prob: "4.2%",
          status: "OPERACI\u00D3N SEGURA (RIESGO BAJO)",
          positiveForces: [
            { var: "antiguedad_dias = 680 d\u00EDas", push: "+0.12", note: "Desgaste natural de sello de c\u00E1mara" }
          ],
          negativeForces: [
            { var: "dias_desde_ultimo_preventivo = 18 d\u00EDas", push: "-1.45", note: "Mantenimiento preventivo reciente con kit de empaques nuevo" },
            { var: "ratio_preventivo_omisiones = 0.00", push: "+0.00", note: "Cumplimiento impecable de citas de taller" },
            { var: "correctivos_ultimos_90d = 0", push: "-0.38", note: "Operaci\u00F3n completamente estable y sin fugas de presi\u00F3n" }
          ],
          action: "Mantener en operaci\u00F3n regular; pr\u00F3xima evaluaci\u00F3n en 60 d\u00EDas."
        }
      ],
      graphicsGallery: [
        {
          id: "g7",
          src: "graficas/07_explicacion_local_casos_clinicos.png",
          title: "Explicaci\u00F3n Local SHAP Waterfall de los Casos Cl\u00EDnicos",
          desc: "Descomposici\u00F3n gr\u00E1fica de fuerzas que elevan o reducen el log-odds de falla para el analizador hematol\u00F3gico en riesgo cr\u00EDtico frente al autoclave saludable."
        }
      ]
    },

    // --------------------------------------------------------------------------
    // MODULO 9: FASE 4 (DOCS) & POWER BI - STAR SCHEMA Y DAX
    // --------------------------------------------------------------------------
    {
      id: "importmed-fase4-star-schema",
      index: 9,
      badge: "Fase 4 \u2022 Modelado Dimensional",
      title: "Fase 4: Arquitectura Dimensional en Estrella (Star Schema de 9 Entidades)",
      tagline: "Optimizaci\u00F3n VertiPaq en memoria y soluci\u00F3n al reto de agregaci\u00F3n temporal en DAX.",
      summary: "Para alimentar la capa de inteligencia de negocios en Power BI Desktop, se estructur\u00F3 un modelo dimensional puro compuesto por 9 entidades: 5 dimensiones maestras, 3 tablas de hechos transaccionales y 1 entidad prescriptiva consolidada. Todas las relaciones operan con cardinalidad estricta 1 a varios (1:N) y direcci\u00F3n de filtro \u00FAnico.",
      entities: [
        { name: "Dim_Calendario", role: "Dimensi\u00F3n Temporal", pk: "Fecha", fk: "Filtra Fact_EvaluacionRiesgo[fecha_corte] y Fact_Mantenimiento[fecha_evento]", attrs: "A\u00F1o, Mes, NombreMes, AnioMes, Trimestre" },
        { name: "Dim_Equipos", role: "Dimensi\u00F3n de Activos", pk: "id_equipo", fk: "Filtra Fact_EvaluacionRiesgo, Fact_Mantenimiento y Prescripcion", attrs: "numero_serial, nombre_equipo, marca, modelo, categoria" },
        { name: "Dim_Hospital", role: "Dimensi\u00F3n Institucional", pk: "id_hospital", fk: "Filtra Fact_EvaluacionRiesgo y Fact_Mantenimiento", attrs: "nombre_hospital, tipo_institucion, entidad_salud, departamento" },
        { name: "Dim_Tecnico", role: "Dimensi\u00F3n de Personal", pk: "id_tecnico", fk: "Filtra Fact_Mantenimiento", attrs: "nombre_completo, especialidad biom\u00E9dica, tel\u00E9fono" },
        { name: "Dim_Repuestos", role: "Dimensi\u00F3n Kardex", pk: "id_repuesto", fk: "Filtra Fact_Repuestos_Consumo", attrs: "sku, nombre_repuesto, costo_compra_usd, stock_actual, stock_minimo" },
        { name: "Fact_EvaluacionRiesgo", role: "Hecho Predictivo", pk: "id_evaluacion", fk: "id_equipo, id_hospital, fecha_corte", attrs: "probabilidad_fallo, alerta_predictiva, nivel_riesgo, factor_principal" },
        { name: "Fact_Mantenimiento", role: "Hecho Operativo", pk: "id_orden", fk: "equipo_id, hospital_id, tecnico_id, fecha_evento", attrs: "tipo_mantenimiento, trabajo_solicitado, mttr_horas, costo_total_usd" },
        { name: "Fact_Repuestos_Consumo", role: "Hecho de Consumo", pk: "id_consumo", fk: "id_orden, repuesto_id", attrs: "cantidad, subtotal_usd" },
        { name: "Prescripcion_Acciones_Inmediatas", role: "Salida Prescriptiva", pk: "numero_serial", fk: "Vinculada a Dim_Equipos y Dim_Hospital", attrs: "probabilidad, nivel_riesgo, accion_prescriptiva, factor_riesgo" }
      ],
      daxChallenge: {
        title: "Resoluci\u00F3n del Reto DAX de Agregaci\u00F3n Temporal",
        problem: "La dimensi\u00F3n Dim_Calendario se extiende hasta diciembre de 2026, mientras que la tabla de evaluaci\u00F3n de riesgo registra cortes hist\u00F3ricos peri\u00F3dicos. Al usar LASTDATE() ingenuamente, los KPIs arrojaban valores nulos por falta de transacciones en los \u00FAltimos meses proyectados.",
        solution: "Evaluaci\u00F3n din\u00E1mica del \u00FAltimo corte real con CALCULATE y MAX:",
        code: `Equipos Riesgo Alto = 
VAR UltimoCorte = CALCULATE(MAX(Fact_EvaluacionRiesgo[fecha_corte]), ALL(Fact_EvaluacionRiesgo))
RETURN
CALCULATE(
    DISTINCTCOUNT(Fact_EvaluacionRiesgo[id_equipo]),
    Fact_EvaluacionRiesgo[nivel_riesgo] = "Alto",
    Fact_EvaluacionRiesgo[fecha_corte] = UltimoCorte
)`
      },
      graphicsGallery: [
        {
          id: "pbi_diag",
          src: "powerbigraficas/diagrama.png",
          title: "Diagrama del Modelo Dimensional en Power BI Desktop (Star Schema)",
          desc: "Estructura f\u00EDsica de las 9 entidades en VertiPaq. Garantiza m\u00E1xima velocidad columnar, c\u00E1lculo instant\u00E1neo de medidas DAX y ausencia total de relaciones N:M ambiguas."
        }
      ]
    },

    // --------------------------------------------------------------------------
    // MODULO 10: FASE 4 (DOCS) & POWER BI - PAGINA 1 TORRE DE CONTROL
    // --------------------------------------------------------------------------
    {
      id: "importmed-fase4-pbi-torre",
      index: 10,
      badge: "Power BI \u2022 P\u00E1gina 1",
      title: "Torre de Control Ejecutiva y Sem\u00E1foro Hospitalario (P\u00E1gina 1)",
      tagline: "Visi\u00F3n macroecon\u00F3mica, mapa territorial en Nicaragua y desequilibrio presupuestario.",
      summary: "La primera p\u00E1gina de Power BI provee a la alta gerencia y al Ministerio de Salud un monitoreo integral del parque de 229 equipos. Evidencia c\u00F3mo el gasto se encuentra colapsado en correctivos y expone la distribuci\u00F3n territorial del riesgo.",
      findings: [
        {
          title: "Asimetr\u00EDa Financiera Brutal (92.4% Correctivo)",
          desc: "De los $229,310 USD invertidos hist\u00F3ricamente, $214,000 USD corresponden a reparaciones de emergencia y s\u00F3lo $15,310 USD a preventivos. En la especialidad de Hematolog\u00EDa, la proporci\u00F3n es de 15 a 1 ($120k correctivo vs $8k preventivo)."
        },
        {
          title: "Distribuci\u00F3n Territorial en Nicaragua",
          desc: "Managua concentra la mayor flota con 77 equipos y un potencial de ahorro preventivo de $4,800 USD, seguida por Chinandega (28 equipos), Le\u00F3n (27 equipos) y Matagalpa (25 equipos)."
        },
        {
          title: "Din\u00E1mica C\u00EDclica de Olas de Aver\u00EDas (2023 - 2026)",
          desc: "La serie de tiempo demuestra un desfase trimestral recurrente: tras per\u00EDodos donde las brigadas descuidaron los preventivos (2-3 servicios al mes), se desatan olas violentas de hasta 23 aver\u00EDas mensuales que saturan el taller de electromedicina."
        }
      ],
      graphicsGallery: [
        {
          id: "pbi_pag1",
          src: "powerbigraficas/pagina1.png",
          title: "Tablero Power BI P\u00E1gina 1: Torre de Control Ejecutiva",
          desc: "Monitoreo en vivo de los 229 activos, tasa de falla global del 57%, comparativa de gasto correctivo vs preventivo, mapa departamental y evoluci\u00F3n hist\u00F3rica mensual."
        }
      ]
    },

    // --------------------------------------------------------------------------
    // MODULO 11: FASE 4 (DOCS) & POWER BI - PAGINA 2 DIAGNOSTICO CAUSAL Y MTTR
    // --------------------------------------------------------------------------
    {
      id: "importmed-fase4-pbi-diagnostico",
      index: 11,
      badge: "Power BI \u2022 P\u00E1gina 2",
      title: "Diagn\u00F3stico Causal, MTTR e Inestabilidad Post-Reparaci\u00F3n (P\u00E1gina 2)",
      tagline: "Auditor\u00EDa forense de 61,635 horas de parada y componentes de bajo costo con impacto desproporcionado.",
      summary: "La segunda p\u00E1gina de Power BI profundiza en las causas ra\u00EDz de indisponibilidad. Descubre que las reparaciones defectuosas introducen inestabilidad secundaria y que peque\u00F1os consumibles de $130 a $202 USD son responsables de paradas cl\u00EDnicas de hasta 96 horas.",
      criticalComponents: [
        { item: "L\u00E1mpara Hal\u00F3gena de Lectura", cost: "$143 USD", downtime: "72 \u2013 96 horas", impact: "Suspensi\u00F3n de pruebas fotom\u00E9tricas y perfiles qu\u00EDmicos hep\u00E1ticos" },
        { item: "Empaque de Silicona para C\u00E1mara", cost: "$130 USD", downtime: "48 \u2013 72 horas", impact: "P\u00E9rdida de estanqueidad en autoclaves, deteniendo esterilizaci\u00F3n quir\u00FArgica" },
        { item: "Jeringa Dosificadora Microm\u00E9trica", cost: "$202 USD", downtime: "72 \u2013 96 horas", impact: "Error de aspiraci\u00F3n en hematolog\u00EDa y contaminaci\u00F3n de reactivos" }
      ],
      causalInsights: [
        {
          title: "Inestabilidad Transitoria Post-Reparaci\u00F3n (~220 casos)",
          desc: "El an\u00E1lisis diagn\u00F3stico identific\u00F3 que la primera anomal\u00EDa cr\u00EDtica despu\u00E9s del desgaste ordinario es la descalibraci\u00F3n \u00F3ptica y el reensamblaje deficiente en taller, causando reingresos tempranos antes de 45 d\u00EDas."
        },
        {
          title: "Domo de Acumulaci\u00F3n de Costos (D\u00EDas 70 \u2013 125)",
          desc: "El gr\u00E1fico de dispersi\u00F3n demuestra que el mayor volumen de gastos correctivos ($2,500 a $4,800 USD) se concentra en los activos que superaron los 70 d\u00EDas sin preventivo."
        },
        {
          title: "MTTR Acumulado de 61,635 Horas",
          desc: "Con un promedio de 269 horas de parada por equipo intervenido, el impacto cl\u00EDnico hospitalario ha sido devastador por falta de reposici\u00F3n oportuna de consumibles baratos."
        }
      ],
      graphicsGallery: [
        {
          id: "pbi_pag2",
          src: "powerbigraficas/pagina2.png",
          title: "Tablero Power BI P\u00E1gina 2: Diagn\u00F3stico Causal y Curva de Degradaci\u00F3n",
          desc: "Gr\u00E1fico de dispersi\u00F3n de costos acumulados vs d\u00EDas sin preventivo, auditor\u00EDa forense de MTTR y desglose de factores determinantes SHAP."
        }
      ]
    },

    // --------------------------------------------------------------------------
    // MODULO 12: FASE 4 (DOCS) & POWER BI - PAGINA 3 CONSOLA PRESCRIPTIVA Y KARDEX
    // --------------------------------------------------------------------------
    {
      id: "importmed-fase4-pbi-prescriptiva",
      index: 12,
      badge: "Power BI \u2022 P\u00E1gina 3 & MLOps",
      title: "Consola Prescriptiva, Brigadas Log\u00EDsticas y Kardex en L\u00EDneas (P\u00E1gina 3)",
      tagline: "41 equipos cr\u00EDticos priorizados, factor de protecci\u00F3n de 27.54x y alerta de reorden de 5 SKUs.",
      summary: "La tercera p\u00E1gina de Power BI convierte los hallazgos matem\u00E1ticos en acci\u00F3n prescriptiva mandatoria. Permite desplegar 2 brigadas log\u00EDsticas sobre 11 hospitales y supervisar en tiempo real el stock cr\u00EDtico de repuestos para evitar paradas por desabastecimiento.",
      prescriptiveKpis: [
        { label: "Equipos Riesgo Alto", value: "41", unit: "activos", desc: "17.9% del parque en riesgo inminente de fallo" },
        { label: "Alertas Activas", value: "96", unit: "alertas", desc: "Equipos con probabilidad \u2265 20% requiriendo atenci\u00F3n" },
        { label: "Ahorro Preventivo Directo", value: "$15,090", unit: "USD", desc: "Costo de ejecuci\u00F3n de las 41 \u00F3rdenes prioritarias" },
        { label: "Costo de Riesgo Proyectado", value: "$415,580", unit: "USD", desc: "P\u00E9rdida potencial mitigada en caso de colapso" },
        { label: "Factor de Protecci\u00F3n", value: "27.54x", unit: "retorno", desc: "Por cada $1 invertido en preventivo se protegen $27.54 USD" }
      ],
      brigades: [
        {
          name: "Brigada Metropolitana (Managua & Alrededores)",
          teams: 25,
          share: "60.98%",
          hospitals: "Hospital Militar (9 equipos), Hospital Fernando V\u00E9lez Paiz (7), Hospital Manolo Morales (5), Cl\u00EDnicas Privadas (4)",
          logistics: "Atenci\u00F3n r\u00E1pida con base en taller central IMPORTMED Managua; optimizaci\u00F3n de traslados urbanos."
        },
        {
          name: "Brigada Norte-Occidente (Le\u00F3n, Chinandega, Matagalpa, Estel\u00ED)",
          teams: 16,
          share: "39.02%",
          hospitals: "Hospital San Juan de Dios de Estel\u00ED (6 equipos), C\u00E9sar Amador Molina Matagalpa (4), Espa\u00F1a Chinandega (4), HEODRA Le\u00F3n (2)",
          logistics: "Ruta de 4 d\u00EDas en circuito carretero con cuadrilla equipada con repuestos de alta rotaci\u00F3n."
        }
      ],
      kardexZones: [
        { zone: "Zona 1: Alta Holgura (+40 a +65 unidades)", desc: "Mangueras perist\u00E1lticas, filtros HEPA, l\u00E1mparas hal\u00F3genas y juntas de autoclave.", status: "Abastecimiento Seguro" },
        { zone: "Zona 2: Transici\u00F3n (+21 a +35 unidades)", desc: "Sensores t\u00E9rmicos, jeringas micro-volum\u00E9tricas y reactivos de prueba TEST-001.", status: "Monitoreo Peri\u00F3dico" },
        { zone: "Zona 3: Convergencia Cr\u00EDtica (\u2264 22 unidades)", desc: "5 SKUs cr\u00EDticos con margen neto de s\u00F3lo 9 a 18 unidades sobre el m\u00EDnimo reglamentario.", status: "ALERTA ROJA - REORDEN INTERNACIONAL" }
      ],
      criticalSkus: [
        { sku: "CELD-CUA-10", name: "Celda de Cuarzo de Alta Precisi\u00F3n", stock: 12, min: 3, margin: 9, status: "Cr\u00EDtico" },
        { sku: "SENS-OPT-04", name: "Sensor \u00D3ptico de Lectura", stock: 15, min: 4, margin: 11, status: "Cr\u00EDtico" },
        { sku: "MOT-BRU-06", name: "Motor Brushless para Centr\u00EDfuga", stock: 18, min: 5, margin: 13, status: "Cr\u00EDtico" },
        { sku: "POW-SUP-14", name: "Fuente de Poder Regulada", stock: 20, min: 6, margin: 14, status: "Cr\u00EDtico" },
        { sku: "TARJ-MAIN-07", name: "Tarjeta Electr\u00F3nica Principal", stock: 22, min: 4, margin: 18, status: "Cr\u00EDtico" }
      ],
      strategicRecommendations: [
        "1. Reconfiguraci\u00F3n del Ciclo Preventivo: Reducir oficialmente el intervalo preventivo de 180 a 90 d\u00EDas para analizadores hematol\u00F3gicos y centr\u00EDfugas intensivas.",
        "2. Protocolo Mandatorio Post-Reparaci\u00F3n: Exigir prueba de calibraci\u00F3n \u00F3ptica con patr\u00F3n TEST-001 y control de estabilidad el\u00E9ctrica antes de dar de alta cualquier equipo.",
        "3. Protecci\u00F3n El\u00E9ctrica Dedicada (UPS): Instalar sistemas UPS en analizadores cr\u00EDticos para erradicar da\u00F1os por picos de tensi\u00F3n en redes hospitalarias.",
        "4. Gesti\u00F3n de Adquisiciones Prioritarias: Colocar de inmediato \u00F3rdenes de compra internacionales para los 5 SKUs en convergencia cr\u00EDtica.",
        "5. Flujo MLOps Automatizado: Reentrenar peri\u00F3dicamente el modelo XGBoost con las nuevas \u00F3rdenes de Django y refrescar el Star Schema en Power BI Service."
      ],
      graphicsGallery: [
        {
          id: "pbi_pag3",
          src: "powerbigraficas/pagina3.png",
          title: "Tablero Power BI P\u00E1gina 3: Consola Prescriptiva y Kardex de Repuestos",
          desc: "Visualizaci\u00F3n de las 41 \u00F3rdenes prescriptivas con c\u00E1lculo de retorno, selector interactivo de brigadas y gr\u00E1fico de barras de Stock Actual vs Umbral M\u00EDnimo por SKU."
        }
      ]
    }
  ],

  // Glosario Especializado de IMPORTMED S.A.
  glossary: [
    {
      term: "MTTR (Mean Time to Repair)",
      short: "Tiempo Medio de Reparaci\u00F3n",
      definition: "Promedio de horas durante las cuales un equipo permanece fuera de servicio mientras es diagnosticado, reparado y calibrado. En IMPORTMED promedia 269 horas por activo intervenido.",
      tooltip_context: "61,635 horas totales acumuladas de parada cl\u00EDnica en hospitales nicarag\u00FCenses.",
      practical_analogy: "El tiempo total que un paciente debe esperar sin poder realizarse sus ex\u00E1menes m\u00E9dicos porque la m\u00E1quina est\u00E1 desarmada en el taller."
    },
    {
      term: "MTBF (Mean Time Between Failures)",
      short: "Tiempo Medio Entre Fallas",
      definition: "M\u00E9trica de confiabilidad que cuantifica el n\u00FAmero promedio de d\u00EDas que un equipo cl\u00EDnico opera de forma continua y confiable antes de experimentar una rotura.",
      tooltip_context: "Se contrae dr\u00E1sticamente en equipos con m\u00E1s de 70 d\u00EDas sin mantenimiento preventivo.",
      practical_analogy: "Cu\u00E1ntos kil\u00F3metros puede rodar una ambulancia antes de necesitar entrar al taller por un desperfecto mec\u00E1nico."
    },
    {
      term: "scale_pos_weight",
      short: "Factor de Ponderaci\u00F3n de Asimetr\u00EDa en XGBoost",
      definition: "Par\u00E1metro matem\u00E1tico que escala el gradiente de la clase positiva (fallo). En IMPORTMED se calcul\u00F3 como 5,624/330 = 17.04.",
      tooltip_context: "Penaliza los Falsos Negativos con 17 veces mayor severidad que los Falsos Positivos para blindar la atenci\u00F3n m\u00E9dica.",
      practical_analogy: "Una alarma contra incendios que prefiere sonar por una tostada quemada (falsa alarma) antes que quedarse callada ante un fuego real."
    },
    {
      term: "F2-Score (\u03B2 = 2)",
      short: "M\u00E9trica Rectora de Evaluaci\u00F3n Cl\u00EDnica",
      definition: "Media arm\u00F3nica ponderada entre Precisi\u00F3n y Recall que otorga el doble de importancia a la sensibilidad (captura de fallos reales) que a la precisi\u00F3n.",
      tooltip_context: "XGBoost alcanz\u00F3 F2 = 0.4735 con umbral \u03C4 = 0.22, frente al 0.1504 de la regla manual de taller.",
      practical_analogy: "En medicina diagn\u00F3stica, es preferible hacerle una segunda prueba preventiva a un paciente sano que mandar a casa a un enfermo grave sin tratamiento."
    },
    {
      term: "Valores SHAP (Shapley Additive exPlanations)",
      short: "Interpretabilidad Basada en Teor\u00EDa de Juegos",
      definition: "M\u00E9todo matem\u00E1tico riguroso que descompone la predicci\u00F3n de XGBoost en la contribuci\u00F3n neta marginal que aporta cada variable individual.",
      tooltip_context: "Permiti\u00F3 descubrir cient\u00EDficamente el quiebre de riesgo en los d\u00EDas 70-125 y la inestabilidad post-reparaci\u00F3n.",
      practical_analogy: "El informe pericial de un accidente que cuantifica exactamente cu\u00E1nto aport\u00F3 la lluvia, cu\u00E1nto el desgaste de los frenos y cu\u00E1nto la velocidad."
    },
    {
      term: "Star Schema (Modelo en Estrella)",
      short: "Arquitectura Dimensional en Power BI",
      definition: "Estructura de modelado de datos compuesta por tablas de hechos centrales rodeadas por dimensiones sat\u00E9lite, optimizada para el motor columnar VertiPaq.",
      tooltip_context: "9 entidades en IMPORTMED: 5 dimensiones, 3 hechos y 1 tabla prescriptiva con relaciones 1:N puras.",
      practical_analogy: "Un hospital donde el quir\u00F3fano central est\u00E1 conectado por pasillos directos a farmacia, laboratorio y salas, sin laberintos intermedios."
    },
    {
      term: "Kardex en L\u00EDneas",
      short: "Gesti\u00F3n Inteligente de Inventario Cr\u00EDtico",
      definition: "Monitoreo continuo de existencias de repuestos que compara el stock f\u00EDsico actual contra el umbral m\u00EDnimo de seguridad para disparar \u00F3rdenes de compra.",
      tooltip_context: "Identific\u00F3 5 SKUs en convergencia cr\u00EDtica: celdas de cuarzo, sensores \u00F3pticos, motores brushless, fuentes de poder y tarjetas principales.",
      practical_analogy: "La despensa de un restaurante de alta cocina que avisa autom\u00E1ticamente cu\u00E1ndo quedan los \u00FAltimos ingredientes clave antes de que empiece el servicio."
    },
    {
      term: "Curva de la Ba\u00F1era (Bathtub Curve)",
      short: "Comportamiento F\u00EDsico de la Tasa de Fallos",
      definition: "Modelo cl\u00E1sico de ingenier\u00EDa de confiabilidad con tres etapas: fallos tempranos (mortalidad infantil), fallos aleatorios (vida \u00FAtil constante) y fallos por desgaste.",
      tooltip_context: "En IMPORTMED se replica tras las reparaciones de taller con la inestabilidad transitoria post-reparaci\u00F3n.",
      practical_analogy: "Un calzado nuevo que puede lastimar los primeros d\u00EDas hasta amoldarse, luego funciona perfecto por a\u00F1os, y finalmente se desgasta la suela."
    },
    {
      term: "Factor de Protecci\u00F3n Financiera (27.54x)",
      short: "Retorno sobre Inversi\u00F3n Preventiva",
      definition: "Ratio entre el costo de riesgo catastr\u00F3fico proyectado ($415,580 USD) y el costo preventivo directo de intervenci\u00F3n ($15,090 USD).",
      tooltip_context: "Demuestra a la direcci\u00F3n hospitalaria que prevenir aver\u00EDas rinde $27.54 USD por cada d\u00F3lar asignado a las cuadrillas de mantenimiento.",
      practical_analogy: "Pagar una p\u00F3liza de seguro m\u00E9dico de $100 que cubre una operaci\u00F3n imprevista de $2,754 en una cl\u00EDnica privada."
    }
  ]
};

// Global export for vanilla JS execution
if (typeof window !== 'undefined') {
  window.importmedPresentationData = importmedPresentationData;
}
