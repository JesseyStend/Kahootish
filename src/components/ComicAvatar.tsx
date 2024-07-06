import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { createAvatar } from "@dicebear/core";
import { openPeeps } from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export interface ComicAvatarProps
  extends React.ComponentPropsWithoutRef<"div"> {
  initials: string;
  flip?: boolean;
}

export default function ComicAvatar({
  initials,
  flip,
  className,
  ...props
}: ComicAvatarProps) {
  const avatar = useMemo(
    () =>
      createAvatar(openPeeps, {
        seed: initials,
        flip,
      }),
    [initials, flip]
  );

  return (
    <Avatar className={cn("bg-muted border", className)} size="lg" {...props}>
      <AvatarImage src={avatar.toDataUri()} />
      <AvatarFallback>{initials ? initials : "?"}</AvatarFallback>
    </Avatar>
  );
}
