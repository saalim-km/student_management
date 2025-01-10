import { IUser } from "../../interfaces/user.interface"
export interface IAdminRepository {
    addUser(user : IUser) : Promise <IUser>;
    findUserWithEmail(email : string) : Promise <IUser | null>;
    getAllStudents() : Promise <IUser>;
    findStudentByIdAndDelete(id : string ) : Promise<IUser | null>
}