import { Request, Response } from 'express';
import * as ResponseService from "./response.service";
import { validationResult, body } from 'express-validator';

export async function listResponses(req: Request, res: Response) {
  try {
    const responses = await ResponseService.listResponses();
    return res.status(200).json(responses);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}



export const getResponseByPostId = async (req: Request, res: Response) => {
    const postId : number = parseInt(req.params.postId,10);
    try {
      const responses = await ResponseService.gerResponseByPostId(postId);
      if ( responses) {
      return res.status(200).json(responses) ; }
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}




export async function addResponse (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const response = req.body;
      const newResponse = await ResponseService.addResponse(response);
      return res.status(200).json(newResponse);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }