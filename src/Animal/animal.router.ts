import express from "express";
import {body,validationResult} from "express-validator" ; 

import * as animalController from "./animal.controller"
export const animalRouter = express.Router() ; 

// get all animals
animalRouter.get("/" ,animalController.listAnimals) ;  


// get one animal
animalRouter.get("/:id" , animalController.getOneAnimal)

// create product (only seller can do this)
animalRouter.post("/",
body("species").isString(),body("race").isString(),body("price").isNumeric(),body("image").isString(),body("userId").isInt(),body("age").isFloat(),body("status").isString(),body("gender").isString(),body("isEducated").isBoolean(),body("isVaccinated").isBoolean(),
animalController.addAnimal); 

// delete product (only seller and owner product can do this)
animalRouter.delete("/:id",animalController.deleteAnimal)

// update product (only seller and owner product can do this)
  animalRouter.put(
    "/:id",
    body("species").isString(),body("race").isString(),body("price").isNumeric(),body("image").isString(),body("userId").isInt(),body("age").isFloat(),body("status").isString(),body("gender").isString(),body("isEducated").isBoolean(),body("isVaccinated").isBoolean(),
     animalController.updateAnimal)  
  
  