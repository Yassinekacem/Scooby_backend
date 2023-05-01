import * as authService from "./auth.service" 
import { Request, Response } from 'express';
import { validationResult } from 'express-validator'; 


export const signUp = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = req.body;
      const newUser = await authService.signup(user);
      return res.status(200).json(newUser);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }; 

  export const signIn = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      const token = await authService.signIn(email, password);
      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  };


  export const updateUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(req.params.id, 10);
    try {
      const user = req.body;
      const updatedUser = await authService.updateUser(user, id);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  };
