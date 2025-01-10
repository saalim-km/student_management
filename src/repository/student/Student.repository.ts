import { IStudentRepository } from "./IStudent.repository";
import userModel from "../../models/user.model";
import { IUser } from "../../interfaces/user.interface";

export class studentRepository implements IStudentRepository {
    async createStudent(student: IUser): Promise<IUser> {
        return await userModel.create(student);
    }
    async updateStudent(id: string, student: Partial<IUser>): Promise<IUser> | null {
        return await userModel.updateOne(id ,student , {new : true});
    }
    async findAllStudent(): Promise<IUser> {
        return await userModel.find();
    }
    async findByStudentId(id: string): Promise<IUser> {
        return await userModel.findById(id);
    }
    async findStudent(student: Partial<IUser>): Promise<IUser> {
        return await userModel.find({student});
    }
    async findStudentByEmail(email: string): Promise<IUser> {
        return await userModel.find({email});
    }
}
