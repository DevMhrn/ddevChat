import NextAuth, { Account, AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { LOGIN_URL } from "@/lib/apiEndPoints";
export interface CustomSession{
    user?:CustomUser,
    expires:ISODateString
}
export interface CustomUser{
    id?:string|null,
    name?:string|null,
    email?:string|null,
    image?:string|null,
    provider?:string|null,
    token?:string|null
}

export const authOptions: AuthOptions = {
    pages:{
        signIn:"/"
    },
    callbacks:{
        async signIn({user,account}:{user:CustomUser,account:Account|null}){
            try {
                console.log("The user is",user);
                console.log("The account is",account);
                const payload = {
                    email:user?.email,
                    name:user?.name,
                    image:user?.image,
                    provider:account?.provider,
                    oauthId:account?.providerAccountId,

                }

                const {data} = await axios.post(LOGIN_URL,payload);
                user.id = data?.user?.id.toString();
                user.token = data?.user?.token;
                user.provider = data?.user?.provider;
                return true;
                
            } catch (error) {
                console.log(error);
                return false;
            }
            
        },
        async jwt({token,user,account}){
            if(user){
                token.user = user as CustomUser;
            }
            return token;
        },
        async session({session,user, token}:{session:CustomSession,user:CustomUser,token:JWT}){
            session.user = token.user as CustomUser;
            return session;
        }

    },
    
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
            authorization:{
                params:{
                    prompt:"consent",
                    access_type:"offline",
                    response_type:"code"
                }
            }
        })
    ],
}

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);

export default NextAuth(authOptions);
