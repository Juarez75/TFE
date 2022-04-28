-- DropForeignKey
ALTER TABLE "Box" DROP CONSTRAINT "Box_id_room_fkey";

-- DropForeignKey
ALTER TABLE "Box" DROP CONSTRAINT "Box_id_user_fkey";

-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_id_box_fkey";

-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_id_user_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_id_user_fkey";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Box" ADD CONSTRAINT "Box_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Box" ADD CONSTRAINT "Box_id_room_fkey" FOREIGN KEY ("id_room") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_id_box_fkey" FOREIGN KEY ("id_box") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;
