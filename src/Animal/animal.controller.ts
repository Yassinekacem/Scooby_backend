import { Request, Response } from 'express';
import * as AnimalService from "./animal.service";
import { validationResult, body } from 'express-validator';

export async function listAnimals(req: Request, res: Response) {
  try {
    const animals = await AnimalService.listAnimals();
    return res.status(200).json(animals);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export const getOneAnimal = async (req: Request, res: Response) => {
  const id : number = parseInt(req.params.id,10);
  try {
    const animal = await AnimalService.getOneAnimal(id);
    if ( animal) {
    return res.status(200).json(animal) ; }
  }catch(error : any){
    return res.status(500).json(error.message) ; 
  }
}

export async function addAnimal(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const animal = req.body;
    const newAnimal = await AnimalService.addAnimal(animal);
    return res.status(200).json(newAnimal);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function deleteAnimal(req: Request, res: Response) {
  const id: number = parseInt(req.params.id, 10);
  try {
    await AnimalService.deleteAnimal(id);
    return res.status(200).json(`the animal with id ${id} has been deleted successfullyyyy`);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
}

export async function updateAnimal(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id, 10);
  try {
    const animal = req.body;
    const updatedAnimal = await AnimalService.updateAnimal(animal, id);
    return res.status(200).json(updatedAnimal);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}




