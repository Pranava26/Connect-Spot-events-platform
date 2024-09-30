import NextAuth from "next-auth/next";
import { connectToDatabase } from "../../../../../lib/database";
import User from "../../../../../lib/database/models/user.model";
import bcrypt from 'bcryptjs'
import Credentials from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const {email, password} = credentials;
                try {
                    await connectToDatabase();

                    const user = await User.findOne({email});

                    if(!user){
                        throw new Error("User does not exist");
                    }

                    const validPassword = await bcrypt.compare(password, user.password);

                    if(!validPassword){
                        throw new Error("Invalid password");
                    }
                    return user;

                } catch (error) {
                    throw new Error(error.message);
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            // When user is available (first sign in), add MongoDB user ID to the token
            if (user) {
                token.id = user._id.toString(); // Add the MongoDB user ID to the token
            }
            return token;
        },
        async session({ session, token }) {
            // Add MongoDB user ID to the session object
            session.user.id = token.id; // Set the user ID from the JWT token
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in"
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };