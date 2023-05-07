import express from "express";
import {body,validationResult} from "express-validator" ; 
import { checkRoleSeller } from "../middleware/authorization.middleware";
import {checkAccessToken} from "../middleware/authorization.middleware";
import * as animalController from "./animal.controller"
export const animalRouter = express.Router() ; 

// get all animals to Adopt
animalRouter.get("/toAdopt" ,animalController.listAnimalsToAdopt) ;  

animalRouter.get("/toSell" ,animalController.listAnimalsToSell) ;  

// get one animal
animalRouter.get("/:id" , animalController.getOneAnimal)

// create product (only seller can do this)
animalRouter.post("/",
body("species").isString(),body("race").isString(),body("price").isNumeric(),body("image").isString(),body("userId").isInt(),body("age").isFloat(),body("status").isString(),body("gender").isString(),body("isEducated").isBoolean(),body("isVaccinated").isBoolean(),
body("dateOfBirth").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Le champ date de naissance doit être dans le format aaaa-mm-jj."),body("name").isString(),body("description").isString(),
animalController.addAnimal); 

// delete product (only seller and owner product can do this)
animalRouter.delete("/:id",animalController.deleteAnimal)

// update product (only seller and owner product can do this)
  animalRouter.put(
    "/:id",
    body("species").isString(),body("race").isString(),body("price").isNumeric(),body("image").isString(),body("userId").isInt(),body("age").isFloat(),body("status").isString(),body("gender").isString(),body("isEducated").isBoolean(),body("isVaccinated").isBoolean(),
    body("dateOfBirth").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Le champ date de naissance doit être dans le format aaaa-mm-jj."),body("name").isString(),body("description").isString(),
     animalController.updateAnimal)  
  
  