/*
  Warnings:

  - The values [INTIALIZING] on the enum `GenreClassificationTaskStatuses` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `audioUploadFilePath` to the `GenreClassificationTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GenreClassificationTaskStatuses_new" AS ENUM ('UPLOADING_AUDIO', 'LOADING_MODEL', 'EXTRACTING_FEATURE', 'PREDICTING_GENRE', 'COMPLETE');
ALTER TABLE "GenreClassificationTask" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "GenreClassificationTask" ALTER COLUMN "status" TYPE "GenreClassificationTaskStatuses_new" USING ("status"::text::"GenreClassificationTaskStatuses_new");
ALTER TYPE "GenreClassificationTaskStatuses" RENAME TO "GenreClassificationTaskStatuses_old";
ALTER TYPE "GenreClassificationTaskStatuses_new" RENAME TO "GenreClassificationTaskStatuses";
DROP TYPE "GenreClassificationTaskStatuses_old";
COMMIT;

-- AlterTable
ALTER TABLE "GenreClassificationTask" ADD COLUMN     "audioUploadFilePath" TEXT NOT NULL,
ALTER COLUMN "completedAt" DROP NOT NULL,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "result" DROP NOT NULL;
