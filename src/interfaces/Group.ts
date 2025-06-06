import { User } from "./User";

export interface Group {
    id?: string,
    name: string,
    description: string,
    image: string,
    adm: User
}