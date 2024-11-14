let socket = null;
let currentRecipient = null;
const conversations = {};  // Objeto para almacenar mensajes separados por usuario

document.getElementById('messageInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita que se añada una nueva línea al presionar Enter
        sendMessage(); // Llama a la función para enviar el mensaje
    }
});

function playNotificationSound() {
    const audio = new Audio('/audio/notificatione.mp3'); // Cambia según la estructura de tu proyecto.
    audio.play().catch(error => console.log("Error reproduciendo el sonido:", error));
}   

function connect() {
    const username = document.getElementById('username').value;
    socket = new WebSocket(`wss://sid-2024.vercel.app/ws/${username}`);

    socket.onopen = () => {
        document.getElementById('username').style.display = 'none';
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

    if (data.type === "user_list") {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        data.users.forEach(user => {
            if (user !== username) {
                const li = document.createElement('li');
                li.textContent = user;

                const iconSpan = document.createElement('span');
                iconSpan.classList.add('notification-icon');
                iconSpan.innerHTML = '<i class="fas fa-envelope"></i>';
                iconSpan.style.display = 'none';

                li.appendChild(iconSpan);
                li.onclick = () => {
                    openChat(user);
                    iconSpan.style.display = 'none';
                };

                userList.appendChild(li);
                userElements[user] = iconSpan;
            }
        });
    } else if (data.type === "private_message") {
        if (!conversations[data.sender]) {
            conversations[data.sender] = [];
        }
        conversations[data.sender].push(`${data.sender}: ${data.message}`);
        updateMessages(data.sender);

        playNotificationSound();

        if (currentRecipient !== data.sender) {
            userElements[data.sender].style.display = 'inline';
        }
    }
    };

    let userElements = {};

    socket.onclose = () => {
        alert("Desconectado del servidor");
    };
}

function openChat(username) {
    currentRecipient = username;

    // Cambiar la vista para mostrar la conversación seleccionada
    document.getElementById('chatWith').textContent = username;
    document.getElementById('chatBox').style.display = 'block';

    // Si no existe una conversación para este usuario, inicializarla
    if (!conversations[username]) {
        conversations[username] = [];
    }

    updateMessages(username);
}

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    if (message && currentRecipient) {
        socket.send(JSON.stringify({
            type: "private_message",
            recipient: currentRecipient,
            message: message
        }));

        // Añadir el mensaje a la conversación actual
        if (!conversations[currentRecipient]) {
            conversations[currentRecipient] = [];
        }
        conversations[currentRecipient].push(`Yo: ${message}`);
        updateMessages(currentRecipient);

        document.getElementById('messageInput').value = '';
    }
}

function updateMessages(username) {
    const messages = document.getElementById('messages');
    messages.innerHTML = '';  // Limpiar los mensajes actuales

    // Mostrar todos los mensajes de la conversación actual
    conversations[username].forEach(msg => {
        const li = document.createElement('li');
        const isSentByCurrentUser = msg.startsWith('Yo:');

        li.textContent = msg;
        li.classList.add(isSentByCurrentUser ? 'sent' : 'received');
        messages.appendChild(li);
    });

    // Desplazamiento automático
    messages.scrollTop = messages.scrollHeight;
}
