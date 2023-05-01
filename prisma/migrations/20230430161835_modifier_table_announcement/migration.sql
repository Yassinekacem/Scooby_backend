-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'client', 'veterinary', 'petTrainer', 'petSitter', 'petGroomer', 'petShop', 'petSeller', 'animalOwner');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('food', 'accessory');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('basique', 'intermediaire', 'personnalise');

-- CreateEnum
CREATE TYPE "Service" AS ENUM ('veterinaryCaring', 'petSitting', 'petGrooming', 'petTraining');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('toSell', 'toAdopt');

-- CreateEnum
CREATE TYPE "typeAnimal" AS ENUM ('cat', 'dog');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL,
    "brandProduct" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "animalCible" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isDispo" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "type" "Service" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastNAme" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "level" "Level" NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "species" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "age" DOUBLE PRECISION NOT NULL,
    "isVaccinated" BOOLEAN NOT NULL,
    "isEducated" BOOLEAN NOT NULL,
    "gender" "gender" NOT NULL,
    "status" "status" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LostDeclaration" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "animal" "typeAnimal" NOT NULL,
    "race" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateLost" TEXT NOT NULL,
    "placeLost" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "withReward" BOOLEAN NOT NULL,

    CONSTRAINT "LostDeclaration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoundDeclaration" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "animal" "typeAnimal" NOT NULL,
    "race" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateFound" TEXT NOT NULL,
    "placeFound" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "FoundDeclaration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
