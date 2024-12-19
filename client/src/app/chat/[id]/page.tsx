import { CustomSession } from '@/app/api/auth/[...nextauth]/option';
import { authOptions } from '@/app/api/auth/[...nextauth]/option';
import ChatBase from '@/components/chat/ChatBase';
import { fetchChats } from '@/fetch/chatFetch';
import { fetchChatGroup, fetchChatUsers } from '@/fetch/groupFetch';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React from 'react'

async function Chat({params}: {params: {id: string}}) {
  
  const {id} = await params;
  if(id.length!==36){
    return notFound();
  }

  const chatGroup:ChatGroupType | null = await fetchChatGroup(id);
  if(chatGroup===null){
    return notFound();  // If the group doesn't exist, redirect to 404 page. 404 page is not defined here. You need to define it in pages/404.tsx.
  }  
  const users:Array<ChatGroupUserType> | [] = await fetchChatUsers(id);
  const chats:Array<MessagesType> | [] = await fetchChats(id); 

  console.log("The the group id is", id);
  return (
    
    <div>
      <ChatBase group={chatGroup} users={users} oldMessages={chats} />
    </div>
  )
}


export default Chat