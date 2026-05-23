# Pokedex Challenge

El proyecto prioriza arquitectura escalable, separacion de responsabilidades, cache con RTK Query, persistencia local y una UX completa para listado, detalle, equipo y comparacion.

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
- PokeAPI

## Instalacion

```bash
npm install
```

Crear el archivo local de entorno:

```bash
cp .env.sample .env
```

En Windows PowerShell tambien se puede crear manualmente copiando el contenido de `.env.sample`.

## Variables de entorno

```bash
VITE_API_BASE_URL=https://pokeapi.co/api/v2
```

No se usan secretos, tokens ni variables sensibles.

## Comandos

```bash
npm run dev
npm run build
npm run preview
```

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

- `axiosInstance` centraliza `baseURL`, timeout, headers, interceptors y errores.
- `pokemonApi` define endpoints para listado, detalle, opciones, tipos y generaciones.
- El listado se enriquece fuera de la UI para mostrar sprite, numero y tipos.
- Busqueda y filtros se guardan en query params para soportar refresh y links compartibles.
- Infinite scroll usa `IntersectionObserver` sobre el ultimo item visible y bloqueos para evitar requests duplicados.
- `redux-persist` mantiene el equipo y cache de RTK Query; se descartan suscripciones/mutaciones efimeras al persistir.
- La app muestra estado online/offline y badges de datos frescos/cacheados.
- Las notificaciones se centralizan con `useToast` y `components/Toast`.
- No se agrego libreria de charts: las comparaciones usan barras visuales con Styled Components.

## Features implementadas

- Listado principal de Pokemon con cards responsive.
- Busqueda por nombre con debounce.
- Filtros combinables por tipo y generacion.
- Query params en `/pokedex`.
- Infinite scroll con skeletons y estado de fin de resultados.
- Detalle en `/pokemon/:name` con imagen, sprites, tipos, habilidades, altura, peso y stats.
- Equipo en `/team` con maximo 6 Pokemon, persistencia, remove y estado vacio.
- Comparador en `/compare` con Formik/Yup, selects searchables y stats lado a lado.
- Loading, error, retry y empty states en vistas principales.
- Estado de conexion online/offline.
- Indicadores de datos frescos, cacheados y cache offline.

## Calidad y limites actuales

- `npm run build` valida la compilacion de produccion.
- No hay test runner configurado todavia.
