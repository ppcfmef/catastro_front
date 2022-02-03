export interface Role {
    id: number;
    name: string;
}

export interface Institute {
    id: number;
    name: string;
}

export interface User
{
    id?: number;
    username: string;
    name?: string;
    email?: string;
    avatar?: string;
    isActive: boolean;
    dateJoined: string;
    role: Role;
    institution: Institute;
}
