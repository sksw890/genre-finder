-- CreateEnum
CREATE TYPE "GenreClassificationTaskStatuses" AS ENUM ('INTIALIZING', 'UPLOADING_AUDIO', 'LOADING_MODEL', 'EXTRACTING_FEATURE', 'PREDICTING_GENRE', 'COMPLETE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "hashedPassword" BYTEA NOT NULL,
    "salt" BYTEA NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenreClassificationTask" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "celeryTaskId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3) NOT NULL,
    "status" "GenreClassificationTaskStatuses" NOT NULL DEFAULT 'INTIALIZING',
    "result" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,

    CONSTRAINT "GenreClassificationTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- AddForeignKey
ALTER TABLE "GenreClassificationTask" ADD CONSTRAINT "GenreClassificationTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
