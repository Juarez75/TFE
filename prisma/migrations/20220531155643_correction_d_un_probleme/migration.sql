/*
  Warnings:

  - You are about to drop the column `tagOnBoxId_box` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `tagOnBoxId_tag` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "tagOnBoxId_box",
DROP COLUMN "tagOnBoxId_tag";
