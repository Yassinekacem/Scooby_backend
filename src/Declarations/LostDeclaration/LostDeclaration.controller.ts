import { Request, Response } from 'express';
import * as LostDeclarationService from "./LostDeclaration.service";
import { validationResult, body } from 'express-validator';

export async function listLostDeclarations(req: Request, res: Response) {
  try {
    const LostDeclarations = await LostDeclarationService.listLostDeclaration();
    return res.status(200).json(LostDeclarations);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}
export const getOneLostDeclaration = async (req: Request, res: Response) => {
    const id : number = parseInt(req.params.id,10);
    try {
      const LostDeclaration = await LostDeclarationService.getOneLostDeclaration(id);
      if ( LostDeclaration) {
      return res.status(200).json(LostDeclaration) ; }
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}
  
export async function createLostDeclaration(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const LostDeclaration = req.body;
    const newLostDeclaration = await LostDeclarationService.createLostDeclaration(LostDeclaration);
    return res.status(200).json(newLostDeclaration);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function deleteLostDeclaration(req: Request, res: Response) {
  const id: number = parseInt(req.params.id, 10);
  try {
    await LostDeclarationService.deleteLostDeclaration(id);
    return res.status(200).json(`the LostDeclaration with id ${id} has been deleted successfully`);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
}

export async function updateLostDeclaration(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id, 10);
  try {
    const LostDeclaration = req.body;
    const updatedLostDeclaration = await LostDeclarationService.updateLostDeclaration(LostDeclaration, id);
    return res.status(200).json(updatedLostDeclaration);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}




