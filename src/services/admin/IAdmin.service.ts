import { IUser } from "../../interfaces/user.interface.js";
export interface IAdminservice {
    getAllstudent() : Promise<IUser[]>;
    findStudentById(id : string) : Promise<IUser | null>;
    findStudentByEmail(email : string) : Promise<IUser[] | null>;
    updateStudentById(id : string, student : Partial<IUser>) : Promise<IUser | null>;
    deleteStudentById(id : string) : Promise<IUser | null>; 
}