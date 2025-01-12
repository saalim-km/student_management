import { IStudentRepository } from "./IStudent.repository.js";
import userModel from "../../models/user.model.js";
import { IUser } from "../../interfaces/user.interface.js";

export class studentRepository implements IStudentRepository {
    async createStudent(student: IUser): Promise<IUser> {
        return await userModel.create(student);
    }
    async updateStudentById(id: string, student: Partial<IUser>): Promise<IUser | null> {
        return await userModel.findByIdAndUpdate(id , student)
    }
    async findAllStudent(): Promise<IUser[]> {
        return await userModel.find();
    }
    async findByStudentId(id: string): Promise<IUser | null> {
        return await userModel.findById(id);
    }
    async findStudentByEmail(email: string): Promise<IUser | null> {
        return await userModel.findOne({email});
    }
}
