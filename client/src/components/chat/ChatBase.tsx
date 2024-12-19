"use client";

import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSideBar";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import ActualChats from "./ActualChats";

export default function ChatBase({
  group,
  users: initialUsers,
  oldMessages,
}: {
  group: ChatGroupType;
  users: Array<ChatGroupUserType> | [];
  oldMessages: Array<MessagesType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<ChatGroupUserType | null>(null);
  const [users, setUsers] = useState<Array<ChatGroupUserType>>(initialUsers);

  useEffect(() => {
    // Load user from localStorage
    const localData = localStorage.getItem(group.id);
    if (localData) {
      const user = JSON.parse(localData);
      setChatUser(user);
      setOpen(false); // Close dialog if user already exists
    }
  }, [group.id]);

  
  const addUserToSidebar = (newUser: ChatGroupUserType) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="flex">
      <ChatSidebar users={users} />
      <div className="w-full md:w-4/5 bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col">
        {open ? (
            <ChatUserDialog
            open={open}
            setOpen={setOpen}
            group={group}
            addUserToSidebar={addUserToSidebar}
            />
        ) : (
            <>
            <ChatNav chatGroup={group} users={users} />
            <ActualChats
                group={group}
                chatUser={chatUser || undefined}
                oldMessages={oldMessages}
            />
            </>
        )}
        </div>

      
    </div>
  );
}
