# Proyecto Next.js

Este es un proyecto [Next.js](https://nextjs.org/) creado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). El proyecto incluye características modernas de desarrollo web utilizando React y la infraestructura de Next.js.

## Tabla de Contenidos

- [Comenzando](#comenzando)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Comandos Disponibles](#comandos-disponibles)
- [Optimización de Fuentes](#optimización-de-fuentes)
- [Recursos Adicionales](#recursos-adicionales)
- [Despliegue en Vercel](#despliegue-en-vercel)

## Comenzando

Para comenzar con el proyecto, primero clona el repositorio y luego instala las dependencias:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
npm install
# o
yarn install
# o
pnpm install

Una vez que las dependencias estén instaladas, puedes ejecutar el servidor de desarrollo:

npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev

Abre http://localhost:3000 en tu navegador para ver el resultado. La aplicación se recargará automáticamente si editas los archivos del proyecto.

Estructura del Proyecto
El proyecto sigue la estructura estándar de un proyecto de Next.js, que incluye los siguientes directorios y archivos principales:

app/: Contiene los componentes de página y las rutas del proyecto.
components/: Contiene los componentes reutilizables del proyecto.
styles/: Contiene los archivos de estilo global y módulos CSS.
public/: Contiene activos estáticos como imágenes y fuentes que se servirán de forma pública.
next.config.js: Archivo de configuración de Next.js.
tsconfig.json: Archivo de configuración de TypeScript.
Puedes comenzar a editar las páginas modificando app/page.tsx. Los cambios se reflejarán automáticamente en el navegador.

Comandos Disponibles
El proyecto incluye varios comandos útiles para el desarrollo y despliegue:

npm run dev: Inicia el servidor de desarrollo en modo de desarrollo.
npm run build: Compila la aplicación para producción.
npm start: Inicia un servidor de producción local para la aplicación compilada.
npm run lint: Ejecuta linters para mantener la calidad del código.
npm run test: Ejecuta pruebas unitarias si están configuradas.
Optimización de Fuentes
Este proyecto utiliza next/font para optimizar automáticamente y cargar la fuente Inter de Google. Esto mejora el rendimiento y la accesibilidad del sitio web.

Recursos Adicionales
Para aprender más sobre Next.js, revisa los siguientes recursos:

Documentación de Next.js: Aprende sobre las características y la API de Next.js.
Aprende Next.js: Un tutorial interactivo para comenzar con Next.js.
Repositorio de GitHub de Next.js: Revisa el código fuente de Next.js y contribuye.
Despliegue en Vercel
La forma más sencilla de desplegar tu aplicación Next.js es utilizando la Plataforma Vercel, creada por los desarrolladores de Next.js.

Consulta nuestra documentación de despliegue de Next.js para obtener más detalles.

¡Gracias por usar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o enviar una solicitud de extracción en el repositorio.