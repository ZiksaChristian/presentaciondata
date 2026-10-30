// ============================================================
// BACKBLAZE PREDICTIVE MAINTENANCE - Presentation Data
// Vanilla JS global constant - ASCII-safe, no CORS issues
// All non-ASCII chars escaped as \uXXXX for encoding robustness
// ============================================================

const presentationData = {
  "meta": {
    "title": "Mantenimiento Predictivo de Unidades de Disco Duro",
    "subtitle": "Caso de Estudio: Telemetr\u00EDa S.M.A.R.T. y Aprendizaje Autom\u00E1tico en Centros de Datos de Backblaze",
    "version": "3.1.0",
    "author": "Equipo de Ciencia de Datos & Arquitectura de Almacenamiento",
    "theme": "dark-glassmorphism",
    "lastUpdated": "Octubre 2026",
    "dataset": "Backblaze Hard Drive Stats (2013 - 2019)",
    "targetDrive": "Seagate Desktop HDD 4TB (ST4000DM000)"
  },
  "sections": [
    {
      "id": "portada-contexto",
      "index": 1,
      "badge": "Contexto Industrial",
      "title": "Contexto Industrial y Paradigmas de Mantenimiento",
      "tagline": "De esperar a que el disco explote a predecir su muerte antes de perder datos.",
      "summary": "En los centros de datos de Backblaze hay m\u00E1s de 100,000 discos duros mec\u00E1nicos (HDDs) girando sin parar las 24 horas del d\u00EDa. En una escala tan gigantesca, los discos no fallan de vez en cuando: \u00A1se rompen a diario! Cuando un disco muere por sorpresa, el servidor entra en p\u00E1nico, los discos vecinos sufren un sobreesfuerzo brutal para reconstruir la informaci\u00F3n y existe riesgo real de perder datos para siempre. Este proyecto demuestra c\u00F3mo usamos Machine Learning (aprendizaje autom\u00E1tico) y sensores S.M.A.R.T. (sensores de salud del disco) para anticipar qu\u00E9 disco va a morir con hasta 30 d\u00EDas de ventaja.",
      "kpis": [
        { "label": "Datos Crudos en BigQuery", "value": "~55", "unit": "GB", "desc": "Telemetr\u00EDa diaria de toda la flota" },
        { "label": "Modelo Analizado", "value": "ST4000DM000", "unit": "Seagate 4TB", "desc": "35,000+ unidades id\u00E9nticas" },
        { "label": "Fallos Reales en Test", "value": "165", "unit": "roturas", "desc": "Prueba a ciegas sobre el a\u00F1o 2019" },
        { "label": "Modelos XGBoost", "value": "8", "unit": "clasificadores", "desc": "Horizontes de 1 a 30 d\u00EDas" },
        { "label": "Penalizaci\u00F3n por Fallo", "value": "17.04", "unit": "peso extra", "desc": "scale_pos_weight para evitar descuidos" }
      ],
      "table1": {
        "title": "Tabla 1: Las 3 Formas de Cuidar los Discos Duros (\u00BFCu\u00E1l conviene m\u00E1s?)",
        "strategies": [
          {
            "id": "correctiva",
            "name": "1. Mantenimiento Correctivo: Run-to-Failure (Usar hasta que reviente)",
            "tag": "Reactivo (La vieja escuela)",
            "color": "#ef4444",
            "icon": "alert-triangle",
            "principle": "No hacer absolutamente nada hasta que el disco eche humo o se apague por completo en mitad de la producci\u00F3n.",
            "pros": "Cero costo al principio; le exprimes hasta el \u00FAltimo suspiro de vida al disco.",
            "cons": "El 100% de los fallos te agarran por sorpresa. El servidor se pone lent\u00EDsimo durante 14 horas reconstruyendo datos (RAID degradado) y corres el riesgo de que otro disco muera en el proceso.",
            "costImpact": "Car\u00EDsimo ($450 USD por fallo entre horas extras de t\u00E9cnicos y estr\u00E9s del sistema)",
            "availability": "99.0% (Interrupciones y riesgo constante de perder informaci\u00F3n)"
          },
          {
            "id": "preventiva",
            "name": "2. Mantenimiento Preventivo (Cambio a ciegas por calendario)",
            "tag": "Preventivo (Por si acaso)",
            "color": "#f59e0b",
            "icon": "calendar",
            "principle": "Tirar a la basura y reemplazar todos los discos cuando cumplen un tiempo fijo (por ejemplo, cada 3 a\u00F1os), sin importar si est\u00E1n sanos.",
            "pros": "F\u00E1cil de agendar en el calendario; compras discos en lotes ordenados.",
            "cons": "Desperdicias discos que a\u00FAn pod\u00EDan durar 2 o 3 a\u00F1os m\u00E1s en perfecto estado. Y lo peor: no evita que un disco nuevo se rompa a los 6 meses por defecto de f\u00E1brica.",
            "costImpact": "Medio-Alto (Tiras dinero a la basura cambiando piezas sanas)",
            "availability": "99.7% (Mejor, pero con paradas innecesarias para cambiar discos)"
          },
          {
            "id": "predictiva",
            "name": "3. Mantenimiento Predictivo (Basado en condici\u00F3n con Inteligencia Artificial)",
            "tag": "Inteligente (El objetivo de este proyecto)",
            "color": "#06b6d4",
            "icon": "activity",
            "principle": "Escuchar los sensores S.M.A.R.T. del disco todos los d\u00EDas y usar XGBoost (un modelo inteligente) para saber con d\u00EDas de anticipaci\u00F3n cu\u00E1ndo va a fallar.",
            "pros": "Cero sorpresas: copias los datos con calma a un disco nuevo mientras el viejo sigue vivo. Aprovechas el 95% de la vida \u00FAtil del hardware.",
            "cons": "Requiere procesar datos en la nube (BigQuery) y entrenar modelos matem\u00E1ticos.",
            "costImpact": "\u00D3ptimo ($45 USD por cambio programado y tranquilo)",
            "availability": "99.999% (Alta disponibilidad: los usuarios jam\u00E1s notan una ca\u00EDda)"
          }
        ]
      },
      "sliderComparison": {
        "title": "Simulador Visual: \u00BFQu\u00E9 pasa cuando se rompe un disco? (Reactivo vs Predictivo)",
        "before": {
          "label": "Estrategia Reactiva: Run-to-Failure (Esperar al desastre)",
          "subtitle": "\u00A1Alerta roja en el datacenter! Un disco muri\u00F3 sin previo aviso",
          "cost": "$450 USD / rotura",
          "downtime": "14 horas de sufrimiento (el servidor reconstruye datos a marcha forzada)",
          "ioImpact": "Sobrecarga del 92% en los discos vecinos (peligro de fallo en cadena)",
          "dataRisk": "Riesgo de perder datos si otro disco falla hoy: 4.8%",
          "status": "EMERGENCIA CR\u00CDTICA",
          "statusColor": "#ef4444"
        },
        "after": {
          "label": "Mantenimiento Predictivo: XGBoost (Alerta con d\u00EDas de anticipaci\u00F3n)",
          "subtitle": "La IA avisa: 'Este disco fallar\u00E1 en 7 d\u00EDas'. Migramos todo con calma",
          "cost": "$45 USD / sustituci\u00F3n",
          "downtime": "0 horas (los datos se clonaron en segundo plano sin interrumpir)",
          "ioImpact": "Copia suave y silenciosa a baja prioridad (<15% de uso)",
          "dataRisk": "Riesgo de perder datos: Pr\u00E1cticamente Cero (<0.01%)",
          "status": "PROTEGIDO POR INTELIGENCIA ARTIFICIAL",
          "statusColor": "#06b6d4"
        }
      }
    },
    {
      "id": "niveles-madurez",
      "index": 2,
      "badge": "Madurez Anal\u00EDtica",
      "title": "Los 4 Niveles de Madurez Anal\u00EDtica (Gartner)",
      "tagline": "No puedes correr antes de aprender a caminar: escalando el valor de los datos.",
      "description": "Muchas empresas cometen el grave error de querer 'Inteligencia Artificial Prescriptiva' (que la computadora tome decisiones sola) sin haber entendido primero qu\u00E9 pas\u00F3 en el pasado ni qu\u00E9 causa los problemas. En Backblaze seguimos la escalera de madurez paso a paso para no tomar decisiones a ciegas.",
      "goldenRule": {
        "title": "Regla de Oro de la Ciencia de Datos",
        "message": "\u00A1Regla de oro: No se puede prescribir sin antes diagnosticar y predecir!",
        "desc": "No puedes ordenarle al sistema que apague y cambie un disco autom\u00E1ticamente si tu modelo predictivo no est\u00E1 bien calibrado y no entiendes la f\u00EDsica del fallo."
      },
      "levels": [
        {
          "level": 1,
          "name": "1. Descriptivo (\u00BFQu\u00E9 pas\u00F3?)",
          "badge": "Nivel 01: El Retrovisor",
          "question": "\u00BFCu\u00E1ntos discos se nos rompieron el a\u00F1o pasado?",
          "color": "#0284c7",
          "detail": "Contar cu\u00E1ntos discos est\u00E1n sanos y cu\u00E1ntos murieron en los Storage Pods (armarios de servidores). Calculamos el AFR (Annualized Failure Rate - tasa anual de fallos: qu\u00E9 porcentaje de discos muere al a\u00F1o).",
          "example": "Descubrimos que en 2019 se rompieron exactamente 165 discos del modelo Seagate 4TB (ST4000DM000), con una tasa de fallos anual hist\u00F3rica del 2.6%.",
          "tools": "Consultas SQL en BigQuery, reportes trimestrales de Backblaze y gr\u00E1ficos simples"
        },
        {
          "level": 2,
          "name": "2. Diagn\u00F3stico (\u00BFPor qu\u00E9 pas\u00F3?)",
          "badge": "Nivel 02: La Autopsia",
          "question": "\u00BFPor qu\u00E9 demonios se rompi\u00F3 ese disco en espec\u00EDfico?",
          "color": "#6366f1",
          "detail": "Investigar qu\u00E9 sensores avisaron antes del desastre. Descubrimos que el sensor SMART 187 (errores que el disco no pudo corregir) y el SMART 197 (sectores da\u00F1ados) se disparan de golpe 48 a 72 horas antes de que el motor o el cabezal revienten.",
          "example": "El sensor SMART 187 suele estar en 0. Si de repente salta a 8 o 12 errores en un solo d\u00EDa, el disco tiene un 80% de probabilidad de morir esa misma semana.",
          "tools": "An\u00E1lisis SHAP (abrir la caja negra del modelo), correlaciones estad\u00EDsticas y revisi\u00F3n f\u00EDsica"
        },
        {
          "level": 3,
          "name": "3. Predictivo (\u00BFQu\u00E9 va a pasar y cu\u00E1ndo?)",
          "badge": "Nivel 03: La Bola de Cristal",
          "question": "\u00BFQu\u00E9 discos de los que hoy est\u00E1n vivos van a morir en los pr\u00F3ximos 7 o 30 d\u00EDas?",
          "color": "#06b6d4",
          "detail": "Entrenar 8 clasificadores con XGBoost (un algoritmo de \u00E1rboles muy potente) para evaluar a diario la probabilidad de fallo con horizontes de 1, 2, 7 y 30 d\u00EDas, compensando el desbalance de datos.",
          "example": "El modelo XGBoost (N\u22647 d\u00EDas) analiza la telemetr\u00EDa de hoy y te dice: 'El disco con serial W300VJ3K tiene 84% de probabilidad de fallar antes del pr\u00F3ximo martes'. Detecta m\u00E1s del 52% de todas las muertes reales.",
          "tools": "Algoritmo XGBoost, Scikit-learn, scale_pos_weight = 17.04 y ventanas m\u00F3viles de 10 d\u00EDas"
        },
        {
          "level": 4,
          "name": "4. Prescriptivo (\u00BFQu\u00E9 acci\u00F3n exacta debemos tomar?)",
          "badge": "Nivel 04: Piloto Autom\u00E1tico",
          "question": "\u00BFQu\u00E9 orden operativa disparamos autom\u00E1ticamente?",
          "color": "#f97316",
          "detail": "Tomar la predicci\u00F3n y convertirla en una acci\u00F3n de negocio automatizada sin esperar a que un humano lo apruebe manualmente.",
          "example": "Si el modelo dice que la probabilidad de fallo a 7 d\u00EDas supera el 65%, el software del Storage Pod empieza a clonar silenciosamente los datos a un disco de repuesto a las 2:00 AM (hora de bajo tr\u00E1fico) y env\u00EDa una orden al t\u00E9cnico para cambiar el disco ya vac\u00EDo.",
          "tools": "Simuladores de costo-beneficio, scripts de orquestaci\u00F3n de Storage Pods y alertas autom\u00E1ticas"
        }
      ]
    },
    {
      "id": "big-data-desafio",
      "index": 3,
      "badge": "Big Data & Dimensiones",
      "title": "Big Data y Alta Dimensionalidad: El Desaf\u00EDo",
      "tagline": "Por qu\u00E9 124 columnas son imposibles de vigilar para un cerebro humano.",
      "description": "El archivo de Backblaze es una mina de oro con petabytes de informaci\u00F3n. Sin embargo, vigilar un centro de datos no es tan f\u00E1cil como mirar una luz verde o roja: cada disco reporta decenas de variables todos los d\u00EDas con esquemas que cambian y fabricantes que miden las cosas de forma completamente distinta.",
      "humanLimitation": {
        "title": "\u00BFPor qu\u00E9 un humano no puede hacer este trabajo a mano?",
        "text": "Imagina que eres el administrador del centro de datos y tienes 100,000 discos duros. Cada disco te entrega una hoja con 124 columnas de n\u00FAmeros todos los d\u00EDas a las 8:00 AM. \u00A1Eso significa analizar 12.4 millones de datos diarios! Ning\u00FAn equipo de ingenieros puede correlacionar 124 variables al mismo tiempo en su cabeza para adivinar cu\u00E1l fallar\u00E1. El Machine Learning (aprendizaje autom\u00E1tico) no es un lujo decorativo: es la \u00DANICA herramienta capaz de analizar simult\u00E1neamente 124 dimensiones y encontrar los patrones invisibles que delatan la muerte inminente del disco."
      },
      "fourVs": [
        {
          "v": "Volumen (Much\u00EDsimos datos)",
          "stat": "~55 GB en BigQuery",
          "color": "#0284c7",
          "desc": "Decenas de millones de filas de telemetr\u00EDa diaria acumulada entre 2013 y 2019. Tuvimos que usar Google BigQuery porque Excel o tu computadora colapsar\u00EDan al intentar abrirlo."
        },
        {
          "v": "Variedad (La torre de Babel)",
          "stat": "4 Fabricantes Distintos",
          "color": "#6366f1",
          "desc": "Seagate, Western Digital, HGST y Toshiba. Cada marca guarda los datos como le da la gana. Lo que para Seagate es temperatura en grados, para Western Digital puede ser un c\u00F3digo binario."
        },
        {
          "v": "Velocidad (Sin descanso)",
          "stat": "Fotos Diarias 24/7",
          "color": "#06b6d4",
          "desc": "Cada 24 horas, todos los discos activos en producci\u00F3n env\u00EDan una foto completa de sus sensores. Es un flujo constante que nunca se detiene."
        },
        {
          "v": "Veracidad (Datos sucios)",
          "stat": ">30% Columnas Vac\u00EDas",
          "color": "#f97316",
          "desc": "M\u00E1s de un tercio de las columnas ven\u00EDan con valores nulos (vac\u00EDos) porque muchos sensores no existen en ciertos modelos o el firmware no los reporta."
        }
      ],
      "growthChart": {
        "title": "Figura 1: La Explosi\u00F3n de Columnas S.M.A.R.T. (2013 - 2018)",
        "subtitle": "Pasamos de 40 a 62 atributos (\u00A1de 80 a 124 columnas en la tabla diaria!)",
        "data": [
          { "year": "2013", "attributes": 40, "columns": 80, "drivesMonitored": "27,134", "notes": "Esquema inicial simple con los sensores b\u00E1sicos" },
          { "year": "2014", "attributes": 45, "columns": 90, "drivesMonitored": "39,696", "notes": "Llegan los discos de 4TB con sensores de vibraci\u00F3n" },
          { "year": "2015", "attributes": 49, "columns": 98, "drivesMonitored": "56,224", "notes": "Se a\u00F1aden sensores de temperatura avanzada y flujo de aire" },
          { "year": "2016", "attributes": 53, "columns": 106, "drivesMonitored": "73,351", "notes": "Nuevos sensores para vigilar micro-vibraciones mec\u00E1nicas" },
          { "year": "2017", "attributes": 58, "columns": 116, "drivesMonitored": "93,240", "notes": "Llegan gigantes de 8TB y 10TB con atributos propietarios" },
          { "year": "2018", "attributes": 62, "columns": 124, "drivesMonitored": "106,983", "notes": "Esquema final: 62 atributos que duplican a 124 columnas" }
        ]
      },
      "smartExplanation": {
        "title": "\u00BFQu\u00E9 rayos es un atributo S.M.A.R.T. y por qu\u00E9 se duplican las columnas?",
        "concepts": [
          {
            "term": "S.M.A.R.T. (Sensores de Salud del Disco)",
            "explanation": "Es el 'tablero de instrumentos' que viene de f\u00E1brica dentro de cada disco duro (como el veloc\u00EDmetro, temperatura del aceite y alerta de frenos de un autom\u00F3vil). Monitorea sectores rotos, reintentos de lectura y horas de vida."
          },
          {
            "term": "Valor Normalizado (smart_X_normalized)",
            "explanation": "Un puntaje procesado por el fabricante (usualmente del 100 al 1). La regla es: cuanto m\u00E1s bajo sea este n\u00FAmero, m\u00E1s enfermo est\u00E1 el disco. El problema es que cada marca calcula este puntaje con su propia f\u00F3rmula secreta."
          },
          {
            "term": "Valor Crudo (smart_X_raw)",
            "explanation": "El valor real sin procesar que midi\u00F3 el sensor (por ejemplo: 'exactamente 14 sectores rotos' o '32,150 horas de encendido'). Es el dato m\u00E1s honesto y \u00FAtil para entrenar a la Inteligencia Artificial."
          }
        ]
      }
    },
    {
      "id": "ciclo-de-vida",
      "index": 4,
      "badge": "Metodolog\u00EDa",
      "title": "Ciclo de Vida de Data Analytics (6 Fases)",
      "tagline": "Rigor metodol\u00F3gico: c\u00F3mo transformar 55 GB de datos en alertas confiables.",
      "description": "Seguimos la metodolog\u00EDa CRISP-DM (el est\u00E1ndar mundial de la industria para proyectos de datos) adaptada a centros de datos. Cada fase garantiza que no demos pasos en falso ni nos enga\u00F1emos con falsos \u00E9xitos de laboratorio.",
      "phases": [
        {
          "phase": 1,
          "name": "1. Descubrimiento (Focalizar el objetivo)",
          "tag": "Fase 01: Negocio",
          "objective": "No mezclar peras con manzanas. Decidimos estudiar a fondo un solo modelo de disco: el Seagate ST4000DM000 (4 TB).",
          "script": "scripts/01_discovery_fleet_filter.sql",
          "scriptCode": "-- Filtrado de flota representativa en BigQuery\nSELECT model, COUNT(DISTINCT serial_number) as total_drives,\n       SUM(failure) as total_failures,\n       SAFE_DIVIDE(SUM(failure), COUNT(*)) * 100 * 365 as tasa_anual_fallos_afr\nFROM `backblaze_smart.daily_snapshots`\nWHERE date BETWEEN '2013-01-01' AND '2018-12-31'\nGROUP BY model\nHAVING total_drives > 5000\nORDER BY total_drives DESC;\n-- Elegimos el Seagate ST4000DM000: \u00A1m\u00E1s de 35,000 discos id\u00E9nticos para comparar con justicia!",
          "keyDeliverable": "Muestra homog\u00E9nea gigante: m\u00E1s de 35,000 discos id\u00E9nticos. Si mezclas marcas distintas, los modelos se confunden porque cada marca mide los sensores de manera diferente.",
          "metrics": "35,000+ unidades ST4000DM000 analizadas"
        },
        {
          "phase": 2,
          "name": "2. Preparaci\u00F3n de Datos (Limpiar y ordenar la casa)",
          "tag": "Fase 02: Limpieza",
          "objective": "Subir los archivos CSV gigantes a Google Cloud Storage (GCS), cargarlos en BigQuery y tirar a la basura las columnas con m\u00E1s de 30% de datos vac\u00EDos.",
          "script": "scripts/upload_to_gcs.sh",
          "scriptCode": "#!/usr/bin/env bash\n# Ingesta masiva y descompresi\u00F3n paralela en la nube de Google\ngsutil -m cp -r gs://backblaze-raw-data/*.zip ./raw_chunks/\nunzip './raw_chunks/*.zip' -d ./decompressed_csv/\n\n# Carga estructurada en BigQuery particionando por fecha diaria\nbq load --source_format=CSV --skip_leading_rows=1 \\\n  --time_partitioning_field=date \\\n  backblaze_lake.st4000_daily ./decompressed_csv/*.csv \\\n  schema_st4000.json",
          "keyDeliverable": "Limpieza total de datos sucios. Eliminamos columnas vac\u00EDas y creamos tablas particionadas por fecha para que las consultas no tarden horas ni cuesten una fortuna.",
          "metrics": "De 124 columnas crudas a los sensores S.M.A.R.T. de m\u00E1xima calidad"
        },
        {
          "phase": 3,
          "name": "3. Planificaci\u00F3n (Dividir los datos sin hacer trampa)",
          "tag": "Fase 03: Estrategia",
          "objective": "Evitar el Data Leakage (hacer trampa usando datos del futuro). Separamos el pasado para entrenar y el futuro para evaluar a ciegas.",
          "script": "scripts/create_ml_datasets.py",
          "scriptCode": "# Partici\u00F3n estricta Out-of-Time (fuera de tiempo)\nimport pandas as pd\nfrom google.cloud import bigquery\n\nclient = bigquery.Client()\nquery = '''\n  SELECT * FROM `backblaze_lake.features_st4000`\n  WHERE date >= '2019-01-01' -- CONJUNTO DE PRUEBA: A\u00F1o 2019 COMPLETO A CIEGAS\n'''\ntest_2019_df = client.query(query).to_dataframe()\nprint(f'Test 2019 listo: {len(test_2019_df)} filas y {test_2019_df.failure.sum()} fallos reales para evaluar.')",
          "keyDeliverable": "Partici\u00F3n Out-of-Time (fuera del tiempo): Entrenamos a la IA con datos de 2013 a 2018 y la pusimos a prueba con el a\u00F1o 2019 completo sin que pudiera ver el futuro. \u00A1Exactamente como ocurrir\u00E1 en la vida real!",
          "metrics": "165 fallos reales en 2019 para la prueba de fuego"
        },
        {
          "phase": 4,
          "name": "4. Construcci\u00F3n del Modelo (Entrenar a la IA)",
          "tag": "Fase 04: Entrenamiento",
          "objective": "Entrenar 8 modelos de XGBoost (un algoritmo de \u00E1rboles muy potente) con horizontes de 1, 2, 7 y 30 d\u00EDas, usando scale_pos_weight = 17.04.",
          "script": "scripts/train_xgboost_classifiers.py",
          "scriptCode": "import xgboost as xgb\n\n# Configuramos la penalizaci\u00F3n por desbalance\n# Por cada 17 discos sanos hay 1 que falla: castigamos 17x los falsos negativos\nscale_pos_weight = 17.04\n\nparams = {\n    'objective': 'binary:logistic',\n    'max_depth': 6,              # Profundidad del \u00E1rbol de decisi\u00F3n\n    'learning_rate': 0.05,        # Paso de aprendizaje cuidadoso\n    'n_estimators': 300,          # 300 \u00E1rboles trabajando en equipo\n    'scale_pos_weight': scale_pos_weight\n}\n\nmodel = xgb.XGBClassifier(**params)\nmodel.fit(X_train, y_train)",
          "keyDeliverable": "8 modelos calibrados para priorizar el Recall (atrapar todos los fallos posibles) en lugar de una precisi\u00F3n ingenua que deje morir discos.",
          "metrics": "8 clasificadores listos (horizontes de 1, 2, 7 y 30 d\u00EDas)"
        },
        {
          "phase": 5,
          "name": "5. Comunicaci\u00F3n (Explicar las razones de la IA)",
          "tag": "Fase 05: Interpretabilidad",
          "objective": "Abrir la caja negra usando SHAP (herramienta para explicar las decisiones del modelo) y traducir los resultados a dinero y riesgos para los gerentes.",
          "script": "scripts/explain_shap_importance.py",
          "scriptCode": "import shap\n# Abrimos la 'caja negra' para ver qu\u00E9 sensor pes\u00F3 m\u00E1s\nexplainer = shap.TreeExplainer(model)\nshap_values = explainer.shap_values(X_test)\n\n# Graficamos las variables que m\u00E1s importan\nshap.summary_plot(shap_values, X_test, plot_type='bar')\n# \u00A1Sorpresa!: Las horas de encendido (SMART 9) salieron en 3er lugar.",
          "keyDeliverable": "Descubrimiento de oro: los sensores cl\u00E1sicos son cruciales, pero SMART 9 (las horas de vida acumuladas) le ense\u00F1a al modelo que los errores en discos viejos son 10 veces m\u00E1s peligrosos.",
          "metrics": "Top 10 variables explicadas con f\u00EDsica real del disco"
        },
        {
          "phase": 6,
          "name": "6. Operacionalizaci\u00F3n (Ponerlo en producci\u00F3n)",
          "tag": "Fase 06: MLOps",
          "objective": "Automatizar la inferencia diaria para que el modelo corra solo cada medianoche, alerte a los t\u00E9cnicos y clone datos antes del colapso.",
          "script": "scripts/mlops_inference_pipeline.py",
          "scriptCode": "# Pipeline autom\u00E1tico que corre todas las noches en el datacenter\ndef rutina_nocturna_inferencia(fecha_hoy):\n    telemetria_hoy = descargar_snapshots_smart(fecha_hoy)\n    variables_10d = calcular_ventanas_moviles_10d(telemetria_hoy)\n    probabilidad_fallo = modelo_entrenado.predict_proba(variables_10d)[:, 1]\n    \n    # Si la probabilidad es alta, disparamos migraci\u00F3n preventiva\n    discos_en_riesgo = telemetria_hoy[probabilidad_fallo > 0.65]\n    iniciar_clonacion_preventiva(discos_en_riesgo['serial_number'])\n    notificar_a_ingenieros(discos_en_riesgo)",
          "keyDeliverable": "Sistema aut\u00F3nomo: la IA revisa los 100,000 discos en menos de 15 minutos cada noche y programa las evacuaciones de datos autom\u00E1ticamente.",
          "metrics": "Inferencia de toda la flota en <15 minutos"
        }
      ]
    },
    {
      "id": "ingenieria-datos",
      "index": 5,
      "badge": "Feature Engineering",
      "title": "Ingenier\u00EDa de Datos y Feature Engineering",
      "tagline": "Capturando la pel\u00EDcula completa: de una foto fija a ventanas m\u00F3viles de 10 d\u00EDas.",
      "description": "Si un mec\u00E1nico revisa tu coche solo 1 segundo, no sabe si el motor est\u00E1 recalentado o simplemente caliente por el sol. Lo mismo pasa con los discos duros: una sola lectura instant\u00E1nea no dice casi nada. Un disco puede tener 2 sectores da\u00F1ados y funcionar 5 a\u00F1os m\u00E1s sin problemas. Lo que delata la muerte inminente no es un n\u00FAmero puntual, sino la velocidad a la que ese n\u00FAmero crece en el tiempo.",
      "rollingWindowMetaphor": {
        "title": "\u00BFQu\u00E9 es exactamente una 'ventana m\u00F3vil de 10 d\u00EDas'?",
        "quote": "Es como tomar una pel\u00EDcula de los \u00FAltimos 10 d\u00EDas de vida del disco en lugar de una sola foto est\u00E1tica. Todos los d\u00EDas nos preguntamos: \u00BFcu\u00E1l fue el error m\u00E1s alto en los \u00FAltimos 10 d\u00EDas? \u00BFcu\u00E1l fue el promedio? \u00BFsubi\u00F3 de golpe ayer? Eso le da contexto temporal a la Inteligencia Artificial: un disco con 5 errores que lleva 2 a\u00F1os quieto no nos asusta, pero un disco que pas\u00F3 de 0 a 5 errores en las \u00FAltimas 48 horas tiene la se\u00F1al de alarma encendida y el contador regresivo activado."
      },
      "rollingWindowDetails": {
        "windowSize": "Ventana M\u00F3vil de 10 D\u00EDas",
        "aggregations": [
          { "func": "Media M\u00F3vil (rolling_mean)", "desc": "El promedio del sensor en los \u00FAltimos 10 d\u00EDas. Sirve para suavizar picos aislados o errores falsos moment\u00E1neos." },
          { "func": "Varianza / Volatilidad (rolling_var)", "desc": "Mide qu\u00E9 tan loco e inestable se est\u00E1 comportando el sensor. Si la varianza se dispara, el cabezal est\u00E1 temblando." },
          { "func": "Valor M\u00EDnimo (rolling_min)", "desc": "El piso m\u00E1s bajo registrado durante los \u00FAltimos 10 d\u00EDas como punto de comparaci\u00F3n." },
          { "func": "Valor M\u00E1ximo (rolling_max)", "desc": "El peor pico de estr\u00E9s o calor alcanzado en los \u00FAltimos 10 d\u00EDas." },
          { "func": "\u00DAltima Lectura / Delta (last_reading)", "desc": "La diferencia neta entre hoy y hace 10 d\u00EDas. Si subi\u00F3 mucho en poco tiempo, el disco est\u00E1 agonizando." }
        ]
      },
      "imbalanceChallenge": {
        "ratio": "> 100 discos sanos : 1 disco roto",
        "healthyPct": "99.0%+",
        "failedPct": "< 1.0%",
        "explanation": "En un centro de datos bien mantenido, los discos casi nunca fallan. El 99% de los discos reportan estar felices y sanos. Si un modelo fuera perezoso y predijera siempre 'Sano', tendr\u00EDa un 99% de acierto... \u00A1pero dejar\u00EDa morir al 100% de los discos rotos y nos costar\u00EDa millones de d\u00F3lares! Por eso tuvimos que castigar los descuidos matem\u00E1ticamente."
      },
      "pipelineFlow": [
        {
          "step": 1,
          "id": "ingest",
          "title": "1. Ingesta CSV Crudos",
          "subtitle": "Archivos diarios comprimidos",
          "icon": "database",
          "desc": "Archivos gigantes con serial, modelo, fecha, bandera de fallo (0 o 1) y hasta 124 columnas de telemetr\u00EDa.",
          "sqlExample": "COPY raw_smart FROM 'gs://backblaze-raw/*.csv';"
        },
        {
          "step": 2,
          "id": "bigquery",
          "title": "2. Google BigQuery",
          "subtitle": "Almac\u00E9n masivo en la nube",
          "icon": "server",
          "desc": "Tablas organizadas y particionadas por fecha para que las consultas vuelen en segundos.",
          "sqlExample": "PARTITION BY date CLUSTER BY model, serial_number"
        },
        {
          "step": 3,
          "id": "filter",
          "title": "3. Filtrado de Nulos",
          "subtitle": "Limpieza de columnas vac\u00EDas",
          "icon": "filter",
          "desc": "Tiramos a la basura sensores que el modelo Seagate 4TB no usa y nos quedamos con los datos limpios.",
          "sqlExample": "WHERE null_percentage < 0.30 AND model = 'ST4000DM000'"
        },
        {
          "step": 4,
          "id": "windows",
          "title": "4. Ventanas de 10 D\u00EDas",
          "subtitle": "Promedios, saltos y picos",
          "icon": "sliders",
          "desc": "Calculamos la media, varianza, m\u00E1ximo y \u00FAltima lectura de los \u00FAltimos 10 d\u00EDas para cada disco.",
          "sqlExample": "AVG(smart_5_raw) OVER(PARTITION BY serial_number ORDER BY date ROWS BETWEEN 9 PRECEDING AND CURRENT ROW)"
        },
        {
          "step": 5,
          "id": "ready",
          "title": "5. Matriz Lista para XGBoost",
          "subtitle": "La tabla dorada de ML",
          "icon": "check-circle",
          "desc": "Una tabla inteligente lista para alimentar a la IA con contexto temporal y etiqueta de si fallar\u00E1 en 7 d\u00EDas.",
          "sqlExample": "EXPORT DATA OPTIONS(format='PARQUET') AS SELECT * FROM ml_ready_matrix;"
        }
      ]
    },
    {
      "id": "torneo-algoritmos",
      "index": 6,
      "badge": "Benchmarking & F2-Score",
      "title": "El Torneo de Algoritmos y las Matem\u00E1ticas del Modelo",
      "tagline": "Evaluaci\u00F3n rigurosa a ciegas sobre 165 fallos reales del a\u00F1o 2019.",
      "description": "Pusimos a competir los diferentes m\u00E9todos bajo las mismas reglas del juego: evaluados sobre el a\u00F1o 2019 a ciegas (Out-of-Time). Aqu\u00ED ver\u00E1s las f\u00F3rmulas que usamos explicadas en lenguaje natural y la tabla comparativa interactiva.",
      "mathFormulas": [
        {
          "id": "formula-imbalance",
          "title": "A) El Castigo al Desbalance: scale_pos_weight",
          "badge": "Compensación de Clases",
          "color": "#f97316",
          "latex": "\\text{scale\\_pos\\_weight} = \\frac{\\sum_{i: y_i=0} 1}{\\sum_{i: y_i=1} 1} = \\frac{88{,}790 \\text{ sanos}}{5{,}210 \\text{ rotos}} = \\mathbf{17.04}",
          "predictionPurpose": "Compensación Asimétrica en Predicción: Escala por 17.04 el gradiente de error de los discos en fallo durante el entrenamiento de XGBoost, evitando el submuestreo 50-50 que en producción disparó las falsas alarmas a 1,105.",
          "apaCitation": {
            "refId": "REF-04",
            "shortCite": "(Chen & Guestrin, 2016; Datatonic, s. f.-b)",
            "detail": "Chen & Guestrin (2016), KDD '16, pp. 785–794 — Ponderación de gradiente para clases desbalanceadas; Datatonic (s. f.-b) — Análisis empírico del desbalance en Backblaze."
          },
          "plainExplanation": "Imagina que en un salón hay 17 alumnos tranquilos y 1 alumno revoltoso. Si el profesor no presta atención, tenderá a ignorar al revoltoso porque es minoría. Esta fórmula le dice a la Inteligencia Artificial: 'Oye, sé que por cada disco moribundo hay 17 discos sanos, pero te voy a castigar 17 veces más duro si dejas pasar un disco que estaba a punto de morir'.",
          "variables": [
            { "name": "Casos Negativos (88,790)", "desc": "Días en los que los discos operaron normalmente sin romperse (la inmensa mayoría)." },
            { "name": "Casos Positivos (5,210)", "desc": "Días críticos en los que los discos estaban a punto de fallar en la ventana temporal." },
            { "name": "Resultado = 17.04", "desc": "El factor por el que multiplicamos el error de la IA cuando deja escapar un disco roto." }
          ]
        },
        {
          "id": "formula-f2",
          "title": "B) La Métrica Reina: F2-Score (Recall vale el doble)",
          "badge": "Evaluación del Negocio",
          "color": "#06b6d4",
          "latex": "F_2 = (1 + 2^2) \\times \\frac{\\text{Precisión} \\times \\text{Recall}}{2^2 \\times \\text{Precisión} + \\text{Recall}} = 5 \\times \\frac{\\text{Precisión} \\times \\text{Recall}}{4 \\times \\text{Precisión} + \\text{Recall}}",
          "predictionPurpose": "Selección del Modelo y Calibración de Umbral: Evalúa la calidad predictiva ponderando el Recall con el doble de importancia (β = 2) que la Precisión, penalizando severamente los Falsos Negativos (discos que mueren sin aviso en el Storage Pod).",
          "apaCitation": {
            "refId": "REF-09",
            "shortCite": "(Susto et al., 2015; Alfaro Arriola, 2026a)",
            "detail": "Susto et al. (2015), IEEE Trans. Ind. Informatics, 11(3), 812–820 — Métricas asimétricas en mantenimiento predictivo; Alfaro Arriola (2026a) — Fase 1 y 4 del Ciclo de Vida."
          },
          "plainExplanation": "El F2-Score es el promedio ponderado entre la Precisión (cuántas alarmas fueron reales) y el Recall (capacidad de cazar todos los fallos), pero le da exactamente el DOBLE de importancia al Recall. ¿Por qué? Porque en un centro de datos es preferible que el técnico revise por gusto un disco sano (falsa alarma de $45 USD) a que un disco reviente por sorpresa, destruya el RAID y se pierdan terabytes de clientes ($450 USD + catástrofe de reputación).",
          "variables": [
            { "name": "Recall (Sensibilidad)", "desc": "¿De los 165 discos que se rompieron, a cuántos atrapamos antes de que murieran? (Peso x2)" },
            { "name": "Precisión", "desc": "¿De cada 100 veces que la IA gritó '¡Fallo!', cuántas eran discos que realmente iban a morir? (Peso x1)" },
            { "name": "El Factor 5 y 4", "desc": "Constantes matemáticas derivadas de $\\beta = 2$ que garantizan que el Recall pese matemáticamente el doble que la Precisión." }
          ]
        },
        {
          "id": "formula-xgboost",
          "title": "C) El Cerebro de XGBoost: La Función Objetivo Regularizada",
          "badge": "Equilibrio Matemático",
          "color": "#10b981",
          "latex": "\\mathcal{L}_{\\text{Obj}}(\\Theta) = \\underbrace{\\sum_{i=1}^{n} l\\left(y_i, \\, \\hat{y}_i\\right)}_{\\text{Pérdida (Errores cometidos)}} + \\underbrace{\\sum_{k=1}^{K} \\Omega(f_k)}_{\\text{Complejidad (Castigo por memorizar)}}",
          "predictionPurpose": "Motor de Aprendizaje Supervisado Aditivo: Minimiza simultáneamente el error de predicción logística sobre la probabilidad de fallo del disco y la complejidad estructural de los árboles (regularización L1/L2) para generalizar fuera de muestra (test_2019).",
          "apaCitation": {
            "refId": "REF-04",
            "shortCite": "(Chen & Guestrin, 2016, Ec. 2)",
            "detail": "Chen, T., & Guestrin, C. (2016). XGBoost: A scalable tree boosting system. ACM SIGKDD, pp. 785–794, Sección 2.1 (Regularized Learning Objective)."
          },
          "plainExplanation": "XGBoost no es magia negra: es una balanza matemática inteligente. Por un lado intenta cometer el mínimo de errores posibles prediciendo fallos (Pérdida). Pero por el otro, tiene un freno de mano automático que le impide volverse loco y memorizarse los datos de memoria (Complejidad). Gracias a este freno, el modelo no se engaña a sí mismo en el laboratorio y funciona de maravilla con discos nuevos en el centro de datos real.",
          "variables": [
            { "name": "Pérdida (Loss)", "desc": "Mide cuántos fallos no predijo o cuántas falsas alarmas dio en los datos de entrenamiento." },
            { "name": "Complejidad (Regularización L1/L2)", "desc": "Pena a los árboles que tienen demasiadas ramas o ramas demasiado enredadas." },
            { "name": "Equilibrio", "desc": "El modelo busca el punto dulce donde aprende los patrones reales de degradación sin aprenderse el ruido." }
          ]
        },
        {
          "id": "formula-rolling-smart",
          "title": "D) Ventanas Móviles S.M.A.R.T. (10 Días) y Horizonte N",
          "badge": "Feature Engineering Temporal",
          "color": "#0284c7",
          "latex": "\\mu_{10\\text{d}}(\\text{SMART}_k) = \\frac{1}{10}\\sum_{j=0}^{9} x_{k, t-j} \\quad ; \\quad \\sigma_{10\\text{d}}(\\text{SMART}_k) = \\sqrt{\\frac{1}{10}\\sum_{j=0}^{9}\\big(x_{k, t-j} - \\mu_{10\\text{d}}\\big)^2}",
          "predictionPurpose": "Captura de Velocidad de Degradación Electromecánica: Transforma lecturas S.M.A.R.T. estáticas (atributos 5, 187, 188, 197, 198) en tendencias dinámicas de los últimos 10 días para alimentar los clasificadores de horizonte N ∈ {1, 2, 7, 30} días.",
          "apaCitation": {
            "refId": "REF-06",
            "shortCite": "(Datatonic, s. f.-b; Susto et al., 2015)",
            "detail": "Datatonic (s. f.-b) — Rolling windows de 10 días sobre telemetría S.M.A.R.T.; Susto et al. (2015) — Enfoque de múltiples clasificadores por horizonte N."
          },
          "plainExplanation": "Una sola lectura de un sensor no revela si el deterioro es antiguo o si acaba de acelerarse ayer. Al calcular la media μ y la desviación estándar σ de los últimos 10 días, el modelo detecta saltos abruptos en sectores dañados antes del colapso físico.",
          "variables": [
            { "name": "Media Móvil 10d ($\\mu_{10\\text{d}}$)", "desc": "Nivel promedio reciente del contador S.M.A.R.T. suavizando ruido transitorio." },
            { "name": "Volatilidad 10d ($\\sigma_{10\\text{d}}$)", "desc": "Mide la aceleración o inestabilidad brusca del atributo en los 10 días previos al fallo." },
            { "name": "Horizonte $N \\in \\{1, 2, 7, 30\\}$", "desc": "Ventana de anticipación en días para emitir la orden preventiva de migración de datos." }
          ]
        },
        {
          "id": "formula-shapley",
          "title": "E) Atribución Aditiva de Shapley (Explicabilidad SHAP)",
          "badge": "Auditoría XAI (Caja Blanca)",
          "color": "#7c3aed",
          "latex": "\\phi_j(f, \\mathbf{x}) = \\sum_{S \\subseteq F \\setminus \\{j\\}} \\frac{|S|!\\big(|F| - |S| - 1\\big)!}{|F|!} \\Big[f_x(S \\cup \\{j\\}) - f_x(S)\\Big]",
          "predictionPurpose": "Explicabilidad Global y Local de Predicciones: Descompone la probabilidad de fallo predicha por XGBoost en la contribución marginal exacta φ_j de cada sensor S.M.A.R.T., revelando el efecto multiplicador de la edad del disco (SMART 9 Raw).",
          "apaCitation": {
            "refId": "REF-08",
            "shortCite": "(Lundberg & Lee, 2017; Datatonic, s. f.-b)",
            "detail": "Lundberg, S. M., & Lee, S.-I. (2017). A unified approach to interpreting model predictions. NeurIPS 30, pp. 4765–4774 (Ecuación de valores de Shapley)."
          },
          "plainExplanation": "Basada en la teoría de juegos cooperativos de Lloyd Shapley, esta ecuación evalúa todas las coaliciones posibles de sensores S.M.A.R.T. para determinar con justicia matemática cuántos puntos de riesgo aportó cada sensor al diagnóstico de un disco duro específico.",
          "variables": [
            { "name": "Contribución Marginal $\\phi_j$", "desc": "Impacto exacto del sensor $j$ (ej. SMART 187 o SMART 9) sobre el log-odds de fallo." },
            { "name": "Subconjuntos $S \\subseteq F \\setminus \\{j\\}$", "desc": "Coaliciones de las demás variables evaluadas con y sin el sensor $j$." },
            { "name": "Propiedad de Aditividad", "desc": "La suma de todos los $\\phi_j$ más el valor base reproduce exactamente la predicción de XGBoost." }
          ]
        }
      ],
      "table7": {
        "title": "Tabla 7: Resultados Comparativos en el Conjunto de Test 2019 (165 Fallos Reales)",
        "subtitle": "Haz clic en cualquier fila para abrir el diagn\u00F3stico en profundidad de por qu\u00E9 fall\u00F3 o triunf\u00F3 ese modelo.",
        "columns": [
          { "key": "model", "label": "Estrategia / Algoritmo", "type": "string" },
          { "key": "type", "label": "Tipo de Enfoque", "type": "string" },
          { "key": "missed", "label": "Discos Rotos Omitidos (FN)", "type": "number", "tooltip": "Discos que murieron sin que nadie avisara. Menor es mejor." },
          { "key": "detected", "label": "Fallos Detectados (TP)", "type": "number", "tooltip": "Discos salvados a tiempo antes de romper. Mayor es mejor." },
          { "key": "falseAlarms", "label": "Falsas Alarmas (FP)", "type": "number", "tooltip": "Alarmas donde el disco no iba a morir. Menor es mejor." },
          { "key": "recall", "label": "Recall / Sensibilidad (%)", "type": "percent" },
          { "key": "precision", "label": "Precisi\u00F3n (%)", "type": "percent" },
          { "key": "f2", "label": "F2-Score", "type": "number" },
          { "key": "evaluation", "label": "Veredicto Operativo", "type": "string" }
        ],
        "rows": [
          {
            "id": "r2f",
            "model": "1. Run-to-Failure (Usar hasta que reviente)",
            "type": "Reactivo (L\u00EDnea base)",
            "missed": 165,
            "detected": 0,
            "falseAlarms": 0,
            "recall": 0.0,
            "precision": 0.0,
            "f2": 0.000,
            "evaluation": "P\u00E9simo. El 100% de los fallos ocurren por sorpresa en producci\u00F3n viva.",
            "isBaseline": true,
            "diagnosisTitle": "\u00BFPor qu\u00E9 fracasa Run-to-Failure?",
            "diagnosisText": "No hace ninguna predicci\u00F3n: espera a que el disco muera. Los 165 discos se rompieron sin aviso previo. Provoc\u00F3 165 reconstrucciones de emergencia en los Storage Pods con m\u00E1s de 2,300 horas de servidores en estado vulnerable."
          },
          {
            "id": "heuristic",
            "model": "2. Heur\u00EDstica Backblaze (Regla est\u00E1tica SMART > 0)",
            "type": "Regla manual humana",
            "missed": 140,
            "detected": 25,
            "falseAlarms": 890,
            "recall": 15.15,
            "precision": 2.73,
            "f2": 0.076,
            "evaluation": "Se ahoga en falsas alarmas (890) y solo rescata 25 discos de 165.",
            "isHeuristic": true,
            "diagnosisTitle": "\u00BFPor qu\u00E9 fall\u00F3 la Heur\u00EDstica manual de taller?",
            "diagnosisText": "Es una regla r\u00EDgida inventada por humanos: 'Si cualquiera de los 5 sensores SMART cr\u00EDticos es mayor a 0, suena la alarma'. \u00BFEl resultado? Un desastre en la pr\u00E1ctica. Como muchos discos tienen errores leves tolerables de f\u00E1brica que no causan la muerte inmediata, dispar\u00F3 890 FALSAS ALARMAS el d\u00EDa 1, colapsando a los t\u00E9cnicos con alarmas in\u00FAtiles, mientras que dej\u00F3 escapar 140 roturas reales que murieron por causas que esa regla simple no contemplaba."
          },
          {
            "id": "rf",
            "model": "3. Random Forest (\u00C1rboles cl\u00E1sicos sin compensaci\u00F3n)",
            "type": "Bagging de \u00C1rboles",
            "missed": 159,
            "detected": 6,
            "falseAlarms": 4,
            "recall": 3.64,
            "precision": 60.00,
            "f2": 0.045,
            "evaluation": "Colapso por desbalance: como casi ning\u00FAn disco falla, predice casi siempre 'Sano'.",
            "isImbalanceCollapsed": true,
            "diagnosisTitle": "\u00BFPor qu\u00E9 colaps\u00F3 Random Forest cl\u00E1sico?",
            "diagnosisText": "Fue v\u00EDctima del desbalance extremo de clases. Al no configurarle una penalizaci\u00F3n matem\u00E1tica (scale_pos_weight), el algoritmo se volvi\u00F3 perezoso: descubri\u00F3 que si predec\u00EDa 'El disco est\u00E1 sano' el 99% de las veces, obten\u00EDa un Accuracy alt\u00EDsimo en el examen. \u00BFLa consecuencia? Dej\u00F3 morir a 159 de los 165 discos reales sin decir una sola palabra."
          },
          {
            "id": "xgb-no-hist",
            "model": "4. XGBoost sin historia (N \u2264 7 d\u00EDas) \u2014 \u00A1El Ganador Operativo!",
            "type": "Gradient Boosting + Penalizaci\u00F3n",
            "missed": 79,
            "detected": 86,
            "falseAlarms": 68,
            "recall": 52.12,
            "precision": 55.84,
            "f2": 0.528,
            "evaluation": "CAMPE\u00D3N OPERATIVO: Salva m\u00E1s de la mitad de los discos manteniendo las falsas alarmas bajo control.",
            "isOptimal": true,
            "diagnosisTitle": "\u00BFPor qu\u00E9 XGBoost sin historia es el campe\u00F3n para el datacenter?",
            "diagnosisText": "Es el punto de equilibrio perfecto para un negocio real. Detect\u00F3 86 de los 165 fallos reales (un impresionante 52.12% de sensibilidad en test ciego) y redujo las falsas alarmas a tan solo 68 en todo el a\u00F1o (frente a las 890 de la regla humana). Los t\u00E9cnicos de Backblaze reciben alertas confiables y tienen 7 d\u00EDas enteros para cambiar el disco con tranquilidad."
          },
          {
            "id": "xgb-hist",
            "model": "5. XGBoost con historia (Ventanas m\u00F3viles de 10 d\u00EDas)",
            "type": "Gradient Boosting + Rolling Windows",
            "missed": 63,
            "detected": 102,
            "falseAlarms": 312,
            "recall": 61.82,
            "precision": 24.64,
            "f2": 0.478,
            "evaluation": "M\u00E1ximo cazador de fallos (102 salvados), pero triplica las falsas alarmas (312).",
            "isMaxRecall": true,
            "diagnosisTitle": "\u00BFPor qu\u00E9 XGBoost con historia tiene el r\u00E9cord de detecci\u00F3n pero pierde en eficiencia?",
            "diagnosisText": "Atrap\u00F3 102 fallos reales (un r\u00E9cord del 61.82% de Recall), m\u00E1s que ning\u00FAn otro algoritmo. Sin embargo, al mirar la varianza de los \u00FAltimos 10 d\u00EDas se volvi\u00F3 demasiado paranoico: gener\u00F3 312 falsas alarmas. En un centro de datos con t\u00E9cnicos limitados, 312 alarmas saturan la cola de trabajo. Por eso el modelo sin historia sigue siendo el preferido operativamente."
          }
        ]
      }
    },
    {
      "id": "interpretabilidad-shap",
      "index": 7,
      "badge": "Interpretabilidad & SHAP",
      "title": "Interpretabilidad del Modelo: Abriendo la Caja Negra",
      "tagline": "Entendiendo qu\u00E9 mir\u00F3 la Inteligencia Artificial y la gran sorpresa de las horas de encendido.",
      "description": "A nadie le gusta confiar a ciegas en un modelo que dice 'este disco va a morir' sin explicar por qu\u00E9. Usamos SHAP (un m\u00E9todo basado en teor\u00EDa de juegos) para calcular exactamente cu\u00E1ntos puntos de sospecha aport\u00F3 cada sensor en la decisi\u00F3n final de la IA.",
      "figure2": {
        "title": "Figura 2: Qu\u00E9 Sensores le Importaron m\u00E1s a XGBoost (SHAP y F-Score)",
        "subtitle": "Los 5 sensores cl\u00E1sicos lideran, pero SMART 9 Raw (las horas de vida del disco) dio la gran sorpresa en 3er puesto",
        "features": [
          {
            "rank": 1,
            "feature": "smart_187_raw",
            "name": "SMART 187 Raw (Errores que el disco no pudo corregir)",
            "importance": 0.285,
            "type": "heuristic",
            "color": "#f97316",
            "explanation": "El sensor m\u00E1s letal de todos. Cuenta los errores de lectura y escritura que ni siquiera los circuitos de correcci\u00F3n del disco pudieron arreglar. Si este n\u00FAmero sube de golpe, el cabezal o los platos magn\u00E9ticos est\u00E1n sufriendo da\u00F1o f\u00EDsico irreversible. El disco suele morir en menos de 7 d\u00EDas."
          },
          {
            "rank": 2,
            "feature": "smart_197_raw",
            "name": "SMART 197 Raw (Sectores inestables pendientes de reparaci\u00F3n)",
            "importance": 0.210,
            "type": "heuristic",
            "color": "#f97316",
            "explanation": "Zonas magn\u00E9ticas enfermas del disco que no se pueden leer bien y est\u00E1n en lista de espera para ser reubicadas. Es el segundo s\u00EDntoma m\u00E1s claro de que la superficie magn\u00E9tica se est\u00E1 desintegrando."
          },
          {
            "rank": 3,
            "feature": "smart_9_raw",
            "name": "SMART 9 Raw (Horas de encendido / Edad acumulada)",
            "importance": 0.165,
            "type": "age-context",
            "color": "#06b6d4",
            "explanation": "\u00A1EL GRAN HALLAZGO DE LA INVESTIGACI\u00D3N! Qued\u00F3 en 3er puesto general. Demuestra que XGBoost no juzga los errores de forma aislada: contextualiza el riesgo seg\u00FAn la edad del disco. Un sector defectuoso en un disco reci\u00E9n instalado puede ser un fallo pasajero; pero el mismo sector defectuoso en un disco con 35,000 horas de uso (4 a\u00F1os sin apagarse) es una sentencia de muerte casi segura."
          },
          {
            "rank": 4,
            "feature": "smart_5_raw",
            "name": "SMART 5 Raw (Sectores reasignados / Cicatrices permanentes)",
            "importance": 0.125,
            "type": "heuristic",
            "color": "#f97316",
            "explanation": "Muestra cu\u00E1ntos sectores da\u00F1ados el disco ya tuvo que aislar y reemplazar usando su pista de reserva. Son cicatrices permanentes que indican desgaste del plato."
          },
          {
            "rank": 5,
            "feature": "smart_188_raw",
            "name": "SMART 188 Raw (Timeouts y bloqueos de comunicaci\u00F3n)",
            "importance": 0.085,
            "type": "heuristic",
            "color": "#f97316",
            "explanation": "Veces en las que el servidor le pidi\u00F3 datos al disco y este se qued\u00F3 colgado sin responder a tiempo. Avisa de problemas electr\u00F3nicos, de cableado o de la placa del disco."
          },
          {
            "rank": 6,
            "feature": "smart_198_raw",
            "name": "SMART 198 Raw (Sectores da\u00F1ados detectados en reposo)",
            "importance": 0.065,
            "type": "heuristic",
            "color": "#f97316",
            "explanation": "Sectores podridos que el disco descubri\u00F3 mientras hac\u00EDa auto-escaneos silenciosos de mantenimiento cuando nadie lo estaba usando."
          },
          {
            "rank": 7,
            "feature": "rolling_mean_smart_187",
            "name": "Promedio M\u00F3vil 10d (SMART 187)",
            "importance": 0.040,
            "type": "derived",
            "color": "#10b981",
            "explanation": "El promedio de errores incorregibles en los \u00FAltimos 10 d\u00EDas. Si este promedio se mantiene alto, confirma que el fallo no fue una mota de polvo pasajera sino un da\u00F1o continuo."
          },
          {
            "rank": 8,
            "feature": "smart_193_raw",
            "name": "SMART 193 Raw (Ciclos de aparcado del cabezal)",
            "importance": 0.025,
            "type": "mechanical",
            "color": "#6366f1",
            "explanation": "Veces que los cabezales salieron del disco a descansar en la rampa mec\u00E1nica. Mide el estr\u00E9s puramente mec\u00E1nico del motor y del actuador."
          }
        ]
      }
    },
    {
      "id": "conclusiones-mlops",
      "index": 8,
      "badge": "Conclusiones & MLOps",
      "title": "Conclusiones y Hoja de Ruta hacia Producci\u00F3n (MLOps)",
      "tagline": "Del experimento en la laptop al centro de datos en piloto autom\u00E1tico.",
      "description": "Un modelo de Inteligencia Artificial que solo vive en la computadora de un cient\u00EDfico de datos no le ahorra ni un solo d\u00F3lar a la empresa. Para que esto genere valor real, debe integrarse en el software de los Storage Pods y funcionar 24/7 sin romperse.",
      "animatedCounters": [
        { "id": "counter-failures", "target": 165, "unit": "fallos", "label": "Fallos Reales en Test 2019", "desc": "Evaluados a ciegas sin hacer trampa" },
        { "id": "counter-models", "target": 8, "unit": "modelos", "label": "Modelos XGBoost Entrenados", "desc": "Horizontes de 1 a 30 d\u00EDas" },
        { "id": "counter-days", "target": 10, "unit": "d\u00EDas", "label": "D\u00EDas de Contexto Hist\u00F3rico", "desc": "Pel\u00EDcula completa con ventanas m\u00F3viles" },
        { "id": "counter-gb", "target": 55, "unit": "GB", "label": "Datos en BigQuery", "desc": "Millones de lecturas diarias procesadas" }
      ],
      "table8": {
        "title": "Tabla 8: Los 4 Pasos Clave para Poner el Modelo en Producci\u00F3n (Fase 2)",
        "pillars": [
          {
            "pillar": 1,
            "name": "1. Muestreo Inteligente con el 100% de la Flota",
            "tag": "Datos",
            "color": "#0284c7",
            "current": "Entrenamos con muestras de discos equilibradas a mano.",
            "production": "Alimentar al modelo con el 100% de los discos en vivo mediante t\u00E9cnicas de streaming que seleccionan en tiempo real los ejemplos m\u00E1s dif\u00EDciles (Hard Negative Mining).",
            "impact": "El modelo aprende todas las rarezas posibles y no se asusta con situaciones extra\u00F1as del mundo real."
          },
          {
            "pillar": 2,
            "name": "2. Redes Neuronales Temporales (LSTM y CNN 1D)",
            "tag": "Modelado",
            "color": "#6366f1",
            "current": "Ventanas m\u00F3viles fijas de 10 d\u00EDas calculadas con SQL.",
            "production": "Implementar redes neuronales que aprenden solas la m\u00FAsica y el ritmo del desgaste sin necesidad de programar medias ni varianzas a mano.",
            "impact": "Detecta patrones de vibraci\u00F3n microsc\u00F3picos semanas antes de que se reflejen en los contadores habituales."
          },
          {
            "pillar": 3,
            "name": "3. Integraci\u00F3n en el Software de Almacenamiento",
            "tag": "Sistemas",
            "color": "#06b6d4",
            "current": "Predicciones que se ejecutaban en scripts y notebooks.",
            "production": "Conectar el modelo directamente a la API de los Storage Pods: cuando un disco supera el 65% de riesgo, el servidor migra sus datos solo sin esperar a que un humano presione un bot\u00F3n.",
            "impact": "Cero llamadas de p\u00E1nico a las 3:00 AM para los t\u00E9cnicos; el servidor se auto-cura solo."
          },
          {
            "pillar": 4,
            "name": "4. MLOps Continuo y Detecci\u00F3n de Desv\u00EDos (Data Drift)",
            "tag": "MLOps",
            "color": "#f97316",
            "current": "Modelo entrenado una sola vez con datos hasta 2018.",
            "production": "Vigilar continuamente si los discos nuevos que compramos miden las cosas de otra forma o si se descalibran con el calor, reentrenando el modelo autom\u00E1ticamente cada mes.",
            "impact": "El modelo no envejece ni se vuelve obsoleto cuando Backblaze compra nuevas marcas de discos duros."
          }
        ]
      }
    }
  ],
  "glossary": [
    {
      "term": "Run-to-Failure",
      "short": "Operar hasta la Falla (La vieja costumbre reactiva)",
      "definition": "Estrategia reactiva de mantenimiento donde no se toca el disco hasta que se rompe por completo en mitad de la producci\u00F3n.",
      "tooltip_context": "En Backblaze provoc\u00F3 165 roturas catastr\u00F3ficas inesperadas en 2019, obligando a los servidores a pasar 14 horas en estado de emergencia reconstruyendo datos.",
      "practical_analogy": "Es como manejar tu autom\u00F3vil sin cambiar nunca el aceite hasta que el motor se funde en mitad de la autopista a 120 km/h.",
      "icon": "alert-octagon"
    },
    {
      "term": "S.M.A.R.T.",
      "short": "Self-Monitoring, Analysis and Reporting Technology (Sensores internos del disco)",
      "definition": "Subsistema de sensores de f\u00E1brica integrado en el firmware de los discos duros que monitorea variables electromec\u00E1nicas de salud.",
      "tooltip_context": "Backblaze recopila snapshots diarios de 62 sensores S.M.A.R.T. (124 columnas entre valores normalizados y crudos). Los m\u00E1s letales resultaron ser el 187, 197, 9 y 5.",
      "practical_analogy": "Es el tablero de instrumentos de un avi\u00F3n o autom\u00F3vil: vigila temperatura, presi\u00F3n de aceite, vibraciones y kil\u00F3metros recorridos.",
      "icon": "cpu"
    },
    {
      "term": "Data Leakage",
      "short": "Fuga de Datos (Hacer trampa usando informaci\u00F3n del futuro)",
      "definition": "Grave error metodol\u00F3gico en el que informaci\u00F3n del futuro contamina el entrenamiento del modelo, inflando falsamente la precisi\u00F3n en el laboratorio.",
      "tooltip_context": "Se evit\u00F3 estrictamente con una partici\u00F3n cronol\u00F3gica Out-of-Time: entrenamos con datos de 2013 a 2018 y evaluamos a ciegas sobre 2019.",
      "practical_analogy": "Es como darle a un estudiante las preguntas exactas del examen final con las respuestas anotadas el d\u00EDa anterior: sacar\u00E1 100 de nota, pero no aprendi\u00F3 nada para la vida real.",
      "icon": "shield-alert"
    },
    {
      "term": "Feature Engineering",
      "short": "Ingenier\u00EDa de Caracter\u00EDsticas (Cocinar variables inteligentes)",
      "definition": "Transformar datos crudos en variables que capturan la f\u00EDsica y la din\u00E1mica real del problema a resolver.",
      "tooltip_context": "En este proyecto creamos ventanas m\u00F3viles de 10 d\u00EDas para medir la media, varianza, picos y saltos bruscos recientes en los sensores S.M.A.R.T.",
      "practical_analogy": "En lugar de preguntarte cu\u00E1nto pesas hoy, calcular cu\u00E1nto subiste o bajaste de peso en los \u00FAltimos 10 d\u00EDas para entender tu tendencia de salud.",
      "icon": "sliders"
    },
    {
      "term": "Downsampling",
      "short": "Submuestreo (Descartar a la fuerza datos de la mayor\u00EDa)",
      "definition": "T\u00E9cnica que descarta observaciones de la clase mayoritaria (discos sanos) para igualarla con la minoritaria (discos rotos).",
      "tooltip_context": "Se us\u00F3 para crear los sets de entrenamiento balanceados 50-50 en las pruebas de laboratorio, pero en producci\u00F3n se reemplaza por el par\u00E1metro scale_pos_weight.",
      "practical_analogy": "Si en un concurso hay 1,000 participantes del equipo azul y 10 del equipo rojo, descartar a 990 azules para que compitan 10 contra 10 en condiciones artificiales.",
      "icon": "filter"
    },
    {
      "term": "XGBoost",
      "short": "eXtreme Gradient Boosting (Algoritmo de \u00E1rboles potenciados)",
      "definition": "Algoritmo de Machine Learning supervisado que construye cientos de \u00E1rboles de decisi\u00F3n en secuencia, donde cada \u00E1rbol nuevo aprende de los errores cometidos por los anteriores.",
      "tooltip_context": "Fue el campe\u00F3n absoluto del torneo de Backblaze: rescat\u00F3 m\u00E1s del 52% de los fallos reales con solo 68 falsas alarmas en todo el a\u00F1o.",
      "practical_analogy": "Un comit\u00E9 de 300 ingenieros expertos reunidos: el primer ingeniero hace un diagn\u00F3stico, el segundo corrige las dudas del primero, y as\u00ED sucesivamente hasta tener un veredicto s\u00FAper preciso y refinado.",
      "icon": "zap"
    },
    {
      "term": "F2-Score",
      "short": "M\u00E9trica F-Beta con Beta = 2 (Recall vale el doble)",
      "definition": "M\u00E9trica arm\u00F3nica de evaluaci\u00F3n que le otorga el doble de peso al Recall (atrapar fallos) que a la Precisi\u00F3n (evitar falsas alarmas).",
      "tooltip_context": "Fue la br\u00FAjula para elegir el mejor modelo: en Backblaze una falsa alarma cuesta $45 USD de revisi\u00F3n, pero un fallo no previsto cuesta $450 USD m\u00E1s riesgo de p\u00E9rdida de datos.",
      "practical_analogy": "La alarma de incendios de un datacenter: prefieres que suene por error cuando alguien quema una tostada en la sala de descanso, a que no suene cuando hay fuego real entre los servidores.",
      "icon": "target"
    },
    {
      "term": "Recall (Exhaustividad)",
      "short": "Sensibilidad (Capacidad de detectar todos los fallos reales)",
      "definition": "Proporci\u00F3n de discos rotos que fueron detectados a tiempo por el modelo sobre el total de fallos reales que ocurrieron.",
      "tooltip_context": "XGBoost sin historia alcanz\u00F3 52.12% y con historia 61.82%, comparado con el 15.15% de la regla humana y el 0% de la estrategia reactiva.",
      "practical_analogy": "Si en un aeropuerto intentan pasar 100 maletas con contrabando y el perro polic\u00EDa detecta 62 de ellas, el Recall del perro polic\u00EDa es del 62%.",
      "icon": "check-circle"
    },
    {
      "term": "Precisi\u00F3n",
      "short": "Tasa de Acierto de las Alarmas (Qu\u00E9 tan cre\u00EDble es la alerta)",
      "definition": "Porcentaje de discos que realmente iban a morir entre todos aquellos que el modelo marc\u00F3 como sospechosos.",
      "tooltip_context": "XGBoost sin historia logr\u00F3 55.84% de precisi\u00F3n (m\u00E1s de la mitad de las alarmas eran fallos reales), frente al paup\u00E9rrimo 2.73% de la heur\u00EDstica tradicional.",
      "practical_analogy": "Si gritas '\u00A1Lobo!' 100 veces y el lobo viene 56 veces, tu precisi\u00F3n es del 56%. Si el lobo solo viene 2 veces, los pastores dejar\u00E1n de creerte.",
      "icon": "crosshair"
    },
    {
      "term": "SHAP",
      "short": "SHapley Additive exPlanations (El explicador de la caja negra)",
      "definition": "M\u00E9todo basado en la teor\u00EDa de juegos matem\u00E1ticos que calcula exactamente cu\u00E1nto aport\u00F3 cada sensor en la predicci\u00F3n final de la IA.",
      "tooltip_context": "Permiti\u00F3 abrir el cerebro de XGBoost y revel\u00F3 que SMART 187 es el sensor m\u00E1s letal y que SMART 9 (las horas de vida acumuladas) act\u00FAa como multiplicador de riesgo.",
      "practical_analogy": "En un partido de f\u00FAtbol donde el equipo gan\u00F3 3-0, SHAP te dice exactamente qu\u00E9 porcentaje del gol fue gracias al pase del mediocampista, la carrera del extremo y el remate del delantero.",
      "icon": "eye"
    },
    {
      "term": "MLOps",
      "short": "Machine Learning Operations (La IA en piloto autom\u00E1tico)",
      "definition": "Conjunto de pr\u00E1cticas para automatizar, monitorear y mantener modelos de Machine Learning funcionando 24/7 en servidores de producci\u00F3n.",
      "tooltip_context": "Es el puente que conecta el modelo con los Storage Pods para que las predicciones disparen migraciones autom\u00E1ticas de datos cada noche.",
      "practical_analogy": "No basta con dise\u00F1ar un auto de carreras en el garaje: MLOps es el equipo de mec\u00E1nicos en los pits que cambia neum\u00E1ticos, revisa combustible y ajusta el motor en plena carrera.",
      "icon": "refresh-cw"
    },
    {
      "term": "scale_pos_weight",
      "short": "Ponderaci\u00F3n de Clase Minoritaria (El multiplicador de castigo)",
      "definition": "Par\u00E1metro que multiplica el error del algoritmo cuando se le escapa un caso de la clase minoritaria (discos que se rompen).",
      "tooltip_context": "Se fij\u00F3 en 17.04 porque por cada disco a punto de romperse hab\u00EDa 17 discos sanos en el dataset. Evit\u00F3 que el modelo se volviera perezoso.",
      "practical_analogy": "Si en un partido de baloncesto una canasta normal vale 2 puntos, pero encestar desde la mitad de la cancha vale 17 puntos para motivar a los jugadores a intentarlo.",
      "icon": "scale"
    },
    {
      "term": "AFR",
      "short": "Annualized Failure Rate (Tasa anualizada de fallos)",
      "definition": "Porcentaje estimado de discos de un modelo que morir\u00E1n si operan durante 365 d\u00EDas seguidos.",
      "tooltip_context": "Es la m\u00E9trica reina con la que Backblaze compara a Seagate, Toshiba, HGST y Western Digital. El modelo ST4000DM000 registr\u00F3 un AFR hist\u00F3rico de 2.6%.",
      "practical_analogy": "La tasa de mortalidad anual de una poblaci\u00F3n: te dice cu\u00E1ntas personas de cada 1,000 fallecen al a\u00F1o por causas naturales o accidentes.",
      "icon": "trending-up"
    },
    {
      "term": "SMART 187",
      "short": "Reported Uncorrectable Errors (Errores irrecuperables de hardware)",
      "definition": "Contador de errores de lectura o escritura que los algoritmos internos de correcci\u00F3n (ECC) del disco no pudieron solucionar.",
      "tooltip_context": "\u00A1El sensor m\u00E1s letal de todo el estudio! XGBoost descubri\u00F3 que si este n\u00FAmero sube de golpe de 0 a m\u00E1s de 5, el disco casi siempre muere en menos de 7 d\u00EDas.",
      "practical_analogy": "Es como un dolor punzante en el pecho: un s\u00EDntoma grave que no se quita con aspirinas y requiere ir a urgencias de inmediato.",
      "icon": "alert-circle"
    },
    {
      "term": "SMART 197",
      "short": "Current Pending Sector Count (Sectores inestables pendientes)",
      "definition": "Contador de zonas de los platos magn\u00E9ticos que presentaron errores de lectura y est\u00E1n esperando ser retiradas permanentemente.",
      "tooltip_context": "Ocup\u00F3 el 2do lugar en importancia SHAP. Denota que la superficie magn\u00E9tica del plato se est\u00E1 descascarando o rayando f\u00EDsicamente.",
      "practical_analogy": "Baches peligrosos en una autopista: los autos a\u00FAn pueden pasar despacio, pero si no se reparan pronto, causar\u00E1n un accidente grave.",
      "icon": "clock"
    },
    {
      "term": "SMART 9",
      "short": "Power-On Hours (Horas de encendido acumuladas / Edad)",
      "definition": "El od\u00F3metro del disco duro: cuenta cu\u00E1ntas horas totales ha estado encendido y girando desde que sali\u00F3 de la f\u00E1brica.",
      "tooltip_context": "\u00A1La gran sorpresa del estudio! Qued\u00F3 en 3er lugar de importancia SHAP. Demostr\u00F3 que un fallo en un disco de 35,000 horas (4 a\u00F1os de uso continuo) es inminente, mientras que en un disco nuevo puede ser pasajero.",
      "practical_analogy": "El kilometraje de un cami\u00F3n: no es lo mismo que tenga un ruido en el motor con 5,000 km que con 500,000 km recorridos.",
      "icon": "hourglass"
    },
    {
      "term": "SMART 5",
      "short": "Reallocated Sectors Count (Sectores reasignados / Cicatrices)",
      "definition": "Cantidad de sectores da\u00F1ados que el disco ya tuvo que retirar de circulaci\u00F3n, moviendo los datos a una pista de reserva.",
      "tooltip_context": "Ocup\u00F3 el 4to lugar en SHAP. Representa las cicatrices f\u00EDsicas acumuladas en la superficie de los platos.",
      "practical_analogy": "Puntos de sutura en la piel: una o dos cicatrices son normales, pero tener 50 cicatrices nuevas indica que est\u00E1s recibiendo golpes constantes.",
      "icon": "check-square"
    },
    {
      "term": "Storage Pod",
      "short": "Armarios de Almacenamiento Densos de Backblaze",
      "definition": "Chasis y servidores de almacenamiento de alta densidad dise\u00F1ados por Backblaze que albergan hasta 60 discos duros en 4U de rack.",
      "tooltip_context": "El hardware f\u00EDsico donde corren las unidades Seagate 4TB. El objetivo final es que el Pod clone los discos enfermos autom\u00E1ticamente antes de la rotura.",
      "practical_analogy": "Un edificio de 60 departamentos: si en un departamento hay una fuga de agua, lo evacuas antes de que inunde a los otros 59 departamentos vecinos.",
      "icon": "server"
    }
  ],
  "apaReferences": [
    {
      "id": "REF-01",
      "shortCite": "(Alfaro Arriola, 2026a)",
      "authors": "Alfaro Arriola, R.",
      "year": "2026a",
      "title": "Ciclo de vida de Data Analytics: Desglose detallado de las 6 fases del proceso anal\u00EDtico",
      "source": "Universidad Nacional de Ingenier\u00EDa (UNI) \u2013 Ingenier\u00EDa en Computaci\u00F3n.",
      "fullApaHtml": "Alfaro Arriola, R. (2026a). <em>Ciclo de vida de Data Analytics: Desglose detallado de las 6 fases del proceso anal\u00EDtico</em>. Universidad Nacional de Ingenier\u00EDa (UNI) \u2013 Ingenier\u00EDa en Computaci\u00F3n.",
      "domain": "Metodolog\u00EDa Rectora: Las 6 Fases del Ciclo de Vida (Descubrimiento, Preparaci\u00F3n, Planificaci\u00F3n, Construcci\u00F3n, Comunicaci\u00F3n y Operacionalizaci\u00F3n).",
      "matches": [
        "Caso 1 (Backblaze): M\u00F3dulo 04 (Las 6 fases del pipeline GCP/BigQuery) y M\u00F3dulo 08 (Operacionalizaci\u00F3n MLOps).",
        "Caso 2 (IMPORTMED): M\u00F3dulo 02 (Marco Metodol\u00F3gico de 6 Fases), M\u00F3dulos 03 a 12 (Trazabilidad fase por fase)."
      ]
    },
    {
      "id": "REF-02",
      "shortCite": "(Alfaro Arriola, 2026b)",
      "authors": "Alfaro Arriola, R.",
      "year": "2026b",
      "title": "Tipos de an\u00E1lisis: Descriptivo, diagn\u00F3stico, predictivo y prescriptivo",
      "source": "Universidad Nacional de Ingenier\u00EDa (UNI) \u2013 Ingenier\u00EDa en Computaci\u00F3n.",
      "fullApaHtml": "Alfaro Arriola, R. (2026b). <em>Tipos de an\u00E1lisis: Descriptivo, diagn\u00F3stico, predictivo y prescriptivo</em>. Universidad Nacional de Ingenier\u00EDa (UNI) \u2013 Ingenier\u00EDa en Computaci\u00F3n.",
      "domain": "Madurez Anal\u00EDtica: Los 4 niveles (\u00BFQu\u00E9 pas\u00F3?, \u00BFPor qu\u00E9 pas\u00F3?, \u00BFQu\u00E9 pasara?, \u00BFQu\u00E9 acci\u00F3n tomar?) y la regla de no prescribir sin diagnosticar y predecir.",
      "matches": [
        "Caso 1 (Backblaze): M\u00F3dulo 02 (Escalera de Madurez Anal\u00EDtica y Regla de Oro interactiva).",
        "Caso 2 (IMPORTMED): M\u00F3dulo 02 (4 Niveles en Parque Biom\u00E9dico), M\u00F3dulos 10, 11 y 12 (Tableros Descriptivo, Diagn\u00F3stico y Prescriptivo en Power BI)."
      ]
    },
    {
      "id": "REF-03",
      "shortCite": "(Backblaze, s. f.)",
      "authors": "Backblaze",
      "year": "s. f.",
      "title": "Hard drive data and stats [Conjunto de datos]",
      "source": "https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data",
      "url": "https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data",
      "fullApaHtml": "Backblaze. (s. f.). <em>Hard drive data and stats</em> [Conjunto de datos]. <a href=\"https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data\" target=\"_blank\" rel=\"noopener noreferrer\">https://www.backblaze.com/cloud-storage/resources/hard-drive-test-data</a>",
      "domain": "Fuente Primaria de Datos S.M.A.R.T.: Telemetr\u00EDa diaria (2013\u20132019, ~55 GB en BigQuery, modelo Seagate ST4000DM000, 165 fallos en test_2019).",
      "matches": [
        "Caso 1 (Backblaze): M\u00F3dulo 01 (KPIs de flota y Storage Pods), M\u00F3dulo 03 (Explosi\u00F3n de 40 a 62 atributos S.M.A.R.T., 124 columnas)."
      ]
    },
    {
      "id": "REF-04",
      "shortCite": "(Chen & Guestrin, 2016)",
      "authors": "Chen, T., y Guestrin, C.",
      "year": "2016",
      "title": "XGBoost: A scalable tree boosting system",
      "source": "Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining (pp. 785\u2013794). ACM.",
      "url": "https://doi.org/10.1145/2939672.2939785",
      "fullApaHtml": "Chen, T., y Guestrin, C. (2016). XGBoost: A scalable tree boosting system. En <em>Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining</em> (pp. 785\u2013794). ACM. <a href=\"https://doi.org/10.1145/2939672.2939785\" target=\"_blank\" rel=\"noopener noreferrer\">https://doi.org/10.1145/2939672.2939785</a>",
      "domain": "Formulaci\u00F3n Matem\u00E1tica del Modelo Predictivo: Funci\u00F3n objetivo regularizada L^(t), penalizaci\u00F3n L1/L2 \u03A9(f_t), expansi\u00F3n de Taylor de 2.\u00BA orden, gradientes g_i, hessianos h_i y scale_pos_weight = 17.04.",
      "matches": [
        "Caso 1 (Backblaze): M\u00F3dulo 04 (Fase 4 entrenamiento XGBoost) y M\u00F3dulo 06 (Ecuaciones A y C de XGBoost y Torneo de Modelos).",
        "Caso 2 (IMPORTMED): M\u00F3dulo 05 (Las 5 Ecuaciones Fundamentales de XGBoost) y M\u00F3dulo 06 (Campe\u00F3n del Torneo con F2 = 0.4735)."
      ]
    },
    {
      "id": "REF-05",
      "shortCite": "(Datatonic, s. f.-a)",
      "authors": "Datatonic",
      "year": "s. f.-a",
      "title": "Machine learning for predictive maintenance \u2013 Part 1",
      "source": "https://datatonic.com/insights/machine-learning-predictive-maintenance/",
      "url": "https://datatonic.com/insights/machine-learning-predictive-maintenance/",
      "fullApaHtml": "Datatonic. (s. f.-a). <em>Machine learning for predictive maintenance \u2013 Part 1</em>. <a href=\"https://datatonic.com/insights/machine-learning-predictive-maintenance/\" target=\"_blank\" rel=\"noopener noreferrer\">https://datatonic.com/insights/machine-learning-predictive-maintenance/</a>",
      "domain": "Paradigmas de Mantenimiento y Heur\u00EDstica S.M.A.R.T.: Comparativa Run-to-Failure vs. Preventivo vs. Predictivo y selecci\u00F3n de los 5 atributos S.M.A.R.T. cr\u00EDticos (5, 187, 188, 197, 198).",
      "matches": [
        "Caso 1 (Backblaze): M\u00F3dulo 01 (Tabla 1 de estrategias de mantenimiento y simulador Reactivo vs. Predictivo) y M\u00F3dulo 03.",
        "Caso 2 (IMPORTMED): M\u00F3dulo 01 (Paralelismo con los 3 paradigmas en electromedicina hospitalaria)."
      ]
    },
    {
      "id": "REF-06",
      "shortCite": "(Datatonic, s. f.-b)",
      "authors": "Datatonic",
      "year": "s. f.-b",
      "title": "Machine learning for predictive maintenance \u2013 Part 2",
      "source": "https://datatonic.com/insights/machine-learning-predictive-maintenance-hard-drive-failure/",
      "url": "https://datatonic.com/insights/machine-learning-predictive-maintenance-hard-drive-failure/",
      "fullApaHtml": "Datatonic. (s. f.-b). <em>Machine learning for predictive maintenance \u2013 Part 2</em>. <a href=\"https://datatonic.com/insights/machine-learning-predictive-maintenance-hard-drive-failure/\" target=\"_blank\" rel=\"noopener noreferrer\">https://datatonic.com/insights/machine-learning-predictive-maintenance-hard-drive-failure/</a>",
      "domain": "Ingenier\u00EDa Temporal y Evaluaci\u00F3n Experimental: Ventanas m\u00F3viles de 10 d\u00EDas, horizontes N = 1, 2, 7, 30 d\u00EDas, partici\u00F3n Out-of-Time y an\u00E1lisis del submuestreo 50-50.",
      "matches": [
        "Caso 1 (Backblaze): M\u00F3dulo 05 (Ventanas m\u00F3viles de 10 d\u00EDas), M\u00F3dulo 06 (Ecuaci\u00F3n D y Tabla 7 del Torneo en test_2019).",
        "Caso 2 (IMPORTMED): M\u00F3dulo 04 (Ventanas m\u00F3viles retrospectivas 30/90/180d y divisi\u00F3n temporal ciega)."
      ]
    },
    {
      "id": "REF-07",
      "shortCite": "(Datatonic, s. f.-c)",
      "authors": "Datatonic",
      "year": "s. f.-c",
      "title": "predictive-maintenance-demo [C\u00F3digo fuente]",
      "source": "GitHub. https://github.com/teamdatatonic/predictive-maintenance-demo",
      "url": "https://github.com/teamdatatonic/predictive-maintenance-demo",
      "fullApaHtml": "Datatonic. (s. f.-c). <em>predictive-maintenance-demo</em> [C\u00F3digo fuente]. GitHub. <a href=\"https://github.com/teamdatatonic/predictive-maintenance-demo\" target=\"_blank\" rel=\"noopener noreferrer\">https://github.com/teamdatatonic/predictive-maintenance-demo</a>",
      "domain": "Arquitectura de Scripts y Pipeline Cloud: Scripts upload_to_gcs.sh, GCStoBigQuery.py, create_ml_datasets.py y notebooks de entrenamiento e interpretabilidad.",
      "matches": [
        "Caso 1 (Backblaze): M\u00F3dulo 04 (Visor de scripts Bash/SQL/Python de las 6 fases) y M\u00F3dulo 05 (Pipeline de ingesta a BigQuery)."
      ]
    },
    {
      "id": "REF-08",
      "shortCite": "(Lundberg & Lee, 2017)",
      "authors": "Lundberg, S. M., y Lee, S.-I.",
      "year": "2017",
      "title": "A unified approach to interpreting model predictions",
      "source": "Advances in Neural Information Processing Systems (Vol. 30, pp. 4765\u20134774). Curran Associates.",
      "fullApaHtml": "Lundberg, S. M., y Lee, S.-I. (2017). A unified approach to interpreting model predictions. En I. Guyon et al. (Eds.), <em>Advances in Neural Information Processing Systems</em> (Vol. 30, pp. 4765\u20134774). Curran Associates.",
      "domain": "Explicabilidad XAI (Valores SHAP): Teor\u00EDa de juegos cooperativos de Shapley (\u03C6_j), importancia global |SHAP|, gr\u00E1ficos de dependencia parcial y cascadas locales (Waterfall).",
      "matches": [
        "Caso 1 (Backblaze): M\u00F3dulo 06 (Ecuaci\u00F3n E de Shapley) y M\u00F3dulo 07 (Figura 2 de importancia SHAP y hallazgo de SMART 9 Raw).",
        "Caso 2 (IMPORTMED): M\u00F3dulo 07 (Domo cr\u00EDtico en d\u00EDas 70\u2013125 con SHAP Dependence) y M\u00F3dulo 08 (Auditor\u00EDa forense Waterfall de casos cl\u00EDnicos Rojo vs. Verde)."
      ]
    },
    {
      "id": "REF-09",
      "shortCite": "(Susto et al., 2015)",
      "authors": "Susto, G. A., Schirru, A., Pampuri, S., McLoone, S., y Beghi, A.",
      "year": "2015",
      "title": "Machine learning for predictive maintenance: A multiple classifier approach",
      "source": "IEEE Transactions on Industrial Informatics, 11(3), 812\u2013820.",
      "url": "https://doi.org/10.1109/TII.2014.2349359",
      "fullApaHtml": "Susto, G. A., Schirru, A., Pampuri, S., McLoone, S., y Beghi, A. (2015). Machine learning for predictive maintenance: A multiple classifier approach. <em>IEEE Transactions on Industrial Informatics, 11</em>(3), 812\u2013820. <a href=\"https://doi.org/10.1109/TII.2014.2349359\" target=\"_blank\" rel=\"noopener noreferrer\">https://doi.org/10.1109/TII.2014.2349359</a>",
      "domain": "Enfoque de M\u00FAltiples Clasificadores (Multiple Classifier Approach): Formulaci\u00F3n del mantenimiento predictivo como clasificaci\u00F3n binaria supervisada con horizonte fijo N en lugar de regresi\u00F3n RUL continua.",
      "matches": [
        "Caso 1 (Backblaze): M\u00F3dulo 04 y M\u00F3dulo 06 (8 clasificadores para horizontes N = 1, 2, 7 y 30 d\u00EDas y m\u00E9trica F2-Score).",
        "Caso 2 (IMPORTMED): M\u00F3dulo 04 (Etiquetado supervisado a horizonte N = 30 d\u00EDas) y M\u00F3dulo 06 (Calibraci\u00F3n del umbral \u03C4 = 0.22)."
      ]
    },
    {
      "id": "REF-10",
      "shortCite": "(Smith, 2021)",
      "authors": "Smith, B.",
      "year": "2021",
      "title": "An\u00E1lisis de datos: Gu\u00EDa completa para principiantes",
      "source": "Edici\u00F3n independiente.",
      "fullApaHtml": "Smith, B. (2021). <em>An\u00E1lisis de datos: Gu\u00EDa completa para principiantes</em>.",
      "domain": "Fundamentos de Preparaci\u00F3n y Estructuraci\u00F3n de Datos: Limpieza de valores nulos (>30%), integridad referencial, eliminaci\u00F3n de variables est\u00E1ticas y dise\u00F1o dimensional.",
      "matches": [
        "Caso 1 (Backblaze): M\u00F3dulo 03 (4 V del Big Data y depuraci\u00F3n de columnas nulas) y M\u00F3dulo 05 (Filtrado de nulos en BigQuery).",
        "Caso 2 (IMPORTMED): M\u00F3dulo 03 (Integridad relacional en SQLite) y M\u00F3dulo 09 (Estructuraci\u00F3n del Star Schema en Power BI)."
      ]
    }
  ],
  "slideReferencesMap": {
    "portada-contexto": [
      { "refId": "REF-03", "shortCite": "(Backblaze, s. f.)", "element": "KPIs de Flota y Telemetr\u00EDa (~55 GB, ST4000DM000, 165 fallos)", "why": "Provee el dataset p\u00FAblico oficial de los centros de datos de Backblaze entre 2013 y 2019." },
      { "refId": "REF-05", "shortCite": "(Datatonic, s. f.-a)", "element": "Tabla 1: Las 3 Estrategias de Mantenimiento y Simulador Operativo", "why": "Fundamenta la transici\u00F3n desde Run-to-Failure y Preventivo por calendario hacia el Mantenimiento Predictivo basado en condici\u00F3n." },
      { "refId": "REF-04", "shortCite": "(Chen & Guestrin, 2016)", "element": "Motor Predictivo XGBoost y scale_pos_weight = 17.04", "why": "Sustenta el algoritmo de Gradient Boosting utilizado para anticipar fallos con ventana de maniobra." }
    ],
    "niveles-madurez": [
      { "refId": "REF-02", "shortCite": "(Alfaro Arriola, 2026b)", "element": "Escalera de 4 Niveles de Madurez Anal\u00EDtica y Regla de Oro", "why": "Establece la taxonom\u00EDa Descriptivo \u2192 Diagn\u00F3stico \u2192 Predictivo \u2192 Prescriptivo y la prohibici\u00F3n metodol\u00F3gica de prescribir sin diagnosticar y predecir." },
      { "refId": "REF-08", "shortCite": "(Lundberg & Lee, 2017)", "element": "Nivel 02 (Diagn\u00F3stico con SHAP)", "why": "Respalda el uso de valores de Shapley para explicar f\u00EDsicamente por qu\u00E9 ocurre el fallo antes de automatizar decisiones." },
      { "refId": "REF-09", "shortCite": "(Susto et al., 2015)", "element": "Nivel 03 (Predictivo por Horizontes N = 1, 2, 7, 30 d\u00EDas)", "why": "Justifica la formulaci\u00F3n de clasificadores binarios supervisados por horizonte temporal." }
    ],
    "big-data-desafio": [
      { "refId": "REF-03", "shortCite": "(Backblaze, s. f.)", "element": "Figura 1: Explosi\u00F3n Dimensional S.M.A.R.T. (de 80 a 124 columnas)", "why": "Documenta la evoluci\u00F3n hist\u00F3rica de 40 a 62 atributos S.M.A.R.T. (valores Raw y Normalized) entre 2013 y 2018." },
      { "refId": "REF-05", "shortCite": "(Datatonic, s. f.-a)", "element": "Limitaci\u00F3n Cognitiva Humana vs. Aprendizaje Autom\u00E1tico Multivariado", "why": "Demuestra por qu\u00E9 las reglas manuales sobre sensores aislados colapsan ante relaciones no lineales en 124 dimensiones." },
      { "refId": "REF-10", "shortCite": "(Smith, 2021)", "element": "Las 4 V del Big Data y Depuraci\u00F3n de Veracidad (>30% Nulos)", "why": "Sustenta los criterios de perfilado, limpieza de datos faltantes y homogeneizaci\u00F3n por modelo." }
    ],
    "ciclo-de-vida": [
      { "refId": "REF-01", "shortCite": "(Alfaro Arriola, 2026a)", "element": "Estructura Completa de las 6 Fases del Ciclo de Vida de Data Analytics", "why": "Marco metodol\u00F3gico que articula desde la Fase 1 (Descubrimiento) hasta la Fase 6 (Operacionalizaci\u00F3n)." },
      { "refId": "REF-07", "shortCite": "(Datatonic, s. f.-c)", "element": "Scripts del Pipeline (upload_to_gcs.sh, create_ml_datasets.py, train_xgboost)", "why": "Repositorio oficial de c\u00F3digo fuente que implementa la ingesta en GCS/BigQuery y los notebooks de modelado." },
      { "refId": "REF-06", "shortCite": "(Datatonic, s. f.-b)", "element": "Fase 3: Partici\u00F3n Temporal Out-of-Time (2013\u20132018 vs. Test 2019)", "why": "Garantiza la evaluaci\u00F3n a ciegas sin fuga de informaci\u00F3n del futuro (Data Leakage)." }
    ],
    "ingenieria-datos": [
      { "refId": "REF-06", "shortCite": "(Datatonic, s. f.-b)", "element": "Ventanas M\u00F3viles de 10 D\u00EDas (Media, Varianza, M\u00EDn, M\u00E1x, Delta)", "why": "Define la ingenier\u00EDa de caracter\u00EDsticas temporales para capturar la velocidad de degradaci\u00F3n de los 5 atributos S.M.A.R.T. cr\u00EDticos." },
      { "refId": "REF-07", "shortCite": "(Datatonic, s. f.-c)", "element": "Diagrama de Flujo del Pipeline SQL/BigQuery (5 Etapas)", "why": "Proporciona la arquitectura de transformaci\u00F3n desde CSVs crudos hasta la matriz lista para XGBoost." },
      { "refId": "REF-10", "shortCite": "(Smith, 2021)", "element": "Etapa 03: Filtrado de Nulos (<30%) y Consistencia de Esquema", "why": "Respalda el preprocesamiento y saneamiento de variables antes del c\u00E1lculo de agregaciones." }
    ],
    "torneo-algoritmos": [
      { "refId": "REF-04", "shortCite": "(Chen & Guestrin, 2016)", "element": "Ecuaciones A y C: scale_pos_weight (17.04) y Funci\u00F3n Objetivo Regularizada de XGBoost", "why": "Art\u00EDculo fundacional de XGBoost que define el objetivo aditivo con regularizaci\u00F3n L1/L2 y ponderaci\u00F3n de clases desbalanceadas." },
      { "refId": "REF-09", "shortCite": "(Susto et al., 2015)", "element": "Ecuaci\u00F3n B (F2-Score) y Clasificadores por Horizonte N", "why": "Sustenta la evaluaci\u00F3n asim\u00E9trica donde un Falso Negativo es 10 veces m\u00E1s costoso que una falsa alarma." },
      { "refId": "REF-06", "shortCite": "(Datatonic, s. f.-b)", "element": "Ecuaci\u00F3n D (Ventanas 10d) y Tabla 7: Resultados del Torneo en Test 2019 (165 Fallos)", "why": "Documenta las m\u00E9tricas comparativas entre Run-to-Failure, Heur\u00EDstica Backblaze, Random Forest y XGBoost." },
      { "refId": "REF-08", "shortCite": "(Lundberg & Lee, 2017)", "element": "Ecuaci\u00F3n E: Atribuci\u00F3n Aditiva de Shapley (\u03C6_j)", "why": "Fundamento matem\u00E1tico de teor\u00EDa de juegos cooperativos para auditar las decisiones del modelo." }
    ],
    "interpretabilidad-shap": [
      { "refId": "REF-08", "shortCite": "(Lundberg & Lee, 2017)", "element": "Figura 2: Importancia Global SHAP y Descomposici\u00F3n de Variables", "why": "Introduce el marco TreeSHAP para cuantificar la contribuci\u00F3n marginal exacta de cada sensor S.M.A.R.T." },
      { "refId": "REF-06", "shortCite": "(Datatonic, s. f.-b)", "element": "Hallazgo Cr\u00EDtico: SMART 9 Raw (Horas de Encendido) en 3.er Lugar", "why": "Demuestra emp\u00EDricamente que XGBoost utiliza la edad acumulada del disco como multiplicador de gravedad de los errores de lectura." },
      { "refId": "REF-05", "shortCite": "(Datatonic, s. f.-a)", "element": "Sensores Heur\u00EDsticos (SMART 187, 197, 5, 188, 198)", "why": "Explica el significado electromec\u00E1nico de cada contador S.M.A.R.T. en los platos y cabezales del disco." }
    ],
    "conclusiones-mlops": [
      { "refId": "REF-01", "shortCite": "(Alfaro Arriola, 2026a)", "element": "Fase 6 (Operacionalizaci\u00F3n): Monitoreo Continuo, Data Drift y Reentrenamiento", "why": "Define los requisitos de gobierno, actualizaci\u00F3n programada e integraci\u00F3n operativa para sostener el valor del modelo." },
      { "refId": "REF-06", "shortCite": "(Datatonic, s. f.-b)", "element": "Tabla 8: Los 4 Pilares de Evoluci\u00F3n a Producci\u00F3n (Fase 2)", "why": "Establece la hoja de ruta para superar el submuestreo 50-50, incorporar redes temporales (LSTM/CNN) y automatizar el pipeline." }
    ]
  }
}
;

if (typeof window !== 'undefined') {
  window.presentationData = presentationData;
  window.backblazePresentationData = presentationData;
  window.apaReferences = presentationData.apaReferences;
  window.slideReferencesMap = presentationData.slideReferencesMap;
}

