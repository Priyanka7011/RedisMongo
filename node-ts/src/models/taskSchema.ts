import { Schema,model,Document } from "mongoose";

export interface TaskDocumnent extends Document {
   
    task:string,
}
interface Task{
    task:string
}

const taskSchema = new Schema<Task>({
    task:{
        type:String,
        required:true
    }
})

const taskModel=model<Task> ('Task',taskSchema)

export default taskModel;