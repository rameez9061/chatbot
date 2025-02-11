const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let msgArea = document.querySelector('#message_area')


do {
    name = prompt('Enter your name: ')
} while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        messege: message
    }
    //Append message
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    //Send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.messege}</p>
    `
    mainDiv.innerHTML = markup
    msgArea.appendChild(mainDiv)
}

//Recieve message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    msgArea.scrollTop = msgArea.scrollHeight
}