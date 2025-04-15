Prueba Técnica Fullstack - OKAM
Este proyecto es una solución fullstack desarrollada con Next.js 15 (App Router) para el frontend y Express.js con TypeScript para el backend. Utiliza Prisma como ORM y Supabase como base de datos (PostgreSQL). La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar tareas con soporte para borrado lógico y restauración.

Tecnologías utilizadas:

Frontend: Next.js 15, React 19, Tailwind CSS, TypeScript

Backend: Express.js, TypeScript

ORM: Prisma

Base de datos: Supabase (PostgreSQL)

Autenticación: JWT (con almacenamiento en cookies)

Estilos: Tailwind CSS + fuentes de Google (Geist)

        Estructura general del proyecto:
        
        /backend
        
        src/
        
        controllers/
        
        middleware/
        
        routes/
        
        services/
        
        types/
        
        app.ts
        
        prisma/
        
        .env
        
        tsconfig.json
        
        /frontend
        
        src/
        
        app/
        
        components/
        
        lib/
        
        styles/
        
        public/
        
        tsconfig.json

Pasos para ejecutar el proyecto:

Clonar el repositorio y acceder a la carpeta raíz del proyecto.

Configurar y levantar el backend:

Ingresar a la carpeta backend

Copiar el archivo de entorno: cp .env.example .env

Instalar dependencias: npm install

Ejecutar Prisma: npx prisma generate npx prisma migrate dev --name init

Levantar el servidor: npm run dev

Configurar y levantar el frontend:

Ingresar a la carpeta frontend

Instalar dependencias: npm install

Levantar el servidor de desarrollo: npm run dev

Endpoints disponibles:

Autenticación:

    POST /auth/register
    
    POST /auth/login

Tareas:

    GET /tasks
    
    POST /tasks
    
    PUT /tasks/:id
    
    DELETE /tasks/:id (soft delete)
    
    POST /tasks/:id/restore (restauración de tarea)

Funcionalidades implementadas:

    Registro e inicio de sesión de usuarios con validación
    
    CRUD de tareas por usuario autenticado
    
    Soft delete y restauración de tareas
    
    Vista separada de tareas activas y eliminadas
    
    Estilos adaptables y experiencia de usuario amigable
    
    Protección de rutas mediante middleware
    
    Logout y eliminación del token de sesión

