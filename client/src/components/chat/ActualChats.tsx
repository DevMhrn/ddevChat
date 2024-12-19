import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";

export default function Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: ChatGroupType;
  oldMessages: Array<MessagesType> | [];
  chatUser?: ChatGroupUserType;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessagesType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
    };
    return socket.connect();
  }, [group.id]);

  useEffect(() => {
    // Load messages from localStorage on mount
    const savedMessages = localStorage.getItem(`chat-${group.id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  
    socket.on("message", (data: MessagesType) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, data];
        // Save messages to localStorage
        localStorage.setItem(`chat-${group.id}`, JSON.stringify(updatedMessages));
        return updatedMessages;
      });
      scrollToBottom();
    });
  
    return () => {
      socket.close();
    };
  }, [group.id, socket]);

  const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  if (message.trim() === "") {
    return; // Don't send the message
  }
  const payload: MessagesType = {
    id: uuidv4(),
    message: message,
    name: chatUser?.name ?? "Unknown",
    createdAt: new Date().toISOString(),
    groupId: group.id,
  };

  socket.emit("message", payload);
  setMessage("");

  setMessages((prevMessages) => {
    const updatedMessages = [...prevMessages, payload];
    // Save messages to localStorage
    localStorage.setItem(`chat-${group.id}`, JSON.stringify(updatedMessages));
    return updatedMessages;
  });
};

  return (
    <div className="flex flex-col h-[94vh] p-4">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-sm rounded-lg p-2 ${
                message.name === chatUser?.name
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white self-end"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
              }`}
            >
              {message.message}
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSubmit}
        className="mt-2 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
