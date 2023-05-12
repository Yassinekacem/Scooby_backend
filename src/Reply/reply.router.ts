import express from "express";
import {body} from "express-validator" ; 

import * as ReplyController from "./reply.controller";
export const replyRouter = express.Router() ; 


// get all replys
replyRouter.get("/", ReplyController.listReplys) ;  

// get replys by responseId
replyRouter.get("/:responseId", ReplyController.getReplyByResponseId);

// add reply
replyRouter.post(
    "/",
    body("firstName").isString(),
    body("lastName").isString(),
    body("reply").isString(),
    body("image").isString(),
    body("createdAt").isString(),
    body("responseId").isInt(),
    body("userId").isInt(),
    ReplyController.addReply
); 
