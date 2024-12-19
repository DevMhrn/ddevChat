import axios from "axios";
import { CHAT_GROUP_URL, CHAT_GROUP_USER_URL } from "@/lib/apiEndPoints";


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
    if(!res.ok) {
        throw new Error("Failed to fetch chat groups");
    }
    
    const response = await res.json();
    if(response?.success) {
        return response?.data;
    }
    else {
        return [];
    }
}
export async function fetchChatGroup(id : string) {
    const res = await fetch(`${CHAT_GROUP_URL}/${id}`,{ 
        cache : "no-cache"
    });
    console.log("The response is",res);
    console.log("The response is ok",res.ok);
    if(!res.ok) {
        throw new Error("Failed to fetch chat group");
    }

    
    const response = await res.json();
    if(response?.success) {
        return response?.data;
    }
    else {
        return null;
    }
}
export async function fetchChatUsers(id : string) {
    const res = await fetch(`${CHAT_GROUP_USER_URL}/?group_id=${id}`,{ 
        
        cache : "no-cache"
    });
    console.log("The response is",res);
    console.log("The response is ok",res.ok);
    if(!res.ok) {
        throw new Error("Failed to fetch Users of group");
    }

    
    const response = await res.json();
    if(response?.success) {
        return response?.data;
    }
    else {
        return null;
    }
}