import { db } from "../utils/db.server";
import {  Post } from '@prisma/client' 


export const listPosts = async (): Promise<Post[]> => {
    return db.post.findMany({
        select: {
            id: true,
            firstName : true,
            lastName : true,
            content : true,
            createdAt : true,
            image : true,
            subject : true,
            photoUser : true,
            userId : true
        },
    });
}; 

export const getOnePost = async (id: number): Promise<Post | null> => {
    return db.post.findUnique({
        where: { id : id },
    });
};  




export const createPost = async (
    post: Omit<Post, "id">
): Promise<Post> => {
    const {  firstName,lastName,content,subject,photoUser,createdAt,image ,userId} = post;
    return db.post.create({
        data: {
            content,
            createdAt,
            firstName,
            lastName,
            photoUser,
            subject,
            image,
            userId,

        },
        select: {
            id: true,
            firstName : true,
            lastName : true,
            content : true,
            createdAt : true,
            image : true,
            subject : true,
            photoUser : true,
            userId : true
        },
    });
};



export const updatePost = async (post: Omit<Post, "id">, id: number): Promise<Post> => {
    const {  firstName,lastName,content,subject,photoUser,createdAt,image ,userId} = post;
    return db.post.update({
        where: {
            id,
        },
        data: {
            content,
            createdAt,
            firstName,
            lastName,
            photoUser,
            subject,
            image,
            userId,

        },
        select: {
            id: true,
            firstName : true,
            lastName : true,
            content : true,
            createdAt : true,
            image : true,
            subject : true,
            photoUser : true,
            userId : true
        },
    });
};

export const deletePost = async (id: number): Promise<void> => {
    await db.post.delete({
        where: {
            id: id,
        },
    });
};



