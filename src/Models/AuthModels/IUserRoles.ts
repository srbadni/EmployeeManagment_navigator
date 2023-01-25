import {IRole} from "./Role";
import {IUser} from "./User";

export interface IUserRoles {
    roles?: IRole[];
    selectedRolesIds?: IRole["id"][];
    userId: IRole['id'];
    userName: IUser["userName"]
}