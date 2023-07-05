/*
  Warnings:

  - You are about to drop the column `celeryTaskId` on the `GenreClassificationTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GenreClassificationTask" DROP COLUMN "celeryTaskId";
