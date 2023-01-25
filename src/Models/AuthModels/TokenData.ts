import {IUser} from "./User";
import {IRole} from "./Role";
import {ICompany} from "./Companies";

export interface TokenData {
    Username: IUser["userName"],
    Role: IRole["id"],
    id?: ICompany["id"],
    Company : boolean
}
