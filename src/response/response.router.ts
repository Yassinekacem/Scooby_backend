import express from "express";
import {body} from "express-validator" ; 

import * as ResponseController from "./response.controller";
export const responseRouter = express.Router() ; 


// get all responses
responseRouter.get("/", ResponseController.listResponses) ;  

// get comments by postId
responseRouter.get("/:postId", ResponseController.getResponseByPostId);

// add response
responseRouter.post(
    "/",
    body("firstName").isString(),
    body("lastName").isString(),
    body("response").isString(),
    body("image").isString(),
    body("createdAt").isString(),
    body("postId").isInt(),
    body("userId").isInt(),
    ResponseController.addResponse
); 


responseRouter.delete("/:id",ResponseController.deleteResponse) 
