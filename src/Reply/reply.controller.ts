import { Request, Response } from 'express';
import * as ReplyService from "./reply.service";
import { validationResult } from 'express-validator';

export async function listReplys(req: Request, res: Response) {
  try {
    const replys = await ReplyService.listReplys();
    return res.status(200).json(replys);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}



export const getReplyByResponseId = async (req: Request, res: Response) => {
    const responseId : number = parseInt(req.params.responseId,10);
    try {
      const replys = await ReplyService.getReplyByResponseId(responseId);
      if ( replys) {
      return res.status(200).json(replys) ; }
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}




export async function addReply (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const reply = req.body;
      const newReply = await ReplyService.addReply(reply);
      return res.status(200).json(newReply);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }