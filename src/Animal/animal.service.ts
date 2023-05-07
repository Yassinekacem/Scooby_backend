import { db } from "../utils/db.server";
import { Animal } from "@prisma/client";

export const listAnimalsToSell = async (): Promise<Animal[]> => {
  return db.animal.findMany({
    where: {
      status: "toSell",
    },
    select: {
      id: true,
      isEducated: true,
      isVaccinated: true,
      name : true,
      dateOfBirth : true,
      description : true,
      species: true,
      race: true,
      price: true,
      image: true,
      userId: true,
      age: true,
      gender: true,
      status: true,
    },
  });
};
// afficher tous les animaux à adopter 
export const listAnimalsToAdopt = async (): Promise<Animal[]> => {
  return db.animal.findMany({
    where: {
      status: "toAdopt",
    },
    select: {
      id: true,
      isEducated: true,
      isVaccinated: true,
      name : true,
      dateOfBirth : true,
      description : true,
      species: true,
      race: true,
      price: true,
      image: true,
      userId: true,
      age: true,
      gender: true,
      status: true,
    },
  });
};


export const getOneAnimal = async (id: number): Promise<Animal | null> => {
    return db.animal.findUnique({
        where: { id: id },
    });
}; 


export const addAnimal = async (
    animal: Omit<Animal, "id">
): Promise<Animal> => {
    const { species, race,age, price,gender,status,image, name,dateOfBirth,description,userId,isEducated,isVaccinated} = animal;
    return db.animal.create({
        data: {
            species,
            name,
            dateOfBirth,
            description,
            race,
            price,
            image,
            userId,
            isEducated,
            isVaccinated,
            age,
            gender,
            status

        },
        select: {
            id: true,
            isEducated:true,
            isVaccinated:true,
            name : true,
            dateOfBirth : true,
            description : true,
            species :true,
            race:true,
            price:true,
            image:true,
            userId:true,
            age:true,
            gender:true,
            status:true

        },
    });
};


export const updateAnimal = async (animal: Omit<Animal, "id">, id: number): Promise<Animal> => {
  const { species, race,age, price,gender,status,image, name,dateOfBirth,description,userId,isEducated,isVaccinated} = animal;
  return db.animal.update({
        where: {
            id,
        },
        data: {
            species,
            isEducated,
            isVaccinated,
            race,
            price,
            image,
            userId,
            age,
            gender,
            status


        },
        select: {
          id: true,
          isEducated:true,
          isVaccinated:true,
          name : true,
          dateOfBirth : true,
          description : true,
          species :true,
          race:true,
          price:true,
          image:true,
          userId:true,
          age:true,
          gender:true,
          status:true

      },
    });
};

export const deleteAnimal = async (id: number): Promise<void> => {
    await db.animal.delete({
        where: {
            id: id,
        },
    });
};
