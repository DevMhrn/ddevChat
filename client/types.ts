type ChatGroupType = {
    id : string;
    userId : number;
    title : string;
    passcode : string;
    createdAt : string;
}
type ChatGroupUserType = {
    id : number;
    name : string;
    groupId : string;
    createdAt : string;
}
type MessagesType = {
    id : string;
    groupId : string;
    message : string;
    createdAt : string;
    name : string;
    
}
