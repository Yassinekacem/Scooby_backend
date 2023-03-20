import express from "express";
import {body,} from "express-validator" ; 
import * as authController from "./auth.controller"
import { request } from "http";

export const authRouter = express.Router() ; 


authRouter.post("/signUp", 
body("firstName").isString(), body("lastName").isString(), body("email").isString(),body("password").isString(), body("role").isString(),
 authController.signUp
);  


authRouter.post("/signIn" , body("email").isString(), body("password").isString(),authController.signIn);


