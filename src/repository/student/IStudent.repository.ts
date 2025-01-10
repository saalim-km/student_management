import { IUser } from "../../interfaces/user.interface";

export interface IStudentRepository {
    createStudent(student : IUser) : Promise<IUser>;
    updateStudent(id : string , student : Partial<IUser>) : Promise<IUser> | null;
    findAllStudent() : Promise<IUser>;
    findByStudentId(id : string) : Promise <IUser>;
    findStudent(student : Partial<IUser>) : Promise <IUser>;
    findStudentByEmail(email : string) : Promise<IUser>;
}