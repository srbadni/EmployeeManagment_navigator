import Api from '../api';
import { ICompany } from "../../Models/AuthModels/Companies";
import { IUserRoles } from "../../Models/AuthModels/IUserRoles";
import { IRole } from "../../Models/AuthModels/Role";
import { IRolePermission } from "../../Models/AuthModels/RolePermission";
import { IEmployees } from "../../Models/AuthModels/IEmployees";
import { IUser } from "../../Models/AuthModels/User";
import { IChangeStatus } from "../../Models/AuthModels/IChangeStatus";

export default class ApiService {

    static userRoles(id: IRole["id"]) {
        return Api.get<IUserRoles>(`/user-roles/roles-list/${id}`)
    }

    static assignRoleToUser(data: IUserRoles) {
        return Api.post<IUserRoles>("/user-roles/assign-role-to-user", { ...data })
    }

    static getCompanies() {
        return Api.get<ICompany[]>("/company/user-list")
    }

    static allPermissions(id: IRole["id"]) {
        return Api.get<IRolePermission>(`/permision-roles/permisions-list/${id}`)
    }

    static assignPermissionsToRole(data: IRolePermission) {
        return Api.post<IRolePermission>("/permision-roles/assign-permision-to-role", { ...data })
    }

    static getEmployees(id: IEmployees["id"]) {
        return Api.get<IEmployees[]>(`/company/${id}/employees/list`)
    }

    static getEmployeesLogs() {
        return Api.get<any[]>(`/company/employees/logs/list`)
    }

    static userChangeStatus(userId: IUser["id"]) {
        return Api.put<IChangeStatus>("/users/change-status", { userId })
    }

    static companyChangeStatus(userId: ICompany["id"]) {
        return Api.put<IChangeStatus>("/company/change-status", { userId })
    }

    static userChangePasswordByAdmin(data: any) {
        return Api.put<any>("/users/change-password", data)
    }

    static companyChangePasswordByAdmin(data: any) {
        return Api.put<any>("/company/change-password", data)
    }

    static getAllEmployeesCompany() {
        return Api.get<Record<string, IEmployees[]>>("/users/all-employees/list")
    }

    static getAllRelativesCompany() {
        return Api.get<Record<string, any[]>>("/users/all-employees-relatives-list")
    }

}
