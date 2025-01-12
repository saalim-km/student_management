import { IUser } from "../../interfaces/user.interface.js"
export interface IStudentService {
    createStudent (student : IUser) : Promise <IUser>;
    isStudentExist(email : string , password : string) : Promise <IUser>;
    updateStudent(id : string , student : IUser) : Promise<IUser | null>;
    findById(id : string ) : Promise<IUser | null>;
    findByEmail(email : string) : Promise <IUser>;
}