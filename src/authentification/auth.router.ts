import express from "express";
import  {Request , Response}  from "express";
import {body,validationResult} from "express-validator" ; 
import { request } from "http";

import * as UserService from "./auth.service";
export const authRouter = express.Router() ; 


authRouter.post(
    "/signUp",
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
        const newAuthor = await UserService.signup(user)
        return res.status(200).json(newAuthor)
    }catch(error : any ) {
        return res.status(500).json(error.message);
    }    
}
);  


authRouter.post(
    "/signIn",
    body("email").isString(),
    body("password").isString(),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const { email, password } = req.body;
        const token = await UserService.signIn(email, password);
        return res.status(200).json({ token });
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    }
  );


