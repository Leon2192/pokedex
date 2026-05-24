# Pokedex Challenge

El proyecto prioriza separacion de responsabilidades, arquitectura escalable, cache con RTK Query, persistencia local y una UX completa para listado, detalle, equipo y comparacion.

## Stack

- React 18.x
- Vite 5.x
- JavaScript
- React Router v6
- Redux Toolkit
- RTK Query
- redux-persist
- Axios
- Styled Components
- Formik
- Yup
- Recharts
- PokeAPI

## Instalacion y ejecucion

```bash
npm install
```

Crear variables de entorno de la aplicacion:

```bash
cp .env.sample .env
```

Crear variables de entorno para E2E:

```bash
cp .env.testing.sample .env.testing
```

En Windows PowerShell tambien se pueden crear manualmente copiando el contenido de los archivos `.sample`.

## Variables de entorno

```bash
VITE_API_BASE_URL=https://pokeapi.co/api/v2
```

No se usan secretos, tokens ni variables sensibles.

Los tests E2E usan variables separadas de las variables del frontend para evitar acoplamiento accidental con entornos reales:

- `PLAYWRIGHT_BASE_URL`: URL donde Playwright levanta o reutiliza la app.
- `TEST_API_BASE_URL`: URL base usada solo por mocks/helpers de testing.

`.env.testing` no se usa por Vite ni por la app en runtime. Si falta, Playwright mantiene fallbacks locales seguros.

## Comandos

- `npm run dev`: levanta Vite en modo desarrollo.
- `npm run build`: genera el build de produccion.
- `npm run preview`: sirve localmente el build generado.
- `npm run format`: aplica Prettier a todo el proyecto.
- `npm run format:check`: valida formato sin modificar archivos.
- `npm run test:e2e`: corre la suite E2E con Playwright.
- `npm run test:e2e:ui`: abre el runner visual de Playwright.
- `npm run test:e2e:headed`: corre los tests con navegador visible.

## Arquitectura

El proyecto usa el patron Container / Presentational para vistas y componentes importantes:

```text
ComponentName/
  ComponentName.container.jsx
  ComponentName.jsx
  ComponentName.styled.js
  index.js
```

Responsabilidades:

- `*.container.jsx`: hooks, handlers, navegacion, selectors, query params y memoizacion.
- `*.jsx`: UI presentacional, sin llamadas a API ni reglas de negocio.
- `*.styled.js`: estilos con Styled Components.
- `index.js`: export limpio.

Flujo de datos HTTP:

```text
RTK Query
  -> axiosBaseQuery
  -> axiosInstance
  -> PokeAPI
```

Todas las llamadas a PokeAPI pasan por `pokemonApi`. No se usa `fetchBaseQuery` ni `fetch` directo.

## Estructura

```text
src/
  app/
  components/
  constants/
  helpers/
  hooks/
  layouts/
  pages/
    Compare/
    Pokedex/
    PokemonDetail/
    Team/
  routes/
  services/api/
  store/
  styles/
  utils/
```

## Decisiones tecnicas

**Container / Presentational**

Se usa para separar logica de render. Los containers concentran hooks, handlers, selectors, navegacion y datos derivados; los presentacionales reciben props listas y renderizan UI. Esto hace que las vistas sean mas simples de leer y evita mezclar reglas de negocio con JSX.

**RTK Query + Axios**

Todas las llamadas a PokeAPI pasan por `pokemonApi`. Se usa RTK Query para manejar server state, cache, loading, error, refetch y metadata. No se usa `fetchBaseQuery`: el challenge pedia Axios, por eso se implemento `axiosBaseQuery`, que delega en `axiosInstance`. `axiosInstance` centraliza `baseURL`, timeout, headers, interceptors y normalizacion de errores.

**Cache**

RTK Query evita requests redundantes y mantiene datos disponibles entre navegaciones. `keepUnusedDataFor` esta configurado para conservar cache durante un tiempo razonable cuando una pantalla se desmonta. La app usa metadata de RTK Query para mostrar indicadores de datos frescos, cacheados, actualizando cache o cache sin conexion.

