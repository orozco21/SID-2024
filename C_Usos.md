# Casos de Uso

## Caso de Uso 1: Conexión al Servidor WebSocket
- **ID**: CU-001
- **Nombre**: Conexión al Servidor WebSocket
- **Actor principal**: Usuario
- **Descripción**: Permite al usuario conectarse al servidor de WebSocket usando un nombre de usuario.
- **Precondición**: El servidor de WebSocket debe estar activo y en funcionamiento.
- **Flujo básico**:
  1. El usuario ingresa su nombre de usuario en el campo correspondiente.
  2. El usuario hace clic en el botón "Conectar".
  3. El sistema establece la conexión con el servidor de WebSocket.
- **Flujo alternativo**:
  - Si la conexión falla, se muestra un mensaje de alerta indicando la desconexión.
- **Postcondición**: El usuario está conectado al servidor de WebSocket.

## Caso de Uso 2: Enviar Mensajes Privados
- **ID**: CU-002
- **Nombre**: Enviar Mensajes Privados
- **Actor principal**: Usuario
- **Descripción**: Permite al usuario enviar mensajes privados a otros usuarios conectados.
- **Precondición**: El usuario debe estar conectado al servidor y haber seleccionado un destinatario.
- **Flujo básico**:
  1. El usuario selecciona un destinatario de la lista de usuarios.
  2. El usuario escribe un mensaje en el campo de texto.
  3. El usuario presiona "Enter" o hace clic en "Enviar".
  4. El sistema envía el mensaje al destinatario y lo muestra en la interfaz.
- **Postcondición**: El mensaje se envía al destinatario y aparece en la conversación.

## Caso de Uso 3: Recibir Mensajes Privados
- **ID**: CU-003
- **Nombre**: Recibir Mensajes Privados
- **Actor principal**: Usuario
- **Descripción**: Permite al usuario recibir mensajes privados de otros usuarios.
- **Precondición**: El usuario debe estar conectado al servidor.
- **Flujo básico**:
  1. Un usuario envía un mensaje privado.
  2. El sistema recibe el mensaje y lo muestra en la conversación correspondiente.
  3. Se reproduce un sonido de notificación.
- **Flujo alternativo**:
  - Si el mensaje recibido es de un usuario con una conversación no activa, se muestra un icono de notificación.
- **Postcondición**: El mensaje se muestra en la lista de mensajes y se notifica al usuario.

## Caso de Uso 4: Visualizar Lista de Usuarios Conectados
- **ID**: CU-004
- **Nombre**: Visualizar Lista de Usuarios Conectados
- **Actor principal**: Usuario
- **Descripción**: Permite al usuario ver la lista de usuarios actualmente conectados.
- **Precondición**: El usuario debe estar conectado al servidor.
- **Flujo básico**:
  1. El servidor envía la lista de usuarios conectados.
  2. El sistema muestra la lista en la barra lateral.
- **Postcondición**: El usuario puede ver la lista actualizada de usuarios.

