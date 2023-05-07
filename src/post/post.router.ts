import express from "express";
import {body} from "express-validator" ; 

import * as PostController from "./post.controller";
export const postRouter = express.Router() ; 

// get all posts
postRouter.get("/", PostController.listPosts) ;  


// geo one post
postRouter.get("/:id",PostController.getOnePost) ;  

// add post
postRouter.post(
    "/",
    body("firstName").isString(),
    body("lastName").isString(),
    body("content").isString(),
    body("image").isString(),
    body("createdAt").isString(),
    body("userId").isInt(),
    PostController.createPost
);


// delete post
postRouter.delete("/:id",PostController.deletePost)


// update post
  postRouter.put( "/:id", 
  body("firstName").isString(),
    body("lastName").isString(),
    body("content").isString(),
    body("image").isString(),
    body("createdAt").isString(),
    body("userId").isInt(),
      PostController.updatePost
  )  
  
  

