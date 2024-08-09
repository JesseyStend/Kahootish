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
    select: { Users: { select: { id: true, name: true } } },
    where: { code },
  });

  if (!game) {
    redirect("/404");
  }

  return (
    <main className={"flex w-screen h-screen p-4 gap-4"}>
      <Card className="min-w-64" variant="dotted">
        <div className="flex flex-row gap-2 justify-center items-center p-6">
          <Badge>{game.Users.length}</Badge>
          <h4 className="mt-0 text-2xl">Players online</h4>
        </div>
        <CardContent className="flex flex-col">
          {game.Users.map((user, index) => (
            <div key={`user-pf-${user.id}`} className="flex items-center gap-2">
              <ComicAvatar initials={user.name.slice(0, 2)} />
              <p className="flex-1 text-2xl">{user.name}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex-1 flex flex-col gap-4">
        <Card className="bg-dotted">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Code: {code}</CardTitle>
          </CardHeader>
        </Card>
        {children}
      </div>
    </main>
  );
}
