-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    "society_code" INTEGER NOT NULL,
    "tagOnBoxId_box" INTEGER NOT NULL,
    "tagOnBoxId_tag" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagOnBox" (
    "id_box" INTEGER NOT NULL,
    "id_tag" INTEGER NOT NULL,

    CONSTRAINT "TagOnBox_pkey" PRIMARY KEY ("id_box","id_tag")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnBox" ADD CONSTRAINT "TagOnBox_id_box_fkey" FOREIGN KEY ("id_box") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnBox" ADD CONSTRAINT "TagOnBox_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
