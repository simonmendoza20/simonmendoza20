# Modelo predictivo con Apache Spark MLlib

**Estudiante:** Simón Mendoza  
**Tecnologías:** Python · PySpark · Spark MLlib · Random Forest

## Objetivo

Construir un flujo de clasificación binaria con **Apache Spark MLlib** para identificar transacciones potencialmente riesgosas a partir de un conjunto de ventas simulado.

Para el ejercicio académico se definió una etiqueta explícita: una operación se considera riesgosa cuando `Monto_Total > 10000` o cuando ocurre entre las 00:00 y las 05:59. Esta decisión permite practicar el flujo completo de preparación, transformación, entrenamiento, predicción y evaluación.

## Datos y preparación

El ejercicio trabaja con **200 registros**. Bajo la regla simulada se obtienen **110 transacciones normales** y **90 riesgosas**.

El flujo realiza:

1. lectura del archivo `ventas_simuladas_spark.csv`;
2. conversión explícita de variables numéricas;
3. transformación de fecha y hora;
4. tratamiento de categorías faltantes;
5. creación documentada de la variable `label`;
6. imputación por mediana de variables numéricas;
7. codificación de `Sucursal` y `Producto` mediante `StringIndexer`;
8. construcción del vector `features` con `VectorAssembler`.

## Modelo

Se utiliza `RandomForestClassifier` dentro de un `Pipeline` de Spark:

- división entrenamiento/prueba 80/20;
- semilla 42;
- 120 árboles;
- profundidad máxima 6;
- uso de `cache()` para evitar recomputaciones innecesarias durante la evaluación.

## Evaluación

El script calcula:

- Accuracy;
- F1-score;
- Area Under ROC.

En la validación de control desarrollada para la entrega, las tres métricas alcanzaron 1,000. Este resultado **no se interpreta como desempeño productivo**: la etiqueta es sintética y se construye directamente a partir de variables que el propio modelo observa. Por ello, el resultado sirve principalmente para validar el funcionamiento técnico del pipeline.

## Reflexión técnica

Random Forest resulta adecuado para el ejercicio porque puede representar relaciones no lineales y combinaciones entre monto, horario y variables categóricas sin exigir supuestos de linealidad. Para una aplicación real sería necesario disponer de etiquetas históricas independientes, realizar validación cruzada, ajustar hiperparámetros, revisar desbalance de clases y evaluar el modelo sobre datos externos.

## Archivos

- [`spark_mllib.py`](./spark_mllib.py): implementación completa del pipeline.

## Ejecución

1. Instalar PySpark si no está disponible:

```bash
pip install pyspark
```

2. Colocar `ventas_simuladas_spark.csv` en la misma carpeta o ajustar `INPUT_PATH`.
3. Ejecutar:

```bash
python spark_mllib.py
```

## Alcance

Proyecto académico orientado a demostrar el uso correcto de Spark MLlib y la construcción de un pipeline reproducible. La documentación mantiene visible la principal limitación metodológica del ejercicio para evitar confundir una demostración técnica con un modelo validado para producción.
