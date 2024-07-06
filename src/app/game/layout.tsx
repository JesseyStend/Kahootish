import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ComicAvatar from "@/components/ComicAvatar";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={"flex w-screen h-screen p-4 gap-4"}>
      <Card className="min-w-64" variant="dotted">
        <div className="flex flex-row gap-2 justify-center items-center p-6">
          <Badge>5</Badge>
          <h4 className="mt-0 text-2xl">Players online</h4>
        </div>
        <CardContent className="flex flex-col">
          <div className="flex items-center gap-2">
            <ComicAvatar initials="P1" />
            <p className="flex-1 text-2xl">player 1</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 flex flex-col gap-4">
        <Card className="bg-dotted">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Code: 123456</CardTitle>
          </CardHeader>
        </Card>
        {children}
      </div>
    </main>
  );
}
