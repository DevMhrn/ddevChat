import NextAuth from "next-auth";
import options from "./option";

const nextAuth = NextAuth(options);
export { nextAuth as GET, nextAuth as POST };


