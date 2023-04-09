import express from "express";
import  {Request , Response}  from "express";
import {body,validationResult} from "express-validator" ; 
import { request } from "http";
import { checkAccessToken, checkProductOwnership, checkRoleSeller } from "../middleware/authorization.middleware";

import * as ProductService from "./product.service";
import * as ProductController from "./product.controller"
export const productRouter = express.Router() ; 

// get all products
productRouter.get("/" ,ProductController.listProducts) ;  


// get one product 
productRouter.get("/:id" , ProductController.getOneProduct)

// create product (only seller can do this)
productRouter.post("/",
    body("category").isString(),body("description").isString(),body("price").isNumeric(),body("image").isString(),body("userId").isInt(),body("isDispo").isBoolean(),body("brandProduct").isString(),
    ProductController.createProduct); 

// delete product (only seller and owner product can do this)
productRouter.delete("/:id",ProductController.deleteProduct)

// update product (only seller and owner product can do this)
  productRouter.put(
    "/:id",
    body("category").isString(),body("description").isString(),body("price").isNumeric(),body("image").isString(),body("userId").isInt(),body("isDispo").isBoolean(),body("brandProduct").isString(),
     ProductController.updateProduct)  
  
