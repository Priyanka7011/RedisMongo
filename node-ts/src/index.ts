import express,{Request,Response} from 'express'
import {router} from "./routes/routes"
import connects from './config/mongodb';
import path from 'path';
import { Socket,Server } from "socket.io";
import { taskCreate } from './controllers/tasks';

const app=express();
app.use(express.json())
const PORT=4000
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

let http = require("http").Server(app);

let io = require("socket.io")(http);
app.use('/',router);

io.on('connection', (socket:any) => {
    console.log("a user connected")
    socket.on('add', (msg:string) => {
      console.log('message: ' + msg);
      taskCreate(msg)
    });
});
  
connects();

http.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})