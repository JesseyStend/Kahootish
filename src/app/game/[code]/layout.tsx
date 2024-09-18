import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ComicAvatar from "@/components/ComicAvatar";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function GameLayout({
  children,
  params: { code },
}: Readonly<{
  params: { code: string };
  children: React.ReactNode;
}>) {
  const game = await prisma.game.findUnique({
    where: { code },
  });

  if (!game) {
    redirect("/404");
  }

  return <main className={"flex w-screen h-screen p-4 gap-4"}>{children}</main>;
}
