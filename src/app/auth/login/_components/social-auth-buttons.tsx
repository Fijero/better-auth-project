"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  supportedAuthDetails,
  supportedSocialAuths,
} from "@/lib/o-auth-providers";

export default function SocialAuthButtons() {
  return supportedSocialAuths.map((provider) => {
    const Icon = supportedAuthDetails[provider].Icon;

    return (
      <Button
        variant={"outline"}
        key={provider}
        onClick={async () => {
          const res = await authClient.signIn.social({
            provider: provider,
          });

          console.log(res);
        }}
      >
        <Icon />
        {supportedAuthDetails[provider].name}
      </Button>
    );
  });
}
