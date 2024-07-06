"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  playerName: z.string().min(2),
  code: z
    .string()
    .min(6, {
      message: "The game code must be 6 characters.",
    })
    .max(6),
});

export default function JoinGameForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: "",
      code: "",
    },
  });

  const onSubmit = form.handleSubmit((data, onError) => {
    form.setError("code", { message: "Invalid game code (unimplemented)" });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="min-h-[400px]">
        <Card>
          <CardHeader>
            <FormField
              control={form.control}
              name="playerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your player name</FormLabel>
                  <FormControl>
                    <Input placeholder="Player1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardHeader>
          <hr className="mx-4" />
          <CardHeader className="text-center">
            <CardTitle>Fill in the game-code</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="w-full">
            <Button type="submit" className="w-full">
              Join game
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
