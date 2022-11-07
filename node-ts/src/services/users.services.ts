import { DocumentDefinition, FilterQuery, UpdateQuery,QueryOptions } from "mongoose";
import userModel,{UserDocumnent} from "../models/userSchema";


export function createUser(input:DocumentDefinition<UserDocumnent>){
    return userModel.create(input);
}