import ChatBase from '@/components/chat/ChatBase';
import React from 'react'

async function Chat({params}: {params: {id: string}}) {
  const {id} = await params;
  console.log("The the group id is", id);
  return (
    
    <div>
      Chat
      <ChatBase />
    </div>
  )
}


export default Chat