import axios from "axios";
import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";


export async function fetchChatGroups(token : string) {
    const res = await fetch(CHAT_GROUP_URL,{
        headers : {
            Authorization : token
        },
        next : {
            revalidate : 5*60,
            tags:["dashboard"]
        }
    });
    console.log("The response is",res);
    console.log("The response is ok",res.ok);
    
    const response = await res.json();
    if(response?.success) {
        return response?.data;
    }
    else {
        return [];
    }
}