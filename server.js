const express=require('express')
const app=express()

const http=require('http').createServer(app)
const port=process.env.PORT||3000


http.listen(port,()=>{

    console.log(`listening to port ${port}`)

})

app.use(express.static(__dirname+'/'))


app.get('/',(req,res)=>{

    res.sendFile(__dirname+'/index.html')

})

const io=require('socket.io')(http)

// io.on('connection',(socket)=>
// {
//     console.log('connected')

// })
const users={}

io.on('connection',socket=>
{

    console.log('connected')

    socket.on('new-user-joined',name=>{
               
        console.log(name)
         users[socket.id]=name

     socket.broadcast.emit('user-joined',name)
    })

   socket.on('send',message=>{

    socket.broadcast.emit('receive',{message:message,name:users[socket.id]})

   })
 
   socket.on('disconnect',(message)=>
   {
     socket.broadcast.emit('offline',{name:users[socket.id]})

    delete users[socket.id];

   })


})
