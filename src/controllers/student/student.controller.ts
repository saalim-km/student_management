import { Request, Response } from "express";
import { StudentService } from "../../services/student/Student.service.js";
import { IStudentService } from "../../services/student/IStudent.service.js";
import { IUser } from "../../interfaces/user.interface.js";
import { json } from "stream/consumers";

export class StudentController {
  private studentService: IStudentService;

  constructor(StudentService : StudentService) {
    this.studentService = StudentService;
  }

  public async getRegister(req : Request , res : Response) {
    try {
      if(req.session.student) {
        res.redirect('/home');
      }else{
        console.log('get register here');
        res.render('register.ejs')  
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getLogin(req : Request , res : Response) {
    try {
      if(req.session.student) {
        res.redirect('/home');
      }else {
        console.log('get login here');
        res.render('login');
      }
    } catch (error) {
      
    }
  }

  public async getHome(req : Request , res : Response) {
    try {
      if(!req.session.student) {
        res.redirect('/login');
      }else {
        const userDetails = await this.studentService.findById(req.session.student);
        res.render('home' , {user : userDetails});
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getEditUser(req : Request , res : Response) {
    try {
      if(!req.session.student) {
        res.redirect('/login');
      }else {
        const userDetails = await this.studentService.findById(req.session.student);
        res.render('edituser' , {user : userDetails});
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async EditUser(req : Request , res : Response) {
    try {
      if(!req.session.student){
        res.redirect('/home');
      }else {
        console.log('edit  user here'); 

        const updatedData = JSON.parse(JSON.stringify(req.body))
        console.log(updatedData);

        if(!updatedData.password || updatedData.password == ''){
          delete updatedData.password;
        }

        console.log(updatedData);

        const userId = req.session.student;
        console.log(userId);

        await this.studentService.updateStudent(userId , updatedData);
        res.redirect('/home');
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async createStudent(req: Request, res: Response): Promise<void> {
    try {
      const student: IUser = req.body;

      const newStudent = await this.studentService.createStudent(student);

      req.session.student = newStudent._id;

      res.redirect('/home');
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async isStudentExist(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const student = await this.studentService.isStudentExist(email, password);

      if (!student) {
        throw new Error("Invalid email or password");
      }

      req.session.student = student._id;

      res.redirect('/home');
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      if (req.session) {
        // Destroy session to log out
        req.session.destroy((err) => {
          if (err) {
            res.status(500).json({ message: "Logout failed" });
          } else {
            res.redirect('/login');
          }
        });
      } else {
        res.status(400).json({ message: "No active session found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async updateStudent(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;
      const student: IUser = req.body;

      const updatedStudent = await this.studentService.updateStudent(id, student);

      res.status(200).json({
        message: "Student updated successfully",
        data: updatedStudent,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const id: string = req.params.id;

      const student = await this.studentService.findById(id);

      res.status(200).json({
        message: "Student found",
        data: student,
      });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}