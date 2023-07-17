/*
  Warnings:

  - You are about to drop the column `authorId` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateToPublish` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialMedia` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_publicationId_fkey";

-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_authorId_fkey";

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "authorId",
DROP COLUMN "description",
ADD COLUMN     "dateToPublish" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "socialMedia" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Image";

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
