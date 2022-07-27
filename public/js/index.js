let nickname;

function getNicknameAndStartChat() {
    const nicknameInput = document.querySelector('#nickname');

    const loginContainer = document.querySelector('#login');
    const chatContainer = document.querySelector('#chat');

    nickname = nicknameInput.value;

    loginContainer.style.display = 'none';
    chatContainer.style.display = 'block';

    startChat();
}

function startChat() {
    var socket = io('/', {
        query: {
            'nickname': nickname
        }
    });

    var form = document.getElementById('form');
    var input = document.getElementById('input');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (input.value) {
            const message = {
                text: input.value,
                date: Date.now(),
            }

            socket.emit('message', message);
            input.value = '';
        }
    });

    socket.on('message', (data) => {
        console.log(data);
        let messageBox = document.createElement('li');
        let nickname = document.createElement('span');

        let textContainer = document.createElement('div');

        let text = document.createElement('span');
        let date = document.createElement('span')

        if (data.nickname === "lance-lance") {
            messageBox.className = 'lance-lance'
        } else if (data.id === socket.id) {
            messageBox.className = 'sender-message'
        } else {
            messageBox.className = 'message'
        }

        nickname.textContent = data.nickname;
        nickname.style.color = data.color;

        text.textContent = data.message.text;
        date.textContent = formatDate(data.message.date);

        messageBox.appendChild(nickname);

        textContainer.appendChild(text);
        textContainer.appendChild(date);

        messageBox.appendChild(textContainer);

        messages.appendChild(messageBox);
        window.scrollTo(0, document.body.scrollHeight);
    })
}
