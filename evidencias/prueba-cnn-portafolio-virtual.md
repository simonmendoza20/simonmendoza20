# Prueba seleccionada para el Portafolio virtual

**Estudiante:** Simón Mendoza  
**Prueba:** Reconocimiento de imágenes con redes neuronales convolutivas  
**Institución:** Desafío Latam  
**Fecha:** Septiembre de 2026

## Justificación de la selección

Seleccioné esta prueba porque permite mostrar un flujo completo de trabajo con datos: preparación del conjunto, transformación de las variables de píxeles al formato requerido por una CNN, normalización, entrenamiento, evaluación mediante métricas y matriz de confusión, y posterior optimización del modelo.

## Datos y preparación

El conjunto contiene **1.797 observaciones**, **64 variables de píxeles** y una variable objetivo `label`. Cada fila representa una imagen de **8 x 8 píxeles** correspondiente a un dígito entre 0 y 9.

Los datos se reorganizaron al formato `(n, 8, 8, 1)` y los valores de intensidad se normalizaron al rango 0-1. Se utilizó una división estratificada con semilla 42 para separar entrenamiento, validación y prueba.

## Modelo base

La primera versión utiliza `Conv2D`, `MaxPooling2D`, `Flatten`, una capa densa y salida `softmax` para las diez clases.

**Resultados del modelo base:**

- Accuracy de prueba: **96,67 %**
- Loss de prueba: **0,1277**
- Aciertos: **348 de 360 imágenes**

## Mejoras aplicadas

Para la versión optimizada se incorporaron:

- una segunda capa convolutiva de 64 filtros;
- `Dropout` como técnica de regularización;
- `EarlyStopping` para detener el entrenamiento cuando la validación deja de mejorar;
- ajuste de arquitectura e hiperparámetros.

**Resultados del modelo optimizado:**

- Accuracy de prueba: **97,50 %**
- Loss de prueba: **0,0730**
- Aciertos: **351 de 360 imágenes**
- Mejora del accuracy: **+0,83 puntos porcentuales**
- Reducción aproximada del loss: **42,86 %**

## Reflexión

La comparación muestra que la optimización mejora el desempeño del modelo, aunque el modelo base ya presentaba resultados altos. Las principales dificultades se concentran en dígitos visualmente semejantes debido a la baja resolución de las imágenes. Como mejora futura sería conveniente evaluar el sistema con muestras externas y variaciones de escritura distintas.

## Mejoras previstas para el portafolio

Al presentar este trabajo como evidencia profesional se priorizará:

1. una ficha breve con objetivo, datos, herramientas y resultado principal;
2. separación clara entre entrenamiento, validación y prueba;
3. reproducibilidad mediante semilla fija;
4. comparación antes/después;
5. explicación de limitaciones y posibles mejoras.

[Volver al perfil de Simón Mendoza](../README.md)
