import { db } from "../utils/db.server";
import { Response } from '@prisma/client' 

export const listResponses = async (): Promise<Response[]> => {
    return db.response.findMany({
        select: {
            id: true,
            firstName: true,
            lastName : true,
            response : true,
            image  :true,
            userId: true,
            createdAt : true,
            postId: true,
        },
    });
}; 

export const gerResponseByPostId = async ( postId : number): Promise<Response[]> => {
    return db.response.findMany({
        where: { 
            postId,
        },
    });
};


export const addResponse = async (
    comment: Omit<Response, "id">
): Promise<Response> => {
    const {  firstName,lastName ,response, image ,createdAt,postId,  userId} = comment;
    return db.response.create({
        data: {
          
            firstName,
            lastName,
            createdAt,
            image,
            postId,
            response, 
            userId,

        },
        select: {
            id: true,
            firstName: true,
            lastName : true,
            response : true,
            postId: true,
            userId: true,
            createdAt : true,
            image: true,
        },
    });
};

export const deleteResponse = async (id: number): Promise<void> => {
    await db.response.delete({
        where: {
            id: id,
        },
    });
};
