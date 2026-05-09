import "server-only";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion: "2025-02-24.acacia",
    // apiVersion: "2023-10-16",

    appInfo: {
        name: "NEXTJSLMS",
    }

})
