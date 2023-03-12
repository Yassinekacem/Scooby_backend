import { Request, Response } from 'express';
import * as UserService from './user.service';
import { body, validationResult } from 'express-validator';


export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.listUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}; 


export const getOneUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const user = await UserService.getOneUser(id);
    if (user) {
      return res.status(200).json(user);
    }
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = req.body;
    const newUser = await UserService.createUser(user);
    return res.status(200).json(newUser);
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
    const updatedUser = await UserService.updateUser(user, id);
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await UserService.deleteUser(id);
    return res.status(200).json(`the user with id ${id} has been deleted successfully`);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};
