import {IRole} from "./Role";

interface Permission {
    id: string;
    displayValue: string;
    selected: boolean;
}

export interface IRolePermission {
    roleId: IRole["id"];
    displayName: string;
    permissions: Permission[];
    selectedPermissionsIds?: Permission["id"][];
}