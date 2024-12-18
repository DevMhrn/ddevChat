import DashNav from '@/components/dashboard/DashNav';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/option';
import CreateChat from '@/components/groupchat/CreateChat';
import { fetchChatGroups } from '@/fetch/groupFetch';
import GroupChatCard from '@/components/groupchat/GroupChatCard';

async function dashboard() {
    const session:CustomSession|null = await getServerSession(authOptions);
    const chatGroups = await fetchChatGroups(session?.user?.token!); 
    console.log("The chat groups are",chatGroups);   
  return (
    
    <div className="bg-gray-100 min-h-screen">
        <DashNav user={{ name: session?.user?.name || "?", image: session?.user?.image || "" }} />
        <div className="container mx-auto p-6">
          <div className="flex justify-end mt-10">
              <CreateChat user={session?.user!} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {chatGroups.length > 0 &&
              chatGroups.map((item: any, index: any) => (   
                <GroupChatCard group={item} key={index} user={session?.user!} />
              ))}
          </div>
        </div>
    </div>
  )
}

export default dashboard; 