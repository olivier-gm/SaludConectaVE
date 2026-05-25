# SaludConectaVE

> Aplicación web de gestión de citas médicas y directorio de profesionales, construida con React + Vite + TypeScript.

**Estado:** Código fuente en esta carpeta — listo para desarrollo local.

**Stack principal**: React, TypeScript, Vite, Tailwind CSS.

**Índice**
- Resumen
- Características
- Tecnologías
- Estructura del proyecto
- Instalación y ejecución
- Desarrollo y pruebas
- Despliegue
- Contribución
- Contacto

## Resumen

`SaludConectaVE` es una SPA enfocada en la gestión de citas y perfiles médicos. Proporciona flujos para búsqueda de especialistas, reserva de citas, perfiles de doctores y administración de agendas.

## Características

- Búsqueda y filtrado de profesionales.
- Wizard de reserva de citas.
- Dashboard para doctores y pacientes.
- Gestión de horarios y configuraciones de agenda.
- Componentes UI reutilizables con TailwindCSS.

## Tecnologías

- Frontend: React + TypeScript
- Bundler: Vite
- Estilos: Tailwind CSS + PostCSS
- Testing: (si aplica) Jest / React Testing Library
- Linter / Formatter: ESLint / Prettier

## Estructura del proyecto

Raíz del proyecto con los directorios principales:

- `src/`: código fuente de la aplicación.
  - `components/`: componentes React (UI, íconos, layout).
  - `pages/`: vistas y páginas principales.
  - `contexts/`: proveedores y contextos React (`AuthContext`, `AppointmentContext`).
  - `services/`: lógica de acceso a datos (`db.ts`).
  - `utils/`: utilidades y mapeos (`specialtyIcons.tsx`).
  - `data/`: datos mock para desarrollo.

- `public/`: activos estáticos.
- `package.json`: scripts y dependencias.
- `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`.

## Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone <repo-url>
cd SaludConectaVE
```

2. Instalar dependencias:

```bash
npm install
# o: pnpm install / yarn
```

3. Ejecutar en modo desarrollo:

```bash
npm run dev
```

4. Build de producción:

```bash
npm run build
npm run preview # para previsualizar el build
```

## Scripts recomendados

- `npm run dev`: inicia Vite en modo desarrollo.
- `npm run build`: genera la versión optimizada para producción.
- `npm run preview`: sirve el build localmente.
- `npm run lint`: ejecutar ESLint (si está configurado).

Revisa `package.json` para ver los scripts exactos definidos.

## Desarrollo

- Convenciones de código: TypeScript estricto donde sea posible; componentes funcionales + hooks.
- Componentes reutilizables están en `src/components/ui`.
- Íconos separados por categorías en `src/components/icons`.
- Contextos para estado global en `src/contexts`.

Buenas prácticas:

- Mantener componentes pequeños y enfocados.
- Extraer lógica compleja a `services/` o hooks personalizados.
- Usar los datos de `data/mockData.ts` para pruebas manuales y desarrollo offline.

## Testing

Si desea añadir tests unitarios o de integración, recomendamos Jest + React Testing Library. Añadir scripts y configuración en `package.json` y `jest.config.js`.

## Despliegue

Buildar con `npm run build` y desplegar la carpeta `dist/` en cualquier proveedor estático (Netlify, Vercel, GitHub Pages, AWS S3 + CloudFront).

Consideraciones:

- Configurar variables de entorno para endpoints reales de backend.
- Asegurar manejo de rutas con configuración del hosting (SPA fallback).

## Contribución

1. Hacer fork y crear una rama feature: `feature/nombre-descriptivo`.
2. Abrir PR con descripción clara y pasos para reproducir.
3. Seguir las normas de estilo y pasar linters antes de merge.

## Cómo ayudar / próximos pasos sugeridos

- Integrar un backend real o API mockado más completo.
- Añadir autenticación y autorización robusta.
- Añadir pruebas automatizadas y CI (GitHub Actions).

## Contacto

Para preguntas o colaboración, abre un issue en el repositorio o contacta al mantenedor.

---

Si quieres, puedo:
- Ajustar el README para incluir comandos exactos de `package.json`.
- Añadir una sección de arquitectura con diagramas.
- Crear el archivo `README.md` en el repositorio (ya creado).
