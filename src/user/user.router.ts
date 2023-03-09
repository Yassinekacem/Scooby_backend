import express from "express";
import  {Request , Response}  from "express";
import {body,validationResult} from "express-validator" ; 
import { request } from "http";

import * as UserService from "./user.service";
export const userRouter = express.Router() ; 

// get all users
userRouter.get("/", async (req: Request, res: Response) => {
    try {
      const users = await UserService.listUsers();
      return res.status(200).json(users) ; 
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}) ; 



// get unique user 
userRouter.get("/:id", async (req: Request, res: Response) => {
    const id : number = parseInt(req.params.id,10);
    try {
      const user = await UserService.getOneUser(id);
      if ( user) {
      return res.status(200).json(user) ; }
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}) ; 

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
    async (req: Request, res: Response) => {
    const errors = validationResult(request) ; 
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() });
    }
    try {
        const user = req.body
        const newUser = await UserService.createUser(user)
        return res.status(200).json(newUser)
    }catch(error : any ) {
        return res.status(500).json(error.message);
    }
        
        
}
);
// update user
userRouter.put (
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  body("gender").isString(),
  body("email").isString(),
  body("password").isString(),
  body("phoneNumber").isString(),
  body("role").isString(),  async (req : Request , res: Response) =>{
    const errors = validationResult(request) ; 
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() });
    }
    const id:number = parseInt(req.params.id,10)
    try {
        const user = req.body
        const updatedUser = await UserService.updateUser(user,id)
        return res.status(200).json(updatedUser)
    }catch(error : any ) {
        return res.status(500).json(error.message);
    }
  }

)  
// delete user 
userRouter.delete("/:id",async (req:Request , res : Response)=>{
  const id : number = parseInt(req.params.id,10)
  try{
    await UserService.deleteUser(id) 
    return res.status(200).json(`the user with id ${id} has been deleted successfully`) ;
   }
    catch(error : any){
      return res.status(400).json(error.message)
    }
}) 


