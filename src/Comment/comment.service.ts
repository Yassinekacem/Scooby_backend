import { db } from "../utils/db.server";
import { comment } from '@prisma/client' 

export const listComments = async (): Promise<comment[]> => {
    return db.comment.findMany({
        select: {
            id: true,
            firstName: true,
            lastName : true,
            message : true,
            stars: true,
            userId: true,
            createdAt : true,
            announcementId: true,
        },
    });
}; 

export const getCommentByAnnouncementId = async ( announcementId : number): Promise<comment[]> => {
    return db.comment.findMany({
        where: { 
            announcementId,
        },
    });
};


export const addComment = async (
    comment: Omit<comment, "id">
): Promise<comment> => {
    const {  firstName,lastName ,message, stars ,createdAt,announcementId,  userId} = comment;
    return db.comment.create({
        data: {
          
            firstName,
            lastName,
            createdAt,
            message,
            stars,
            announcementId, 
            userId,

        },
        select: {
            id: true,
            firstName: true,
            lastName : true,
            message : true,
            stars: true,
            userId: true,
            createdAt : true,
            announcementId: true,
        },
    });
};
