import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function QuestionPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Fill in the blank</CardTitle>
          <CardDescription className="text-3xl">
            In a surprising turn of events, the new superhero&apos;s secret
            power is ________.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-2">
          <Progress value={50} />
          <CardDescription className="text-2xl">
            4 out of 5 players have filled in an answer
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
