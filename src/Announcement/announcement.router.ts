import express from "express";
import {body} from "express-validator" ; 
import { checkAccessToken, checkAnnouncementOwnership,  checkRoleServiceProvider } from "../middleware/authorization.middleware";

import * as AnnouncementController from "./announcement.controller";
export const announcementRouter = express.Router() ; 

// get all announcements
announcementRouter.get("/", AnnouncementController.listAnnouncements) ;  


// geo one announcement 
announcementRouter.get("/:id",AnnouncementController.getOneAnnouncement) ;  


announcementRouter.post(
    "/",
    body("type").isString(),
    body("description").isString(),
    body("animalCible").isString(),
    body("city").isString(),
    body("userId").isNumeric(),
    AnnouncementController.createAnnouncement1
); 


announcementRouter.delete("/:id",AnnouncementController.deleteAnnouncement)

  announcementRouter.put( "/:id",checkAccessToken,checkRoleServiceProvider, 
    body("type").isString(),
    body("description").isString(),
    body("animalCible").isString(),
    body("city").isString(),
    body("userId").isNumeric(),  
      AnnouncementController.updateAnnouncement
  )  
  
  

