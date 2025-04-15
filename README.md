
# Prueba Técnica Fullstack - OKAM

Este proyecto es una solución fullstack desarrollada con **Next.js 15 (App Router)** para el frontend y **Express.js** con **TypeScript** para el backend. Utiliza **Prisma** como ORM y **Supabase** como base de datos (PostgreSQL). La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar tareas con soporte para borrado lógico y restauración.

## Tecnologías utilizadas

### Frontend:
- **Next.js 15**
- **React 19**
- **Tailwind CSS**
- **TypeScript**

### Backend:
- **Express.js**
- **TypeScript**

### ORM:
- **Prisma**

### Base de datos:
- **Supabase (PostgreSQL)**

### Autenticación:
- **JWT** (con almacenamiento en cookies)

### Estilos:
- **Tailwind CSS** + fuentes de **Google** (Geist)

## Estructura general del proyecto

```plaintext
/backend
  ├── src/
  │   ├── controllers/
  │   ├── middleware/
  │   ├── routes/
  │   ├── services/
  │   ├── types/
  │   ├── tests/
  │   ├── utils/
  │   ├── validations/   
  │   ├── app.ts
  │   ├── server.ts
  │   ├── prisma/
  │   ├── .env
  │   └── tsconfig.json
/frontend
  ├── src/
  │   ├── app/
  │   ├── components/
  │   ├── lib/
  │   ├── styles/
  │   ├── public/
  │   ├── context/
  │   └── tsconfig.json
```

## Pasos para ejecutar el proyecto

### 1. Clonar el repositorio y acceder a la carpeta raíz del proyecto.

```bash
git clone https://github.com/MLxFernando/prueba_tecnica_okam.git
cd backend 
cd frontend
```

### 2. Configurar y levantar el backend:

- Ingresar a la carpeta `backend`

```bash
cd backend
```

- Copiar el archivo de entorno:

```bash
cp .env.example .env
```

- Instalar dependencias:

```bash
npm install
```

- Ejecutar Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

- Levantar el servidor:

```bash
npm run dev
```

### 3. Configurar y levantar el frontend:

- Ingresar a la carpeta `frontend`

```bash
cd ../frontend
```

- Instalar dependencias:

```bash
npm install
```

- Levantar el servidor de desarrollo:

```bash
npm run dev
```

## Endpoints disponibles

### Autenticación:

- `POST /auth/register`: Registrar un nuevo usuario
- `POST /auth/login`: Iniciar sesión de usuario

### Tareas:

- `GET /tasks`: Obtener todas las tareas del usuario autenticado
- `POST /tasks`: Crear una nueva tarea
- `PUT /tasks/:id`: Actualizar una tarea existente
- `DELETE /tasks/:id`: Eliminar (soft delete) una tarea
- `POST /tasks/:id/restore`: Restaurar una tarea eliminada

## Funcionalidades implementadas

- Registro e inicio de sesión de usuarios con validación.
- CRUD de tareas por usuario autenticado.
- Soft delete y restauración de tareas.
- Vista separada de tareas activas y eliminadas.
- Estilos adaptables y experiencia de usuario amigable.
- Protección de rutas mediante middleware.
- Logout y eliminación del token de sesión.

## Instalación y Configuración

Para la correcta ejecución de la aplicación, asegúrate de tener las siguientes dependencias instaladas:

- Node.js (versión 16 o superior)
- PostgreSQL
- Prisma CLI
- Supabase (o cualquier configuración de PostgreSQL compatible)

