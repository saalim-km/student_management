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

  private setRoutes(): void {
    console.log("hi nigga im  here");

    this.adminRouter.get('/login',(req : Request , res : Response)=> 
      this.adminController.getLogin(req,res)
    );

    this.adminRouter.get('/logout',(req : Request,res : Response)=> 
      this.adminController.logout(req,res)
    );
    
    this.adminRouter.get('/dashboard',(req : Request , res : Response)=> 
      this.adminController.getDashboard(req,res)
    );

    this.adminRouter.get("/students", (req: Request, res: Response) =>
      this.adminController.getAllStudents(req, res)
    );

    this.adminRouter.get("/student", (req: Request, res: Response) =>
      this.adminController.findStudentByEmail(req, res)
    );

    this.adminRouter.get("/student/:id", (req: Request, res: Response) =>
      this.adminController.findStudentById(req, res)
    );

    this.adminRouter.put("/student/:id", (req: Request, res: Response) =>
      this.adminController.updateStudentById(req, res)
    );

    //delete student by id
    this.adminRouter.delete("/student/:id", (req: Request, res: Response) =>
      this.adminController.deleteStudentById(req, res)
    );

    this.adminRouter.get('/addstudent',(req : Request ,res : Response )=> 
      this.adminController.addStudent(req,res)
    );

    this.adminRouter.post('/addstudent', async (req: Request, res: Response) => {
      await this.adminController.postAddStudent(req, res);
  });
  
  }

  public getRouter(): Router {
    return this.adminRouter;
  }
}
