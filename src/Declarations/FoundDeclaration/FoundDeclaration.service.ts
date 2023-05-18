import { db } from "../../utils/db.server";
import { FoundDeclaration } from '@prisma/client' 


export const listFoundDeclaration = async (): Promise<FoundDeclaration[]> => {
    return db.foundDeclaration.findMany({
        select: {
            id: true,
            image: true,
            animal : true,
            race : true,
            description: true,
            dateFound: true,
            placeFound: true,
            phoneNumber : true,
            userId : true 
        },
    });
}; 

export const getOneFoundDeclaration = async (id: number): Promise<FoundDeclaration | null> => {
    return db.foundDeclaration.findUnique({
        where: { id : id },
    });
};  

export const createFoundDeclaration = async (
    FoundDeclaration: Omit<FoundDeclaration, "id">
): Promise<FoundDeclaration> => {
    const { image, description, animal, race,dateFound,  phoneNumber,placeFound , userId} = FoundDeclaration;
    return db.foundDeclaration.create({
        data: {
            image,
            description,
            animal,
            race, 
            dateFound,
            placeFound,
            phoneNumber,
            userId

        },
        select: {
            id: true,
            image: true,
            animal : true,
            race :true ,
            description: true,
            dateFound: true,
            placeFound: true,
            phoneNumber :true,
            userId : true
        },
    });
};



export const updateFoundDeclaration = async (FoundDeclaration: Omit<FoundDeclaration, "id">, id: number): Promise<FoundDeclaration> => {
    const { image, description, animal, race,dateFound,  phoneNumber, userId, placeFound} = FoundDeclaration;
    return db.foundDeclaration.update({
        where: {
            id,
        },
        data: {
            image,
            description,
            animal,
            race, 
            dateFound,
            placeFound,
            phoneNumber, 
            userId
           },
        select: {
            id: true,
            image: true,
            animal : true,
            race :true ,
            description: true,
            dateFound: true,
            placeFound: true,
            phoneNumber :true , 
            userId : true
            

        },
    });
};

export const deleteFoundDeclaration = async (id: number): Promise<void> => {
    await db.foundDeclaration.delete({
        where: {
            id: id,
        },
    });
};



