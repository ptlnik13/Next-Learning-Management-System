import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {User} from "./model/user-model";
import bcrypt from "bcryptjs";
import {authConfig} from "@/auth.config";


export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
        ...authConfig,
        providers: [
            CredentialsProvider({
                async authorize(credentials) {
                    if (credentials === null) return null;
                    try {
                        const user = await User.findOne({email: credentials?.email});
                        console.log(user);
                        if (!user) return null;
                        const isPasswordValid = await bcrypt.compare(credentials?.password, user?.password);
                        if (!isPasswordValid) return null;
                        return user;
                    } catch (e) {
                        console.error('User not found');
                        throw new Error("Check your credentials");
                    }
                }
            })
        ]
    }
)
