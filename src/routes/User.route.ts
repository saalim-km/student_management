import { StudentController } from "controllers/student/student.controller.js";
import express, { Request, Response, Router } from "express";

export class UserRoute {
  private studentController: StudentController;
  private userRouter: Router; 

  constructor(StudentController : StudentController) {
    this.studentController = StudentController;
    this.userRouter = Router();
    this.setRoutes(); // Initialize routes
  }

  // Define all routes for Student
  private setRoutes(): void {
    console.log('user route');
    this.userRouter.get('/home',(req : Request , res : Response) => this.studentController.getHome(req,res));
    this.userRouter.get('/',(req:Request , res : Response) => this.studentController.getRegister(req,res));

    this.userRouter.get('/edituser',(req : Request , res : Response)=> this.studentController.getEditUser(req,res));
    this.userRouter.get("/login",(req:Request , res : Response) => this.studentController.getLogin(req,res));
    this.userRouter.post('/edituser', (req : Request , res : Response)=> this.studentController.EditUser(req,res));

    this.userRouter.post(
      "/register",
      (req: Request, res: Response) =>
        this.studentController.createStudent(req, res) // Register route
    );

    this.userRouter.post(
      "/login",
      (req: Request, res: Response) =>
        this.studentController.isStudentExist(req, res) // Login route
    );

    this.userRouter.post(
      "/logout",
      (req: Request, res: Response) =>
        this.studentController.logout(req, res) // Logout route
    );

    this.userRouter.get(
      "/:id",
      (req: Request, res: Response) =>
        this.studentController.findById(req, res) // Get profile route
    );

    this.userRouter.put(
      "/profile/:id",
      (req: Request, res: Response) =>
        this.studentController.updateStudent(req, res) // Update profile
    );
  }

  // Public method to expose the router
  public getRouter(): Router {
    return this.userRouter;
  }
}
