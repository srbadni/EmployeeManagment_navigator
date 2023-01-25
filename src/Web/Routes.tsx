import React from 'react'
import Page404 from "./views/pages/page404/Page404";
import Page500 from "./views/pages/page500/Page500";
import {Navigate} from "react-router-dom";

const AuthPage = React.lazy(() => import('./views/pages/authenticationPage/authPage'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/users/users'))
const AddUsers = React.lazy(() => import('./views/users/create'))
const AddCompany = React.lazy(() => import('./views/companies/create'))
const EditCompany = React.lazy(() => import('./views/companies/edit'))
const EmployeesCompany = React.lazy(() => import('./views/companies/employees'))
const EditUsers = React.lazy(() => import('./views/users/edit'))
const Roles = React.lazy(() => import('./views/roles/roles'))
const EditRoles = React.lazy(() => import('./views/roles/edit'))
const AddRoles = React.lazy(() => import('./views/roles/create'))
const Companies = React.lazy(() => import('./views/companies/companies'))
const AdminLayout = React.lazy(() => import('./layout/Layout'))
const AssignRoleToUser = React.lazy(() => import('./views/assignRoleToUser'))
const RolePermissions = React.lazy(() => import('./views/rolePermissions'))
const EmployeesReports = React.lazy(() => import('./views/reports/employees'))
const RelativesListReports = React.lazy(() => import('./views/reports/RelativesList'))
const ForgetPassword = React.lazy(() => import('./views/forgetPassword'))
const AdminChangePassword = React.lazy(() => import('./views/ChangePassAdmin'))
const CompanyChangePassword = React.lazy(() => import('./views/ChangePassCompany'))
const EmployeesLogs = React.lazy(() => import('./views/EmployeesLogs'))

const Routes = (isAuthenticated: any, permissions: any, role: string[]) => {

    if (window.location.href.split("/").includes("token")) {
        isAuthenticated = true
    }

    if (isAuthenticated) {
        return [
            {path: '/token/:tokenId', name: 'token', element: <AuthPage/>},
            {path: '/404', name: '404', element: <Page404/>},
            {path: '/500', name: '500', element: <Page500/>},
            {
                path: "/admin/",
                element: <AdminLayout/>,
                children: [
                    {path: 'dashboard', name: 'داشوبرد', element: <Dashboard/>},
                    {path: 'users/list', name: 'لیست کاربران', element: <Users/>},
                    {path: 'reports/employees', name: 'گزارشات اشخاص', element: <EmployeesReports/>},
                    {path: 'reports/RelativesList', name: 'گزارشات اعضای خانواده', element: <RelativesListReports/>},
                    {path: 'employeeslogs', name: 'لیست لاگ ها', element: <EmployeesLogs/>},
                    {path: 'changepassword', name: 'تغییر رمز عبور', element: <ForgetPassword/>},
                    {path: 'roles/list', name: 'لیست نقش ها', element: <Roles/>},
                    {path: 'companies/list', name: 'لیست سازمان ها', element: <Companies/>},
                    {path: 'users/create', name: 'افزودن کاربر', element: <AddUsers/>},
                    {path: 'users/info-edit/:id', name: 'ویرایش کاربر', element: <EditUsers/>},
                    {path: 'company/create', name: 'افزودن سازمان', element: <AddCompany/>},
                    {path: 'company/edit/:id', name: 'ویرایش سازمان', element: <EditCompany/>},
                    {path: 'company/employees/:id', name: 'لیست کارکنان', element: <EmployeesCompany/>},
                    {path: 'roles/create', name: 'افزودن نقش', element: <AddRoles/>},
                    {path: 'roles/edit/:id', name: 'ویرایش نقش', element: <EditRoles/>},
                    {path: 'assignRoleToUser/:id', name: 'انتساب نقش به کاربر', element: <AssignRoleToUser/>},
                    {path: 'users/change-password-user/:id', name: 'تغییر رمز عبور کاربر', element: <AdminChangePassword/>},
                    {
                        path: 'company/change-password-company/:id',
                        name: 'تغییر رمز عبور سازمان',
                        element: <CompanyChangePassword/>
                    },
                    {
                        path: 'rolePermissions/assignPermissionsToRoles/:id',
                        name: 'انتساب سطح دسترسی به نقش',
                        element: <RolePermissions/>
                    },
                ]
            },
            {path: "*", element: <Navigate to={"/admin"}/>}
        ];
    } else {
        // @ts-ignore
        window.location.href = `${AUTH_URL}`
        return []
    }
}

export default Routes
