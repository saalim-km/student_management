import { Request, Response } from "express";
import { AdminService } from "../../services/admin/Admin.service.js";
import { IAdminservice } from "../../services/admin/IAdmin.service.js";
import { IUser } from "../../interfaces/user.interface.js";
import { Bcrypt } from "../../utils/bcrypt.js"

export class AdminController {
  private adminService: IAdminservice;
  private bcrypt : Bcrypt;

  constructor(AdminService: AdminService) {
    this.adminService = AdminService;
    this.bcrypt = new Bcrypt();
  }

  public async addStudent(req: Request, res: Response) {
    try {
      if (!req.session.admin) {
        res.redirect("/admin/login");
      } else {
        res.render("Aadduser");
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async postAddStudent(req: Request, res: Response) {
    try {
      const student = req.body;

      // Validate input
      if (
        !student.email ||
        !student.name ||
        !student.password ||
        !student.course
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Check if the student already exists
      const studentExists = await this.adminService.findStudentByEmail(
        student.email
      );
      if (studentExists) {
        return res.status(400).json({ error: "Email already exists" });
      }

      //hash password
      const hashedPassword = await this.bcrypt.hashPassword(student.password);
      const newUser = {
        ...student,
      }
      newUser.password = hashedPassword;
      console.log(newUser);

      // Create new student
      const newStudent = await this.adminService.createStudent(newUser);
      console.log(newStudent);

      // Respond with success
      res.status(201).json({
        message: "Student added successfully"
      });
    } catch (error: any) {
      console.error("Error in postAddStudent:", error.message);
      res
        .status(500)
        .json({ error: error.message || "An unexpected error occurred" });
    }
  }

  public async getEdit(req : Request , res : Response) {
    try {
      if(!req.session.admin) {
        res.redirect('/admin/login');
      }else {
        const id = req.params.id;
        const studentDetails = await this.adminService.findStudentById(id);
        res.render('Aedituser',{user : studentDetails});
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async postEdit(req : Request , res : Response) {
    try {
      if(!req.session.admin){
        res.redirect('/admin/login')
      }else {
        const updatedData = JSON.parse(JSON.stringify(req.body))
        console.log(updatedData);

        if(!updatedData.password || updatedData.password == ''){
          delete updatedData.password;
        }

        const userId = updatedData._id;
        delete updatedData._id;
        console.log('user id from ejs',userId);

        console.log('updated data from postEdit admin : ',updatedData);

        await this.adminService.updateStudentById(userId, updatedData);
        res.redirect('/admin/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }
  public async logout(req: Request, res: Response) {
    try {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            res.status(500).json({ message: "Logout failed" });
          } else {
            res.redirect("/admin/login");
          }
        });
      } else {
        res.status(400).json({ message: "No active session found" });
      }
    } catch (error) {
      console.log(error);
    }
  }


  public async getLogin(req: Request, res: Response) {
    try {
      if (req.session.admin) {
        res.redirect("/admin/dashboard");
      } else {
        res.render("Alogin");
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async postLogin(req: Request, res: Response) {
    try {
      if (req.session.admin) {
        res.redirect("/admin/dashboard");
      } else {
        const adminData = await this.adminService.findStudentByEmail(
          req.body.email
        );
        req.session.admin = adminData?._id;
        console.log("admin session set aayi: ", req.session.admin);
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getDashboard(req: Request, res: Response) {
    try {
      if (req.session.admin) {
        const students = await this.adminService.getAllstudent();
        res.render("Ahome", { result: students });
      } else {
        res.redirect("/admin/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllStudents(req: Request, res: Response): Promise<void> {
    try {
      const students = await this.adminService.getAllstudent();
      res.status(200).json({
        message: "All students retrieved successfully",
        data: students,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async findStudentByEmail(req: Request, res: Response): Promise<void> {
    try {
      const email = req.body.email;
      console.log(email);
      if (!email) {
        throw new Error("Email is required");
      }

      const student = await this.adminService.findStudentByEmail(email);

      if (!student) {
        throw new Error("student not found.");
      }

      res.status(200).json({
        message: "Student found successfully",
        data: student,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async findStudentById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      if (!id) {
        throw new Error("ID is required");
      }

      const student = await this.adminService.findStudentById(id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }

      res.status(200).json({
        message: "Student retrieved successfully",
        data: student,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateStudentById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const studentData: Partial<IUser> = req.body;

      if (!id) {
        throw new Error("ID is required");
      }

      const updatedStudent = await this.adminService.updateStudentById(
        id,
        studentData
      );

      if (!updatedStudent) {
        res.status(404).json({ message: "Student not found" });
        return;
      }

      res.status(200).json({
        message: "Student updated successfully",
        data: updatedStudent,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteStudentById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      if (!id) {
        throw new Error("ID is required");
      }

      const deletedStudent = await this.adminService.deleteStudentById(id);

      if (!deletedStudent) {
        res.status(404).json({ message: "Student not found" });
        return;
      }

      res.status(200).json({
        message: "Student deleted successfully",
        data: deletedStudent,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
