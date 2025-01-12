import { IUser } from "../../interfaces/user.interface.js"
export interface IAdminRepository {
    addUser(user : IUser) : Promise <IUser>;
    findUserWithEmail(email : string) : Promise <IUser[] | null>;
    getAllStudents() : Promise <IUser[]>;
    findStudentByIdAndDelete(id : string ) : Promise<IUser | null>;
    findStudentById(id : string) : Promise<IUser | null>;
    updateUserById(id : string , student : Partial<IUser>) : Promise<IUser | null>;
}