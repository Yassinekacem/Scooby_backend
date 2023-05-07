import express from "express";
import {body} from "express-validator" ; 

import * as CommentController from "./comment.controller";
export const commentRouter = express.Router() ; 


// get all comments
commentRouter.get("/", CommentController.listComments) ;  

// get comments by user Id
commentRouter.get("/:announcementId", CommentController.getCommentByAnnouncementId);
// add comment
commentRouter.post(
    "/",
    body("firstName").isString(),
    body("lastName").isString(),
    body("message").isString(),
    body("stars").isInt(),
    body("createdAt").isString(),
    body("announcementId").isInt(),
    body("userId").isInt(),
    CommentController.addComment
); 
