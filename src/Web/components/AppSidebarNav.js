import React, {Fragment} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'

import {CBadge} from '@coreui/react'
import {useAppSelector} from "../../store";

export const AppSidebarNav = ({items}) => {
    const location = useLocation()
    const navLink = (name, icon, badge) => {
        return (
            <Fragment>
                {icon && icon}
                {name && name}
                {badge && (
                    <CBadge color={badge.color} className="ms-auto">
                        {badge.text}
                    </CBadge>
                )}
            </Fragment>
        )
    }

    const navItem = (item, index) => {
        const {component, name, badge, icon, ...rest} = item
        const Component = component
        return (
            <Component
                {...(rest.to &&
                    !rest.items && {
                        component: NavLink,
                    })}
                key={index}
                {...rest}
            >
                {navLink(name, icon, badge)}
            </Component>
        )
    }
    const permissions = useAppSelector(store => store.auth.permissions)
    const roleName = useAppSelector(store => store.auth.roleName)

    const navGroup = (item, index) => {
        const {component, name, icon, to, ...rest} = item
        const Component = component
        return (
            <Component
                idx={String(index)}
                key={index}
                toggler={navLink(name, icon)}
                visible={location.pathname.startsWith(to)}
                {...rest}
            >
                {item.items?.filter(item => {
                    return !roleName?.includes("Superadmin") ?
                        permissions.includes(item.permission) :
                        item
                }).map((item, index) =>
                    item.items ? navGroup(item, index) : navItem(item, index),
                )}
            </Component>
        )
    }


    return (
        <React.Fragment>
            {items &&
                items.filter(item => {
                    return !roleName?.includes("Superadmin") ?
                        !item?.single ?
                            item?.items?.some(i => {
                                return permissions.includes(i.permission)
                            }) :
                            permissions.includes(item.permission)
                        :
                        item
                }).map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
        </React.Fragment>
    )
}

AppSidebarNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
