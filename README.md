Puedes enviarles estas instrucciones:

## Instrucciones para conectar el frontend con el backend

### 1. Preparar el backend

Entrar a la carpeta `backend` y ejecutar:

```powershell
npm install
```

Crear el archivo `.env`:

```env
PORT=3005
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sistema_reserva_espacios
DB_USERNAME=postgres
DB_PASSWORD=SU_CONTRASEÑA
```

Crear en PostgreSQL una base vacía llamada:

```text
sistema_reserva_espacios
```

Cargar las tablas y datos iniciales:

```powershell
npm run migrate
```

Iniciar el backend:

```powershell
npm run dev
```

El backend debe quedar funcionando en:

```text
http://localhost:3005
```

`npm run migrate` usa `force: true`, por lo que elimina y vuelve a crear todas las tablas. No debe ejecutarse cada vez que se inicia el proyecto.

---

### 2. Preparar el frontend

Entrar a la carpeta `frontend` y ejecutar:

```powershell
npm install
```

Instalar Axios si todavía no está instalado:

```powershell
npm install axios
```

Iniciar el frontend:

```powershell
npm run dev
```

---

### 3. Usar la carpeta `src/api`

La conexión debe realizarse mediante:

```text
frontend/src/api/
├── base.js
├── usuarios.js
├── servicios.js
├── locales.js
├── recursos.js
├── horarios.js
├── reservas.js
├── participantes.js
└── noticias.js
```

`base.js` contiene la URL general:

```javascript
import axios from 'axios'

const URI = 'http://localhost:3005'

const get = async (endpoint) => {
    try {
        return await axios.get(URI.concat(endpoint))
    } catch (error) {
        console.error(error)
        return null
    }
}

const post = async (endpoint, request) => {
    try {
        return await axios.post(URI.concat(endpoint), request)
    } catch (error) {
        console.error(error)
        return null
    }
}

const put = async (endpoint, request) => {
    try {
        return await axios.put(URI.concat(endpoint), request)
    } catch (error) {
        console.error(error)
        return null
    }
}

const remove = async (endpoint) => {
    try {
        return await axios.delete(URI.concat(endpoint))
    } catch (error) {
        console.error(error)
        return null
    }
}

const Base = { get, post, put, remove }

export default Base
```

Cada compañero debe usar el archivo API correspondiente a su módulo.

---

### 4. Reemplazar los arreglos hardcodeados

Cada componente debe dejar de utilizar arreglos como:

```javascript
const noticiasIniciales = [...]
```

o:

```javascript
const servicios = [...]
```

En su lugar debe usar estado:

```javascript
const [noticias, setNoticias] = useState([])
```

y cargar los datos del backend:

```javascript
useEffect(() => {
    cargarNoticias()
}, [])

const cargarNoticias = async () => {
    const datos = await NoticiasApi.findAll()
    setNoticias(datos)
}
```

---

### 5. Conectar las acciones de la interfaz

Cada botón debe ejecutar la operación correspondiente.

Ejemplo para crear:

```javascript
const noticiaCreada = await NoticiasApi.create(nuevaNoticia)
```

Ejemplo para actualizar:

```javascript
await NoticiasApi.update(id, { estado: 'Publicada' })
```

Ejemplo para eliminar:

```javascript
await NoticiasApi.remove(id)
```

Después de cada operación pueden volver a consultar los datos:

```javascript
await cargarNoticias()
```

Esto es más simple que modificar manualmente el arreglo local.

---

### 6. Operaciones mínimas por módulo

| Módulo       | Operaciones que debe conectar                   |
| ------------ | ----------------------------------------------- |
| Usuario      | Login                                           |
| Servicio     | Listar, editar descripción y activar/desactivar |
| Local        | Listar                                          |
| Recurso      | Listar                                          |
| Horario      | Listar y cambiar estado                         |
| Reserva      | Listar, crear y cambiar estado                  |
| Participante | Guardar participantes asociados a una reserva   |
| Noticia      | Listar, crear, publicar/borrador y eliminar     |

No es necesario conectar operaciones que no existan en la interfaz.

---

### 7. Verificar la respuesta del backend

Los nombres deben coincidir con lo que devuelve Sequelize.

Por ejemplo, reservas administrativas utilizan:

```javascript
reserva.Usuario?.nombre
reserva.Usuario?.codigo
reserva.Servicio?.nombre
reserva.Local?.nombre
reserva.Recurso?.nombre
```

No deben inventar nombres diferentes como:

```javascript
reserva.estudiante
```

si el backend devuelve:

```javascript
reserva.Usuario
```

---

### 8. Probar el flujo

Cada compañero debe comprobar:

```text
1. La pantalla carga datos desde PostgreSQL.
2. Al crear un registro, aparece en la interfaz y en pgAdmin.
3. Al actualizarlo, el cambio permanece después de recargar.
4. Al eliminarlo, desaparece de la base.
5. No quedan arreglos hardcodeados usados como fuente principal.
```

Al finalizar sus pruebas pueden restaurar los datos iniciales con:

```powershell
npm run migrate
```

y volver a iniciar:

```powershell
npm run dev
```

### Regla para el trabajo en grupo

Cada compañero modifica únicamente los componentes y archivos API de su módulo. Antes de subir cambios debe comprobar que el backend y el frontend inicien sin errores.
