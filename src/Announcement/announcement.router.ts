import express from "express";
import  {Request , Response}  from "express";
import {body,validationResult} from "express-validator" ; 
import { request } from "http";
import { checkAccessToken, checkAnnouncementOwnership,  checkRoleServiceProvider } from "../middleware/authorization.middleware";

import * as AnnouncementController from "./announcement.controller";
export const announcementRouter = express.Router() ; 

// get all announcements
announcementRouter.get("/", AnnouncementController.listAnnouncements) ;  


// geo one announcement 
announcementRouter.get("/:id",AnnouncementController.getOneAnnouncement) ;  


announcementRouter.post(
    "/",checkAccessToken,checkRoleServiceProvider,
    body("type").isString(),
    body("description").isString(),
    body("animalCible").isNumeric(),
    body("city").isString(),
    body("userId").isNumeric(),
    AnnouncementController.createAnnouncement
); 


announcementRouter.delete("/:id",checkAccessToken,checkRoleServiceProvider,checkAnnouncementOwnership,AnnouncementController.deleteAnnouncement)

  announcementRouter.put(
    "/:id",checkAccessToken,checkRoleServiceProvider,checkAnnouncementOwnership ,
    body("type").isString(),
    body("description").isString(),
    body("animalCible").isNumeric(),
    body("city").isString(),
    body("userId").isNumeric(),  
      AnnouncementController.updateAnnouncement
  )  
  
  

