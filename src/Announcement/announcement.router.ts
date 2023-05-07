import express from "express";
import {body} from "express-validator" ; 

import * as AnnouncementController from "./announcement.controller";
export const announcementRouter = express.Router() ; 

// get all announcements
announcementRouter.get("/", AnnouncementController.listAnnouncements) ;  


// get one announcement 
announcementRouter.get("/:id",AnnouncementController.getOneAnnouncement) ;  
// get Announcement by city and type service 
announcementRouter.get("/:type/:city", AnnouncementController.getAnnouncementsByCityAndType);


announcementRouter.post(
    "/",
    body("type").isString(),
    body("description").isString(),
    body("firstName").isString(),
    body("lastName").isString(),
    body("contact").isString(),
    body("image").isString(),
    body("experience").isInt(),
    body("level").isString(),
    body("ville").isString(),
    body("city").isString(),
    body("userId").isNumeric(),
    AnnouncementController.createAnnouncement1
); 


announcementRouter.delete("/:id",AnnouncementController.deleteAnnouncement)

  announcementRouter.put( "/:id", 
    body("type").isString(),
    body("description").isString(),
    body("animalCible").isString(),
    body("city").isString(),
    body("userId").isNumeric(),  
      AnnouncementController.updateAnnouncement
  )  
  
  

