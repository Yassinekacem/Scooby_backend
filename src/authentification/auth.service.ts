import { db } from "../utils/db.server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv" ; 
dotenv.config() ; 
import { User } from "@prisma/client";

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
  const { firstName, lastName, email, password } =user;

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
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      gender: true,
      email: true,
      password: true,
      phoneNumber: true,
      role : true,
    },
  });

  const token = jwt.sign({ userId: newUser.id , useremail : newUser.email , userpasswoed : newUser.password , userRole : newUser.role}, SECRET);

  return { user : newUser, token };
};  


function generateToken(user: User) {
  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
  return token;
}

export async function signIn(email: string, password: string): Promise<string> {
  const user = await db.user.findFirst({ where: { email } });
  
  if (!user) {
    throw new Error('Aucun utilisateur trouvé avec cet e-mail.');
  }
  
  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword) {
    throw new Error('Mot de passe incorrect.');
  }
  
  const token = jwt.sign({ userId: user.id , useremail : user.email , userpassword : user.password , userRole : user.role}, SECRET);
  
  return token;
}