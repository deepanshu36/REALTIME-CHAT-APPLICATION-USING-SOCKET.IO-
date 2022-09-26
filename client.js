
const socket=io('http://localhost:3000')
const sendbtn=document.getElementById('btn')
const form=document.getElementById('send-container')
const messageinput=document.getElementById('messageinput')
const messagecontainer=document.querySelector('.container')

var audio=new Audio('sms.mp3')

const name=prompt('enter your name to join')

if(name)
socket.emit('new-user-joined',name)


form.addEventListener('submit',(e)=>{

    e.preventDefault();

    const message=messageinput.value;
    append(`you:${message}`,'right')

    socket.emit('send',message)
    messageinput.value=''

     

})




function append(message,position)
{
    const mess=document.createElement('div')
    mess.innerText=message
    mess.classList.add(position)
    mess.classList.add('message')
    messagecontainer.append(mess)

    console.log('its running')
    
    audio.play()

}

socket.on('user-joined',name=>{

    console.log("catch")

    append(`${name} joined`,'center')

})

socket.on('receive',data=>
{
    append(`${data.name}: ${data.message}`,'left')

})

socket.on('offline',data=>
{

    append(`${data.name} has left `,'center')


})

