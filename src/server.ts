import { App } from "./app.js";
import {ConnectMongo} from "./config/connectMongo.js";

const app = new App();
const database = new ConnectMongo();

database.connectDB();

app
.getApp()
.listen(3005,()=> {
    console.log("server is running on port 3005");
})