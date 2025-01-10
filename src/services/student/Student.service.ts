import { studentRepository } from "../../repository/student/Student.repository";
import { IUser } from "../../interfaces/user.interface";
import { IStudentRepository } from "../../repository/student/IStudent.repository";
import { Bcrypt } from "../../utils/bcrypt";
import { IStudentService } from "./IStudent.service";
import { hash } from "bcrypt";

// updateStudent, findAllStudent, findByStudentId, findStudents
export class StudentService implements IStudentService {
    private studentRepository : IStudentRepository;
    private bcrypt : Bcrypt;
    constructor() {
        this.studentRepository = new studentRepository();
        this.bcrypt = new Bcrypt();
    }

    async createStudent(student: IUser): Promise<IUser> {
        if(!student.email) {
            throw new Error('email is required');
        };
        const emailExists = await this.studentRepository.findStudentByEmail(student.email);
        if(emailExists) {
            throw new Error('Email already Exists');
        }
        const hashedPassword = await this.bcrypt.hashPassword(student.password);
        const newStudent = await this.studentRepository.createStudent({
            ...student,
            password : hashedPassword
        })
        return newStudent;
    }

    async isStudentExist(email: string, password: string): Promise<IUser> {
        if(!email) {
            throw new Error('Email is required');
        }
        if(!password) {
            throw new Error('Password is required');
        }
        const data = {
            email : email,
            password : password,
        }
        return await this.studentRepository.findStudent(data);
    }

    async updateStudent(id: string, student: IUser): Promise<IUser | null> {
        if(!id) {
            throw new Error('id is required');
        }
        if(!student) {
            throw  new Error('data required for updating');
        }
        const hashedPassword = await this.bcrypt.hashPassword(student.password);
        const studentDataWithNewPassword = {
            ...student,
            hashedPassword
        }
        const updatedStudent = await this.studentRepository.updateStudent(
            id,
            studentDataWithNewPassword,
        );
        if(!updatedStudent) {
            throw new Error('student not found');
        }
        return updatedStudent;
    }   

    async findById(id: string): Promise<IUser | null> {
        if(!id) {
            throw new Error('id is required');
        }
        const studentData = await this.studentRepository.findByStudentId(id);
        if(!studentData) {
            throw new Error("student not found");
        }
        return studentData;
    }

    async findUser(student: Partial<IUser>): Promise<IUser> {
        return await this.studentRepository.findStudent(student);
    }

}