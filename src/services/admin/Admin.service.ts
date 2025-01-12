import { IUser } from "../../interfaces/user.interface.js";
import { AdminRepository } from "../../repository/admin/Admin.repository.js";
import { IAdminservice } from "./IAdmin.service.js";
import { IAdminRepository } from "../../repository/admin/IAdmin.repository.js";

export class AdminService implements  IAdminservice{
    private AdminRepository : IAdminRepository;

    constructor(AdminRepository : AdminRepository) {
        this.AdminRepository = AdminRepository;
    }

    async getAllstudent(): Promise<IUser[]> {
        return await this.AdminRepository.getAllStudents();
    }

    async findStudentByEmail(email: string): Promise<IUser[] | null> {
        if(!email) {
            throw new Error("email is required");
        }
        return await this.AdminRepository.findUserWithEmail(email);
    }

    async findStudentById(id: string): Promise<IUser | null> {
        return await this.AdminRepository.findStudentById(id);
    }

    async updateStudentById(id: string, student: Partial<IUser>): Promise<IUser | null> {
        return await this.AdminRepository.updateUserById(id,student);
    }

    async deleteStudentById(id: string): Promise<IUser | null> {
        return await this.AdminRepository.findStudentByIdAndDelete(id);
    }
}