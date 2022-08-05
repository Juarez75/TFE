/*
  Warnings:

  - You are about to drop the column `empty` on the `Box` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Box" DROP COLUMN "empty",
ADD COLUMN     "state" INTEGER NOT NULL DEFAULT 0;
