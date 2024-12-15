/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from "@/hooks/use-toast";
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { useSignIn, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "nishancodes@gmail.com",
      password: "Nishant100",
    },
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      // If user is already authenticated, directly redirect to dashboard.
      if (isSignedIn) {
        const currentQueryString = searchParams.toString();
        const redirectUrl = currentQueryString
          ? `/dashboard?${currentQueryString}`
          : "/dashboard";

        router.push(redirectUrl);
        return;
      }

      if (!isLoaded) return;

      try {
        setLoading(true);
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (authenticated.status === "complete") {
          await setActive({ session: authenticated.createdSessionId });
          toast({
            title: "Success",
            description: "Welcome back!",
          });

          // Preserve existing search parameters
          const currentQueryString = searchParams.toString();
          const redirectUrl = currentQueryString
            ? `/dashboard?${currentQueryString}`
            : "/dashboard";

          router.push(redirectUrl);
        }
      } catch (error: any) {
        setLoading(false);
        if (error?.errors?.[0]?.code === "form_password_incorrect") {
          toast({
            title: "Error",
            description: "email/password is incorrect, try again",
          });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
          });
        }
      }
    }
  );

  return {
    methods,
    onHandleSubmit,
    loading,
  };
};
