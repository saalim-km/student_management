import userModel from "../../models/user.model.js";
import { IAdminRepository } from "./IAdmin.repository.js";
import { IUser } from "../../interfaces/user.interface.js";

export class AdminRepository implements IAdminRepository {
    async addUser(user: IUser): Promise<IUser> {
        return await userModel.create(user);
    }
    async findStudentByIdAndDelete(id: string): Promise<IUser | null> {
        return await userModel.findByIdAndDelete(id);
    }
    async findUserWithEmail(email: string): Promise<IUser | null> {
        return await userModel.findOne({email : email});
    }
    async getAllStudents(): Promise<IUser[]> {
        return await userModel.find({role : {$ne : "admin"}});
    }
    async updateUserById(id: string, student: Partial<IUser>): Promise<IUser | null> {
        return await userModel.findByIdAndUpdate(id , student);
    }
    async findStudentById(id: string): Promise<IUser | null> {
        return await userModel.findById(id);
    }
}