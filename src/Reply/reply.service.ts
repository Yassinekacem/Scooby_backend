import { db } from "../utils/db.server";
import { Reply } from '@prisma/client' 

export const listReplys = async (): Promise<Reply[]> => {
    return db.reply.findMany({
        select: {
            id: true,
            firstName: true,
            lastName : true,
            reply : true,
            image  :true,
            userId: true,
            createdAt : true,
            responseId: true,
        },
    });
}; 


export const getReplyByResponseId = async ( responseId : number): Promise<Reply[]> => {
    return db.reply.findMany({
        where: { 
            responseId,
        },
    });
};


export const addReply = async (
    comment: Omit<Reply, "id">
): Promise<Reply> => {
    const {  firstName,lastName ,reply, image ,createdAt,responseId,  userId} = comment;
    return db.reply.create({
        data: {
          
            firstName,
            lastName,
            createdAt,
            image,
            responseId,
            reply, 
            userId,

        },
        select: {
            id: true,
            firstName: true,
            lastName : true,
            reply : true,
            responseId: true,
            userId: true,
            createdAt : true,
            image: true,
        },
    });
};