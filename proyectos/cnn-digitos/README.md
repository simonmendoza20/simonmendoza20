# Reconocimiento de dígitos con redes neuronales convolutivas

**Estudiante:** Simón Mendoza  
**Tecnologías:** Python · Keras/TensorFlow · NumPy · pandas · scikit-learn · Matplotlib

## Objetivo

Construir y evaluar una red neuronal convolutiva (CNN) capaz de clasificar dígitos escritos a mano del 0 al 9 a partir de imágenes en escala de grises.

El conjunto de datos utilizado en la prueba contiene **1.797 observaciones**, **64 variables de píxeles** y una variable objetivo `label`. Las 64 variables se reorganizan como imágenes de **8 × 8 píxeles** con un canal de escala de grises.

## Preparación de los datos

El script realiza un flujo reproducible:

1. carga el archivo `digitos_mnist_simple.xlsx` o su versión CSV;
2. separa las variables de píxeles y la etiqueta;
3. transforma cada observación a `(8, 8, 1)`;
4. normaliza los píxeles al rango 0–1;
5. utiliza una semilla fija (`SEED = 42`);
6. realiza una división estratificada en entrenamiento, validación y prueba.

## Modelo base

La primera arquitectura utiliza:

- `Conv2D(32)`;
- `MaxPooling2D`;
- `Flatten`;
- capa densa de 64 unidades;
- salida `softmax` de 10 clases;
- optimizador Adam.

Se registran las curvas de `accuracy` y `loss` para entrenamiento y validación.

## Modelo optimizado

La segunda arquitectura incorpora tres mejoras principales:

- una segunda capa convolutiva con 64 filtros;
- regularización con `Dropout`;
- `EarlyStopping` con restauración de los mejores pesos.

Además, se mantiene una separación independiente de prueba para comparar ambas versiones en condiciones equivalentes.

## Resultados

En la evaluación realizada para la prueba:

| Modelo | Accuracy de test |
|---|---:|
| CNN base | 96,67 % |
| CNN optimizada | 97,50 % |

La versión optimizada también redujo el `loss` aproximadamente **42,86 %** respecto del modelo base. La entrega incluye matriz de confusión, reporte por clase y comparación final de resultados.

## Mejoras incorporadas para el portafolio

Para presentar el proyecto de forma más clara se aplicaron las mejoras definidas en la planificación previa del portafolio: ficha inicial con objetivo y tecnologías, separación explícita entre modelo base y optimizado, semilla fija para favorecer reproducibilidad, comparación antes/después y una sección que explicita las limitaciones del ejercicio.

## Archivos

- [`cnn_digitos.py`](./cnn_digitos.py): implementación completa de la prueba.
- [`requirements.txt`](./requirements.txt): dependencias principales.

## Ejecución

1. Colocar `digitos_mnist_simple.xlsx` en esta carpeta, o modificar la variable `ARCHIVO` para usar la versión CSV.
2. Instalar las dependencias:

```bash
pip install -r requirements.txt
```

3. Ejecutar:

```bash
python cnn_digitos.py
```

## Alcance y limitaciones

Este es un ejercicio académico con imágenes pequeñas de 8 × 8 píxeles. Los resultados permiten evaluar el flujo de modelamiento y las técnicas de mejora utilizadas, pero no deben extrapolarse directamente a un sistema productivo sin validación adicional sobre datos externos y condiciones reales de uso.
