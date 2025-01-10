import { IUser } from "../../interfaces/user.interface"
export interface IStudentService {
    createStudent (student : IUser) : Promise <IUser>;
    isStudentExist(email : string , password : string) : Promise <IUser>;
    updateStudent(id : string , student : IUser) : Promise<IUser | null>;
    findById(id : string ) : Promise<IUser | null>;
    findUser(student : Partial <IUser>) : Promise <IUser>;
}