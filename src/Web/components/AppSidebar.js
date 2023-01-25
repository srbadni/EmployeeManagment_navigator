import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {AppSidebarNav} from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import {useAppSelector} from "../../store";
import {toggleSidebar, toggleUnfoldable} from "../../store/slice/layout.slice";

const AppSidebar = () => {
    const dispatch = useDispatch()
    const unfoldable = useAppSelector((state) => state.layout.unfoldable)
    const sidebarShow = useAppSelector((state) => state.layout.sidebarShow)

    return (
        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onChange={(visible) => {
                dispatch(toggleSidebar())
            }}
        >
            <CSidebarBrand className="d-none d-md-flex" to="/">
                {/*<CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />*/}
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav items={navigation}/>
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => {
                    dispatch(toggleUnfoldable())
                }}
            />
        </CSidebar>
    )
}

export default React.memo(AppSidebar)
