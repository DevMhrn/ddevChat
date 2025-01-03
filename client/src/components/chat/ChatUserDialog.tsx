"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USER_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";

export default function ChatUserDialog({
    open,
    setOpen,
    group,
    addUserToSidebar,
  }: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    group: ChatGroupType;
    addUserToSidebar: (user: ChatGroupUserType) => void;
  }) {
    const params = useParams();
    const [state, setState] = useState({
      name: "",
      passcode: "",
    });
  
    useEffect(() => {
      const data = localStorage.getItem(params["id"] as string);
      if (data) {
        const jsonData = JSON.parse(data);
        if (jsonData?.name && jsonData?.group_id) {
          setOpen(false);
        }
      }
    }, [params, setOpen]);
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const localData = localStorage.getItem(params["id"] as string);
      if (!localData) {
        try {
          const { data } = await axios.post(CHAT_GROUP_USER_URL, {
            name: state.name,
            groupId: params["id"] as string,
          });
          const user = data?.data;
  
          // Store user in localStorage
          localStorage.setItem(params["id"] as string, JSON.stringify(user));
  
          // Add user to sidebar dynamically
          addUserToSidebar(user);
        } catch (error) {
          toast.error("Something went wrong. Please try again!");
          return;
        }
      }
  
      if (group.passcode !== state.passcode) {
        toast.error("Please enter the correct passcode!");
      } else {
        setOpen(false);
      }
    };
  
    return (
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Name and Passcode</DialogTitle>
            <DialogDescription>
              Add your name and passcode to join the room
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mt-2">
              <Input
                placeholder="Enter your name"
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            </div>
            <div className="mt-2">
              <Input
                placeholder="Enter your passcode"
                value={state.passcode}
                onChange={(e) => setState({ ...state, passcode: e.target.value })}
              />
            </div>
            <div className="mt-2">
              <Button className="w-full">Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  