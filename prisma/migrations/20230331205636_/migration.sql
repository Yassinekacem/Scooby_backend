-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'client', 'serviceProvider', 'seller');

-- CreateEnum
CREATE TYPE "Animalcible" AS ENUM ('dog', 'cat', 'bird', 'pigeon', 'fish', 'parrot', 'hamster');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('food', 'accessory');

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
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL,
    "description" TEXT NOT NULL,
    "animalCible" "Animalcible" NOT NULL,
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
    "animalCible" "Animalcible"[],
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
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
