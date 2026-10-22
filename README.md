# ENTRE · Inteligencia de servicio

Micrositio estático de demostración sobre experiencia de servicio **interno** y relaciones entre unidades.

> **Advertencia:** Todos los nombres de áreas, cifras y relaciones del ejemplo son simulados. No corresponden a información real de ISALUD ni a una medición institucional.

## Qué contiene

- Tablero ejecutivo con indicadores ponderados.
- Matriz interactiva de 6 × 6 relaciones de servicio interno, con filtros por solicitante y prestadora.
- Tres perspectivas: satisfacción, cumplimiento de plazos y facilidad de gestión.
- Detalle por relación, con tamaños de muestra.
- Priorización exploratoria basada en volumen × porcentaje no favorable.
- Descarga de muestra CSV y guion para una exposición de 90 segundos.
- Diseño adaptable a equipos de escritorio y teléfonos, sin frameworks ni servicios de terceros.

## Abrir

Descarga la carpeta y abre `index.html` en un navegador. No requiere instalar programas ni levantar un servidor. También funciona publicada como página estática en GitHub Pages, Cloudflare Pages o Netlify.

## Publicación con GitHub Pages

1. Crea un repositorio público nuevo en tu cuenta (por ejemplo, `experiencia-interna-demo`).
2. Copia `index.html`, `styles.css` y `data.js` a la raíz. También puedes incluir `README.md` y `datos_simulados.csv`.
3. Ve a Settings → Pages y elige **Deploy from a branch**, `main`, carpeta `/(root)`.
4. GitHub publicará una URL `https://USUARIO.github.io/REPOSITORIO/` tras procesar el despliegue.

Para modificar el caso de demostración, edita las relaciones en `data.js`. El CSV adjunto contiene la misma muestra inicial.

## Principios de lectura

- Los porcentajes generales se calculan ponderados por número de evaluaciones, no promediando porcentajes simples.
- Las cifras de prioridad son **estimaciones exploratorias**, no recuentos de incidentes observados.
- La diagonal del mapa es no aplicable: el caso ficticio solo contempla evaluaciones entre áreas diferentes.
- El diseño no pretende representar la identidad corporativa oficial de ISALUD.

Diseño y propuesta metodológica: Simón Mendoza, octubre de 2026.