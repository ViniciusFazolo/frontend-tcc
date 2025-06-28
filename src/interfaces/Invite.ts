import { User } from "./User";

export interface Invite{
  id: string;
  groupId: string;
  groupName: string;
  invitedBy: User
  status: string;
}