import { ComponentProps, ElementType } from "react";
import {  } from "lucide-react";
import { DiscordIcon, GithubIcon } from "@/components/ui/svg-icons";

export const supportedSocialAuths = ["github", "discord"] as const;
export type supportedOauthProvider = (typeof supportedSocialAuths)[number];

export const supportedAuthDetails: Record<
  supportedOauthProvider,
  { name: string; Icon: ElementType<ComponentProps<"svg">> }
> = {
  discord: { name: "discord", Icon: DiscordIcon },
  github: { name: "Github", Icon: GithubIcon },
};
