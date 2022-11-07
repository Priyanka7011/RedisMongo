import { DocumentDefinition, FilterQuery, UpdateQuery,QueryOptions } from "mongoose";
import taskModel,{TaskDocumnent} from "../models/taskSchema";


export function createTask(input:DocumentDefinition<TaskDocumnent>){
    return taskModel.create(input);
}

export function deleteTask(query: FilterQuery<TaskDocumnent>){
    return taskModel.deleteOne(query);
}