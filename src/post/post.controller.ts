import { Request, Response } from 'express';
import * as PostService from "./post.service";
import { validationResult, body } from 'express-validator';

export async function listPosts(req: Request, res: Response) {
  try {
    const PostServices = await PostService.listPosts();
    return res.status(200).json(PostServices);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}
export const getOnePost = async (req: Request, res: Response) => {
    const id : number = parseInt(req.params.id,10);
    try {
      const post = await PostService.getOnePost(id);
      if ( post) {
      return res.status(200).json(post) ; }
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}
  
export async function createPost(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const Post = req.body;
    const newPost = await PostService.createPost(Post);
    return res.status(200).json(newPost);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function deletePost(req: Request, res: Response) {
  const id: number = parseInt(req.params.id, 10);
  try {
    await PostService.deletePost(id);
    return res.status(200).json(`the post with id ${id} has been deleted successfully`);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
}

export async function updatePost(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id, 10);
  try {
    const Post = req.body;
    const updatedPost = await PostService.updatePost(Post, id);
    return res.status(200).json(updatedPost);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}




