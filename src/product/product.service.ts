import { db } from "../utils/db.server";
import {Category}  from "@prisma/client"


export type Product = {
    id: number;
    category: Category;
    description: string;
    image: string;
    price: number;
    userId : number; 
};



export const listProducts = async (): Promise<Product[]> => {
    return db.product.findMany({
        select: {
            id: true,
            category: true,
            description: true,
            image: true,
            price: true,
            userId: true
        },
    });
}; 

export const getOneProduct = async (id: number): Promise<Product | null> => {
    return db.product.findUnique({
        where: { id: id },
    });
}; 


export const createProduct = async (
    product: Omit<Product, "id">
): Promise<Product> => {
    const { category, description, price, image, userId} = product;
    return db.product.create({
        data: {
            category,
            description,
            price,
            image,
            userId,

        },
        select: {
            id: true,
            category: true,
            description: true,
            price: true,
            image: true,
            userId: true,
            

        },
    });
};


export const updateProduct = async (product: Omit<Product, "id">, id: number): Promise<Product> => {
    const { category, description, price, image, userId} = product;
    return db.product.update({
        where: {
            id,
        },
        data: {
            category,
            description,
            price,
            image,
            userId,

        },
        select: {
            id: true,
            category: true,
            description: true,
            price: true,
            image: true,
            userId: true,
            

        },
    });
};

export const deleteProduct = async (id: number): Promise<void> => {
    await db.product.delete({
        where: {
            id: id,
        },
    });
};
