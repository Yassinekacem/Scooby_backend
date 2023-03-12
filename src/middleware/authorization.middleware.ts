import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { decode } from 'punycode'; 
import { Product } from '@prisma/client';
import { db } from '../utils/db.server'; 


// check access tpken 
export const checkAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.replace('Bearer ','');
    if (!accessToken) throw new Error('No access token found.');
    jwt.verify(accessToken, 'mysecretkey', (err: any, decoded: any) => {
      if (err) throw new Error('Access token expired.');
      res.locals.user=decoded;
      next();
    });
  };

// verifer le role (est ce que il est admin ou non )
export const checkRoleAdmin=(req: Request, res: Response, next: NextFunction) => {
  const {userRole}=res.locals.user;
  if(userRole!=='admin')
    throw new Error('Unauthoriazed action to manage users.');
  next();
};  



// verifier le role (est ce qu il est un vendeur ou non )
export const checkRoleSeller=(req: Request, res: Response, next: NextFunction) => {
  const {userRole}=res.locals.user;
  if(userRole!=='seller')
    throw new Error('Unauthoriazed action to manage products .');
  next();
}; 

// verifier le role (est ce qu il est un prestataitre de service ou non )
export const checkRoleServiceProvider=(req: Request, res: Response, next: NextFunction) => {
  const {userRole}=res.locals.user;
  if(userRole!=='serviceProvider')
    throw new Error('Unauthoriazed action to manage announcements .');
  next();
}; 


// autoriser seulement aux proprietaires de produit de gerer leurs produits (update and delete ) . 
export const checkProductOwnership = async (req: Request, res: Response, next: NextFunction) => {
  const productId = parseInt(req.params.id, 10);
  const {userId} = res.locals.user;

  const product = await db.product.findUnique({
    where: { id: productId },
    select: { userId: true },
  });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  if (product.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};


// autoriser seulement aux prestataires de service de gerer leurs annonces (update and delete ) . 

export const checkAnnouncementOwnership = async (req: Request, res: Response, next: NextFunction) => {
  const annoucementId = parseInt(req.params.id, 10);
  const {userId} = res.locals.user;

  const announcement = await db.announcement.findUnique({
    where: { id: annoucementId },
    select: { userId: true },
  });
  if (!announcement) {
    return res.status(404).json({ message: 'annoucement not found' });
  }
  if (announcement.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
}; 




export const checkUserOwnershipOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const { userId, userRole } = res.locals.user;

  const user = await db.user.findUnique({
    where: { id },
    select: { id: true, role: true },
  });

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  if (userRole === 'admin' || user.id === userId) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};