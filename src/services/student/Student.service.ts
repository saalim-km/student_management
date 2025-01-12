import { studentRepository } from "../../repository/student/Student.repository.js";
import { IUser } from "../../interfaces/user.interface.js";
import { IStudentRepository } from "../../repository/student/IStudent.repository.js";
import { Bcrypt } from "../../utils/bcrypt.js";
import { IStudentService } from "./IStudent.service.js";
import { hash } from "bcrypt";

// updateStudent, findAllStudent, findByStudentId, findStudents
export class StudentService implements IStudentService {
    private studentRepository : IStudentRepository;
    private bcrypt : Bcrypt;
    constructor(StudentRepository : studentRepository) {
        this.studentRepository = StudentRepository;
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
        const isExist = await this.studentRepository.findStudentByEmail(email);
        if(!isExist) {
            throw new Error("student not found");
        }
        const isPasswordMatch = await this.bcrypt.comparePassword(
            password,
            isExist.password
        )
        if(!isPasswordMatch) {
            throw new Error("paswword is not matching");
        }
        return isExist;
    }

    async updateStudent(id: string, student: IUser): Promise<IUser | null> {
        if(!id) {
            throw new Error('id is required');
        }
        if(!student) {
            throw  new Error('data required for updating');
        }
        console.log('update student here');
        console.log(student);

        if(!student.password) {
            const updatedStudent = await this.studentRepository.updateStudentById(
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
            const updatedStudent = await this.studentRepository.updateStudentById(
                id,
                studentDataWithNewPassword,
            );
            
            if(!updatedStudent) {
                throw new Error('student not found');
            }

            return updatedStudent;
        }
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

    async findByEmail(email: string): Promise<IUser> {
        const isExist = await this.studentRepository.findStudentByEmail(email);
        if(!isExist) {
            throw new Error("student not found");
        }
        return isExist;
    }

}