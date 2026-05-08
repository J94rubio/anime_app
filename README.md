# 🎌 Anime Character App

Aplicación mobile desarrollada con **React Native + Expo + TypeScript** para explorar personajes de tus animes favoritos. Conecta con una API Flask propia desplegada en render para obtener información detallada de personajes, sus poderes y galerías de imágenes.

## 📱 Características Principales

✅ **Navegación Multi-Pantalla** (4 Pantallas)
- 3 pantallas de búsqueda, una para cada anime
- 1 pantalla de resumen de las ultimas busquedad de cada anime
- Navegación con Bottom Tabs

✅ **Búsqueda de Personajes**
- Campo de texto con búsqueda en tiempo real
- Filtrado desde API Flask

✅ **Visualización Completa de Datos**
- Nombre del personaje
- Poder principal
- Anime de procedencia
- Galería de imágenes interactiva

✅ **Galería de Imágenes**
- Modal responsive
- Scroll horizontal smooth
- Contador de imágenes

✅ **Interfaz Moderna**
- Componentes reutilizables
- Diseño responsive
- UX/UI optimizada

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React Native | 19.1.0 | Framework móvil |
| Expo | ^52.0.0 | Entorno de desarrollo |
| TypeScript | 5.3.3 | Type-safe development |
| Expo Router | 6.0.23 | Navegación file-based |
| Axios/Fetch API | - | Comunicación con API |

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 16+ con npm
- **Python** 3.8+ con Flask (para el backend)
- **Expo Go** app (opcional, para testing móvil)

### Instalación Paso a Paso

```bash
# 1. Navega al directorio
cd anime_app

# 2. Instala dependencias
npm install

# 3. En otra terminal, inicia la API Flask
cd ../anime_api
python -m venv venv
source venv/Scripts/activate  # Windows
# o
source venv/bin/activate      # macOS/Linux
pip install -r requirements.txt
python app.py

# 4. Vuelve a anime_app y ejecuta
npm start

# 5. Elige plataforma en el menú de Expo:
#    - 'w' para Web
#    - 'a' para Android
#    - 'i' para iOS
#    - Scanea QR con Expo Go (dispositivo físico)
```

## 📁 Estructura del Proyecto

```
anime_app/
├── app/                          # 📄 Pantallas (Expo Router)
│   ├── _layout.tsx              # Layout principal con tabs
│   ├── index.tsx                # Pantalla principal
│   ├── screen2.tsx              # Segunda búsqueda
│   ├── screen3.tsx              # Tercera búsqueda
│   └── screen4.tsx              # Resumen de busquedas
│
├── components/                   # 🧩 Componentes reutilizables
│   ├── search_card.tsx          # Campo de búsqueda
│   ├── data_card.tsx            # Tarjeta de personaje
│   ├── image_counter.tsx        # Contador de imágenes
│   └── images_modal.tsx         # Modal de galería
│
├── context/                      # 🎯 Context API
│   └── AnimeContext.tsx         # Estado global (si existe)
│
├── services/                     # 🔌 Servicios
│   └── animeApi.ts              # Conexión con API Flask
│
├── assets/                       # 📦 Recursos
│   └── images/                  # Imágenes locales
│
├── app.json                      # Configuración Expo
├── tsconfig.json                # Configuración TypeScript
├── package.json                 # Dependencias
└── README.md                     # Este archivo
```

## 🔗 Endpoints API Flask

Tu API debe proporcionar estos endpoints (ver `anime_api/routes/`):

### `GET /characters`
Devuelve lista de todos los personajes:
```json
[
  {
    "id": 1,
    "name": "Naruto Uzumaki",
    "birth_date": "2000-01-01",
    "main_power": "Rasengan",
    "origin": "Konoha",
    "anime": "Naruto",
    "images_count": 5
  },
  ...
]
```

### `GET /characters/<id>`
Devuelve detalles completos de un personaje:
```json
{
  "id": 1,
  "name": "Naruto Uzumaki",
  "birth_date": "2000-01-01",
  "main_power": "Rasengan",
  "origin": "Konoha",
  "anime": "Naruto",
  "techniques": ["Rasengan", "Shadow Clone"],
  "images": ["url1", "url2", "url3"],
  "description": "Ninja del Aldea de la Hoja"
}
```

### `GET /characters/search?q=<nombre>`
Búsqueda de personajes por nombre (si tu API lo soporta)

## ⚙️ Configuración de Conexión API

### Ubicación del servicio API
**Archivo**: `services/animeApi.ts`

### URL por defecto
```typescript
const API_BASE_URL = "http://127.0.0.1:5000";
```

### Cambiar URL de API
Si tu API no está en localhost, actualiza la constante `API_BASE_URL`:

```typescript
// Para emulador Android
const API_BASE_URL = "http://10.0.2.2:5000";

// Para máquina local
const API_BASE_URL = "http://127.0.0.1:5000";

// Para IP específica
const API_BASE_URL = "http://192.168.1.100:5000";
```

### Variables de Entorno (Opcional)
Crea un archivo `.env` en la raíz (si usas expo-env):
```
EXPO_PUBLIC_API_URL=http://127.0.0.1:5000
```

