import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/option";
import GroupChatCardMenu from "./GroupChatCardMenu";

export default function GroupChatCard({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomUser;
}) {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center ">
        <CardTitle className="text-2xl">{group.title}</CardTitle>
        <GroupChatCardMenu user={user} group={group} />
      </CardHeader>
      <CardContent>
        <p>
          Passcode :-<strong>{group.passcode}</strong>
        </p>
        <p>Created At :-{new Date(group.createdAt).toDateString()}</p>
      </CardContent>
    </Card>
  );
}