
/* Diccionario Estadístico Visual — capa editorial fundamentada en revistas */
(function(){
'use strict';
const journals={
'Fiabilidad y escalas':{title:'Tavakol y Dennick (2011), International Journal of Medical Education · Fiabilidad de escalas',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC4205511/',kind:'artículo metodológico'},
'Estadística descriptiva':{title:'Weissgerber et al. (2015), PLOS Biology · Más allá de barras y líneas',url:'https://doi.org/10.1371/journal.pbio.1002128',kind:'artículo con ejemplos de figuras'},
'Pruebas e inferencia':{title:'Ho et al. (2019), Nature Methods · Gráficos de estimación e intervalos',url:'https://doi.org/10.1038/s41592-019-0470-3',kind:'artículo metodológico'},
'Asociación y concordancia':{title:'Midway (2020), Patterns · Principios de visualización eficaz',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7733875/',kind:'artículo con figuras'},
'Modelos de regresión':{title:'Midway (2020), Patterns · Coeficientes, modelos y predicciones',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7733875/',kind:'artículo con figuras'},
'Multivariante y perfiles':{title:'Ejemplo publicado de análisis de perfiles latentes · Gráficos de perfiles y tamaños de clase',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8831427/',kind:'estudio aplicado'},
'Series temporales':{title:'CONSORT 2025 · Informar efectos, incertidumbre y evolución',url:'https://www.bmj.com/content/389/bmj-2024-081124',kind:'guía de reporte'},
'Causalidad y evaluación':{title:'CONSORT 2025 · Diagramas de flujo y resultados absolutos/relativos',url:'https://www.bmj.com/content/389/bmj-2024-081124',kind:'guía con ejemplos reales'},
'Predicción y clasificación':{title:'Midway (2020), Patterns · Mostrar datos, predicciones y calibración',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7733875/',kind:'artículo con figuras'},
'Diseño y muestreo':{title:'STROBE · Participantes, pérdidas y base analítica',url:'https://www.equator-network.org/reporting-guidelines/strobe/',kind:'guía internacional'}
};
const defaults={
'Fiabilidad y escalas':{
need:'Respuestas individuales a las preguntas de una misma escala, codificación de cada respuesta, tratamiento de ítems invertidos, muestra válida y datos faltantes.',
when:'Antes de sumar preguntas para obtener una puntuación, comparar grupos o usar la escala como indicador en un informe.',
avoid:'Si solo existe una pregunta aislada, o si los ítems evalúan asuntos muy diferentes que todavía no se han separado en dimensiones.',
ask:'¿Las preguntas funcionan juntas lo suficientemente bien como para construir un indicador?',
lay:'Explique qué conjunto de preguntas está evaluando, qué tan coherentes son y cuáles requieren revisión.',
paper:'Coeficiente de fiabilidad, muestra, número de ítems y diagnósticos por pregunta; cuando proceda, dimensionalidad y modelo de medición.'
},
'Estadística descriptiva':{
need:'Una base de casos, la variable a resumir, unidad de medida, denominador válido y definición de datos faltantes.',
when:'Al comenzar cualquier diagnóstico, encuesta o evaluación: primero necesitamos saber a quiénes describe la base y cómo se distribuyen sus respuestas.',
avoid:'Si el objetivo es atribuir causalidad, estimar efectos ajustados o comparar resultados más allá de la muestra sin diseño adecuado.',
ask:'¿Qué ocurre, en quiénes ocurre y cuántos casos respaldan esa afirmación?',
lay:'Muestre números absolutos y porcentajes juntos cuando corresponda; para variables continuas, conserve la distribución, no solo la media.',
paper:'Tabla descriptiva con n válido, estadísticas de posición y dispersión, o frecuencias y denominadores.'
},
'Pruebas e inferencia':{
need:'Una variable de resultado, grupos o condición de referencia, diseño independiente o pareado, tamaños muestrales y supuestos del contraste.',
when:'Cuando se plantea una hipótesis sobre diferencias o cambios y se desea expresar incertidumbre de muestreo.',
avoid:'Si solo interesa describir a una población completa o si el diseño no sostiene el tipo de inferencia que se desea hacer.',
ask:'¿Hay diferencias y de qué magnitud podrían ser?',
lay:'Ponga primero la diferencia en unidades comprensibles y su intervalo; muestre el valor p después como información complementaria.',
paper:'Estimación o diferencia, intervalo de confianza, tamaño de efecto, estadístico de prueba, grados de libertad y valor p.'
},
'Asociación y concordancia':{
need:'Dos variables observadas para las mismas unidades, su nivel de medición y denominador de pares completos.',
when:'Cuando se desea examinar si dos características varían juntas, antes de afirmar que una explica a la otra.',
avoid:'Si se quiere concluir que cambiar una variable causará un cambio en la otra, sin un diseño que lo permita.',
ask:'¿Las personas que tienen más de una característica tienden también a tener más de otra?',
lay:'Muestre una nube de puntos o una tabla cruzada con una interpretación de dirección y magnitud.',
paper:'Coeficiente, tamaño muestral, intervalo de confianza cuando sea apropiado, valor p y representación de los datos.'
},
'Modelos de regresión':{
need:'Un desenlace claramente definido, variables explicativas, codificaciones, tamaño de muestra, tratamiento de faltantes y especificación del modelo.',
when:'Cuando se busca estimar asociaciones simultáneas, explorar factores relacionados o predecir un resultado.',
avoid:'Si se pretende demostrar causalidad únicamente incorporando muchas variables de control.',
ask:'¿Cómo cambia el resultado esperado al cambiar una característica y mantener otras constantes?',
lay:'Traduzca coeficientes a unidades, probabilidades predichas o diferencias absolutas y agregue intervalos de confianza.',
paper:'Tabla de coeficientes/efectos marginales, IC, n analítico, especificación y diagnósticos de ajuste.'
},
'Multivariante y perfiles':{
need:'Varias variables comparables por persona o unidad, decisión sobre estandarización, faltantes y número de grupos o dimensiones.',
when:'Cuando muchos indicadores no pueden comprenderse fácilmente por separado y se buscan dimensiones comunes o tipologías.',
avoid:'Si se quiere presentar grupos encontrados por el algoritmo como categorías naturales e inmutables.',
ask:'¿Existen tipos de personas o dimensiones que resuman patrones de respuesta?',
lay:'Ponga nombres interpretables a los perfiles, muestre su tamaño y las variables que los distinguen.',
paper:'Tabla de selección/ajuste, tamaños de perfiles, incertidumbre, perfiles de medias o probabilidades, y validación.'
},
'Series temporales':{
need:'Fechas, medidas repetidas comparables, periodicidad clara, seguimiento, cambios de definición y faltantes temporales.',
when:'Cuando el orden temporal es esencial para comprender evolución, pronóstico o supervivencia.',
avoid:'Si apenas hay dos momentos y se pretende inferir una tendencia prolongada o estacionalidad.',
ask:'¿Qué ha cambiado, cuándo ocurrió y qué pasaría si continuara la tendencia?',
lay:'Use una misma escala temporal, señale hitos, muestre el número de observaciones y separe observado de pronosticado.',
paper:'Serie temporal, tendencia/efecto o supervivencia estimada, intervalo y comprobación de supuestos.'
},
'Causalidad y evaluación':{
need:'Una intervención, un desenlace, quién recibe y no recibe el tratamiento, temporalidad, elegibilidad y estrategia de identificación.',
when:'Cuando la pregunta central es si una intervención produjo cambios y no solo si dos variables están asociadas.',
avoid:'Si no existe comparación válida ni argumentos sólidos sobre sesgos o supuestos causales.',
ask:'¿Qué habría ocurrido sin el programa o intervención?',
lay:'Muestre la trayectoria observada y el contrafactual, con diferencia en unidades reales e incertidumbre.',
paper:'Diseño, estimando causal, supuestos, estimación con IC, balance y análisis de sensibilidad.'
},
'Predicción y clasificación':{
need:'Un resultado observado, predicciones o puntuaciones por caso, separaciones de entrenamiento/validación y criterio de desempeño.',
when:'Cuando la meta es anticipar eventos en casos nuevos o evaluar la utilidad de un modelo para tomar decisiones.',
avoid:'Si se usa el desempeño sobre los mismos datos de entrenamiento para prometer resultados futuros.',
ask:'¿Cuántos casos identifica y cuántos errores produce?',
lay:'Muestre aciertos, falsos positivos y falsos negativos sobre una base explícita; explique consecuencias del umbral.',
paper:'Métricas fuera de muestra, IC cuando correspondan, matriz de confusión y discriminación/calibración.'
},
'Diseño y muestreo':{
need:'Población objetivo, marco muestral, forma de selección, probabilidades, no respuesta, pesos y universo analítico.',
when:'Antes de levantar datos o antes de informar estimaciones poblacionales a partir de una encuesta.',
avoid:'Si se presenta una muestra por conveniencia como si fuera probabilística y representativa.',
ask:'¿A quiénes representa esta encuesta y con qué incertidumbre?',
lay:'Muestre el camino desde el universo hasta la muestra final, con pérdidas y representatividad explícitas.',
paper:'Diagrama de flujo, diseño, n y n efectivo, ponderaciones, tasas de respuesta e intervalos ajustados.'
}
};
const custom={
'alfa-de-cronbach':{
ask:'¿Puedo construir una escala a partir de estas cinco preguntas?',
when:'Después de aplicar varios ítems sobre un mismo concepto y antes de calcular una puntuación total para comparar personas o grupos.',
need:'Respuestas de cada persona a los cinco ítems (por ejemplo, escala Likert de 1 a 5), sentido de las respuestas, ítems invertidos y casos válidos.',
avoid:'Si las preguntas miden constructos diferentes o se quiere probar que la escala es unidimensional. El alfa, por sí solo, no valida el cuestionario.',
paper:'Tabla con α, n, número de ítems; correlación ítem-total corregida y alfa al quitar cada ítem. Complementar con dimensionalidad cuando proceda.',
lay:'«Las cinco preguntas muestran una consistencia interna relativamente alta (α = 0,86). Conviene revisar cómo aporta cada pregunta». No decir «86 % de fiabilidad» como porcentaje.',
demo:'alpha',
source:{title:'Tavakol y Dennick (2011) · Qué significa y qué no significa el alfa',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC4205511/',kind:'artículo metodológico'}
},
'kappa-de-cohen':{demo:'agreement',ask:'¿Dos evaluadores clasifican los mismos casos de manera concordante?',when:'Al evaluar acuerdo entre dos personas que asignan categorías a los mismos casos.',need:'Las dos clasificaciones emparejadas, identificadores y tabla de acuerdos.',lay:'Traducir kappa y mostrar acuerdo en una matriz de doble entrada.'},
'omega-de-mcdonald':{ask:'¿Mi escala es consistente incluso si los ítems aportan pesos distintos?',when:'Al evaluar escalas de varios ítems, especialmente cuando la estructura factorial justifica cargas diferentes.',demo:'alpha',lay:'Entregue omega con su definición y, si es posible, su intervalo. No presentarlo como porcentaje de encuestados.'},
'chi-cuadrado-de-independencia':{
ask:'¿La respuesta a una pregunta cambia según el grupo al que pertenece cada persona?',
need:'Una tabla con recuentos observados para dos variables categóricas, una fila por unidad y valores esperados revisados.',
when:'Cuando se cruzan variables como región y respuesta Sí/No, y se quiere comprobar asociación, no solo contar porcentajes.',
lay:'Empiece mostrando porcentajes dentro de cada grupo. Después informe χ², p y V de Cramér para la evidencia y magnitud de asociación.',
paper:'Tabla de recuentos y porcentajes de fila, χ², grados de libertad, p y V de Cramér.',
demo:'crosstab',
source:{title:'STROBE · Tablas cruzadas y estimaciones transparentes',url:'https://www.equator-network.org/reporting-guidelines/strobe/',kind:'guía de reporte'}
},
'regresion-logistica-binaria':{
ask:'¿Qué características están asociadas con que ocurra un evento?',
when:'Si la variable de resultado tiene dos alternativas, como adjudicó/no adjudicó o se fue/no se fue.',
need:'Resultado binario por persona, predictores, categorías de referencia, n válido y diagnóstico/validación del modelo.',
demo:'logistic',
lay:'Además de OR, mostrar probabilidades predichas para casos concretos. Las odds NO son probabilidades.',
paper:'OR ajustados, IC95 %, referencias, n, ajuste/validación y un gráfico de probabilidades predichas.'
},
'odds-ratio':{
ask:'¿Cuánto cambian las odds de un evento entre dos grupos?',
demo:'odds',when:'Al analizar un evento binario con una tabla 2×2 o modelo logístico.',lay:'Explicar las odds; si hay riesgo inicial disponible, convertirlo en probabilidades ilustrativas, sin llamar al OR “riesgo”.'
},
'riesgo-relativo':{ask:'¿Qué tan distinto es el riesgo de un evento entre dos grupos?',demo:'risk',lay:'Junto con el RR, mostrar cuántas personas de cada 100 presentan el evento y la diferencia absoluta.'},
'diferencia-de-riesgos':{ask:'¿Cuántos casos adicionales o evitados hay por cada 100 personas?',demo:'risk',lay:'Expresar la diferencia en puntos porcentuales y frecuencia absoluta si se conocen los riesgos por grupo.'},
'analisis-de-perfiles-latentes':{
ask:'¿Qué tipos de personas aparecen al combinar varios indicadores continuos?',
need:'Varias variables continuas por persona, modelo de mezcla, alternativas de clases, faltantes y estabilidad.',
when:'Si se quiere descubrir tipologías de participantes según ingreso, colaboración, satisfacción u otros indicadores continuos.',
demo:'profiles',
paper:'BIC/AIC por solución, entropía o incertidumbre de clasificación, tamaños n (%), curvas de medias estandarizadas por perfil y calidad de las clases.',
lay:'Nombrar los grupos por sus características reales, decir cuántas personas hay en cada uno y evitar afirmar que las clases son “verdades naturales”.',
source:{title:'Estudio aplicado de perfiles latentes · tabla de ajuste, tamaños y curvas de perfiles',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC8831427/',kind:'estudio empírico'}
},
'analisis-de-clases-latentes':{
ask:'¿Qué patrones de respuesta categórica comparten diferentes personas?',
need:'Varios ítems categóricos por persona; modelos con diferente número de clases, clasificación e indicadores de ajuste.',
when:'Al buscar perfiles en variables del tipo Sí/No o respuestas ordinales, modelando probabilidades por clase.',
demo:'classes',lay:'Muestre el porcentaje de cada clase y la probabilidad de cada respuesta dentro de ella.'
},
'prueba-t-pareada':{ask:'¿Las mismas personas mejoraron entre la primera y la segunda medición?',demo:'change',need:'Dos mediciones cuantitativas de las mismas personas, identificador que garantice emparejamiento y diferencias individuales.',lay:'Muestre la diferencia media, el IC y líneas individuales antes/después; evite usar barras aisladas como única evidencia.'},
'wilcoxon-de-rangos-con-signo':{ask:'¿Las mediciones de las mismas personas tienden a cambiar?',demo:'change',need:'Mediciones pareadas de las mismas unidades, con diferencias ordenables.',lay:'Muestre los cambios individuales, la dirección y la distribución de las diferencias.'},
'mcnemar':{ask:'¿Cuántas personas pasaron de No a Sí y cuántas de Sí a No?',demo:'switch',need:'La misma variable binaria medida dos veces en los mismos individuos con sus identificadores.',lay:'Una matriz de transiciones antes/después es más informativa que dos porcentajes globales.'},
'frecuencias-y-porcentajes':{ask:'¿Cuántas personas tienen una característica?',demo:'icons',need:'Recuentos por categoría, total de respuestas válidas y valores ausentes.',lay:'Siempre expresar el numerador y el denominador junto con el porcentaje.'},
'intervalo-de-confianza-de-la-media':{ask:'¿Qué tan precisa es nuestra estimación del promedio?',demo:'ci',need:'Una muestra de observaciones numéricas, n, media y una estrategia de error estándar consistente con el diseño.',lay:'Un intervalo comunica qué valores del parámetro son compatibles con los datos y el procedimiento, no “dónde está el 95 % de las personas”.'},
'correlacion-de-pearson':{ask:'¿A mayores horas de capacitación suele haber mejor desempeño?',demo:'scatter',need:'Dos variables cuantitativas observadas conjuntamente, con revisión de dispersión y atípicos.',lay:'Describa dirección y magnitud de la relación; evite presentarla como causa.'},
'correlacion-de-spearman':{ask:'¿A medida que una variable sube, suele subir o bajar otra?',demo:'scatter',need:'Dos variables ordinales o cuantitativas, medidas por caso y sus rangos.',lay:'Mostrar tendencia de rangos y aclarar que se trata de asociación monotónica.'},
'kaplan-meier':{ask:'¿Cuántas personas siguen sin experimentar el evento conforme pasa el tiempo?',demo:'time',need:'Tiempo de seguimiento por persona, indicador del evento y censura.',lay:'En cada punto explicar “probabilidad estimada de continuar sin el evento” y aportar una tabla de casos en riesgo.'},
'diferencias-en-diferencias':{ask:'¿El programa cambió los resultados más que lo observado sin el programa?',demo:'change',need:'Grupo tratado y comparación, mediciones pre/post, fechas de intervención y evidencia para el supuesto de tendencias paralelas.',lay:'Comparar los cambios de ambos grupos, no solamente el antes/después de participantes.'},
'curva-roc-y-auc':{ask:'¿El modelo logra ordenar a quienes tienen y no tienen el evento?',demo:'classification',need:'Predicciones continuas por caso, desenlace real y validación externa o fuera de muestra.',lay:'AUC describe discriminación; acompañarla de sensibilidad y especificidad en un umbral que importe.'},
'matriz-de-confusion':{ask:'¿Cuántas alertas correctas y errores produce el modelo?',demo:'classification',need:'Resultado real y predicción binaria para cada caso, junto con umbral.',lay:'Contar falsos positivos y falsos negativos; su importancia depende del uso de la predicción.'},
'tamano-muestral':{ask:'¿Cuántas personas debemos encuestar para responder la pregunta?',demo:'flow',need:'Población, diseño de selección, precisión y confianza deseadas, variabilidad, poder o efecto mínimo relevante según el objetivo.',lay:'Muestre n estimado con sus supuestos y ajuste por no respuesta/diseño.'},
'muestreo-estratificado':{ask:'¿Cómo representar adecuadamente los distintos segmentos?',demo:'flow'},
'ensayo-aleatorizado':{ask:'¿El cambio se debe a una intervención asignada aleatoriamente?',demo:'flow',source:{title:'CONSORT 2025 · flujo y resultados de un ensayo',url:'https://www.bmj.com/content/389/bmj-2024-081124',kind:'guía con ejemplos reales'}}
};
const topicChoices=[
['Estoy creando una escala','alfa-de-cronbach','Ver si varias preguntas funcionan juntas'],
['Quiero describir una encuesta','frecuencias-y-porcentajes','Contar personas y porcentajes'],
['Comparar mujeres y hombres','prueba-t-de-student-independiente','Comparar resultados por grupos'],
['Evaluar un antes y después','prueba-t-pareada','Repetición sobre los mismos casos'],
['Quiero cruzar dos preguntas','chi-cuadrado-de-independencia','Asociación entre categorías'],
['Explicar quién recibe un beneficio','regresion-logistica-binaria','Modelo para un resultado Sí/No'],
['Descubrir tipos de participantes','analisis-de-perfiles-latentes','Identificar perfiles a partir de indicadores'],
['Evaluar si un programa sirvió','diferencias-en-diferencias','Comparar cambios con grupo de referencia'],
['Validar un modelo predictivo','matriz-de-confusion','Aciertos y errores sobre casos nuevos'],
['Cuántas personas encuestar','tamano-muestral','Calcular una muestra']
];
const gallery=[
['De cada 100','frecuencias-y-porcentajes','Pictogramas y denominadores'],
['Antes ↔ después','prueba-t-pareada','Trayectorias individuales'],
['Magnitud del cambio','tamano-de-efecto-d-de-cohen','Estimación + intervalo'],
['Preguntas coherentes','alfa-de-cronbach','Fiabilidad + diagnóstico'],
['Distintas realidades','analisis-de-perfiles-latentes','Curvas de perfiles + tamaño'],
['¿Qué resultado importa?','diferencia-de-riesgos','Efecto absoluto + relativo'],
['De universo a muestra','tamano-muestral','Flujo de participantes'],
['¿Qué errores comete?','matriz-de-confusion','Matriz con consecuencias']
];
const galleryIcon=[
'<rect x="5" y="12" width="72" height="4" fill="#dfeee7"/><rect x="5" y="12" width="51" height="4" fill="#087f70"/><rect x="5" y="28" width="72" height="4" fill="#dfeee7"/><rect x="5" y="28" width="31" height="4" fill="#e09b57"/><rect x="5" y="44" width="72" height="4" fill="#dfeee7"/><rect x="5" y="44" width="64" height="4" fill="#087f70"/>',
'<path d="M8 50 L69 12 M8 27 L69 32 M8 47 L69 37" stroke="#087f70" stroke-width="2"/><circle cx="8" cy="50" r="3" fill="#087f70"/><circle cx="69" cy="12" r="3" fill="#087f70"/>',
'<path d="M6 31 H75 M41 10 V51" stroke="#cfded4" stroke-width="1"/><path d="M13 23 H67" stroke="#087f70" stroke-width="3"/><circle cx="38" cy="23" r="6" fill="#e09b57"/>',
'<rect x="9" y="13" width="67" height="7" rx="3" fill="#e1eee7"/><rect x="9" y="13" width="56" height="7" rx="3" fill="#087f70"/><path d="M9 30 H76 M9 43 H68" stroke="#9bc9b6" stroke-width="4"/>',
'<path d="M5 51 L24 30 L44 38 L69 17 M5 41 L24 44 L44 22 L69 34" stroke="#087f70" stroke-width="3" fill="none"/><path d="M5 29 L24 17 L44 40 L69 45" stroke="#e09b57" stroke-width="3" fill="none"/>',
'<rect x="8" y="9" width="24" height="47" fill="#e8f2ec" rx="3"/><rect x="49" y="9" width="24" height="47" fill="#e8f2ec" rx="3"/><rect x="8" y="33" width="24" height="23" fill="#e09b57"/><rect x="49" y="23" width="24" height="33" fill="#087f70"/>',
'<rect x="18" y="3" width="42" height="13" rx="3" fill="#b5d9ca"/><path d="M39 16 V24 M18 24 H60 M18 24 V31 M60 24 V31" stroke="#087f70" fill="none" stroke-width="2"/><rect x="3" y="31" width="32" height="20" fill="#def0e5" rx="3"/><rect x="45" y="31" width="32" height="20" fill="#def0e5" rx="3"/>',
'<rect x="9" y="9" width="29" height="22" fill="#d8f0e4"/><rect x="40" y="9" width="29" height="22" fill="#f7e9db"/><rect x="9" y="33" width="29" height="22" fill="#f7e9db"/><rect x="40" y="33" width="29" height="22" fill="#d8f0e4"/>'
];
function cta(t){
 const base=defaults[t.cat]||defaults['Estadística descriptiva'];
 const override=custom[t.slug]||{};
 let g=Object.assign({},base,override);
 if(!override.ask)g.ask=t.question;
 if(!override.when)g.when='Pídela cuando tu pregunta sea: «'+t.question+'». '+t.use+' '+base.when;
 if(!override.paper)g.paper=t.format+' '+base.paper;
 if(!override.lay)g.lay=t.meaning+' '+base.lay;
 if(!override.need){
  const n=t.name.toLowerCase();
  if(/kappa de cohen/.test(n))g.need='Dos evaluadores clasifican independientemente las mismas unidades en categorías; se necesita una matriz de concordancia y categorías coincidentes.';
  else if(/intraclase/.test(n))g.need='Calificaciones cuantitativas de las mismas unidades por dos o más evaluadores o repeticiones, con identificadores y diseño de medición.';
  else if(/t de welch|t de student independiente|mann.whitney/.test(n))g.need='Una variable numérica u ordinal (según prueba), dos grupos independientes, observaciones válidas y tamaños de ambos grupos.';
  else if(/t pareada|wilcoxon de rangos con signo/.test(n))g.need='Dos mediciones emparejadas por identificador de persona o unidad; no basta con dos promedios generales.';
  else if(/anova de un factor|kruskal|tukey|levene/.test(n))g.need='Una variable de resultado por caso, tres o más grupos independientes cuando corresponda y tamaños y dispersión por grupo.';
  else if(/friedman|anova de medidas repetidas/.test(n))g.need='Tres o más mediciones relacionadas de las mismas personas, orden de medición e identificador único por unidad.';
  else if(/shapiro.wilk|kolmogorov|asimetría|curtosis/.test(n))g.need='Observaciones numéricas individuales suficientes para examinar la distribución y su forma; no únicamente promedios agregados.';
  else if(/regresión logística binaria|regresión probit|logística ordinal|logística multinomial/.test(n))g.need='Resultado codificado de manera coherente como binario, ordinal o nominal según el modelo; predictores, categorías de referencia y una fila por caso.';
  else if(/correlación (de pearson|de spearman)|tau de kendall|parcial/.test(n))g.need='Dos variables observadas por las mismas personas, con su escala de medición y casos completos para los pares; covariables adicionales en correlación parcial.';
  else if(/mcnemar/.test(n))g.need='Dos respuestas binarias de las mismas personas emparejadas en el tiempo, con todas las transiciones Sí→No, No→Sí y concordancias.';
  else if(/exacta de fisher|phi|riesgo relativo|odds ratio|diferencia de riesgos/.test(n))g.need='Tabla de eventos Sí/No por exposición o grupo con cuatro recuentos y denominadores de ambos grupos.';
  else if(/chi.cuadrado|cramér|contingencia/.test(n))g.need='Dos variables categóricas por persona y recuentos de todas las combinaciones de sus categorías.';
  else if(/análisis factorial exploratorio|kmo|bartlett|factorial confirmatorio|rasch|respuesta al ítem|policórica/.test(n))g.need='Respuestas individuales a múltiples preguntas o ítems, categorías bien codificadas, diseño de escala y matriz de asociaciones, con datos faltantes revisados.';
  else if(/de perfiles latentes|de clases latentes|clúster|k.means|pam|componentes principales|correspondencias/.test(n))g.need='Múltiples indicadores de las mismas unidades, definidos según su escala, con normalización si corresponde, datos faltantes y criterios para elegir grupos o dimensiones.';
  else if(/curva roc|auc|calibración|brier|validación cruzada|bosques aleatorios|boosting/.test(n))g.need='Resultado real por caso, predicción o puntuación del modelo y un conjunto de datos reservado para estimar desempeño fuera de muestra.';
 }
 return g;
}
function h(text){return esc(text||'')}
function link(ref){return '<a href="'+h(ref.url)+'" target="_blank" rel="noopener noreferrer">'+h(ref.title)+' ↗</a>'}
function brBar(name,pct,tail){return '<div class="humanBarRow"><label>'+h(name)+'</label><div class="humanBarOuter"><span style="width:'+pct+'%"></span></div><strong>'+h(tail||pct+' %')+'</strong></div>'}
function iconarray(on,total=100){let out='<div class="humanIconGrid" aria-label="'+on+' de '+total+' personas destacadas">';for(let i=0;i<total;i++)out+='<i'+(i<on?' class="on"':'')+'></i>';return out+'</div>'}
function profileSvg(){let lines=[
['#087f70',[49,60,30,43]],
['#d68b49',[15,31,57,62]],
['#5b7cb3',[44,29,40,16]]
];let s='<svg viewBox="0 0 620 200" role="img" aria-label="Tres perfiles ilustrativos sobre cuatro indicadores"><rect width="620" height="200" fill="#ffffff"/>';for(let k=0;k<5;k++){let y=20+k*33;s+='<line x1="50" y1="'+y+'" x2="580" y2="'+y+'" stroke="#e3ebe5"/>'}lines.forEach((p,j)=>{s+='<polyline points="'+p[1].map((q,i)=>(85+i*140)+','+(169-q*2)).join(' ')+'" fill="none" stroke="'+p[0]+'" stroke-width="3"/>';p[1].forEach((q,i)=>s+='<circle cx="'+(85+i*140)+'" cy="'+(169-q*2)+'" r="4.5" fill="'+p[0]+'"/>')});['Ingreso','Redes','Gestión','Colaboración'].forEach((n,i)=>s+='<text x="'+(85+i*140)+'" y="191" font-size="11" text-anchor="middle" fill="#667d70">'+n+'</text>');return s+'</svg>'}
function abstract(t,g){
let demo=g.demo || (t.viz==='alpha'?'alpha':t.viz==='forest'?'ci':t.viz==='confusion'?'classification':t.viz==='timeseries'?'time':t.viz==='slope'?'change':t.viz==='heatmap'?'crosstab':t.viz==='association'?'scatter':t.viz==='clusters'?'profiles':'general');
if(demo==='agreement')return '<div class="humanLead">¿Coinciden los dos evaluadores más de lo que cabría esperar por azar?</div><div class="humanMetric"><div class="big">κ = 0,72</div><div class="small">El acuerdo observado se resume con kappa, que tiene en cuenta el acuerdo esperado por azar según las distribuciones marginales. Se necesita también la tabla cruzada entre evaluadores.</div></div><div class="humanFine">Ejemplo ilustrativo de kappa. No confundir con la precisión de un clasificador respecto a una verdad observada.</div>';
if(demo==='alpha'){
const omega=t.slug==='omega-de-mcdonald',coef=omega?'ω = 0,89':'α = 0,86';
return '<div class="humanLead">¿Las preguntas están midiendo algo coherente entre sí?</div><div class="humanMetric"><div class="big">'+coef+'</div><div class="small">Este número resume la consistencia de las respuestas de los ítems. <strong>No significa que el 86 % o el 89 % de las personas esté de acuerdo</strong> ni que la escala sea válida por ese solo hecho.</div></div>'+brBar('Ítem 1',52,'r = 0,52')+brBar('Ítem 2',63,'r = 0,63')+brBar('Ítem 3',71,'r = 0,71')+brBar('Ítem 4',49,'r = 0,49')+brBar('Ítem 5',58,'r = 0,58')+'<div class="humanFine">Ejemplo ficticio de correlaciones ítem-total corregidas. La barra muestra la magnitud del coeficiente de cada ítem, no respuestas positivas ni porcentajes. Para omega, las barras también son solamente un diagnóstico ilustrativo.</div>';
}
if(demo==='crosstab')return '<div class="humanLead">La respuesta puede variar entre grupos.</div>'+brBar('Grupo A',61.25,'49 de 80')+brBar('Grupo B',50,'40 de 80')+brBar('Grupo C',38.75,'31 de 80')+'<div class="humanSub">Ejemplo distinto y calculable: el grupo A tiene 61,25 % de respuestas Sí frente al 38,75 % del grupo C. Una prueba χ² permite evaluar la evidencia de asociación; V de Cramér expresa su intensidad.</div><div class="humanFine">Tabla ilustrativa: 49/31, 40/40 y 31/49 respuestas Sí/No; N = 240. Para estos recuentos, χ²(2) = 8,10, p ≈ 0,017 y V ≈ 0,184. No corresponde necesariamente al resultado simulado de la ficha original.</div>';
if(demo==='risk'||demo==='odds'||demo==='logistic'){
let vals=demo==='odds'? [20,36.5]:demo==='logistic'?[20,31.03]:[20,29];
return '<div class="humanLead">Comparar personas permite entender el efecto mejor que un coeficiente solo.</div><div class="humanTwo"><div><div class="big">'+Math.round(vals[0])+' %</div><div class="cap">Grupo de referencia · riesgo supuesto</div></div><div><div class="big">'+Math.round(vals[1])+' %</div><div class="cap">Grupo comparado · riesgo resultante del supuesto</div></div></div>'+brBar('Referencia',vals[0])+brBar('Comparado',vals[1].toFixed(1),vals[1].toFixed(1)+' %')+'<div class="humanSub">Conocer el riesgo inicial permite traducir una razón a probabilidades concretas. Un OR no es un riesgo relativo: sus porcentajes resultantes dependen del riesgo inicial.</div><div class="humanFine">Escenario conceptual independiente de una base observada. '+(demo==='odds'?'Ejemplo: OR = 2,30 sobre riesgo inicial de 20 % produce riesgo cercano a 36,5 %.':demo==='logistic'?'Ejemplo: OR = 1,80 sobre riesgo inicial de 20 % produce riesgo cercano a 31 %.':'Este escenario usa 20 % y 29 % como riesgos supuestos: RR = 1,45 y diferencia = 9 puntos porcentuales.')+'</div>';
}
if(demo==='classes')return '<div class="humanLead">Las clases se distinguen por las probabilidades de responder Sí.</div>'+brBar('Clase A · ítem 1',72,'72 %')+brBar('Clase B · ítem 1',24,'24 %')+brBar('Clase C · ítem 1',55,'55 %')+'<div class="humanSub">En LCA interesa la probabilidad condicional de cada respuesta dentro de cada clase. Una tabla o barras por ítem evita confundirlas con medias continuas.</div><div class="humanFine">Probabilidades ficticias de un ítem, creadas solo para explicar el formato. En el informe real deben incluirse todos los ítems, tamaños de clase y criterios de ajuste.</div>';
if(demo==='profiles')return '<div class="humanLead">No todas las personas muestran el mismo patrón.</div>'+profileSvg()+'<div class="humanTwo"><div><div class="big">52 %</div><div class="cap">Perfil 1 · mayor presencia</div></div><div><div class="big">36 % / 12 %</div><div class="cap">Perfiles 2 y 3 · grupos distintos</div></div></div><div class="humanFine">Los trazos representan valores de ejemplo, NO resultados empíricos. En un artículo se agregan tamaños n, criterios BIC/AIC y la incertidumbre de clasificación; las etiquetas de perfil se justifican con los datos.</div>';
if(demo==='icons')return '<div class="humanLead">122 de 240 casos corresponden a mujeres: 50,8 %.</div>'+iconarray(51)+'<div class="humanSub">Cada cuadrado equivale aproximadamente a una de cada 100 personas. El dato exacto siempre se comunica con numerador y denominador.</div><div class="humanFine">Cuadrícula redondeada a 51 de cada 100. El porcentaje exacto de 122/240 es 50,8 %. No refleja casos individuales reales.</div>';
if(demo==='change')return '<div class="humanLead">Lo importante es cuánto cambian las mismas personas.</div><div class="humanSteps"><span>Antes · ejemplo 61</span><b>→</b><span>Después · ejemplo 65,2</span><b>→</b><span>+4,2 puntos</span></div><div class="humanSub">Además de comunicar el cambio promedio, conviene mostrar trayectorias o diferencias individuales y el intervalo de confianza del cambio.</div><div class="humanFine">Niveles inicial y final inventados para ilustrar un cambio de +4,2; no son el conjunto de datos de la ficha.</div>';
if(demo==='switch')return '<div class="humanLead">No basta con comparar dos porcentajes: importa quién cambió.</div><div class="humanTwo"><div><div class="big">35</div><div class="cap">Pasaron de No a Sí</div></div><div><div class="big">12</div><div class="cap">Pasaron de Sí a No</div></div></div><div class="humanSub">La prueba de McNemar se fija en estos pares discordantes. La matriz de transición muestra el tipo de cambio, no solo el resultado final.</div><div class="humanFine">Datos ficticios de la demostración de McNemar. Los concordantes deben aparecer en la tabla completa del estudio.</div>';
if(demo==='ci')return '<div class="humanLead">La magnitud y la incertidumbre importan más que una estrella de significación.</div><div class="humanMetric"><div class="big">'+h(t.out.split(' · ')[0])+'</div><div class="small">Una estimación debe aparecer junto a su intervalo cuando sea posible. La cifra sola impide juzgar precisión y relevancia práctica.</div></div><div class="humanFine">En revistas científicas se usan forest plots y estimation plots para visualizar el tamaño de efectos y sus intervalos de confianza; en la ficha inferior está el ejemplo numérico.</div>';
if(demo==='classification')return '<div class="humanLead">Una predicción puede acertar y también generar errores costosos.</div><div class="humanTwo"><div><div class="big">42</div><div class="cap">Positivos detectados correctamente</div></div><div><div class="big">18</div><div class="cap">Alertas positivas que eran casos negativos</div></div></div><div class="humanTwo"><div><div class="big">12</div><div class="cap">Positivos que no fueron identificados</div></div><div><div class="big">128</div><div class="cap">Negativos identificados correctamente</div></div></div><div class="humanFine">Matriz ficticia n = 200. Para ROC/AUC, esta matriz corresponde a UN umbral, no contiene por sí sola toda la curva ROC.</div>';
if(demo==='flow')return '<div class="humanLead">Primero, ¿qué ocurrió con cada caso de la investigación?</div><div class="humanSteps"><span>500 elegibles</span><b>→</b><span>400 participantes</span><b>→</b><span>360 analizados</span></div><div class="humanSub">Una figura de flujo explica denominadores, pérdidas y exclusiones. En estudios aleatorizados CONSORT 2025 es referencia central; en observacionales, STROBE.</div><div class="humanFine">Cifras inventadas solamente para explicar el formato. Una muestra real se reporta con los motivos de pérdida y análisis.</div>';
if(demo==='time')return '<div class="humanLead">Las observaciones cambian y cada momento cuenta.</div>'+brBar('Mes 1',56,'56')+brBar('Mes 6',68,'68')+brBar('Mes 12',74,'74')+'<div class="humanSub">Identifica el cambio total, las fechas y el periodo. Para supervivencia, la curva debe incorporar censura y personas todavía en riesgo, no interpretar la línea como simple conteo.</div><div class="humanFine">Valores temporales de ejemplo sin relación directa con los coeficientes de la ficha.</div>';
if(demo==='scatter')return '<div class="humanLead">Dos variables pueden moverse juntas sin que una cause la otra.</div><div class="humanTwo"><div><div class="big">↗</div><div class="cap">Tendencia positiva</div></div><div><div class="big">'+h(t.out.split(' · ')[0])+'</div><div class="cap">Indicador de asociación</div></div></div><div class="humanSub">Muestre el diagrama de dispersión y la escala de las variables antes de reducir la relación a un solo número.</div>';
return '<div class="humanLead">'+h(g.ask)+'</div><div class="humanMetric"><div class="big">'+h(t.out.split(' · ')[0])+'</div><div class="small">'+h(g.lay||t.meaning)+'</div></div><div class="humanFine">Esta representación prioriza el mensaje. Debajo se conserva la tabla técnica y el gráfico esquemático del método para revisión académica.</div>';
}
function makeGuide(t){
let g=cta(t),source=g.source||journals[t.cat];
const panels='<div class="decisionGrid">'+
'<div class="decisionItem"><div class="title">¿CUÁNDO CONVIENE SACAR ESTE DATO?</div><h4>El momento adecuado</h4><p>'+h(g.when)+'</p></div>'+
'<div class="decisionItem"><div class="title">¿QUÉ NECESITO EN LA BASE?</div><h4>Datos mínimos para calcularlo</h4><p>'+h(g.need)+'</p></div>'+
'<div class="decisionItem"><div class="title">¿QUÉ DEBERÍA ENTREGARME EL ANALISTA?</div><h4>Resultado verificable</h4><p>'+h(g.paper)+'</p></div>'+
'<div class="decisionItem warn"><div class="title">¿CUÁNDO NO PEDIRLO?</div><h4>Evita una técnica que no responde tu pregunta</h4><p>'+h(g.avoid)+'</p></div>'+
'</div>';
return '<section class="humanIntro" id="decidir"><div class="eyebrow">COMIENZA POR LA PREGUNTA, NO POR EL NOMBRE</div><h3>'+h(g.ask)+'</h3><p>'+h(g.lay)+'</p><div class="methodStrip"><span>1 · Pregunta</span><span>2 · Datos disponibles</span><span>3 · Técnica adecuada</span><span>4 · Lectura comprensible</span></div></section>'+
panels+
'<section class="humanDemo"><div class="demohead"><strong>Una manera humana de contar este resultado</strong><small>Visual abstract didáctico · no es un resultado empírico</small></div><div class="demoInner">'+abstract(t,g)+'<div class="humanRef"><strong>Ver cómo se comunica en la literatura: </strong>'+link(source)+' <span style="color:#94a59e">('+h(source.kind)+')</span><div style="margin-top:7px">Es una referencia publicada para estudiar el formato y la interpretación, no la fuente de los números simulados de esta ficha.</div></div></div></section>';
}
function gallerySection(){
return '<section class="humanGuide" id="galeria"><div class="eyebrow">REFERENCIAS DE REVISTAS CIENTÍFICAS</div><h3>Ocho formas de presentar los datos para que se entiendan</h3><p>Una técnica estadística no exige siempre una gráfica particular. Estas son formas distintas de traducir resultados: elige la pregunta y se abrirá un ejemplo dentro del diccionario.</p><div class="humanGallery">'+gallery.map((g,i)=>'<button type="button" class="humanGalCard" data-go="'+h(g[1])+'"><svg viewBox="0 0 82 60" aria-hidden="true">'+galleryIcon[i]+'</svg><strong>'+h(g[0])+'</strong><small>'+h(g[2])+'</small></button>').join('')+'</div><div class="humanPrinciples"><strong>Principios de revistas:</strong> mostrar denominadores y tamaños de muestra; priorizar diferencia absoluta y magnitud antes del valor p; acompañar resultados de su incertidumbre; enseñar la distribución real; reconocer cuando una tabla informa mejor que un gráfico. JAMA desaconseja gráficos 3D y de torta para figuras estadísticas porque dificultan comparaciones precisas.</div><p><a class="guidelink" href="https://jamanetwork.com/pages/visual-abstracts" target="_blank" rel="noopener">JAMA · Visual Abstracts ↗</a> · <a class="guidelink" href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6480976/" target="_blank" rel="noopener">Raincloud plots ↗</a> · <a class="guidelink" href="https://www.bmj.com/content/389/bmj-2024-081124" target="_blank" rel="noopener">CONSORT 2025 ↗</a></p></section>';
}
function decisionSection(){
return '<section class="humanGuide" id="preguntas"><div class="eyebrow">NO NECESITAS SABER EL NOMBRE DE LA TÉCNICA</div><h3>¿Qué necesitas descubrir en tus datos?</h3><p>Escoge un problema de investigación. El diccionario te mostrará una técnica inicial pertinente; la selección definitiva depende del diseño y de la base disponible.</p><div class="humanSelector">'+topicChoices.map(x=>'<button type="button" data-go="'+h(x[1])+'" title="'+h(x[2])+'">'+h(x[0])+' ↗</button>').join('')+'</div></section>';
}
const oldRender=render;
render=function(){
 oldRender();
 const panel=document.querySelector('.detailBody');
 if(panel){panel.insertAdjacentHTML('afterbegin',makeGuide(selected));}
};
document.querySelector('.workspace')?.insertAdjacentHTML('beforebegin',decisionSection()+gallerySection());
document.addEventListener('click',function(e){
 let button=e.target.closest('[data-go]');if(!button)return;
 let found=techniques.find(t=>t.slug===button.dataset.go);
 if(found){activeCat='Todas';$('query').value='';open(found,true);}
});
render();
})();
