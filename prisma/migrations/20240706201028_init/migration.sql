-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "joinedGameCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "code" TEXT NOT NULL DEFAULT '',
    "roundsAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_joinedGameCode_fkey" FOREIGN KEY ("joinedGameCode") REFERENCES "Game"("code") ON DELETE SET NULL ON UPDATE CASCADE;
