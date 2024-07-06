import { Button, ButtonVariantType } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardVariantType,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
} from "@/components/ui/popover";

export default function ComponentLib() {
  return (
    <main className="flex flex-col items-center pt-4 bg-blue-50 p-4 gap-4 min-h-screen">
      <h1 className="text-4xl font-bold">Buttons</h1>
      <div className="flex items-center gap-2">
        {[
          "default",
          "link",
          "destructive",
          "outline",
          "secondary",
          "ghost",
        ].map((variant) => (
          <Button
            key={`$button-variant-${variant}`}
            variant={variant as ButtonVariantType}
          >
            {variant}
          </Button>
        ))}
      </div>

      <h1 className="text-4xl font-bold">Cards</h1>
      <div className="flex items-center gap-2">
        {["default", "dotted"].map((variant) => (
          <Card
            key={`$card-variant-${variant}`}
            variant={variant as CardVariantType}
          >
            <CardHeader>
              <CardTitle>{variant}</CardTitle>
              <CardDescription>A very stylish card</CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-2">
              <Button>Click me</Button>
              <Button variant="destructive">Delete me</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h1 className="text-4xl font-bold">Popovers</h1>
      <div>
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            Place content for the popover here.
            <PopoverArrow />
          </PopoverContent>
        </Popover>
      </div>
    </main>
  );
}
