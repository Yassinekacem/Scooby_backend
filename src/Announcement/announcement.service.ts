import { db } from "../utils/db.server";
import { Announcement, PrismaClient, User } from '@prisma/client' 
import { Animal, Service } from "@prisma/client";
import exp from "constants";

const prisma = new PrismaClient()
export type announcement1 = {
    id: number;
    type: Service;
    description: string;
    animalCible: Animal[];
    city: String ;
    user : User ; 
}; 


export const listAnnouncement = async (): Promise<announcement1[]> => {
    return db.announcement.findMany({
        select: {
            id: true,
            type: true,
            description: true,
            animalCible: true,
            city: true,
            user : {
                select : {
                    id : true , 
                    firstName : true , 
                    lastName : true , 
                    gender : true , 
                    email : true , 
                    password : true , 
                    phoneNumber : true , 
                    role : true , 
                    announcement : true , 
                    product : true
                }
            }
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
            city , 
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



export const updateAnnouncement = async (announcement: Omit<Announcement, "id">, id: number): Promise<Announcement> => {
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



