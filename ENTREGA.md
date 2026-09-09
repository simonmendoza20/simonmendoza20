# Entrega — Desarrollo de portafolio de un producto digital

**Estudiante:** Simón Mendoza Aravena

## Ruta sugerida de revisión

1. Revisar el `README.md` principal para la identificación, bio, intereses, búsqueda profesional, enlaces, razones de elección de GitHub y buenas prácticas.
2. Revisar `evidencias/planificacion-portafolio-anterior.md` para comprobar la continuidad con el desafío previo.
3. Revisar `proyectos/cnn-digitos/` como trabajo principal cargado en el portafolio. La carpeta contiene documentación, código ejecutable y dependencias.
4. Como evidencia adicional, revisar `proyectos/spark-mllib/` y el repositorio público `Datos-COVID19` enlazado desde la portada.

## Correspondencia con la rúbrica

### Requerimiento 1 — 2 puntos

Se reúne la planificación anterior: selección y características del repositorio, razones de elección, referencia de portafolio, buenas prácticas, prueba escogida y mejoras previstas. Las mejoras se aplican en la versión actual del proyecto CNN.

### Requerimiento 2 — 4 puntos

El perfil contiene:

- nombre real: Simón Mendoza Aravena;
- fotografía/avatar;
- información personal y profesional;
- intereses y búsqueda profesional;
- enlaces a GitHub y perfil académico externo.

### Requerimiento 3 — 4 puntos

El repositorio contiene trabajos correctamente documentados. El principal es **Reconocimiento de dígitos con CNN**, con README, código y archivo de dependencias. También se incluye un proyecto con Apache Spark MLlib como evidencia complementaria.

## Trabajo principal

**Reconocimiento de imágenes con redes neuronales convolutivas**

- Dataset: 1.797 observaciones y 64 píxeles por imagen.
- Formato de entrada: imágenes 8 × 8 × 1.
- Modelo base: accuracy de test 96,67 %, loss 0,1277.
- Modelo optimizado: accuracy de test 98,89 %, loss 0,0463.
- Resultado final: 356 de 360 imágenes correctamente clasificadas.
- Mejoras: segunda capa convolutiva, Dropout, EarlyStopping y comparación antes/después.
