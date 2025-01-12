import { Router, Request, Response } from "express";
import { AdminController } from "../controllers/admin/Admin.controller.js";

export class AdminRoute {
  private adminController: AdminController; // Controller instance
  private adminRouter: Router; // Express router instance

  constructor(AdminController: AdminController) {
    this.adminController = AdminController;
    this.adminRouter = Router();
    this.setRoutes(); // Initialize routes
  }

  // Define all routes for Admin
  private setRoutes(): void {
    console.log('hi nigga im  here');
    // Route to get all students
    this.adminRouter.get(
      "/students",
      (req: Request, res: Response) =>
        this.adminController.getAllStudents(req, res)
    );

    // Route to find a student by email
    this.adminRouter.get(
      "/student",
      (req: Request, res: Response) =>
        this.adminController.findStudentByEmail(req, res)
    );

    // Route to find a student by ID
    this.adminRouter.get(
      "/student/:id",
      (req: Request, res: Response) =>
        this.adminController.findStudentById(req, res)
    );

    // Route to update a student by ID
    this.adminRouter.put(
      "/student/:id",
      (req: Request, res: Response) =>
        this.adminController.updateStudentById(req, res)
    );

    // Route to delete a student by ID
    this.adminRouter.delete(
      "/student/:id",
      (req: Request, res: Response) =>
        this.adminController.deleteStudentById(req, res)
    );
  }

  // Public method to expose the router
  public getRouter(): Router {
    return this.adminRouter;
  }
}
