# Marketplace Magic ♦

Aplicación web responsive con 3 tipos de usuarios: seller, buyer, admin. Cada uno tiene diferentes acciones según su rol como lo son: Registro y login, inventario y creación de productos, visualizar los productos de la tienda.

## Características principales

- Autenticación de usuarios (login/registro)
- Inventario de productos (Panel para vendedores)
- Inventario de productos según vendedores (Panel para admin)
- Marketplace público
- Gestión de productos

NOTAS IMPORTANTES: 
1. Para visualizar el Marketplace público NO es necesario registrarse.
2. Tener en cuenta que la app está desarrollada para que se ingrese el precio de los productos en USD.

## Lenguajes y Tecnologías usadas
Nest JS, TypeScript, React + Redux Toolkit, Material UI (MUI) y MySQL.

## Estructura del proyecto
Backend (NestJS)

- auth: Módulo para autenticación y autorización
	login.dto.ts y register.dto.ts: DTOs para validar datos de entrada
	jwt-auth.guard.ts: Guardia para proteger rutas con JWT
	Controlador, servicio y módulo para manejar autenticación

- products: Módulo para productos 
	DTOs para creación y actualización
	Entidad Product
	Controlador, servicio y módulo para operaciones CRUD

- users: Módulo para usuarios
	DTOs para creación y actualización
	Entidad User
	Controlador, servicio y módulo para operaciones CRUD

- Archivos principales:
	main.ts: Punto de entrada de la aplicación
	app.module.ts: Módulo raíz que importa otros módulos
	app.controller.ts: Controlador raíz

Frontend (React + Redux + Toolkit)
- api: Clientes API para comunicarse con el backend
	authApi.ts y productsApi.ts: Llamadas API

- components: Componentes reutilizables
	auth: Componentes relacionados con autenticación (RegisterModal)
	shared: Componentes compartidos (PrivateRoute para rutas protegidas, TopBar para navegación)

- features: Lógica de Redux organizada por features
	auth: Slice de Redux para manejar estado de autenticación
	products: Componentes y lógica para productos
	pages: Componentes de página completos
	admin: Página de administración
	auth: Página de login
	seller: Dashboard para vendedores
	HomePage.tsx y Marketplace.tsx: Páginas principales

- store: Configuración de Redux store

- types: Tipos TypeScript compartidos

## Configuración de rutas según autenticación de usuarios
- admin: /admin : Panel productos registrados con filtro por vendedor
- seller: /dashboard : Inventario de productos
- buyer/otros: (Rutas públicas)
	/login : Inicio de sesión de usuarios
	/home : Información de marketplace 
	/Marketplace : Productos del sistema con filtros de nombre, sku y/o precios (NOTA: Tener en cuenta que la app está desarrollada para que se ingrese el precio de los productos en USD).

## Requisitos previos

- Node.js v16+
- MySQL 8+
- npm/yarn

## Aplicación publicada en Hosting público
- Hosting Railway para BD MySQL y backend

Ejemplo de petición backend desde el hosting Railway:
GET || https://marketplace-production-ea6f.up.railway.app/products

- Hosting Netlify para frontend
URL publicada: https://jolly-manatee-58283c.netlify.app/

Usuario admin por defecto: admin@marketplace.com || 123456

## Instalación rápida

```bash
# Clonar repositorio
git clone https://github.com/DianaSReyes20/Marketplace

# Instalar dependencias
npm install

# Ejecutar localmente
Backend: npm start
Frontennd: npm run prod

# Creación BD MySQL localmente
Revisar repositorio /docs/marketplace_schema.sql