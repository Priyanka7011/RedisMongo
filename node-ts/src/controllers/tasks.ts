import { Request,Response } from "express";
import taskModel from "../models/taskSchema";
import { createUser } from "../services/users.services";
import {createTask, deleteTask } from "../services/task.services";
import { createClient } from 'redis';
const http=require('http')
const axios=require('axios')
const url = "redis://apn1-brave-adder-33713.upstash.io:33713";
const redisClient = createClient({
    socket: {
        host: 'apn1-brave-adder-33713.upstash.io',
        port: 33713
    },
    password: '69b6358deaf14b44a0f44fbdb31adf8b'
});

redisClient.connect();
redisClient.on("error", (err) => console.error("client err", err));
redisClient.on('connect', function(err){console.log('redis connected')});




const LandingPage=(req:Request,resp:Response)=>{
    
    
    axios.get("http://localhost:4000/fetchAllTasks").then((result:any)=>{
        
        console.log(result.data.data)
        resp.render('views',{
            data:result.data.data
         })
    })
    .catch((error:any)=>{
        console.log(error)
    })
   
    
   
}
let keyName="BACKEND_TASK_PRIYANKA";
const FetchTasks= async (req:Request, resp:Response)=>{
    let myTask= await taskModel.find();
    
    
    const redisData = await redisClient.lRange(keyName, 0, -1);
    

    let data:any=[]
    myTask.forEach(element=>{
        data.push(element.task)
    })
    
    redisData.forEach(ele=>{
        data.push(ele)
    })

    return resp.status(200).json({
       data:data
    });
}

const taskCreate= async function(taskParam:string){
    let taskbody:string=taskParam;
    
    
    var multi = redisClient.multi();

   
	multi.rPush(keyName, taskbody);
	    
	
    multi.exec()

    const driver = await redisClient.lRange(keyName, 0, -1);
    
    console.log(driver)
    if(driver.length>=5){
        driver.forEach(element=>{
            const user=   createTask({task:element})
        })
        
        redisClient.del(keyName)
        console.log("cache flushed")
    }
   
    
}

const taskDelete = async (req:Request, resp:Response)=>{
   let param: any = req.params.id;
  
    
    const deleted= await deleteTask({_id:param});
    return resp.status(200).json({
        message: 'task deleted successfully'
    });

}
export{
    LandingPage,FetchTasks,taskCreate,taskDelete
}