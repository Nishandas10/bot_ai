import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      business_type: "company",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    if (!account) {
      return new NextResponse("Failed to create Stripe account", {
        status: 400,
      });
    }

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/callback/stripe/refresh`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/callback/stripe/success`,
      type: "account_onboarding",
    });

    await client.user.update({
      where: { clerkId: user.id },
      data: { stripeId: account.id },
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("Stripe connect error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
