import { IUser } from "../../interfaces/user.interface.js";
import { AdminRepository } from "../../repository/admin/Admin.repository.js";
import { IAdminservice } from "./IAdmin.service.js";
import { IAdminRepository } from "../../repository/admin/IAdmin.repository.js";
import { Bcrypt } from "../../utils/bcrypt.js"


export class AdminService implements  IAdminservice{
    private AdminRepository : IAdminRepository;
    private bcrypt : Bcrypt;

    constructor(AdminRepository : AdminRepository) {
        this.AdminRepository = AdminRepository;
        this.bcrypt = new Bcrypt();
    }

    async createStudent(student: IUser): Promise<IUser> {
        return await this.AdminRepository.addUser(student);
    }

    async getAllstudent(): Promise<IUser[]> {
        return await this.AdminRepository.getAllStudents();
    }

    async findStudentByEmail(email: string): Promise<IUser | null> {
        if(!email) {
            throw new Error("email is required");
        }
        return await this.AdminRepository.findUserWithEmail(email);
    }

    async findStudentById(id: string): Promise<IUser | null> {
        return await this.AdminRepository.findStudentById(id);
    }

    async updateStudentById(id: string, student: Partial<IUser>): Promise<IUser | null> {
        if(!id) {
            throw new Error('id is required');
        }
        if(!student) {
            throw  new Error('data required for updating');
        }
        console.log('update student here');
        console.log(student);

        if(!student.password) {
            const updatedStudent = await this.AdminRepository.updateUserById(
                id,
                student,
            );

            console.log(updatedStudent);
            if(!updatedStudent) {
                throw new Error('student not found');
            }

            return updatedStudent;
        }else {
            const hashedPassword = await this.bcrypt.hashPassword(student.password);
            console.log('hased password' , hashedPassword);

            const studentDataWithNewPassword = {
                ...student,
            }
            studentDataWithNewPassword.password = hashedPassword;

            console.log('after addign the hashed passowrd to object',studentDataWithNewPassword);
            const updatedStudent = await this.AdminRepository.updateUserById(
                id,
                studentDataWithNewPassword,
            );
            
            if(!updatedStudent) {
                throw new Error('student not found');
            }

            return updatedStudent;
        }
    }

    async deleteStudentById(id: string): Promise<IUser | null> {
        return await this.AdminRepository.findStudentByIdAndDelete(id);
    }
}