import express from "express";
import  {Request , Response}  from "express";
import {body,validationResult} from "express-validator" ; 
import { request } from "http";

import * as AnnouncementService from "./announcement.service";
export const announcementRouter = express.Router() ; 

// get all announcements
announcementRouter.get("/", async (req: Request, res: Response) => {
    try {
      const announcements = await AnnouncementService.listAnnouncement();
      return res.status(200).json(announcements) ; 
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}) ;  


// geo one announcement 
announcementRouter.get("/:id", async (req: Request, res: Response) => {
    const id : number = parseInt(req.params.id,10);
    try {
      const announcement = await AnnouncementService.getOneAnnouncement(id);
      if ( announcement) {
      return res.status(200).json(announcement) ; }
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}) ;  


announcementRouter.post(
    "/",
    body("type").isString(),
    body("description").isString(),
    body("animalCible").isNumeric(),
    body("city").isString(),
    body("userId").isNumeric(),
    async (req: Request, res: Response) => {
    const errors = validationResult(request) ; 
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() });
    }
    try {
        const announcement = req.body
        const newAnnouncement = await AnnouncementService.createAnnouncement(announcement)
        return res.status(200).json(newAnnouncement)
    }catch(error : any ) {
        return res.status(500).json(error.message);
    }
        
        
}
); 


announcementRouter.delete("/:id",async (req:Request , res : Response)=>{
    const id : number = parseInt(req.params.id,10)
    try{
      await AnnouncementService.deleteAnnouncement(id) 
      return res.status(200).json(`the Announcement with id ${id} has been deleted successfullyyyyyyyy`) ;
     }
      catch(error : any){
        return res.status(400).json(error.message)
      }
  }) 



  announcementRouter.put(
    "/:id",
    body("type").isString(),
    body("description").isString(),
    body("animalCible").isNumeric(),
    body("city").isString(),
    body("userId").isNumeric(),  async (req : Request , res: Response) =>{
      const errors = validationResult(request) ; 
      if (!errors.isEmpty()){
          return res.status(400).json({errors : errors.array() });
      }
      const id:number = parseInt(req.params.id,10)
      try {
          const announcement = req.body
          const updatedAnnouncement = await AnnouncementService.updateAnnouncement(announcement,id)
          return res.status(200).json(updatedAnnouncement)
      }catch(error : any ) {
          return res.status(500).json(error.message);
      }
    }
  
  )  
  
  

