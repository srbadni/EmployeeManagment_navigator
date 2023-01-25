import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilMenu} from '@coreui/icons'

import {AppHeaderDropdown} from './header/index'
import {logo} from '../assets/brand/logo'
import {useAppSelector} from "../../store";
import {toggleSidebar} from "../../store/slice/layout.slice";

const AppHeader = () => {
    const dispatch = useDispatch()
    const userName = useAppSelector(store => store.auth.userName);
    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch(toggleSidebar())}
                >
                    <CIcon icon={cilMenu} size="lg"/>
                </CHeaderToggler>
                <CHeaderBrand className="mx-auto d-md-none" to="/">
                    <CIcon icon={logo} height={48} alt="Logo"/>
                </CHeaderBrand>
                <div className={'d-flex'}>
                    <span style={{fontSize : 14}}>{userName} عزیز، خوش آمدید</span>
                    <CHeaderNav className="ms-3">
                        <AppHeaderDropdown/>
                    </CHeaderNav>
                </div>
            </CContainer>
        </CHeader>
    )
}

export default AppHeader