**Persistencia**

`redux-persist` guarda el equipo y el cache cumplido de RTK Query. Esto permite que los datos sobrevivan al refresh y mejora el soporte offline. El cache rehidratado se marca como cacheado para no presentarlo como dato fresco. El tradeoff es que datos remotos podrian quedar temporalmente viejos; se mitiga con badges de frescura/cache, refetch al volver online y retry manual donde corresponde.

**Listado e infinite scroll**

El endpoint `/pokemon` devuelve solo `name` y `url`, por eso el listado se enriquece fuera de la UI para obtener sprite, numero y tipos. El infinite scroll usa `IntersectionObserver` sobre el ultimo item visible y bloqueos por loading, error, fin de resultados y estado offline para evitar requests duplicadas o loops sin conexion.

**Formularios**

Compare usa Formik para estado del formulario y Yup para validacion. Los schemas viven en `src/schemas` para mantener containers mas legibles y evitar validaciones inline.

**Graficos**

Se agrego Recharts para visualizar stats en detalle y comparacion. Es una opcion declarativa, responsive y simple para el challenge; evita mantener graficos custom con CSS y mantiene consistencia visual.

**Deploy SPA**

`vercel.json` configura rewrites a `/` para que React Router pueda resolver rutas internas al refrescar en Vercel.

## Features implementadas

- Listado principal de Pokemon con cards responsive.
- Busqueda por nombre con debounce.
- Filtros combinables por tipo y generacion.
- Query params en `/pokedex`.
- Infinite scroll con skeletons y estado de fin de resultados.
- Detalle en `/pokemon/:name` con imagen, sprites, variantes, tipos, habilidades, altura, peso y grafico de stats.
- Equipo en `/team` con maximo 6 Pokemon, persistencia, remove y estado vacio.
- Comparador en `/compare` con Formik/Yup, selects searchables y grafico comparativo de stats.
- Loading, error, retry y estados vacios en vistas principales.
- Estado de conexion online/offline.
- Indicadores de datos frescos, cacheados y cache sin conexion.

## Testing E2E

La configuracion E2E usa Playwright con una suite pequena y orientada a flujos criticos:

- Pokedex principal: carga inicial, cards visibles y busqueda por nombre.
- Detalle Pokemon: navegacion desde una card, informacion principal y vuelta al listado.
- Equipo: agregar un Pokemon, verlo en `/team` y validar persistencia despues de refrescar.
- Offline/cache: estado online/offline, cache disponible, pausa del infinite scroll sin conexion y rehidratacion del cache de RTK Query.
- Compare: render del grafico al comparar dos Pokemon.

Los tests mockean las respuestas minimas de PokeAPI para evitar dependencia de red externa y mantener ejecuciones rapidas y estables. No se busca cubrir toda la app: la suite funciona como smoke test de alto valor para demostrar que los flujos principales siguen sanos.

Playwright toma la URL base desde `PLAYWRIGHT_BASE_URL`. Para correr contra otro puerto o entorno local, modificar `.env.testing`:

```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1:5174
```

```bash
npm run test:e2e
```

Modo interactivo:

```bash
npm run test:e2e:ui
```

Modo con navegador visible:

```bash
npm run test:e2e:headed
```

Si Playwright no encuentra browsers instalados en la maquina:

```bash
npx playwright install
```

## Mejoras futuras identificadas

- Mayor cobertura E2E: agregar mas casos de filtros combinados, limite de equipo y validaciones del comparador. No se amplio ahora para mantener una suite chica y rapida.
- Tests unitarios selectivos: cubrir helpers de filtros, mappers y reducers. Se priorizo E2E porque demuestran flujos reales del challenge.
- Drag and drop avanzado: reemplazar HTML5 drag and drop por una solucion mas completa (si se necesitara mejor soporte tactil por ejemplo).

## Calidad y validacion

- `npm run build` valida la compilacion de produccion.
- `npm run test:e2e` valida flujos criticos con Playwright.
