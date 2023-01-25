import React, { Fragment, useEffect } from 'react';
import { useParams } from "react-router-dom";
import StorageService from "../../../../service/storage.service";

const AuthPage = () => {

    //todo if can put an loading here
    let { tokenId } = useParams();
    useEffect(() => {
        if (!StorageService.getToken()) { StorageService.setToken(tokenId) }
        else {
            StorageService.removeToken()
            StorageService.setToken(tokenId)
        }
        window.location.href = "/"
    }, [])

    return (
        <Fragment />
    );
};

export default AuthPage;