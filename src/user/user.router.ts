import express from "express";
import  {Request , Response}  from "express";
import {body,validationResult} from "express-validator" ; 
import { request } from "http";
import { checkAccessToken,  checkRoleAdmin, checkUserOwnershipOrAdmin } from "../middleware/authorization.middleware";

import * as userController from "./user.controller";
export const userRouter = express.Router() ;  


// get all users
userRouter.get("/" ,userController.listUsers) ; 
  




// get unique user 
userRouter.get("/:id", userController.getOneUser) ; 

// create new user 
userRouter.post(
    "/",
    body("firstName").isString(),
    body("lastName").isString(),
    body("gender").isString(),
    body("email").isString(),
    body("password").isString(),
    body("phoneNumber").isString(),
    body("role").isString(),
    userController.createUser
);
// update user
userRouter.put (
  "/:id",checkAccessToken, checkUserOwnershipOrAdmin, 
  body("firstName").isString(),
  body("lastName").isString(),
  body("gender").isString(),
  body("email").isString(),
  body("password").isString(),
  body("phoneNumber").isString(),
  body("role").isString(),  userController.updateUser

)  
// delete user 
userRouter.delete("/:id",userController.deleteUser) 


