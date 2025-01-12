import {Schema, model} from "mongoose";
import { IUser } from "../interfaces/user.interface.js";

const UserSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true
        },
        course : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true,
        },
        role : {
            type : String,
            enum : ['admin' , 'user'],
            default : 'user'
        },
        isActive :{
            type : Boolean,
            required : true,
            default : true,
        },
        enrollmentDate : {
            type : Date,
            default : Date.now(),
        },
    },
    {timestamps : true}
)

const userModel = model<IUser>('Users',UserSchema);
export default userModel;