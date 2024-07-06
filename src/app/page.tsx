"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";
import { Button } from "@/components/ui/button";
import CreateGameForm from "@/components/forms/CreateGameForm";
import JoinGameForm from "@/components/forms/JoinGameForm";

export default function Home() {
  const [formState, setFormState] = React.useState("join");

  return (
    <main className="container max-w-[27rem] p-8 flex flex-col gap-4 h-screen justify-center">
      <Tabs value={formState} className="w-full" onValueChange={setFormState}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="join">Join</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsContent value="join"></TabsContent>
        </TabsList>
        <TabsContent value="join">
          <JoinGameForm />
        </TabsContent>
        <TabsContent value="create">
          <CreateGameForm />
        </TabsContent>
      </Tabs>
    </main>
  );
}
