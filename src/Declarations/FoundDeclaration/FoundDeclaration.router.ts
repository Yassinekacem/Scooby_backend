import express from "express";
import {body} from "express-validator" ; 

import * as FoundDeclarationController from "./FoundDeclaration.controller";
export const FoundDeclarationRouter = express.Router() ; 

// get all FoundDeclarations
FoundDeclarationRouter.get("/", FoundDeclarationController.listFoundDeclarations) ;  


// geo one FoundDeclaration
FoundDeclarationRouter.get("/:id",FoundDeclarationController.getOneFoundDeclaration) ;  

// add FoundDeclaration
FoundDeclarationRouter.post(
    "/",
    body("animal").isString(),
    body("race").isString(),
    body("image").isString(),
    body("description").isString(),
    body("phoneNumber").isString(),
    body("dateFound").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Le champ dateFound doit être dans le format aaaa-mm-jj."),
    body("placeFound").isString(),
    FoundDeclarationController.createFoundDeclaration
);


// delete FoundDeclaration
FoundDeclarationRouter.delete("/:id",FoundDeclarationController.deleteFoundDeclaration)


// update FoundDeclaration
  FoundDeclarationRouter.put( "/:id", 
  body("animal").isString(),
  body("race").isString(),
  body("image").isString(),
  body("description").isString(),
  body("phoneNumber").isString(),
  body("dateFound").isDate(),
  body("placeFound").isString(),
      FoundDeclarationController.updateFoundDeclaration
  )  
  
  

