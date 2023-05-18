import { db } from "../../utils/db.server";
import { LostDeclaration } from '@prisma/client' 


export const listLostDeclaration = async (): Promise<LostDeclaration[]> => {
    return db.lostDeclaration.findMany({
        select: {
            id: true,
            image: true,
            animal : true,
            race : true,
            description: true,
            dateLost: true,
            placeLost: true,
            phoneNumber : true,
            withReward : true,
            userId : true,

            
        },
    });
}; 

export const getOneLostDeclaration = async (id: number): Promise<LostDeclaration | null> => {
    return db.lostDeclaration.findUnique({
        where: { id : id },
    });
};  

export const createLostDeclaration = async (
    LostDeclaration: Omit<LostDeclaration, "id">
): Promise<LostDeclaration> => {
    const { image, description, animal, race,dateLost,  phoneNumber,placeLost,withReward , userId} = LostDeclaration;
    return db.lostDeclaration.create({
        data: {
            image,
            description,
            animal,
            race, 
            dateLost,
            placeLost,
            phoneNumber,
            withReward , 
            userId

        },
        select: {
            id: true,
            image: true,
            animal : true,
            race :true ,
            description: true,
            dateLost: true,
            placeLost: true,
            withReward: true,
            phoneNumber :true,
            userId : true
        },
    });
};



export const updateLostDeclaration = async (LostDeclaration: Omit<LostDeclaration, "id">, id: number): Promise<LostDeclaration> => {
    const { image, description, animal, race,dateLost,  phoneNumber,placeLost,withReward , userId}  = LostDeclaration;
    return db.lostDeclaration.update({
        where: {
            id,
        },
        data: {
            image,
            description,
            animal,
            race, 
            dateLost,
            placeLost,
            phoneNumber,
            withReward, 
            userId

        },
        select: {
            id: true,
            image: true,
            animal : true,
            race :true ,
            description: true,
            dateLost: true,
            placeLost: true,
            withReward: true,
            phoneNumber :true,
            userId : true
            

        },
    });
};

export const deleteLostDeclaration = async (id: number): Promise<void> => {
    await db.lostDeclaration.delete({
        where: {
            id: id,
        },
    });
};



