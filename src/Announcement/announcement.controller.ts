import { Request, Response } from 'express';
import * as AnnouncementService from "./announcement.service";
import { validationResult, body } from 'express-validator';

export async function listAnnouncements(req: Request, res: Response) {
  try {
    const announcements = await AnnouncementService.listAnnouncement();
    return res.status(200).json(announcements);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}
export const getOneAnnouncement = async (req: Request, res: Response) => {
    const id : number = parseInt(req.params.id,10);
    try {
      const announcement = await AnnouncementService.getOneAnnouncement(id);
      if ( announcement) {
      return res.status(200).json(announcement) ; }
    }catch(error : any){
      return res.status(500).json(error.message) ; 
    }
}
  
export async function createAnnouncement(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const announcement = req.body;
    const newAnnouncement = await AnnouncementService.createAnnouncement(announcement);
    return res.status(200).json(newAnnouncement);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}

export async function deleteAnnouncement(req: Request, res: Response) {
  const id: number = parseInt(req.params.id, 10);
  try {
    await AnnouncementService.deleteAnnouncement(id);
    return res.status(200).json(`the announcement with id ${id} has been deleted successfully`);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
}

export async function updateAnnouncement(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id: number = parseInt(req.params.id, 10);
  try {
    const announcement = req.body;
    const updateAnnouncement = await AnnouncementService.updateAnnouncement(announcement, id);
    return res.status(200).json(updateAnnouncement);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}