## 💻 Comandos Disponibles

```bash
npm start              # Inicia Expo en modo desarrollo
npm run web            # Ejecuta en navegador
npm run reset-project  # Reinicia a estado limpio
npm run lint           # Valida código TypeScript
npm run test           # Ejecuta pruebas (si existen)
```

## 🎨 Estilos y Colores

- **Color Primario**: Azul (#007AFF)
- **Fondo**: Gris claro (#f5f5f5)
- **Texto**: Negro/Gris oscuro
- **Cards**: Esquinas redondeadas + sombras
- **Border Radius**: 12px (componentes)

## 📱 Plataformas Soportadas

| Plataforma | Estado | Requisitos |
|-----------|--------|-----------|
| Web | ✅ Soportada | Navegador moderno |
| iOS | ✅ Soportada | macOS + Xcode/Simulator |
| Android | ✅ Soportada | Android Studio/Emulator |
| Expo Go | ✅ Soportada | App Expo Go (dispositivo) |

## 🐛 Solución de Problemas

### ❌ Error: "Network error connecting to API"

**Causa**: La API Flask no está corriendo o la URL es incorrecta

**Soluciones**:
```bash
# 1. Verifica que Flask está corriendo
cd ../anime_api
python app.py

# 2. Comprueba el puerto (debe ser 5000)
# 3. Actualiza la URL en services/animeApi.ts
# 4. Para Android: cambia 127.0.0.1 por 10.0.2.2
```

### ❌ "No se cargan las imágenes"

**Causa**: URLs inválidas o rutas incorrectas

**Soluciones**:
- Verifica que `images` devuelve URLs válidas en la API
- Comprueba que las imágenes existen en `anime_images/`
- Revisa la consola para errores de carga

### ❌ "Sin resultados en búsqueda"

**Causa**: Base de datos vacía o búsqueda no implementada

**Soluciones**:
```bash
# Verifica que tienes datos en la BD
curl http://127.0.0.1:5000/characters

# Prueba buscando nombres exactos primero
# Revisa el backend para logs
```

### ❌ "Caché viejo/cambios no reflejan"

**Solución**:
```bash
# Limpia caché de Expo
npm start
# Presiona 'c' en el menú de Expo
```

## 📚 Componentes Principales

### `search_card.tsx`
- Campo de texto para búsqueda
- Props: `onSearch`, `placeholder`
- Emite resultados en tiempo real

### `data_card.tsx`
- Muestra información del personaje
- Propiedades: `name`, `power`, `anime`, `imageCount`
- Interactivo (click para ver más)

### `image_counter.tsx`
- Muestra cantidad de imágenes
- Indicador visual

### `images_modal.tsx`
- Galería modal fullscreen
- Scroll horizontal
- Cierre con botón o swipe

## 🎯 Flujo de Datos

```
┌─────────────────┐
│  Pantalla (UI)  │
└────────┬────────┘
         │ onSearch("nombre")
         ▼
┌─────────────────┐
│ animeApi.ts     │ ◄─ Fetch GET /characters
└────────┬────────┘
         │ [personajes[]]
         ▼
┌─────────────────┐
│ DataCard        │
│ ImagesModal     │
└─────────────────┘
```

## 📋 Requisitos Funcionales Implementados

- ✅ Búsqueda de personajes
- ✅ Visualización de datos
- ✅ Galería de imágenes
- ✅ Navegación multi-pantalla
- ✅ UI responsive
- ✅ Integración con API Flask

## 🔮 Próximas Mejoras Sugeridas

- [ ] Agregar favoritos (AsyncStorage)
- [ ] Historial de búsquedas
- [ ] Filtros por anime
- [ ] Detalles expandibles
- [ ] Animaciones al scroll
- [ ] Caché local
- [ ] Dark mode
- [ ] Compartir personaje
- [ ] Rating de personajes
- [ ] Comentarios/Reviews

## 📝 Notas Importantes

### Para Desarrollo Web
```bash
npm run web
# Abre http://localhost:19006 en navegador
```

### Para Dispositivo Físico
1. Instala Expo Go en tu teléfono
2. Ejecuta `npm start`
3. Escanea el código QR
4. La app se abrirá automáticamente

### Base de Datos
La BD SQL está en `anime_api/routes/schema.sql`

## 🤝 Dependencias Clave

```json
{
  "expo": "^52.0.0",
  "react": "18.3.1",
  "react-native": "0.76.1",
  "typescript": "5.3.3",
  "expo-router": "6.0.23"
}
```

## 📖 Documentación Útil

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com)

## 👤 Información del Proyecto

**Materia**: Ambientes Móviles
**Semestre**: 7° Semestre
**Universidad**: Universidad Autónoma de Manizales
**Año**: 2026

## ✨ Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Desarrollado con ❤️ usando React Native + Expo + Flask**

¿Problemas? Verifica:
1. ✓ Flask está corriendo
2. ✓ Dependencias instaladas (`npm install`)
3. ✓ URL correcta en `animeApi.ts`
4. ✓ Base de datos poblada
5. ✓ TypeScript sin errores

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
