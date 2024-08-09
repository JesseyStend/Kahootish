-- CreateEnum
CREATE TYPE "QuestionCatagory" AS ENUM ('SPORTS', 'SCIENCE', 'HISTORY', 'GEOGRAPHY', 'ART', 'ENTERTAINMENT');

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "code" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "catagory" "QuestionCatagory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
