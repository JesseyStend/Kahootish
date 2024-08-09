"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import createGame from "@/app/actions/createGame";

export const createGameFormSchema = z.object({
  roundsAmount: z.number().min(5),
});

export default function CreateGameForm() {
  const form = useForm<z.infer<typeof createGameFormSchema>>({
    resolver: zodResolver(createGameFormSchema),
    defaultValues: {
      roundsAmount: 5,
    },
  });

  return (
    <Form {...form}>
      <form action={createGame} className="min-h-[400px]">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create a game</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="roundsAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game rounds</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="w-full">
            <Button type="submit" className="w-full">
              Create game
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
