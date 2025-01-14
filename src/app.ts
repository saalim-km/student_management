import express , {Application , Request, Response} from "express"
import dotenv from "dotenv";
import { UserRoute } from "./routes/User.route.js";
import { AdminRoute } from "./routes/Admin.route.js";
import session from 'express-session'; // Import express-session;
import path from "path";
import { fileURLToPath } from "url";
import nocache from "nocache"

import { StudentController } from "./controllers/student/student.controller.js";
import { StudentService } from "./services/student/Student.service.js";
import { studentRepository} from "./repository/student/Student.repository.js";
import { AdminController } from "./controllers/admin/Admin.controller.js";
import { AdminService } from "./services/admin/Admin.service.js";
import { AdminRepository } from "./repository/admin/Admin.repository.js";  

declare module "express-session" {
    interface SessionData {
        student ?: string | null;
        admin ?: string | null; 
    }
}

export class App {
    public app : Application;
    constructor() {
        dotenv.config();
        this.app = express();
        this.setMiddleWare();
        this.setAdminRoute();
        this.setStudentRoute();
        this.setViewEngine();
    }
    private setViewEngine() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.app.set("views",[
            path.join(__dirname,"views/student"),
            path.join(__dirname,"views/admin")
        ]);
        this.app.set("view engine","ejs");
    }

    private setMiddleWare(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : true}));
        let SECRET_KEY = process.env.SECRET_KEY;
        console.log(SECRET_KEY);
        this.app.use(session({
            secret : "6pUiLi53Ve",
            resave : false,
            saveUninitialized : true
        }));
        this.app.use(nocache());
    }

    private setStudentRoute() {
        const StudentRepository = new studentRepository();
        const studentService = new StudentService(StudentRepository);
        const studentController = new StudentController(studentService);
        const studentRoute = new UserRoute(studentController);
        this.app.use('/',studentRoute.getRouter());
    }

    
    private setAdminRoute() {
        const adminRepository = new AdminRepository();
        const adminService = new AdminService(adminRepository);
        const adminController = new AdminController(adminService);
        const adminRoute = new AdminRoute(adminController);
        this.app.use('/admin',adminRoute.getRouter());
    }


    public getApp() {
        return this.app;
    }
}