/*
  Warnings:

  - You are about to drop the column `id_room` on the `Object` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `creator` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `society_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagOnRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_id_room_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_id_user_fkey";

-- DropForeignKey
ALTER TABLE "TagOnBox" DROP CONSTRAINT "TagOnBox_id_tag_fkey";

-- DropForeignKey
ALTER TABLE "TagOnRoom" DROP CONSTRAINT "TagOnRoom_id_room_fkey";

-- DropForeignKey
ALTER TABLE "TagOnRoom" DROP CONSTRAINT "TagOnRoom_id_tag_fkey";

-- AlterTable
ALTER TABLE "Object" DROP COLUMN "id_room",
ADD COLUMN     "roomId" INTEGER;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "id_TagSociety" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "color",
DROP COLUMN "creator",
DROP COLUMN "society_code",
ADD COLUMN     "id_society" INTEGER;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "TagOnRoom";

-- CreateTable
CREATE TABLE "Society" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Society_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "TagUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagSociety" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "id_society" INTEGER NOT NULL,

    CONSTRAINT "TagSociety_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_society_fkey" FOREIGN KEY ("id_society") REFERENCES "Society"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_id_TagSociety_fkey" FOREIGN KEY ("id_TagSociety") REFERENCES "TagSociety"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagUser" ADD CONSTRAINT "TagUser_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagSociety" ADD CONSTRAINT "TagSociety_id_society_fkey" FOREIGN KEY ("id_society") REFERENCES "Society"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnBox" ADD CONSTRAINT "TagOnBox_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "TagUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
