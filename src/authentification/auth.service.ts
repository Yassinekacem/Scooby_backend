import { db } from "../utils/db.server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv" ; 
dotenv.config() ; 
import { User } from "@prisma/client";
import { now } from "moment";

if(!process.env.SECRET) {
  process.exit(1) ; 
} 
const SECRET : string = process.env.SECRET 
export type AuthResponse = {
  user: User;
  token: string;
};

export const signup = async (
  user: Omit<User, "id">
): Promise<AuthResponse> => {
  const { firstName, lastName,photo, email, password , phoneNumber,role  ,createdAt,updatedAt} =user;

  // Vérifier si l'email existe déjà dans la base de données
  const existingUser = await db.user.findFirst({
    where: { email },
    select: { email: true },
  });

  if (existingUser) {
    throw new Error("Cet email existe déjà");
  }
  if (password.length < 6) {
    throw new Error("Le mot de passe est faible. Veuillez choisir un mot de passe d'au moins 6 caractères.");
  }
    const hashedPassword = await bcrypt.hash(password, 10);

  
 

  const newUser = await db.user.create({
    data: {
      firstName,
      lastName,
      createdAt,
      updatedAt,
      email,
      password : hashedPassword,
      role,
      phoneNumber,
      photo
      
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt : true,
      updatedAt : true,
      password: true,
      phoneNumber: true,
      role : true,
      photo : true
    },
  });

  const token = jwt.sign({ userId: newUser.id , useremail : newUser.email , userpasswoed : newUser.password , userRole : newUser.role}, SECRET);

  return { user : newUser, token };
};  




export async function signIn( email: string, password: string): Promise<string > {
  const user = await db.user.findFirst({ where: { email } });

  if (!user) {
    throw new Error("Aucun utilisateur trouvé avec cet e-mail.");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Mot de passe incorrect.");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      useremail: user.email,
      userRole: user.role,
      firstName: user.firstName,
      lastName : user.lastName,
      userImage : user.photo,
    },
    SECRET
  );

  return  token ;
}

export const updateUser = async (user: Omit<User, "id">, id: number): Promise<User> => {
  const { firstName, lastName, email, phoneNumber, password , role,photo,createdAt,updatedAt} = user;
  

  return db.user.update({
      where: {
          id,
      },
      data: {
          firstName,
          lastName,
          email,
          phoneNumber,
          photo,
          password ,
          role,
          updatedAt ,
          createdAt,

      },
      select: {
          id: true,
          firstName: true,
          lastName: true,
          photo :true,
          email: true,
          password: true,
          role: true , 
          phoneNumber : true ,
          createdAt:true,
          updatedAt : true

      },
  });
};
