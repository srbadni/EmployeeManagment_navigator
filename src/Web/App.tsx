import React, {Fragment, Suspense, useEffect, useMemo, useState} from 'react'
import {useRoutes} from 'react-router-dom'
import {useAppSelector} from "../store";
import '@progress/kendo-theme-default/dist/all.css';
import "./scss/style.scss"
import 'react-toastify/dist/ReactToastify.css';
import Routes from "./Routes";
import {CSpinner} from "@coreui/react";
import {ToastContainer} from "react-toastify";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addRoleName, setPermissions, setUserId, setUserName} from "../store/slice/auth.slice";

const LoadingOverlay = (
    <div className="pt-3 min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        <div><CSpinner color="danger"/></div>
    </div>
)

const App = () => {
    const dispatch = useDispatch();
    const token = useAppSelector(store => store.auth.token);
    const permissions = useAppSelector(store => store.auth.permissions);
    const roleName = useAppSelector(store => store.auth.roleName);
    const RoutesRendered = useRoutes(Routes(!!token, permissions, roleName))
    useEffect(() => {
        // @ts-ignore
        axios.get(`${BASE_URL_NAVIGATOR}/users/user-entrance`, {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then(({data}) => {
            dispatch(setPermissions(data.permisions))
            dispatch(addRoleName(data.rolesName))
            dispatch(setUserId(data.userId))
            dispatch(setUserName(data.userName))
        })
    }, [token, dispatch])
    //todo ablout loading
    const [loading] = useState<boolean>(false);

    if (loading)
        return LoadingOverlay
    return (
        <Fragment>
            <ToastContainer/>
            <Suspense fallback={LoadingOverlay}>
                {RoutesRendered}
            </Suspense>
        </Fragment>
    )
}

export default App
