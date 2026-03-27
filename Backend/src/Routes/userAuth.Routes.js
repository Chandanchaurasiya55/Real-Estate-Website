import { Router } from "express";
import { registerUser, loginUser, getUsers } from "../Controller/userAuth.Controller.js";

const authRouter = Router();

// Define routes for user registration and login
authRouter.post("/user/register", registerUser);
authRouter.post("/user/login", loginUser);

authRouter.get("/users", getUsers);

export default authRouter;