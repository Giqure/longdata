
export type User = {
    id: number;
    username: string;
    password: string;
    avatar: string;
    email: string;
    createAt: string;
    updatedAt: string;
    group: UserGroup[];
}

export type UserGroup = {
    usergroupname: string;
    users: User[];
}
