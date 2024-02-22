import { User, UserGroup } from "./user";

export type FileData = {
    id: number
    filename: string;
    avatar: string | null;
    path: string;
    uploadAt: string;
    updatedAt: string;
    uploadUserId: number;
    uploadUserName: string;
    uploadUserIP: string;
    accessibleUser: User[] | UserGroup[] | string;
    size: number;
}
