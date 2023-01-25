export interface IUser {
    id?: string;
    createdDate?: string;
    isActive?: boolean;
    name: string;
    userName: string;
    password?: string;
    confirmPassword?: string;
}
