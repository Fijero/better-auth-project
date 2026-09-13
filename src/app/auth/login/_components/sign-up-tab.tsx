"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(2, "password is requireed"),
});

type signUpForm = z.infer<typeof signUpSchema>;

export default function SignUpTab() {
  const router = useRouter();
  async function handleSignUp(data: signUpForm) {
    const res = await authClient.signUp.email(
      { ...data },
      {
        onError: (err) => {
          toast.error(err.error.message ?? "Error signing up");
        },
        onSuccess: async () => {
          toast.success("Sign Up success, please wait...");

          await new Promise((resolve) => setTimeout(resolve, 3000));
          router.push("/");
        },
      },
    );
  }

  const form = useForm<signUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = form.formState;

  return (
    <form
      method="post"
      className="space-y-4"
      onSubmit={form.handleSubmit(handleSignUp)}
    >
      <div className="m-3" />
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" className="h-11" {...form.register("name")} />
        <FieldError> {form.formState.errors.name?.message}</FieldError>
      </Field>
      <div className="m-3" />
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" className="h-11" {...form.register("email")} />

        <FieldError> {form.formState.errors.email?.message}</FieldError>
      </Field>
      <div className="m-3" />
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" className="h-11" {...form.register("password")} />
        <FieldError> {form.formState.errors.password?.message}</FieldError>
      </Field>

      <div className="flex justify-center">
        <Button
          size="lg"
          type={"submit"}
          disabled={isSubmitting}
          className={"w-2/3"}
        >
          {isSubmitting ? <Spinner /> : null}
          Submit
        </Button>
      </div>
    </form>
  );
}
