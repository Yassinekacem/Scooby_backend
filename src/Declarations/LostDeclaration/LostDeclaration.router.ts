import express from "express";
import {body} from "express-validator" ; 

import * as LostDeclarationController from "./LostDeclaration.controller";
export const lostdeclarationRouter = express.Router() ; 

// get all lostDeclarations
lostdeclarationRouter.get("/", LostDeclarationController.listLostDeclarations) ;  


// geo one LostDeclaration
lostdeclarationRouter.get("/:id",LostDeclarationController.getOneLostDeclaration) ;  

// add lostDeclaration
lostdeclarationRouter.post(
    "/",
    body("animal").isString(),
    body("race").isString(),
    body("image").isString(),
    body("description").isString(),
    body("phoneNumber").isString(),
    body("dateLost").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Le champ dateLost doit être dans le format aaaa-mm-jj."),
    body("placeLost").isString(),
    body("withReward").isBoolean(),
    body("userId").isInt(),
    LostDeclarationController.createLostDeclaration
);


// delete lostDeclaration
lostdeclarationRouter.delete("/:id",LostDeclarationController.deleteLostDeclaration)


// update lostDeclaration
  lostdeclarationRouter.put( "/:id", 
  body("animal").isString(),
  body("race").isString(),
  body("image").isString(),
  body("description").isString(),
  body("phoneNumber").isString(),
  body("dateLost").isDate(),
  body("placeLost").isString(),
  body("withReward").isBoolean(),
  body("userId").isInt(),
      LostDeclarationController.updateLostDeclaration
  )  
  
  

