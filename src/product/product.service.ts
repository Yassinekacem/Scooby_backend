import { db } from "../utils/db.server";
import { Product } from "@prisma/client";



export const listProducts = async (): Promise<Product[]> => {
    return db.product.findMany({
        select: {
            id: true,
            category: true,
            description: true,
            brandProduct : true,
            image: true,
            price: true,
            userId: true,
            isDispo : true,
            animalCible : true
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
    const { category, description,brandProduct,isDispo,animalCible, price, image, userId} = product;
    return db.product.create({
        data: {
            category,
            description,
            brandProduct,
            price,
            image,
            userId,
            animalCible,
            isDispo

        },
        select: {
            id: true,
            category: true,
            description: true,
            price: true,
            image: true,
            userId: true,
            isDispo : true,
            animalCible:true,
            brandProduct :true
            

        },
    });
};


export const updateProduct = async (product: Omit<Product, "id">, id: number): Promise<Product> => {
    const { category, description, price,brandProduct,isDispo, animalCible ,image, userId} = product;
    return db.product.update({
        where: {
            id,
        },
        data: {
            category,
            brandProduct,
            description,
            price,
            image,
            userId,
            isDispo,
            animalCible

        },
        select: {
            id: true,
            category: true,
            description: true,
            price: true,
            image: true,
            userId: true,
            isDispo : true,
            animalCible : true,
            brandProduct : true
            

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
