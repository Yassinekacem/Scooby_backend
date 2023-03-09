import express from "express";
import  {Request , Response}  from "express";
import {body,validationResult} from "express-validator" ; 
import { request } from "http";
import { userRouter } from "../user/user.router";

import * as ProductService from "./product.service";
export const productRouter = express.Router() ; 

// get all users
productRouter.get("/", async (req: Request, res: Response) => {
    try {
      const products = await ProductService.listProducts();
      return res.status(200).json(products) ; 
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}) ;  


productRouter.post(
    "/",
    body("category").isString(),
    body("description").isString(),
    body("price").isNumeric(),
    body("image").isString(),
    body("userId").isNumeric(),
    async (req: Request, res: Response) => {
    const errors = validationResult(request) ; 
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() });
    }
    try {
        const product = req.body
        const newProduct = await ProductService.createProduct(product)
        return res.status(200).json(newProduct)
    }catch(error : any ) {
        return res.status(500).json(error.message);
    }
        
        
}
); 


productRouter.delete("/:id",async (req:Request , res : Response)=>{
    const id : number = parseInt(req.params.id,10)
    try{
      await ProductService.deleteProduct(id) 
      return res.status(200).json(`the product with id ${id} has been deleted successfullyyyyyyyy`) ;
     }
      catch(error : any){
        return res.status(400).json(error.message)
      }
  }) 



  productRouter.put(
    "/:id",
    body("category").isString(),
    body("description").isString(),
    body("price").isNumeric(),
    body("image").isString(),
    body("userId").isNumeric(),  async (req : Request , res: Response) =>{
      const errors = validationResult(request) ; 
      if (!errors.isEmpty()){
          return res.status(400).json({errors : errors.array() });
      }
      const id:number = parseInt(req.params.id,10)
      try {
          const product = req.body
          const updatedProduct = await ProductService.updateProduct(product,id)
          return res.status(200).json(updatedProduct)
      }catch(error : any ) {
          return res.status(500).json(error.message);
      }
    }
  
  )  
  
  