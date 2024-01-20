const socket = io('http://localhost:3000')
const form = document.getElementById("sendinp")
const messageinput = document.getElementById("msginp")
const messagecontiner = document.querySelector(".continer")
var audio = new Audio("sound.mp3");

const append = (message,postion)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message ;
    messageElement.classList.add('msg')
    messageElement.classList.add(postion)
    messagecontiner.append(messageElement);
    if (postion == "left") {
        audio.play()
        
    }
}

form.addEventListener('submit', (e)=>{
   e.preventDefault();
   const message = messageinput.value;
   append(`you: ${message}`, "right");
   socket.emit('send', message);
   messageinput.value = ""

})

let name;
do{
    name = prompt("enter name");

}while(!name)

socket.emit("new-user", name);

socket.on('user-join', name =>{
    append(`${name} joined the chat`, 'left')
})


socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('leave', data=>{
    append(`${data.name} left the chat box`, 'left');
})