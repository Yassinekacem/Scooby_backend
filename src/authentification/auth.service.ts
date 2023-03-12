import { db } from "../utils/db.server";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv" ; 
dotenv.config() ; 



export type User = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: Role;
  facebookId?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export const signup = async (
  user: Omit<User, "id">
): Promise<AuthResponse> => {
  const { firstName, lastName, gender, email, phoneNumber, password, role } =
    user;

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
  // Hacher le mot de passe avant de l'enregistrer
  const hashedPassword = await bcrypt.hash(password, 10);

  // Si l'email n'existe pas, créer le nouvel utilisateur en utilisant le mot de passe haché
  const newUser = await db.user.create({
    data: {
      firstName,
      lastName,
      gender,
      email,
      phoneNumber,
      password: hashedPassword, // utiliser le mot de passe haché
      role,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      gender: true,
      email: true,
      password: true,
      phoneNumber: true,
      role: true,
    },
  });

  const token = jwt.sign({ userId: newUser.id , useremail : newUser.email , userpasswoed : newUser.password , userRole : newUser.role}, "mysecretkey");

  return { user: newUser, token };
};  
if(!process.env.SECRET) {
  process.exit(1) ; 
} 
const SECRET : string = process.env.SECRET 
const secret = 'mysecretkey';

// Fonction pour générer le token JWT
function generateToken(user: User) {
  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
  return token;
}

// Fonction de connexion
export async function signIn(email: string, password: string): Promise<string> {
  // Récupérer l'utilisateur correspondant à l'e-mail
  const user = await db.user.findFirst({ where: { email } });
  
  if (!user) {
    throw new Error('Aucun utilisateur trouvé avec cet e-mail.');
  }
  
  // Comparer le mot de passe fourni avec le mot de passe hashé enregistré dans la base de données
  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword) {
    throw new Error('Mot de passe incorrect.');
  }
  
  // Générer un token JWT pour l'utilisateur connecté
  const token = jwt.sign({ userId: user.id , useremail : user.email , userpassword : user.password , userRole : user.role}, "mysecretkey");
  
  return token;
}