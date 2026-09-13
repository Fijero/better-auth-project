"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SocialAuthButtons from "./social-auth-buttons";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(2, "password is required"),
});

type signInForm = z.infer<typeof loginSchema>;

export default function SignInTab() {
  const router = useRouter();
  async function handleSignIn(data: signInForm) {
    await authClient.signIn.email(
      { ...data, rememberMe: false },
      {
        onError: (err) => {
          toast.error(err.error.message);
        },

        onSuccess: () => {
          router.push("/");
        },
      },
    );
  }

  const form = useForm<signInForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div>
      <div className="m-3" />
      <form method="post" onSubmit={form.handleSubmit(handleSignIn)}>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" className="h-11" {...form.register("email")} />

          <FieldError> {form.formState.errors.email?.message}</FieldError>
        </Field>
        <div className="m-3" />
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            className="h-11"
            {...form.register("password")}
          />
          <FieldError> {form.formState.errors.password?.message}</FieldError>
        </Field>
        <div className="m-3" />
        <div className="flex justify-center">
          <Button type={"submit"}>Sign In</Button>
        </div>

        <Separator className={"my-5"} />

       <SocialAuthButtons />
      </form>
    </div>
  );
}
