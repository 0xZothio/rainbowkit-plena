import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import { SiweMessage } from "siwe";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "averylongsecret",
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.id = token.sub;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        const nonce =
          cookies().get("next-auth.csrf-token")?.value.split("|")[0] || "";
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            nonce: nonce,
          });

          if (result.success) {
            const id = "12345";
            return {
              id,
            };
          }
          return null;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
