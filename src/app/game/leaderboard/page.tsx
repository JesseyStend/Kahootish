import ComicAvatar from "@/components/ComicAvatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function LeaderBoardPage() {
  return (
    <div className="flex items-center justify-center flex-1 gap-10">
      <div className="flex">
        <div className="flex flex-col gap-4 justify-end">
          <ComicAvatar initials="P1" className="mx-4" />
          <div className="bg-card h-36 w-full shadow-cartoon rounded-l flex items-center justify-center text-lg">
            <span className=" rotate-[270deg]">3. place</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ComicAvatar initials="P2" className="mx-4" />
          <div className="bg-card h-60 w-full shadow-cartoon rounded-t flex items-center justify-center text-lg">
            <span className="rotate-[270deg]">1. place</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-end">
          <ComicAvatar initials="P3" className="mx-4" />
          <div className="bg-card h-44 w-full shadow-cartoon rounded-r flex items-center justify-center text-lg">
            <span className="rotate-[270deg]">2. place</span>
          </div>
        </div>
      </div>
      <Card className="w-96 flex flex-col placeholder:gap-2 p-4 px-6">
        <div className="flex gap-2 items-center">
          <Badge>4.</Badge>
          <ComicAvatar initials="P1" /> <p className="text-xl">Player 4</p>
        </div>
        <div className="flex gap-2 items-center">
          <Badge>5.</Badge>
          <ComicAvatar initials="P2" /> <p className="text-xl">Player 5</p>
        </div>
        <div className="flex gap-2 items-center">
          <Badge>6.</Badge>
          <ComicAvatar initials="P3" /> <p className="text-xl">Player 6</p>
        </div>
      </Card>
    </div>
  );
}
