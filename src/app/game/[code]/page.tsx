import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import { LoaderIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function GamePage(reg: { params: { code: string } }) {
  const { code } = reg.params;

  const game = await prisma.game.findUnique({
    where: { code },
  });

  if (!game) {
    redirect("/404");
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Game settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Label className="text-muted-foreground">Round amount</Label>
            <Input
              type="number"
              defaultValue={game.roundsAmount}
              className="text-ms"
            />
          </CardContent>
        </Card>
        <Card className="flex flex-col px-8">
          <CardHeader>
            <CardTitle className="text-center">Waiting for players</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center flex-1">
            <LoaderIcon className="w-32 h-32 animate-spin" />
            <Button disabled className="mt-8 text-4xl py-4" size="lg">
              Start game
            </Button>
            <CardDescription className="mt-4">
              Need at least 4 players to play
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
