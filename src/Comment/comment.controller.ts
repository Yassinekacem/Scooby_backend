import { Request, Response } from 'express';
import * as CommentService from "./comment.service";
import { validationResult, body } from 'express-validator';
import { comment } from '@prisma/client';

export async function listComments(req: Request, res: Response) {
  try {
    const comments = await CommentService.listComments();
    return res.status(200).json(comments);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}


export const getCommentByAnnouncementId = async (req: Request, res: Response) => {
    const announcementId : number = parseInt(req.params.announcementId,10);
    try {
      const comments = await CommentService.getCommentByAnnouncementId(announcementId);
      if ( comments) {
      return res.status(200).json(comments) ; }
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}


export async function addComment (req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const comment = req.body;
      const newComment = await CommentService.addComment(comment);
      return res.status(200).json(newComment);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }