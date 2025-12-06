# Gato de Gatos - Instrucciones de Instalacion

## PASOS PARA QUE FUNCIONE:

### 1. La base de datos YA ESTA CREADA
Ya ejecutaste `node setup-db.js` correctamente, asi que la base de datos esta lista.

### 2. REINICIAR EL SERVIDOR
El servidor esta corriendo pero necesitas reiniciarlo para que cargue los nuevos cambios:

**PASOS:**
1. Presiona `Ctrl + C` en la terminal donde esta corriendo el servidor
2. Ejecuta nuevamente: `node app.js`
3. Abre tu navegador en: http://localhost:8000

### 3. COMO USAR LA APLICACION

#### Pagina Principal (http://localhost:8000)
- Ingresa nombres de 2 jugadores
- Haz clic en "Iniciar Partida"
- Se abrira el tablero de juego

#### Gestion de Partidas (http://localhost:8000/partidas)
- Ver TODAS las partidas (en curso, finalizadas, empates)
- Continuar partidas en curso
- Eliminar partidas

#### Ranking (http://localhost:8000/ranking)
- Ver top 20 jugadores
- Estadisticas completas

### 4. REGLAS DEL JUEGO

- Son 9 mini-tableros de 3x3 dentro de un tablero principal de 3x3
- Tu jugada determina en que mini-tablero debe jugar tu oponente
- Gana un mini-tablero al hacer 3 en raya
- Gana el juego al ganar 3 mini-tableros en linea en el tablero principal
- Cada mini-tablero ganado = 10 puntos
- Ganar el juego = 50 puntos extra

### 5. SI HAY ALGUN ERROR:

#### Error de conexion a BD:
- Verifica que MySQL este corriendo
- La contrasena es: Karl!2008
- El usuario es: root

#### Error al iniciar partida:
- Asegúrate de haber reiniciado el servidor
- Los nombres deben ser diferentes
- Ambos campos deben estar llenos

#### La pagina no carga:
- Verifica que el servidor este corriendo (debe decir "Servidor corriendo en http://localhost:8000")
- Verifica que diga "Conexion exitosa a la base de datos"

### COMANDOS IMPORTANTES:

```bash
# Iniciar el servidor
node app.js

# Si necesitas recrear la BD
node setup-db.js

# Detener el servidor
Ctrl + C
```

### ESTRUCTURA COMPLETA:

- **/** - Pagina principal (inicio de partidas)
- **/partidas** - CRUD de partidas
- **/ranking** - Ranking completo
- **/juego/:id** - Tablero de juego

### CRUD DE PARTIDAS:

- **GET /partidas** - Ver todas las partidas
- **DELETE /partida/:id** - Eliminar una partida
- Las partidas se crean automaticamente al hacer clic en "Iniciar Partida"
- Las partidas se actualizan automaticamente al finalizar el juego

