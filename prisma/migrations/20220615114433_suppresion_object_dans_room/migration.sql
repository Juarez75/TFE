/*
  Warnings:

  - You are about to drop the column `roomId` on the `Object` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_roomId_fkey";

-- AlterTable
ALTER TABLE "Object" DROP COLUMN "roomId";
