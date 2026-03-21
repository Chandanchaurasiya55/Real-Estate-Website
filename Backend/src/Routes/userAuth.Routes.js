import { Router } from "express";
import { registerUser, loginUser } from "../Controller/userAuth.Controller.js";

const authRouter = Router();

// Define routes for user registration and login
authRouter.post("/user/register", registerUser);
authRouter.post("/user/login", loginUser);

export default authRouter;