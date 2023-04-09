import { Request, Response } from 'express';
import * as FoundDeclarationService from "./FoundDeclaration.service";
import { validationResult, body } from 'express-validator';

export async function listFoundDeclarations(req: Request, res: Response) {
  try {
    const FoundDeclarations = await FoundDeclarationService.listFoundDeclaration();
    return res.status(200).json(FoundDeclarations);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}
export const getOneFoundDeclaration = async (req: Request, res: Response) => {
    const id : number = parseInt(req.params.id,10);
    try {
      const FoundDeclaration = await FoundDeclarationService.getOneFoundDeclaration(id);
      if ( FoundDeclaration) {
      return res.status(200).json(FoundDeclaration) ; }
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}
  
export async function createFoundDeclaration(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const FoundDeclaration = req.body;
    const newFoundDeclaration = await FoundDeclarationService.createFoundDeclaration(FoundDeclaration);
    return res.status(200).json(newFoundDeclaration);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function deleteFoundDeclaration(req: Request, res: Response) {
  const id: number = parseInt(req.params.id, 10);
  try {
    await FoundDeclarationService.deleteFoundDeclaration(id);
    return res.status(200).json(`the FoundDeclaration with id ${id} has been deleted successfully`);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
}

export async function updateFoundDeclaration(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id, 10);
  try {
    const FoundDeclaration = req.body;
    const updatedFoundDeclaration = await FoundDeclarationService.updateFoundDeclaration(FoundDeclaration, id);
    return res.status(200).json(updatedFoundDeclaration);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}




