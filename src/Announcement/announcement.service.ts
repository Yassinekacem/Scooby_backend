import { db } from "../utils/db.server";
import { Announcement } from '@prisma/client' 


export const listAnnouncement = async (): Promise<Announcement[]> => {
    return db.announcement.findMany({
        select: {
            id: true,
            type: true,
            description: true,
            animalCible: true,
            city: true,
            userId : true
        },
    });
}; 

export const getOneAnnouncement = async (id: number): Promise<Announcement | null> => {
    return db.announcement.findUnique({
        where: { id : id },
    });
};  

export const createAnnouncement = async (
    announcement: Omit<Announcement, "id">
): Promise<Announcement> => {
    const { type, description, animalCible, city,  userId} = announcement;
    return db.announcement.create({
        data: {
            type,
            description,
            animalCible,
            city, 
            userId,

        },
        select: {
            id: true,
            type: true,
            description: true,
            animalCible: true,
            city: true,
            userId: true,
            

        },
    });
};



export const updateAnnouncement1 = async (announcement: Omit<Announcement, "id">, id: number): Promise<Announcement> => {
    const { type, description, city, animalCible, userId} = announcement;
    return db.announcement.update({
        where: {
            id,
        },
        data: {
            type,
            description,
            city,
            animalCible,
            userId,

        },
        select: {
            id: true,
            type: true,
            description: true,
            animalCible: true,
            city: true,
            userId: true,
            

        },
    });
};

export const deleteAnnouncement = async (id: number): Promise<void> => {
    await db.announcement.delete({
        where: {
            id: id,
        },
    });
};



