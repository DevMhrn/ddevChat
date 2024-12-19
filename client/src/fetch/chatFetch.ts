import { CHATS_URL } from "@/lib/apiEndPoints";

export async function fetchChats(groupId : string) {
    const res = await fetch(`${CHATS_URL}/${groupId}`,{
        cache : "no-cache"
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