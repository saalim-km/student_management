import { IUser } from "../../interfaces/user.interface.js";

export interface IStudentRepository {
    createStudent(student : IUser) : Promise<IUser>;
    updateStudentById(id : string , student : Partial<IUser>) : Promise<IUser | null>;
    findAllStudent() : Promise<IUser[]>;
    findByStudentId(id : string) : Promise <IUser | null>;
    findStudentByEmail(email : string) : Promise<IUser | null>;
}