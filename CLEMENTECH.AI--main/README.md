# Clementech.ai

Sitio web de Clementech.ai construido con Next.js, React y Supabase.

## Desarrollo local

Requiere Node.js y npm. Desde esta carpeta:

```bash
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Abre http://localhost:3000. Completa `.env.local` con las credenciales de los
servicios que uses; nunca publiques ese archivo ni claves privadas.

## Variables de entorno

Configura estas variables en `.env.local` para desarrollo y en el panel del
proveedor de hosting para producción:

- `NEXT_PUBLIC_SITE_URL`: URL pública del sitio, por ejemplo
  `https://www.clementech.online`.
- `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`: acceso público
  de Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: clave privada usada exclusivamente por las rutas
  del servidor. No debe tener el prefijo `NEXT_PUBLIC_`.
- `OPENAI_API_KEY` y `ANTHROPIC_API_KEY`: necesarias para las funciones de IA
  que usan esos proveedores.

Las rutas de Supabase requieren una URL y clave válidas al recibir solicitudes;
la compilación del sitio no necesita estas credenciales.

## Centro de Acción

En `/organizacion` puedes crear recordatorios, planificar tareas, iniciar
temporizadores de enfoque y pausas, registrar metas personales y consultar tus
sesiones de enfoque. Las metas, el temporizador y las tareas creadas sin
conexión se guardan en el almacenamiento local del navegador de ese dispositivo.
Las tareas nuevas se sincronizan con Supabase cuando el servicio está
configurado. Activa los avisos del navegador para recibir alarmas: los
recordatorios requieren mantener abierta la página; no son notificaciones
push cuando el navegador está cerrado.

## Comprobaciones

```bash
npm run lint
npm run build
```

## Publicación

El proyecto usa Next.js y puede desplegarse en Vercel conectado al repositorio
de GitHub. Configura las variables de entorno anteriores en el proyecto de
Vercel y agrega el dominio en **Settings → Domains**. El DNS del dominio debe
apuntar a los registros que indique Vercel.
