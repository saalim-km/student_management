import { Request, Response } from "express";
import { AdminService } from "../../services/admin/Admin.service.js";
import { IAdminservice } from "../../services/admin/IAdmin.service.js";
import { IUser } from "../../interfaces/user.interface.js";

export class AdminController {
  private adminService: IAdminservice;

  constructor(AdminService : AdminService) {
    this.adminService = AdminService;
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
      const email = req.query.email as string;

      if (!email) {
        throw new Error("Email is required");
      }

      const student = await this.adminService.findStudentByEmail(email);
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

      const updatedStudent = await this.adminService.updateStudentById(id, studentData);

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
