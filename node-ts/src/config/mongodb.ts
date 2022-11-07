import mongoose,{connect} from "mongoose"

function connects(){
    return connect('mongodb+srv://backend-task:LZwz8vtxZyVYFsYe@freecluster.qqan4im.mongodb.net/backend_tasks_priyanka?retryWrites=true&w=majority')
    .then(()=>{
        console.log("db connected")
    }).catch((error:any)=>{
        console.log(error)
    })
}
export default connects;
//
//mongodb+srv://Priyu:priyu@cluster0.e5vp2.mongodb.net/TaskTest?retryWrites=true&w=majority