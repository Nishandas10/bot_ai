/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useToast } from "../use-toast";
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { onCompleteUserRegistration } from "@/actions/auth";

export const useSignUpForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: "owner",
    },
    mode: "onChange",
  });

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      onNext((prev) => prev + 1);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.errors[0].longMessage,
      });
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });

        console.log("Complete Sign Up Status:", completeSignUp.status); // Log the status for debugging

        if (completeSignUp.status !== "complete") {
          // Redirect to the sign-up page on incorrect OTP
          setLoading(false); // Stop the spinner
          router.push("/dashboard");
          return; // Exit the function after redirecting
        }

        if (completeSignUp.status == "complete") {
          if (!signUp.createdUserId) return;

          const registered = await onCompleteUserRegistration(
            values.fullname,
            signUp.createdUserId,
            values.type
          );

          if (registered?.status === 200 && registered.user) {
            await setActive({
              session: completeSignUp.createdSessionId,
            });

            setLoading(false); // Stop the spinner
            router.push("/dashboard");
          }

          if (registered?.status === 400) {
            setLoading(false); // Stop the spinner
            toast({
              title: "Error",
              description: "Something went wrong!",
            });
          }
        }
      } catch (error: any) {
        setLoading(false); // Stop the spinner
        toast({
          title: "Error",
          description: error.errors[0].longMessage,
        });
      }
    }
  );
  return {
    methods,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  };
};
