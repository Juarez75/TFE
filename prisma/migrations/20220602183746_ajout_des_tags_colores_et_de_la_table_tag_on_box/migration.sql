-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "color" TEXT;

-- CreateTable
CREATE TABLE "TagOnRoom" (
    "id_room" INTEGER NOT NULL,
    "id_tag" INTEGER NOT NULL,

    CONSTRAINT "TagOnRoom_pkey" PRIMARY KEY ("id_room","id_tag")
);

-- AddForeignKey
ALTER TABLE "TagOnRoom" ADD CONSTRAINT "TagOnRoom_id_room_fkey" FOREIGN KEY ("id_room") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnRoom" ADD CONSTRAINT "TagOnRoom_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
