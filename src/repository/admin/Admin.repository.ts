import userModel from "../../models/user.model";
import { IAdminRepository } from "./IAdmin.repository";
import { IUser } from "../../interfaces/user.interface";

export class AdminRepository implements IAdminRepository {
    async addUser(user: IUser): Promise<IUser> {
        return await userModel.create(user);
    }
    async findStudentByIdAndDelete(id: string): Promise<IUser | null> {
        return await userModel.findByIdAndDelete(id);
    }
    async findUserWithEmail(email: string): Promise<IUser | null> {
        return await userModel.find({email});
    }
    async getAllStudents(): Promise<IUser> {
        return await userModel.find();
    }
}