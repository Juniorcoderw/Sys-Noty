# NotiFast

NotiFast es un sistema de notificaciones instantáneas para restaurantes diseñado y desarrollado por Hjunior.

Caja, cocina o barra pueden avisar a mozos específicos con un solo toque. Cada mozo recibe la alerta en su celular en menos de 300ms usando Firebase Realtime Database y Firebase Cloud Messaging, evitando llamadas y mensajes manuales.

## Objetivo del proyecto

Centralizar y acelerar la comunicación interna del salón para mejorar tiempos de atención y reducir errores operativos.

## Stack tecnológico

- HTML5
- CSS3
- JavaScript Vanilla
- Firebase Authentication
- Firebase Realtime Database
- Firebase Cloud Messaging
- Firebase Hosting o Vercel para despliegue web

## Arquitectura general

La aplicación está separada por pantallas independientes, cada una con su propio HTML, CSS y JavaScript:

- Login: acceso de usuarios por rol.
- Admin: gestión de usuarios, sectores y asignaciones.
- Cocina: emisión de alertas para mozos.
- Mozo: recepción de alertas con vibración y Notification API.

### Flujo funcional

1. Usuario inicia sesión en `index.html`.
2. Se identifica rol del usuario en Firebase.
3. Redirección a la pantalla correspondiente.
4. Caja, cocina o barra generan una alerta para un mozo.
5. Se registra la alerta en Firebase.
6. El mozo recibe la alerta en tiempo real en su dispositivo.
7. El navegador dispara vibración y notificación local cuando corresponde.

## Estructura de carpetas

```text
NotiFast/
├── index.html
├── README.md
├── vercel.json
├── css/
│   ├── login/
│   │   └── login.css
│   ├── admin/
│   │   └── admin.css
│   ├── cocina/
│   │   └── cocina.css
│   └── mozo/
│       └── mozo.css
├── js/
│   ├── login/
│   │   └── login.js
│   ├── admin/
│   │   └── admin.js
│   ├── cocina/
│   │   └── cocina.js
│   └── mozo/
│       └── mozo.js
└── pantallas/
    ├── admin.html
    ├── cocina.html
    └── mozo.html
```

## Principios de organización

- `index.html` queda en la raíz para facilitar despliegue en Vercel.
- Cada pantalla tiene archivos independientes de estructura, estilo y lógica.
- No existen archivos globales de lógica compartida.
- Se prioriza simplicidad y mantenibilidad por módulo.

## Instalación y ejecución local

### 1) Clonar repositorio

```bash
git clone <url-del-repo>
cd Sys-Noty
```

### 2) Crear proyecto Firebase

1. Crear proyecto en Firebase Console.
2. Habilitar Authentication con email/contraseña.
3. Crear Realtime Database en modo de prueba inicial.
4. Habilitar Cloud Messaging.
5. Copiar configuración web de Firebase.

### 3) Configurar credenciales

Cada archivo JavaScript de pantalla incluye un bloque `configuracion_firebase` temporal.

Reemplazar sus valores por los del proyecto real antes de producción.

### 4) Levantar servidor local

Con VS Code Live Server o cualquier servidor estático.

Ejemplo con Node:

```bash
npx serve .
```

Abrir `http://localhost:3000` o el puerto indicado.

## Despliegue en Vercel

1. Importar repositorio en Vercel.
2. Mantener `index.html` en raíz como entrada.
3. Confirmar que `vercel.json` se detecte correctamente para reglas de ruta limpias.
4. Confirmar que carpetas `pantallas`, `css` y `js` se publiquen completas.
5. Configurar dominio y entorno si corresponde.

## Convenciones de código

### Idioma

- Todo en español: archivos, variables, funciones, clases CSS, ids y textos de interfaz.

### Variables y funciones

- Máximo 2 palabras por nombre.
- Separador obligatorio: guion bajo `_`.
- Ejemplos válidos:
  - `mozo_id`
  - `alerta_txt`
  - `btn_llamar`
  - `datos_usr`

### CSS e IDs HTML

- Separador obligatorio: guion medio `-`.
- Ejemplos válidos:
  - `.panel-alerta`
  - `.lista-mozos`
  - `id="btn-llamar"`

### Comentarios

- No se usan comentarios en el código.
- Los nombres deben ser autoexplicativos.

### Separación por pantalla

- Cada pantalla contiene:
  - un archivo `.html`
  - un archivo `.css`
  - un archivo `.js`
- Sin lógica global compartida.

## Pantallas incluidas en la base actual

- Login: `index.html`
- Admin: `pantallas/admin.html`
- Cocina: `pantallas/cocina.html`
- Mozo: `pantallas/mozo.html`

## Próximos pasos sugeridos

1. Implementar reglas de seguridad de Firebase por rol.
2. Registrar dispositivos de mozos para notificaciones push segmentadas.
3. Medir latencia real por evento y guardar métricas.
4. Agregar estado de alerta: pendiente, recibida, atendida.
5. Diseñar panel de auditoría para admin.

## Licencia

Proyecto privado de NotiFast.
