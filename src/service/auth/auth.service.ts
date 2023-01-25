import http from '../http';
import {IUser} from "../../Models/AuthModels/User";
import {AxiosResponse} from "axios";
import {ICompany} from "../../Models/AuthModels/Companies";
import {IRole} from "../../Models/AuthModels/Role";

export default class AuthService {

    static getUserById(id: IUser["id"]) {
        return http.get<IUser>(`/users/getby/${id}`)
    }

    static getUser(): Promise<AxiosResponse<IUser[]>> {
        return http.get<IUser[]>("/users/list")
    }

    static addUser(Data: IUser) {
        return http.post<IUser>("/users/create", {...Data})
    }

    //todo replace in api
    static editUser(Data: IUser) {
        return http.put<IUser>("/users/info-edit", {...Data})
    }

    static addCompany(Data: IUser) {
        return http.post<IUser>("/company/create-users", {...Data})
    }

    static editCompany(Data: ICompany) {
        return http.put<ICompany>("/company/info-edit", {...Data})
    }

    static getRoles() {
        return http.get<IRole[]>("/roles/list")
    }

    static getRoleById(id: IRole["id"]) {
        return http.get<IRole>(`/roles/info-edit/${id}`)
    }

    static addRoles(Data: IRole) {
        return http.post<IRole>("/roles/create", {...Data})
    }

    static editRole(Data: IRole) {
        return http.put<IRole>("/roles/info-edit", {...Data})
    }

    static changePassword(Data: any) {
        return http.put<any>("/users/change-password", {...Data})
    }

    static removeRole(id: string) {
        return http.delete<any>(`/roles/remove/${id}`)
    }

    static askRole(id: string) {
        return http.get<any>("/roles/ask/remove/" + id)
    }
}
