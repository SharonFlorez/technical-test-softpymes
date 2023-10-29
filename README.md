# App Gestión de invetario

### (Technical Test)

La aplicación de gestión de inventario fue desarrollada utilizando Angular como framework principal y Firebase para la autenticación de usuarios y la base de datos Firestore. La aplicación es mobile-first y se enfoca en un diseño simple pero estético, con formularios de inicio de sesión y registro de usuarios, así como modales y animaciones para mejorar la experiencia del usuario.

## Tecnologías Utilizadas

- Angular: Se utiliza como framework principal para el desarrollo de la aplicación web.
- Firebase: Firebase Authentication se utiliza para la autenticación de usuarios y Firestore como base de datos en tiempo real para almacenar información sobre productos, inventario y ventas.
- Angular Material: Se ha integrado Angular Material para crear una interfaz de usuario moderna y consistente. Esto incluye componentes como botones, formularios, diálogos y más.
- SweetAlert2: SweetAlert2 se ha incorporado para mejorar la experiencia del usuario al mostrar alertas y mensajes interactivos.
- Angular Forms: Se emplea el módulo de formularios de Angular para la validación y gestión de datos en los formularios de autenticación y gestión de inventario.
- Otras dependencias: Se han utilizado otras dependencias según las necesidades específicas del proyecto, como bibliotecas de animación o utilidades adicionales.

## Decisiones de Diseño

- Mobile First: La aplicación se ha diseñado siguiendo el principio "mobile first", lo que garantiza una experiencia óptima en dispositivos móviles, pero también es totalmente funcional en pantallas más grandes.
- Diseño Simple y Estético: A pesar de no utilizar un framework de diseño, se ha empleado CSS y SCSS puro para dar estilo a la página. El diseño se mantiene simple y estético para una experiencia de usuario intuitiva. Se utilizan colores y tipografía coherentes en todo el sitio.
- Modales y Animaciones: Se han implementado modales para la creación, actualización y eliminación de productos, así como para la vista de factura. Además, se han añadido animaciones sutiles para mejorar la interacción del usuario.

## Instrucciones de Configuración y Despliegue

1. Clonar el repositorio desde el repositorio en [https://github.com/SharonFlorez/technical-test-softpymes.git].

2. Asegurarse de tener Node.js y Angular CLI instalados en su sistema.

3. Ejecutar el siguiente comando para instalar las dependencias del proyecto: `npm install`

4. Crear un proyecto en Firebase (si aún no lo ha hecho) y configure la autenticación con Firebase Authentication y la base de datos con Firestore.

5. Copiar la configuración de Firebase (apiKey, authDomain, etc.) en el archivo `src/environments/environment.ts`.

6. Ejecutar la aplicación en modo de desarrollo con el siguiente comando: `ng serve` o `npm run start`. La aplicación estará disponible en `http://localhost:4200/`.
