/*
  Warnings:

  - Added the required column `id_room` to the `Object` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Object" ADD COLUMN     "id_room" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_id_room_fkey" FOREIGN KEY ("id_room") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
