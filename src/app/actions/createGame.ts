"use server";

import generateCode from "@/lib/generateCode";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

import { z } from "zod";
const prisma = new PrismaClient();

const createGame = async (formData: FormData) => {
  const game = await prisma.game.create({
    data: {
      code: generateCode(),
      roundsAmount: Number(formData.get("roundsAmount")),
    },
  });

  redirect(`/game/${game.code}`);
};

export default createGame;
