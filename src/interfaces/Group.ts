import { User } from "./User";
import { UserGroup } from "./UserGroup";

export interface Group {
    id?: string,
    name: string,
    description: string,
    image: string,
    adm: User,
    userGroups: UserGroup[]
}