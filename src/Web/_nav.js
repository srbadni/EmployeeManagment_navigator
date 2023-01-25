import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilSpeedometer, cilUserPlus,
} from '@coreui/icons'
import {CNavGroup, CNavItem, CNavTitle} from '@coreui/react'
import {
    cilAccountLogout,
    cilBatteryAlert, cilBuilding,
    cilEnvelopeLetter,
    cilNewspaper,
    cilReportSlash,
    cilUser
} from "@coreui/icons/js/free";

const _nav = [
    {
        component: CNavItem,
        name: 'داشبورد',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>
    },
    {
        component: CNavTitle,
        name: 'ساختار پروژه',
    },
    {
        component: CNavItem,
        name: 'مدیریت لاگ ها',
        to: '/admin/employeeslogs',
        permission: "Company.EmployeesLogsList",
        icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon"/>,
        single: true
    },
    {
        component: CNavGroup,
        name: 'گزارشات تجمیعی',
        to: '/admin/reports',
        permission: "Users.CompanyEmployeesList",
        icon: <CIcon icon={cilNewspaper} customClassName="nav-icon"/>,
        items: [
            {
                component: CNavItem,
                name: 'گزارش اشخاص',
                permission: "Users.CompanyEmployeesList",
                to: '/admin/reports/employees',
                sub: true
            },
            {
                component: CNavItem,
                name: 'گزارش اعضای خانواده',
                permission: "Users.EmployeesRelativeList",
                to: '/admin/reports/RelativesList',
                sub: true
            }
        ],
    },
    {
        component: CNavGroup,
        name: 'مدیریت کاربران',
        to: '/admin/users/list',
        permission: "Users.NavigatorsList",
        icon: <CIcon icon={cilUser} customClassName="nav-icon"/>,
        items: [
            {
                component: CNavItem,
                name: 'لیست کاربران',
                permission: "Users.NavigatorsList",
                to: '/admin/users/list',
                sub: true
            },
            {
                component: CNavItem,
                name: 'افزودن کاربر',
                permission: "Users.Create",
                to: '/admin/users/create',
                sub: true
            }
        ],
    },
    {
        component: CNavGroup,
        name: 'مدیریت سازمان ها',
        to: '/admin/companies/list',
        permission: "Company.CompaniesList",
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon"/>,
        items: [
            {
                component: CNavItem,
                name: 'لیست سازمان ها',
                permission: "Company.CompaniesList",
                to: '/admin/companies/list',
                sub: true
            },
            {
                component: CNavItem,
                name: 'افزودن سازمان',
                permission: "Company.Create",
                to: '/admin/company/create',
                sub: true
            }
        ],
    },
    {
        component: CNavGroup,
        name: 'مدیریت نقش ها',
        permission: "Roles.Rolelist",
        to: '/admin/roles/list',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon"/>,
        items: [
            {
                component: CNavItem,
                name: 'لیست نقش ها',
                permission: "Roles.Rolelist",
                to: '/admin/roles/list',
                sub: true
            },
            {
                component: CNavItem,
                name: 'افزودن نقش',
                permission: "Roles.CreateRole",
                to: '/admin/roles/create',
                sub: true
            }
        ],
    }
]

export default _nav
