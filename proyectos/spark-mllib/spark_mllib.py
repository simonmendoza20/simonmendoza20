# Prueba - Modelo predictivo en Apache Spark MLlib
# Estudiante: Simón Mendoza

from pyspark.sql import SparkSession
from pyspark.sql.functions import col, hour, to_timestamp, when
from pyspark.ml import Pipeline
from pyspark.ml.feature import Imputer, StringIndexer, VectorAssembler
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.evaluation import MulticlassClassificationEvaluator, BinaryClassificationEvaluator

spark = SparkSession.builder.appName("PruebaSparkMLlib_SimonMendoza").getOrCreate()
spark.sparkContext.setLogLevel("WARN")

# -----------------------------------------------------------------------------
# 1. Preparación del dataset
# -----------------------------------------------------------------------------
INPUT_PATH = "ventas_simuladas_spark.csv"

df = (
    spark.read.option("header", True)
    .option("inferSchema", True)
    .option("encoding", "UTF-8")
    .csv(INPUT_PATH)
)

df = (
    df.withColumn("Cantidad", col("Cantidad").cast("double"))
    .withColumn("Precio_Unitario", col("Precio_Unitario").cast("double"))
    .withColumn("Monto_Total", col("Monto_Total").cast("double"))
    .withColumn("Fecha_Hora_ts", to_timestamp(col("Fecha_Hora"), "yyyy-MM-dd HH:mm:ss"))
    .withColumn("Hora", hour(col("Fecha_Hora_ts")).cast("double"))
    .fillna({"Sucursal": "DESCONOCIDA", "Producto": "DESCONOCIDO"})
)

# Etiqueta sintética del ejercicio: monto alto o transacción de madrugada.
df = df.withColumn(
    "label",
    when((col("Monto_Total") > 10000) | (col("Hora").between(0, 5)), 1.0).otherwise(0.0),
)

df.printSchema()
df.groupBy("label").count().orderBy("label").show()

# -----------------------------------------------------------------------------
# 2. Pipeline, entrenamiento y predicción
# -----------------------------------------------------------------------------
train_df, test_df = df.randomSplit([0.80, 0.20], seed=42)
train_df = train_df.cache()
test_df = test_df.cache()

imputer = Imputer(
    inputCols=["Cantidad", "Precio_Unitario", "Monto_Total", "Hora"],
    outputCols=["Cantidad_imp", "Precio_Unitario_imp", "Monto_Total_imp", "Hora_imp"],
    strategy="median",
)

sucursal_indexer = StringIndexer(
    inputCol="Sucursal", outputCol="Sucursal_idx", handleInvalid="keep"
)
producto_indexer = StringIndexer(
    inputCol="Producto", outputCol="Producto_idx", handleInvalid="keep"
)

assembler = VectorAssembler(
    inputCols=[
        "Cantidad_imp",
        "Precio_Unitario_imp",
        "Monto_Total_imp",
        "Hora_imp",
        "Sucursal_idx",
        "Producto_idx",
    ],
    outputCol="features",
    handleInvalid="keep",
)

rf = RandomForestClassifier(
    labelCol="label",
    featuresCol="features",
    numTrees=120,
    maxDepth=6,
    seed=42,
)

pipeline = Pipeline(
    stages=[imputer, sucursal_indexer, producto_indexer, assembler, rf]
)
model = pipeline.fit(train_df)
predictions = model.transform(test_df).cache()

predictions.select("features", "label").show(12, truncate=False)
predictions.select("label", "prediction", "probability").show(20, truncate=False)

# -----------------------------------------------------------------------------
# 3. Evaluación
# -----------------------------------------------------------------------------
accuracy = MulticlassClassificationEvaluator(
    labelCol="label", predictionCol="prediction", metricName="accuracy"
).evaluate(predictions)

f1 = MulticlassClassificationEvaluator(
    labelCol="label", predictionCol="prediction", metricName="f1"
).evaluate(predictions)

auc = BinaryClassificationEvaluator(
    labelCol="label", rawPredictionCol="rawPrediction", metricName="areaUnderROC"
).evaluate(predictions)

print(f"Accuracy:     {accuracy:.4f}")
print(f"F1-score:     {f1:.4f}")
print(f"AreaUnderROC: {auc:.4f}")
predictions.groupBy("label", "prediction").count().orderBy("label", "prediction").show()

# La etiqueta es sintética y se deriva de variables incluidas en features.
# Por ello, métricas muy altas validan principalmente el flujo técnico y no
# deben interpretarse como evidencia de desempeño en producción.

predictions.unpersist()
train_df.unpersist()
test_df.unpersist()
spark.stop()
