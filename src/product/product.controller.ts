import { Request, Response } from 'express';
import * as ProductService from "./product.service";
import { validationResult, body } from 'express-validator';

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await ProductService.listProducts();
    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function createProduct(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const product = req.body;
    const newProduct = await ProductService.createProduct(product);
    return res.status(200).json(newProduct);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  const id: number = parseInt(req.params.id, 10);
  try {
    await ProductService.deleteProduct(id);
    return res.status(200).json(`the product with id ${id} has been deleted successfullyyyyyyyy`);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
}

export async function updateProduct(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id, 10);
  try {
    const product = req.body;
    const updatedProduct = await ProductService.updateProduct(product, id);
    return res.status(200).json(updatedProduct);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}




