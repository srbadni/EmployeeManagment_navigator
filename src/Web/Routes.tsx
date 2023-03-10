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
                    {path: 'dashboard', name: '??????????????', element: <Dashboard/>},
                    {path: 'users/list', name: '???????? ??????????????', element: <Users/>},
                    {path: 'reports/employees', name: '?????????????? ??????????', element: <EmployeesReports/>},
                    {path: 'reports/RelativesList', name: '?????????????? ?????????? ??????????????', element: <RelativesListReports/>},
                    {path: 'employeeslogs', name: '???????? ?????? ????', element: <EmployeesLogs/>},
                    {path: 'changepassword', name: '?????????? ?????? ????????', element: <ForgetPassword/>},
                    {path: 'roles/list', name: '???????? ?????? ????', element: <Roles/>},
                    {path: 'companies/list', name: '???????? ???????????? ????', element: <Companies/>},
                    {path: 'users/create', name: '???????????? ??????????', element: <AddUsers/>},
                    {path: 'users/info-edit/:id', name: '???????????? ??????????', element: <EditUsers/>},
                    {path: 'company/create', name: '???????????? ????????????', element: <AddCompany/>},
                    {path: 'company/edit/:id', name: '???????????? ????????????', element: <EditCompany/>},
                    {path: 'company/employees/:id', name: '???????? ??????????????', element: <EmployeesCompany/>},
                    {path: 'roles/create', name: '???????????? ??????', element: <AddRoles/>},
                    {path: 'roles/edit/:id', name: '???????????? ??????', element: <EditRoles/>},
                    {path: 'assignRoleToUser/:id', name: '???????????? ?????? ???? ??????????', element: <AssignRoleToUser/>},
                    {path: 'users/change-password-user/:id', name: '?????????? ?????? ???????? ??????????', element: <AdminChangePassword/>},
                    {
                        path: 'company/change-password-company/:id',
                        name: '?????????? ?????? ???????? ????????????',
                        element: <CompanyChangePassword/>
                    },
                    {
                        path: 'rolePermissions/assignPermissionsToRoles/:id',
                        name: '???????????? ?????? ???????????? ???? ??????',
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
