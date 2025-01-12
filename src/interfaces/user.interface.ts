export interface IUser {
    _id ?: string;
    name : string;
    course ?: string;
    email : string;
    password : string;
    role : "admin" | "user";
    isActive : boolean;
    enrollmentDate : string;
}