const socket=io()

let user_name;

let textarea=document.querySelector('#textarea')
let message_area=document.querySelector('.message-area')
do{
    user_name=prompt('Enter your Name')
}while(!user_name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key ==='Enter'){
        sendMessage(e.target.value)
      
    }
})

function sendMessage(message){
    let msg={
        user:user_name,
        message:message.trim()
    }

    //Append

    appendMessage(msg,'outgoing')

    textarea.value=''
    scrollToBottom()
    //Send to server

    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type;
    mainDiv.classList.add(className,'message')

    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup;
    message_area.appendChild(mainDiv)
}

//receive

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
    
})

function scrollToBottom(){
    message_area.scrollTop=message_area.scrollHeight;
}