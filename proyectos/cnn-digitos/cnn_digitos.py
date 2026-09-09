# Prueba: Reconocimiento de imágenes con redes neuronales convolutivas
# Estudiante: Simón Mendoza
# El script acepta digitos_mnist_simple.csv o digitos_mnist_simple.xlsx.

from pathlib import Path
import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, classification_report

# Keras. En Google Colab normalmente se utilizará TensorFlow; si no está disponible,
# Keras 3 puede ejecutarse con otro backend compatible (por ejemplo, torch).
try:
    import tensorflow as tf
    from tensorflow import keras
    from tensorflow.keras import layers
except ModuleNotFoundError:
    os.environ["KERAS_BACKEND"] = "torch"
    import keras
    from keras import layers

SEED = 42
keras.utils.set_random_seed(SEED)

# -----------------------------------------------------------------------------
# 1. Carga y preparación de datos
# -----------------------------------------------------------------------------
ARCHIVO = Path("digitos_mnist_simple.xlsx")  # cambiar a .csv si corresponde

if ARCHIVO.suffix.lower() == ".csv":
    df = pd.read_csv(ARCHIVO)
elif ARCHIVO.suffix.lower() in {".xlsx", ".xls"}:
    df = pd.read_excel(ARCHIVO)
else:
    raise ValueError("Formato no soportado. Use CSV o XLSX.")

X = df.drop(columns="label").to_numpy(dtype="float32")
y = df["label"].to_numpy(dtype="int64")

# Cada imagen tiene 64 píxeles: 8 x 8. Se agrega el canal de escala de grises.
X = X.reshape(-1, 8, 8, 1)

# Los píxeles están en el rango 0-16. Se normalizan al rango 0-1.
X = X / 16.0

# División estratificada: 64% entrenamiento, 16% validación y 20% prueba.
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=SEED, stratify=y
)
X_train, X_val, y_train, y_val = train_test_split(
    X_train, y_train, test_size=0.20, random_state=SEED, stratify=y_train
)

print(f"Entrenamiento: {len(X_train)}")
print(f"Validación:    {len(X_val)}")
print(f"Prueba:        {len(X_test)}")

# -----------------------------------------------------------------------------
# 2. Modelo CNN base
# -----------------------------------------------------------------------------
def crear_modelo_base():
    modelo = keras.Sequential([
        layers.Input(shape=(8, 8, 1)),
        layers.Conv2D(32, (3, 3), activation="relu"),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(64, activation="relu"),
        layers.Dense(10, activation="softmax")
    ])
    modelo.compile(
        optimizer="adam",
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )
    return modelo

modelo_base = crear_modelo_base()
hist_base = modelo_base.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=15,
    batch_size=32,
    verbose=1
)

loss_base, acc_base = modelo_base.evaluate(X_test, y_test, verbose=0)
pred_base = np.argmax(modelo_base.predict(X_test, verbose=0), axis=1)
print(f"\nMODELO BASE - accuracy test: {acc_base:.4f} | loss test: {loss_base:.4f}")

# Curvas modelo base
plt.figure(figsize=(7, 4))
plt.plot(hist_base.history["accuracy"], label="Entrenamiento")
plt.plot(hist_base.history["val_accuracy"], label="Validación")
plt.xlabel("Época")
plt.ylabel("Accuracy")
plt.title("Accuracy - modelo base")
plt.legend()
plt.tight_layout()
plt.show()

plt.figure(figsize=(7, 4))
plt.plot(hist_base.history["loss"], label="Entrenamiento")
plt.plot(hist_base.history["val_loss"], label="Validación")
plt.xlabel("Época")
plt.ylabel("Loss")
plt.title("Loss - modelo base")
plt.legend()
plt.tight_layout()
plt.show()

# -----------------------------------------------------------------------------
# 3. Modelo optimizado
# Técnicas aplicadas:
# - ajuste de arquitectura/hiperparámetros;
# - Dropout como regularización;
# - EarlyStopping para detener el entrenamiento cuando deja de mejorar.
# -----------------------------------------------------------------------------
def crear_modelo_optimizado():
    modelo = keras.Sequential([
        layers.Input(shape=(8, 8, 1)),
        layers.Conv2D(32, (3, 3), padding="same", activation="relu"),
        layers.Conv2D(64, (3, 3), padding="same", activation="relu"),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        layers.Flatten(),
        layers.Dense(64, activation="relu"),
        layers.Dropout(0.35),
        layers.Dense(10, activation="softmax")
    ])
    modelo.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )
    return modelo

modelo_opt = crear_modelo_optimizado()
early_stopping = keras.callbacks.EarlyStopping(
    monitor="val_loss",
    patience=4,
    restore_best_weights=True
)

hist_opt = modelo_opt.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=40,
    batch_size=32,
    callbacks=[early_stopping],
    verbose=1
)

loss_opt, acc_opt = modelo_opt.evaluate(X_test, y_test, verbose=0)
pred_opt = np.argmax(modelo_opt.predict(X_test, verbose=0), axis=1)
print(f"\nMODELO OPTIMIZADO - accuracy test: {acc_opt:.4f} | loss test: {loss_opt:.4f}")
print(f"Épocas ejecutadas: {len(hist_opt.history['loss'])}")

# Curvas modelo optimizado
plt.figure(figsize=(7, 4))
plt.plot(hist_opt.history["accuracy"], label="Entrenamiento")
plt.plot(hist_opt.history["val_accuracy"], label="Validación")
plt.xlabel("Época")
plt.ylabel("Accuracy")
plt.title("Accuracy - modelo optimizado")
plt.legend()
plt.tight_layout()
plt.show()

plt.figure(figsize=(7, 4))
plt.plot(hist_opt.history["loss"], label="Entrenamiento")
plt.plot(hist_opt.history["val_loss"], label="Validación")
plt.xlabel("Época")
plt.ylabel("Loss")
plt.title("Loss - modelo optimizado")
plt.legend()
plt.tight_layout()
plt.show()

# Matriz de confusión del modelo final
cm = confusion_matrix(y_test, pred_opt, labels=np.arange(10))
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=np.arange(10))
disp.plot()
plt.title("Matriz de confusión - CNN optimizada")
plt.tight_layout()
plt.show()

print("\nREPORTE POR CLASE")
print(classification_report(y_test, pred_opt, digits=4))

# Comparación final
print("\nCOMPARACIÓN")
print(f"Accuracy base:       {acc_base:.4f}")
print(f"Accuracy optimizada: {acc_opt:.4f}")
print(f"Loss base:           {loss_base:.4f}")
print(f"Loss optimizada:     {loss_opt:.4f}")
