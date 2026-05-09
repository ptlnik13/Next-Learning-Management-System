
"use server"
import { headers } from "next/headers";
const CURRENCY = "USD";
import { formatAmountForStripe } from "@/lib/stripe-helpers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";

export async function createCheckoutSession(data){
    const session = await auth();
    const requestHeaders = await headers();
    const origin = requestHeaders.get("origin");
    const forwardedProto = requestHeaders.get("x-forwarded-proto") ?? "http";
    const host = requestHeaders.get("host");
    const baseUrl = origin ?? (host ? `${forwardedProto}://${host}` : "");

    if (!session?.user) {
        return {
            url: `${baseUrl}/login`,
        };
    }

    const ui_mode = "hosted";

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        submit_type: "auto",
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: CURRENCY,

                    product_data: {
                        name: "Use card as 4242 4242 4242 4242",
                    },
                    unit_amount: formatAmountForStripe(19,CURRENCY)
                },
            },
        ],

        ...(ui_mode === "hosted" && {
            success_url: `${baseUrl}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=65656`,
            cancel_url: `${baseUrl}/courses`
        }),

        ui_mode
    });

    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    };

}



export async function createPaymentIntent(data){
    const paymentIntent = await stripe.paymentIntents.create({
        amount: formatAmountForStripe(19,
            CURRENCY
        ),
        automatic_payment_methods: {enabled:true},
        currency: CURRENCY
    });
    return { client_secret: paymentIntent.client_secret };

}
